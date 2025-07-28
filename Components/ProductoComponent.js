import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 40) / 2;

export default function ProductoComponent({ 
  producto, 
  onPress, // Esta función solo navega a detalles
  showImage = true,
  showActions = false,
  showRating = true
}) {
  const isAvailable = producto.cantidad >= 1;

  return (
    <View style={[styles.card, { width: CARD_WIDTH }]}>
      {showImage && (
        <View style={styles.imageContainer}>
          <Image 
            source={{ uri: producto.imagen }} 
            style={[
              styles.image,
              !isAvailable && styles.disabledImage // Estilo para imagen de producto agotado
            ]} 
            resizeMode="cover"
          />
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
          {producto.material}
        </Text>
        
        <View style={styles.priceAvailabilityContainer}>
          <Text style={styles.price}>${producto.precio}</Text>
          {!isAvailable && (
            <Text style={styles.availabilityText}>Agotado</Text>
          )}
        </View>
        
        {showRating && (
          <View style={styles.ratingContainer}>
            {Array.from({ length: 5 }).map((_, index) => (
              <Ionicons
                key={index}
                name={
                  index < Math.floor(producto.rating)
                    ? "star"
                    : index < producto.rating
                    ? "star-half"
                    : "star-outline"
                }
                size={14}
                color="#FFD700"
              />
            ))}
            {/* <Text style={styles.ratingText}>{producto.rating.toFixed(1)}</Text> */}
          </View>
        )}
      </View>

      {/* Permitir siempre tocar para ver detalles, pero deshabilitado visualmente si está agotado */}
      <TouchableOpacity 
        style={styles.fullCardPress}
        onPress={onPress}
      />
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
    overflow: 'hidden',
  },
  fullCardPress: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'transparent'
  },
  imageContainer: {
    height: CARD_WIDTH * 0.9,
    width: '100%',
    backgroundColor: '#f5f5f5'
  },
  image: {
    width: '100%',
    height: '100%',
  },
  disabledImage: {
    opacity: 0.7,
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
    fontWeight: 'bold',
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 2,
  },
  ratingText: {
    fontSize: 12,
    marginLeft: 4,
    color: "#888",
  },
});