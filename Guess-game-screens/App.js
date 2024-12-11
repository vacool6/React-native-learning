import { StatusBar } from "expo-status-bar";
import { ImageBackground, StyleSheet, SafeAreaView } from "react-native";
import StartGame from "./components/StartGame";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import GameScreen from "./components/GameScreen";
import GameOver from "./components/GameOver";

export default function App() {
  const [selectedNumber, setNumber] = useState();
  const [gameOver, setGameOver] = useState(false);
  const [wrongGuesses, setWrongGuesses] = useState([]);

  let screen = <StartGame setNumber={setNumber} />;

  if (selectedNumber && !gameOver) {
    screen = (
      <GameScreen
        selectedNumber={selectedNumber}
        setGameOver={setGameOver}
        wrongGuesses={wrongGuesses}
        setWrongGuesses={setWrongGuesses}
      />
    );
  }

  if (gameOver) {
    screen = (
      <GameOver
        selectedNumber={selectedNumber}
        setNumber={setNumber}
        setGameOver={setGameOver}
        setWrongGuesses={setWrongGuesses}
        tries={wrongGuesses.length}
      />
    );
  }

  return (
    <LinearGradient colors={["orange", "pink"]} style={styles.container}>
      <ImageBackground
        style={styles.root}
        source={require("./assets/adaptive-icon.png")}
        resizeMode="cover"
        imageStyle={styles.imgStyle}
      >
        <StatusBar style="dark" />
        {screen}
      </ImageBackground>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  root: {
    height: "100%",
    width: "100%",
    alignItems: "center",
    paddingTop: 56,
  },
  container: {
    backgroundColor: "#fff",
  },
  imgStyle: {
    opacity: 0.25,
  },
});
