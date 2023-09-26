import { Box, Button, Input } from "@chakra-ui/react";
import { ErrorMessage } from "@hookform/error-message";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { onboardCustomerApi } from "../api/CustomerApi";
import { createCustomerRequest, trimOrganizationName } from "../utils/CustomerUtils";
import { CUSTOMER_USERNAME_MAX_LENGTH } from "../utils/constants";
import VerifyPasscode from "./VerifyPasscode";

const OnboardCustomer = (props) => {

    const [ showVerifyPasscode, setShowVerifyPasscode ] = useState(false);
    const [ customerSid, setCustomerSid ] = useState(null);

    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting, isValid},
        setValue
    } = useForm();

    const onSubmit = async (values) => {
        const customer = await onboardCustomerApi(createCustomerRequest(values));
        const { customer_sid } = customer?.data;
        if(customer_sid) {
            setCustomerSid(customerSid);
        }
        setShowVerifyPasscode(true)
    };

    const onOrgNameChange = (e) => {
        const value = e?.target?.value;
    if (!value || value.length < 4) return;
        const username = trimOrganizationName(value);
        setValue("username", username.toLowerCase().slice(0, CUSTOMER_USERNAME_MAX_LENGTH));
    }

    return (
        <Box>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Box>
                    <Input
                        id="organizationName"
                        placeholder="organization name"
                        {
                            ...register("organizationName", {
                                required: "This is required",
                                minLength: { value: 4, message: "Minimum length should be 4."}
                            })
                        }
                        onChange={onOrgNameChange}
                    />
                    <ErrorMessage errors={errors} name="organizationName" />
                </Box>
                <Box>
                    <Input
                        id="email"
                        placeholder="Email"
                        {
                            ...register("email", {
                                required: "This is required",
                                minLength: { value: 4, message: "Minimum length should be 4."},
                            })
                        }
                    />
                    <ErrorMessage errors={errors} name="email" />
                </Box>
                <Box>
                    <Input
                        id="phoneNumber"
                        placeholder="phone number"
                        {
                            ...register("phoneNumber", {
                                required: "This is required",
                                minLength: { value: 4, message: "Minimum length should be 4."}
                            })
                        }
                    />
                    <ErrorMessage errors={errors} name="phoneNumber" />
                </Box>
                <Box>
                    <Input
                        id="address"
                        placeholder="address"
                        {
                            ...register("address", {
                                required: "This is required",
                                minLength: { value: 4, message: "Minimum length should be 4."}
                            })
                        }
                    />
                    <ErrorMessage errors={errors} name="address" />
                </Box>

                <Box marginBottom="10px">
                    <Input
                        id="username"
                        placeholder="username"
                        {
                            ...register("username", {
                             required: "This is required",
                             minLength: {value: 4, message: "Minimum length should be 4."},
                             maxLength: {value: CUSTOMER_USERNAME_MAX_LENGTH, message: `Maximum length should be ${CUSTOMER_USERNAME_MAX_LENGTH}.`},
                             pattern: /^[a-z0-9]+$/,
                            })
                        }
                    />
                    <ErrorMessage errors={errors} name="username" />
                </Box>
                <Button colorScheme="teal" type="submit" isLoading={isSubmitting} isDisabled={!isValid}> Sign up </Button>
            </form>
        </Box>
    );
};

export default OnboardCustomer;