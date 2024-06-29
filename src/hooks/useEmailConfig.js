import { useToast } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { getDefaultEmailConfigApi, postEmailConfigApi, uploadCustomerLogoApi } from "../api/customerEmailConfigApi";

const useEmailConfig = ({ customer_sid }) => {

    const [ logoUrl, setLogoUrl ] = useState("");
    const [ config, setConfig ] = useState({});

    const toast = useToast();

    const uploadLogo = async ({ file}) => {
        const filename = file.name;
        const res = await uploadCustomerLogoApi({
            customer_sid,
            file,
            filename
        });
        const { url } = res?.data;
        setLogoUrl(url);
    };

    const onSubmit = async (values) => {
        try {
            const {
                name,
                mail_content,
                feedback_request,
                footer,
                signature
            } = values;
    
            const config = {
                company_logo: logoUrl,
                props: {
                    name,
                    mail_content,
                    feedback_request,
                    footer,
                    signature
                }
            }
    
            await postEmailConfigApi({ config, customer_sid });
            
            toast({
                title: "Email Config saved",
                status: "success",
                duration: 5000,
                isClosable: true,
              })
        } catch(err) {
            
            toast({
                title: "Error while saving email config",
                status: "error",
                duration: 5000,
                isClosable: true,
              })

        }

    }

    useEffect(() => {
        const fetchDefaultConfig = async () => {
            const res = await getDefaultEmailConfigApi();
            const { config } = res?.data;
            console.log("config ::: ", config);
            setConfig(config);
        };
        fetchDefaultConfig();
    }, [])

    return {
        uploadLogo,
        logoUrl,
        config,
        onSubmit
    };
};

export default useEmailConfig;