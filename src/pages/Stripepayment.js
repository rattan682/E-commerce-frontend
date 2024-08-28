import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import "../Stripe.css";
import axios from "axios";
import StripeForm from "./StripeForm";
import { useSelector } from "react-redux";
import { selectcurrentOrder } from "../features/Orders/orderSlice";
const stripePromise = loadStripe("pk_test_51Pes3cRvpRIjRkzbCChZod5aXqXEE0WfE57TX7dNG4fmPSVg6kOJMHIpKfhCTEzGIsLHnRxcCLjHbWLMsERIyPVa00CdZWWQw5");
function Stripepayment() {
  const [clientSecret, setClientSecret] = useState("");
  const currentorder=useSelector(selectcurrentOrder)
  useEffect(() => {
    async function payment(){
        const {data} = await axios.post('/create-payment-intent',{amount:currentorder.order.totalamount,orderid:currentorder.id})
        setClientSecret(data.clientSecret)
    }
    // fetch("/create-payment-intent", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ items: [{ id: "xl-tshirt" }] }),
    // })
    //   .then((res) => res.json())
    //   .then((data) => setClientSecret(data.clientSecret));
    payment()
  }, []);

  const appearance = {
    theme: 'stripe',
  };

  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="Stripe">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <StripeForm></StripeForm>
        </Elements>
      )}
    </div>
  );
}

export default Stripepayment