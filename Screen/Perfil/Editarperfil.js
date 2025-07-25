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
import { editProfile } from "../../src/Services/AuthService";

const EditarPerfil = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [loading, setLoading] = useState(false);

  // Obtener los datos del usuario de los parámetros de navegación
  const userData = route.params?.usuario || {};

  // Estado inicial con los datos del usuario
  const [formData, setFormData] = useState({
    name: userData.nombre || "",
    email: userData.email || "",
    password: "",
    confirmPassword: "",
  });

  // Actualizar el estado si los parámetros cambian
  useEffect(() => {
    if (route.params?.usuario) {
      setFormData({
        name: route.params.usuario.nombre || "",
        email: route.params.usuario.email || "",
        password: "",
        confirmPassword: "",
      });
    }
  }, [route.params]);

  const handleChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    if (formData.password && formData.password !== formData.confirmPassword) {
      Alert.alert("Error", "Las contraseñas no coinciden");
      return;
    }

    setLoading(true);
    try {
      const dataToSend = {
        name: formData.name,
        email: formData.email,
      };

      if (formData.password) {
        dataToSend.password = formData.password;
      }

      const result = await editProfile(dataToSend);

      if (result.success) {
        Alert.alert("Éxito", "Perfil actualizado correctamente");
        navigation.navigate("Perfil", { updatedUser: result.data });
      } else {
        Alert.alert(
          "Error",
          result.error?.message || "Error al actualizar el perfil"
        );
      }
    } catch (error) {
      Alert.alert("Error", "Ocurrió un error al actualizar el perfil");
      console.error("Error en EditarPerfil:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Editar Perfil</Text>

      <TextInput
        placeholder="Nombre"
        value={formData.name}
        onChangeText={(text) => handleChange("name", text)}
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

export default EditarPerfil;
