import { Box, Input, Text, Textarea, VStack } from "@chakra-ui/react";
import React from "react";

const FeedbackText = (props) => {
    const { 
        question,
        answer,
        title,
        updateAnswer,
        updateTitle
     } = props;


     const onFeedback = (e) => {
        const val = e?.target?.value || '';
        updateAnswer(val);
     }

     const onTitle = (e) => {
        const val = e?.target?.value || '';
        updateTitle(val);
     }


    return (
        <Box marginTop="2rem">
            {/* <Text>
                {question}
            </Text> */}
            <VStack spacing={10}>
                <Input value={title} onChange={onTitle} variant="flushed" placeholder="title" fontWeight="bold" />
                <Textarea value={answer} onChange={onFeedback} size="lg" variant="outline" rows={8}/>
            </VStack>
        </Box>
    );
};

export default FeedbackText;