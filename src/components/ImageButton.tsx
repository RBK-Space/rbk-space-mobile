import React, { Component } from "react";
import styles from "../styles/styles";
import { Text, View, TouchableOpacity, Image } from "react-native";
const images = {
  github: {
    uri: require("../assets/ic_github_logo.png")
  },
  banner: {
    //   uri: require('your-image-path/banner.png')
  }
};
export interface Props {
  image: string;
  text: string;
}

export default class ImageButton extends Component<Props> {
  constructor(props: Props) {
    super(props);
    console.log("tagggg", props);
  }
  render() {
    return (
      <View>
        <TouchableOpacity activeOpacity={0.5}>
          <View>
            <Image
              style={styles.ImageIconStyle}
              source={images[this.props.image].uri}
            ></Image>
            <Text>{this.props.text}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}
