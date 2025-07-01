import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import {
  FontAwesome5,
  FontAwesome6,
  AntDesign,
} from "@expo/vector-icons";

export function MenuScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenido al Sistema Médico</Text>
      <Text style={styles.subtitle}>Estado: Habilitado</Text>

      <View style={styles.grid}>
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate("PacienteStack")}
        >
          <AntDesign name="user" size={36} color="#0066cc" />
          <Text style={styles.cardText}>Pacientes</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate("CitaStack")}
        >
          <FontAwesome5 name="calendar-check" size={36} color="#0066cc" />
          <Text style={styles.cardText}>Citas</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate("DoctorStack")}
        >
          <FontAwesome6 name="user-doctor" size={36} color="#0066cc" />
          <Text style={styles.cardText}>Doctores</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate("EspecialidadStack")}
        >
          <FontAwesome5 name="briefcase-medical" size={36} color="#0066cc" />
          <Text style={styles.cardText}>Especialidades</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate("ConsultorioStack")}
        >
          <AntDesign name="customerservice" size={36} color="#0066cc" />
          <Text style={styles.cardText}>Consultorios</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f6f6f6",
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "#004aad",
    marginBottom: 5,
  },
  subtitle: {
    textAlign: "center",
    fontSize: 16,
    color: "#555",
    marginBottom: 30,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  card: {
    backgroundColor: "#fff",
    width: "47%",
    aspectRatio: 1,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  cardText: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    textAlign: "center",
  },
});
