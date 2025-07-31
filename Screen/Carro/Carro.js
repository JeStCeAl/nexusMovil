import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const Cart = ({ route }) => {
  const [cart, setCart] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    if (route?.params?.producto) {
      const prod = route.params.producto;
      const newItem = {
        id: prod.id || Math.random().toString(36).substring(2, 9),
        name: prod.nombre,
        price: prod.precio,
        image: prod.imagen,
        quantity: 1,
        inStock: prod.cantidad,

      };

      setCart((prev) => {
        const existingItem = prev.find((item) => item.id === newItem.id);
        if (existingItem) {
          if (existingItem.quantity + 1 > existingItem.inStock) {
            alert(
              `No puedes agregar más de ${existingItem.inStock} unidades de "${existingItem.name}".`
            );
            return prev;
          }

          return prev.map((item) =>
            item.id === newItem.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        }
        if (newItem.inStock < 1) {
          alert(`"${newItem.name}" no está disponible en este momento.`);
          return prev;
        }
        return [...prev, newItem];
      });
    }
  }, [route?.params?.producto]);

  const updateQuantity = (id, change) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
    setShowModal(false);
  };

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const taxes = subtotal * 0.16;
  const shipping = subtotal > 0 ? (subtotal > 5000 ? 0 : 150) : 0;
  const total = subtotal + taxes + shipping;

  const handleCheckout = () => {
    // Verifica si algún producto supera el stock
    const productoExcedido = cart.find((item) => item.quantity > item.inStock);

    if (productoExcedido) {
      alert(
        `La cantidad seleccionada de "${productoExcedido.name}" excede el stock disponible (${productoExcedido.inStock}).`
      );
      return; // Detiene la navegación
    }

    // Si todo está bien, navega al método de pago
    navigation.navigate("PaymentMethod", {
      cart,
      subtotal,
      taxes,
      shipping,
      total,
      onPaymentComplete: () => setCart([]),
    });
  };

  return (
    <View style={styles.bg}>
      <Text style={styles.title}>Tu Carrito de Compras</Text>
      {cart.length === 0 ? (
        <View style={styles.emptyCart}>
          <Text style={styles.emptyIcon}>🛍️</Text>
          <Text style={styles.emptyText}>Tu carrito está vacío</Text>
          <Text style={styles.emptySubText}>
            Añade algunas joyas para continuar
          </Text>
        </View>
      ) : (
        <FlatList
          data={cart}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.container}
          renderItem={({ item }) => (
            <View style={styles.cartItem}>
              <Image source={{ uri: item.image }} style={styles.image} />
              <View style={{ flex: 1, marginLeft: 12 }}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.price}>${item.price.toFixed(2)}</Text>
                <Text style={item.inStock ? styles.stock : styles.noStock}>
                  {item.inStock ? "En Stock" : "Fuera de Stock"}
                </Text>
                <View style={styles.qtyRow}>
                  <TouchableOpacity
                    style={styles.qtyBtn}
                    onPress={() => updateQuantity(item.id, -1)}
                    disabled={item.quantity === 1}
                  >
                    <Text style={styles.qtyBtnText}>-</Text>
                  </TouchableOpacity>
                  <Text style={styles.qtyValue}>{item.quantity}</Text>
                  <TouchableOpacity
                    style={styles.qtyBtn}
                    onPress={() => updateQuantity(item.id, 1)}
                    disabled={item.quantity >= item.inStock}
                  >
                    <Text
                      style={[
                        styles.qtyBtnText,
                        item.quantity >= item.inStock && { color: "#ccc" },
                      ]}
                    >
                      +
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.removeBtn}
                    onPress={() => removeItem(item.id)}
                  >
                    <Text style={styles.removeBtnText}>Eliminar</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
          ListFooterComponent={
            <View style={styles.summary}>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Subtotal</Text>
                <Text style={styles.summaryValue}>${subtotal.toFixed(2)}</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Impuestos (16%)</Text>
                <Text style={styles.summaryValue}>${taxes.toFixed(2)}</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Envío</Text>
                <Text style={styles.summaryValue}>
                  {shipping === 0 ? "Gratis" : `$${shipping.toFixed(2)}`}
                </Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryTotal}>Total</Text>
                <Text style={styles.summaryTotal}>${total.toFixed(2)}</Text>
              </View>
              <View style={styles.summaryActions}>
                <TouchableOpacity
                  style={styles.cancelBtn}
                  onPress={() => setShowModal(true)}
                >
                  <Text style={styles.cancelBtnText}>VACIAR CARRITO</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.payBtn}
                  onPress={handleCheckout}
                >
                  <Text style={styles.payBtnText}>PAGAR AHORA</Text>
                </TouchableOpacity>
              </View>
            </View>
          }
        />
      )}
      {showModal && (
        <View style={styles.modalOverlay}>
          <View style={styles.modal}>
            <Text style={styles.modalTitle}>¿Estás seguro?</Text>
            <Text style={styles.modalText}>
              ¿Deseas vaciar tu carrito? Esta acción no puede deshacerse.
            </Text>
            <View style={styles.modalActions}>
              <TouchableOpacity
                style={styles.modalBtn}
                onPress={() => setShowModal(false)}
              >
                <Text style={styles.modalBtnText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalBtn, styles.modalBtnDanger]}
                onPress={clearCart}
              >
                <Text style={styles.modalBtnText}>Vaciar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  bg: { flex: 1, backgroundColor: "#f8f9fa" },
  container: { padding: 16, paddingBottom: 80 },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2c3e50",
    textAlign: "center",
    marginVertical: 16,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  emptyCart: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 80,
  },
  emptyIcon: { fontSize: 60, marginBottom: 20, color: "#7f8c8d" },
  emptyText: { fontSize: 20, color: "#7f8c8d", fontWeight: "500" },
  emptySubText: { fontSize: 16, color: "#bdc3c7", marginTop: 8 },
  cartItem: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
    borderRadius: 10,
    marginBottom: 12,
    padding: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  image: { width: 80, height: 80, borderRadius: 8, backgroundColor: "#f1f1f1" },
  name: { fontWeight: "600", fontSize: 16, marginBottom: 4, color: "#2c3e50" },
  price: {
    color: "#3498db",
    fontWeight: "bold",
    marginBottom: 4,
    fontSize: 16,
  },
  stock: { color: "#27ae60", fontSize: 13, fontWeight: "500" },
  noStock: { color: "#e74c3c", fontSize: 13, fontWeight: "500" },
  qtyRow: { flexDirection: "row", alignItems: "center", marginTop: 8 },
  qtyBtn: {
    borderWidth: 1,
    borderColor: "#3498db",
    borderRadius: 20,
    width: 30,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  qtyBtnText: { fontSize: 18, color: "#3498db", fontWeight: "bold" },
  qtyValue: {
    fontSize: 16,
    fontWeight: "bold",
    marginHorizontal: 10,
    color: "#2c3e50",
  },
  removeBtn: { marginLeft: "auto", padding: 6 },
  removeBtnText: { color: "#e74c3c", fontSize: 14, fontWeight: "500" },
  summary: {
    backgroundColor: "#ecf0f1",
    borderRadius: 12,
    padding: 16,
    marginTop: 20,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  summaryLabel: { color: "#7f8c8d", fontSize: 15 },
  summaryValue: { color: "#2c3e50", fontSize: 15, fontWeight: "500" },
  summaryTotal: {
    color: "#2c3e50",
    fontWeight: "bold",
    fontSize: 18,
    marginTop: 8,
  },
  summaryActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  cancelBtn: {
    borderWidth: 1,
    borderColor: "#e74c3c",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    flex: 1,
    marginRight: 10,
  },
  cancelBtnText: { color: "#e74c3c", fontWeight: "bold", textAlign: "center" },
  payBtn: {
    backgroundColor: "#2ecc71",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    flex: 1,
    marginLeft: 10,
  },
  payBtnText: { color: "#fff", fontWeight: "bold", textAlign: "center" },
  modalOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 24,
    width: "80%",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#2c3e50",
    textAlign: "center",
  },
  modalText: {
    color: "#7f8c8d",
    marginBottom: 20,
    textAlign: "center",
    lineHeight: 22,
  },
  modalActions: { flexDirection: "row", justifyContent: "center" },
  modalBtn: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
    marginHorizontal: 10,
    minWidth: 100,
  },
  modalBtnDanger: { backgroundColor: "#e74c3c" },
  modalBtnText: { color: "#fff", fontWeight: "bold", textAlign: "center" },
});

export default Cart;
