import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  Alert, 
  ScrollView,
  ActivityIndicator
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import { resetPasswordWithCode } from '../../src/Services/AuthService';

export default function ResetPasswordScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { email, resetToken } = route.params; // Cambiamos token por resetToken para coincidir con el backend

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleReset = async () => {
    // Validaciones
    if (!password || !confirmPassword) {
      setError('Por favor completa ambos campos');
      return;
    }
    
    if (password.length < 8) {
      setError('La contraseña debe tener al menos 8 caracteres');
      return;
    }
    
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      const result = await resetPasswordWithCode(email, resetToken, password);
      
      if (result.success) {
        Alert.alert(
          'Éxito',
          'Tu contraseña ha sido restablecida correctamente',
          [{ 
            text: 'OK', 
            onPress: () => navigation.navigate('Login') 
          }]
        );
      } else {
        setError(result.message || 'Error al restablecer contraseña');
      }
    } catch (err) {
      console.error("Error al restablecer contraseña:", err);
      setError('Error inesperado, por favor intenta más tarde');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => navigation.goBack()}
        >
          <FontAwesome name="arrow-left" size={24} color="#ffd700" />
        </TouchableOpacity>
        <Text style={styles.title}>Nueva Contraseña</Text>
      </View>

      <Text style={styles.subtitle}>Para: {email}</Text>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <View style={styles.inputContainer}>
        <FontAwesome name="lock" style={styles.icon} />
        <TextInput
          placeholder="Nueva contraseña"
          placeholderTextColor="#aaa"
          secureTextEntry
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          autoCapitalize="none"
        />
      </View>

      <View style={styles.inputContainer}>
        <FontAwesome name="lock" style={styles.icon} />
        <TextInput
          placeholder="Confirmar contraseña"
          placeholderTextColor="#aaa"
          secureTextEntry
          style={styles.input}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          autoCapitalize="none"
        />
      </View>

      <TouchableOpacity 
        style={styles.button} 
        onPress={handleReset} 
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#ffffff" />
        ) : (
          <Text style={styles.buttonText}>RESTABLECER CONTRASEÑA</Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#121212',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  backButton: {
    marginRight: 15,
  },
  title: {
    fontSize: 24,
    color: '#ffd700',
    fontFamily: 'Cinzel-Bold',
    flex: 1,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#ccc',
    marginBottom: 30,
    fontFamily: 'Spectral-Regular',
    textAlign: 'center',
  },
  errorText: {
    color: '#ff6b6b',
    marginBottom: 20,
    textAlign: 'center',
    fontFamily: 'Spectral-Regular',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2a2a2a',
    borderRadius: 8,
    marginBottom: 20,
    paddingHorizontal: 15,
    borderWidth: 1.5,
    borderColor: '#444',
  },
  icon: {
    color: '#ffd700',
    fontSize: 20,
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
    color: '#e5e5e5',
    fontSize: 16,
    fontFamily: 'Spectral-Regular',
  },
  button: {
    backgroundColor: '#d30000',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#ffd700',
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 4,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Cinzel-Bold',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
});