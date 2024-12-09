import React from "react";
import { Text, StyleSheet, Pressable } from "react-native";

const GoalComp = (props) => {
  function deleteHandler() {
    const updatedList = props.goals.filter(
      (e) => e.itemName !== props.itemName
    );
    props.setGoals(updatedList);
  }

  return (
    <Pressable
      android_ripple={{ color: "red" }}
      style={({ pressed }) => pressed && styles.pressedItem}
      onPress={() => deleteHandler(props.itemName)}
    >
      <Text style={styles.goal}>⁍ {props.itemName}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  goal: {
    backgroundColor: "#f9f9f9",
    borderRadius: 4,
    padding: 10,
    marginTop: 6,
    marginBottom: 6,
  },
  pressedItem: {
    color: "#f3f3f3",
  },
});

export default GoalComp;
