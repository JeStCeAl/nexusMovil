import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  TextInput,
  Alert,
  RefreshControl,
  ImageBackground,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import ProductoComponent from "../../Components/ProductoComponent";
import { listarProductos } from "../../src/Services/ProductoService";

export default function ListarProductosScreen() {
  const [productos, setProductos] = useState([]);
  const [filteredProductos, setFilteredProductos] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();
  const route = useRoute();

  const fetchProductos = async () => {
    try {
      setError(null);
      const response = await listarProductos();

      if (response.success) {
        setProductos(response.data);
        setFilteredProductos(response.data);
      } else {
        throw new Error(response.message || "Error al cargar productos");
      }
    } catch (error) {
      console.error("Error al cargar productos:", error);
      setError(error.message || "No se pudo conectar al servidor. Verifica tu conexión.");

      if (productos.length === 0) {
        Alert.alert(
          "Error de conexión",
          "No se pudo cargar la lista de productos. Verifica tu conexión a internet.",
          [
            {
              text: "Reintentar",
              onPress: () => fetchProductos(),
            },
          ]
        );
      }
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchProductos();
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", fetchProductos);
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    if (route.params?.producto) {
      const actualizado = route.params.producto;
      setProductos((prev) =>
        prev.map((p) => (p.id === actualizado.id ? actualizado : p))
      );
      setFilteredProductos((prev) =>
        prev.map((p) => (p.id === actualizado.id ? actualizado : p))
      );
    }
  }, [route.params?.producto]);

  const handleSearch = (text) => {
    setSearchText(text);
    if (text) {
      const filtered = productos.filter(
        (producto) =>
          producto.nombre.toLowerCase().includes(text.toLowerCase()) ||
          (producto.descripcion &&
            producto.descripcion.toLowerCase().includes(text.toLowerCase()))
      );
      setFilteredProductos(filtered);
    } else {
      setFilteredProductos(productos);
    }
  };

  if (loading && productos.length === 0) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#D4AF37" />
      </View>
    );
  }

  if (error && productos.length === 0) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={fetchProductos}>
          <Text style={styles.retryButtonText}>Reintentar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ImageBackground
      source={require("../../assets/img.jpg")} // Asegúrate de que esta imagen exista
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Colección Exclusiva</Text>
            <View style={styles.searchContainer}>
              <View style={styles.searchInnerContainer}>
                <Ionicons
                  name="search"
                  size={22}
                  color="#D4AF37"
                  style={styles.searchIcon}
                />
                <TextInput
                  style={styles.searchInput}
                  placeholder="Buscar productos..."
                  placeholderTextColor="#999"
                  value={searchText}
                  onChangeText={handleSearch}
                  clearButtonMode="while-editing"
                />
                {searchText.length > 0 && (
                  <TouchableOpacity
                    onPress={() => handleSearch("")}
                    style={styles.clearButton}
                  >
                    <Ionicons name="close-circle" size={20} color="#999" />
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </View>

          <FlatList
            data={filteredProductos}
            renderItem={({ item }) => (
              <ProductoComponent
                producto={item}
                onPress={() =>
                  navigation.navigate("ProductoDetalle", { producto: item })
                }
              />
            )}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            contentContainerStyle={[
              styles.listContent,
              filteredProductos.length === 0 && styles.emptyListContent,
            ]}
            columnWrapperStyle={styles.columnWrapper}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                colors={["#D4AF37"]}
                tintColor="#D4AF37"
              />
            }
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Ionicons
                  name="search-outline"
                  size={60}
                  color="#D4AF37"
                  style={styles.emptyIcon}
                />
                <Text style={styles.emptyText}>
                  {searchText
                    ? "No se encontraron productos"
                    : "No hay productos disponibles"}
                </Text>
                {error && <Text style={styles.errorText}>{error}</Text>}
              </View>
            }
          />
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.79)",
  },
  container: {
    flex: 1,
    paddingHorizontal: 15,
  },
  header: {
    paddingTop: 50,
    paddingBottom: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: "#1A1A2E",
    marginBottom: 20,
    fontFamily: "PlayfairDisplay_700Bold",
    letterSpacing: 0.5,
  },
  searchContainer: {
    backgroundColor: "#FFF",
    borderRadius: 30,
    padding: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  searchInnerContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#333",
    marginLeft: 10,
    paddingVertical: 8,
    fontFamily: "Roboto_400Regular",
  },
  searchIcon: {
    marginRight: 5,
  },
  clearButton: {
    padding: 5,
    marginLeft: 5,
  },
  listContent: {
    paddingBottom: 30,
    paddingTop: 10,
  },
  emptyListContent: {
    flexGrow: 1,
    justifyContent: "center",
  },
  columnWrapper: {
    justifyContent: "space-between",
    marginBottom: 15,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#F9F9F9",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 40,
  },
  emptyIcon: {
    opacity: 0.5,
    marginBottom: 20,
  },
  emptyText: {
    fontSize: 18,
    color: "#666",
    textAlign: "center",
    marginBottom: 10,
    fontFamily: "Roboto_400Regular",
  },
  errorText: {
    fontSize: 16,
    color: "#E74C3C",
    textAlign: "center",
    marginBottom: 20,
    fontFamily: "Roboto_400Regular",
  },
  retryButton: {
    backgroundColor: "#D4AF37",
    borderRadius: 30,
    paddingHorizontal: 30,
    paddingVertical: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  retryButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "Roboto_500Medium",
  },
});
