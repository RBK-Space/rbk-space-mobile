import React from "react";
import { StyleSheet, Text, View } from "react-native";
import styles from "../styles/styles";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import Post from "../scencesComponents/Post";
import PostItem from "../data/Posts";
import AddPost from "../scencesComponents/AddPost";
export interface Props {
  posts: PostItem[];
}

interface State {}

export default class HomeScreen extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    console.log(this.props.posts);
    return (
      <ScrollView>
      <View style={{ flex: 1 }}>
        <AddPost></AddPost>
        <FlatList
          style={{ flex: 1 }}
          data={this.props.posts}
          renderItem={({ item }) => <Post data={gitem}></Post>}
          keyExtractor={item => item.postId + ""}
        />
      </View></ScrollView>
    );
  }
}
