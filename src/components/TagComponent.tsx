import React, { Component } from "react";
import styles from "../styles/styles";
import { Text, View, TouchableOpacity, Image } from "react-native";

export interface Props {
  title: String;
}

export default class TagComponent extends Component<Props> {
  constructor(props: Props) {
    super(props);
    // console.log("tagggg", props);
  }
  render() {
    return (
      <View>
        <TouchableOpacity activeOpacity={0.5}>
          <View
            style={styles.tag_container}
          >
            <Text>{this.props.title}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}
