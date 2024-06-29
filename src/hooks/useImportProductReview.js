import { useToast } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { getImportProductReviewTemplateApi, postImportProductReviewByCsvApi } from "../api/importProductReviewApi";
import { formatProductReviewImportForTable } from "../utils/reviewImporUtil";

const useImportProductReview = ({ customer_sid }) => {

    const [ importFields, setImportFields ] = useState([]);
    const [ message, setMessage ] = useState(null);
    const [ reviewForTable, setReviewForTable ] = useState([]);

    const toast = useToast();

    const postImportProductReview = async ({ file }) => {
        try {
            const formData = new FormData();
            formData.append('review-file', file)
            const res = await postImportProductReviewByCsvApi({
                filename: "review-file",
                file: formData,
                customer_sid
            });
            const { message = "", product_reviews = [] } = res?.data;
            setMessage(message);
    
            const reviewForTable = product_reviews.map(review => formatProductReviewImportForTable(review));
            setReviewForTable(reviewForTable);
                        
            toast({
                title: "Product reviews imported",
                status: "success",
                duration: 5000,
                isClosable: true,
              });

        } catch(err) {
            console.error(err);
        }
    };

    useEffect(() => {
        const fetchImportReviewTemplate = async () => {
            const res = await getImportProductReviewTemplateApi();
            const { fields } = res?.data || {};
            setImportFields(fields);
        }
        fetchImportReviewTemplate();
    }, []);

    return {
        importFields,
        postImportProductReview,
        message,
        reviewForTable
    };
};

export default useImportProductReview;