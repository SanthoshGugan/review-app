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
