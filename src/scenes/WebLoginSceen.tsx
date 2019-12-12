import React, { Component } from 'react';
import {
    StyleSheet,

    Text,
    WebView
} from 'react-native';
import CallAPI from '../net/ApiUtils.js'
import SharedPreferences from 'react-native-shared-preferences';
import URLS from '../net/ApiConst.js';

interface Props {
    style?: Object;
    navigation?: any;
}

interface State {
    isLoading: boolean;
    redirectData?: any;
    result?: any
}

export default class WebLoginSceen extends React.Component<Props, State>  {
    render() {
        return (
            <WebView onNavigationStateChange={this._onLoad.bind(this)} style={styles.container} source={{ uri: URLS.AUTH_GIHUB }} />
        );
    }

    _onLoad(state) {
        console.log(state.url);
        if (state.url.indexOf(URLS.CLIENT_HOME_PAGE_URL) != -1) {


            //let token = state.url.split("token=")[1];
            //token = token.substring(0, token.length - 4);
            // NavigationsActions.back();
            // SessionActions.setSession(token);
            const config = {
                url: URLS.CLIENT_AUTH_SUCCESS_URL,
                method: 'GET',
            };

            const request = CallAPI(config, respnse => this.onLoginSuccess(respnse), error => this.onLoginError(error));
        }
    }


    onLoginSuccess(response) {
        console.log(">>>.", response.data.user[0])
        // this.props.navigation.navigate("WebLoginSceen")
        if (response && response.data && response.data.success) {
            console.log("User id ", response.data.user[0].userId)
            SharedPreferences.setItem("userID", response.data.user[0].userId + "");
            SharedPreferences.setItem("user", JSON.stringify(response));
            this.props.navigation.replace("SimpleTabs")

        }
    }

    onLoginError(error) {
        console.log('onError: ', error);
        this.props.navigation.replace("Login")

    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});

