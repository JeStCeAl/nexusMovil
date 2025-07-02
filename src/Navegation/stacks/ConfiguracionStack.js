import {createStackNavigator} from "@react-navigation/stack";
import Configuracion from "../../../Screen/configuracion/Configuracion";

const Stack = createStackNavigator();

export default function PerfilStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name="Configuracion" 
                component={Configuracion} 
                options={{ headerShown: false }} 
            />

        </Stack.Navigator>
    )
}