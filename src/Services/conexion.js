import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Cambia esto por tu IP real y verifica el puerto
 
const API_BASE_URL = "http://192.168.100.217:8000/api";


const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // 10 segundos
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

const RutasPublicas = ["/login", "/register"];

// Interceptor de solicitud
api.interceptors.request.use(
  async (config) => {
    const isRutaPublica = RutasPublicas.some((route) =>
      config.url.includes(route)
    );

    if (!isRutaPublica) {
      try {
        const userToken = await AsyncStorage.getItem("userToken");
        if (userToken) {
          config.headers.Authorization = `Bearer ${userToken}`;
        }
      } catch (storageError) {
        console.error("Error al leer el token:", storageError);
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor de respuesta mejorado
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    // Manejo de errores de red
    if (!error.response) {
      return Promise.reject({
        code: "NETWORK_ERROR",
        message: "No se pudo conectar al servidor. Verifica tu conexión.",
      });
    }

    // Manejo específico de 401 (No autorizado)
    if (error.response.status === 401) {
      const originalRequest = error.config;
      const isPublicRoute = RutasPublicas.some((route) =>
        originalRequest.url.includes(route)
      );

      if (!isPublicRoute && !originalRequest._retry) {
        originalRequest._retry = true;
        await AsyncStorage.removeItem("userToken");
        console.log("Sesión expirada. Por favor inicia sesión nuevamente.");

        // Opcional: Redirigir a login
        // navigationRef.current?.navigate('Login');
      }
    }

    return Promise.reject(error);
  }
);

export default api;
