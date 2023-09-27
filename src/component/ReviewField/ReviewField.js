import React from "react";
import { FIELD_TYPES } from "../../utils/FieldTypes";
import FeedbackText from "./FeedbackText";
import { Box } from "@chakra-ui/react";
import StarRating from "./StarRating";



const ReviewField = (props) => {

    const { fields, updateAnswer, watch } = props;

    const renderStarRating = ({ field, index }) => {
        const {
            max_value,
            question,
            answer,
            props
        } = field;

        return (
            <StarRating
                maxStars={max_value}
                updateRating={val => updateAnswer({ answer: val, index })}
                question={question}
                rating={watch(`answers.${index}`)}
            />
        );
    };

    const renderText = ({ field, index }) => {
        const { question } = field;
        return (
            <FeedbackText
                updateAnswer={val => updateAnswer({ answer: val, index })}
                answer={watch(`answers.${index}`)}
                question={question}
            />
        );
    }

    const renderField = ({ field, index }) => {
        const { field_name } = field;
        switch (field_name) {
            case FIELD_TYPES.RATINGS_STAR:
                return renderStarRating({field, index});
            case FIELD_TYPES.FEEDBACK_TEXT:
                return renderText({ field, index });
        }
    }

    const renderFields = () => {
        return fields.map((field, index) => <Box >
            {renderField({ field, index })}
        </Box>)
    }

    return (
        <Box>
            {renderFields()}
        </Box>
    );
};

export default ReviewField;