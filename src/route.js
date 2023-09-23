import { createBrowserRouter } from "react-router-dom";
import OnboardCustomer from "./component/OnboardCustomer";
import AddUser from "./component/AddUser";
import ListUsers from "./component/ListUsers";
import UserReview from "./component/UserReview";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <>Hello World!</>,
    },
    {
        path: '/:customer_sid/profile',
        element: <>Customer Profile</>
    },
    {
        path: '/:customer_sid/users',
        element: <ListUsers />
    },
    {
        path: '/:customer_sid/users/new',
        element: <AddUser />
    },
    {
        path: '/:customer_sid/users/:user_sid',
        element: <>Update user</>
    },
    {
        path: '/:customer_sid/reviews',
        element: <>Customer reviews</>
    },
    {
        path: '/:customer_sid/reviews/:user_sid/new',
        element: <>User Provides Review by customer_sid and User_sid</>
    },
    {
        path: '/reviews/:review_sid',
        element: <UserReview />
    },
    {
        path: '/:customer_sid/reviews/:user_sid/',
        element: <>View User reviews</>
    },
    {
        path: '/:customer_sid/review-template/new',
        element: <>Create Review Template</>
    },
    {
        path: '/:customer_sid/review-template/:review_template_sid',
        element: <>Edit Review Template</>
    },
    {
        path: '/login',
        element: <>Customer Login</>
    },
    {
        path: '/onboard',
        element: <OnboardCustomer />
    }
]);