import React, { useEffect, useState } from "react";
import { getReviewCarouselWidgetConfig, updateReviewCarouselWidgetConfig } from "../api/WidgetApi";
import { getInitialLimitConfig, getInitialStarConfig } from "../utils/widgetConfigUtils";

const useCustomerWidgetConfig = ({ customer_sid }) => {

    const [ configBuilder, setConfigBuilder ] = useState([]);
    const [ stars, setStars ] = useState([]);
    const [ limit, setLimit ] = useState([]);

    const [ config, setConfig ] = useState({});
    const [ customerWidgetSid, setCustomerWidgetSid ] = useState(null);

    const setFlags = (flag, value) => {
        const {field_flags} = config;
        field_flags[flag] = value;
        setConfig({
            ...config,
            field_flags
        });
    };

    const updateContent = (name, content) => {
        const content_config = config["content_and_style"];
        const {[name]: field_config} = content_config;
        field_config["content"] = content;
        const updated_content_config = {
            ...content_config,
            [name]: field_config
        };
        setConfig({
            ...config,
            "content_and_style": {
                ...updated_content_config
            }
        });
    };

    const submitConfig = async () => {
        const updated_config = {...config};

        // update stars
        updated_config["stars"] = stars.map(obj => {
            const { value } = obj;
            return parseInt(value);
        });

        // update limit
        updated_config["limit"] = parseInt(limit) || 10;

        const customer_widget = {
            props: {
                ...updated_config
            }
        };

        await updateReviewCarouselWidgetConfig({
            sid: customerWidgetSid,
            customer_widget
        });

    };

    useEffect(() => {
        const fetchCarouselConfigs = async () => {
            const res = await getReviewCarouselWidgetConfig({ customer_sid });
            const {config, configBuilder, sid} = res?.data;
            setConfigBuilder(configBuilder);
            setConfig(config);
            setCustomerWidgetSid(sid);

            // Stars

            const stars = getInitialStarConfig({
                config,
                configBuilder
            });

            setStars(stars);

            // Limit
            const limit = getInitialLimitConfig({
                config,
                configBuilder
            });

            setLimit(limit);

        };
        if (customer_sid) {
            fetchCarouselConfigs();
        }
    }, [customer_sid]);

    return {
        configBuilder,
        config,
        stars,
        setStars,
        limit,
        setLimit,
        setFlags,
        updateContent,
        submitConfig
    };
};

export default useCustomerWidgetConfig;