import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const productos = [
  { id: 1, nombre: 'Reloj Inteligente', precio: 25.99, imagen: 'https://via.placeholder.com/150', rating: 4.7 },
  { id: 2, nombre: 'Auriculares', precio: 12.99, imagen: 'https://via.placeholder.com/150', rating: 4.3 },
];

export default function NavegacionPrincipal() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <FlatList
        data={productos}
        numColumns={2}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.card}
            onPress={() => navigation.navigate('Producto', item)}
          >
            <Image source={{ uri: item.imagen }} style={styles.image} />
            <Text style={styles.price}>${item.precio}</Text>
            <Text style={styles.name}>{item.nombre}</Text>
            <Text style={styles.rating}>★ {item.rating}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  card: { 
    flex: 1, 
    margin: 5, 
    padding: 10, 
    backgroundColor: 'white', 
    borderRadius: 8 
  },
  image: { width: '100%', height: 120 },
  price: { color: 'red', fontWeight: 'bold', marginTop: 5 },
  name: { marginVertical: 3 },
  rating: { color: 'orange' }
});