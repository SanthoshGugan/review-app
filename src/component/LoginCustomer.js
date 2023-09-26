import { Alert, AlertIcon, Box, Button, Input, Stack, Text, useStatStyles } from "@chakra-ui/react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { CUSTOMER_USERNAME_MAX_LENGTH } from "../utils/constants";
import { ErrorMessage } from "@hookform/error-message";
import { loginCustomerApi } from "../api/CustomerApi";
import { loginCustomerRequest } from "../utils/CustomerUtils";

const LoginCustomer = (props) => {

    const [ isLoginSuccessful, setIsLoginSuccessful ] = useState(false);
    const [ isLoginComplete, setIsLoginComplete ] = useState(false);
    const [ failureReason, setFailureReason ] = useState(false);

    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting, isValid },
    } = useForm();

    const onSubmit = async (values) => {
        setIsLoginComplete(false);
        const { data = {} } = await loginCustomerApi(loginCustomerRequest(values));
        const { is_verified = false, message } = data;
        setIsLoginSuccessful(is_verified);
        setIsLoginComplete(true);
        if (!is_verified) {
            setFailureReason(message);
        }
    };

    console.log(" Is form valid " + isValid + "   errors : "+JSON.stringify(errors));

    return (
        <Box>
            <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={3}>
                {isLoginComplete && (
                    <Box>
                        <Alert status='error' hidden={isLoginSuccessful}>
                            <AlertIcon />
                            {failureReason}
                        </Alert>

                        <Alert status='success' hidden={!isLoginSuccessful}>
                            <AlertIcon />
                            Logged in!
                        </Alert>
                    </Box>
                )}
            </Stack>
            <Box>
                <Input
                    id="username"
                    {
                        ...register("username", {
                            required: "This is required",
                            minLength: {value: 4, message: "Minimum length should be 4."},
                            maxLength: {value: CUSTOMER_USERNAME_MAX_LENGTH, message: `Maximum length should be ${CUSTOMER_USERNAME_MAX_LENGTH}.`},
                            pattern: /^[a-z0-9]+$/
                        })
                    }
                    placeholder="username"
                />
                <ErrorMessage errors={errors} name="username" />
            </Box>

            <Box>
                <Input
                    id="password"
                    
                    {
                        ...register("password", {
                            required: "This is required",
                            minLength: {value: 4, message: "Minimum length should be 4."},
                            maxLength: {value: CUSTOMER_USERNAME_MAX_LENGTH, message: `Maximum length should be ${CUSTOMER_USERNAME_MAX_LENGTH}.`},
                        })
                    }
                    placeholder="password"
                />
                <ErrorMessage errors={errors} name="password" />
            </Box>
            <Box>
                <Button
                    type="submit"
                    colorScheme="teal"
                    isLoading={isSubmitting}
                    isDisabled={!isValid}
                >
                    Login</Button>
            </Box>
            </form>
        </Box>
    );
};

export default LoginCustomer;