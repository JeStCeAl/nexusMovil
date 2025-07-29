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

// Función para validar código (6 dígitos)
const isValidCode = (code) => {
  return /^\d{6}$/.test(code);
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

// Función para enviar código de recuperación
export const sendPasswordResetCode = async (email) => {
  if (!email) {
    return {
      success: false,
      error: { message: "El email es requerido" },
    };
  }

  if (!isValidEmail(email)) {
    return {
      success: false,
      error: { message: "Por favor ingresa un email válido" },
    };
  }

  try {
    const response = await api.post("/password/email", { email });
    return {
      success: true,
      message: response.data.message || "Código de verificación enviado",
    };
  } catch (error) {
    console.error(
      "Error al enviar código",
      error.response ? error.response.data : error.message
    );
    return {
      success: false,
      message:
        error.response?.data?.message ||
        "Error al enviar el código de verificación",
    };
  }
};

export const verifyResetCode = async (email, code) => {
  // Validación frontend primero
  if (!/^\d{6}$/.test(code)) {
    return {
      success: false,
      message: 'El código debe contener exactamente 6 dígitos numéricos'
    };
  }

  try {
    const response = await api.post('/password/verify', { email, code });
    return response.data;
  } catch (error) {
    console.error("Error verifying code:", error.response?.data || error);
    return {
      success: false,
      message: error.response?.data?.message || "Error al verificar el código"
    };
  }
};

// Función para restablecer la contraseña con el código verificado
export const resetPasswordWithCode = async (email, resetToken, password) => {
  if (!email || !resetToken || !password) {
    return {
      success: false,
      error: { message: "Todos los campos son requeridos" },
    };
  }

  if (!isValidEmail(email)) {
    return {
      success: false,
      error: { message: "Por favor ingresa un email válido" },
    };
  }

  if (!isValidPassword(password)) {
    return {
      success: false,
      error: { message: "La contraseña debe tener al menos 8 caracteres" },
    };
  }

  try {
    const response = await api.post("/password/reset", {
      email,
      reset_token: resetToken,
      password,
      password_confirmation: password,
    });
    return {
      success: true,
      message: response.data.message || "Contraseña actualizada correctamente",
    };
  } catch (error) {
    console.error(
      "Error al restablecer contraseña",
      error.response ? error.response.data : error.message
    );
    return {
      success: false,
      message:
        error.response?.data?.message || "Error al restablecer la contraseña",
    };
  }
};

// Función para reenviar el código de verificación
export const resendResetCode = async (email) => {
  return sendPasswordResetCode(email); // Reutilizamos la misma función
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