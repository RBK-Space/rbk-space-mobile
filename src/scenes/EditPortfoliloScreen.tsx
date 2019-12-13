import React from "react";
import { View, Button, Alert, Text, ScrollView } from "react-native";

import { TextInput } from "react-native-paper";
import styles from "../styles/styles";
import User from "../data/User";
import CallAPI from "../net/ApiUtils.js";
import URLS from "../net/ApiConst";
import SharedPreferences from 'react-native-shared-preferences';
import DialogProgress from 'react-native-dialog-progress'
interface State {
    editData?: any;
}
// fb: string;
// gh: string;
// li: string;
// tw: string;
export interface Props { data?: User }
export default class EditContactScreen extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        console.log("data", this.props.data)
        this.state = {
            editData: {},

        };

        var that = this
        SharedPreferences.getItem("userID", function (value) {
            var data = that.state.editData;
            data.userId = value;
            that.setState({ editData: data });
        });

    }


    handleSaveClick() {

        const config = {
            url: URLS.EDIT_PORTFOILO_URL,
            method: "POST",
            data: this.state.editData
        };
        const request = CallAPI(
            config,
            respnse => this.onLoginSuccess(respnse),
            error => this.onLoginError(error)
        );
        DialogProgress.show(dialogOptions)

    }
    onLoginSuccess(response) {
        console.log(">>>.", response);
        Alert.alert("Success")
        DialogProgress.hide()
    }

    onLoginError(error) {
        console.log("onError: ", error);
        Alert.alert("Error")
        DialogProgress.hide()
    }

    render() {
        return (
            <ScrollView>
                <View style={styles.defaultContainerEnd}>
                    <TextInput
                        mode="outlined"
                        label="title"
                        value={this.state.editData.title}
                        onChangeText={title => {
                            var data = this.state.editData;
                            data.title = title;
                            this.setState({ editData: data });
                        }}
                    />
                    <TextInput
                        mode="outlined"
                        label="description"
                        value={this.state.editData.description}

                        onChangeText={description => {
                            var data = this.state.editData;
                            data.description = description;
                            this.setState({ editData: data });
                        }}
                    />
                    <TextInput
                        mode="outlined"
                        label="Link"
                        value={this.state.editData.link}
                        onChangeText={link => {
                            var data = this.state.editData;
                            data.link = link;
                            this.setState({ editData: data });
                        }}
                    />
                </View>
                <Button title="Save" onPress={() => { this.handleSaveClick() }}></Button>
            </ScrollView>
        );
    }
}
const dialogOptions = {
    title: "Loading",
    message: "This is a message!",
    isCancelable: true
}