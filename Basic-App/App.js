import { useState } from "react";
import { Button, FlatList, ScrollView, StyleSheet, View } from "react-native";

import GoalComp from "./components/GoalComp";
import { GoalInput } from "./components/GoalInput";

export default function App() {
  const [goals, setGoals] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <View style={styles.container}>
      <Button title="Add a Goal!" onPress={() => setIsOpen(true)} />
      <GoalInput
        goals={goals}
        setGoals={setGoals}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
      {/* <ScrollView>
        <Text style={{ fontSize: 18 }}>Your list</Text>
        {goals.map((e, index) => (
          <Text key={index} style={styles.goal}>
            ⁍ {e}
          </Text>
        ))}
      </ScrollView> */}
      <FlatList
        data={goals}
        renderItem={(item) => {
          return (
            <GoalComp
              itemName={item.item.itemName}
              goals={goals}
              setGoals={setGoals}
            />
          );
        }}
        keyExtractor={(item) => item.uniqueKey}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    paddingLeft: 10,
    paddingRight: 10,
  },
  inputLayout: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    paddingBottom: 24,
    borderBottomColor: "grey",
    borderBottomWidth: 2,
  },
  input: {
    width: "60%",
    backgroundColor: "#fafafa",
    height: 36,
    borderWidth: 1,
    borderColor: "black",
  },
  goal: {
    backgroundColor: "#f9f9f9",
    borderRadius: 4,
    padding: 10,
    marginTop: 6,
    marginBottom: 6,
  },
});
