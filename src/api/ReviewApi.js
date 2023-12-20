import axios from "axios";

const BASE_URL = `${process.env.REACT_APP_BACKEND_API}/reviews/api/v1/review`;
const BASE_URL_REVIEW_IAMGE = `${process.env.REACT_APP_BACKEND_API}/reviews/api/v1/reviewImage`

export const requestReviewApi = async ({ customer_sid, req }) => {
    return await axios.post(`${BASE_URL}/${customer_sid}/trigger`, { ...req });
}

export const fetchReviewApi = async ({ review_sid }) => {
    return await axios.get(`${BASE_URL}/${review_sid}`);
}

export const updateReviewApi = async ({ review_sid, req }) => {
    return await axios.put(`${BASE_URL}/${review_sid}`, {...req});
}

export const fetchReviewsApi = async ({ customer_sid, tags = false }) => {
    return await axios.get(`${BASE_URL}?customer_sid=${customer_sid}&tags=${tags}`);
}

export const fetchReviewTagsForCustomerApi = async ({ customer_sid }) => {
    return await axios.get(`${BASE_URL}/customer/${customer_sid}/tags`);
};

export const addTagToReviewApi = async ({ review_sid, req }) => {
    return await axios.post(`${BASE_URL}/${review_sid}/tag`, {...req });
};

export const removeTagFromReviewApi = async ({ review_sid, tag_sid }) => {
    return await axios.delete(`${BASE_URL}/${review_sid}/tag/${tag_sid}`);
};

export const uploadReviewImageApi = async ({ customer_sid, file, user_sid }) => {
    const headers = {
        'Content-Type': 'image/png',
        'Content-Disposition': `attachment"`,
        'user_sid': user_sid
      };
    return await axios.post(`${BASE_URL_REVIEW_IAMGE}/${customer_sid}`, file, { headers });
};

export const uploadReviewUrl = ({ customer_sid }) => `${BASE_URL_REVIEW_IAMGE}/${customer_sid}`;