

export const formatReviewImportForTable = (review) => {
    if (!review) return null;
    const { user = {}, content = [] } = review;

    const { name = "", email = "", props = {}, phone_number  } = user;
    const { external_id = "" } = props;

    const [product_satisfaction = {}, product_feedback = {} ] = content;

    const { answer = 5, max_value = 5 } = product_satisfaction;
    const { title = "", answer: feedback = "" } = product_feedback;

    return {
        name,
        email,
        phone_number,
        external_id,
        title,
        feedback,
        rating: answer,
        max_rating: max_value
    }
};

export const formatProductReviewImportForTable = (review) => {
    if (!review) return null;
    const { user = {}, content = [], product = {}, feature_props = {} } = review;

    const { name = "", email = "",  phone_number  } = user;
    const { external_product_id = "" } = feature_props;

    const [product_satisfaction = {}, product_feedback = {} ] = content;

    const { name:product_name = ""} = product;

    const { answer = 5, max_value = 5 } = product_satisfaction;
    const { title = "", answer: feedback = "" } = product_feedback;

    return {
        username: name,
        email,
        phone_number,
        external_product_id,
        title,
        feedback,
        rating: answer,
        max_rating: max_value,
        product_name
    }
}