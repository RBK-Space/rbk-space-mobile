import React from "react";
import { View, Button, Alert } from "react-native";
import styles from "../styles/styles";
import ImageButton from "../components/ImageButton";
import { NavigationStackOptions } from "react-navigation-stack";

export interface Props {
  name: string;
  style?: Object;
  navigation?: any;
}

interface State {
  isLoading: boolean;
}

export default class Login extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    console.log("This is login ");
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ImageButton
          image="github"
          text="Login with github"
          border-Width="2px"
          onPress={() => this.props.navigation.navigate("SimpleTabs")}
        />
      </View>
    );
  }
}
