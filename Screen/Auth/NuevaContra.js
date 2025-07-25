import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  Alert, 
  ScrollView 
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import { resetPassword } from '../../src/Services/AuthService';

export default function ResetPasswordScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { token, email } = route.params; // Token y email desde el deep link

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleReset = async () => {
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
      const result = await resetPassword(email, token, password);
      if (result.success) {
        Alert.alert(
          'Éxito',
          'Tu contraseña ha sido restablecida correctamente',
          [{ text: 'OK', onPress: () => navigation.navigate('Login') }]
        );
      } else {
        setError(result.message || 'Error al restablecer contraseña');
      }
    } catch (err) {
      setError('Error inesperado, por favor intenta más tarde');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Restablecer Contraseña</Text>
      <Text style={styles.subtitle}>Email: {email}</Text>

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
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleReset} disabled={loading}>
        <Text style={styles.buttonText}>{loading ? 'Procesando...' : 'Restablecer'}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212',
    padding: 20,
  },
  title: {
    fontSize: 28,
    color: '#ffd700',
    marginBottom: 10,
    fontFamily: 'Cinzel-Bold',
  },
  subtitle: {
    fontSize: 16,
    color: '#ccc',
    marginBottom: 30,
    fontFamily: 'Spectral-Regular',
  },
  errorText: {
    color: '#ff6b6b',
    marginBottom: 20,
    textAlign: 'center',
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
    width: '100%',
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
    width: '100%',
    shadowColor: '#ffd700',
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 4,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Cinzel-Bold',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
});
