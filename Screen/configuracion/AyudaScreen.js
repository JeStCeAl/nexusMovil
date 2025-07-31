import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking, TextInput } from "react-native";
import { MaterialIcons, FontAwesome, AntDesign } from "@expo/vector-icons";

const AyudaScreen = () => {
  const [activeAccordion, setActiveAccordion] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [contactMessage, setContactMessage] = useState("");

  const faqs = [
    {
      question: "¿Cómo cambio mi contraseña?",
      answer: "Ve a Configuración > Cambiar contraseña. Ingresa tu contraseña actual y luego la nueva contraseña dos veces para confirmar."
    },
    {
      question: "¿Donde ubico mi cuenta?",
      answer: "Tu cuenta está en la sección de Configuración. Desde allí puedes ver tu perfil, cambiar tu contraseña y acceder a la ayuda."
    },
    {
      question: "¿Cómo reporto un problema?",
      answer: "Puedes reportar problemas desde Configuración > Contactanos > Reportar un problema o enviarnos un mensaje directo usando el formulario al final de esta pantalla."
    },
    {
      question: "¿Cómo restablezco mi cuenta?",
      answer: "Si olvidaste tu contraseña, en la pantalla de inicio de sesión toca '¿Olvidaste tu contraseña?' y sigue las instrucciones que te enviaremos por email."
    },
    
  ];

  const filteredFaqs = faqs.filter(item => 
    item.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
    item.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleAccordion = (index) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };

  

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Centro de Ayuda</Text>
      
      {/* Buscador */}
      <View style={styles.searchContainer}>
        <MaterialIcons name="search" size={20} color="#777" />
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar en ayuda..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor="#999"
        />
      </View>
      
      {/* Sección de preguntas frecuentes */}
      <Text style={styles.sectionTitle}>Preguntas Frecuentes</Text>
      
      {filteredFaqs.length > 0 ? (
        filteredFaqs.map((item, index) => (
          <View key={index} style={styles.accordionItem}>
            <TouchableOpacity 
              style={styles.accordionHeader} 
              onPress={() => toggleAccordion(index)}
              activeOpacity={0.8}
            >
              <Text style={styles.accordionQuestion}>{item.question}</Text>
              <MaterialIcons 
                name={activeAccordion === index ? "keyboard-arrow-up" : "keyboard-arrow-down"} 
                size={24} 
                color="#555" 
              />
            </TouchableOpacity>
            
            {activeAccordion === index && (
              <View style={styles.accordionContent}>
                <Text style={styles.accordionAnswer}>{item.answer}</Text>
                <TouchableOpacity style={styles.helpfulButton}>
                  <Text style={styles.helpfulText}>¿Fue útil esta respuesta?</Text>
                  <View style={styles.helpfulButtons}>
                    <TouchableOpacity style={styles.thumbButton}>
                      <AntDesign name="like1" size={16} color="#4CAF50" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.thumbButton}>
                      <AntDesign name="dislike1" size={16} color="#F44336" />
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              </View>
            )}
          </View>
        ))
      ) : (
        <Text style={styles.noResults}>No se encontraron resultados para tu búsqueda</Text>
      )}
      
      
      
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f7fa",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#2c3e50",
    marginBottom: 20,
    textAlign: "center",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: "#333",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#2c3e50",
    marginTop: 25,
    marginBottom: 15,
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  accordionItem: {
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 10,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 1,
  },
  accordionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
  },
  accordionQuestion: {
    fontSize: 16,
    fontWeight: "500",
    color: "#34495e",
    flex: 1,
    marginRight: 10,
  },
  accordionContent: {
    padding: 15,
    paddingTop: 0,
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
  },
  accordionAnswer: {
    fontSize: 15,
    color: "#555",
    lineHeight: 22,
    marginBottom: 15,
  },
  helpfulButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  helpfulText: {
    fontSize: 14,
    color: "#7f8c8d",
  },
  helpfulButtons: {
    flexDirection: "row",
  },
  thumbButton: {
    marginLeft: 10,
    padding: 5,
  },
  noResults: {
    textAlign: "center",
    color: "#7f8c8d",
    marginVertical: 20,
    fontSize: 16,
  },
  contactCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 1,
  },
  contactText: {
    fontSize: 16,
    color: "#555",
    marginBottom: 15,
  },
  messageInput: {
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    padding: 15,
    fontSize: 15,
    color: "#333",
    minHeight: 100,
    textAlignVertical: "top",
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  submitButton: {
    backgroundColor: "#3498db",
    borderRadius: 8,
    padding: 15,
    alignItems: "center",
    opacity: 1,
  },
  submitButtonDisabled: {
    opacity: 0.6,
  },
  submitButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  resourcesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  resourceCard: {
    width: "48%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 1,
  },
  resourceText: {
    marginTop: 10,
    fontSize: 14,
    color: "#2c3e50",
    textAlign: "center",
    fontWeight: "500",
  },
});

export default AyudaScreen;