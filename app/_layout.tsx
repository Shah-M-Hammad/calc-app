import React, { useState } from "react";
import {
  Dimensions,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// Get screen width for responsive layout
const screenWidth = Dimensions.get("window").width;

export default function App() {
  // ------------------ State Management ------------------
  const [expression, setExpression] = useState(""); // Stores full user expression
  const [result, setResult] = useState(""); // Stores calculated result

  // ------------------ Handlers ------------------

  // Append digit or operator to expression
  const handlePress = (value: string) => {
    setExpression((prev) => prev + value);
  };

  // Clear all inputs
  const handleClear = () => {
    setExpression("");
    setResult("");
  };

  // Delete last character
  const handleBackspace = () => {
    setExpression((prev) => prev.slice(0, -1));
  };

  // Calculate result safely
  const handleCalculate = () => {
    try {
      // Replace special symbols for JS evaluation
      let sanitized = expression
        .replace(/÷/g, "/")
        .replace(/×/g, "*")
        .replace(/√/g, "Math.sqrt")
        .replace(/\^/g, "**");

      // Evaluate and round result
      const evalResult = eval(sanitized);
      setResult(evalResult.toString());
    } catch (error) {
      setResult("Error");
    }
  };

  // ------------------ UI Buttons ------------------
  const buttons = [
    ["C", "⌫", "%", "÷"],
    ["7", "8", "9", "×"],
    ["4", "5", "6", "-"],
    ["1", "2", "3", "+"],
    ["√", "0", "^", "="],
  ];

  // ------------------ Render ------------------
  return (
    <SafeAreaView style={styles.container}>
      {/* Display Section */}
      <View style={styles.displayContainer}>
        <Text style={styles.expressionText}>{expression || "0"}</Text>
        <Text style={styles.resultText}>{result ? "= " + result : ""}</Text>
      </View>

      {/* Buttons Section */}
      <View style={styles.buttonContainer}>
        {buttons.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {row.map((btn) => (
              <TouchableOpacity
                key={btn}
                style={[
                  styles.button,
                  btn === "=" && styles.equalsButton,
                  btn === "C" && styles.clearButton,
                ]}
                onPress={() => {
                  if (btn === "C") handleClear();
                  else if (btn === "=") handleCalculate();
                  else if (btn === "⌫") handleBackspace();
                  else handlePress(btn);
                }}
              >
                <Text
                  style={[
                    styles.buttonText,
                    (btn === "=" || btn === "C") && styles.specialText,
                  ]}
                >
                  {btn}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
}

// ------------------ Styles ------------------
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0D1117",
    justifyContent: "flex-end",
  },
  displayContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-end",
    padding: 20,
  },
  expressionText: {
    fontSize: 36,
    color: "#E6EDF3",
    marginBottom: 10,
  },
  resultText: {
    fontSize: 28,
    color: "#58A6FF",
  },
  buttonContainer: {
    paddingBottom: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 10,
    marginBottom: 12,
  },
  button: {
    width: screenWidth / 4 - 15,
    height: 70,
    borderRadius: 18,
    backgroundColor: "#161B22",
    justifyContent: "center",
    alignItems: "center",
  },
  equalsButton: {
    backgroundColor: "#238636",
  },
  clearButton: {
    backgroundColor: "#DA3633",
  },
  buttonText: {
    fontSize: 24,
    color: "#E6EDF3",
    fontWeight: "500",
  },
  specialText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
});
