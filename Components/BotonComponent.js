import { TouchableOpacity, Text, StyleSheet } from "react-native";

export default function CustomButton({ title, onPress , style}) {
    return (
        <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    button: {
        backgroundColor: '#007BFF',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginVertical: 10,
    },
    text: {
        color: '#FFFFFF',
        fontSize: 16,
    },
});