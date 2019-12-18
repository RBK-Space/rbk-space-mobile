import styles from "../styles/styles";
import React from "react";
import { Text, View, TouchableOpacity, Image, Linking } from "react-native";
import TimeAgo from "react-native-timeago";
import User from "../data/User";
import Portofolio from "../data/Portofolio";
import { Card } from "react-native-elements";

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
      <Card containerStyle={{ borderRadius: 8, shadowColor: "#E7E4E7", padding: 0 }}>
        <View style={styles.post_container}>
          <Text style={styles.title_text}>{this.props.data.projectTitle}</Text>
          <Text
            style={{ color: "blue" }}
            onPress={() => Linking.openURL(this.props.data.projectLink)}
          >
            {this.props.data.projectLink})
        </Text>
          <Text>{this.props.data.projectDesc}</Text>
        </View>
      </Card>
    );
  }
}
