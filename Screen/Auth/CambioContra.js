import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  ImageBackground,
  ScrollView,
  Alert,
  ActivityIndicator
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome } from '@expo/vector-icons';
import { sendPasswordResetCode } from "../../src/Services/AuthService";

const ForgotPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSendCode = async () => {
    if (!email) {
      setError('Por favor ingresa tu email');
      return;
    }
    
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Por favor ingresa un email válido');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      const result = await sendPasswordResetCode(email);
      if (result.success) {
        navigation.navigate('VerifyCode', { email });
      } else {
        setError(result.message || "Error al enviar el código de verificación");
      }
    } catch (error) {
      console.error("Error inesperado:", error);
      setError("Ocurrió un error inesperado. Por favor, inténtalo de nuevo más tarde.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ImageBackground
        source={require('../../assets/corona.png')}
        style={styles.backgroundImage}
      >
        <LinearGradient
          colors={['rgba(112, 0, 0, 0.8)', 'rgba(0, 0, 0, 0.9)']}
          style={styles.overlay}
        >
          <View style={styles.content}>
            <Text style={styles.logoText}>NEXUS ECOMMERCE</Text>
            <Text style={styles.logoSubtext}>Tesoros dignos de guerreros</Text>
          </View>
        </LinearGradient>
      </ImageBackground>

      <View style={styles.formContainer}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <FontAwesome name="arrow-left" style={styles.backIcon} />
          </TouchableOpacity>
          <Text style={styles.title}>Recuperar Contraseña</Text>
        </View>

        <View style={styles.form}>
          <Text style={styles.instructions}>
            Ingresa tu dirección de email y te enviaremos un código para restablecer tu contraseña.
          </Text>
          
          {error ? <Text style={styles.errorText}>{error}</Text> : null}
          
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
          
          <TouchableOpacity 
            style={styles.submitButton}
            onPress={handleSendCode}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#ffffff" />
            ) : (
              <Text style={styles.submitButtonText}>ENVIAR CÓDIGO</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

// Mantén los mismos estilos que ya tienes
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#121212',
  },
  backgroundImage: {
    width: '100%',
    height: 250,
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
    padding: 20,
  },
  logoText: {
    fontFamily: 'Cinzel-Bold',
    fontSize: 32,
    color: '#ffd700',
    textShadowColor: 'rgba(255, 215, 0, 0.5)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
    marginBottom: 10,
  },
  logoSubtext: {
    fontFamily: 'Spectral-Regular',
    fontSize: 16,
    color: '#c0c0c0',
    fontStyle: 'italic',
  },
  formContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: 'rgba(18,18,18,0.97)',
    borderRadius: 18,
    marginTop: -30,
    borderWidth: 2,
    borderColor: '#d30000',
    shadowColor: '#ffd700',
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  backIcon: {
    fontSize: 24,
    color: '#ffd700',
    marginRight: 15,
  },
  title: {
    fontFamily: 'Cinzel-Bold',
    fontSize: 24,
    color: '#ffd700',
    textAlign: 'center',
    flex: 1,
    marginRight: 40,
  },
  form: {
    marginTop: 10,
  },
  instructions: {
    fontFamily: 'Spectral-Regular',
    fontSize: 16,
    color: '#c0c0c0',
    marginBottom: 30,
    textAlign: 'center',
    lineHeight: 24,
  },
  errorText: {
    fontFamily: 'Spectral-Regular',
    fontSize: 14,
    color: '#ff6b6b',
    marginBottom: 15,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2a2a2a',
    borderRadius: 5,
    marginBottom: 25,
    paddingHorizontal: 15,
    borderWidth: 1.5,
    borderColor: '#2a2a2a',
  },
  inputIcon: {
    marginRight: 10,
    fontSize: 20,
    color: '#ffd700',
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
    marginTop: 10,
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
});

export default ForgotPasswordScreen;