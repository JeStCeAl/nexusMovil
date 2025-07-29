import React, { useState, useEffect } from "react";
import { View, Text, Alert, ActivityIndicator, StyleSheet } from "react-native";
import { CardField, useStripe } from "@stripe/stripe-react-native";
import { createPaymentIntent } from "../../src/Services/PagoService";
import api from "../../src/Services/conexion";

const PaymentScreen = ({ route, navigation }) => {
  const { total, cart, onPaymentComplete } = route.params;
  const [clientSecret, setClientSecret] = useState(null);
  const [loading, setLoading] = useState(true);
  const { confirmPayment } = useStripe();

  useEffect(() => {
    const initPayment = async () => {
      try {
        const secret = await createPaymentIntent(total);
        setClientSecret(secret);
      } catch (error) {
        Alert.alert("Error", error.message);
        navigation.goBack();
      } finally {
        setLoading(false);
      }
    };
    initPayment();
  }, []);

  const handlePay = async () => {
    if (!clientSecret) return;

    try {
      const { error, paymentIntent } = await confirmPayment(clientSecret, {
        type: "Card",
        paymentMethodType: "Card",
      });

      if (error) {
        Alert.alert("Error", error.message || "Ocurrió un error en el pago.");
        navigation.navigate("productos");
        return;
      }

      if (paymentIntent && paymentIntent.status === "Succeeded") {
        try {
          const pedidoData = {
            estado: "pagado",
            fechaPedido: new Date().toISOString().split("T")[0],
            numero: "ORD-" + Math.floor(Math.random() * 1000000),
            total,
            usuario_id: 1,
          };
          await api.post("/pedido", pedidoData);

          // Vaciar carrito al confirmar pago
          if (onPaymentComplete) onPaymentComplete();

          Alert.alert("Éxito", "Pago completado y pedido registrado.");
          navigation.navigate("productos");
        } catch (e) {
          Alert.alert(
            "Advertencia",
            "Pago realizado, pero no se pudo registrar el pedido."
          );
          navigation.navigate("productos");
        }
      }
    } catch (err) {
      Alert.alert("Error", "No se pudo procesar el pago.");
      navigation.navigate("productos");
    }
  };

  if (loading) {
    return <ActivityIndicator style={{ flex: 1 }} />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pagar ${total.toFixed(2)}</Text>
      <CardField
        postalCodeEnabled={false}
        style={styles.cardField}
      />
      <Text style={styles.payButton} onPress={handlePay}>
        Confirmar Pago
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
  cardField: { height: 50, marginVertical: 20 },
  payButton: { color: "#fff", backgroundColor: "#2ecc71", padding: 15, textAlign: "center", borderRadius: 8 },
});

export default PaymentScreen;
