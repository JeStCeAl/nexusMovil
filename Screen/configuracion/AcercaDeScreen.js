import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const AboutUsScreen = () => {
  return (
    <ScrollView style={styles.container}>
      {/* Header con imagen */}
      <View style={styles.header}>
        <Image 
          source={require('../../assets/corona.png')} 
          style={styles.headerImage}
          resizeMode="cover"
        />
        <View style={styles.headerOverlay} />
      </View>

      {/* Sección de misión */}
      <View style={[styles.section, styles.missionSection]}>
        <Ionicons name="diamond" size={28} color="#a8d8ea" style={styles.icon} />
        <Text style={styles.sectionTitle}>Nuestra Misión</Text>
        <Text style={styles.sectionText}>
          En NexusEcommerce nos dedicamos a ofrecer joyería fina de la más alta calidad, 
          combinando diseño innovador con artesanía tradicional. Nuestro objetivo es 
          conectar a nuestros clientes con piezas únicas que cuenten historias y se 
          conviertan en tesoros personales.
        </Text>
      </View>

      {/* Sección de historia */}
      <View style={[styles.section, styles.historySection]}>
        <Ionicons name="time" size={28} color="#f8c3cd" style={styles.icon} />
        <Text style={styles.sectionTitle}>Nuestra Historia</Text>
        <Text style={styles.sectionText}>
          Fundada en 2023, NexusEcommerce comenzó como un pequeño taller familiar 
          especializado en plata esterlina. Hoy somos una marca reconocida a nivel 
          nacional, con más de 10,000 clientes satisfechos y una colección que incluye 
          desde piezas clásicas hasta diseños vanguardistas.
        </Text>
      </View>

      {/* Sección de valores */}
      <View style={[styles.section, styles.valuesSection]}>
        <Ionicons name="heart" size={28} color="#aacfcf" style={styles.icon} />
        <Text style={styles.sectionTitle}>Nuestros Valores</Text>
        <View style={styles.valueItem}>
          <Ionicons name="checkmark-circle" size={20} color="#aacfcf" />
          <Text style={styles.valueText}>Calidad excepcional en cada pieza</Text>
        </View>
        <View style={styles.valueItem}>
          <Ionicons name="checkmark-circle" size={20} color="#aacfcf" />
          <Text style={styles.valueText}>Sostenibilidad y materiales éticos</Text>
        </View>
        <View style={styles.valueItem}>
          <Ionicons name="checkmark-circle" size={20} color="#aacfcf" />
          <Text style={styles.valueText}>Atención personalizada al cliente</Text>
        </View>
        <View style={styles.valueItem}>
          <Ionicons name="checkmark-circle" size={20} color="#aacfcf" />
          <Text style={styles.valueText}>Innovación en diseño</Text>
        </View>
      </View>

      {/* Equipo */}
      <View style={[styles.section, styles.teamSection]}>
        <Ionicons name="people" size={28} color="#d4a5c9" style={styles.icon} />
        <Text style={styles.sectionTitle}>Nuestro Equipo</Text>
        <Text style={styles.sectionText}>
          Contamos con un equipo apasionado de diseñadores, artesanos y expertos en 
          gemología que trabajan juntos para crear piezas excepcionales. Cada miembro 
          de NexusEcommerce comparte nuestro compromiso con la excelencia y la 
          satisfacción del cliente.
        </Text>
      </View>

      {/* Contacto */}
      <View style={[styles.section, styles.contactSection]}>
        <Ionicons name="mail" size={28} color="#c7b198" style={styles.icon} />
        <Text style={styles.sectionTitle}>Contáctanos</Text>
        <Text style={styles.sectionText}>
          ¿Tienes preguntas o comentarios? Nos encantaría escucharte.
        </Text>
        <View style={styles.contactInfo}>
          <Ionicons name="mail" size={16} color="#6d7b8d" />
          <Text style={styles.contactText}>nexusecommerce2025@gmail.com</Text>
        </View>
        <View style={styles.contactInfo}>
          <Ionicons name="call" size={16} color="#6d7b8d" />
          <Text style={styles.contactText}>+57 310 3243213</Text>
        </View>
        
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fef6fb', // Fondo pastel muy claro
  },
  header: {
    height: 250,
    position: 'relative',
    marginBottom: 20,
  },
  headerImage: {
    width: '100%',
    height: '100%',
  },
  headerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(168, 216, 234, 0.3)', // Overlay pastel azul
  },
  headerTitle: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    textShadowColor: 'rgba(109, 123, 141, 0.5)', // Sombra pastel
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
  section: {
    paddingHorizontal: 20,
    paddingVertical: 25,
    marginHorizontal: 15,
    marginBottom: 15,
    borderRadius: 15,
    shadowColor: '#d4d4d4',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  missionSection: {
    backgroundColor: '#e8f4f8', // Azul pastel claro
  },
  historySection: {
    backgroundColor: '#fce9ed', // Rosa pastel claro
  },
  valuesSection: {
    backgroundColor: '#e8f3f3', // Verde agua pastel
  },
  teamSection: {
    backgroundColor: '#f5e8f2', // Lila pastel
  },
  contactSection: {
    backgroundColor: '#f0ebe3', // Beige pastel
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 12,
    color: '#6d7b8d', // Gris azulado pastel
  },
  sectionText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#7a7a7a',
    marginBottom: 10,
  },
  icon: {
    marginBottom: 12,
  },
  valueItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    paddingLeft: 5,
  },
  valueText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#6d7b8d',
  },
  contactInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    paddingLeft: 5,
  },
  contactText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#6d7b8d',
  },
});

export default AboutUsScreen;