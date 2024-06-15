import React, { useEffect, useState } from "react";
import { getReviewCarouselWidgetConfig, updateReviewCarouselWidgetConfig } from "../api/WidgetApi";
import { getInitialStarConfig } from "../utils/widgetConfigUtils";

const useCustomerWidgetConfig = ({ customer_sid }) => {

    const [ configBuilder, setConfigBuilder ] = useState([]);
    const [ stars, setStars ] = useState([]);

    const [ config, setConfig ] = useState({});
    const [ customerWidgetSid, setCustomerWidgetSid ] = useState(null);

    const submitConfig = async () => {
        const updated_config = {...config};
        updated_config["stars"] = stars.map(obj => {
            const { value } = obj;
            return parseInt(value);
        });
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

            const stars = getInitialStarConfig({
                config,
                configBuilder
            });

            setStars(stars);
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
        submitConfig
    };
};

export default useCustomerWidgetConfig;