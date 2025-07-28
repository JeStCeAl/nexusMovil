import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialIcons, FontAwesome, Ionicons, Feather } from "@expo/vector-icons";
import api from "../../src/Services/conexion";
import { logoutUser } from "../../src/Services/AuthService";

export default function Perfil({ navigation }) {
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const cargarPerfil = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const token = await AsyncStorage.getItem("userToken");
      if (!token) {
        throw new Error("No se encontró token de autenticación");
      }

      const response = await api.get("/me");
      if (!response.data) {
        throw new Error("Datos de usuario no recibidos");
      }

      setUsuario(response.data);
    } catch (err) {
      console.error("Error al cargar perfil:", err);
      setError(err.message || "Error al cargar el perfil");
      
      if (err.response?.status === 401) {
        await logoutUser();
        navigation.navigate("Login");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", cargarPerfil);
    cargarPerfil();
    return unsubscribe;
  }, [navigation]);

  const handleEditProfile = () => {
    navigation.navigate('EditarPerfil', { usuario });
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#D4AF37" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorTitle}>Error al cargar perfil</Text>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={cargarPerfil}>
          <Text style={styles.retryButtonText}>Reintentar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (!usuario) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorTitle}>Perfil no disponible</Text>
        <Text style={styles.errorText}>
          No se pudieron cargar los datos del usuario.
        </Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        {/* Header con imagen de diamante de fondo */}
        <View style={styles.header}>
          <View style={styles.avatarContainer}>
            <Image
              source={usuario.foto ? { uri: usuario.foto } : require("../../assets/diamante.png")}
              style={styles.avatar}
            />
            <TouchableOpacity style={styles.editIcon} onPress={handleEditProfile}>
              <Feather name="edit-2" size={20} color="#FFF" />
            </TouchableOpacity>
          </View>
          <Text style={styles.userName}>{usuario.nombre || "Usuario"}</Text>
          <Text style={styles.userRole}>
            {usuario.tipo ? `Cliente ${usuario.tipo}` : "Miembro Diamante"}
          </Text>
          
          <View style={styles.membershipBadge}>
            <Ionicons name="diamond-outline" size={16} color="#D4AF37" />
            <Text style={styles.membershipText}>Miembro Oro</Text>
          </View>
        </View>

        {/* Sección de información */}
        <View style={styles.profileContainer}>
          <View style={styles.infoSection}>
            <Text style={styles.sectionTitle}>MI CUENTA</Text>

            <View style={styles.infoItem}>
              <View style={styles.infoIcon}>
                <Ionicons name="person-outline" size={20} color="#D4AF37" />
              </View>
              <View>
                <Text style={styles.infoLabel}>Nombre completo</Text>
                <Text style={styles.infoText}>
                  {usuario.nombre || "No disponible"}
                </Text>
              </View>
            </View>

            <View style={styles.infoItem}>
              <View style={styles.infoIcon}>
                <MaterialIcons name="email" size={20} color="#D4AF37" />
              </View>
              <View>
                <Text style={styles.infoLabel}>Correo electrónico</Text>
                <Text style={styles.infoText}>
                  {usuario.email || "No disponible"}
                </Text>
              </View>
            </View>

            <View style={styles.infoItem}>
              <View style={styles.infoIcon}>
                <Feather name="phone" size={20} color="#D4AF37" />
              </View>
              <View>
                <Text style={styles.infoLabel}>Teléfono</Text>
                <Text style={styles.infoText}>
                  {usuario.telefono || "No disponible"}
                </Text>
              </View>
            </View>

            <View style={styles.infoItem}>
              <View style={styles.infoIcon}>
                <MaterialIcons name="location-on" size={20} color="#D4AF37" />
              </View>
              <View>
                <Text style={styles.infoLabel}>Dirección</Text>
                <Text style={styles.infoText}>
                  {usuario.direccion || "No disponible"}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: "#F9F9F9",
  },
  container: {
    flex: 1,
    backgroundColor: "#F9F9F9",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF",
  },
  header: {
    alignItems: "center",
    paddingVertical: 40,
    paddingBottom: 60,
    backgroundColor: "#1A1A2E",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
    position: 'relative',
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 15,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: "#D4AF37",
    backgroundColor: '#FFF',
  },
  editIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#D4AF37',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#1A1A2E',
  },
  userName: {
    fontSize: 24,
    fontWeight: "600",
    color: "white",
    marginBottom: 5,
    fontFamily: 'PlayfairDisplay_700Bold',
  },
  userRole: {
    fontSize: 16,
    color: "rgba(255,255,255,0.8)",
    fontWeight: "500",
    marginBottom: 10,
  },
  membershipBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(212, 175, 55, 0.2)',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#D4AF37',
  },
  membershipText: {
    fontSize: 14,
    color: '#D4AF37',
    marginLeft: 5,
    fontWeight: '600',
  },
  profileContainer: {
    paddingHorizontal: 20,
    marginBottom: 30,
    marginTop: -30,
  },
  infoSection: {
    backgroundColor: "white",
    borderRadius: 15,
    padding: 25,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 5,
  },
  actionsSection: {
    backgroundColor: "white",
    borderRadius: 15,
    padding: 20,
    marginBottom: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1A1A2E",
    marginBottom: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
    letterSpacing: 0.5,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 20,
  },
  infoIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(212, 175, 55, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  infoLabel: {
    fontSize: 12,
    color: "#888",
    marginBottom: 3,
  },
  infoText: {
    fontSize: 16,
    color: "#333",
    fontWeight: '500',
  },
  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  actionIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(212, 175, 55, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  actionText: {
    fontSize: 16,
    color: "#333",
    flex: 1,
    fontWeight: '500',
  },
  logoutButton: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 18,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E74C3C',
  },
  logoutButtonText: {
    color: '#E74C3C',
    fontSize: 16,
    fontWeight: '600',
  },
  retryButton: {
    backgroundColor: '#D4AF37',
    borderRadius: 8,
    padding: 15,
    marginTop: 20,
    alignItems: 'center',
  },
  retryButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  errorTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1A1A2E',
    textAlign: 'center',
    marginBottom: 10,
  },
  errorText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginHorizontal: 30,
  },
});