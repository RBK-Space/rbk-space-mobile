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
    this.state = { search: "", users: this.props.users };
  }
  updateSearch = search => {
    this.setState({ search });
    this.getUsers(search)
  };

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
      <View style={styles.defaultContainer}>
        <SearchBar
          round
          lightTheme
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
      </View>
    );
  }
}
