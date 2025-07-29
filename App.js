import React from "react";
import { StripeProvider } from "@stripe/stripe-react-native";
import AppNavigator from "./src/Navegation/AppNavigator";

export default function App() {
  return (
    <StripeProvider
      publishableKey="pk_test_51R4TSvJaPM0CtWNr8ww4TmrsbrqcYEuVgTQL1D7IyV5DEdEr0QAgLemZCM2bJMNgzyLP6Br1WLrEp75Kd50p5vxi00PQny6IwQ" // tu clave pública de Stripe
     
    >
      <AppNavigator />
    </StripeProvider>
  );
}
