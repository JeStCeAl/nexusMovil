import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  Platform,
  Dimensions,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome } from "@expo/vector-icons";
import { loginUser } from "../../src/Services/AuthService"; // Importa la función de login desde tu servicio
import { MaterialIcons } from "@expo/vector-icons";


const { width, height } = Dimensions.get("window");

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const validateFields = () => {
    const newErrors = {
      email: !email
        ? "El email es requerido"
        : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
        ? "Email inválido"
        : "",
      password: !password ? "La contraseña es requerida" : "",
    };

    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error !== "");
  };

  const handleLogin = async () => {
    if (!validateFields()) return;

    setLoading(true);

    try {
      const result = await loginUser(email, password);
      if (result.success) {
        Alert.alert("Éxito", "Inicio de sesión exitoso");
      } else {
        Alert.alert(
          "Error de Login",
          result.message ||
            "Credenciales incorrectas. Por favor, inténtalo de nuevo."
        );
      }
    } catch (error) {
      console.error("Error inesperado al iniciar sesión:", error);
      Alert.alert(
        "Error",
        "Ocurrió un error inesperado. Por favor, inténtalo de nuevo más tarde."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ImageBackground
        source={require("../../assets/corona.png")}
        style={styles.backgroundImage}
      >
        <LinearGradient
          colors={["rgba(112, 0, 0, 0.8)", "rgba(0, 0, 0, 0.9)"]}
          style={styles.overlay}
        >
          <View style={styles.content}>
            <Text style={styles.logoText}>NEXUS ECOMMERCE</Text>
            <Text style={styles.logoSubtext}>Tesoros dignos de guerreros</Text>
          </View>
        </LinearGradient>
      </ImageBackground>

      <View style={styles.formContainer}>
        <View style={styles.tabs}>
          <TouchableOpacity
            style={[styles.tab, styles.activeTab]}
            onPress={handleLogin}
          >
            <Text style={styles.tabText}>INGRESAR</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.tab}
            onPress={() => navigation.navigate("Register")}
          >
            <Text style={styles.tabText}>REGISTRARSE</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.form}>
          <Text style={styles.formTitle}>Login</Text>

          <View style={styles.inputContainer}>
            <FontAwesome name="envelope" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#c0c0c0"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputContainer}>
            <FontAwesome name="lock" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Contraseña"
              placeholderTextColor="#c0c0c0"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
            />

            <TouchableOpacity
              style={styles.passwordToggle}
              onPress={() => setShowPassword(!showPassword)}
            >
              <MaterialIcons
                name={showPassword ? "visibility" : "visibility-off"}
                size={20}
                color="#7f8c8d"
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.submitButton}
            onPress={handleLogin}
            disabled={loading}
          >
            <Text style={styles.submitButtonText}>
              {loading ? "PROCESANDO..." : "INGRESAR"}
            </Text>
          </TouchableOpacity>

          <View style={styles.footer}>
            <Text style={styles.footerText}>¿Olvidaste tu contraseña? </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("CambioContra")}
            >
              <Text style={styles.footerLink}>Recupérala aquí</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#121212",
  },
  backgroundImage: {
    width: "100%",
    height: height * 0.4,
  },
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    alignItems: "center",
    padding: 20,
  },
  logoText: {
    fontFamily: "Cinzel-Bold",
    fontSize: 32,
    color: "#ffd700",
    textShadowColor: "rgba(255, 215, 0, 0.5)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
    marginBottom: 10,
  },
  logoSubtext: {
    fontFamily: "Spectral-Regular",
    fontSize: 16,
    color: "#c0c0c0",
    fontStyle: "italic",
  },
  formContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: "rgba(18,18,18,0.97)",
    borderRadius: 18,
    marginTop: -30,
    borderWidth: 2,
    borderColor: "#d30000",
    shadowColor: "#ffd700",
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
  tabs: {
    flexDirection: "row",
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#2a2a2a",
  },
  tab: {
    flex: 1,
    paddingVertical: 15,
    alignItems: "center",
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: "#ffd700",
  },
  tabText: {
    fontFamily: "Cinzel-Bold",
    fontSize: 16,
    color: "#ffd700",
    textTransform: "uppercase",
  },
  form: {
    marginTop: 20,
  },
  formTitle: {
    fontFamily: "Cinzel-Bold",
    fontSize: 24,
    color: "#ffd700",
    marginBottom: 30,
    textAlign: "center",
    letterSpacing: 2,
    textShadowColor: "rgba(255, 215, 0, 0.3)",
    textShadowRadius: 8,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2a2a2a",
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 15,
    borderWidth: 1.5,
    borderColor: "#2a2a2a",
  },
  inputIcon: {
    marginRight: 10,
    fontSize: 20,
    color: "#ffd700",
  },
  passwordIcon: {
    fontSize: 20,
    color: "#c0c0c0",
    marginLeft: 10,
  },
  input: {
    flex: 1,
    height: 50,
    color: "#e5e5e5",
    fontFamily: "Spectral-Regular",
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: "#d30000",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
    shadowColor: "#ffd700",
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 2,
  },
  submitButtonText: {
    fontFamily: "Cinzel-Bold",
    fontSize: 16,
    color: "#ffffff",
    letterSpacing: 1,
    textTransform: "uppercase",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  footerText: {
    fontFamily: "Spectral-Regular",
    fontSize: 14,
    color: "#c0c0c0",
  },
  footerLink: {
    fontFamily: "Spectral-Regular",
    fontSize: 14,
    color: "#ffd700",
    textDecorationLine: "underline",
  },
  socialLogin: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 18,
    gap: 12,
  },
  socialBtn: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#2a2a2a",
  },
  socialIcon: {
    fontSize: 22,
    color: "#e5e5e5",
  },
  google: {
    backgroundColor: "#DB4437",
  },
  facebook: {
    backgroundColor: "#4267B2",
  },
  twitter: {
    backgroundColor: "#1DA1F2",
  },
});

export default LoginScreen;
