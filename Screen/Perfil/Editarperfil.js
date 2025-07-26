import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../../src/Services/conexion"; // Usa tu instancia de Axios configurada

const EditarPerfil = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [loading, setLoading] = useState(false);

  // Obtener los datos del usuario de los parámetros
  const userData = route.params?.usuario || {};

  const [formData, setFormData] = useState({
    nombre: userData.nombre || "",
    email: userData.email || "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (route.params?.usuario) {
      setFormData({
        nombre: route.params.usuario.nombre || "",
        email: route.params.usuario.email || "",
        password: "",
        confirmPassword: "",
      });
    }
  }, [route.params]);

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = async () => {
    if (formData.password && formData.password !== formData.confirmPassword) {
      Alert.alert("Error", "Las contraseñas no coinciden");
      return;
    }

    setLoading(true);
    try {
      const token = await AsyncStorage.getItem("token");

      const payload = {
        nombre: formData.nombre,
        email: formData.email,
      };

      if (formData.password) {
        payload.password = formData.password;
      }

      const response = await api.put("/editarPerfil", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        Alert.alert("Éxito", "Perfil actualizado correctamente");
        navigation.navigate("Perfil", { updatedUser: response.data.usuario });
      } else {
        Alert.alert("Error", "No se pudo actualizar el perfil");
      }
    } catch (error) {
      console.error("Error al actualizar perfil:", error);
      Alert.alert(
        "Error",
        error.response?.data?.message || "Error desconocido al actualizar el perfil"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Editar Perfil</Text>

      <TextInput
        placeholder="Nombre"
        value={formData.nombre}
        onChangeText={(text) => handleChange("nombre", text)}
        style={styles.input}
      />

      <TextInput
        placeholder="Email"
        value={formData.email}
        onChangeText={(text) => handleChange("email", text)}
        keyboardType="email-address"
        autoCapitalize="none"
        style={styles.input}
      />

      <TextInput
        placeholder="Nueva Contraseña (opcional)"
        value={formData.password}
        onChangeText={(text) => handleChange("password", text)}
        secureTextEntry
        style={styles.input}
      />

      {formData.password ? (
        <TextInput
          placeholder="Confirmar Contraseña"
          value={formData.confirmPassword}
          onChangeText={(text) => handleChange("confirmPassword", text)}
          secureTextEntry
          style={styles.input}
        />
      ) : null}

      <TouchableOpacity
        style={styles.button}
        onPress={handleSubmit}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Guardar Cambios</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.cancelButton}
        onPress={() => navigation.goBack()}
        disabled={loading}
      >
        <Text style={styles.cancelButtonText}>Cancelar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default EditarPerfil;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#3b4bb4ff",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  cancelButton: { 
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#3f4a99ff",
  },
  cancelButtonText: {
    color: "#344681ff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
