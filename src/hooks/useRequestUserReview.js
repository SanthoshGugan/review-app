import React, { useState } from "react";
import { requestReviewApi } from "../api/ReviewApi";

const useRequestUserReview = ({ customer_sid }) => {

    const [ reviewTriggerInProgress, setReviewTriggerInProgress ] = useState(false);
    const [ errorInReviewTrigger, setErrorInReviewTrigger ] = useState(false);

    const triggerReview = async ({ user_sid }) => {
        try {
            setReviewTriggerInProgress(true);
            const req = {
                user_sid
            };

            const response = await requestReviewApi({ customer_sid, req });

            setReviewTriggerInProgress(false);
            setErrorInReviewTrigger(false);
        } catch(err) {
            setReviewTriggerInProgress(false);
            setErrorInReviewTrigger(true);
        }
    };

    return {
        triggerReview,
        reviewTriggerInProgress,
        errorInReviewTrigger
    };
};

export default useRequestUserReview;