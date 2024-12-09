import React, { useState } from "react";
import {
  Button,
  Image,
  Modal,
  StyleSheet,
  TextInput,
  View,
} from "react-native";

export const GoalInput = (props) => {
  const [val, setVal] = useState("");

  const changeHandler = (enteredText) => {
    setVal(enteredText);
  };
  const clickHandler = () => {
    props.setGoals([
      ...props.goals,
      { itemName: val, uniqueKey: Math.random() },
    ]);
    setVal("");
    props.setIsOpen(false);
  };

  return (
    <Modal visible={props.isOpen} animationType="slide">
      <View style={styles.inputLayout}>
        <Image
          source={require("../assets/splash-icon.png")}
          style={styles.img}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter your goal"
          value={val}
          onChangeText={changeHandler}
        />
        <View style={styles.btnContainer}>
          <View style={styles.goalBtn}>
            <Button
              title="Add a goal"
              disabled={val === ""}
              onPress={() => clickHandler()}
            />
          </View>

          <View style={styles.closeBtn}>
            <Button title="Close" onPress={() => props.setIsOpen(false)} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  img: { width: 100, height: 100, alignSelf: "center", marginBottom: 14 },
  inputLayout: {
    paddingTop: 124,
    height: "100%",
    paddingLeft: 24,
    paddingRight: 24,
    backgroundColor: "purple",
  },
  input: {
    backgroundColor: "#fafafa",
    borderRadius: 4,
    paddingLeft: 14,
    marginBottom: 14,
  },

  btnContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
    flexWrap: "wrap",
  },
  goalBtn: {
    width: 120,
  },
  closeBtn: {
    width: 120,
  },
});
