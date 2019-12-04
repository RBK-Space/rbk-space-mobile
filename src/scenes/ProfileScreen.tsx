import React from "react";
import { View, Image, Text, Alert, Linking } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import userItem from "../data/User";
import styles from "../styles/styles";
import SocialButton from "../components/SocailButton";
export interface Props {
  data: userItem;
}

interface State {}

export default class ProfileScreen extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.social_container}>
        <Image
          source={{
            uri: this.props.data.image
          }}
          style={styles.ProfileImage}
          resizeMode="cover"
        ></Image>
        <View>
          <Text>{this.props.data.userName}</Text>
          <Text>{this.props.data.cohort}</Text>
        </View>
        <View style={{ flex: 1, flexDirection: "row" }}>
          <SocialButton
            image="facebook"
            onPress={() => {
              const url =
                // "fb://facewebmodal/f?href=" + this.props.data.facebook_url;
                "fb://facewebmodal/f?href=https://www.facebook.com/salooma.ym";

              console.log("facebook");
            }}
          />
          <SocialButton image="github" onPress={() => console.log("github")} />
          <SocialButton
            image="twitter"
            onPress={() => {
              console.log("twitter");
              // Linking.openURL("twitter://timeline");
            }}
          />
          <SocialButton
            image="linkedin"
            onPress={() => console.log("linkedin")}
          />
        </View>
      </View>
    );
  }
}
