import { Box, Button, Flex } from "@chakra-ui/react";
import React from "react";
import { useParams } from "react-router-dom";
import useCustomerWidgetConfig from "../../hooks/useCustomerWidgetConfig";
import Group from "../../lib/widgetConfigs/group";
import { getConfigByName } from "../../utils/widgetConfigUtils";
import ContentAndStyleConfig from "./ContentAndStyleConfig";
import FieldFlagConfig from "./FieldFlagsConfig";
import LimitConfig from "./LimitConfig";
import ReviewsConfig from "./ReviewsConfig";
import StarsConfig from "./StarConfig";

const CustomerWidgetConfig = ({}) => {

    const { customer_sid } = useParams();

    const { config = [], setStars, configBuilder, stars, submitConfig, limit, setLimit, setFlags, updateContent } = useCustomerWidgetConfig({ customer_sid });

    
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

    const renderLimitConfig = () => {
        const limit_config = getConfigByName({
            configs: configBuilder,
            group: "limit"
        });

        return <LimitConfig config={limit_config} limit={limit} updateLimit={setLimit} />
    }

    const renderFieldFlagsConfig = () => {
        const field_config = getConfigByName({
            configs: configBuilder,
            group: "field_flags"
        });

        return <FieldFlagConfig config={field_config} field_flags={config["field_flags"]} updateFlag={setFlags} />
    }

    const renderContentAndStyleConfig = () => {
        const content_style_config = getConfigByName({
            configs: configBuilder,
            group: "content_and_style"
        });

        return <ContentAndStyleConfig config={content_style_config} contentAndStyle={config["content_and_style"]} updateContent={updateContent} />
    }


    return (
        <Box>
            {/* {renderReviewsConfig()} */}
            {renderStarConfig()}
            {renderLimitConfig()}
            {renderFieldFlagsConfig()}
            {renderContentAndStyleConfig()}
            <Flex alignItems="center" justifyContent="flex-end" px="4rem">
                <Button onClick={() => submitConfig()}>Save</Button>
            </Flex>
        </Box>
    );
};

export default CustomerWidgetConfig;