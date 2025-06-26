import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const CardProducto = ({ item, onView, onEdit }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onView}>
      <Image source={{ uri: item.imagen }} style={styles.image} />
      
      <View style={styles.infoContainer}>
        <Text style={styles.nombre}>{item.nombre}</Text>
        <Text style={styles.precio}>${item.precio.toFixed(2)}</Text>
        
        <View style={styles.ratingContainer}>
          <Ionicons name="star" size={16} color="#FFD700" />
          <Text style={styles.rating}>{item.rating}</Text>
        </View>
      </View>
      
      <TouchableOpacity style={styles.editButton} onPress={onEdit}>
        <Ionicons name="create-outline" size={20} color="#1976D2" />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 15,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 15,
  },
  infoContainer: {
    flex: 1,
  },
  nombre: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
  },
  precio: {
    fontSize: 14,
    color: '#8b4513',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    marginLeft: 5,
    fontSize: 14,
    color: '#666',
  },
  editButton: {
    padding: 8,
  },
});

export default CardProducto;