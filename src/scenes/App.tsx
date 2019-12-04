import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import Login from "./Login";
import HomePage from "./HomeScreen";
import SimpleTabs from "./SimpleTabs";

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
