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
    return <PeopleScreen users={users} />;
  }
}

interface MyProfileScreenProps {
  navigation: NavigationScreenProp<NavigationState>;
}
class MyProfileScreen extends React.Component<MyProfileScreenProps> {
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

  componentDidMount() {
    console.log(profile);
  }

  onEvent = (a: NavigationEventPayload) => {
    console.log("EVENT ON CHAT TAB", a.type, a);
  };
  render() {
    return (
      <View style={{ flex: 1 }}>
        <ProfileScreen
          data={profile}
          navigation={this.props.navigation}
        ></ProfileScreen>
      </View>
    );
  }
}

const MySettingsScreen = ({}) => <EditProfileScreen />;

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

class SimpleTabsContainer extends React.Component<SimpleTabsContainerProps> {
  static router = SimpleTabs.router;
  s0: NavigationEventSubscription | null = null;
  s1: NavigationEventSubscription | null = null;
  s2: NavigationEventSubscription | null = null;
  s3: NavigationEventSubscription | null = null;

  componentDidMount() {
    console.log("posts>>", posts);
    // this.s0! = this.props.navigation.addListener('willFocus', this.onAction);
    // this.s1! = this.props.navigation.addListener('didFocus', this.onAction);
    // this.s2! = this.props.navigation.addListener('willBlur', this.onAction);
    // this.s3! = this.props.navigation.addListener('didBlur', this.onAction);
  }
  componentWillUnmount() {
    // this.s0!.remove();
    // this.s1!.remove();
    // this.s2!.remove();
    // this.s3!.remove();
  }
  onAction = (a: NavigationEventPayload) => {
    console.log("TABS EVENT", a.type, a);
  };
  render() {
    return <SimpleTabs navigation={this.props.navigation} />;
  }
}

export default SimpleTabsContainer;
