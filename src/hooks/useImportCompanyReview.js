import { useToast } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { getImportCompanyReviewTemplateApi, postImportCompanyReviewByCsvApi } from "../api/importCompanyReviewApi";
import { formatReviewImportForTable } from "../utils/reviewImporUtil";

const useImportCompanyReview = ({ customer_sid }) => {

    const [ importFields, setImportFields ] = useState([]);
    const [ message, setMessage ] = useState(null);
    const [ reviewForTable, setReviewForTable ] = useState([]);

    const toast = useToast();

    const postImportCompanyReview = async ({ file }) => {
        try {
            const formData = new FormData();
            formData.append('review-file', file)
            const res = await postImportCompanyReviewByCsvApi({
                filename: "review-file",
                file: formData,
                customer_sid
            });
            const { message, reviews = [] } = res?.data;
            setMessage(message);
    
            const reviewForTable = reviews.map(review => formatReviewImportForTable(review));
            setReviewForTable(reviewForTable);
                        
            toast({
                title: "Reviews imported",
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
            const res = await getImportCompanyReviewTemplateApi();
            const { fields } = res?.data || {};
            setImportFields(fields);
        }
        fetchImportReviewTemplate();
    }, []);

    return {
        importFields,
        postImportCompanyReview,
        message,
        reviewForTable
    };
};

export default useImportCompanyReview;