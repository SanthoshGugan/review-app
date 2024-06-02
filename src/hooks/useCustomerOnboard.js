import React, { useEffect, useState } from "react";
import { getCustomerDetailsApi, getCustomerOnboardingApi, resendVerificationEmailApi } from "../api/CustomerOnboardingApi";

const EMAIL_VERIFICATION_STEP = {
    step_no: 1,
    step_name: "Email Verification",
    props: {
        is_verified: true
    },
    is_completed: true,
    is_required: true
}

const steps = [EMAIL_VERIFICATION_STEP];

const customer_onboarding = {
    customer_sid: "CS00039",
    current_step: 1,
    steps
}


const useCustomerOnboard = ({ customer_sid }) => {

    const [ steps, setSteps ] = useState([]);
    const [ currentStep, setCurrentStep ]= useState(1);
    const [ customerDetail, setCustomerDetail ] = useState(null);

    // email verification
    const [ resentEmailSuccess, setResentEmailSuccess ] = useState(null);
    const [ resentEmailInProgress, setResentEmailInProgress] = useState(null);


    const fetchCustomerOnboarding = async () => {
        const res = await getCustomerOnboardingApi({ customer_sid });
        const { customer_onboarding } = res?.data;
        const { steps, current_step } = customer_onboarding;
        setSteps(steps);
        setCurrentStep(current_step);
    };

    const fetchCustomerDetails = async () => {
        const res = await getCustomerDetailsApi({ customer_sid });
        const customerDetails = res?.data;
        setCustomerDetail(customerDetails);
    };

    const resendVerificationEmail = async () => {
        try {
            setResentEmailInProgress(true);
            setResentEmailInProgress(false);
            const res = await resendVerificationEmailApi({ customer_sid });
            const { message } = res?.data;
            setResentEmailSuccess(true);
        } catch (err) {
            setResentEmailSuccess(false);
            setResentEmailInProgress(false);
        }
        
    };

    const getEmailVerification = ({ step }) => {
        const { props = {} } = step;
        const { is_verified = false} = props;

        return {
            is_verified
        }

    };

    useEffect(() => {
        if (customer_sid) {
            fetchCustomerOnboarding();
            fetchCustomerDetails();
        }
    }, 
    [customer_sid])

    return {
        steps, 
        currentStep,
        resendVerificationEmail,
        resentEmailInProgress,
        customerDetail,
        getEmailVerification
    };
};


export default useCustomerOnboard;