import { Box, VStack, useToast } from "@chakra-ui/react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { onboardCustomerApi } from "../api/CustomerApi";
import { createCustomerRequest, trimOrganizationName } from "../utils/CustomerUtils";
import { CUSTOMER_USERNAME_MAX_LENGTH } from "../utils/constants";
import RInput from "../lib/Input";
import { getButtonFormProps, getInputFormProps } from "../utils/formUtil";
import { emailRegex } from "../utils/regexUtil";
import RButton from "../lib/Button";
import { NavLink, useNavigate } from "react-router-dom";
import { VERIFY_PASSCODE_URL } from "../utils/urlUtil";
import CenterCard from "../lib/CenterCard";

const CustomerOnboard = (props) => {

    const [ customerSid, setCustomerSid ] = useState(null);
    const [ signUpComplete, setSignUpComplete ] = useState(false);
    const [ isSignupInProgress, setIsSignupInProgress ] = useState(false);

    const navigate = useNavigate();


    const toast = useToast();

    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting, isValid},
        setValue,
        getFieldState
    } = useForm({
        mode: "onTouched"
    });

    const form_props = {
        errors,
        register,
        getFieldState
    };
    
    const onSubmit = async (values) => {
        try {
            setIsSignupInProgress(true);
            const customer = await onboardCustomerApi(createCustomerRequest(values));
            const { customer_sid } = customer?.data;
            if(customer_sid) {
                setCustomerSid(customer_sid);
            }

            toast({
                title: "Account Created",
                description: "Please click on the link sent over mail for verification!",
                status: "success",
                duration: 5000,
                isClosable: true,
              })
            setSignUpComplete(true);
            setIsSignupInProgress(false);
    
        } catch (err) {
            setIsSignupInProgress(false);

            toast({
                title: "Account creation failed",
                description: "Please retry or reach out to us!",
                status: "error",
                duration: 5000,
                isClosable: true,
              })
        }
    };

    const onOrgNameChange = (e) => {
        const value = e?.target?.value;
        if (!value || value.length < 4) return;
        const username = trimOrganizationName(value);
        setValue("username", username.toLowerCase().slice(0, CUSTOMER_USERNAME_MAX_LENGTH));
    }

    return (
        <CenterCard scheme="blue" title="Create new Account">
            <form onSubmit={handleSubmit(onSubmit)}>
                <VStack spacing="1.5rem">
                    <RInput
                        formProps = {getInputFormProps({
                                id: "organizationName",
                                placeholder: "organization name",
                                isRequired: true,
                                minLength: 4,
                            })
                        }
                        {
                            ...form_props
                        }

                        onChange={onOrgNameChange}
                    />

                    <RInput
                        formProps = {getInputFormProps({
                                id: "email",
                                placeholder: "Email",
                                isRequired: true,
                                minLength: 4,
                                patternReg: emailRegex
                            })
                        }
                        {
                            ...form_props
                        }
                    />
                    {/* <RInput
                        formProps = {getInputFormProps({
                                id: "phoneNumber",
                                placeholder: "phone number",
                                isRequired: true,
                                minLength: 4,
                                patternReg: /[0-9+]/
                            })
                        }
                        {
                            ...form_props
                        }
                    /> */}

                    {/* <RInput
                        formProps = {getInputFormProps({
                                id: "address",
                                placeholder: "address",
                                isRequired: false,
                            })
                        }
                        {
                            ...form_props
                        }
                    /> */}

                    <RInput
                        formProps = {getInputFormProps({
                                id: "password",
                                placeholder: "password",
                                isRequired: true,
                            })
                        }
                        {
                            ...form_props
                        }
                    />
                    <RButton
                        text="Sign up"
                        buttonProps={getButtonFormProps({
                            isDisabled: signUpComplete,
                            isLoading: isSignupInProgress
                        })}
                    />
                </VStack>
            </form>
        </CenterCard>
    );
};

export default CustomerOnboard;