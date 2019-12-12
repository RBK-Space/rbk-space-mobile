import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import Login from "./Login";
import HomePage from "./HomeScreen";
import SimpleTabs from "./SimpleTabs";
import EditProfileScreen from "./EditProfileScreen";
import ProfileScreen from "./ProfileScreen";
import WebLoginSceen from "./WebLoginSceen";

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
    },
    EditProfileScreen: {
      screen: EditProfileScreen
    },
    ProfileScreen: {
      screen: ProfileScreen
    },
    WebLoginSceen: {
      screen: WebLoginSceen
    }
  },
  {
    initialRouteName: "Login"
  }
);

const AppContainer = createAppContainer(RootStack);
export default AppContainer;
