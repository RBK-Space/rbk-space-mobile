import React from "react";
import EditUserProfileTabs from "../scencesComponents/EditUserProfileTabs";
import UserProfile from "../data/profile.js";
import styles from "../styles/styles";
import { View, Button } from "react-native";
import User from "../data/User";
export interface Props {
    data?: User
    navigation?: any;
}

interface State { data: User }

export default class EditProfileScreen extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        if (props.navigation.getParam("data")) {
            this.state = { data: props.navigation.getParam("data") };
            console.log(this.state.data)
        }
    }

    render() {
        return (

            <View style={{flex:1}}>{this.state.data ?
                <EditUserProfileTabs data={this.state.data}></EditUserProfileTabs> : null}
            </View>
        );
    }
}
