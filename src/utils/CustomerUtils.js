export const createCustomerRequest = (values) => {
    return {
        organization_name: values?.organizationName,
        // phone_number: values?.phoneNumber,
        email: values?.email,
        address: values?.address,
        password: values?.password
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

export const verifyPasscodeRequest = ({ hash, customer_sid }) => {
    return {
        customer_sid,
        hash
    };
};

export const trimOrganizationName = (name) => {
    const regex = /[^a-zA-Z0-9]+/g;
    return name.replace(regex, '');
}; 

