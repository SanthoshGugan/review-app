import { Badge, Box, Card, CardBody, Container, Flex, Stack, Text } from "@chakra-ui/react";
import React from "react";
import { Link, useParams } from "react-router-dom";
import useCustomerDetails from "../hooks/useCustomerDetails";

const CustomerDashboard = () => {
    
    const { customer_sid } = useParams();

    const { accessKey } = useCustomerDetails({ customer_sid });

    return (
        <Box>
            <Flex alignItems="center" justifyContent="center" gap="1rem" margin="2rem 0">
                <Card direction="column" gap="1rem" padding="1rem">
                    <Text> Access Key</Text>
                    <Text bgColor="green.300" padding="1rem" borderRadius="0.5rem" fontWeight="bold">{accessKey}</Text>
                </Card>
            </Flex>
            <Flex alignItems="center" justifyContent="center" gap="1rem" margin="2rem 0">
                <Card direction="column" gap="1rem" padding="1rem">
                    <Text> Customer Sid</Text>
                    <Text bgColor="green.300" padding="1rem" borderRadius="0.5rem" fontWeight="bold">{customer_sid}</Text>
                </Card>
            </Flex>

            <Flex wrap="wrap" margin="2rem" justifyContent="center" gap="3rem">
                <Link to={`/${customer_sid}/users`} flex="1/4 0 ">
                    <Card  fontWeight="bold" padding="3rem" color="goldenrod" _hover={{ bg: "yellow.200", color: 'golden'}}>
                        <Text>Users</Text>
                    </Card>
                </Link>
                <Link to={`/${customer_sid}/reviews`} flex="1/4 0 ">
                    <Card  fontWeight="bold" padding="3rem" color="goldenrod" _hover={{ bg: "yellow.200", color: 'golden'}}>
                        <Text>Reviews</Text>
                    </Card>
                </Link>
                <Link to={`/${customer_sid}/products`} flex="1/4 0 ">
                    <Card  fontWeight="bold" padding="3rem" color="goldenrod" _hover={{ bg: "yellow.200", color: 'golden'}}>
                        <Text>Products</Text>
                    </Card>
                </Link>
            </Flex>
        </Box>
    );
};

export default CustomerDashboard;