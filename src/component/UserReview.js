import React, { useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";
import useSubmitUserReview from "../hooks/useSubmitUserReview";
import StarRating from "./ReviewField/StarRating";
import { Box, Button, Text } from "@chakra-ui/react";
import ReviewField from "./ReviewField/ReviewField";

const UserReview = (props) => {

    const {
        review_sid
    } = useParams();

    console.log(`review sid : ${review_sid}`)

    const {
        fetchReview,
        updateAnswer,
        submitReview,
        fields,
        handleSubmit,
        watch
    } = useSubmitUserReview({ review_sid });

    const renderFields = useCallback(() => {
        return <ReviewField
                    fields={fields}
                    updateAnswer={updateAnswer}
                    watch={watch}
                />
    }, [fields])

    useEffect(() => {
        fetchReview();
    }, [review_sid]);

    return (
        <>
            <Box>
                <form onSubmit={handleSubmit(submitReview)}>
                    {renderFields()}
                    <Button type="submit"> Submit</Button>
                </form>
            </Box>
        </>
    );
};

export default UserReview;