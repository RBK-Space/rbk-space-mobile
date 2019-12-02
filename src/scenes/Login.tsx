import React from "react";
import { View, Button, Alert } from "react-native";
import styles from "../styles/styles";
import ImageButton from "../components/ImageButton";
export interface Props {
  name: string;
  style?: Object;
}

interface State {
  isLoading: boolean;
}

export default class Login extends React.Component<Props, State> {
  render() {
    return (
      <View style={styles.loginContainer}>
        <ImageButton
          image="github"
          text="Login with github"
          border-Width="2px"
          onPress={() => {
            // alert("You tapped the button!");
            console.log("press login with github ");
          }}
        />
      </View>
    );
  }
}
