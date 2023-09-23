import React, { useEffect, useState } from "react";
import { fetchUsersApi } from "../api/UserApi";

const useUserList = ({ customer_sid }) => {

    const [ users, setUsers ] = useState([]);
    const [ fetchInProgress, setFetchInProgress ] = useState(false);
    const [ errorInFetch, setErrorInFetch ] = useState(false);

    const fetchUsersList = async () => {
        try {
            setFetchInProgress(true);
            const response = await fetchUsersApi({ customer_sid });
            const { data: { users: userList = [] }} = response || {};

            setUsers(userList);
            setFetchInProgress(false);
            setErrorInFetch(false);
        } catch (err) {
            setErrorInFetch(true);
        }
    };

    useEffect(() => {
        
    }, [customer_sid]);

    return {
        fetchUsersList,
        fetchInProgress,
        errorInFetch,
        users,

    };
};

export default useUserList;