import React, { useCallback, useEffect } from "react";
import DataTable from "react-data-table-component";
import useUserList from "../hooks/useUserList";
import { NavLink, useParams } from "react-router-dom";
import { Box, Button, Center, Flex, Square, Stack } from "@chakra-ui/react";
import { EmailIcon } from "@chakra-ui/icons";
import { ImUserPlus } from "react-icons/im";
import useRequestUserReview from "../hooks/useRequestUserReview";
import { ADD_USER_URL } from "../utils/urlUtil";


const customStyles = {
    table: {
        style: {
            borderRadius: '10px',
        }
    },
    headCells: {
        style: {
            fontSize: '18px',
            backgroundColor: '#C6F6D5',
            fontWeight: 'Bolder'
        }
    },
    header: {
        style: {
            borderRadius: '10px',
            border: '1px solid grey'
        }
    },
    rows: {
        style: {
            minHeight: '75px',
            fontSize: '16px'
        }
    }
};

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

    const renderAddress = (row) => {
        const { address = {} } = row;
        const { city = "", country = ""} = address;
        return (
            <Box display="flex">
                {city && city}
                {country && (", " + country)}
            </Box>
        );
    };


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
        // {
        //     name: "Phone Number",
        //     selector: row => row.phone_number,
        //     sortable: false
        // },
        {
            name: "Email",
            selector: row => row.email,
        },
        {
            name: "Address",
            selector: row => renderAddress(row),
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
                customStyles={customStyles}
            />
        );
    }, [users.length, columns]);

    useEffect(() => {
        fetchUsersList();
    }, [customer_sid]);

    return (
        <Box height="100vh" id="dummy">
            <Flex height="100%" width="100%" alignItems="center" justifyContent="flex-start" marginTop="2rem" flexDirection="column">
                <Flex justifyContent="space-between" flex="0 0 5rem" id="flex" alignItems="center" width="100%" padding="0 5rem">
                    <Box></Box>
                    <Stack direction="row" spacing={2}>
                        <Button leftIcon={<ImUserPlus />} colorScheme="teal" variant="ghost">
                            <NavLink
                                to={ADD_USER_URL({ customer_sid })} 
                                style={{
                                    color: "teal",
                                    textDecoration: "underline"
                                }}
                            >
                                Add User
                            </NavLink>
                        </Button>                        
                    </Stack>
                </Flex>
                <Flex flex="0.75 0.25 50%" width="100%" justifyContent="center">
                    {renderDataTable()}
                </Flex>
            </Flex>
        </Box>
    )
};

export default ListUsers;