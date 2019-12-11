import React from "react";
import { View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import UserItem from "../scencesComponents/UserItem";
import userItem from "../data/User";
import Portofolio from "../data/Portofolio";
import PortofolioItem from "../scencesComponents/PortofolioItem";
export interface Props {
  Portofolio: Portofolio[];
}

interface State {}

export default class PortofolioScreen extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <View>
        <FlatList
          data={this.props.Portofolio}
          renderItem={({ item }) => (
            <PortofolioItem data={item}></PortofolioItem>
          )}
          keyExtractor={item => item.id + ""}
        />
      </View>
    );
  }
}
