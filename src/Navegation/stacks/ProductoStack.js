import { createStackNavigator } from '@react-navigation/stack';
import ListarProductsScreen from '../../../Screen/Productos/ListarProductosScreen';
import ProductoDetalle from '../../../Screen/Productos/ProductoDetalle';
import Carro from '../../../Screen/Carro/Carro'; 

const Stack = createStackNavigator();

const ProductoStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="ListarProducts" 
        component={ListarProductsScreen} 
        options={{ title: 'Catálogo de Joyas' }}
      />
      <Stack.Screen 
        name="ProductoDetalle" 
        component={ProductoDetalle}
        options={({ route }) => ({ title: route.params.producto.nombre })}
      />
      <Stack.Screen 
        name="Carro" 
        component={Carro} 
      />
    </Stack.Navigator>
  );
};

export default ProductoStack;