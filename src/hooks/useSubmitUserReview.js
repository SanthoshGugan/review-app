import React, { useEffect, useState } from "react";
import { fetchReviewApi, updateReviewApi } from "../api/ReviewApi";
import { formatRequestForReviewSubmit, getFieldFromReview, updateAnswersInReview, updateFieldInReview } from "../utils/ReviewUtils";
import { useForm } from "react-hook-form";

const useSubmitUserReview = ({ review_sid }) => {

    const [ review, setReview ] = useState({});
    const [ fetchingReviewInProgress, setFetchingReviewInProgress ] = useState(false);
    const [ errorInReviewFetch, setErrorInReviewFetch ] = useState(false);
    const [ fields, setFields ] = useState([]);

    const {
        handleSubmit,
        register,
        formState: { isValid, isSubmitting },
        setValue,
        reset,
        getValues,
        watch
    } = useForm();

    const constructFields = () => {
        const { content = [] } = review;
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
        const answers = content.map(field => {
            const { answer } = field;
            return answer;
        });
        console.log(`answers  : ${answers}`)
        reset({
            answers
        })
    }

    const fetchReview = async () => {
        try {
            setFetchingReviewInProgress(true);
            const res = await fetchReviewApi({ review_sid });
            const { data: review } = res;
            setReview(review);
            setFetchingReviewInProgress(false);
            constructFields();
        } catch (err) {
            setErrorInReviewFetch(true);
            setFetchingReviewInProgress(false);
        }
    }

    const updateAnswer = ({ answer, index }) => {
        setValue(`answers.${index}`, answer);
        const answers = getValues();
        console.log(`answers : ${JSON.stringify(answers)}`)
    };

    const submitReview = async (values) => {
        const { content } = review;
        const req = {
            content: updateAnswersInReview(values, content)
        };
        await updateReviewApi({
            review_sid,
            req
        });

    }

    useEffect(() => {
        constructFields();
    }, [review?.content])

    return {
        handleSubmit,
        register,
        fetchReview,
        updateAnswer,
        submitReview,
        fields,
        watch
    };
};

export default useSubmitUserReview;