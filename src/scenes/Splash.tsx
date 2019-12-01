import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { thisTypeAnnotation } from "@babel/types";
import HomePage from "./HomePage";
import styles from "../styles/styles";
import Login from "./Login";

export interface Props {
  name: string;
}

interface State {
  isLoading: boolean;
  isLogin: boolean;
}

export default class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { isLoading: false, isLogin: false };
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({ isLoading: true });
    }, 2000);
  }

  render() {
    if (!this.state.isLoading) {
      return (
        <View style={styles.container}>
          <Image
            source={require("../assets/images/ic_logo_white.png")}
            style={{ width: "60%", resizeMode: "contain" }}
          ></Image>
        </View>
      );
    } else if (this.state.isLogin) {
      return <HomePage></HomePage>;
    } else {
      return <Login style={styles.loginContainer} name="login"></Login>;
    }
  }
}
