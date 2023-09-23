import React, { useCallback, useEffect } from "react";
import DataTable from "react-data-table-component";
import useUserList from "../hooks/useUserList";
import { useParams } from "react-router-dom";

const ListUsers = (props) => {

    const { customer_sid } = useParams();

    const { 
        fetchUsersList,
        fetchInProgress,
        errorInFetch,
        users
    } = useUserList({ customer_sid });

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