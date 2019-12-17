import React from "react";
import { View, TouchableHighlight } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import UserItem from "../scencesComponents/UserItem";
import userItem from "../data/User";
import styles from "../styles/styles";
import { SearchBar } from "react-native-elements";
import profile from "../data/profile.js";
import CallAPI from '../net/ApiUtils.js'
import URLS from '../net/ApiConst';
import PTRView from 'react-native-pull-to-refresh';
import {
  CirclesLoader,
  ColorDotsLoader,
  TextLoader,
  NineCubesLoader
} from "react-native-indicator";
export interface Props {
  users: userItem[];
  navigation?: any;
}

interface State {
  search: string;
  users: userItem[];
}

export default class HomeScreen extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { search: "", users: null };
  }
  updateSearch = search => {
    this.setState({ search });
    this.getUsers(search)
  };
  _refresh() {
    this.getUsers();
  }

  componentDidMount() {
    this.getUsers()
  }
  getUsers(query?: string) {

    const config = {
      url: URLS.USERS_URL,
      method: 'GET',
    };
    if (query) {
      config.url = URLS.USERS_URL + "/?query=" + query
    }
    const request = CallAPI(config, respnse => this.onLoginSuccess(respnse), error => this.onLoginError(error));
  }
  onLoginSuccess(response) {
    console.log(">>>.", response)

    this.setState({
      users: response.data
    })

  }

  onLoginError(error) {
    console.log('onError: ', error);
  }

  render() {
    const { search } = this.state;

    console.log(">>>>>", this.state.users);
    return (
      <PTRView onRefresh={this._refresh.bind(this)} >
        {this.state.users ?
          <View style={styles.defaultContainer}>
            <SearchBar
              round
              lightTheme
              containerStyle={{ backgroundColor: "#fff", borderWidth: 0, shadowColor: "white" }}
              inputContainerStyle={{ backgroundColor: "#E7E4E7" }}
              placeholder="Type Here..."

              onChangeText={this.updateSearch.bind(this)}
              value={search}
            />
            <FlatList
              data={this.state.users}
              renderItem={({ item }) => (

                <UserItem data={item} navigation={this.props.navigation} ></UserItem>
              )}
              keyExtractor={item => item.userId + ""}
            />
          </View> :
          <View style={{ marginTop: "65%", marginStart: "45%" }}>
            <CirclesLoader color={"#7600AA"} />
            <TextLoader text="loading" />
          </View>}
      </PTRView>

    );
  }
}
