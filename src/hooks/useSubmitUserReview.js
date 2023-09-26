import React, { useEffect, useState } from "react";
import { fetchReviewApi, updateReviewApi } from "../api/ReviewApi";
import { formatRequestForReviewSubmit, getFieldFromReview, updateFieldInReview } from "../utils/ReviewUtils";

const useSubmitUserReview = ({ review_sid }) => {

    const [ review, setReview ] = useState({});
    const [ fetchingReviewInProgress, setFetchingReviewInProgress ] = useState(false);
    const [ errorInReviewFetch, setErrorInReviewFetch ] = useState(false);
    const [ fields, setFields ] = useState([]);

    const constructFields = () => {
        const { content = [] } = review;
        const fields = content
            .map(field => {
                const { field_type, ...remaining } = field;
                const { props, name } = field_type;
                return {
                    ...remaining,
                    props,
                    field: name
                };
            });
        setFields(fields);

        console.log("fields : " + fields);
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


    const updateRating = ({ answer, index }) => {
        const field = getFieldFromReview({review, index});
        const updatedField = { ...field, answer };
        const updatedReview = updateFieldInReview({
            review,
            index,
            field: updatedField,
        });
        setReview({
            ...updatedReview
        })
    }

    const submitReview = async () => {
        const { content } = review;
        const req = {
            content: formatRequestForReviewSubmit(content)
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
        fetchReview,
        updateRating,
        submitReview,
        fetchingReviewInProgress,
        errorInReviewFetch,
        review,
        fields
    };
};

export default useSubmitUserReview;