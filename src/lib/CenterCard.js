import { Box, Card, CardBody, CardHeader, Flex, Heading, Image } from "@chakra-ui/react";
import React from "react";

const CenterCard = (props) => {
    const { children, maxW = 'md', scheme="blue", title = "" } = props;
    return (
        <Box height="100vh" className={"background-review-icon"}>
            <Flex alignItems="center" justifyContent="center" height={"100%"} >
                <Card
                    style={{
                        padding: "10vh 5vh",
                        border: "1px solid #d6d6d6",
                        borderRadius: "10px",
                        opacity: '0.9'
                    }}
                    maxW={maxW}
                    title={title}
                >
                    <CardHeader>
                        <Flex alignItems="center" justifyContent="center">
                            <Heading size="md">{title}</Heading>
                        </Flex>
                    </CardHeader>
                    <CardBody>
                        {children}
                    </CardBody>
                </Card>
            </Flex>
        </Box>
    );
};

export default CenterCard;