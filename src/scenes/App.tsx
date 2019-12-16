import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import Login from "./Login";
import HomePage from "./HomeScreen";
import SimpleTabs from "./SimpleTabs";
import EditProfileScreen from "./EditProfileScreen";
import ProfileScreen from "./ProfileScreen";
import WebLoginSceen from "./WebLoginSceen";
import Splash from "./Splash";
import { View } from "react-native";


const RootStack = createStackNavigator(
  {
    Home: {
      screen: HomePage
    },
    Login: {
      screen: Login,
      navigationOptions: {
        header: null,
      }

    },
    SimpleTabs: {
      screen: SimpleTabs
    },
    EditProfileScreen: {
      screen: EditProfileScreen
    },
    ProfileScreen: {
      screen: ProfileScreen
    },
    WebLoginSceen: {
      screen: WebLoginSceen,
      navigationOptions: {
        header: null,
      }
    }, Splash: {
      screen: Splash,
      navigationOptions: {
        header: null,
      }
    }
  },
  {
    initialRouteName: "Splash"
  }

);

const AppContainer = createAppContainer(RootStack);
export default AppContainer;
