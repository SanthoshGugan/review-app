import React, { useEffect, useState } from "react";
import { fetchReviewApi, updateReviewApi } from "../api/ReviewApi";
import { formatRequestForReviewSubmit, getFieldFromReview, updateAnswersInReview, updateFieldInReview } from "../utils/ReviewUtils";
import { useForm } from "react-hook-form";
import { review_template_config } from "../utils/reviewTemplateConfig";
import { useToast } from "@chakra-ui/react";

const useSubmitUserReview = ({ review_sid }) => {

    const [ review, setReview ] = useState({});
    const [ fetchingReviewInProgress, setFetchingReviewInProgress ] = useState(false);
    const [ errorInReviewFetch, setErrorInReviewFetch ] = useState(false);
    const [ fields, setFields ] = useState([]);

    const [ isReviewSubmitted, setIsReviewSubmitted ] = useState(false);
    const [ isReviewSubmissionDisabled, setIdReviewSubmissionDisabled ] = useState(false);

    const toast = useToast();

    const {
        handleSubmit,
        register,
        formState: { isValid, isSubmitting, isSubmitted },
        setValue,
        reset,
        getValues,
        watch
    } = useForm();

    const constructFields = (review) => {
        const { content = [] } = review;
        console.log(`review : ${JSON.stringify(review)}`);
        const fields = content
            .map(field => {
                const { field_type, ...remaining } = field;
                const { props, name } = field_type;
                return {
                    ...remaining,
                    props,
                    field_name: name
                };
            });
        setFields(fields);
        const answers = {};
        content.forEach(field => {
            const { field_type_sid  } = field;
            const user_fields = review_template_config[field_type_sid];
            let state_answer = {};
            user_fields.forEach(user_field => {
                state_answer[user_field] = field[user_field] || null;
            });
            answers[field_type_sid] = state_answer;
        });
        console.log(`answers  : ${JSON.stringify(answers)}`)
        reset({
            ...answers
        })
    }

    const fetchReview = async () => {
        try {
            setFetchingReviewInProgress(true);
            const res = await fetchReviewApi({ review_sid });
            const { data: review } = res;
            const { review_complete } = review;
            setReview(review);

            if (review_complete) {
                toast({
                    title: "Review submitted",
                    description: "Review already submitted, thanks!",
                    status: "info",
                    duration: 5000,
                    isClosable: true,
                });
            }
            setFetchingReviewInProgress(false);
            constructFields(review);
            setIdReviewSubmissionDisabled(review_complete)
        } catch (err) {
            setErrorInReviewFetch(true);
            setFetchingReviewInProgress(false);
        }
    }

    const updateAnswer = ({ field_type_sid, prop, answer }) => {
        setValue(`${field_type_sid}.${prop}`, answer);
        const answers = getValues();
        console.log(`answers : ${JSON.stringify(answers)}`)
    };

    // const update

    const submitReview = async (values) => {
        setIsReviewSubmitted(false);
        const { content } = review;
        const req = {
            content: updateAnswersInReview(values, content)
        };
        await updateReviewApi({
            review_sid,
            req
        });
        setIsReviewSubmitted(true);

        toast({
            title: "Review submitted",
            description: "Thanks for your feedback!",
            status: "success",
            duration: 5000,
            isClosable: true,
          })
    }

    return {
        handleSubmit,
        register,
        fetchReview: () => fetchReview(),
        updateAnswer,
        submitReview,
        fields,
        watch,
        isSubmitting,
        isReviewSubmitted,
        isReviewSubmissionDisabled
    };
};

export default useSubmitUserReview;