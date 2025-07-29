// stacks/CarroStack.js
import { createStackNavigator } from "@react-navigation/stack";
import Carro from "../../../Screen/Carro/Carro"; // Asegúrate de tener esta pantalla
import PaymentMethodScreen from "../../../Screen/Carro/PaymentScreen"; // Asegúrate de tener esta pantalla  


const Stack = createStackNavigator();

export default function CarroStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Carro" component={Carro} />
      <Stack.Screen name="PaymentMethod" component={PaymentMethodScreen} />
      

      {/* Agrega más pantallas del carrito si es necesario */}
    </Stack.Navigator>
  );
}
