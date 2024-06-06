import React, { useState } from "react";
import { checkoutCustomerPaymentApi, createOrderCustomerPaymentApi, updateOrderCustomerPaymentApi } from "../api/customerPaymentApi";

const useCustomerCheckout = ({ customer_sid, onSuccess, onFailure }) => {

    const [ orderId, setOrderId ] = useState(null);
    const [ amount, setAmount ] = useState(0);
    const [ isSuccess, setIsSucess] = useState(false);
    const [ isFailure, setIsFailure] = useState(false);

    const createOrder = async ({ amount }) => {
        try {
            const req = {
                amount,
                pricing_plan_sid: "PP00001"
            }
            const res = await createOrderCustomerPaymentApi({ req, customer_sid });
            const {customer_order} = res?.data;
            const {external_order_id: order_id} = customer_order;
            setOrderId(order_id);
            setAmount(amount);
        } catch(err) {
            setOrderId(null);
        }
    }

    const successHandler = async (res) => {
        console.log(res);
        setIsSucess(true);
        setIsFailure(false);
        const {
            razorpay_order_id,
            razorpay_payment_id: payment_id,
            razorpay_signature: signature
        } = res;

        const req = {
            status: `completed`,
            gateway_props: {
                payment_id,
                signature
            }
        };
        await updateOrderCustomerPaymentApi({
            req,
            customer_sid,
            order_id: orderId
        });
    
        onSuccess();

    };
    const failureHandler = (res) => {
        console.error(res);
        setIsSucess(false);
        setIsFailure(true);
        onFailure();
    };

    const checkout = async () => {
        try {
            const options = {
                "key": process.env.RAZOR_PAY_KEY, // Enter the Key ID generated from the Dashboard
                amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
                "currency": "INR",
                "name": "The Review Factor", //your business name
                "description": "Test Transaction",
                "image": "https://example.com/your_logo",
                "order_id": orderId, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
                "callback_url": `http://localhost:4000/payments/${orderId}`,
                "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
                    // "name": "Gaurav Kumar", //your customer's name
                    // "email": "gaurav.kumar@example.com",
                    // "contact": "9000090000" //Provide the customer's phone number for better conversion rates 
                },
                "notes": {
                    "address": "Razorpay Corporate Office"
                },
                "theme": {
                    "color": "#3399cc"
                },
                handler: function(res) {
                    successHandler(res);
                }
            };
            const rzPay = new window.Razorpay(options);
            rzPay.on('payment.failed',function (res) {
                failureHandler(res);
            });
            rzPay.open();
        } catch(err) {
            console.error(err);
        }
    };

    return {
        orderId,
        createOrder,
        checkout,
        successHandler,
        failureHandler,
        isSuccess,
        isFailure
    };
};

export default useCustomerCheckout;