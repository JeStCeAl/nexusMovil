import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ListarProductsScreen from "../../../Screen/Productos/ListarProductosScreen";
import ProductoDetalle from "../../../Screen/Productos/ProductoDetalle";

const Stack = createStackNavigator();

const ProductoStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ListarProducts"
        component={ListarProductsScreen}
        options={{ title: "Catálogo de Joyas" }}
      />
      <Stack.Screen
        name="ProductoDetalle"
        component={ProductoDetalle}
        options={({ route }) => ({ title: route.params.producto.nombre })}
      />
    </Stack.Navigator>
  );
};

export default ProductoStack;
