import React, { Component } from "react";
import styles from "../styles/styles";
import { Text, View, TouchableOpacity, Image } from "react-native";
const images = {
  github: {
    uri: require("../assets/images/ic_github_logo.png")
  }
};
export interface Props {
  image: string;
  text?: string;
  direction?: Number;

  onPress: () => void;
}

export default class ImageButton extends Component<Props> {
  constructor(props: Props) {
    super(props);
    // console.log("tagggg", props);
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
              paddingStart: 8,
              paddingEnd: 8,
              backgroundColor: "#FFFFFF",
              paddingTop: 4,
              paddingBottom: 4,
              borderRadius: 8,
              alignContent: "center",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: this.props.direction === 1 ? "column" : "row"
            }}
          >
            <Image
              style={styles.ImageIconStyle}
              source={images[this.props.image].uri}
            ></Image>
            <Text style={{
              fontFamily: 'Cochin',
              fontSize: 15,
            }}>{this.props.text}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}
