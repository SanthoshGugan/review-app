import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { updateCustomerApi, verifyPasscodeApi } from "../api/CustomerApi";
import { updateCustomerPasswordRequest, verifyPasscodeRequest } from "../utils/CustomerUtils";
import { NavLink, useParams } from "react-router-dom";
import { Box, VStack, useToast } from "@chakra-ui/react";
import CenterCard from "../lib/CenterCard";
import RInput from "../lib/Input";
import { getButtonFormProps, getInputFormProps } from "../utils/formUtil";
import RButton from "../lib/Button";
import { CUSTOMER_LOGIN_URL } from "../utils/urlUtil";

const VerifyPasscode = (props) => {

    const { customer_sid } = useParams();
    const [ isVerificationSuccess, setIsVerificationSuccess ] = useState(false);
    const [ isVerificationComplete, setIsVerificationComplete ] = useState(false);

    const [ isPasswordUpdatedSuccess, setIsPasswordSuccessUpdated ] = useState(false);
    const [ isPasswordUpdateComplete, setIsPasswordUpdateComplete ] = useState(false);

    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting, isValid },
        getFieldState
    } = useForm({
        mode: "onTouched"
    });

    const form_props = {
        errors,
        register,
        getFieldState
    };


    const toast = useToast();

    const {
        handleSubmit: handlePasswordSubmit,
        register: passwordRegister,
        formState: { errors: passwordErrors, isSubmitting: isSubmittingPassword, isValid: isValidPassword },
        getFieldState: passwordGetFieldState,
    } = useForm();

    const onSubmit = async (values) => {
        try {
            setIsVerificationComplete(false);
            const res = await verifyPasscodeApi(verifyPasscodeRequest({
                values,
                customer_sid
            }));
    
            const { is_verified } = res?.data;
            setIsVerificationComplete(true);
            setIsVerificationSuccess(is_verified);

            if (!is_verified) {
                toast({
                    title: "Wrong Passcode!",
                    description: "Please verify with passcode (case-sensitive) sent over mail!",
                    status: "info",
                    duration: 5000,
                    isClosable: true,
                  })
            } else {
                toast({
                    title: "Passcode verification complete",
                    description: "Please proceed with password update.",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                  })

            }
        } catch (err) {
            setIsVerificationComplete(true);
            setIsVerificationSuccess(false);
            toast({
                title: "Error while verifying passcode",
                description: "Please retry or try signup again. If persists contact us.",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        }
    };

    const onSubmitPassword = async (values) => {
        try {
            setIsPasswordUpdateComplete(false);
            const res = await updateCustomerApi({ customer_sid, req: { customer_account: updateCustomerPasswordRequest(values) } });
            const customerDetail = res?.data;
            setIsPasswordUpdateComplete(true);
            setIsPasswordSuccessUpdated(true);
            toast({
                title: "Password updated",
                description: "Please proceed with login!",
                status: "success",
                duration: 5000,
                isClosable: true,
              })
        } catch(err) {
            setIsPasswordSuccessUpdated(false);
            setIsPasswordUpdateComplete(true);
            toast({
                title: "Error while updating password",
                description: "Please retry or reach out to us.",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        }
    };

    return (
        <CenterCard>
            <form onSubmit={handleSubmit(onSubmit)}>
                <VStack>
                    <RInput
                        formProps = {getInputFormProps({
                                id: "passcode",
                                placeholder: "passcode",
                                isRequired: true,
                                minLength: 6,
                            })
                        }
                        {
                            ...form_props
                        }
                    />
                    <RButton
                        text="Verify Email"
                        buttonProps={getButtonFormProps({
                            isDisabled: !isValid || (isVerificationComplete && isVerificationSuccess),
                            isLoading: isSubmitting,
                        })}
                    />
                </VStack>
            </form>
            {isVerificationComplete && isVerificationSuccess && (
                <Box marginTop="10vh">
                    <form onSubmit={handlePasswordSubmit(onSubmitPassword)}>
                        <VStack>
                            <RInput
                                    formProps = {getInputFormProps({
                                            id: "password",
                                            placeholder: "password",
                                            isRequired: true,
                                            minLength: 6,
                                            pattern: /[a-zA-Z0-9]+$/
                                        })
                                    }
                                    register={passwordRegister}
                                    errors={passwordErrors}
                                    getFieldState={passwordGetFieldState}
                                    size='lg'
                            />
                            <RButton
                                text="Update Password"
                                buttonProps={getButtonFormProps({
                                    isDisabled: !isValidPassword,
                                    isLoading: isSubmittingPassword,
                                })}
                            />
                            <Box>
                                {isPasswordUpdateComplete && isPasswordUpdatedSuccess &&  (
                                <NavLink
                                    to={CUSTOMER_LOGIN_URL()} 
                                    style={{
                                        color: "blue",
                                        textDecoration: "underline"
                                    }}
                                >
                                    proceed to login
                                </NavLink>)}
                            </Box>
                        </VStack>
                    </form>
                </Box>
            )}
        </CenterCard>
    );
};

export default VerifyPasscode;