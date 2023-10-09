import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import useReviewList from "../hooks/useReviewList";
import { Box, Flex, Text } from "@chakra-ui/react";
import DataTable from "react-data-table-component";
import { getFieldFromReviewByFieldId } from "../utils/ReviewUtils";
import StarRating from "./ReviewField/StarRating";
import Tags from "./Tags";
import AddTag from "./AddTag";


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

const ListReviews = () => {

    const {
        customer_sid
    } = useParams();

    const {
        fetchReviewList,
        fetchInProgress,
        errorInFetch,
        reviews,
        fetchTagsList,
        allTags,
        getAvailableTagsToAdd,
        addTag,
        removeTag
    } = useReviewList({ customer_sid });

    const renderAddress = (address) => {
        const { city = "", country = ""} = address;
        return (
            <Box display="flex">
                {city && city}
                {country && (", " + country)}
            </Box>
        );
    };

    const renderUser = (row) => {
        const { user: { name, address } } = row;
        return (
            <Box>
                {name && (<Text>{name}</Text>)}
                {address && (<Text> {renderAddress(address)}</Text>)}
            </Box>
        );
    };

    const renderRating = (row) => {

        const field = getFieldFromReviewByFieldId({review: row, select_field_type_sid: 'FT00001'});
        const { answer, max_value, min_value } = field[0] || {};
        return (
            <Box>
                <StarRating
                    maxStars={max_value}
                    rating={answer}
                    starSize={10}
                />
            </Box>
        );
    };

    const renderContent = (row) => {

        const field = getFieldFromReviewByFieldId({review: row, select_field_type_sid: 'FT00002'});
        const { answer } = field[0] || {};
        return <Text>{answer}</Text>
    }

    const renderTags = (row) => {
        const { tags = [], sid } = row;
        return (
            <Flex width="100%">
                <Box>
                    <Tags tags={tags} removeTag={(tag_sid) => removeTag({review_sid: sid, tag_sid})}/>
                </Box>
                <AddTag availableTags={getAvailableTagsToAdd({existingTags: tags})} addTag={tag_sid => addTag({ tag_sid, review_sid: sid})}/>
            </Flex>
        );
    }

    const columns = [
        {
            name: "User Name",
            selector: row => renderUser(row),
        },
        {
            name: "Rating",
            selector: row => renderRating(row),
        },
        {
            name: "Content",
            selector: row => renderContent(row)
        },
        {
            name: "Tags",
            selector: row => renderTags(row)
        }
    ];

    const renderDataTable = () => {
        return (
            <DataTable
                data={reviews}
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
    }

    useEffect(() => {
        fetchReviewList();
        fetchTagsList();
    }, [customer_sid])



    return (
        <Box height="100vh">
            <Flex height="100%" width="100%" alignItems="center" justifyContent="flex-start" marginTop="2rem" flexDirection="column">
                <Flex justifyContent="space-between" flex="0 0 5rem" id="flex" alignItems="center" width="100%" padding="0 5rem">
                    
                </Flex>
                <Flex flex="0.75 0.25 50%" width="100%" justifyContent="center">
                    {renderDataTable()}
                </Flex>
            </Flex>
        </Box>
    );
};

export default ListReviews;