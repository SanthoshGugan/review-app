import { Box, Card, Flex } from "@chakra-ui/react";
import React from "react";

const CenterCard = (props) => {
    const { children } = props;
    return (
        <Box height="100vh">
            <Flex alignItems="center" justifyContent="center" height={"100%"}>
                <Card
                    style={{
                        padding: "10vh 5vh",
                        border: "1px solid #d6d6d6",
                        borderRadius: "10px"
                    }}
                    maxW='md'
                >
                    {children}
                </Card>
            </Flex>
        </Box>
    );
};

export default CenterCard;