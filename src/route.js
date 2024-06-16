import { createBrowserRouter } from "react-router-dom";
import CustomerSignup from "./component/CustomerSignup";
import AddUser from "./component/AddUser";
import ListUsers from "./component/ListUsers";
import UserReview from "./component/UserReview";
import VerifyEmail from "./component/VerifyEmail";
import CustomerLogin from "./component/CustomerLogin";
import ListReviews from "./component/ListReviews";
import ListWidgets from "./component/ListWidgets";
import AddWidgets from "./component/AddWidgets";
import Root from "./component/Root";
import CustomerDashboard from "./component/CustomerDashboard";
import NotLoggedIn from "./component/NotLoggedIn/NotLoggedIn";
import CustomerOnboard from "./component/CustomerOnboard/CustomerOnboard";
// import CustomerPayment from "./component/CustomerPayment/CustomerPayment";
import CustomerWidgetConfig from "./component/CustomerWidgetConfig/CustomerWidgetConfig";

export const router = createBrowserRouter([
    {
        path: '/:customer_sid',
        element: <Root />,
        children: [
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
                path: '/:customer_sid/verify-passcode',
                element: <VerifyEmail />
             },
            {
                path: '/:customer_sid/dashboard',
                element: <CustomerDashboard />
            },
            {
                path:`/:customer_sid/onboard`,
                element: <CustomerOnboard />
            },
            // {
            //     path: `/:customer_sid/payment`,
            //     element: <CustomerPayment />
            // },
            {
                path: '/:customer_sid/widgets/config',
                element: <CustomerWidgetConfig />
            }
        ]
    },
    {
        path: '/',
        element: <NotLoggedIn />,
        children: [
            {
                path: '/login',
                element: <CustomerLogin />
            },
            {
                path: '/signup',
                element: <CustomerSignup />
            },
            {
                path: '/test-widget',
                element: <review-carousel customer_widget_sid="CW00004"/>
                // element: <add-review customer_widget_sid = "CW00005" />
            },
            {
                path: '/reviews/:review_sid',
                element: <UserReview />
            },
        ]
    }
    
]);