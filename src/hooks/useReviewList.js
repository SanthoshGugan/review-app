import React, { useState } from "react";
import { addTagToReviewApi, fetchReviewApi, fetchReviewTagsForCustomerApi, fetchReviewsApi, removeTagFromReviewApi } from "../api/ReviewApi";

const useReviewList = ({ customer_sid }) => {

    const [ reviews, setReviews ] = useState([]);
    const [ fetchInProgress, setFetchInProgress ] = useState(false);
    const [ errorInFetch, setErrorInFetch ] = useState(false);

    const [ allTags, setAllTags ] = useState([]);
    const [ fetchTagsInProgress, setFetchTagsInProgress ] = useState(false);
    const [ errorInTagsFetch, setErrorInTagsFetch ] = useState(false);


    const [ addTagInProgress, setAddTagInProgress ] = useState(false);
    const [ errorInAddTag, setErrorInAddTag ] = useState(false);

    const fetchReviewList = async () => {
        try {
            setFetchInProgress(true);
            const response = await fetchReviewsApi({ customer_sid, tags: true });
            const { data: { reviews: reviewList = [] }} = response || {};

            setReviews(reviewList);
            setFetchInProgress(false);
            setErrorInFetch(false);
        } catch(err) {
            setFetchInProgress(false);
            setErrorInFetch(true);
        }
    };

    const fetchTagsList = async () => {
        try {
            setFetchTagsInProgress(true);
            const res = await fetchReviewTagsForCustomerApi({ customer_sid });
            const { data: { customer_tags = [] }} = res || {};
            setFetchTagsInProgress(false);
            setErrorInTagsFetch(true);
            setAllTags(customer_tags);
        } catch(err) {
            setFetchTagsInProgress(false);
            setErrorInTagsFetch(true);
        }
    };

    const addTag = async ({ review_sid, tag_sid }) => {
        try {
            setAddTagInProgress(true);
            const res = await addTagToReviewApi({ review_sid, req: {tag_sid} });
            setAddTagInProgress(false);
            setErrorInAddTag(false);
            fetchReviewList();
        } catch(err) {
            setAddTagInProgress(false);
            setErrorInAddTag(true);
        }
    };

    const removeTag = async ({ review_sid, tag_sid }) => {
        try {
            const res = await removeTagFromReviewApi({ review_sid, tag_sid });
            fetchReviewList();
        } catch (err) {
            console.error("error in remove tag : "+ err);
        }

    };

    const getAvailableTagsToAdd = ({ existingTags = [] }) => {
        const existingTagSet = new Set(existingTags.map(tag => tag?.sid));
        return allTags.filter(tag => {
            const { sid } = tag;
            return !existingTagSet.has(sid);
        }) || [];
    };

    const formatTagstoSelect = (tags) => {
        return tags.map(tag => {
            const { sid, name } = tag;
            return {
                label: name,
                value: sid
            }
        });
    };



    return {
        fetchReviewList,
        reviews,
        fetchInProgress,
        errorInFetch,

        fetchTagsList,
        allTags,
        fetchTagsInProgress,
        errorInTagsFetch,
        getAvailableTagsToAdd,

        addTag,
        removeTag,

        formatTagstoSelect
    }
};

export default useReviewList;