import axios from "axios";
import { INTERNAL_ROLE_HEADER } from "../utils/urlUtil";

const BASE_URL = `${process.env.REACT_APP_BACKEND_API}/reviews/api/v1/user`;

export const onboardUserApi = async (user) => {
    return await axios.post(`${BASE_URL}`, { ...user }, {
        ...INTERNAL_ROLE_HEADER
    });
}

export const fetchUsersApi = async ({ customer_sid, headers = INTERNAL_ROLE_HEADER }) => {
    return await axios.get(`${BASE_URL}/customer/${customer_sid}`, {
        ...headers
    });
}
