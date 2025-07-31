import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Image
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import api from "../../src/Services/conexion";

export default function CambiarContrasena({ navigation }) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      return Alert.alert("Error", "Completa todos los campos.");
    }

    if (newPassword !== confirmPassword) {
      return Alert.alert("Error", "Las contraseñas no coinciden.");
    }

    setIsSubmitting(true);
    
    try {
      const response = await api.post("/cambiar-password", {
        current_password: currentPassword,
        new_password: newPassword,
        new_password_confirmation: confirmPassword,
      });

      if (response.data.success) {
        Alert.alert("Éxito", response.data.message);
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
        navigation.goBack();
      } else {
        Alert.alert("Error", response.data.message || "No se pudo cambiar la contraseña.");
      }
    } catch (error) {
      console.error("Error cambiando contraseña:", error);
      Alert.alert("Error", error.response?.data?.message || "Error al cambiar la contraseña.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.keyboardAvoidingContainer}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
         
          <Text style={styles.headerTitle}>Cambiar Contraseña</Text>
          <Text style={styles.headerSubtitle}>Protege tu cuenta con una contraseña segura</Text>
        </View>

        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <Ionicons name="lock-closed" size={20} color="#D4AF37" style={styles.inputIcon} />
            <TextInput
              placeholder="Contraseña actual"
              placeholderTextColor="#999"
              secureTextEntry
              style={styles.input}
              value={currentPassword}
              onChangeText={setCurrentPassword}
            />
          </View>

          <View style={styles.inputContainer}>
            <Ionicons name="key" size={20} color="#D4AF37" style={styles.inputIcon} />
            <TextInput
              placeholder="Nueva contraseña"
              placeholderTextColor="#999"
              secureTextEntry
              style={styles.input}
              value={newPassword}
              onChangeText={setNewPassword}
            />
          </View>

          <View style={styles.inputContainer}>
            <Ionicons name="key" size={20} color="#D4AF37" style={styles.inputIcon} />
            <TextInput
              placeholder="Confirmar nueva contraseña"
              placeholderTextColor="#999"
              secureTextEntry
              style={styles.input}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
          </View>

          <TouchableOpacity 
            style={[styles.button, isSubmitting && styles.buttonDisabled]} 
            onPress={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <ActivityIndicator color="#FFF" />
            ) : (
              <>
                <Ionicons name="save" size={20} color="#FFF" style={styles.buttonIcon} />
                <Text style={styles.buttonText}>Guardar Cambios</Text>
              </>
            )}
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.cancelButton} 
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.cancelButtonText}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  keyboardAvoidingContainer: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: "#F9F9F9",
  },
  header: {
    backgroundColor: "#1A1A2E",
    paddingVertical: 30,
    paddingBottom: 40,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  headerIcon: {
    width: 80,
    height: 80,
    marginBottom: 15,
    tintColor: "#D4AF37"
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: "#FFF",
    marginBottom: 5,
    fontFamily: 'PlayfairDisplay_700Bold',
  },
  headerSubtitle: {
    fontSize: 16,
    color: "rgba(255,255,255,0.8)",
    textAlign: "center",
    paddingHorizontal: 40,
  },
  formContainer: {
    paddingHorizontal: 25,
    paddingTop: 30,
    paddingBottom: 40,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    borderRadius: 12,
    paddingHorizontal: 15,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    borderWidth: 1,
    borderColor: "#EEE",
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: "#333",
    paddingVertical: 0,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#D4AF37",
    padding: 18,
    borderRadius: 12,
    marginTop: 15,
    shadowColor: "#D4AF37",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonIcon: {
    marginRight: 10,
  },
  buttonText: {
    color: "#FFF",
    fontWeight: "600",
    fontSize: 16,
  },
  cancelButton: {
    marginTop: 15,
    padding: 15,
    alignItems: "center",
  },
  cancelButtonText: {
    color: "#888",
    fontWeight: "600",
    fontSize: 16,
  },
  passwordTips: {
    marginTop: 20,
    padding: 15,
    backgroundColor: "rgba(212, 175, 55, 0.1)",
    borderRadius: 10,
    borderLeftWidth: 4,
    borderLeftColor: "#D4AF37",
  },
  tipsTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1A1A2E",
    marginBottom: 8,
  },
  tipsText: {
    fontSize: 13,
    color: "#666",
    lineHeight: 20,
  },
});