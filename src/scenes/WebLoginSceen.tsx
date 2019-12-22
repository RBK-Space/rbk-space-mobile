import React, { Component } from "react";
import { StyleSheet, Text, WebView, View } from "react-native";
import CallAPI from "../net/ApiUtils.js";
import SharedPreferences from "react-native-shared-preferences";
import URLS from "../net/ApiConst.js";
import styles from "../styles/styles"
import {
    CirclesLoader,
    ColorDotsLoader,
    TextLoader,
    NineCubesLoader
} from "react-native-indicator";
interface Props {
    style?: Object;
    navigation?: any;
}

interface State {
    isLoading: boolean;
    redirectData?: any;
    result?: any;
}

export default class WebLoginSceen extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props)
        this.state = { isLoading: false }
    }
    render() {
        return (
            <View style={{
                flex: 1
            }}>
                <WebView
                    style={{ flex: 1 }}
                    onNavigationStateChange={this._onLoad.bind(this)}
                    source={{ uri: URLS.AUTH_GIHUB }}
                />
                {this.state.isLoading ?
                    <View style={{ position: "absolute" }}>
                        <ColorDotsLoader />
                        <TextLoader text="login ..." />
                    </View> : null}
            </View>
        );
    }

    _onLoad(state) {
        console.log(state.url);
        if (state.url.indexOf(URLS.GET_Auth_GITHB) != -1) {
            this.setState({ isLoading: true })
        }
        if (state.url.indexOf(URLS.CLIENT_HOME_PAGE_URL) != -1) {
            //let token = state.url.split("token=")[1];
            //token = token.substring(0, token.length - 4);
            // NavigationsActions.back();
            // SessionActions.setSession(token);
            const config = {
                url: URLS.CLIENT_AUTH_SUCCESS_URL,
                method: "GET"
            };

            const request = CallAPI(
                config,
                respnse => this.onLoginSuccess(respnse),
                error => this.onLoginError(error)
            );
        }
    }

    onLoginSuccess(response) {
        console.log(">>>.", response.data.user[0]);
        // this.props.navigation.navigate("WebLoginSceen")
        if (response && response.data && response.data.success) {
            console.log("User id ", response.data.user[0].userId);
            SharedPreferences.setItem("userID", response.data.user[0].userId + "");
            SharedPreferences.setItem("user", JSON.stringify(response));
            this.props.navigation.replace("SimpleTabs");
        }
    }

    onLoginError(error) {
        console.log("onError: ", error);
        this.props.navigation.replace("Login");
    }
}

