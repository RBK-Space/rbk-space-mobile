import React, { Component } from "react";
import styles from "../styles/styles";
import { Text, View, TouchableOpacity, Image } from "react-native";
const images = {
  github: {
    uri: require("../assets/images/ic_github_logo.png")
  },
  facebook: {
    uri: require("../assets/images/ic_facebook.png")
  },
  twitter: {
    uri: require("../assets/images/ic_twitter.png")
  },
  linkedin: {
    uri: require("../assets/images/ic_linkedin.jpg")
  }
};
export interface Props {
  image: string;
  direction?: Number;
  onPress: () => void;
}

export default class SocialButton extends Component<Props> {
  constructor(props: Props) {
    super(props);
    console.log("tagggg", props);
  }
  render() {
    return (
      <View>
        <TouchableOpacity
          onPress={() => this.props.onPress()}
          activeOpacity={0.5}
        >
          <View
            style={{
              paddingStart: 12,
              paddingEnd: 12,
              paddingTop: 4,
              paddingBottom: 4,
              alignContent: "center",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Image
              style={styles.socialImage}
              source={images[this.props.image].uri}
            ></Image>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}
