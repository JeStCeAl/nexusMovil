import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { logoutUser } from "../../src/Services/AuthService";

const ConfiguracionScreen = ({ navigation }) => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Configuración</Text>

      {/* Sección de Cuenta */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Cuenta</Text>

        <TouchableOpacity
          style={styles.option}
          onPress={() => navigation.navigate("Perfil", { screen: "Perfil" })}
        >
          <Ionicons name="person-outline" size={24} color="#333" />
          <Text style={styles.optionText}>Perfil</Text>
          <Ionicons name="chevron-forward" size={20} color="#999" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.option}>
          <Ionicons name="lock-closed-outline" size={24} color="#333" />
          <Text style={styles.optionText}>Cambiar contraseña</Text>
          <Ionicons name="chevron-forward" size={20} color="#999" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.option}>
          <Ionicons name="card-outline" size={24} color="#333" />
          <Text style={styles.optionText}>Métodos de pago</Text>
          <Ionicons name="chevron-forward" size={20} color="#999" />
        </TouchableOpacity>
      </View>

      {/* Sección de Joyería */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Preferencias de Joyería</Text>

        <TouchableOpacity style={styles.option}>
          <Ionicons name="diamond-outline" size={24} color="#333" />
          <Text style={styles.optionText}>Materiales preferidos</Text>
          <Ionicons name="chevron-forward" size={20} color="#999" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.option}>
          <Ionicons name="pricetag-outline" size={24} color="#333" />
          <Text style={styles.optionText}>Rango de precios</Text>
          <Ionicons name="chevron-forward" size={20} color="#999" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.option}>
          <Ionicons name="heart-outline" size={24} color="#333" />
          <Text style={styles.optionText}>Diseños favoritos</Text>
          <Ionicons name="chevron-forward" size={20} color="#999" />
        </TouchableOpacity>
      </View>

      {/* Sección de Soporte */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Soporte</Text>

        <TouchableOpacity style={styles.option}>
          <Ionicons name="help-circle-outline" size={24} color="#333" />
          <Text style={styles.optionText}>Ayuda</Text>
          <Ionicons name="chevron-forward" size={20} color="#999" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.option}>
          <Ionicons name="mail-outline" size={24} color="#333" />
          <Text style={styles.optionText}>Contáctanos</Text>
          <Ionicons name="chevron-forward" size={20} color="#999" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.option}>
          <Ionicons name="information-circle-outline" size={24} color="#333" />
          <Text style={styles.optionText}>Acerca de</Text>
          <Ionicons name="chevron-forward" size={20} color="#999" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.logoutButton}
        onPress={async () => {
          await logoutUser();
        }}
      >
        <Text style={styles.logoutText}>Cerrar sesión</Text>
      </TouchableOpacity>

      <Text style={styles.versionText}>Versión 1.0.0</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    padding: 16,
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 24,
    color: "#333",
  },
  section: {
    marginBottom: 24,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    padding: 12,
    color: "#666",
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  optionText: {
    flex: 1,
    marginLeft: 16,
    fontSize: 16,
    color: "#333",
  },
  logoutButton: {
    marginTop: 24,
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  logoutText: {
    color: "#d9534f",
    fontWeight: "600",
    fontSize: 16,
  },
  versionText: {
    textAlign: "center",
    marginTop: 24,
    color: "#999",
    fontSize: 12,
  },
});

export default ConfiguracionScreen;
