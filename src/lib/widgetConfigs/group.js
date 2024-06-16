import { Box, Text } from "@chakra-ui/react";
import React from "react";
import Field from "./field";

import "./group.css"


const Group = ({ children, label }) => {

    const renderGroupBox = () => {
        return (
            <Box border="1px solid" borderColor="gray.200" m="1rem 0.5rem" id="group__container" px="1rem" py="2rem">
                <Text id="group__title">{label}</Text>
                <Box my="1rem">
                    {/* <Field type="select" options={[]} value={[]} onChange={() => {}} single={false} label="file" placeholder="text" /> */}
                    {children}
                </Box>
            </Box>
        );
    }

    return (
        <div>
            {renderGroupBox()}
        </div>
    );
};

export default Group;