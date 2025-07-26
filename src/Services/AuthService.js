import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "./conexion";

// Función para validar email
const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

// Función para validar contraseña
const isValidPassword = (password) => {
  return password.length >= 8;
};

export const loginUser = async (email, password) => {
  if (!email || !password) {
    return {
      success: false,
      error: { message: "Email y contraseña son requeridos" },
    };
  }

  if (!isValidEmail(email)) {
    return {
      success: false,
      error: { message: "Por favor ingresa un email válido" },
    };
  }

  try {
    const response = await api.post("/login", { email, password });
    const { token } = response.data;

    await AsyncStorage.setItem("userToken", token);

    return { success: true, token };
  } catch (error) {
    console.error(
      "Error de login",
      error.response ? error.response.data : error.message
    );
    return {
      success: false,
      error: error.response
        ? error.response.data
        : { message: "Error de conexión" },
    };
  }
};

export const logoutUser = async () => {
  try {
    await api.post("/logout");
    await AsyncStorage.removeItem("userToken");
    return { success: true };
  } catch (error) {
    console.log(
      "Error al cerrar sesión",
      error.response ? error.response.data : error.message
    );
    return {
      success: false,
      error: error.response
        ? error.response.data
        : { message: "Error al cerrar sesión" },
    };
  }
};

export const registerUser = async (
  nombre,
  direccion,
  telefono,
  username,
  email,
  password,
  tipo = "USER"
) => {
  if (!nombre || !direccion || !telefono || !username || !email || !password) {
    return {
      success: false,
      error: {
        errors: {
          ...(!nombre && { name: ["El nombre es requerido"] }),
          ...(!direccion && { direccion: ["La dirección es requerida"] }),
          ...(!telefono && { telefono: ["El teléfono es requerido"] }),
          ...(!username && { username: ["El nombre de usuario es requerido"] }),
          ...(!email && { email: ["El email es requerido"] }),
          ...(!password && { password: ["La contraseña es requerida"] }),
        },
      },
    };
  }

  if (!isValidEmail(email)) {
    return {
      success: false,
      error: { errors: { email: ["Por favor ingresa un email válido"] } },
    };
  }

  if (!isValidPassword(password)) {
    return {
      success: false,
      error: {
        errors: {
          password: ["La contraseña debe tener al menos 8 caracteres"],
        },
      },
    };
  }

  try {
    const response = await api.post("/register", {
      nombre,
      email,
      password,
      direccion,
      telefono,
      username,
      tipo: "USER",
    });

    const loginResult = await loginUser(email, password);
    if (!loginResult.success) {
      return loginResult;
    }

    return {
      success: true,
      data: response.data,
      token: loginResult.token,
    };
  } catch (error) {
    console.error(
      "Error de registro",
      error.response ? error.response.data : error.message
    );

    if (!error.response) {
      return {
        success: false,
        error: { errors: { general: ["Error de conexión con el servidor"] } },
      };
    }

    return {
      success: false,
      error: error.response.data,
    };
  }
};

export const sendPasswordResetEmail = async (email) => {
  try {
    const response = await api.post("/forgot-password", { email });
    return {
      success: true,
      message: response.data.message,
    };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || "Error al enviar el email",
    };
  }
};

export const resetPassword = async (email, token, password) => {
  try {
    const response = await api.post("/reset-password", {
      email,
      token,
      password,
      password_confirmation: password,
    });
    return {
      success: true,
      message: response.data.message,
    };
  } catch (error) {
    return {
      success: false,
      message:
        error.response?.data?.message || "Error al restablecer contraseña",
    };
  }
};

export const editProfile = async (userData) => {
  // Validaciones frontend básicas
  const { name, email, password, role } = userData;
  const errors = {};

  if (email && !isValidEmail(email)) {
    errors.email = ["Por favor ingresa un email válido"];
  }

  if (password && !isValidPassword(password)) {
    errors.password = ["La contraseña debe tener al menos 8 caracteres"];
  }

  if (Object.keys(errors).length > 0) {
    return {
      success: false,
      error: { errors },
    };
  }

  try {
    // Obtener el token almacenado
    const token = await AsyncStorage.getItem("userToken");

    if (!token) {
      return {
        success: false,
        error: { message: "No se encontró token de autenticación" },
      };
    }

    // Configurar headers con el token
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    // Preparar datos a enviar
    const dataToSend = {};
    if (name) dataToSend.name = name;
    if (email) dataToSend.email = email;
    if (password) dataToSend.password = password;
    if (role) dataToSend.role = role;

    // Hacer la petición
    const response = await api.put("/editarPerfil", dataToSend, config);

    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    console.error(
      "Error al editar perfil",
      error.response ? error.response.data : error.message
    );

    return {
      success: false,
      error: error.response
        ? error.response.data
        : { message: "Error de conexión" },
    };
  }
};
