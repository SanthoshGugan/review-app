import React, { useEffect, useState } from "react";
import { fetchReviewApi, updateReviewApi, uploadReviewImageApi, uploadReviewUrl } from "../api/ReviewApi";
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

    const [ customerSid, setCustomerSid ] = useState(null);
    const [ userSid, setUserSid ] = useState(null);

    const [file, setFile] = useState(null);
    const [progress, setProgress] = useState(0);
    const [reviewImageSid, setReviewImageSid ] = useState(null);

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
            const { review_complete, customer_sid, user_sid } = review;
            setReview(review);
            setCustomerSid(customer_sid);
            setUserSid(user_sid);
            
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
            content: updateAnswersInReview(values, content),
            review_image_sid: reviewImageSid
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

    const uploadReviewUrlConstructor = () => uploadReviewUrl({ customer_sid: customerSid });
    
    const uploadReviewHeaders = () => {
        return {
            'Content-Type': 'image/png',
            'Content-Disposition': 'attachment',
            'user_sid': userSid
        }
    }

    const onUploadSuccess = async (res) => {
        // setProgress(100);
        
        const { review_image_sid } = res ;
        if (!review_image_sid) {
            toast({
                title: "Upload failed!",
                description: "Please try after sometime or contact support",
                status: "error",
                isClosable: true,
                duration: 5000
            })
        } else {
            toast({
                title: "thanks for adding picture, please proceed with submit to attach picture",
                status: "success",
                isClosable: true,
                duration: 5000
            })
            setReviewImageSid(review_image_sid);
        }
    }

    const onUploadError = (err) => {

    };

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
        isReviewSubmissionDisabled,
        onUploadSuccess,
        setFile,
        setProgress,
        file, 
        progress,
        uploadReviewUrlConstructor,
        uploadReviewHeaders,
        onUploadError
    };
};

export default useSubmitUserReview;