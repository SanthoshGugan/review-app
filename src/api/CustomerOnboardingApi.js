import axios from "axios";

const BASE_URL = `${process.env.REACT_APP_BACKEND_API}/reviews/api/v1/customeronboarding`;

export const getCustomerOnboardingApi = async ({ customer_sid }) => {
    return await axios.get(`${BASE_URL}`, {
        headers: {
            customer_sid
        }
    })
};

export const getCustomerDetailsApi = async ({ customer_sid }) => {
    return await axios.get(`${BASE_URL}/customer`, {
        headers: {
            customer_sid
        }
    })
};

export const resendVerificationEmailApi = async ({ customer_sid }) => {
    return await axios.post(`${BASE_URL}/emailverification`, {},{
        headers: {
            customer_sid
        }
    })
}