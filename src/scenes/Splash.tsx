import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { thisTypeAnnotation } from "@babel/types";
import HomeScreen from "./HomeScreen";
import styles from "../styles/styles";
import Login from "./Login";
import SimpleTabsContainer from "./SimpleTabs";
import AppContainer from "./App";
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
      // return <HomeScreen ></HomeScreen>;
    } else {
      return (
        <View style={styles.loginContainer}>
          {/* <Login name="login"></Login> */}
          <AppContainer></AppContainer>
        </View>
      );
    }
  }
}
