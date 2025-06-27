// stacks/NavegacionPrincipal.js
import { createStackNavigator } from '@react-navigation/stack';
import ProductoStack from './stacks/ProductoStack';

const Stack = createStackNavigator();

const NavegacionPrincipal = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ProductoStack" component={ProductoStack} />
    </Stack.Navigator>
    
  );
};

export default NavegacionPrincipal;