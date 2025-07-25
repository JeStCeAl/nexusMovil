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

const ProductoDetalle = ({ route, navigation }) => {
  const { producto } = route.params;

  const [comments, setComments] = useState([]);
  const [averageRating, setAverageRating] = useState(producto.rating);

  const handleSubmitComment = (newComment) => {
    const updatedComments = [...comments, newComment];
    setComments(updatedComments);

    const total = updatedComments.reduce((acc, c) => acc + c.rating, 0);
    const avg = total / updatedComments.length;

    setAverageRating(avg);

    // Actualizamos el producto con el nuevo rating para enviarlo de vuelta a la lista
    navigation.setParams({
      producto: { ...producto, rating: avg },
    });
  };

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: producto.imagen }} style={styles.mainImage} />

      <View style={styles.detailsContainer}>
        <Text style={styles.productName}>{producto.nombre}</Text>

        <View style={styles.priceRatingContainer}>
          <Text style={styles.price}>${producto.precio.toFixed(2)}</Text>
          <View style={styles.ratingContainer}>
            {/* Pintamos estrellas dinámicas según el promedio */}
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
            <Text style={styles.rating}>
              {averageRating.toFixed(1)}
            </Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Material</Text>
        <Text style={styles.material}>{producto.material}</Text>

        <Text style={styles.sectionTitle}>Disponibilidad</Text>
        <Text
          style={[
            styles.availability,
            producto.disponible ? styles.available : styles.notAvailable,
          ]}
        >
          {producto.disponible ? "Disponible" : "Agotado"}
        </Text>

        <TouchableOpacity
          style={styles.buyButton}
          onPress={() =>
            navigation.navigate("carrito", {
              screen: "Carro",
              params: { producto },
            })
          }
          disabled={!producto.disponible}
        >
          <Text style={styles.buyButtonText}>Comprar</Text>
        </TouchableOpacity>
      </View>

      <CommentSection onSubmitComment={handleSubmitComment} />
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
  rating: {
    fontSize: 16,
    marginLeft: 8,
    color: "#888",
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
  buyButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});

export default ProductoDetalle;
