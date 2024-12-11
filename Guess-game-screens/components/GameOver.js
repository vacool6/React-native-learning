import { Image, StyleSheet, Text, View } from "react-native";
import { CustomBtn } from "./CustomBtn";

const GameOver = ({
  selectedNumber,
  setNumber,
  setGameOver,
  tries,
  setWrongGuesses,
}) => {
  function gameOver() {
    setNumber("");
    setGameOver(false);
    setWrongGuesses([]);
  }
  return (
    <View>
      <Image
        source={require("../assets/splash-icon.png")}
        style={styles.imgContainer}
      />
      <View>
        <Text style={styles.text}>
          Your phone took {tries} tries to guess {selectedNumber}
        </Text>
      </View>
      <CustomBtn handler={gameOver}>Start a new game</CustomBtn>
    </View>
  );
};

const styles = StyleSheet.create({
  imgContainer: {
    width: 250,
    height: 250,
    borderRadius: 250 / 2,
    borderWidth: 4,
    borderColor: "green",
  },
  text: {
    textAlign: "center",
    marginTop: 12,
    marginBottom: 12,
    fontSize: 28,
  },
});

export default GameOver;
