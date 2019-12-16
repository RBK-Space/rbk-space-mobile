import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Splash from "./src/scenes/Splash";
import AppContainer from "./src/scenes/App";
export default function App() {
  return (
    <AppContainer ></AppContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
