import axios from "axios";

const BASE_URL = `${process.env.REACT_APP_BACKEND_API}/reviews/api/v1/widget`;

export const fetchWidgetsApi = async () => {
    return await axios.get(`${BASE_URL}/`);
};

export const fetchCustomerWidgetsApi = async ({ customer_sid }) => {
    return await axios.get(`${BASE_URL}/customer/${customer_sid}`);
}

export const addCustomerWidgetApi = async ({ req }) => {
    return await axios.post(`${BASE_URL}/customer`, { ...req });
}

export const updateCustomerWidgetApi = async ({ customer_widget_sid, req }) => {
    return await axios.put(`${BASE_URL}/customer/${customer_widget_sid}`);
};