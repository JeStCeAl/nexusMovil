import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import ProductoStack from "./stacks/ProductoStack"; // Asegúrate que el archivo exista
import CarroStack from "./stacks/CarroStack";      // Asegúrate que el archivo exista

const Tab = createBottomTabNavigator();

const NavegacionPrincipal = () => {
  return (
    <Tab.Navigator 
      screenOptions={{ 
        headerShown: false,
        tabBarActiveTintColor: 'blue',    // Color personalizado
        tabBarInactiveTintColor: 'gray',  // Color personalizado
      }}
    >
      <Tab.Screen
        name="productos"  // Cambiado a minúsculas por convención
        component={ProductoStack}
        options={{
          tabBarLabel: "Productos",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="carrito"  // Cambiado a minúsculas por convención
        component={CarroStack}
        options={{
          tabBarLabel: "Carrito",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="cart" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default NavegacionPrincipal;