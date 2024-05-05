import {  Center, useToast } from "@chakra-ui/react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { onboardUserApi } from "../api/UserApi";
import { createUserRequest } from "../utils/UserUtils";
import { useNavigate, useParams } from "react-router-dom";
import CenterCard from "../lib/CenterCard";
import RInput from "../lib/Input";
import { getButtonFormProps, getInputFormProps } from "../utils/formUtil";
import { emailRegex } from "../utils/regexUtil";
import RButton from "../lib/Button";
import { CUSTOMER_USERS_LIST_URL } from "../utils/urlUtil";

const AddUser = (props) => {

    const { customer_sid } = useParams();
    const toast = useToast();
    const navigate = useNavigate();

    const [ isAddUserComplete, setIsAddUserComplete ] = useState(false);
    const [ isAddUserSuccess, setIsAddUserSuccess ] = useState(false);

    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting, isValid},
        getFieldState
    } = useForm({
        mode: "onTouched"
    });

    const form_props = {
        register,
        errors,
        getFieldState
    };

    const onSubmit = async (values) => {
        try {
            setIsAddUserComplete(false);
            const user = await onboardUserApi(createUserRequest({ values, customer_sid }));
            setIsAddUserComplete(true);
            setIsAddUserSuccess(true);
            
            toast({
                title: "User Created",
                description: "Navigating back to user list",
                status: "success",
                duration: 5000,
                isClosable: true,
              });

              setTimeout(() => {
                navigate(CUSTOMER_USERS_LIST_URL({ customer_sid }))
              }, 3000)
        } catch(err) {
            setIsAddUserComplete(true);
            setIsAddUserSuccess(false);
            const { message = "Error while adding user! "}  = err?.response?.data || {};
            toast({
                title: `${message}`,
                description: "Please retry or reach out to us",
                status: "error",
                isClosable: true,
              })
        }
    };

    return (
        <CenterCard title="Add User">
            <form onSubmit={handleSubmit(onSubmit)}>
                <RInput
                    formProps = {getInputFormProps({
                            id: "name",
                            placeholder: "user name",
                            isRequired: true,
                            minLength: 4,
                        })
                    }
                    {
                        ...form_props
                    }
                />

                <RInput
                    formProps = {getInputFormProps({
                            id: "email",
                            placeholder: "email",
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
                        })
                    }
                    {
                        ...form_props
                    }
                /> */}

                <RInput
                    formProps = {getInputFormProps({
                            id: "city",
                            placeholder: "city",
                        })
                    }
                    {
                        ...form_props
                    }
                />

                <RInput
                    formProps = {getInputFormProps({
                            id: "country",
                            placeholder: "country",
                        })
                    }
                    {
                        ...form_props
                    }
                />
                <Center>
                    <RButton
                        text="Add"
                        buttonProps={getButtonFormProps({
                            isDisabled: !isValid || (isAddUserComplete && isAddUserSuccess),
                            isLoading: isSubmitting
                        })}
                    />
                </Center>
            </form>
        </CenterCard>
    );
};

export default AddUser;