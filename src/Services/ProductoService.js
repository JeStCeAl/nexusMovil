import api from "./conexion";

export const listarProductos = async () => {
  try {
    const respuesta = await api.get("/productos");
    return { success: true, data: respuesta.data };
  } catch (error) {
    console.log(
      "Error al listar productos:",
      error.response ? error.response.data : error.message
    );
    return {
      success: false,
      message: error.response ? error.response.data : "Error de conexión",
    };
  }
};
