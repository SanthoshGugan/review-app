import { Box, Flex, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import React from "react";
import { useParams } from "react-router-dom";
import useImportCompanyReview from "../../hooks/useImportCompanyReview";
import FileUpload from "../../lib/FileUpload/FileUpload";

const ImportCompanyReview = () => {
    const { customer_sid } = useParams();

    const { importFields, postImportCompanyReview, reviewForTable } = useImportCompanyReview({ customer_sid });


    const renderHeader = () => {
        return importFields.map(name => {
            return (
                    <Th>{name}</Th>
            )
        })
    }

    const renderTableRows = () => {
        if (!reviewForTable || reviewForTable?.length === 0) return <></>;
        return reviewForTable.map(review => (
            <Tr>{importFields.map(field => (
                <Td>{review[field] || "" }</Td>
            ))}</Tr>
        ))
    }


    const renderTable = () => {
        return (
            <Box my="4rem" mx="1rem">
                <Flex alignItems="center" justifyContent="center" flexDir="column" gap="2rem">
                    <Flex justifyContent="flex-end" alignItems="flex-end" px="3rem" flex="auto" w="100%">
                        <FileUpload
                            id="import__company__reviews__"
                            btnText="Upload csv"
                            onUpload={({ file }) => postImportCompanyReview({ file })}
                        />
                    </Flex>
                    <TableContainer>
                        <Table variant='simple'>
                            <Thead>
                                <Tr>
                                    {renderHeader()}
                                </Tr>
                            </Thead>
                            <Tbody>
                                {renderTableRows()}
                            </Tbody>
                        </Table>
                    </TableContainer>
                </Flex>
            </Box>
        );
    }
    return (
        <Box>
            {renderTable()}
        </Box>
    );
}

export default ImportCompanyReview;