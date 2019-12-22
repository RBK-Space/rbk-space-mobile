import React from "react";
import { View, Linking, ImageBackground, Image, Text } from "react-native";
import ImageButton from "../components/ImageButton";
import styles from "../styles/styles"


interface Props {
  name: string;
  style?: Object;
  navigation?: any;
}

interface State {
  isLoading: boolean;
  redirectData?: any;
  result?: any
  isLogin: boolean
}


export default class Login extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

  }

  signWithGithub() {
    this.props.navigation.replace("WebLoginSceen")
  }

  render() {
    console.log("This is login ");
    return (
      <ImageBackground source={require('../assets/images/bg_login.png')} style={styles.backgroundImage} >
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
          <Text style={{
            color: "white", fontFamily: 'Cochin',
            fontSize: 28,
            marginBottom: 20,
            padding: 18
          }}>Welcom to Rbk space</Text>
          <ImageButton
            image="github"
            text="Login with github"
            border-Width="2px"
            onPress={() => {
              this.signWithGithub()
            }}
          />
        </View>
      </ImageBackground>

    );
  }
}
