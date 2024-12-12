import { Alert, StyleSheet, TextInput, View } from "react-native";
import { CustomBtn } from "./CustomBtn";
import { useState } from "react";

const StartGame = (props) => {
  const [val, setVal] = useState("");

  function resetHandler() {
    setVal("");
  }

  function confirmHandler() {
    const number = parseInt(val);

    if (number <= 0 || number > 99 || isNaN(number)) {
      Alert.alert("OOPS!", "Number is either nan or is out of range (1-99)", [
        { title: "Reset", onPress: () => resetHandler() },
      ]);

      return;
    }
    props.setNumber(val);
  }

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="XYZ"
          keyboardType="numeric"
          style={styles.input}
          onChangeText={(num) => setVal(num)}
          value={val}
        />
      </View>
      <CustomBtn handler={resetHandler}>Reset</CustomBtn>
      <CustomBtn handler={confirmHandler}>Confirm</CustomBtn>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "grey",
    width: "75%",
    borderRadius: 12,
    padding: 2,
    alignItems: "center",
  },
  inputContainer: {
    alignItems: "center",
    marginBottom: 12,
  },
  input: {
    borderBottomWidth: 2,
    borderBottomColor: "gold",
    color: "gold",
    fontSize: 24,
    height: 54,
    width: 42,
  },
});

export default StartGame;
