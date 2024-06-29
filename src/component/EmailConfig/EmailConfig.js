import { Box, VStack } from "@chakra-ui/react";
import React from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import useEmailConfig from "../../hooks/useEmailConfig";
import FileUpload from "../../lib/FileUpload/FileUpload";
import { getButtonFormProps, getInputFormProps } from "../../utils/formUtil";
import RInput from "../../lib/Input";
import RButton from "../../lib/Button";
import { getDefaultEmailConfigApi } from "../../api/customerEmailConfigApi";

const EmailConfig = ({}) => {

    const { customer_sid } = useParams();

    const { uploadLogo, logoUrl, onSubmit, config } = useEmailConfig({ customer_sid });

    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting, isValid },
        getFieldState
    } = useForm({
        mode: "onTouched",
        defaultValues: async () => await getDefaultEmailConfigApi()
    });

    const form_props = {
        register,
        errors,
        getFieldState
    }

    const renderUploadImage = () => {
        return (
            <FileUpload
                onUpload={({ file }) => uploadLogo({ file })}
                id = "company__logo__"
                btnText="Upload Logo"
                accept="image/*"
            />
        );
    };  

    const renderForm = () => {
        return (
            <Box w="100%" h="100%">
                {/* <CenterCard scheme="blue" title="Login to Account" > */}
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <VStack>
                            <RInput
                                formProps = {getInputFormProps({
                                    id: "name",
                                    placeholder: "Company Name",
                                    isRequired: true,
                                })}
                                {
                                    ...form_props
                                }
                            />
                            <RInput
                                formProps = {getInputFormProps({
                                    id: "mail_content",
                                    placeholder: "Mail Content",
                                    isRequired: true,
                                    type: "textBox"
                                })}
                                {
                                    ...form_props
                                }
                            />
                            <RInput
                                formProps = {getInputFormProps({
                                    id: "feedback_request",
                                    placeholder: "Feedback Request",
                                    isRequired: true,
                                    type: "textBox"
                                })}
                                {
                                    ...form_props
                                }
                            />
                            <RInput
                                formProps = {getInputFormProps({
                                    id: "footer",
                                    placeholder: "Footer content",
                                    isRequired: true,
                                    type: "textBox"
                                })}
                                {
                                    ...form_props
                                }
                            />
                            <RInput
                                formProps = {getInputFormProps({
                                    id: "signature",
                                    placeholder: "Signature",
                                    isRequired: true,
                                    type: "textBox"
                                })}
                                {
                                    ...form_props
                                }
                            />
                            <RButton
                                text="Login"
                                buttonProps={getButtonFormProps({
                                    isDisabled: !isValid,
                                    isLoading: isSubmitting,
                                })}
                            />
                        </VStack>
                    </form>
                {/* </CenterCard> */}
            </Box>
        );
    }

    return (
        <>
            {renderUploadImage()}
            {renderForm()}
        </>
    );
};

export default EmailConfig;