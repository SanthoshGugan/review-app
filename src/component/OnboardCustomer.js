import { Box, Button, Input } from "@chakra-ui/react";
import { ErrorMessage } from "@hookform/error-message";
import React from "react";
import { useForm } from "react-hook-form";
import { onboardCustomerApi } from "../api/CustomerApi";
import { createCustomerRequest } from "../utils/CustomerUtils";

const OnboardCustomer = (props) => {

    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting, isValid}
    } = useForm();
    const onSubmit = async (values) => {
        const customer = await onboardCustomerApi(createCustomerRequest(values));
        console.log(` Values : ${JSON.stringify(values)}`);
        console.log(` Customer : ${JSON.stringify(customer)}`);
    };

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
                <Button colorScheme="teal" type="submit" isLoading={isSubmitting} isDisabled={!isValid}> Sign up </Button>
            </form>
        </Box>
    );
};

export default OnboardCustomer;