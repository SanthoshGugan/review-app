import { Box, Button, Flex, Select, VStack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useReviewList from "../hooks/useReviewList";
import useWidgetList from "../hooks/useWidgetList";
import { MultiSelect} from "chakra-multiselect";
import BreadcrumbNav from "./BreadcrumbNav";
import { ADD_WIDGET_URL, WIDGETS_URL } from "../utils/urlUtil";

const AddWidgets = ({}) => {

    const { 
        customer_sid
    } = useParams();


    const NAVS = [
        {
            url: WIDGETS_URL({ customer_sid }),
            label: "Widgets"
        },
        {
            url: '#',
            label: "New"
        }
    ]

    const {
        fetchWidgets,
        fetchCustomerWidgets,
        availableWidgets,
        addCustomerWidget,
    } = useWidgetList({ customer_sid});

    const {
        fetchTagsList,
        allTags,
        formatTagstoSelect
    } = useReviewList({ customer_sid });


    const [ selectedWidget, setSelectedWidget ] = useState({});
    const [ selectedTags, setSelectedTags ] = useState([]);

    const onSubmit = async () => {
        try {
            const { sid } = selectedWidget;
            await addCustomerWidget({ widget_sid: sid, props: {
                tags: selectedTags.map(tag => tag?.value) || []
            }});
        } catch(err) {

        }
    };

    const onWidgetTemplateSelect = (e) => {
        const widget_sid = e?.target?.value;
        const widget = availableWidgets.filter(w => {
            const { sid } = w;
            return sid === widget_sid;
        })[0] || {};
        setSelectedWidget(widget);
    }

    useEffect(() => {
        fetchWidgets();
        fetchTagsList()
    }, [])

    useEffect(() => {
        fetchCustomerWidgets();
    }, [customer_sid]);
    


    return (
        <Box height="100vh" title="Add Widget">
            <Flex alignItems="center" justifyContent="flex-start" margin="1rem 4rem">
                <BreadcrumbNav navs={NAVS}/>
            </Flex>
            <Flex alignItems="center" justifyContent="center" height="75%" width="75%" margin="10rem auto" border="1px solid " flexDirection="column">
            <Select placeholder="Select Widget" onChange={onWidgetTemplateSelect}>
                {availableWidgets.map(widget => <option value={widget?.sid}>{widget?.name}</option>)}
            </Select>
            {selectedWidget?.sid && (
                <VStack spacing="1.5rem">
                    <MultiSelect
                        options={formatTagstoSelect(allTags)}
                        value={selectedTags}
                        label="Add tags"
                        onChange={(selectedTags) => setSelectedTags(selectedTags)}
                    />
                    <Button onClick={() => onSubmit()}>Add Widget</Button>
                </VStack>)
            }
            </Flex>
        </Box>
    );
};

export default AddWidgets;