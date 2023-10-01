import React, { useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";
import useSubmitUserReview from "../hooks/useSubmitUserReview";
import StarRating from "./ReviewField/StarRating";
import { Box, Button, Card, Center, Flex, Text } from "@chakra-ui/react";
import ReviewField from "./ReviewField/ReviewField";
import CenterCard from "../lib/CenterCard";

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
        watch,
        isSubmitting,
        isReviewSubmitted,
        isReviewSubmissionDisabled
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
        <Box height="100vh">
        <Flex alignItems="center" justifyContent="center" height={"100%"}>
            <Card 
                style={{
                    padding: "5vh 5vw"
                }}
                width="75%"
            >
                <form onSubmit={handleSubmit(submitReview)}>

                    <Center flexDirection="column" gap="2rem">
                        {renderFields()}
                        <Button 
                            type="submit" 
                            style={{
                                padding: '2rem 6rem',
                            }}
                            colorScheme="teal"
                            size="lg"
                            isLoading={isSubmitting}
                            isDisabled={isReviewSubmitted || isReviewSubmissionDisabled}
                        > 
                            Submit
                        </Button>
                    </Center>
                </form>
            </Card>
        </Flex>
        </Box>
    );
};

export default UserReview;