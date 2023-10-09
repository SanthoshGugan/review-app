import { Box, Button, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { AiOutlineMinusCircle } from "react-icons/ai"

const Tag = ({ tag, removeTag = () => {} }) => {
    const { name, description, sid } = tag;

    const removeClick = () => {
        removeTag(sid);
    };

    return (
        <Flex alignItems="center" justifyContent="center" border="0.15rem solid green" padding="0.5rem" borderRadius="0.5rem">
            <Text fontWeight="bold">{name}</Text>
            <Button leftIcon={<AiOutlineMinusCircle />} onClick= {removeClick}></Button>
        </Flex>
    );
};

const Tags = ({ tags, removeTag = () => {} }) => {

    const renderTag = () => {
        return tags.map(tag => <Tag tag={tag} removeTag={removeTag} />);
    }

    return (
        <Box>
            <Flex flexDirection="row" gap="2rem">
                {renderTag()}
            </Flex>
        </Box>
    )
};

export default Tags;