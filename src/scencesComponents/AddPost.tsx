import styles from "../styles/styles";
import React from "react";
import { View, Alert } from "react-native";
import { TextInput } from "react-native";
import CallAPI from "../net/ApiUtils.js";
import URLS from "../net/ApiConst";
import SharedPreferences from "react-native-shared-preferences";
import DialogProgress from "react-native-dialog-progress";
import { Button, Input } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
const dialogOptions = {
  title: "Loading",
  message: "This is a message!",
  isCancelable: true
};
export interface Props {
  onPress?: any;
  getData?: any;
}

interface State {
  text: string;
  userID: string;
}

export default class AddPost extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { text: "", userID: "" };
    var that = this;
    SharedPreferences.getItem("userID", function (value) {
      console.log(value);
      that.setState({ userID: value });
    });
  }
  onChangeText(text: string) {
    // console.log(text);
    this.setState({ text });
  }

  post() {
    var postType = 0;
    var postBody = this.state.text;
    var userId = this.state.userID;
    const config = {
      url: URLS.POST_Add,
      method: "POST",
      data: { postType, postBody, userId }
    };
    if (postBody === "") {
      Alert.alert("Add post please!");
    } else {
      const request = CallAPI(
        config,
        respnse => this.onLoginSuccess(respnse),
        error => this.onLoginError(error)
      );
      DialogProgress.show(dialogOptions);
    }
  }
  onLoginSuccess(response) {
    // console.log(response)
    Alert.alert("Success");
    this.props.getData();
    this.setState({ text: "" });
    DialogProgress.hide();
  }

  onLoginError(error) {
    Alert.alert("Error");
    DialogProgress.hide();

    console.log("onError: ", error);
  }

  render() {
    return (
      <View>
        <Input
          numberOfLines={4}
          style={{
            borderColor: "gray",
            borderRadius: 4,
            borderWidth: 0.5,
            fontSize: 15,
            textAlignVertical: 'top',
            alignSelf: "baseline",
            justifyContent: "flex-start"
          }}
          placeholder="type here ..."
          value={this.state.text}
          onChangeText={text => this.onChangeText(text)}
        />
        <Button
          icon={<Icon name="paper-plane" size={15} color="white" />}
          title="  Post  "
          buttonStyle={{ backgroundColor: "#B51983", marginTop: 8 }}
          onPress={() => this.post()}
          iconRight
        />
        {/* <Button style={{ backgroundColor: "#690047" }} title="Post" onPress={() => this.post()}></Button> */}
      </View>
    );
  }
}
