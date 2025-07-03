import {createStackNavigator} from "@react-navigation/stack";
import Configuracion from "../../../Screen/configuracion/Configuracion";
import PerfilScreen from "../../../Screen/Perfil/Perfil";

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
                options={{ title: 'Perfil' }}
            />

        </Stack.Navigator>
    )
}