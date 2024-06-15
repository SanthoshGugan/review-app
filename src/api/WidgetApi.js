import axios from "axios";

const BASE_URL = `${process.env.REACT_APP_BACKEND_API}/reviews/api/v1/widget`;

const CONFIG_BASE_URL = `${process.env.REACT_APP_BACKEND_API}/reviews/api/v1/widget/customer`;

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

// Configs
export const getReviewCarouselWidgetConfig = async ({ customer_sid }) => {
    return await axios.get(`${CONFIG_BASE_URL}/${customer_sid}/carouselConfig`);
};

export const updateReviewCarouselWidgetConfig = async ({ sid, customer_widget }) => {
    return await axios.put(`${CONFIG_BASE_URL}/${sid}`, {
        customer_widget
    })
};