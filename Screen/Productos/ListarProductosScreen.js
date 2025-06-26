import React from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const productosJoyeria = [
  {
    id: 1,
    nombre: "Collar de Diamantes",
    precio: 1250.99,
    imagen: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
    rating: 4.9,
    material: "Oro 18k",
    disponible: true,
  },
  {
    id: 2,
    nombre: "Anillo Esmeralda",
    precio: 899.99,
    imagen: "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=735&q=80",
    rating: 4.7,
    material: "Platino",
    disponible: true,
  },
  {
    id: 3,
    nombre: "Pendientes Perlas",
    precio: 450.5,
    imagen: "https://images.unsplash.com/photo-1611591437281-4608be122683?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
    rating: 4.5,
    material: "Plata esterlina",
    disponible: true,
  },
  {
    id: 4,
    nombre: "Pulsera Rubí",
    precio: 780.0,
    imagen: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    rating: 4.8,
    material: "Oro rosa",
    disponible: false,
  },
];

export default function ListarProductosScreen() {
  const navigation = useNavigation();

  const renderProductItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('ProductoDetalle', { producto: item })}
    >
      <View style={styles.imageContainer}>
        <Image source={{ uri: item.imagen }} style={styles.image} />
        {!item.disponible && (
          <View style={styles.soldOutBadge}>
            <Text style={styles.soldOutText}>AGOTADO</Text>
          </View>
        )}
      </View>

      <View style={styles.detailsContainer}>
        <Text style={styles.name} numberOfLines={1}>{item.nombre}</Text>
        <Text style={styles.material}>{item.material}</Text>

        <View style={styles.priceRatingContainer}>
          <Text style={styles.price}>${item.precio.toFixed(2)}</Text>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={16} color="#FFD700" />
            <Text style={styles.rating}>{item.rating}</Text>
          </View>
        </View>

        {item.disponible && (
          <View style={styles.wishlistIcon}>
            <Ionicons name="heart-outline" size={20} color="#c0c0c0" />
          </View>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Colección Exclusiva</Text>
        <Ionicons name="search" size={24} color="#333" />
      </View>

      <FlatList
        data={productosJoyeria}
        renderItem={renderProductItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.listContent}
        columnWrapperStyle={styles.columnWrapper}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f5f2",
    paddingHorizontal: 12,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 5,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "300",
    letterSpacing: 1,
    color: "#333",
  },
  listContent: {
    paddingBottom: 20,
  },
  columnWrapper: {
    justifyContent: "space-between",
  },
  card: {
    width: "48%",
    backgroundColor: "white",
    borderRadius: 12,
    marginBottom: 15,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  imageContainer: {
    position: "relative",
  },
  image: {
    width: "100%",
    height: 180,
    resizeMode: "cover",
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
  detailsContainer: {
    padding: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
    marginBottom: 4,
  },
  material: {
    fontSize: 12,
    color: "#888",
    marginBottom: 8,
  },
  priceRatingContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  price: {
    fontSize: 16,
    fontWeight: "600",
    color: "#8b4513",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  rating: {
    fontSize: 14,
    marginLeft: 4,
    color: "#888",
  },
  wishlistIcon: {
    position: "absolute",
    top: -30,
    right: 10,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
});