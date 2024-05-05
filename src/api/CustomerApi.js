import axios from "axios";
import { INTERNAL_ROLE_HEADER } from "../utils/urlUtil";

const BASE_URL = `${process.env.REACT_APP_BACKEND_API}/reviews/api/v1/customer`;

export const onboardCustomerApi = async (customer) => {
    return await axios.post(`${BASE_URL}`, { ...customer });
};

export const verifyPasscodeApi = async (req) => {
    return await axios.post(`${BASE_URL}/verify-email`, { ...req });
};

export const updateCustomerApi = async ({customer_sid, req}) => {
    return await axios.put(`${BASE_URL}/${customer_sid}/account`, { ...req });
};

export const loginCustomerApi = async (req) => {
    return await axios.post(`${BASE_URL}/login`, {...req});
};

export const fetchCustomerApi = async ({ customer_sid }) => {
    return await axios.get(`${BASE_URL}/${customer_sid}`, {
        ...INTERNAL_ROLE_HEADER
    });
};