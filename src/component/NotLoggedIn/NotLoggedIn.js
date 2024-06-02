import React from "react";
import { Outlet } from "react-router-dom";

const NotLoggedIn = ({}) => {
    return (<>
        <Outlet />
    </>);
};

export default NotLoggedIn;