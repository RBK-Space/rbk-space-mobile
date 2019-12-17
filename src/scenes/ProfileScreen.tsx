import React from "react";
import { View, Image, Text, Alert, Linking, ScrollView } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import UserItem from "../data/User";
import styles from "../styles/styles";
import SocialButton from "../components/SocailButton";
import UserProfileTab from "../scencesComponents/UserProfileTab";
import Button from "../components/Button";
import CallAPI from '../net/ApiUtils.js'
import SharedPreferences from 'react-native-shared-preferences';
import URLS from '../net/ApiConst';
import User from "../data/User";
import PTRView from 'react-native-pull-to-refresh';
import { Avatar, Icon } from "react-native-elements";

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
      this.state = { data: props.navigation.getParam("profile"), isMine: false };
    } else {
      this.state = { data: props.data, isMine: true };
      this.refreshProfile()
    }
  }

  refreshProfile() {
    var that = this;
    SharedPreferences.getItem("userID", function (value) {
      console.log("the id ", value);
      const config = {
        url: URLS.USER_ID + value,
        method: 'GET',
      };
      const request = CallAPI(config, respnse => that.onLoginSuccess(respnse), error => that.onLoginError(error));

    });
  }
  _refresh() {
    this.refreshProfile();
  }

  onLoginSuccess(response) {
    // console.log("user Profile", response)
    console.log(response.data)
    this.setState({
      data: response.data[0]
    })
    console.log("refresh!!")

  }

  onLoginError(error) {
    console.log('onError: ', error);
  }

  openFacebook(url: string) {
    Linking.canOpenURL(url)
      .then(supported => {
        if (!supported) {
          console.log("Can't handle url: " + url);
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
        <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
          <PTRView style onRefresh={this._refresh.bind(this)} >
            <View >
              <Text style={{ fontSize: 15 }}>User Not Found </Text>
              <Text style={{ fontSize: 10, padding: 10 }}>Swipe to refresh</Text>
            </View>
          </PTRView>

        </View>
      );
    return (

      <View style={{ padding: 8, flex: 1 }}>
        <PTRView onRefresh={this._refresh.bind(this)} >
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            {this.state.isMine ?
              // <Button
              //   title="Edit"
              //   onPress={() => this.props.navigation.navigate("EditProfileScreen", { "data": this.state.data })}
              // ></Button> 
              <Icon
                raised
                name='user-edit'
                type='font-awesome'
                color='#f50'
                onPress={() => this.props.navigation.navigate("EditProfileScreen", { "data": this.state.data })}
              />
              : null}
          </View>
          <Avatar
            rounded
            title={this.state.data.fullName ? this.state.data.fullName.substring(0, 2) : "A"}
            size="xlarge"
            source={{
              uri: this.state.data.image
            }}
          />
          <View>
            <Text style={{ fontWeight: "bold", fontSize: 14 }}>{this.state.data.fullName}</Text>
            <Text>{this.state.data.cohort}</Text>
          </View>
          <View style={{ flex: 1, flexDirection: "row" }}>
            <SocialButton
              image="facebook"
              onPress={() => {

                this.openFacebook(this.state.data.fb);
              }}
            />
            <SocialButton
              image="github"
              onPress={() => Linking.openURL(this.state.data.gh)}
            />
            <SocialButton
              image="twitter"
              onPress={() => {
                console.log("twitter");
                Linking.openURL(this.state.data.tw);
              }}
            />
            <SocialButton
              image="linkedin"
              onPress={() => Linking.openURL(this.state.data.li)}
            />
          </View>
        </PTRView>

        <UserProfileTab data={this.state.data}></UserProfileTab>
      </View>
    );
  }
}
