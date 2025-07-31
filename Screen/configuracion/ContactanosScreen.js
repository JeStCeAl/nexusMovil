import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, ActivityIndicator } from "react-native";
import * as MailComposer from 'expo-mail-composer';
import { useNetInfo } from "@react-native-community/netinfo";

const ContactanosScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const netInfo = useNetInfo();

  const handleSubmit = async () => {
    if (!name || !email || !message) {
      Alert.alert("Error", "Por favor completa todos los campos");
      return;
    }

    if (!validateEmail(email)) {
      Alert.alert("Error", "Por favor ingresa un correo electrónico válido");
      return;
    }

    if (!netInfo.isConnected) {
      Alert.alert("Sin conexión", "Necesitas conexión a internet para enviar el mensaje");
      return;
    }

    setIsLoading(true);

    try {
      const isAvailable = await MailComposer.isAvailableAsync();
      
      if (!isAvailable) {
        Alert.alert("Error", "El servicio de correo no está disponible en este dispositivo");
        return;
      }

      await MailComposer.composeAsync({
        recipients: ['nexusecommerce2025@gmail.com'], // Reemplaza con tu email
        subject: `Mensaje de contacto de ${name}`,
        body: `Nombre: ${name}\nEmail: ${email}\n\nMensaje:\n${message}`,
      });

      Alert.alert("Éxito", "El correo se ha abierto en tu aplicación de email. Por favor envíalo para completar el proceso.");
      setName("");
      setEmail("");
      setMessage("");
    } catch (error) {
      Alert.alert("Error", "No se pudo abrir el cliente de correo: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Contáctanos</Text>
      <Text style={styles.subtitle}>Llena el formulario y nos pondremos en contacto contigo</Text>

      <TextInput
        style={styles.input}
        placeholder="Tu nombre"
        placeholderTextColor="#999"
        value={name}
        onChangeText={setName}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Tu correo electrónico"
        placeholderTextColor="#999"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Escribe tu mensaje..."
        placeholderTextColor="#999"
        multiline
        numberOfLines={4}
        value={message}
        onChangeText={setMessage}
      />
      
      <TouchableOpacity 
        style={styles.button} 
        onPress={handleSubmit}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Enviar Mensaje</Text>
        )}
      </TouchableOpacity>

      <Text style={styles.footerText}>
        También puedes contactarnos directamente a: soporte@tudominio.com
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f7fa",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#2c3e50",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#7f8c8d",
    marginBottom: 30,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
    color: "#333",
    borderWidth: 1,
    borderColor: "#e0e0e0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 1,
  },
  textArea: {
    height: 150,
    textAlignVertical: "top",
  },
  button: {
    backgroundColor: "#3498db",
    padding: 16,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 18,
  },
  footerText: {
    marginTop: 30,
    textAlign: "center",
    color: "#7f8c8d",
    fontSize: 14,
  },
});

export default ContactanosScreen;