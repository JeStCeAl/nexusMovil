
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
 // Asegúrate que este es tu Axios instance
export default function CommentList({ comments = [] }) {
  if (!comments.length) {
    return (
      <View style={styles.noComments}>
        <Text style={styles.noCommentsText}>Sé el primero en comentar</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Comentarios</Text>
      {comments.map((comment) => (
        <View key={comment.id} style={styles.commentCard}>
          <View style={styles.ratingRow}>
            {Array.from({ length: 5 }).map((_, index) => (
              <Ionicons
                key={index}
                name={index < comment.calificacion ? "star" : "star-outline"}
                size={18}
                color="#FFD700"
              />
            ))}
          </View>
          <Text style={styles.commentText}>{comment.texto}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "500",
    marginBottom: 10,
    color: "#333",
  },
  noComments: {
    marginTop: 20,
    paddingHorizontal: 16,
  },
  noCommentsText: {
    fontSize: 16,
    color: "#888",
  },
  commentCard: {
    backgroundColor: "#fff",
    padding: 12,
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  ratingRow: {
    flexDirection: "row",
    marginBottom: 5,
  },
  commentText: {
    fontSize: 14,
    color: "#444",
  },
});
