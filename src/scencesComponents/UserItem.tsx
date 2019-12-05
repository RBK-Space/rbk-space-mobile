import styles from "../styles/styles";
import React from "react";
import { Text, View, TouchableOpacity, Image } from "react-native";
import TimeAgo from "react-native-timeago";
import User from "../data/User";

export interface Props {
  data: User;
}

interface State {}

export default class Login extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.post_container}>
        <View style={styles.post_user}>
          <Image
            source={{
              uri: this.props.data.image
            }}
            style={styles.userImage}
            resizeMode="cover"
          ></Image>
          <View style={{ justifyContent: "center", padding: 8 }}>
            <Text>{this.props.data.userName}</Text>
            <Text>{this.props.data.cohort}</Text>
          </View>
        </View>
      </View>
    );
  }
}
