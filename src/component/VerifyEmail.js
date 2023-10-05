import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { verifyPasscodeApi as verifyEmailApi } from "../api/CustomerApi";
import { verifyPasscodeRequest } from "../utils/CustomerUtils";
import { NavLink, useParams, useSearchParams } from "react-router-dom";
import { Alert, AlertIcon, Flex, useToast } from "@chakra-ui/react";
import CenterCard from "../lib/CenterCard";
import { CUSTOMER_LOGIN_URL } from "../utils/urlUtil";

const VerifyEmail = (props) => {

    const { customer_sid } = useParams();
    const [ searchParams ] = useSearchParams();
    const hash = searchParams.get("token");
    const [ isVerificationSuccess, setIsVerificationSuccess ] = useState(false);
    const [ isVerificationComplete, setIsVerificationComplete ] = useState(false);

    const toast = useToast();

    const verifyToken = async () => {
        try {
            setIsVerificationComplete(false);
            const res = await verifyEmailApi(verifyPasscodeRequest({
                hash,
                customer_sid
            }));
    
            const { is_verified } = res?.data;
            setIsVerificationComplete(true);
            setIsVerificationSuccess(is_verified);

            if (!is_verified) {
                toast({
                    title: "Error in email verification!",
                    description: "Please retry signup or contact us!",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                  })
            } else {
                toast({
                    title: "Email verification complete",
                    description: "Please proceed with password update.",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                  })

            }
        } catch (err) {
            setIsVerificationComplete(true);
            setIsVerificationSuccess(false);
            toast({
                title: "Error while verifying email",
                description: "Please retry or try signup again. If persists contact us.",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        }
    };
    

    useEffect(() => {
        if (hash)
            verifyToken();
    }, []);

    return (
        <CenterCard>
            {isVerificationComplete && isVerificationSuccess &&  (
                <Alert status='success'>
                    <AlertIcon />
                    <Flex direction="column" justifyContent="center" alignItems="center">
                    Thanks for verifying your email.{" "}
                    <NavLink
                        to={CUSTOMER_LOGIN_URL()} 
                        style={{
                            color: "blue",
                            textDecoration: "underline"
                        }}
                    >
                        Please proceed to login
                    </NavLink>
                    </Flex>
                </Alert>
                
                                )}
        </CenterCard>
    );
};

export default VerifyEmail;