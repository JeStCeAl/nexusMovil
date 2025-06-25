import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  ScrollView,
  Alert
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const RegisterScreen = ({ navigation }) => {
  const [registerData, setRegisterData] = useState({
    name: '',
    username: '',
    email: '',
    phone: '',
    city: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = () => {
    setLoading(true);
    fetch('https://magicloops.dev/api/loop/da3de0ce-b613-4ae7-927c-1a02db30365e/run', {
      method: 'POST',
      body: JSON.stringify({
        mode: "register",
        ...registerData
      }),
      headers: { "Content-Type": "application/json" }
    })
      .then(r => r.json())
      .then(data => {
        setLoading(false);
        if (data.status === "success") {
          Alert.alert('¡Registro exitoso! Bienvenido a Nexus Ecommerce.');
          setRegisterData({
            name: '',
            username: '',
            email: '',
            phone: '',
            city: '',
            password: '',
          });
          navigation.navigate('Login');
        } else {
          Alert.alert('Error en registro', data.message || 'Inténtalo nuevamente.');
        }
      })
      .catch(err => {
        setLoading(false);
        Alert.alert('Error en registro', err.message);
      });
  };

  const handleChange = (name, value) => {
    setRegisterData({
      ...registerData,
      [name]: value
    });
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
            onPress={() => navigation.navigate('Register')}
          >
            <Text style={styles.tabText}>REGISTRARSE</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.form}>
          <Text style={styles.formTitle}>Únete a la Élite</Text>
          
          {[
            { icon: 'user', name: 'name', placeholder: 'Nombre' },
            { icon: 'user-circle', name: 'username', placeholder: 'Usuario' },
            { icon: 'envelope', name: 'email', placeholder: 'Email', keyboardType: 'email-address' },
            { icon: 'phone', name: 'phone', placeholder: 'Teléfono', keyboardType: 'phone-pad' },
            { icon: 'map-marker', name: 'city', placeholder: 'Ciudad' },
            { icon: 'lock', name: 'password', placeholder: 'Contraseña', secure: true },
          ].map((field, index) => (
            <View key={index} style={styles.inputContainer}>
              <FontAwesome name={field.icon} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder={field.placeholder}
                placeholderTextColor="#c0c0c0"
                value={registerData[field.name]}
                onChangeText={(text) => handleChange(field.name, text)}
                secureTextEntry={field.secure && !showPassword}
                keyboardType={field.keyboardType || 'default'}
                autoCapitalize={field.name === 'email' || field.name === 'username' ? 'none' : 'words'}
              />
              {field.secure && (
                <TouchableOpacity onPress={toggleShowPassword}>
                  <FontAwesome 
                    name={showPassword ? "eye-slash" : "eye"} 
                    style={styles.passwordIcon} 
                  />
                </TouchableOpacity>
              )}
            </View>
          ))}
          
          <TouchableOpacity 
            style={styles.submitButton}
            onPress={handleRegister}
            disabled={loading}
          >
            <Text style={styles.submitButtonText}>
              {loading ? 'PROCESANDO...' : 'REGISTRARSE'}
            </Text>
          </TouchableOpacity>
          
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
    marginBottom: 15,
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
});

export default RegisterScreen;