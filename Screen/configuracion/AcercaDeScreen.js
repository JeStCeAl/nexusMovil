import React from "react";
import { View, Text, StyleSheet, ScrollView, Image, Linking, TouchableOpacity } from "react-native";
import { Ionicons, MaterialIcons, FontAwesome } from "@expo/vector-icons";

const AcercaDeScreen = () => {
  const openWebsite = () => {
    Linking.openURL("https://www.tudominio.com").catch(err => console.error("Error al abrir el enlace:", err));
  };

  const openSocialMedia = (platform) => {
    let url = "";
    switch(platform) {
      case "facebook":
        url = "https://facebook.com/tuempresa";
        break;
      case "twitter":
        url = "https://twitter.com/tuempresa";
        break;
      case "instagram":
        url = "https://instagram.com/tuempresa";
        break;
      default:
        url = "https://www.tudominio.com";
    }
    Linking.openURL(url).catch(err => console.error("Error al abrir el enlace:", err));
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {/* Logo de la aplicación */}
      <View style={styles.logoContainer}>
        <Image
          source={require('../../assets/corona.png')} // Reemplaza con la ruta de tu logo
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      {/* Título y descripción */}
      <Text style={styles.title}>Acerca de nuestra App</Text>
      <Text style={styles.subtitle}>La mejor solución para tus necesidades</Text>
      
      <View style={styles.card}>
        <Text style={styles.cardText}>
          Esta aplicación fue creada con el objetivo de ofrecer una experiencia intuitiva y eficiente para nuestros usuarios.
          Estamos comprometidos con la innovación y la satisfacción de quienes confían en nosotros.
        </Text>
      </View>

      {/* Información de versión */}
      <View style={styles.infoContainer}>
        <Ionicons name="information-circle" size={24} color="#3498db" />
        <Text style={styles.infoText}>Versión: 1.0.0</Text>
      </View>

      {/* Desarrollador */}
      <View style={styles.infoContainer}>
        <Ionicons name="code" size={24} color="#3498db" />
        <Text style={styles.infoText}>Desarrollado por: Movimiento Espinoza. Web</Text>
      </View>

      {/* Año de desarrollo */}
      <View style={styles.infoContainer}>
        <MaterialIcons name="copyright" size={24} color="#3498db" />
        <Text style={styles.infoText}>© {new Date().getFullYear()} Todos los derechos reservados</Text>
      </View>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f7fa",
  },
  contentContainer: {
    padding: 25,
    alignItems: "center",
  },
  logoContainer: {
    marginBottom: 20,
    alignItems: "center",
  },
  logo: {
    width: 120,
    height: 120,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#2c3e50",
    marginBottom: 5,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#7f8c8d",
    marginBottom: 25,
    textAlign: "center",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    marginBottom: 25,
    width: "100%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  cardText: {
    fontSize: 16,
    color: "#555",
    lineHeight: 24,
    textAlign: "center",
  },
  infoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    width: "100%",
    paddingHorizontal: 10,
  },
  infoText: {
    fontSize: 15,
    color: "#555",
    marginLeft: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#2c3e50",
    marginTop: 20,
    marginBottom: 15,
  },
  socialContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 25,
  },
  socialButton: {
    marginHorizontal: 15,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 50,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
  },
  websiteButton: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 25,
  },
  websiteText: {
    fontSize: 16,
    color: "#3498db",
    fontWeight: "500",
    marginRight: 5,
  },
  legalContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  legalText: {
    fontSize: 14,
    color: "#7f8c8d",
  },
  legalSeparator: {
    fontSize: 14,
    color: "#ddd",
    marginHorizontal: 10,
  },
});

export default AcercaDeScreen;