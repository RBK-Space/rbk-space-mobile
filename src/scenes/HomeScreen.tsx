import React from "react";
import { StyleSheet, Text, View } from "react-native";
import styles from "../styles/styles";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import Post from "../scencesComponents/Post";
import PostItem from "../data/Posts";
import AddPost from "../scencesComponents/AddPost";
import { SearchBar } from 'react-native-elements';

export interface Props {
  posts: PostItem[];
}

interface State {
  search: string
}

export default class HomeScreen extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { search: "" }
  }
  updateSearch = search => {
    this.setState({ search });
  };
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
            onChangeText={this.updateSearch}
            value={search}
          />
          <AddPost></AddPost>
          <FlatList
            style={{ flex: 1 }}
            data={this.props.posts}
            renderItem={({ item }) => <Post data={item}></Post>}
            keyExtractor={item => item.postId + ""}
          />
        </View></ScrollView>
    );
  }
}

