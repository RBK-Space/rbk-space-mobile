import * as React from "react";
import { Button, View, Text } from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import Login from "./Login";
import HomePage from "./HomePage";
import SimpleTabs from "./SimpleTabs";

import { StyleSheet } from "react-native";

const RootStack = createStackNavigator(
  {
    Home: {
      screen: HomePage
    },
    Login: {
      screen: Login
    },
    SimpleTabs: {
      screen: SimpleTabs
    }
  },
  {
    initialRouteName: "Login"
  }
);

const AppContainer = createAppContainer(RootStack);

// export interface Props {
//   style?: Object;
// }
export default AppContainer;
// export default class App extends React.Component<Props> {
//   render() {
//     return <AppContainer />;
//   }
// }
