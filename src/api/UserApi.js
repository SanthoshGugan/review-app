import axios from "axios";

const BASE_URL = `${process.env.REACT_APP_BACKEND_API}/reviews/api/v1/user`;

export const onboardUserApi = async (user) => {
    return await axios.post(`${BASE_URL}`, { ...user });
}

export const fetchUsersApi = async ({ customer_sid }) => {
    return await axios.get(`${BASE_URL}/${customer_sid}`);
}