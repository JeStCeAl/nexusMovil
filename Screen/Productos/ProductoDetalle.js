import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import CommentSection from "../../Components/CommentSection";
import CommentList from "../../Components/CommentList";
import { useState, useEffect } from "react";
import api from "../../src/Services/conexion"; // asegúrate que este path sea correcto

const ProductoDetalle = ({ route, navigation }) => {
  const { producto } = route.params;

  const [comments, setComments] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [isAvailable, setIsAvailable] = useState(producto.cantidad >= 1);

  // Fetch de comentarios por producto al cargar
useEffect(() => {
  const fetchComments = async () => {
    try {
      const response = await api.get("/comentarios", {
        params: { producto_id: producto.id },
      });
      const fetchedComments = response.data;
      setComments(fetchedComments);

      // Calcular promedio si hay comentarios
      if (fetchedComments.length > 0) {
        const total = fetchedComments.reduce((acc, c) => acc + c.calificacion, 0);
        const avg = total / fetchedComments.length;
        setAverageRating(avg);
      } else {
        setAverageRating(0); // Sin comentarios
      }
    } catch (error) {
      console.error("Error al obtener comentarios:", error.response?.data || error.message);
    }
  };

  fetchComments();
}, [producto.id]);



  // Cuando se agrega un nuevo comentario
  const handleSubmitComment = (newComment) => {
    const updatedComments = [...comments, newComment];
    setComments(updatedComments);

    const total = updatedComments.reduce((acc, c) => acc + c.calificacion, 0);
    const avg = total / updatedComments.length;
    setAverageRating(avg);

    navigation.setParams({
      producto: { ...producto, rating: avg },
    });
  };

  useEffect(() => {
    setIsAvailable(producto.cantidad >= 1);
  }, [producto.cantidad]);

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: producto.imagen }} style={styles.mainImage} />

      <View style={styles.detailsContainer}>
        <Text style={styles.productName}>{producto.nombre}</Text>

        <View style={styles.priceRatingContainer}>
          <Text style={styles.price}>${producto.precio}</Text>
          <View style={styles.ratingContainer}>
            {Array.from({ length: 5 }).map((_, index) => (
              <Ionicons
                key={index}
                name={
                  index < Math.floor(averageRating)
                    ? "star"
                    : index < averageRating
                    ? "star-half"
                    : "star-outline"
                }
                size={20}
                color="#FFD700"
              />
            ))}
          </View>
        </View>

        <Text style={styles.sectionTitle}>Info Tienda</Text>
        <Text style={styles.material}>{producto.material}</Text>

        <Text style={styles.sectionTitle}>Descripción</Text>
        <Text style={styles.material}>{producto.descripcion}</Text>

        <Text style={styles.sectionTitle}>Peso</Text>
        <Text style={styles.material}>{producto.peso} kg</Text>

        <Text style={styles.sectionTitle}>Dimensiones</Text>
        <Text style={styles.material}>{producto.dimensiones}</Text>

        <Text style={styles.sectionTitle}>Unidades Disponibles</Text>
        <Text style={styles.material}>{producto.cantidad}</Text>

        <Text style={styles.sectionTitle}>Disponibilidad</Text>
        <Text
          style={[
            styles.availability,
            isAvailable ? styles.available : styles.notAvailable,
          ]}
        >
          {isAvailable ? "Disponible" : "Agotado"}
        </Text>

        <TouchableOpacity
          style={[styles.buyButton, !isAvailable && styles.disabledButton]}
          onPress={() =>
            navigation.navigate("carrito", {
              screen: "Carro",
              params: { producto },
            })
          }
          disabled={!isAvailable}
        >
          <Text style={styles.buyButtonText}>
            {isAvailable ? "Comprar" : "Agotado"}
          </Text>
        </TouchableOpacity>
      </View>

      <CommentSection
        productoId={producto.id}
        onSubmitComment={handleSubmitComment}
      />

      <CommentList comments={comments} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  mainImage: {
    width: "100%",
    height: 350,
    resizeMode: "cover",
  },
  detailsContainer: {
    padding: 20,
  },
  productName: {
    fontSize: 24,
    fontWeight: "300",
    marginBottom: 10,
    color: "#333",
  },
  priceRatingContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  price: {
    fontSize: 22,
    fontWeight: "600",
    color: "#8b4513",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 15,
    marginBottom: 5,
    color: "#333",
  },
  material: {
    fontSize: 16,
    color: "#666",
  },
  availability: {
    fontSize: 15,
    fontWeight: "500",
    marginBottom: 10,
  },
  available: {
    color: "green",
  },
  notAvailable: {
    color: "red",
  },
  buyButton: {
    backgroundColor: "#8b4513",
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 20,
    alignItems: "center",
  },
  disabledButton: {
    backgroundColor: "#cccccc",
  },
  buyButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});

export default ProductoDetalle;
