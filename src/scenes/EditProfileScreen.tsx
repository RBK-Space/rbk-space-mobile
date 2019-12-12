import React from "react";
import EditUserProfileTabs from "../scencesComponents/EditUserProfileTabs";
import UserProfile from "../data/profile.js";
import styles from "../styles/styles";
import { View, Button } from "react-native";
export interface Props { }

interface State { }

export default class EditProfileScreen extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.defaultContainer}>
                <EditUserProfileTabs data={UserProfile}></EditUserProfileTabs>
                <View
                    style={{
                        justifyContent: "flex-end"
                    }}
                ></View>
                <Button title="Save" onPress={() => console.log("save")}></Button>
            </View>
        );
    }
}
