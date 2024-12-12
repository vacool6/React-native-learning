import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { CustomBtn } from "./CustomBtn";
import { useEffect, useState } from "react";

const GuessContainer = (props) => {
  const { data, length } = props;

  return (
    <View style={styles.guess}>
      <Text># {length - data.index}</Text>
      <Text>Guessed number- {data.item.guess}</Text>
    </View>
  );
};

const GameScreen = (props) => {
  const { selectedNumber } = props;
  const [low, setLow] = useState(1);
  const [high, setHigh] = useState(99);
  const [guess, setGuess] = useState(Math.floor((1 + 99) / 2));

  const { height } = useWindowDimensions();

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

  let content = (
    <>
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
    </>
  );

  if (height < 380) {
    content = (
      <>
        <Text style={styles.heading}>Try Guessing!</Text>
        <View style={styles.btnContainer}>
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
      </>
    );
  }

  return <View style={{ marginBottom: 10 }}>{content}</View>;
};

const styles = StyleSheet.create({
  heading: {
    borderColor: "gold",
    borderWidth: 2,
    fontSize: 24,
    padding: 10,
    textAlign: "center",
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
  btnContainer: {
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 10,
  },
});

export default GameScreen;
