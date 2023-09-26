import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { updateCustomerApi, verifyPasscodeApi } from "../api/CustomerApi";
import { updateCustomerPasswordRequest, verifyPasscodeRequest } from "../utils/CustomerUtils";
import { useParams } from "react-router-dom";
import { Alert, AlertIcon, Box, Button, Input, Stack } from "@chakra-ui/react";
import { ErrorMessage } from "@hookform/error-message";

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
    } = useForm();

    const {
        handleSubmit: handlePasswordSubmit,
        register: passwordRegister,
        formState: { errors: passwordErrors, isSubmitting: isSubmittingPassword, isValid: isValidPassword }
    } = useForm();

    const onSubmit = async (values) => {
        setIsVerificationComplete(false);
        const res = await verifyPasscodeApi(verifyPasscodeRequest({
            values,
            customer_sid
        }));

        const { is_verified } = res?.data;
        setIsVerificationComplete(true);
        setIsVerificationSuccess(is_verified);
    };

    const onSubmitPassword = async (values) => {
        try {
            setIsPasswordUpdateComplete(false);
            const res = await updateCustomerApi({ customer_sid, req: { customer_account: updateCustomerPasswordRequest(values) } });
            const customerDetail = res?.data;
            setIsPasswordUpdateComplete(true);
            setIsPasswordSuccessUpdated(true);
        } catch(err) {
            setIsPasswordSuccessUpdated(false);
            setIsPasswordUpdateComplete(true);
        }
    };

    return (
        <Box>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Box>
                    <Input
                        id="passcode"
                        {
                            ...register("passcode", {
                                required: "This is required",
                                minLength: {value: 6, message: "Passcode is of length 6."}
                            })
                        }
                    /><ErrorMessage errors={errors} name="passcode" />
                </Box>
                <Stack spacing={3}>
                    {isVerificationComplete && (
                        <Box>
                            <Alert status='error' hidden={isVerificationSuccess}>
                                <AlertIcon />
                                There was an error processing your passcode
                            </Alert>

                            <Alert status='success' hidden={!isVerificationSuccess}>
                                <AlertIcon />
                                Email verified!
                            </Alert>
                        </Box>
                    )}
                </Stack>
                <Button colorScheme="teal" type="submit" isLoading={isSubmitting} isDisabled={!isValid || isVerificationComplete}> Verify Email </Button>
            </form>
            <form onSubmit={handlePasswordSubmit(onSubmitPassword)}>
                <Box>
                    <Input 
                        id="password"
                        {
                            ...passwordRegister("password", {
                                required: "This is required",
                                minLength: { value: 6, "message": "Password should be 6 letters minimum"},
                                pattern: /[a-zA-Z0-9]+$/
                            })
                        }
                    />
                    <ErrorMessage errors={passwordErrors} name="password" />
                </Box>
                <Button  colorScheme="teal" type="submit" isLoading={isSubmittingPassword} isDisabled={!isValidPassword}>
                    Update Password
                </Button>
                <Stack spacing={3}>
                    {isPasswordUpdateComplete && (
                        <Box>
                            <Alert status='error' hidden={isPasswordUpdatedSuccess}>
                                <AlertIcon />
                                There was an error processing your passcode
                            </Alert>

                            <Alert status='success' hidden={!isPasswordUpdatedSuccess}>
                                <AlertIcon />
                                Password updated!
                            </Alert>
                        </Box>
                    )}
                </Stack>

            </form>
        </Box>
    );
};

export default VerifyPasscode;