import { Button } from "@chakra-ui/button";
import { Box, Flex } from "@chakra-ui/layout";
import React from "react";
import { useParams } from "react-router";
import useCustomerCheckout from "../../hooks/useCustomerCheckout";

const CustomerPayment = ({ }) => {

    const { customer_sid } = useParams();

    const onSuccess = () => {};
    const onFailure = () => {};

    const { orderId, createOrder, checkout, isSuccess, isFailure } = useCustomerCheckout({ customer_sid, onSuccess, onFailure });

    const renderConfirmPlan = () => {
        return (
            <Flex justifyContent="center" alignItems="center">
                <Box>You have selected Prodiuct Pricing Plan 1. Please go ahead and confirm your selection</Box>
                <Button onClick={() => createOrder({ amount: 500 })}> Create Order</Button>
            </Flex>
        );
    }

    const renderCheckout = () => {
        return (<Flex>
            <Button onClick={() => checkout()}> Checkout</Button>     
        </Flex>);
    }

    const renderSuccessPayment = () => {
        return (<>Success!</>)
    }

    const renderFailurePayment = () => {
        return (<>Failed!</>)
    }

    return (
     <>
        {!orderId && renderConfirmPlan()}
        {orderId && renderCheckout()}
        {isSuccess && renderSuccessPayment()}
        {isFailure && renderFailurePayment()}
     </>   
    );
};

export default CustomerPayment;