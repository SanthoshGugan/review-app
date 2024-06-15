import { Box } from "@chakra-ui/react";
import React from "react";
import Field from "../../lib/widgetConfigs/field";
import Group from "../../lib/widgetConfigs/group";

const StarsConfig = ({ config, stars, updateStars }) => {

    const { fields = [], label } = config;

    const renderField = ({ field }) => {
        const {
            label,
            type,
            options = []
        } = field || {};

        return (
            <Field
                type={type}
                options={options}
                label={label}
                placeholder={label}
                value={stars} 
                onChange={value => updateStars(value)}
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

export default StarsConfig;