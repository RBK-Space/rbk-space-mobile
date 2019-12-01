import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Splash from "./src/scenes/Splash";
export default function App() {
  return (
    <View style={styles.container}>
      {/* <Text>RBK space </Text> */}
      <Splash name="splash"></Splash>
    </View>
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
