import React from "react";
import { View, Alert, Text, ScrollView } from "react-native";

import { TextInput } from "react-native-paper";
import styles from "../styles/styles";
import User from "../data/User";
import CallAPI from "../net/ApiUtils.js";
import URLS from "../net/ApiConst";
import SharedPreferences from 'react-native-shared-preferences';
import DialogProgress from 'react-native-dialog-progress'
import { Button } from "react-native-elements";
interface State {
    editData?: any;
    facebook?: string;
    github?: string;
    twitter?: string;
    linkedin?: string;
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
            facebook: this.props.data.fb,
            github: this.props.data.gh,
            twitter: this.props.data.tw,
            linkedin: this.props.data.li
        };

        var that = this
        SharedPreferences.getItem("userID", function (value) {
            var data = that.state.editData;
            data.userId = value;
            data.facebook = that.props.data.fb;
            data.twitter = that.props.data.tw;
            data.linkedin = that.props.data.li;
            data.github = that.props.data.gh;


            that.setState({ editData: data });
        });

    }


    handleSaveClick() {
        if (this.state.editData
            && this.state.editData.facebook
            && this.state.editData.twitter
            && this.state.editData.github
            && this.state.editData.linkedin) {
            const config = {
                url: URLS.EDIT_CONTACT_URL,
                method: "POST",
                data: this.state.editData
            };
            const request = CallAPI(
                config,
                respnse => this.onLoginSuccess(respnse),
                error => this.onLoginError(error)
            );
            DialogProgress.show(dialogOptions)
        } else {
            Alert.alert("please fill all fields!")
        }
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
                        label="Facebook"
                        value={this.state.facebook}
                        onChangeText={facebook => {

                            var data = this.state.editData;
                            data.facebook = facebook;
                            this.setState({ editData: data });
                            this.setState({ facebook })
                        }}
                    />
                    <TextInput
                        mode="outlined"
                        label="Twitter"
                        value={this.state.twitter}

                        onChangeText={twitter => {

                            this.setState({ twitter })
                            var data = this.state.editData;
                            data.twitter = twitter;
                            this.setState({ editData: data });
                        }}
                    />
                    <TextInput
                        mode="outlined"
                        label="Github"
                        value={this.state.github}
                        onChangeText={github => {

                            var data = this.state.editData;
                            data.github = github;
                            this.setState({ editData: data });
                            this.setState({ github })

                        }}
                    />
                    <TextInput
                        mode="outlined"
                        label="Linkedin"
                        value={this.state.linkedin}
                        onChangeText={linkedin => {

                            var data = this.state.editData;
                            data.linkedin = linkedin;
                            this.setState({ editData: data });
                            this.setState({ linkedin })

                        }}
                    />

                </View>
                <Button
                    title="  Save  "
                    buttonStyle={{ backgroundColor: "#B51983", marginTop: 8 }}
                    onPress={() => this.handleSaveClick()}
                    style={{ width: "35%" }}
                />
                {/* <Button title="Save" onPress={() => { this.handleSaveClick() }}></Button> */}
            </ScrollView>
        );
    }
}
const dialogOptions = {
    title: "Loading",
    message: "This is a message!",
    isCancelable: true
}