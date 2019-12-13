import React from "react";
import { StyleSheet, Text, View, Image, Button } from "react-native";
import { thisTypeAnnotation } from "@babel/types";
import HomeScreen from "./HomeScreen";
import styles from "../styles/styles";
import Login from "./Login";
import SimpleTabsContainer from "./SimpleTabs";
import AppContainer from "./App";
import Test from "./WebLoginSceen"
import CallAPI from '../net/ApiUtils.js'
import URLS from '../net/ApiConst.js';
import SharedPreferences from 'react-native-shared-preferences';

export interface Props {
    navigation?: any;
}

interface State {
    isLoading: boolean;
    isLogin: boolean;
}

export default class SettingsScreen extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { isLoading: false, isLogin: false };
    }

    logout() {
        const config = {
            url: URLS.LOGOUT_URL,
            method: 'GET',
        };

        const request = CallAPI(config, respnse => this.onLoginSuccess(respnse), error => this.onLoginError(error));

        this.props.navigation.replace("Login")
        SharedPreferences.setItem("userID", "");

    }

    onLoginSuccess(response) {
        console.log(response)
    }


    onLoginError(error) {
        console.log('onError: ', error);

    }
    render() {

        return (
            <View style={styles.container}>
                <Button
                    onPress={this.logout.bind(this)}
                    title="Logout"
                    color="#841584"
                    accessibilityLabel="Learn more about this purple button"
                />
            </View>
        )
    }
}