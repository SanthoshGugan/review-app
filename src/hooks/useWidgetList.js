import React, { useState } from "react";
import { addCustomerWidgetApi, fetchCustomerWidgetsApi, fetchWidgetsApi, updateCustomerWidgetApi } from "../api/WidgetApi";

const useWidgetList = ({ customer_sid }) => {

    const [ widgets, setWidgets ] = useState([]);
    const [ fetchInProgress, setFetchInProgress ] = useState(false);
    const [ errorInFetch, setErrorInFetch ] = useState(false);


    const [ customerWidgets, setCustomerWidgets ] = useState([]);
    const [ fetchCustomerInProgress, setFetchCustomerInProgress ] = useState(false);
    const [ errorCustomerInFetch, setErrorCustomerInFetch ] = useState(false);


    const fetchWidgets = async () => {
        try {
            setFetchInProgress(true);
            const res = await fetchWidgetsApi();
            const { data: { widgets }} = res;
            setWidgets(widgets);
            setFetchInProgress(false);
            setErrorInFetch(false);
        } catch (err) {
            setFetchInProgress(false);
            setErrorInFetch(true);

        }
    };

    const fetchCustomerWidgets = async () => {
        try {
            setFetchCustomerInProgress(true);
            const res = await fetchCustomerWidgetsApi({ customer_sid });
            const { data: { customer_widgets }} = res;
            setCustomerWidgets(customer_widgets);
            setFetchCustomerInProgress(false);
            setErrorCustomerInFetch(false);
        } catch (err) {
            setFetchCustomerInProgress(false);
            setErrorCustomerInFetch(true);
        }
    };

    const addCustomerWidget = async ({ widget_sid, props }) => {
        await addCustomerWidgetApi({ req: { widget_sid, props } });
        fetchCustomerWidgets();
    };

    const updateCustomerWidget = async ({ customer_widget_sid , props }) => {
        await updateCustomerWidgetApi({ customer_widget_sid, req: { props }});
        fetchCustomerWidgets();
    }

    return {
        fetchWidgets,
        widgets,
        fetchInProgress,
        errorInFetch,

        fetchCustomerWidgets,
        customerWidgets,
        fetchCustomerInProgress,
        errorCustomerInFetch,

        addCustomerWidget,

        updateCustomerWidget,
    };
};

export default useWidgetList;