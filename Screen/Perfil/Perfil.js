import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BottonComponent from "../../Components/BotonComponent";
import api from "../../src/Services/conexion";
import { logoutUser } from "../../src/Services/AuthService";
import { MaterialIcons } from "@expo/vector-icons";
import EditarPerfil from "./EditarPerfil"; // Assuming this is the correct path for EditarPerfil

export default function Perfil({ navigation }) {
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargarPefil = async () => {
      try {
        const token = await AsyncStorage.getItem("userToken");
        if (!token) {
          console.log("No se encontró el token de usuario");
          return;
        }

        console.log("Intentando cargar perfil con token:", token);
        const response = await api.get("/me");
        console.log("Perfil cargado exitosamente:", response.data);
        setUsuario(response.data);
      } catch (error) {
        console.log("Error al cargar el perfil:", error);
        if (error.isAuthError || error.shouldRedirectToLogin) {
          console.log("Error de autenticación, redirigiendo a login...");
          return;
        }

        if (error.response) {
          console.log(
            "Error response: ",
            error.response.status,
            error.response.data
          );
          Alert.alert(
            "Error al servidor",
            `Error ${error.response.status}: ${
              error.response.data?.message ||
              "Ocurrió un error al cargar el perfil."
            }`,
            [
              {
                text: "OK",
                onPress: async () => {
                  await AsyncStorage.removeItem("userToken");
                },
              },
            ]
          );
        } else if (error.request) {
          Alert.alert(
            "Error de conexión",
            "No se pudo conectar al servidor. Por favor, verifica tu conexión a internet.",
            [
              {
                text: "OK",
                onPress: async () => {
                  await AsyncStorage.removeItem("userToken");
                },
              },
            ]
          );
        } else {
          Alert.alert(
            "Error",
            "Ocurrió un error inesperado al cargar el perfil.",
            [
              {
                text: "OK",
                onPress: async () => {
                  await AsyncStorage.removeItem("userToken");
                },
              },
            ]
          );
        }
      } finally {
        setLoading(false);
      }
    };

    const unsubscribe = navigation.addListener("focus", () => {
      cargarPefil();
    });

    return unsubscribe;
  }, [navigation]);

  const handleEditProfile = () => {
    navigation.navigate("EditarPerfil", { usuario });
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4A90E2" />
      </View>
    );
  }

  if (!usuario) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Perfil de Usuario</Text>
        <View style={styles.profileContainer}>
          <Text style={styles.errorText}>
            No se pudo cargar el perfil del usuario.
          </Text>
        </View>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.avatarContainer}>
            <Image
              source={require("../../assets/icon.png")}
              style={styles.avatar}
            />
          </View>
          <Text style={styles.userName}>{usuario.nombre || "Usuario"}</Text>
          <Text style={styles.userRole}>
            {usuario.tipo || "Rol no definido"}
          </Text>
        </View>

        <View style={styles.profileContainer}>
          <View style={styles.infoSection}>
            <Text style={styles.sectionTitle}>Información Personal</Text>

            <View style={styles.infoItem}>
              <MaterialIcons name="person" size={20} color="#4A90E2" />
              <Text style={styles.infoText}>
                {usuario.nombre || "No disponible"}
              </Text>
            </View>

            <View style={styles.infoItem}>
              <MaterialIcons name="email" size={20} color="#4A90E2" />
              <Text style={styles.infoText}>
                {usuario.email || "No disponible"}
              </Text>
            </View>

            <View style={styles.infoItem}>
              <MaterialIcons name="work" size={20} color="#4A90E2" />
              <Text style={styles.infoText}>
                {usuario.tipo || "No disponible"}
              </Text>
            </View>
          </View>

          <View style={styles.buttonGroup}>
            <BottonComponent
              title="Editar Perfil"
              onPress={handleEditProfile}
              style={styles.editButton}
              textStyle={styles.buttonText}
            />
            <BottonComponent
              title="Cerrar Sesión"
              onPress={async () => {
                await logoutUser();
              }}
              style={styles.logoutButton}
              textStyle={styles.buttonText}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F8F9FA",
  },
  header: {
    alignItems: "center",
    paddingVertical: 30,
    backgroundColor: "#4A90E2",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  avatarContainer: {
    position: "relative",
    marginBottom: 15,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: "white",
  },
  avatarOverlay: {
    position: "absolute",
    right: 0,
    bottom: 0,
    backgroundColor: "#4A90E2",
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "white",
  },
  userName: {
    fontSize: 24,
    fontWeight: "600",
    color: "white",
    marginBottom: 5,
  },
  userRole: {
    fontSize: 16,
    color: "rgba(255,255,255,0.8)",
    fontWeight: "500",
  },
  profileContainer: {
    paddingHorizontal: 25,
    marginBottom: 30,
  },
  infoSection: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 20,
    marginBottom: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#2C3E50",
    marginBottom: 15,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ECF0F1",
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  infoText: {
    fontSize: 16,
    color: "#34495E",
    marginLeft: 10,
  },
  buttonGroup: {
    marginTop: 10,
  },
  editButton: {
    backgroundColor: "#4A90E2",
    borderRadius: 8,
    paddingVertical: 14,
    marginBottom: 15,
  },
  logoutButton: {
    backgroundColor: "#E74C3C",
    borderRadius: 8,
    paddingVertical: 14,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  errorText: {
    fontSize: 16,
    color: "#E74C3C",
    textAlign: "center",
    marginVertical: 20,
  },
});
