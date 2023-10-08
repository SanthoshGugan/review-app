import React, { useState } from "react";
import { fetchReviewApi, fetchReviewsApi } from "../api/ReviewApi";

const useReviewList = ({ customer_sid }) => {

    const [ reviews, setReviews ] = useState([]);
    const [ fetchInProgress, setFetchInProgress ] = useState(false);
    const [ errorInFetch, setErrorInFetch ] = useState(false);

    const fetchReviewList = async () => {
        try {
            setFetchInProgress(true);
            const response = await fetchReviewsApi({ customer_sid });
            const { data: { reviews: reviewList = [] }} = response || {};

            setReviews(reviewList);
            setFetchInProgress(false);
            setErrorInFetch(false);
        } catch(err) {
            setFetchInProgress(false);
            setErrorInFetch(true);
        }
    };



    return {
        fetchReviewList,
        reviews,
        fetchInProgress,
        errorInFetch
    }
};

export default useReviewList;