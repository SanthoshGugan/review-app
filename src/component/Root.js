import { Box } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { Outlet, redirect, useNavigate } from "react-router-dom";
import Header from "./header/header";
const Root = () => {
    const navigate = useNavigate();
    useEffect(() => {
    });
    return (
        <Box>
            <Header customer_sid="CS00039"/>
            <Box height="6rem" bgColor="transparent" />
            <Box><Outlet /></Box>
        </Box>
    );
}

export default Root;