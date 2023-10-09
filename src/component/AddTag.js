import { Box, Button, Flex, Select } from "@chakra-ui/react";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import{ FaRegSquarePlus } from "react-icons/fa6";
import { AiOutlineCloseCircle} from "react-icons/ai";

const AddTag = ({ availableTags, addTag = () => {} }) => {
    const [ newTag, setNewTag ] = useState(null);
    const [ showAddTags, setShowAddTags ] = useState(false);

    const onSelect = (e) => {
        const val = e?.target?.value;
        setNewTag(val);
    };

    const submitNewTag = () => {
        if (!newTag) return;
        addTag(newTag);
    }

    if (!availableTags || !availableTags?.length) return <></>;

    return (
        <Flex>
            {showAddTags && (
                <>
                    <Select placeholder="add tag" onChange={onSelect}>
                        {availableTags.map(tag => <option value={tag?.sid}>{tag?.name}</option>)}
                    </Select>
                    <Button variant="outline" onClick={submitNewTag} isDisabled={!newTag}>add</Button>
                </>
            )}
            {!showAddTags && (
                <Button variant="ghost" leftIcon={<FaRegSquarePlus/>} onClick={() => setShowAddTags(true)}></Button>
            )}
            {showAddTags && (
                <Button variant="ghost" leftIcon={<AiOutlineCloseCircle/>} onClick={() => setShowAddTags(false)}></Button>
            )}
        </Flex>
    );
};

export default AddTag;