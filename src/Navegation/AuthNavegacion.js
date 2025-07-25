import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../../Screen/Auth/login";
import RegisterScreen from "../../Screen/Auth/Registrar";
import cambioContra from "../../Screen/Auth/CambioContra";
import ResetPasswordScreen from "../../Screen/Auth/NuevaContra";

const Stack = createStackNavigator();
export default function AuthNavigator() {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen 
        name="Login" 
        component={LoginScreen} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="Register" 
        component={RegisterScreen} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen
        name="CambioContra" 
        component={cambioContra} 
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="ResetPassword" 
        component={ResetPasswordScreen} 
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}