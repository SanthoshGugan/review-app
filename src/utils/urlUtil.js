export const VERIFY_PASSCODE_URL = ({ customer_sid }) => 
    `/${customer_sid}/verify-passcode`;

export const CUSTOMER_LOGIN_URL = () => 
    `/login`;

export const CUSTOMER_USERS_LIST = ({ customer_sid }) => 
    `/${customer_sid}/users`