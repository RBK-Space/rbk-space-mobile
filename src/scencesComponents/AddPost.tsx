import styles from "../styles/styles";
import React from "react";
import { View, Alert } from "react-native";
import { TextInput } from "react-native";
import CallAPI from "../net/ApiUtils.js";
import URLS from "../net/ApiConst";
import SharedPreferences from "react-native-shared-preferences";
import DialogProgress from "react-native-dialog-progress";
import { Button, Input, Icon } from "react-native-elements";
import ImagePicker from "react-native-image-picker";
import { RNS3 } from "react-native-s3-upload";
import config from "../../config/config.json";
// import Icon from "react-native-vector-icons/FontAwesome";
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
  image: string;
}

export default class AddPost extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { text: "", userID: "", image: "" };
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

  post(image, type) {
    var postType = type || 0;
    var postBody = image || this.state.text;
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


  chooseImage() {
    ImagePicker.showImagePicker(options, response => {
      console.log("Response = ", response);
      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else if (response.customButton) {
        console.log("User tapped custom button: ", response.customButton);
      } else {
        const source = { uri: response.uri };
        console.log(source);
        this.setState({
          image: source.uri
        });
        this.uploadImage()
      }
    });
  }


  uploadImage() {
    DialogProgress.show(dialogOptions);
    const file = {
      uri: this.state.image,
      name: `rbk-space${new Date().getTime()}.jpg`,
      type: "image/jpeg"
    }

    RNS3.put(file, config.Awsconfig).then(response => {
      if (response.status !== 201) {
        console.log(response);
      } else {
        console.log(response.body);
        this.setState({
          image: response.body.postResponse.location,
        });
        //after upload image on Aws push for the edit profile
        this.post(this.state.image, 1)
      }
    });
  }

  render() {
    return (
      <View >

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
        <View style={{ flex: 1, alignContent: "flex-end", alignItems: "flex-end", justifyContent: "flex-end", marginEnd: 20, marginTop: 8 }}>
          <Icon
            name="camera"
            type="font-awesome"
            color="#B51983"
            onPress={() => {
              this.chooseImage()
            }
            }
          />
        </View>
        <Button
          icon={<Icon name="paper-plane" type="font-awesome"
            size={15} color="white" />}
          title="  Post  "
          buttonStyle={{ backgroundColor: "#B51983", marginTop: 8 }}
          onPress={() => this.post(this.state.text, 0)}
          iconRight
        />
        {/* <Button style={{ backgroundColor: "#690047" }} title="Post" onPress={() => this.post()}></Button> */}
      </View>
    );
  }
}

const options = {
  title: "Select Image",
  storageOptions: {
    skipBackup: true,
    path: "images",
    cameraRoll: true,
    waitUntilSaved: true
  }
};
