import React from "react";
import { StyleSheet, Text, View } from "react-native";
import styles from "../styles/styles";
import { FlatList } from "react-native-gesture-handler";
import Post from "../scencesComponents/Post";
import PostItem from "../data/Posts";
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
      <View>
        <FlatList
          data={this.props.posts}
          renderItem={({ item }) => <Post data={item}></Post>}
          keyExtractor={item => item.postId + ""}
        />
      </View>
    );
  }
}
