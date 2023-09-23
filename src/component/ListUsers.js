import React, { useCallback, useEffect } from "react";
import DataTable from "react-data-table-component";
import useUserList from "../hooks/useUserList";
import { useParams } from "react-router-dom";
import { Button } from "@chakra-ui/react";
import { EmailIcon } from "@chakra-ui/icons";
import useRequestUserReview from "../hooks/useRequestUserReview";

const ListUsers = (props) => {

    const { customer_sid } = useParams();

    const { 
        fetchUsersList,
        fetchInProgress,
        errorInFetch,
        users
    } = useUserList({ customer_sid });

    const {
        triggerReview,
        reviewTriggerInProgress,
        errorInReviewTrigger
    } = useRequestUserReview({ customer_sid });


    const renderReviewTrigger = (row) => {
        const { sid: user_sid, email } = row;
        return (
            <Button
                leftIcon={<EmailIcon />} 
                colorScheme='teal' 
                variant='solid' 
                size="sm" 
                onClick={() => triggerReview({ user_sid })}
                isLoading={reviewTriggerInProgress}
            >
                Request Review
            </Button>
        );
    };

    const columns = [
        {
            name: "Name",
            selector: row => row.name,
            sortable: true
        },
        {
            name: "Phone Number",
            selector: row => row.phone_number,
            sortable: false
        },
        {
            name: "Email",
            selector: row => row.email,
        },
        {
            name: "Address",
            selector: row => row.address,
        },
        {
            name: "Actions",
            selector: row => renderReviewTrigger(row)
        }
    ];


    const renderDataTable = useCallback(() => {
        return (
            <DataTable
                data={users}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 5 }
                    }
                }}
                pageSizeOptions={[5, 10, 15]}
                fetchInProgress={fetchInProgress}
            />
        );
    }, [users.length, columns]);

    useEffect(() => {
        fetchUsersList();
    }, [customer_sid]);

    return (
        <>
            {renderDataTable()}

        </>
    )
};

export default ListUsers;