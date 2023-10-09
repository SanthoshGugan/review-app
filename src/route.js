import { createBrowserRouter } from "react-router-dom";
import CustomerOnboard from "./component/CustomerOnboard";
import AddUser from "./component/AddUser";
import ListUsers from "./component/ListUsers";
import UserReview from "./component/UserReview";
import VerifyEmail from "./component/VerifyEmail";
import CustomerLogin from "./component/CustomerLogin";
import ListReviews from "./component/ListReviews";
import ListWidgets from "./component/ListWidgets";
import AddWidgets from "./component/AddWidgets";

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
        element: <ListReviews />
    },
    {
        path: '/:customer_sid/widgets',
        element: <ListWidgets/>
    },
    {
        path: '/:customer_sid/widgets/new',
        element: <AddWidgets/>
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
        element: <CustomerLogin />
    },
    {
        path: '/onboard',
        element: <CustomerOnboard />
    },
    {
        path: '/:customer_sid/verify-passcode',
        element: <VerifyEmail />
    }
]);