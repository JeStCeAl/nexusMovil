import React from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const ProductoDetalle = ({ route, navigation }) => {
  const { producto } = route.params;

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: producto.imagen }} style={styles.mainImage} />

      <View style={styles.detailsContainer}>
        <Text style={styles.productName}>{producto.nombre}</Text>

        <View style={styles.priceRatingContainer}>
          <Text style={styles.price}>${producto.precio.toFixed(2)}</Text>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={20} color="#FFD700" />
            <Text style={styles.rating}>{producto.rating}</Text>
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
    marginLeft: 5,
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
    opacity: 1,
  },
  buyButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});
export default ProductoDetalle;
