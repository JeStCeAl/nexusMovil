import { createStackNavigator } from "@react-navigation/stack";
import Perfil from "../../../Screen/Perfil/Perfil";
import Editarperfil from "../../../Screen/Perfil/EditarPerfil";


const Stack = createStackNavigator();

export default function PerfilStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Perfil"
        component={Perfil}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="EditarPerfil"
        component={Editarperfil}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
