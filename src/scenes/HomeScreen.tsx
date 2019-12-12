import React from "react";
import { StyleSheet, Text, View } from "react-native";
import styles from "../styles/styles";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import Post from "../scencesComponents/Post";
import PostItem from "../data/Posts";
import AddPost from "../scencesComponents/AddPost";
import { SearchBar } from 'react-native-elements';
import CallAPI from '../net/ApiUtils.js'
import URLS from '../net/ApiConst';
import DialogProgress from 'react-native-dialog-progress'

export interface Props {
  posts: PostItem[];
}

interface State {
  search: string;
  posts: PostItem[];
}
const dialogOptions = {
  title: "Loading",
  message: "This is a message!",
  isCancelable: true
}

export default class HomeScreen extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { search: "", posts: this.props.posts }
  }
  updateSearch = search => {
    this.setState({ search });
    this.getData()
  };


  componentDidMount() {
    this.getData()
    // const config = {
    //   url: URLS.POSTS_URL,
    //   method: 'GET',
    // };
    // const request = CallAPI(config, respnse => this.onLoginSuccess(respnse), error => this.onLoginError(error));
  }

  getData() {
    const config = {
      url: URLS.POSTS_URL + "/?query=" + this.state.search,
      method: 'GET',
    };
    const request = CallAPI(config, respnse => this.onLoginSuccess(respnse), error => this.onLoginError(error));

  }
  onLoginSuccess(response) {
    console.log(response)
    this.setState({
      posts: response.data[0]
    })

  }

  onLoginError(error) {
    console.log('onError: ', error);
  }
  render() {
    const { search } = this.state;
    console.log(this.props.posts);
    return (
      <ScrollView>
        <View style={{ flex: 1 }}>
          <SearchBar
            round
            lightTheme
            placeholder="Type Here..."
            onChangeText={this.updateSearch.bind(this)}
            value={search}
          />
          <AddPost getData={this.getData.bind(this)}></AddPost>
          <FlatList
            style={{ flex: 1 }}
            data={this.state.posts}
            renderItem={({ item }) => <Post data={item}></Post>}
            keyExtractor={item => item.postId + ""}
          />
        </View></ScrollView>
    );
  }
}

