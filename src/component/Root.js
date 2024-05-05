import React, { useEffect } from "react";
import { redirect, useNavigate } from "react-router-dom";
const Root = () => {
    const navigate = useNavigate();
    useEffect(() => {
        console.log(`redirecting.....`)
        navigate('/login');
    });
    return (
        <>Unauthorized</>
    );
}

export default Root;