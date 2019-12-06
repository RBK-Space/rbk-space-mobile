import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import Login from "./Login";
import HomePage from "./HomeScreen";
import SimpleTabs from "./SimpleTabs";
import EditProfileScreen from "./EditProfileScreen";

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
    }
  },
  {
    initialRouteName: "Login"
  }
);

const AppContainer = createAppContainer(RootStack);
export default AppContainer;
