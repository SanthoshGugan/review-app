import { review_template_config } from "./reviewTemplateConfig";

export const getFieldFromReview = ({ review, index }) => {
    const { content = [] } = review;
    const field = content[index] || {};
    return field;
};

export const updateFieldInReview = ({ review, index, field }) => {
    const updatedContent = review.content.map((f, i) => {
        if (index === i) return field;
        return f;
    });
    return {
        ...review,
        content: updatedContent
    };
};


export const formatRequestForReviewSubmit = (content) => content.map(field => {
        const { field_type, ...remainingProps } = field;
        return {
            ...remainingProps
        };
    });

export const updateAnswersInReview = (values, content) => {
    return content.map((field, index) => {
        const { field_type_sid } = field;
        const answers = values[field_type_sid];
        const fields = review_template_config[field_type_sid];
        let answerObj = {};
        fields.forEach(field => {
            answerObj[field] = answers[field];
        });
        return {
            ...field,
            ...answerObj
        }
    })
}