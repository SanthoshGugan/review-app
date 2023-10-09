import { Box, Button, Flex, Stack, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";
import DataTable from "react-data-table-component";
import { NavLink, useParams } from "react-router-dom";
import useWidgetList from "../hooks/useWidgetList";
import { ADD_USER_URL, ADD_WIDGET_URL } from "../utils/urlUtil";
import { ImUserPlus } from "react-icons/im";


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

const ListWidgets = () => {

    const {
        customer_sid,
    } = useParams();

    const renderPropsLink = (row) => {
        return (
            <>Props Link</>
        );
    };

    const renderName = (row) => {
        const { widget : { name = "" } } = row;

        return <Box> <Text> {name} </Text></Box>;
    };


    const renderDescription = (row) => {
        const { widget : { description = "" } } = row;

        return <Box> <Text> {description} </Text></Box>;
    };

    const columns = [
        {
            name: "Name",
            selector: row => renderName(row),
            sortable: true
        },
        // {
        //     name: "Phone Number",
        //     selector: row => row.phone_number,
        //     sortable: false
        // },
        {
            name: "Description",
            selector: row => renderDescription(row),
        },
        {
            name: "Properites",
            selector: row => renderPropsLink(row),
        },
    ];

    const {
        fetchWidgets,
        fetchCustomerWidgets,
        addCustomerWidget,
        updateCustomerWidget,
        fetchCustomerInProgress,

        widgets,
        customerWidgets,
    } = useWidgetList({ customer_sid });

    const renderDataTable = () => {
        return (
            <DataTable
                data={customerWidgets}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 5 }
                    }
                }}
                pageSizeOptions={[5, 10, 15]}
                fetchInProgress={fetchCustomerInProgress}
                customStyles={customStyles}
            />
        );
    };

    useEffect(() => {
        fetchWidgets();
        fetchCustomerWidgets();
    }, [customer_sid]);

    return (
        <Box height="100vh" id="dummy">
            <Flex height="100%" width="100%" alignItems="center" justifyContent="flex-start" marginTop="2rem" flexDirection="column">
                <Flex justifyContent="space-between" flex="0 0 5rem" id="flex" alignItems="center" width="100%" padding="0 5rem">
                    <Box></Box>
                    <Stack direction="row" spacing={2}>
                        <Button leftIcon={<ImUserPlus />} colorScheme="teal" variant="ghost">
                            <NavLink
                                to={ADD_WIDGET_URL({ customer_sid })} 
                                style={{
                                    color: "teal",
                                    textDecoration: "underline"
                                }}
                            >
                                Add Widget
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

export default ListWidgets;