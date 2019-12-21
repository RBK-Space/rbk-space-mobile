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
import { Avatar, Icon, Header } from "react-native-elements";
import { Dialog } from "react-native-paper";
import {
  CirclesLoader,
  TextLoader,
} from "react-native-indicator";
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
      this.state = { data: null, isMine: true };
    }
    this.refreshProfile();

  }

  refreshProfile() {

    var that = this;
    SharedPreferences.getItem("userID", function (value) {
      console.log("the id ", value);
      // if(!this.state.isMine){
      //  value = this.props.data.userI
      // }
      var value = value;
      if (that.state.data) {
        value = that.state.data.userId + ""
      }
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


  logout() {
    const config = {
      url: URLS.LOGOUT_URL,
      method: 'GET',
    };

    const request = CallAPI(config, respnse => this.onlogoutSuccess(respnse), error => this.onlogoutError(error));

    this.props.navigation.replace("Login")
    SharedPreferences.setItem("userID", "");

  }

  onlogoutSuccess(response) {
    console.log(response)
  }


  onlogoutError(error) {
    console.log('onError: ', error);

  }


  render() {
    // console.log("State>>>", this.state)
    if (!this.state.data)
      return (
        <PTRView onRefresh={this.logout.bind(this)}>
          <View style={{ marginTop: "65%", marginStart: "45%" }}>
            {/* <Text style={{ fontSize: 15 }}>User Not Found </Text>
            <Text style={{ fontSize: 10, padding: 10 }}> */}
            {/* Swipe to login again */}
            {/* </Text> */}
            <CirclesLoader style={{ alignSelf: "center" }} color={"#7600AA"} />
            <TextLoader text="loading" />

          </View>
        </PTRView>
      );
    return (
      <View style={{ flex: 1 }}>
        <PTRView
          onRefresh={this._refresh.bind(this)}
          style={{ backgroundColor: "#F2F2F2" }}>
          {this.state.isMine ?
            <Header
              statusBarProps={{ barStyle: 'light-content' }}
              barStyle="light-content" // or directly
              centerComponent={<Image source={require('../assets/images/rbk_logo.png')} style={{ width: 100, height: 50, resizeMode: "stretch" }} />}
              rightComponent={<Icon
                name='sign-out'
                type='font-awesome'
                color={"#B41D91"}
                onPress={this.logout.bind(this)}

              />}
              containerStyle={{
                backgroundColor: 'white',
                justifyContent: 'space-around',
              }}
            /> : null}
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
