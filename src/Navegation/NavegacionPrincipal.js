import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { View, StyleSheet } from "react-native";
import ProductoStack from "./stacks/ProductoStack";
import CarroStack from "./stacks/CarroStack";
import ConfiguracionStack from "./stacks/ConfiguracionStack";
import PerfilStack from "./stacks/PerfilStack";

const Tab = createBottomTabNavigator();

const NavegacionPrincipal = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
      }}
    >
      <Tab.Screen
        name="productos"
        component={ProductoStack}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.iconWrapper}>
              <View style={[styles.iconContainer, focused && styles.iconContainerActive]}>
                <Ionicons 
                  name="home" 
                  size={24} 
                  color={focused ? '#FFFFFF' : '#D4AF37'} 
                />
              </View>
              <View style={[styles.indicator, focused && styles.activeIndicator]} />
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="carrito"
        component={CarroStack}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.iconWrapper}>
              <View style={[styles.iconContainer, focused && styles.iconContainerActive]}>
                <Ionicons 
                  name="cart" 
                  size={24} 
                  color={focused ? '#FFFFFF' : '#D4AF37'} 
                />
              </View>
              <View style={[styles.indicator, focused && styles.activeIndicator]} />
            </View>
          ),
        }}
      />

      {/* <Tab.Screen
        name="perfil"
        component={PerfilStack}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.iconWrapper}>
              <View style={[styles.iconContainer, focused && styles.iconContainerActive]}>
                <Ionicons 
                  name="person" 
                  size={24} 
                  color={focused ? '#FFFFFF' : '#D4AF37'} 
                />
              </View>
              <View style={[styles.indicator, focused && styles.activeIndicator]} />
            </View>
          ),
        }}
      /> */}

      <Tab.Screen
        name="configuracion"
        component={ConfiguracionStack}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.iconWrapper}>
              <View style={[styles.iconContainer, focused && styles.iconContainerActive]}>
                <AntDesign 
                  name="setting" 
                  size={24} 
                  color={focused ? '#FFFFFF' : '#D4AF37'} 
                />
              </View>
              <View style={[styles.indicator, focused && styles.activeIndicator]} />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    height: 70,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  iconWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  iconContainer: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainerActive: {
    backgroundColor: '#D4AF37',
    borderRadius: 20,
  },
  indicator: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'transparent',
    marginTop: 4,
  },
  activeIndicator: {
    backgroundColor: '#D4AF37',
  },
});

export default NavegacionPrincipal;