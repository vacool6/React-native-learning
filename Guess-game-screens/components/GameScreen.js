import { Alert, FlatList, StyleSheet, Text, View } from "react-native";
import { CustomBtn } from "./CustomBtn";
import { useEffect, useState } from "react";

const GuessContainer = (props) => {
  const { data, length } = props;

  return (
    <View style={styles.guess}>
      <Text># {length - data.index}</Text>
      <Text>Guessed number - {data.item.guess}</Text>
    </View>
  );
};

const GameScreen = (props) => {
  const { selectedNumber } = props;
  const [low, setLow] = useState(1);
  const [high, setHigh] = useState(99);
  const [guess, setGuess] = useState(Math.floor((1 + 99) / 2));

  const handleHigh = () => {
    if (guess >= selectedNumber) {
      Alert.alert("Don't Lie!", "The number can't be higher than this.");
    } else {
      setLow(guess + 1);
      makeNextGuess(guess + 1, high);
    }
  };

  const handleLow = () => {
    if (guess <= selectedNumber) {
      Alert.alert("Don't Lie!", "The number can't be lower than this.");
    } else {
      setHigh(guess - 1);
      makeNextGuess(low, guess - 1);
    }
  };

  const makeNextGuess = (newLow, newHigh) => {
    const nextGuess = Math.floor((newLow + newHigh) / 2);
    setGuess(nextGuess);
  };

  useEffect(() => {
    if (selectedNumber == guess) {
      Alert.alert("Congrats", "You have won!");
      props.setGameOver(true);
    } else {
      props.setWrongGuesses([
        { guess, uniqueId: Math.random() },
        ...props.wrongGuesses,
      ]);
    }
  }, [guess]);

  return (
    <View>
      <Text style={styles.heading}>Try Guessing!</Text>
      <View>
        <CustomBtn handler={handleLow}>Low</CustomBtn>
        <CustomBtn handler={handleHigh}>High</CustomBtn>
      </View>

      <Text style={styles.text}>Your guesses!</Text>
      <FlatList
        data={props.wrongGuesses}
        renderItem={(item) => {
          return (
            <GuessContainer data={item} length={props.wrongGuesses.length} />
          );
        }}
        keyExtractor={(id) => id.uniqueId}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  heading: {
    borderColor: "gold",
    borderWidth: 2,
    fontSize: 24,
    padding: 10,
  },
  guesses: {
    marginTop: 18,
  },
  text: {
    fontSize: 20,
    marginBottom: 8,
  },
  guess: {
    borderWidth: 1,
    marginTop: 4,
    padding: 4,
    backgroundColor: "whitesmoke",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default GameScreen;
