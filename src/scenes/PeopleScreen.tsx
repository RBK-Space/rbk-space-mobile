import React from "react";
import { View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import UserItem from "../scencesComponents/UserItem";
import userItem from "../data/User";
export interface Props {
  users: userItem[];
}

interface State {}

export default class HomeScreen extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    console.log(this.props.users);
    return (
      <View>
        <FlatList
          data={this.props.users}
          renderItem={({ item }) => <UserItem data={item}></UserItem>}
          keyExtractor={item => item.userId + ""}
        />
      </View>
    );
  }
}
