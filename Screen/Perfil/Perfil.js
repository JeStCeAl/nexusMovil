import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  Platform,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";

const Perfil = () => {
  const [profile, setProfile] = useState({
    username: "johndoe",
    name: "John Doe",
    email: "john.doe@example.com",
    address: "123 Main St, City",
    phone: "+1 234 567 890",
    profilePhoto: "https://randomuser.me/api/portraits/men/1.jpg",
  });

  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permiso requerido",
        "Necesitamos acceso a tu galería para cambiar la foto."
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      setProfile({ ...profile, profilePhoto: result.assets[0].uri });
    }
  };

  const validateForm = () => {
    if (profile.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profile.email)) {
      Alert.alert(
        "Correo inválido",
        "Por favor ingresa un correo electrónico válido."
      );
      return false;
    }

    if (passwords.new && passwords.new !== passwords.confirm) {
      Alert.alert("Error en contraseña", "Las contraseñas no coinciden.");
      return false;
    }

    if (passwords.new && !passwords.current) {
      Alert.alert(
        "Error",
        "Debes ingresar tu contraseña actual para cambiarla."
      );
      return false;
    }

    return true;
  };

  const handleSave = () => {
    if (!validateForm()) return;

    setPasswords({ current: "", new: "", confirm: "" });
    Alert.alert("Éxito", "Tu perfil ha sido actualizado.");
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.editView}>
          <TouchableOpacity
            style={styles.avatarEditContainer}
            onPress={pickImage}
          >
            <Image
              source={{ uri: profile.profilePhoto }}
              style={styles.avatar}
            />
            <View style={styles.cameraIcon}>
              <Ionicons name="camera" size={20} color="white" />
            </View>
            <Text style={styles.changePhotoText}>Cambiar foto</Text>
          </TouchableOpacity>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Nombre completo</Text>
            <TextInput
              style={styles.input}
              value={profile.name}
              onChangeText={(name) => setProfile({ ...profile, name })}
              placeholder="Ingresa tu nombre"
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Nombre de usuario</Text>
            <TextInput
              style={styles.input}
              value={profile.username}
              onChangeText={(username) => setProfile({ ...profile, username })}
              placeholder="Ingresa tu nombre de usuario"
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Correo electrónico</Text>
            <TextInput
              style={styles.input}
              value={profile.email}
              onChangeText={(email) => setProfile({ ...profile, email })}
              placeholder="Ingresa tu correo"
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Dirección</Text>
            <TextInput
              style={styles.input}
              value={profile.address}
              onChangeText={(address) => setProfile({ ...profile, address })}
              placeholder="Ingresa tu dirección"
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Teléfono</Text>
            <TextInput
              style={styles.input}
              value={profile.phone}
              onChangeText={(phone) => setProfile({ ...profile, phone })}
              placeholder="Ingresa tu teléfono"
              keyboardType="phone-pad"
            />
          </View>

          <View style={styles.sectionDivider}>
            <Text style={styles.sectionTitle}>Cambiar contraseña</Text>
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Contraseña actual</Text>
            <TextInput
              style={styles.input}
              value={passwords.current}
              onChangeText={(current) =>
                setPasswords({ ...passwords, current })
              }
              placeholder="Ingresa tu contraseña actual"
              secureTextEntry
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Nueva contraseña</Text>
            <TextInput
              style={styles.input}
              value={passwords.new}
              onChangeText={(nw) => setPasswords({ ...passwords, new: nw })}
              placeholder="Ingresa tu nueva contraseña"
              secureTextEntry
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Confirmar contraseña</Text>
            <TextInput
              style={styles.input}
              value={passwords.confirm}
              onChangeText={(confirm) =>
                setPasswords({ ...passwords, confirm })
              }
              placeholder="Confirma tu nueva contraseña"
              secureTextEntry
            />
          </View>

          <TouchableOpacity
            style={[styles.button, styles.saveButton]}
            onPress={handleSave}
          >
            <Text style={styles.buttonText}>Guardar cambios</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9fafb",
  },
  content: {
    flex: 1,
    padding: 20,
  },
  editView: {
    marginBottom: 20,
  },
  avatarEditContainer: {
    alignItems: "center",
    marginBottom: 24,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: "#e5e7eb",
  },
  cameraIcon: {
    position: "absolute",
    right: 10,
    bottom: 30,
    backgroundColor: "#3b82f6",
    borderRadius: 15,
    padding: 6,
  },
  changePhotoText: {
    color: "#3b82f6",
    marginTop: 8,
    fontWeight: "500",
  },
  formGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    color: "#4b5563",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 14,
    fontSize: 16,
    color: "#111827",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
      },
      android: {
        elevation: 1,
      },
    }),
  },
  button: {
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "white",
  },
  saveButton: {
    backgroundColor: "#3b82f6",
    marginTop: 8,
  },
  sectionDivider: {
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
    marginVertical: 24,
    paddingBottom: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
  },
});

export default Perfil;
