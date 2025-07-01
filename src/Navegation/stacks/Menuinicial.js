import { createStackNavigator } from "@react-navigation/stack";
import { MenuScreen } from "../../../Screen/Menu/MenuScreen";
import { Button } from "react-native";

const Stack = createStackNavigator();

export default function MenuInicial() {
  
  return (
    <Stack.Navigator initialRouteName="MenuPrincipal">
      <Stack.Screen
        name="MenuPrincipal"
        component={MenuScreen}
        options={{
          // Oculta el header en esta pantalla
          headerRight: () => (
            <Button
              onPress={() => alert("!Boton en el header!")}
              title="Cerrar Sesión"
              color="red"
            />
          ),
        }}
      />
      <Stack.Screen
        name="PacienteStack"
        component={PacienteStack}
        options={{ headerShown: false }} // Oculta el header en la pantalla de PacienteStack
      />
      <Stack.Screen
        name="CitaStack"
        component={CitaStack}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="DoctorStack"
        component={DoctorStack}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="EspecialidadStack"
        component={EspecialidadStack}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ConsultorioStack"
        component={ConsultorioStack}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
