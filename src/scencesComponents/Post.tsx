import styles from "../styles/styles";
import React from "react";
import { Text, View, TouchableOpacity, Image } from "react-native";
import PostItem from "../data/Posts";
import Moment from "moment";
import TimeAgo from "react-native-timeago";
import ReadMore from "react-native-read-more-text";

export interface Props {
  data: PostItem;
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
          <View style={{ justifyContent: "center" ,padding:8}}>
            <Text>{this.props.data.userName}</Text>
            <Text>
              <TimeAgo time={this.props.data.createdAt} />
            </Text>
          </View>
        </View>

        {/* <ReadMore numberOfLines={4}> */}
        <Text>{this.props.data.postBody}</Text>
        {/* </ReadMore> */}
      </View>
    );
  }
}
