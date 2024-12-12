import { Image, StyleSheet, Text, View, Dimensions } from "react-native";
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
    <View style={styles.container}>
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

// Dimensions API ===========
const deviceWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  imgContainer: {
    width: deviceWidth < 380 ? 100 : 250,
    height: deviceWidth < 380 ? 100 : 250,
    borderRadius: deviceWidth < 380 ? 100 / 2 : 250 / 2,
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
