import React, { useState, useEffect, useCallback } from 'react';
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
import { verifyResetCode, resendResetCode } from "../../src/Services/AuthService";

const VerifyCodeScreen = ({ route, navigation }) => {
  const { email } = route.params;
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [error, setError] = useState('');
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutos en segundos
  const [isCodeExpired, setIsCodeExpired] = useState(false);

  // Función para validar el formato del código
  const isValidCode = (code) => {
    return /^\d{6}$/.test(code);
  };

  // Función para decrementar el tiempo
  const decrementTime = useCallback(() => {
    setTimeLeft(prev => {
      if (prev <= 1) {
        setIsCodeExpired(true);
        return 0;
      }
      return prev - 1;
    });
  }, []);

  // Configurar el intervalo del temporizador
  useEffect(() => {
    const timer = setInterval(decrementTime, 1000);
    return () => clearInterval(timer);
  }, [decrementTime]);

  // Formatear el tiempo como MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleVerifyCode = async () => {
    // Validación del código
    if (!code || code.length !== 6) {
      setError('Por favor ingresa un código de 6 dígitos');
      return;
    }

    if (!isValidCode(code)) {
      setError('El código debe contener solo números');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const result = await verifyResetCode(email, code);
      
      if (result.success) {
        navigation.navigate('ResetPassword', {
          email,
          resetToken: result.reset_token
        });
      } else {
        setError(result.message || "Código inválido");
      }
    } catch (error) {
      console.error("Error verifying code:", error);
      setError("Error de conexión. Intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = async () => {
    setResendLoading(true);
    setError('');
    setIsCodeExpired(false);
    
    try {
      const result = await resendResetCode(email);
      if (result.success) {
        setTimeLeft(300); // Reiniciar el temporizador a 5 minutos
        Alert.alert(
          "Código reenviado",
          "Hemos enviado un nuevo código a tu dirección de email."
        );
      } else {
        setError(result.message || "Error al reenviar el código");
      }
    } catch (error) {
      console.error("Error resending code:", error);
      setError("Ocurrió un error al reenviar el código. Por favor, inténtalo de nuevo más tarde.");
    } finally {
      setResendLoading(false);
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
          <Text style={styles.title}>Verificar Código</Text>
        </View>

        <View style={styles.form}>
          <Text style={styles.instructions}>
            Hemos enviado un código de 6 dígitos a {email}. Por favor ingrésalo a continuación.
          </Text>
          
          {error ? <Text style={styles.errorText}>{error}</Text> : null}
          
          <Text style={styles.timerText}>
            {isCodeExpired ? 'Código expirado' : `Tiempo restante: ${formatTime(timeLeft)}`}
          </Text>
          
          <View style={styles.inputContainer}>
            <FontAwesome name="lock" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Código de verificación"
              placeholderTextColor="#c0c0c0"
              value={code}
              onChangeText={setCode}
              keyboardType="number-pad"
              maxLength={6}
              editable={!isCodeExpired}
            />
          </View>
          
          <TouchableOpacity 
            style={[
              styles.submitButton, 
              (isCodeExpired || loading) && styles.disabledButton
            ]}
            onPress={handleVerifyCode}
            disabled={isCodeExpired || loading}
          >
            {loading ? (
              <ActivityIndicator color="#ffffff" />
            ) : (
              <Text style={styles.submitButtonText}>
                {isCodeExpired ? 'CÓDIGO EXPIRADO' : 'VERIFICAR CÓDIGO'}
              </Text>
            )}
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.secondaryButton}
            onPress={handleResendCode}
            disabled={resendLoading || !isCodeExpired}
          >
            {resendLoading ? (
              <ActivityIndicator color="#ffd700" />
            ) : (
              <Text style={[
                styles.secondaryButtonText,
                !isCodeExpired && styles.disabledResendText
              ]}>
                Reenviar código
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

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
  timerText: {
    fontFamily: 'Spectral-Regular',
    fontSize: 16,
    color: '#ffd700',
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
  disabledButton: {
    backgroundColor: '#5a0000',
  },
  submitButtonText: {
    fontFamily: 'Cinzel-Bold',
    fontSize: 16,
    color: '#ffffff',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  secondaryButton: {
    marginTop: 15,
    padding: 10,
    alignItems: 'center',
  },
  secondaryButtonText: {
    fontFamily: 'Spectral-Regular',
    fontSize: 14,
    color: '#ffd700',
    textDecorationLine: 'underline',
  },
  disabledResendText: {
    color: '#5a5a5a',
  },
});

export default VerifyCodeScreen;