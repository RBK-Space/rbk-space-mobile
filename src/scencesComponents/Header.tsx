import React, { Component } from "react";
import styles from "../styles/styles";
import { Text, View, TouchableOpacity, Image } from "react-native";
import { Header } from "react-native/Libraries/NewAppScreen";

export interface Props {

}
const MyCustomLeftComponent = () => {
    //override suggestion render the drop down
    return (
        <Image source={require('../assets/images/rbk_logo.png')}></Image>
    );
};


export default class HeaderS extends Component<Props> {
    constructor(props: Props) {
        super(props);
        // console.log("tagggg", props);
    }

    render() {
        return (
            <Header
                statusBarProps={{ barStyle: 'light-content' }}
                barStyle="light-content" // or directly
                centerComponent={<MyCustomLeftComponent />}
                containerStyle={{
                    backgroundColor: 'white',
                    justifyContent: 'space-around',
                }}
            />
        );
    }
}
