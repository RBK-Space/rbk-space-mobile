import React from "react";
import { View, Image, Text, Alert, Linking, ScrollView } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import UserProfile from "../data/UserProfile";
import styles from "../styles/styles";
import SocialButton from "../components/SocailButton";
import UserProfileTab from "../scencesComponents/UserProfileTab";
import Button from "../components/Button";
export interface Props {
  data: UserProfile;
  navigation?: any;
}

interface State {}

export default class ProfileScreen extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    // console.log(this.props.data);
    // console.log("this.props.data.image");
  }

  render() {
    return (
      <View style={{ padding: 8, flex: 1 }}>
        <View style={{ alignSelf: "baseline", justifyContent: "flex-end" }}>
          <Button
            title="Edit"
            onPress={() => this.props.navigation.navigate("EditProfileScreen")}
          ></Button>
        </View>

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
        <UserProfileTab data={this.props.data}></UserProfileTab>
      </View>
    );
  }
}
