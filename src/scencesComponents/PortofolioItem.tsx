import styles from "../styles/styles";
import React from "react";
import { Text, View, TouchableOpacity, Image, Linking } from "react-native";
import TimeAgo from "react-native-timeago";
import User from "../data/User";
import Portofolio from "../data/Portofolio";

export interface Props {
  data: Portofolio;
}

interface State { }

export default class PortofolioItem extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.post_container}>
        <Text>{this.props.data.projectTitle}</Text>
        <Text>{this.props.data.projectDesc}</Text>
        <Text
          style={{ color: "blue" }}
          onPress={() => Linking.openURL(this.props.data.projectLink)}
        >
          {this.props.data.projectLink})
        </Text>
      </View>
    );
  }
}
