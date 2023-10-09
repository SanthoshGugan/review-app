export const VERIFY_PASSCODE_URL = ({ customer_sid }) => 
    `/${customer_sid}/verify-passcode`;

export const CUSTOMER_LOGIN_URL = () => 
    `/login`;

export const CUSTOMER_USERS_LIST_URL = ({ customer_sid }) => 
    `/${customer_sid}/users`;

export const ADD_USER_URL = ({ customer_sid }) => 
    `/${customer_sid}/users/new`;

export const ADD_WIDGET_URL = ({ customer_sid }) => 
    `/${customer_sid}/widgets/new`;