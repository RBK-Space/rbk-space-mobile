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
import PTRView from 'react-native-pull-to-refresh';
import {
  CirclesLoader,
  ColorDotsLoader,
  TextLoader,
  NineCubesLoader
} from "react-native-indicator";
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
    this.state = { search: "", posts: null }
  }
  updateSearch = search => {
    this.setState({ search });
    this.getData()
  };
  componentDidMount() {
    this.getData()

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
      posts: response.data
    })

  }

  onLoginError(error) {
    console.log('onError: ', error);
  }
  _refresh() {
    this.getData();
  }

  render() {
    const { search } = this.state;
    console.log(this.props.posts);
    return (
      <PTRView onRefresh={this._refresh.bind(this)} >
        {this.state.posts ?
          <View>
            <ScrollView>
              <View style={{ flex: 1 }}>
                <SearchBar
                  round
                  lightTheme
                  containerStyle={{ backgroundColor: "#fff", borderWidth: 0 }}
                  inputContainerStyle={{ backgroundColor: "#E7E4E7" }}
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
              </View>
            </ScrollView>
          </View> :
          <View style={{ marginTop: "65%", marginStart: "45%" }}>
            <CirclesLoader color={"#7600AA"} />
            <TextLoader text="loading" />
          </View>}
      </PTRView>


    );
  }
}

