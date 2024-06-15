import { Box, Button, Flex } from "@chakra-ui/react";
import React from "react";
import { useParams } from "react-router-dom";
import useCustomerWidgetConfig from "../../hooks/useCustomerWidgetConfig";
import Group from "../../lib/widgetConfigs/group";
import { getConfigByName } from "../../utils/widgetConfigUtils";
import ReviewsConfig from "./ReviewsConfig";
import StarsConfig from "./StarConfig";

const CustomerWidgetConfig = ({}) => {

    const { customer_sid } = useParams();

    const { config = [], setStars, configBuilder, stars, submitConfig } = useCustomerWidgetConfig({ customer_sid });

    
    const renderReviewsConfig = () => {
        const review_config = getConfigByName({
            configs: configBuilder,
            group: "reviews"
        })

        const { label } = review_config;

        return <ReviewsConfig label={label} config={review_config}/>;
    }

    const renderStarConfig = () => {
        const star_config = getConfigByName({
            configs: configBuilder,
            group: "stars"
        });

        return <StarsConfig config={star_config} stars={stars} updateStars={setStars} />
    }

    return (
        <Box>
            {/* {renderReviewsConfig()} */}
            {renderStarConfig()}
            <Flex alignItems="center" justifyContent="flex-end" px="4rem">
                <Button onClick={() => submitConfig()}>Save</Button>
            </Flex>
        </Box>
    );
};

export default CustomerWidgetConfig;