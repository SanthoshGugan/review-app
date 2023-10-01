import React from "react";
import { FIELD_TYPES } from "../../utils/FieldTypes";
import FeedbackText from "./FeedbackText";
import { Box, Text } from "@chakra-ui/react";
import StarRating from "./StarRating";



const ReviewField = (props) => {

    const { fields, updateAnswer, watch } = props;

    const renderStarRating = ({ field, index }) => {
        const {
            max_value,
            question,
            answer,
            props,
            field_type_sid
        } = field;

        return (
            <StarRating
                maxStars={max_value}
                updateRating={val => updateAnswer({ answer: val, field_type_sid, prop: "answer" })}
                question={question}
                rating={watch(`${field_type_sid}.answer`)}
            />
        );
    };

    const renderQuestion = () => {
        const { question = "" } = fields[0] || {};
        return (
            <Box>
                <Text 
                    style={{
                        fontSize: "24px",
                        fontWeight: "bold"
                    }}
                >{question}</Text>
            </Box>
        );
    }

    const renderText = ({ field, index }) => {
        const { question, field_type_sid } = field;
        return (
            <FeedbackText
                updateAnswer={val => updateAnswer({ answer: val, field_type_sid, prop: "answer" })}
                updateTitle={val => updateAnswer({ answer: val, field_type_sid, prop: "title"})}
                answer={watch(`${field_type_sid}.answer`)}
                title={watch(`${field_type_sid}.title`)}
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
            {renderQuestion()}
            {renderFields()}
        </Box>
    );
};

export default ReviewField;