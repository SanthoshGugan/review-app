export const createCustomerRequest = (values) => {
    return {
        organization_name: values?.organizationName,
        phone_number: values?.phoneNumber,
        email: values?.email,
        address: values?.address
    }
}