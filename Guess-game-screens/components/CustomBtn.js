import { Pressable, StyleSheet, Text, View } from "react-native";

export const CustomBtn = (props) => {
  return (
    <Pressable
      style={({ pressed }) => (pressed ? [styles.active] : styles.container)}
      onPress={() => props.handler()}
    >
      <Text style={styles.text}>{props.children}</Text>
    </Pressable>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: "orange",
    borderRadius: 14,
    margin: 30,
    marginTop: 4,
    marginBottom: 4,
  },
  text: {
    textAlign: "center",
    padding: 8,
    color: "white",
    fontSize: 16,
  },
  active: {
    backgroundColor: "pink",
    borderRadius: 14,
    margin: 30,
    marginTop: 4,
    marginBottom: 4,
    transform: "scale(0.9)",
  },
});
