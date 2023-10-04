export const createUserRequest = ({ values, customer_sid }) => {

    const address = {
        city: values?.city || "",
        country: values.country || "",
    };
    return {
        customer_sid,
        name: values?.name,
        phone_number: values?.phoneNumber,
        email: values?.email,
        address
    }
};

