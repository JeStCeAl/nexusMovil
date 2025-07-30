import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");
const CARD_WIDTH = (width - 40) / 2;

export default function ProductoComponent({
  producto,
  onPress,
  showImage = true,
  showActions = false,
  showRating = true,
}) {
  const isAvailable = producto.cantidad >= 1;
  

  return (
    <View style={[styles.card, { width: CARD_WIDTH }]}>
      {showImage && (
        <View style={styles.imageContainer}>
          {producto.imagen ? (
            <Image
              source={{ uri: producto.imagen }}
              style={styles.image}
              resizeMode="cover"
            />
          ) : (
            <View style={styles.placeholder}>
              <Text style={styles.placeholderText}>Sin imagen</Text>
            </View>
          )}
          {!isAvailable && (
            <View style={styles.soldOutBadge}>
              <Text style={styles.soldOutText}>AGOTADO</Text>
            </View>
          )}
        </View>
      )}

      <View style={styles.contentContainer}>
        <Text style={styles.name} numberOfLines={2} ellipsizeMode="tail">
          {producto.nombre}
        </Text>

        <Text style={styles.detail} numberOfLines={1} ellipsizeMode="tail">
          <Text style={styles.detail}>Info Tienda: </Text>
          {producto.material}
        </Text>
        <Text style={styles.detail} numberOfLines={1} ellipsizeMode="tail">
          <Text style={styles.detail}>Disponibles: </Text>
          {producto.cantidad}
        </Text>


        <View style={styles.priceAvailabilityContainer}>
          <Text style={styles.price}>${producto.precio}</Text>
          {!isAvailable && <Text style={styles.availabilityText}>Agotado</Text>}
        </View>

       
      </View>

      {/* Tocar toda la tarjeta para ver detalles */}
      <TouchableOpacity style={styles.fullCardPress} onPress={onPress} />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    borderRadius: 8,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: "hidden",
  },
  fullCardPress: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "transparent",
  },
  imageContainer: {
    height: CARD_WIDTH * 0.9,
    width: "100%",
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  placeholder: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ccc",
  },
  placeholderText: {
    color: "#555",
    fontSize: 12,
  },
  contentContainer: {
    padding: 10,
    minHeight: 90,
  },
  soldOutBadge: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "rgba(0,0,0,0.7)",
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 10,
  },
  soldOutText: {
    color: "white",
    fontSize: 10,
    fontWeight: "bold",
  },
  name: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
    height: 36,
  },
  detail: {
    fontSize: 12,
    color: "#666",
    marginBottom: 4,
  },
  priceAvailabilityContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  price: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#8b4513",
  },
  availabilityText: {
    fontSize: 12,
    color: "red",
    fontWeight: "bold",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 2,
  },
});
