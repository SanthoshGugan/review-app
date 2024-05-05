import React, { useEffect, useState } from "react";
import { fetchCustomerApi } from "../api/CustomerApi";

const useCustomerDetails = ({ customer_sid }) => {

    const [ accessKey, seAccessKey ] = useState(null);

    const fetchCustomerDetails = async () => {

        const res = await fetchCustomerApi({ customer_sid });
        const { access_key } = res?.data;
        seAccessKey(access_key);
    }

    useEffect(() => {
        fetchCustomerDetails();
    }, [customer_sid])

    return {
        accessKey
    };
};

export default useCustomerDetails;