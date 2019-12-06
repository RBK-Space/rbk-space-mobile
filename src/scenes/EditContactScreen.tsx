import React from "react";
import { View, Button, Alert, Text } from "react-native";
export interface Props { }
import { TextInput } from "react-native-paper";
import styles from "../styles/styles";

interface State {
    text: string;
}

export default class EditContactScreen extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { text: "" };
    }

    render() {
        return (
            <View style={styles.defaultContainer}>
                <TextInput
                    mode="outlined"
                    label="Facebook"
                    // value={this.state.facebook}
                    onChangeText={text => this.setState({ text })}
                />
                <TextInput
                    mode="outlined"
                    label="Twitter"
                    // value={this.state.twitter}
                    onChangeText={text => this.setState({ text })}
                />
                <TextInput
                    mode="outlined"
                    label="Github"
                    // value={this.state.github}
                    onChangeText={text => this.setState({ text })}
                />
                <TextInput
                    mode="outlined"
                    label="Linkedin"
                    // value={this.state.text}
                    onChangeText={text => this.setState({ text })}
                />
            </View>
        );
    }
}
