import React, { useState, useEffect } from "react";
import { 
  View, 
  Text, 
  FlatList, 
  StyleSheet, 
  ActivityIndicator,
  TouchableOpacity
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import ProductoComponent from "../../Components/ProductoComponent";
import { listarProductos } from "../../src/Services/ProductoService";

export default function ListarProductosScreen() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const route = useRoute();

  const fetchProductos = async () => {
    setLoading(true);
    try {
      const response = await listarProductos();
      if (response.success) {
        setProductos(response.data);
      } else {
        console.error("Error al cargar productos:", response.message);
      }
    } catch (error) {
      console.error("Error al cargar productos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", fetchProductos);
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    if (route.params?.producto) {
      const actualizado = route.params.producto;
      setProductos(prev => 
        prev.map(p => p.id === actualizado.id ? actualizado : p)
      );
    }
  }, [route.params?.producto]);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#1976D2" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Colección Exclusiva</Text>
        <Ionicons name="search" size={24} color="#333" />
      </View>

      {productos.length > 0 ? (
        <FlatList
          data={productos}
          renderItem={({ item }) => (
            <ProductoComponent
              producto={item}
              onPress={() => navigation.navigate("ProductoDetalle", { producto: item })}
            />
          )}
          // keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          contentContainerStyle={styles.listContent}
          columnWrapperStyle={styles.columnWrapper}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text>No hay productos disponibles</Text>
        </View>
      )}
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
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});