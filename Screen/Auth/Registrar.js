import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  ScrollView,
  Alert,
  ActivityIndicator
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { registerUser } from "../../src/Services/AuthService"; // Importa la función de registro desde tu servicio

const RegisterScreen = ({ navigation }) => {
  const [nombre, setNombre] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [direccion, setDireccion] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({
    nombre: "",
    username: "",
    email: "",
    telefono: "",
    direccion: "",
    password: ""
  });

  const validateFields = () => {
    const newErrors = {
      nombre: !nombre ? "El nombre es requerido" : "",
      username: !username ? "El nombre de usuario es requerido" : "",
      email: !email ? "El email es requerido" : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? "Email inválido" : "",
      telefono: !telefono ? "El teléfono es requerido" : "",
      direccion: !direccion ? "La dirección es requerida" : "",
      password: !password ? "La contraseña es requerida" : password.length < 8 ? "Mínimo 8 caracteres" : ""
    };
    
    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error !== "");
  };

  const handleRegister = async () => {
    if (!validateFields()) return;

    setLoading(true);

    try {
      const result = await registerUser(nombre, direccion, telefono, username, email, password);
      
      if (result.success) {
        Alert.alert("Éxito", "Registro de usuario exitoso", [
          {
            text: "OK",
            onPress: () => navigation.navigate("Login")
          },
        ]);
      } else {
        // Manejo de errores del backend
        if (result.error?.errors) {
          const backendErrors = {};
          Object.keys(result.error.errors).forEach(key => {
            backendErrors[key] = result.error.errors[key].join(', ');
          });
          setErrors(prev => ({...prev, ...backendErrors}));
        }
        
        Alert.alert(
          "Error de Registro",
          result.error?.message || "Ocurrió un error al registrar el usuario."
        );
      }
    } catch (error) {
      console.error("Error inesperado al registrar usuario:", error);
      Alert.alert(
        "Error",
        "Ocurrió un error inesperado. Por favor, inténtalo de nuevo más tarde."
      );
    } finally {
      setLoading(false);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.formContainer}>
        <View style={styles.tabs}>
          <TouchableOpacity 
            style={styles.tab}
            onPress={() => navigation.navigate('Login')}
          >
            <Text style={styles.tabText}>INGRESAR</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tab, styles.activeTab]}
          >
            <Text style={styles.tabText}>REGISTRARSE</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.form}>
          <Text style={styles.formTitle}>Únete a la Élite</Text>
          
          {/* Nombre */}
          <View style={styles.inputContainer}>
            <FontAwesome name="user" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Nombre"
              placeholderTextColor="#c0c0c0"
              value={nombre}
              onChangeText={(text) => {
                setNombre(text);
                setErrors(prev => ({...prev, nombre: ""}));
              }}
              autoCapitalize="words"
            />
          </View>
          {errors.nombre ? <Text style={styles.errorText}>{errors.nombre}</Text> : null}

          {/* Username */}
          <View style={styles.inputContainer}>
            <FontAwesome name="user-circle" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Usuario"
              placeholderTextColor="#c0c0c0"
              value={username}
              onChangeText={(text) => {
                setUsername(text);
                setErrors(prev => ({...prev, username: ""}));
              }}
              autoCapitalize="none"
            />
          </View>
          {errors.username ? <Text style={styles.errorText}>{errors.username}</Text> : null}

          {/* Email */}
          <View style={styles.inputContainer}>
            <FontAwesome name="envelope" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#c0c0c0"
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                setErrors(prev => ({...prev, email: ""}));
              }}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
          {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}

          {/* Teléfono */}
          <View style={styles.inputContainer}>
            <FontAwesome name="phone" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Teléfono"
              placeholderTextColor="#c0c0c0"
              value={telefono}
              onChangeText={(text) => {
                setTelefono(text);
                setErrors(prev => ({...prev, telefono: ""}));
              }}
              keyboardType="phone-pad"
            />
          </View>
          {errors.telefono ? <Text style={styles.errorText}>{errors.telefono}</Text> : null}

          {/* Dirección */}
          <View style={styles.inputContainer}>
            <FontAwesome name="map-marker" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Dirección"
              placeholderTextColor="#c0c0c0"
              value={direccion}
              onChangeText={(text) => {
                setDireccion(text);
                setErrors(prev => ({...prev, direccion: ""}));
              }}
            />
          </View>
          {errors.direccion ? <Text style={styles.errorText}>{errors.direccion}</Text> : null}

          {/* Contraseña */}
          <View style={styles.inputContainer}>
            <FontAwesome name="lock" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Contraseña"
              placeholderTextColor="#c0c0c0"
              value={password}
              onChangeText={(text) => {
                setPassword(text);
                setErrors(prev => ({...prev, password: ""}));
              }}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity onPress={toggleShowPassword}>
              <FontAwesome 
                name={showPassword ? "eye-slash" : "eye"} 
                style={styles.passwordIcon} 
              />
            </TouchableOpacity>
          </View>
          {errors.password ? <Text style={styles.errorText}>{errors.password}</Text> : null}
          
          {loading ? (
            <ActivityIndicator size="large" color="#ffd700" style={styles.loader} />
          ) : (
            <TouchableOpacity 
              style={styles.submitButton}
              onPress={handleRegister}
              disabled={loading}
            >
              <Text style={styles.submitButtonText}>
                REGISTRARSE
              </Text>
            </TouchableOpacity>
          )}
          
          <View style={styles.footer}>
            <Text style={styles.footerText}>¿Ya tienes una cuenta? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.footerLink}>Ingresa aquí</Text>
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
    backgroundColor: '#121212',
    paddingTop: 40,
  },
  formContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: 'rgba(18,18,18,0.97)',
    borderRadius: 18,
    borderWidth: 2,
    borderColor: '#d30000',
    shadowColor: '#ffd700',
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
    margin: 20,
  },
  tabs: {
    flexDirection: 'row',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#2a2a2a',
  },
  tab: {
    flex: 1,
    paddingVertical: 15,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#ffd700',
  },
  tabText: {
    fontFamily: 'Cinzel-Bold',
    fontSize: 16,
    color: '#ffd700',
    textTransform: 'uppercase',
  },
  form: {
    marginTop: 20,
  },
  formTitle: {
    fontFamily: 'Cinzel-Bold',
    fontSize: 24,
    color: '#ffd700',
    marginBottom: 30,
    textAlign: 'center',
    letterSpacing: 2,
    textShadowColor: 'rgba(255, 215, 0, 0.3)',
    textShadowRadius: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2a2a2a',
    borderRadius: 5,
    marginBottom: 5,
    paddingHorizontal: 15,
    borderWidth: 1.5,
    borderColor: '#2a2a2a',
  },
  inputIcon: {
    marginRight: 10,
    fontSize: 20,
    color: '#ffd700',
  },
  passwordIcon: {
    fontSize: 20,
    color: '#c0c0c0',
    marginLeft: 10,
  },
  input: {
    flex: 1,
    height: 50,
    color: '#e5e5e5',
    fontFamily: 'Spectral-Regular',
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: '#d30000',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#ffd700',
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 2,
  },
  submitButtonText: {
    fontFamily: 'Cinzel-Bold',
    fontSize: 16,
    color: '#ffffff',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  footerText: {
    fontFamily: 'Spectral-Regular',
    fontSize: 14,
    color: '#c0c0c0',
  },
  footerLink: {
    fontFamily: 'Spectral-Regular',
    fontSize: 14,
    color: '#ffd700',
    textDecorationLine: 'underline',
  },
  errorText: {
    color: '#ff6b6b',
    fontSize: 12,
    marginBottom: 10,
    marginLeft: 10,
    fontFamily: 'Spectral-Regular',
  },
  loader: {
    marginVertical: 20,
  },
});

export default RegisterScreen;