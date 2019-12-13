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
    console.log(response.data[0])
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
        <View>
          
          <Text>Not found</Text>
        </View>
      );
    return (

      <View style={{ padding: 8, flex: 1 }}>
        <PTRView onRefresh={this._refresh.bind(this)} >

          <View style={{ alignSelf: "baseline", justifyContent: "flex-end" }}>
            {this.state.isMine ?
              <Button
                title="Edit"
                onPress={() => this.props.navigation.navigate("EditProfileScreen", { "data": this.state.data })}
              ></Button> : null}
          </View>

          <Image
            source={{
              uri: this.state.data.image
            }}
            style={styles.ProfileImage}
            resizeMode="cover"
          ></Image>

          <View>
            <Text>{this.state.data.username}</Text>
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
