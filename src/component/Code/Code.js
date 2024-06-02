import { Box, Flex, IconButton, Input, Text, Tooltip, useClipboard } from "@chakra-ui/react";
import React from "react";

import { IoCopyOutline } from "react-icons/io5";

const Code = ({ content }) => {

    const { value, onCopy, hasCopied } = useClipboard(content);
    return (
        <Flex justifyContent="space-between" bgColor={hasCopied ? "orange.100" : "orange.200"} alignItems="center" px="1rem" py="0.5rem" borderRadius="10px" my="1rem">
            <Text flex="85% 0 0">{content}</Text>
            <Box flex="auto 0 0" >
                <Tooltip label="copied!" size="md" isOpen={hasCopied} bgColor={hasCopied ? "orange.500": "orange.100"}>
                    <IconButton
                        icon={<IoCopyOutline />}
                        variant="ghost"
                        onClick={onCopy}
                        bgColor={hasCopied ? "orange.500" : "orange.100"}
                        _hover={{ bgColor: "green.100"}}
                    />
                </Tooltip>
            </Box>
        </Flex>
    );
};

export default Code;