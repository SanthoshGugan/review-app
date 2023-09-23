import { Box, Button, Input } from "@chakra-ui/react";
import { ErrorMessage } from "@hookform/error-message";
import React from "react";
import { useForm } from "react-hook-form";
import { createCustomerRequest } from "../utils/CustomerUtils";
import { onboardUserApi } from "../api/UserApi";
import { createUserRequest } from "../utils/UserUtils";
import { useParams } from "react-router-dom";

const AddUser = (props) => {

    const { customer_sid } = useParams();

    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting, isValid}
    } = useForm();
    const onSubmit = async (values) => {
        const customer = await onboardUserApi(createUserRequest({ values, customer_sid }));
    };

    return (
        <Box>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Box>
                    <Input
                        id="name"
                        placeholder="name"
                        {
                            ...register("name", {
                                required: "This is required",
                                minLength: { value: 4, message: "Minimum length should be 4."}
                            })
                        }
                    />
                    <ErrorMessage errors={errors} name="name" />
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
                <Button colorScheme="teal" type="submit" isLoading={isSubmitting} isDisabled={!isValid}> Sign up </Button>
            </form>
        </Box>
    );
};

export default AddUser;