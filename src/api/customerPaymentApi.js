import axios from "axios";

const BASE_URL = `${process.env.REACT_APP_BACKEND_API}/reviews/api/v1/payment`;

export const createOrderCustomerPaymentApi = async ({ req, customer_sid  }) => {
    return await axios.post(`${BASE_URL}/order`, { ...req }, {
        headers: {
            customer_sid
        }
    });
};