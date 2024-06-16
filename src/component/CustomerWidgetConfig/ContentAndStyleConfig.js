import { Box } from "@chakra-ui/react";
import React from "react";
import Field from "../../lib/widgetConfigs/field";
import Group from "../../lib/widgetConfigs/group";

const ContentAndStyleConfig = ({ config, contentAndStyle = {}, updateContent }) => {

    const { fields = [], label } = config;

    const renderField = ({ field }) => {
        const {
            name,
            label,
            type,
        } = field || {};

        const { content = "" } = contentAndStyle[name] || {};

        return (
            <Field
                type={type}
                label={label}
                placeholder={label}
                value={content} 
                onChange={val => updateContent(name, val)}
            />
        );
    }

    const renderGroup = () => {
        return (
            <Group label={label}>
                {fields.map(field => renderField({ field }))}
            </Group>
        );
    }

    return (
        <Box>
            {renderGroup()}
        </Box>
    );
};

export default ContentAndStyleConfig;