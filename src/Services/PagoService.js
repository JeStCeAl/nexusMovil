


import api from "./conexion";

/**
 * Crea un PaymentIntent y devuelve el clientSecret
 * @param {number} amount - Monto total (en dólares)
 */
export const createPaymentIntent = async (amount) => {
  try {
    const response = await api.post("/create-payment-intent", {
      amount: amount * 100, // Stripe usa centavos
    });
    return response.data.clientSecret;
  } catch (error) {
    console.error("Error creando PaymentIntent:", error.response?.data || error.message);
    throw new Error("No se pudo iniciar el pago");
  }
};
