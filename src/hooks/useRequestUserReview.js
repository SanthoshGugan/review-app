import React, { useState } from "react";
import { requestReviewApi } from "../api/ReviewApi";
import { useToast } from "@chakra-ui/react";

const useRequestUserReview = ({ customer_sid }) => {

    const [ reviewTriggerInProgress, setReviewTriggerInProgress ] = useState(false);
    const [ errorInReviewTrigger, setErrorInReviewTrigger ] = useState(false);

    const toast = useToast();

    const triggerReview = async ({ user_sid }) => {
        try {
            setReviewTriggerInProgress(true);
            const req = {
                user_sid
            };

            const response = await requestReviewApi({ customer_sid, req });
            toast({
                title: "Review requested",
                description: "Requested review from User via email",
                status: "success",
                duration: 5000,
                isClosable: true,
            });

            setReviewTriggerInProgress(false);
            setErrorInReviewTrigger(false);
            
        } catch(err) {
            const { message } = err?.response?.data || "Error while sending review invitation!";
            setReviewTriggerInProgress(false);
            setErrorInReviewTrigger(true);
            toast({
                title: "Review request failed!",
                description: message,
                status: "error",
                duration: 5000,
                isClosable: true,
            });

        }
    };

    return {
        triggerReview,
        reviewTriggerInProgress,
        errorInReviewTrigger
    };
};

export default useRequestUserReview;