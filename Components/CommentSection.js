import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import api from "../src/Services/conexion"; // ← asegúrate que este es tu Axios instance

export default function CommentSection({ productoId, onSubmitComment }) {
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);

  const handleSend = async () => {
    if (!comment.trim() || rating === 0) return;

    const comentarioData = {
      texto: comment,
      calificacion: rating,
      fecha: new Date().toISOString().split("T")[0],
      producto_id: productoId, // ✅ directo desde props
    };

    try {
      const response = await api.post("/comentario", comentarioData);
      onSubmitComment?.(response.data);
      setComment("");
      setRating(0);
    } catch (error) {
      console.error("Error al crear comentario:", error.response?.data || error.message);
      Alert.alert("Error", "No se pudo enviar tu comentario.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Deja tu reseña</Text>

      <View style={styles.starsRow}>
        {Array.from({ length: 5 }).map((_, index) => (
          <TouchableOpacity key={index} onPress={() => setRating(index + 1)}>
            <Ionicons
              name={index < rating ? "star" : "star-outline"}
              size={28}
              color="#FFD700"
            />
          </TouchableOpacity>
        ))}
      </View>

      <TextInput
        style={styles.input}
        placeholder="Escribe tu comentario..."
        value={comment}
        onChangeText={setComment}
        multiline
      />

      <TouchableOpacity style={styles.button} onPress={handleSend}>
        <Text style={styles.buttonText}>Enviar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    padding: 16,
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "500",
    marginBottom: 10,
    color: "#333",
  },
  starsRow: {
    flexDirection: "row",
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    backgroundColor: "#fff",
    minHeight: 60,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#8b4513",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
