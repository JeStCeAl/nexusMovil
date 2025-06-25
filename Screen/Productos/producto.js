import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

export default function Producto({ route }) {
  const { nombre, precio, imagen } = route.params;

  return (
    <View style={styles.container}>
      <Image source={{ uri: imagen }} style={styles.image} />
      
      <View style={styles.details}>
        <Text style={styles.price}>${precio}</Text>
        <Text style={styles.name}>{nombre}</Text>
        
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Comprar ahora</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={[styles.button, styles.cartButton]}>
          <Text style={styles.cartText}>Añadir al carrito</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  image: { width: '100%', height: 300 },
  details: { padding: 20, backgroundColor: 'white' },
  price: { fontSize: 24, color: 'red', fontWeight: 'bold' },
  name: { fontSize: 18, marginVertical: 10 },
  button: { 
    backgroundColor: 'red', 
    padding: 15, 
    borderRadius: 4, 
    marginVertical: 5 
  },
  buttonText: { color: 'white', textAlign: 'center' },
  cartButton: { backgroundColor: 'white', borderWidth: 1, borderColor: 'red' },
  cartText: { color: 'red', textAlign: 'center' }
});