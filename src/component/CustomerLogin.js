import {  VStack, useToast } from "@chakra-ui/react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { CUSTOMER_USERNAME_MAX_LENGTH } from "../utils/constants";
import { loginCustomerApi } from "../api/CustomerApi";
import { loginCustomerRequest } from "../utils/CustomerUtils";
import CenterCard from "../lib/CenterCard";
import RInput from "../lib/Input";
import { getButtonFormProps, getInputFormProps } from "../utils/formUtil";
import RButton from "../lib/Button";
import { useNavigate } from "react-router-dom";
import { CUSTOMER_USERS_LIST_URL } from "../utils/urlUtil";
import { emailRegex } from "../utils/regexUtil";

const CustomerLogin = (props) => {

    const [ isLoginSuccessful, setIsLoginSuccessful ] = useState(false);
    const [ isLoginComplete, setIsLoginComplete ] = useState(false);
    const [ failureReason, setFailureReason ] = useState(false);
    const [ isNavigating, setIsNavigating ] = useState(false);
    const toast = useToast();

    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting, isValid },
        getFieldState
    } = useForm({
        mode: "onTouched"
    });

    const navigate = useNavigate();

    const form_props = {
        register,
        errors,
        getFieldState
    }

    const onSubmit = async (values) => {
        try {
            setIsLoginComplete(false);
            const { data = {} } = await loginCustomerApi(loginCustomerRequest(values));
            const { is_verified = false, message, customer_sid } = data;
            setIsLoginSuccessful(is_verified);
            setIsLoginComplete(true);
            
            if (!is_verified) {
                setFailureReason(message);
                toast({
                    title: "Invalid Credentials!",
                    description: "Please retry with valid credentials.",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                  })
            } else {
                toast({
                    title: "Successfully logged in",
                    description: "Navigating to users page",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                  })
                  setIsNavigating(true);
                  setTimeout(() => {
                    setIsNavigating(false);
                    navigate(CUSTOMER_USERS_LIST_URL({ customer_sid }))
                  }, 2000)
            }

        } catch (err) {
            setIsLoginSuccessful(false);
            setIsLoginComplete(true);
            toast({
                title: "Error while logging in",
                description: "Please retry.If persists, contact us.",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        }
    };

    return (
        <CenterCard scheme="blue" title="Login to Account">
            <form onSubmit={handleSubmit(onSubmit)}>
            <VStack>
        
                <RInput
                    formProps = {getInputFormProps({
                            id: "username",
                            placeholder: "email",
                            isRequired: true,
                            patternReg: emailRegex
                        })
                    }
                    {
                        ...form_props
                    }
                />

                <RInput
                    formProps = {getInputFormProps({
                            id: "password",
                            placeholder: "password",
                            isRequired: true,
                            minLength: 4,
                        })
                    }
                    {
                        ...form_props
                    }
                    type="password"
                />
                <RButton
                    text="Login"
                    buttonProps={getButtonFormProps({
                        isDisabled: !isValid,
                        isLoading: isSubmitting || isNavigating,
                    })}
                />
            </VStack>
            </form>
        </CenterCard>
    );
};

export default CustomerLogin;