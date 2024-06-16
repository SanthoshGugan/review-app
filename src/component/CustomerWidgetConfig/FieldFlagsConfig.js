import { Box } from "@chakra-ui/react";
import React from "react";
import Field from "../../lib/widgetConfigs/field";
import Group from "../../lib/widgetConfigs/group";

const FieldFlagConfig = ({ config, field_flags, updateFlag }) => {

    const { fields = [], label } = config;

    const renderField = ({ field }) => {
        const {
            name,
            label,
            type,
        } = field || {};

        return (
            <Field
                type={type}
                label={label}
                placeholder={label}
                isChecked={field_flags[name]} 
                onChange={e => updateFlag(name, e?.target?.checked)}
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

export default FieldFlagConfig;