import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { thisTypeAnnotation } from "@babel/types";
import HomeScreen from "./HomeScreen";
import styles from "../styles/styles";
import Login from "./Login";
import SimpleTabsContainer from "./SimpleTabs";
import AppContainer from "./App";
import Test from "./WebLoginSceen"
import SharedPreferences from 'react-native-shared-preferences';

export interface Props {
  name: string;
  navigation: any
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
    console.log("Helloo")
    var that = this;
    setTimeout(() => {
      that.setState({ isLoading: true });

      SharedPreferences.getItem("userID", function (value) {
        console.log("the id ", value);
        if (value !== "")
          that.props.navigation.replace("SimpleTabs")
        else {
          that.props.navigation.replace("Login")

        }

      });
    }, 2000);
  }

  render() {
    return (
      <Image
        source={require("../assets/images/bg_splash.png")}
      // style={{ width: "60%", resizeMode: "contain" }}
      ></Image>

    );


  }
}
