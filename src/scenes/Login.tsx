import React from "react";
import { View, Linking } from "react-native";
import ImageButton from "../components/ImageButton";
import SharedPreferences from 'react-native-shared-preferences';


interface Props {
  name: string;
  style?: Object;
  navigation?: any;
}

interface State {
  isLoading: boolean;
  redirectData?: any;
  result?: any
}


export default class Login extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

  }

  signWithGithub() {

    // SharedPreferences.setItem("userID", "61");
    this.props.navigation.replace("WebLoginSceen")
  }

  render() {
    console.log("This is login ");
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ImageButton
          image="github"
          text="Login with github"
          border-Width="2px"
          onPress={() => {
            this.signWithGithub()
          }}
        />
      </View>

    );
  }
}
