import { createStackNavigator } from "@react-navigation/stack";
import Perfil from "../../../Screen/Perfil/Perfil"; // Asegúrate de tener esta pantalla

const Stack = createStackNavigator();

export default function PerfilStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Perfil" component={Perfil} />
      {/* Agrega más pantallas relacionadas al perfil si es necesario */}
    </Stack.Navigator>
  );
}