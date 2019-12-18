import React from "react";
import { View, Image, Text, Alert, Linking, ScrollView } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import UserItem from "../data/User";
import styles from "../styles/styles";
import SocialButton from "../components/SocailButton";
import UserProfileTab from "../scencesComponents/UserProfileTab";
import Button from "../components/Button";
import CallAPI from "../net/ApiUtils.js";
import SharedPreferences from "react-native-shared-preferences";
import URLS from "../net/ApiConst";
import User from "../data/User";
import PTRView from "react-native-pull-to-refresh";
import { Avatar, Icon } from "react-native-elements";
import { Dialog } from "react-native-paper";

export interface Props {
  data: UserItem;
  navigation?: any;
}

interface State {
  data: User;
  isMine: boolean;
}

export default class ProfileScreen extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    if (props.navigation.getParam("profile")) {
      this.state = {
        data: props.navigation.getParam("profile"),
        isMine: false
      };
    } else {
      this.state = { data: props.data, isMine: true };
      this.refreshProfile();
    }
  }

  refreshProfile() {

    var that = this;
    SharedPreferences.getItem("userID", function (value) {
      console.log("the id ", value);
      // if(!this.state.isMine){
      //  value = this.props.data.userI
      // }
      const config = {
        url: URLS.USER_ID + value,
        method: "GET"
      };
      const request = CallAPI(
        config,
        respnse => that.onLoginSuccess(respnse),
        error => that.onLoginError(error)
      );
    });
  }
  _refresh() {
    this.refreshProfile();
  }

  onLoginSuccess(response) {
    // console.log("user Profile", response)
    console.log(response.data);
    this.setState({
      data: response.data[0]
    });
    console.log("refresh!!");
  }

  onLoginError(error) {
    console.log("onError: ", error);
  }

  openUrl(url) {
    if (url === null || url === "") {
      Alert.alert("Can't open");
      return;
    }
    Linking.canOpenURL(url)
      .then(supported => {
        if (!supported) {
          console.log("Can't handle url: " + url);
          Alert.alert("Can't open");
        } else {
          return Linking.openURL(url);
        }
      })
      .catch(err => console.error("An error occurred", err));
  }
  render() {
    // console.log("State>>>", this.state)
    if (!this.state.data)
      return (
        <View
          style={{ justifyContent: "center", alignItems: "center", flex: 1 }}
        >
          <PTRView style onRefresh={this._refresh.bind(this)}>
            <View>
              <Text style={{ fontSize: 15 }}>User Not Found </Text>
              <Text style={{ fontSize: 10, padding: 10 }}>
                Swipe to refresh
              </Text>
            </View>
          </PTRView>
        </View>
      );
    return (
      <View style={{ flex: 1 }}>
        <PTRView
          onRefresh={this._refresh.bind(this)}
          style={{ backgroundColor: "#F2F2F2" }}
        >
          <View style={{ justifyContent: "flex-end", alignItems: "flex-end" }}>
            {this.state.isMine ? (
              <Icon
                raised
                name="edit"
                type="font-awesome"
                color="#B51983"
                onPress={() =>
                  this.props.navigation.navigate("EditProfileScreen", {
                    data: this.state.data
                  })
                }
              />
            ) : (
                <View style={{ padding: 8 }}></View>
              )}
          </View>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Avatar
              rounded
              title={
                this.state.data.fullName
                  ? this.state.data.fullName.substring(0, 2)
                  : "A"
              }
              size="xlarge"
              source={{
                uri: this.state.data.image
              }}
            />
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                {this.state.data.fullName}
              </Text>
              <Text>{this.state.data.cohort}</Text>
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              {this.state.data.fb === null ||
                this.state.data.fb === "" ? null : (
                  <SocialButton
                    image="facebook"
                    onPress={() => {
                      this.openUrl(this.state.data.fb);
                    }}
                  />
                )}
              {this.state.data.gh === null ||
                this.state.data.gh === "" ? null : (
                  <SocialButton
                    image="github"
                    onPress={() => this.openUrl(this.state.data.gh)}
                  />
                )}
              {this.state.data.tw === null ||
                this.state.data.tw === "" ? null : (
                  <SocialButton
                    image="twitter"
                    onPress={() => {
                      console.log("twitter");
                      this.openUrl(this.state.data.tw);
                    }}
                  />
                )}
              {this.state.data.li === null ||
                this.state.data.li === "" ? null : (
                  <SocialButton
                    image="linkedin"
                    onPress={() => this.openUrl(this.state.data.li)}
                  />
                )}
            </View>
          </View>
        </PTRView>

        <UserProfileTab data={this.state.data}></UserProfileTab>
      </View>
    );
  }
}
