import React from "react";
import { Ionicons } from "@expo/vector-icons";
import {
  FlatList,
  NavigationEventSubscription,
  NavigationScreenProp,
  SafeAreaView,
  Themed,
  ScrollView,
  NavigationEventPayload,
  NavigationState
} from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { Button } from "../components/ButtonWithMargin";
import SampleText from "./SampleText";
import HomeScreen from "./HomeScreen";
import PeopleScreen from "./PeopleScreen";
import posts from "../data/dummy.js";
import users from "../data/users.js";
import ProfileScreen from "./ProfileScreen";
import profile from "../data/profile.js";
import EditProfileScreen from "./EditProfileScreen";
import { View } from "react-native";
import userItem from "../data/User";

import Posts from '../data/Posts'
import SettingsScreen from "./SettingsScreen";

const MyHomeScreen = ({
  navigation
}: {
  navigation: NavigationScreenProp<NavigationState>;
}) => <HomeScreen posts={posts} />;
MyHomeScreen.navigationOptions = {
  tabBarIcon: ({
    tintColor,
    horizontal
  }: {
    tintColor: string;
    focused: boolean;
    horizontal: boolean;
  }) => (
      <Ionicons
        name="ios-home"
        size={horizontal ? 20 : 26}
        style={{ color: tintColor }}
      />
    ),
  tabBarLabel: "Home",
  tabBarTestIDProps: {
    accessibilityLabel: "TEST_ID_HOME_ACLBL",
    testID: "TEST_ID_HOME"
  }
};

interface MyPeopleScreenProps {
  navigation: NavigationScreenProp<NavigationState>;
}
class MyPeopleScreen extends React.Component<MyPeopleScreenProps> {
  static navigationOptions = {
    tabBarIcon: ({
      tintColor,
      horizontal
    }: {
      tintColor: string;
      focused: boolean;
      horizontal: boolean;
    }) => (
        <Ionicons
          name="ios-people"
          size={horizontal ? 20 : 26}
          style={{ color: tintColor }}
        />
      ),
    tabBarLabel: "People"
  };

  onEvent = (a: NavigationEventPayload) => {
    console.log("EVENT ON PEOPLE TAB", a.type, a);
  };
  render() {
    return <PeopleScreen navigation={this.props.navigation}
      users={users} />;
  }
}

interface MyProfileScreenProps {
  navigation: NavigationScreenProp<NavigationState>;
}
interface MyProfileState {
  userID: string;
  profile: userItem;
}
class MyProfileScreen extends React.Component<MyProfileScreenProps, MyProfileState> {
  id: string;

  constructor(props: MyProfileScreenProps) {
    super(props)
    this.state = { userID: "", profile: profile }

  }

  static navigationOptions = {
    tabBarIcon: ({
      tintColor,
      horizontal
    }: {
      tintColor: string;
      focused: boolean;
      horizontal: boolean;
    }) => (
        <Ionicons
          name="ios-people"
          size={horizontal ? 20 : 26}
          style={{ color: tintColor }}
        />
      ),
    tabBarLabel: "Profile"
  };


  render() {
    return (
      <View style={{ flex: 1 }}>
        <ProfileScreen
          data={this.state.profile}
          navigation={this.props.navigation}
        ></ProfileScreen>
      </View>
    );
  }
}
interface SimpleTabsContainerProps {
  navigation: NavigationScreenProp<NavigationState>;
}

const MySettingsScreen = (props) => <SettingsScreen navigation={props.navigation} />;

MySettingsScreen.navigationOptions = {
  tabBarIcon: ({
    tintColor,
    horizontal
  }: {
    tintColor: string;
    focused: boolean;
    horizontal: boolean;
  }) => (
      <Ionicons
        name="ios-settings"
        size={horizontal ? 20 : 26}
        style={{ color: tintColor }}
      />
    ),
  tabBarLabel: "Settings"
};

const SimpleTabs = createBottomTabNavigator(
  {
    Home: {
      path: "home",
      screen: MyHomeScreen
    },
    Chat: {
      path: "chat",
      screen: MyProfileScreen
    },
    People: {
      path: "cart",
      screen: MyPeopleScreen
    },
    Settings: {
      path: "settings",
      screen: MySettingsScreen
    }
  },
  {
    backBehavior: "history",
    tabBarOptions: {
      activeTintColor: "#e91e63"
    }
  }
);

interface SimpleTabsContainerProps {
  navigation: NavigationScreenProp<NavigationState>;
}

interface State {
  posts: Posts
}
class SimpleTabsContainer extends React.Component<SimpleTabsContainerProps, State> {
  static router = SimpleTabs.router;

  // componentDidMount() {
  //   const config = {
  //     url: POSTS_URL,
  //     method: 'GET',
  //   };
  //   const request = CallAPI(config, respnse => this.onLoginSuccess(respnse), error => this.onLoginError(error));
  // }
  // onLoginSuccess(response) {
  //   console.log(response)

  // }

  // onLoginError(error) {
  //   console.log('onError: ', error);
  // }

  onAction = (a: NavigationEventPayload) => {
    console.log("TABS EVENT", a.type, a);
  };
  render() {
    return <SimpleTabs navigation={this.props.navigation} />;
  }
}

export default SimpleTabsContainer;
