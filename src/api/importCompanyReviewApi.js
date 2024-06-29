import axios from "axios"


const BASE_URL = `${process.env.REACT_APP_BACKEND_API}/reviews/api/v1/import`;

export const getImportCompanyReviewTemplateApi = () => {
    return axios.get(`${BASE_URL}/template`);
};

export const postImportCompanyReviewByCsvApi = async ({ filename, customer_sid, file }) => {
    const headers = {
        'Content-Type': 'multipart/form-data',
        'Content-Disposition': `attachment; filename="${filename}.jpg"`,
        'customer_sid': customer_sid,
    };
    return await axios.post(`${BASE_URL}/customer`, file, { headers });
};