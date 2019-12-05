import styles from "../styles/styles";
import React from "react";
import { View, Button, Alert } from "react-native";
import { TextInput } from "react-native";

export interface Props {
  onPress?: any;
}

interface State {}

export default class AddPost extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }
  onChangeText(text: string) {
    console.log(text);
  }

  render() {
    return (
      <View>
        <TextInput
          multiline={true}
          numberOfLines={4}
          style={{
            margin: 10,
            borderColor: "gray",
            borderRadius: 4,
            borderWidth: 0.5
          }}
          onChangeText={text => this.onChangeText(text)}
        />
        <Button title="Post" onPress={() => Alert.alert("Post")}></Button>
      </View>
    );
  }
}
