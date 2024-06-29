import axios from "axios";

const BASE_URL = `${process.env.REACT_APP_BACKEND_API}/reviews/api/v1/customer`;
export const uploadCustomerLogoApi = async ({ customer_sid, filename, file }) => {
    const headers = {
        'Content-Type': 'image/*',
        'Content-Disposition': `attachment`,
        'customer_sid': customer_sid,
        "filename": filename
    };
    return await axios.post(`${BASE_URL}/uploadlogo`, file, { headers });
};

export const getDefaultEmailConfigApi = async () => {
    return await axios.get(`${BASE_URL}/defaultConfig`);
};

export const postEmailConfigApi = async ({ config, customer_sid }) => {
    const headers = { customer_sid }
    return await axios.post(`${BASE_URL}/emailTemplate`, config, { headers });
};