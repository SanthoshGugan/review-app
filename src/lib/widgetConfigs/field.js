import { Box, Flex, FormControl, FormErrorMessage, FormHelperText, FormLabel, Input, Switch, Text } from "@chakra-ui/react";
import { MultiSelect } from "chakra-multiselect";
import React from "react";

const Field = ({
    value,
    options,
    onChange,
    label,
    inputType="text",
    isChecked,
    type,
    isError = false,
    helpText = "",
    placeholder = ""
}) => {

    const isEmpty = () => {
        switch(type) {
            case "input":
            case "switch":
                return value === "";
            case "select":
                return !Array.isArray(value) ? value === "" : value.length === 0;
            case "multiselect":
                return value?.length === 0;
            default:
                return true;
        }
    }

    const handleChange = (e) => {
        console.log("event" , e);
        const { target: { value } } = e;
        onChange(value);
    }



    const renderSelect = ({ single }) => {
        return (
            <MultiSelect
                options={options}
                value={value}
                single={single}
                onChange={onChange}
                placeholder={placeholder}
            />
        );
    };

    const renderInput = () => {
        return (
            <Input
                type={inputType}
                value={value}
                onChange={handleChange}
                placeholder={placeholder}
            />
        );
    }

    const renderSwitch = () => {
        return (
            <Switch
                isChecked={isChecked}
                onChange={value => onChange(value)}
            />
        );
    };

    const renderField = () => {
        switch(type) {
            case "input":
            case "text":
                return renderInput();
            case "switch":
                return renderSwitch();
            case "select":
                return renderSelect({ single: true })
            case "multiselect":
                return renderSelect({ single: false });
            default:
                return renderInput();
        }
    }

    const renderLabel = () => {
        if (!label || isEmpty(value)) return <></>;
        return (
            <Box >
                <FormLabel>{label}</FormLabel>
            </Box>
        );
    }

    const renderError = () => {
        if (!isError) return <></>;

        return (
            <FormErrorMessage>Error</FormErrorMessage>
        );
    };

    const renderHelp = () => {
        if (isError || !helpText) return <></>;
        return (
            <FormHelperText>Help</FormHelperText>
        );
    }
    if (type === "switch") {
        return (
            <Box>
                <FormControl isInvalid={isError}>
                    <Flex>
                        {renderLabel()}
                        {renderField()}
                    </Flex>
                </FormControl>
            </Box>
        );
    }

    return (
        <Box>
            <FormControl isInvalid={isError}>
                {renderLabel()}
                {renderField()}
                {renderError()}
                {renderHelp()}
            </FormControl>

        </Box>
    );
};

export default Field;