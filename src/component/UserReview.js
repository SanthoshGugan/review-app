import React, { useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";
import useSubmitUserReview from "../hooks/useSubmitUserReview";
import StarRating from "./ReviewField/StarRating";
import { Box, Button, Text } from "@chakra-ui/react";

const UserReview = (props) => {

    const {
        review_sid
    } = useParams();

    console.log(`review sid : ${review_sid}`)

    const {
        fetchReview,
        updateRating,
        submitReview,
        fields,
        fetchingReviewInProgress,
        errorInReviewFetch
    } = useSubmitUserReview({ review_sid });

    const renderFields = useCallback(() => {
        return fields.map((field, index) => {
            const {
                max_value,
                question,
                answer
            } = field;
            return (
                <StarRating
                    maxStars={max_value}
                    updateRating={val => updateRating({ answer: val, index })}
                    question={question}
                    initialRating={answer}
                />);
        });
    }, [fields])

    useEffect(() => {
        fetchReview();
    }, [review_sid]);

    return (
        <>
            <Box>
                {renderFields()}
                <Button onClick={() => submitReview()}> Submit</Button>
            </Box>
        </>
    );
};

export default UserReview;