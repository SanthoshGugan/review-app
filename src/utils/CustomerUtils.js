export const createCustomerRequest = (values) => {
    return {
        organization_name: values?.organizationName,
        phone_number: values?.phoneNumber,
        email: values?.email,
        address: values?.address,
        username: values?.username
    }
};

export const updateCustomerPasswordRequest = (values) => {
    return {
        password: values?.password
    };
}

export const loginCustomerRequest = (values) => {
    return {
        username: values?.username,
        password: values?.password
    }
};

export const verifyPasscodeRequest = ({ values, customer_sid }) => {
    return {
        customer_sid,
        passcode: values?.passcode
    };
};

export const trimOrganizationName = (name) => {
    const regex = /[^a-zA-Z0-9]+/g;
    return name.replace(regex, '');
}; 

