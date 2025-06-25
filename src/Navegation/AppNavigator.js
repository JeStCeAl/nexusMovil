import { NavigationContainer } from "@react-navigation/native";
import AuthNavigator from "./AuthNavegacion";
import NavegacionPrincipal from "./NavegacionPrincipal";

export default function AppNavigator() {
  const Autenticado = true; // Cambia esto según tu lógica de autenticación
  // Si Autenticado es true, muestra NavegacionPrincipal, de lo contrario AuthNavigator
  return (
    <NavigationContainer>
      {Autenticado ? <NavegacionPrincipal /> : <AuthNavigator />}
    </NavigationContainer>
  );
}