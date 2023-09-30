import { Box, Button } from "@chakra-ui/react";
import React from "react";

const RButton = (props) => {
    const {
        text = "Submit",
        buttonProps,
    } = props;
    return (
        <Box>
            <Button
                {
                    ...buttonProps
                }
                style={{
                    padding: '2rem 6rem'
                }}
                maxW="15vh"
            >
                {text}
            </Button>
        </Box>
    );
};

export default RButton;