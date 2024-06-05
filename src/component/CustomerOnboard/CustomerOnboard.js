import { Accordion, AccordionButton, AccordionItem, AccordionPanel, Box, Button, Flex, Text, Tooltip } from "@chakra-ui/react";
import React from "react";
import { Icon } from '@chakra-ui/icons';

import { MdDone } from "react-icons/md";
import { RiProgress5Line, RiProgress3Line } from "react-icons/ri";
import { BiCurrentLocation } from "react-icons/bi";
import useCustomerOnboard from "../../hooks/useCustomerOnboard";
import { useParams } from "react-router-dom";
import { render } from "@testing-library/react";
import Code from "../Code/Code";
import { widgetAddReviewTagStr, widgetCarouselTagStr, widgetCompanyAggregateTagStr } from "../../utils/widgetUtil";

const CustomerOnboard = () => {

    const { customer_sid } = useParams();

    const { 
        currentStep,
        steps,
        resendVerificationEmail,
        resentEmailInProgress,
        customerDetail,
        getEmailVerification,
        markEmbedidgetStepComplete,

     } = useCustomerOnboard({customer_sid});

     const { is_verified = false } = customerDetail || {};

     const getStepFlags = ({ step }) => {

        const { is_completed = false, is_required = false, step_no } = step;
        const isActive = (currentStep === step_no) || (!is_required && currentStep > step_no);
        return {
            isDisabled: !isActive,
            isComplete: is_completed
        }
     }

    const renderTick = ({ isComplete }) => {
        if (!isComplete) {
            return (<Tooltip>
                <Icon
                    as={BiCurrentLocation}
                    color="green"
                    fontSize="2rem"
                />
            </Tooltip>);
        }
        return  (
            <Tooltip>
                <Icon
                    as={MdDone}
                    color="black"
                    fontSize="2rem"

                />
            </Tooltip>
        );
    };

    const renderEmailVerification = ({ step = {} }) => {

        const { is_verified } = getEmailVerification({step});

        const { isDisabled, isComplete } = getStepFlags({ step });
        return (
            <AccordionItem isDisabled={isDisabled} isActive={!isDisabled}>
                <AccordionButton bgColor={isComplete ? "green.100": "orange.100"}  fontWeight="semibold" _hover={{ bgColor: "green.200", fontWeight: "bold"}}>
                    <Flex alignItems="center" justifyContent="space-between" w="100%">
                        <Text>Email Verification</Text>
                            {renderTick({  isComplete })}
                    </Flex>
                </AccordionButton>
                <AccordionPanel bgColor="green.50">
                    <Box>
                        <Flex direction="column" justifyContent="center" p="1rem">
                            {!is_verified && (
                                <Flex justifyContent="space-between">
                                    <Text flex="80% 0 0">Email sent to
                                        <b> santhoshg1990@gmail</b> for verification
                                    </Text>
                                    <Button onClick={resendVerificationEmail} isLoading={resentEmailInProgress} bgColor="blue.200">Resend</Button> 
                                </Flex>
                            )}
                            {is_verified && (
                                <Flex justifyContent="center">
                                    <Text fontWeight="bold">
                                        Email verification completed!
                                    </Text>
                                </Flex>
                            )}
                        </Flex>
                    </Box>
                </AccordionPanel>
            </AccordionItem>
        );
    };

    const renderWidgetEmbed = ({ step = {} }) => {
        const { isDisabled, isComplete } = getStepFlags({ step });

        return (
            <AccordionItem my="1rem"  isDisabled={isDisabled}>
                <AccordionButton bgColor={isComplete ? "green.100" : "orange.100" } fontWeight="semibold" _hover={{ bgColor: "orange.200", fontWeight: "bold"}}>
                    <Flex alignItems="center" justifyContent="space-between" w="100%">
                        <Text>Widget Embed</Text>
                            {isComplete && renderTick({ isComplete })}
                            {!isComplete && (
                                <Button onClick={markEmbedidgetStepComplete}>Mark Complete</Button>
                            )}
                    </Flex>
                </AccordionButton>
                <AccordionPanel bgColor={isComplete ? "green.50" : "orange.50" } >
                    <Box>
                        <Flex direction="column" justifyContent="center" p="1rem" bgColor="orange.100" borderRadius="10px" my="2rem">
                            <Text>Please add below script tag to header content of your  website source HTML file</Text>
                            <Code content={`<script src="https://d355vyvlw5pzo2.cloudfront.net/scripts/widgets.js"></script>`}/>
                        </Flex>
                        <Flex direction="column" justifyContent="center" p="1rem" bgColor="orange.100" borderRadius="10px" my="2rem">
                            <Text>Add Widget Carousel to source code where reviews needs to be shown</Text>
                            <Code content={widgetCarouselTagStr({ customer_sid })}/>
                        </Flex>
                        <Flex direction="column" justifyContent="center" p="1rem" bgColor="orange.100" borderRadius="10px" my="2rem">
                            <Text>Add Post Review Widget to source code where your customers can provide reviews</Text>
                            <Code content={widgetAddReviewTagStr({ customer_sid })}/>
                        </Flex>
                        <Flex direction="column" justifyContent="center" p="1rem" bgColor="orange.100" borderRadius="10px" my="2rem">
                            <Text>Add Company Aggregate Widget</Text>
                            <Code content={widgetCompanyAggregateTagStr({ customer_sid })}/>
                        </Flex>
                    </Box>
                </AccordionPanel>
            </AccordionItem>
        );
    }

    const renderReviewImports = () => {

        const isComplete = false;

        return (
            <AccordionItem my="1rem"  >
                <AccordionButton bgColor={isComplete ? "green.100": "orange.100"}  fontWeight="semibold" _hover={{ bgColor: "green.200", fontWeight: "bold"}}>
                    <Flex alignItems="center" justifyContent="space-between" w="100%">
                        <Text>Reviews Import</Text>
                            {renderTick({  isComplete })}
                    </Flex>
                </AccordionButton>
                <AccordionPanel bgColor="green.50">
                    <Box>
                        <Flex direction="column" justifyContent="center" p="1rem">
                            {!isComplete && (
                                <Flex justifyContent="center">
                                    <Text fontWeight="bold">
                                        Add Reviews from other platforms
                                    </Text>
                                </Flex>
                            )}
                        </Flex>
                    </Box>
                </AccordionPanel>
            </AccordionItem>
        );
    };


    const renderWidgetConfigs = () => {

        const isComplete = false;

        return (
            <AccordionItem my="1rem"  >
                <AccordionButton bgColor={isComplete ? "green.100": "orange.100"}  fontWeight="semibold" _hover={{ bgColor: "green.200", fontWeight: "bold"}}>
                    <Flex alignItems="center" justifyContent="space-between" w="100%">
                        <Text>Widget Configs</Text>
                            {renderTick({  isComplete })}
                    </Flex>
                </AccordionButton>
                <AccordionPanel bgColor="green.50">
                    <Box>
                        <Flex direction="column" justifyContent="center" p="1rem">
                            {!isComplete && (
                                <Flex justifyContent="center">
                                    <Text fontWeight="bold">
                                        Customize widgets
                                    </Text>
                                </Flex>
                            )}
                        </Flex>
                    </Box>
                </AccordionPanel>
            </AccordionItem>
        );
    };

    const renderEmailConfigs = () => {

        const isComplete = false;

        return (
            <AccordionItem my="1rem"  >
                <AccordionButton bgColor={isComplete ? "green.100": "orange.100"}  fontWeight="semibold" _hover={{ bgColor: "green.200", fontWeight: "bold"}}>
                    <Flex alignItems="center" justifyContent="space-between" w="100%">
                        <Text>Email Configs</Text>
                            {renderTick({  isComplete })}
                    </Flex>
                </AccordionButton>
                <AccordionPanel bgColor="green.50">
                    <Box>
                        <Flex direction="column" justifyContent="center" p="1rem">
                            {!isComplete && (
                                <Flex justifyContent="center">
                                    <Text fontWeight="bold">
                                        Customize emails
                                    </Text>
                                </Flex>
                            )}
                        </Flex>
                    </Box>
                </AccordionPanel>
            </AccordionItem>
        );
    };


    return (
        <Box m="1rem">
            <Accordion allowToggle allowMultiple>
                {renderEmailVerification({ step: steps[0] || {}})}
                {renderWidgetEmbed({ step: steps[1] || []})}  
                {renderReviewImports()}  
                {renderWidgetConfigs()}  
                {renderEmailConfigs()}  
            </Accordion>
        </Box>
    );
};

export default CustomerOnboard;