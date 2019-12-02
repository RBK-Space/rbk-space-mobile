import React from "react";
import { StyleSheet, Text, View } from "react-native";
import styles from "../styles/styles";
export interface Props {}

interface State {}

export default class HomePage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <View>
        <Text>HomePage</Text>
      </View>
    );
  }
}
