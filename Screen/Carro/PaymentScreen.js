import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Alert,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import { CardField, useStripe } from "@stripe/stripe-react-native";
import { createPaymentIntent } from "../../src/Services/PagoService";
import api from "../../src/Services/conexion";

const PaymentScreen = ({ route, navigation }) => {
  const { total, cart, onPaymentComplete } = route.params;
  const [clientSecret, setClientSecret] = useState(null);
  const [loading, setLoading] = useState(true);
  const { confirmPayment } = useStripe();

  // Nuevos estados para los campos adicionales
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");

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

    // Validación básica de campos
    if (!fullName || !email || !address) {
      Alert.alert("Error", "Por favor complete todos los campos requeridos");
      return;
    }

    try {
      const { error, paymentIntent } = await confirmPayment(clientSecret, {
        type: "Card",
        paymentMethodType: "Card",
        billingDetails: {
          name: fullName,
          email: email,
          address: {
            line1: address,
          },
        },
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
            cliente_nombre: fullName,
            cliente_email: email,
            cliente_direccion: address,
          };
          await api.post("/pedido", pedidoData);

          // Descontar stock por cada producto comprado
          for (const item of cart) {
            try {
              await api.patch(`/producto/${item.id}/descontar-stock`, {
                cantidad: item.quantity,
              });
            } catch (error) {
              console.error(
                `Error al descontar stock para el producto ${item.name}:`,
                error
              );
            }
          }

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
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6a11cb" />
      </View>
    );
  }

  return (
    <ScrollView
      contentContainerStyle={styles.scrollContainer}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.container}>
        <View style={styles.paymentContainer}>
          {/* Encabezado */}
          <View style={styles.paymentHeader}>
            <Text style={styles.headerTitle}>Pago Seguro</Text>
            <Text style={styles.headerSubtitle}>
              Complete sus datos y la información de pago
            </Text>
          </View>

          {/* Cuerpo del formulario */}
          <View style={styles.paymentBody}>
            <Text style={styles.amountText}>
              Total a pagar: ${total.toFixed(2)}
            </Text>

            {/* Sección de información personal */}
            <Text style={styles.sectionTitle}>Información Personal</Text>

            <View style={styles.formGroup}>
              <Text style={styles.inputLabel}>Nombre Completo</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Juan Pérez"
                value={fullName}
                onChangeText={setFullName}
                autoCapitalize="words"
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.inputLabel}>Email</Text>
              <TextInput
                style={styles.textInput}
                placeholder="juan@example.com"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.inputLabel}>Dirección</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Calle Principal #123, Ciudad"
                value={address}
                onChangeText={setAddress}
                autoCapitalize="words"
              />
            </View>

            {/* Sección de pago */}
            <Text style={styles.sectionTitle}>Información de Pago</Text>

            <View style={styles.formGroup}>
              <Text style={styles.inputLabel}>Detalles de la tarjeta</Text>
              <CardField
                postalCodeEnabled={false}
                style={styles.cardField}
                placeholder={{
                  number: "1234 5678 9012 3456",
                }}
              />
            </View>

            <TouchableOpacity
              style={styles.payButton}
              onPress={handlePay}
              activeOpacity={0.8}
            >
              <Text style={styles.payButtonText}>Confirmar Pago</Text>
            </TouchableOpacity>
          </View>

          {/* Pie de página */}
          <View style={styles.paymentFooter}>
            <Text style={styles.footerText}>
              Su información está protegida con encriptación SSL de 256-bit
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    backgroundColor: "white",
  },

  // Contenedor principal
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    padding: 20,
  },

  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },

  // Contenedor del formulario de pago
  paymentContainer: {
    width: "100%",
    maxWidth: 500,
    backgroundColor: "white",
    borderRadius: 20,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 30,
    elevation: 5,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.05)",
  },

  // Encabezado
  paymentHeader: {
    backgroundColor: "#6a11cb",
    padding: 25,
    alignItems: "center",
  },

  headerTitle: {
    color: "white",
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 5,
    fontFamily: "Poppins-Bold",
  },

  headerSubtitle: {
    color: "rgba(255,255,255,0.9)",
    fontSize: 14,
    fontFamily: "Poppins-Regular",
  },

  // Cuerpo del formulario
  paymentBody: {
    padding: 30,
  },

  amountText: {
    fontSize: 18,
    color: "#333",
    textAlign: "center",
    marginBottom: 25,
    fontWeight: "600",
    fontFamily: "Poppins-SemiBold",
  },

  sectionTitle: {
    fontSize: 16,
    color: "#555",
    fontWeight: "600",
    marginBottom: 15,
    marginTop: 10,
    borderLeftWidth: 4,
    borderLeftColor: "#6a11cb",
    paddingLeft: 10,
    fontFamily: "Poppins-SemiBold",
  },

  // Grupos de formulario
  formGroup: {
    marginBottom: 20,
  },

  inputLabel: {
    fontSize: 14,
    color: "#555",
    marginBottom: 8,
    fontWeight: "600",
    fontFamily: "Poppins-SemiBold",
  },

  textInput: {
    height: 50,
    width: "100%",
    backgroundColor: "#fafafa",
    borderColor: "#ccc",
    borderWidth: 2,
    borderRadius: 12,
    paddingHorizontal: 14,
    fontSize: 16,
    color: "#333",
    fontFamily: "Poppins-Regular",
  },

  cardField: {
    height: 50,
    width: "100%",
    backgroundColor: "#fafafa",
    borderColor: "#ccc",
    borderWidth: 2,
    borderRadius: 12,
    paddingHorizontal: 14,
  },

  // Botón de pago
  payButton: {
    width: "100%",
    padding: 16,
    backgroundColor: "#6a11cb",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    shadowColor: "#6a11cb",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 5,
  },

  payButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
    fontFamily: "Poppins-SemiBold",
  },

  // Pie de página
  paymentFooter: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: "#eee",
    backgroundColor: "#f9f9f9",
    alignItems: "center",
  },

  footerText: {
    fontSize: 12,
    color: "#777",
    textAlign: "center",
    fontFamily: "Poppins-Regular",
  },
});

export default PaymentScreen;
