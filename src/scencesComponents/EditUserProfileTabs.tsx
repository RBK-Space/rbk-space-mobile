import * as React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { TabView, SceneMap } from "react-native-tab-view";
import EditPtofileBasicInfoScreen from "../scenes/EditPtofileBasicInfoScreen";
import UserProfile from "../data/UserProfile";
import EditContactScreen from "../scenes/EditContactScreen";
export interface Props {
  data: UserProfile;
}

export default class EditUserProfileTabs extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }
  state = {
    index: 0,
    routes: [
      { key: "first", title: "Basic info" },
      { key: "second", title: "Contact info" },
      { key: "third", title: "Portfolio" }

    ]
  };

  render() {
    return (
      <TabView
        navigationState={this.state}
        renderScene={SceneMap({
          first: () => <EditPtofileBasicInfoScreen data={this.props.data} />,
          second: () => <EditContactScreen></EditContactScreen>,
          third: () => <EditContactScreen></EditContactScreen>
        })}
        onIndexChange={index => this.setState({ index })}
        initialLayout={{ width: Dimensions.get("window").width }}
      />
    );
  }
}
