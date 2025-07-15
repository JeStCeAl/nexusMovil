import { NavigationContainer } from "@react-navigation/native";
import AuthNavigator from "./AuthNavegacion";
import NavegacionPrincipal from "./NavegacionPrincipal";
import React, { useState, useEffect, useRef, use } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ActivityIndicator, View, StyleSheet, AppState } from "react-native";

export default function AppNavigator() {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);
  const appState = useRef(AppState.currentState);

  const loadToken = async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      setUserToken(token);
    } catch (error) {
      console.error("Error al cargar el token:", error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    loadToken();
  }, []);

  useEffect(() => {
    const handleAppStateChange = (nextAppState) => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === "active"
      ) {
        console.log("App ha vuelto a primer plano, recargando el token...");
        loadToken();
      }
      appState.current = nextAppState;
    };
    const subscription = AppState.addEventListener(
      "change",
      handleAppStateChange
    );
    return () => subscription?.remove();
  }, []);

  
  useEffect(() => {
    if (!isLoading) {
      const interval = setInterval(() => {
        if (AppState.currentState === 'active') {
          loadToken(); // recarga el token cada 5 minutos si la app está activa
        }
      }, 2000); // 2 segundos para pruebas, cambiar a 300000 para 5 minutos
      return () => clearInterval(interval);
    }
  }, [isLoading]);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
  
  return (
    <NavigationContainer>
      {userToken ? <NavegacionPrincipal /> : <AuthNavigator />}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {  
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F7FA',
    },
});