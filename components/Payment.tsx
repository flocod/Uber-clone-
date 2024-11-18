import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Alert } from "react-native";
import CustomButton from "./CustomButton";
import { useStripe } from "@stripe/stripe-react-native";
import { fetchAPI } from "@/lib/fetch";
import { PaymentProps } from "@/types/type";

const Payment = ({
  fullName,
  email,
  amount,
  driverId,
  rideTime,
}: PaymentProps) => {
  const [loading, setLoading] = useState(false);
  const { initPaymentSheet, presentPaymentSheet } = useStripe();

  const [succes, setSucces] = useState(false);

  const fetchPaymentSheetParams = async () => {
    const response = await fetch(`${API_URL}/payment-sheet`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const { paymentIntent, ephemeralKey, customer } = await response.json();

    return {
      paymentIntent,
      ephemeralKey,
      customer,
    };
  };


  const confirmHandler = async (paymentMethod, intentCreationCallback) => {
 

    const {paymentIntent, customer} = await fetchAPI('/(api)/(stripe)/create', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name:fullName || email.split("@")[0],
        email: email,
        amount: amount,
        paymentMethodId: paymentMethod.id
      })
    })


    if(paymentIntent.client_secret){
      const {result} = await fetchAPI('/(api)/(stripe)/pay', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({payment_method_id: paymentMethod.id, payment_intent_id: paymentIntent.id, customer_id: customer})
      })


      
    if (result.client_secret) {
      
    }


    }



    const {clientSecret, error} =await response.json();

    if(clientSecret){
      intentCreationCallback({clientSecret})
    }else{
      intentCreationCallback({error})
    }

  };


  const initializePaymentSheet = async () => {
    // const { paymentIntent, ephemeralKey, customer } =
    //   await fetchPaymentSheetParams();

    const { error } = await initPaymentSheet({
      merchantDisplayName: "Example, Inc.",
      intentConfiguration: {
        mode: {
          amount: 1099,
          currencyCode: "USD",
        },
        confirmHandler: confirmHandler,
      },
      // customerId: customer,
      // customerEphemeralKeySecret: ephemeralKey,
      // paymentIntentClientSecret: paymentIntent,
      // // Set `allowsDelayedPaymentMethods` to true if your business can handle payment
      // //methods that complete payment after a delay, like SEPA Debit and Sofort.
      // allowsDelayedPaymentMethods: true,
      // defaultBillingDetails: {
      //   name: "Jane Doe",
      // },
    });
    if (!error) {
      setLoading(true);
    }
  };

  const openPaymentSheet = async () => {
    await initializePaymentSheet();

    const { error } = await presentPaymentSheet();

    if (error) {
      Alert.alert(`Error code: ${error.code}`, error.message);
    } else {
      setSucces(true);
      Alert.alert("Success", "Your order is confirmed!");
    }
  };



  return (
    <>
      <CustomButton
        title="Confirm Ride"
        className="my-5"
        onPress={openPaymentSheet}
      />
    </>
  );
};

const styles = StyleSheet.create({});

export default Payment;
