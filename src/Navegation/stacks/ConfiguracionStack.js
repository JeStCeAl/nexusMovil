import { createStackNavigator } from "@react-navigation/stack";
import Configuracion from "../../../Screen/configuracion/Configuracion";
import PerfilScreen from "../../../Screen/Perfil/Perfil";
import AyudaScreen from "../../../Screen/configuracion/AyudaScreen"; // Asegúrate de que este path sea correcto
import ContactanosScreen from "../../../Screen/configuracion/ContactanosScreen";

import AcercaDeScreen from "../../../Screen/configuracion/AcercaDeScreen";
import CambiarContrasena from "../../../Screen/configuracion/CambiarContraseña";

const Stack = createStackNavigator();

export default function PerfilStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Configuracion"
        component={Configuracion}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Perfil"
        component={PerfilScreen}
        options={{ title: "Perfil" }}
      />
      <Stack.Screen
        name="Ayuda"
        component={AyudaScreen}
        options={{ title: "Ayuda" }}
      />
      <Stack.Screen
        name="Contactanos"
        component={ContactanosScreen}
        options={{ title: "Ayuda" }}
      />
      <Stack.Screen
        name="AcercaDE"
        component={AcercaDeScreen} // Reutilizando AyudaScreen para Acerca de
        options={{ title: "Ayuda" }}
      />
      <Stack.Screen
        name="CambiarContraseña"
        component={CambiarContrasena} // Reutilizando AyudaScreen para Acerca de
        options={{ title: "Cambio de Contraseña" }}
      />
    </Stack.Navigator>
  );
}
