import { Box, Text, Textarea } from "@chakra-ui/react";
import React from "react";

const FeedbackText = (props) => {
    const { 
        question,
        answer,
        updateAnswer
     } = props;


     const onFeedback = (e) => {
        const val = e?.target?.value || '';
        updateAnswer(val);
     }



    return (
        <Box>
            <Text>
                {question}
            </Text>
            <Textarea value={answer} onChange={onFeedback}/>
        </Box>
    );
};

export default FeedbackText;