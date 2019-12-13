import React from "react";
import {
    View,
    ScrollView,
    Picker,
    FlatList,
    TextInput,
    Button,
    Alert
} from "react-native";
import styles from "../styles/styles";
import UserProfile from "../data/UserProfile";
import { Avatar } from "react-native-elements";
import ImagePicker from "react-native-image-picker";
import { Input } from "react-native-elements";
import TagComponent from "../components/TagComponent";
import Skills from "../data/Skills";
import CallAPI from "../net/ApiUtils.js";
import URLS from "../net/ApiConst";
import SharedPreferences from 'react-native-shared-preferences';
import DialogProgress from 'react-native-dialog-progress'
import User from "../data/User";

export interface Props {
    style?: Object;
    data?: User;
}
const dialogOptions = {
    title: "Loading",
    message: "This is a message!",
    isCancelable: true
}

//get data from Api
interface State {
    avatarSource: any;
    cohort: any;
    cohorts: string[];
    firstName: string;
    lastName: string;
    bio: string;
    employmentState: string[];
    emolyment: string;
    skills: Skills[];
    tag: string;
    refresh: boolean;
    editData?: any;
}

export default class EditPtofileBasicInfoScreen extends React.Component<
    Props,
    State
    > {
    image: string;
    constructor(props: Props) {
        super(props);
        this.state = {
            editData: {},
            tag: "",
            firstName: this.props.data.username,
            avatarSource: this.props.data.image,
            cohort: this.props.data.cohort,
            lastName: "",
            bio: this.props.data.bio,
            skills: this.props.data.skills,
            refresh: true,
            emolyment: this.props.data.empStat,
            cohorts: [
                "cohort-1",
                "cohort-2",
                "cohort-3",
                "cohort-4",
                "cohort-5",
                "cohort-6",
                "cohort-7",
                "cohort-8"
            ],
            employmentState: ["employed", "not employed"]
        };
        this.image = "";

        var that = this
        SharedPreferences.getItem("userID", function (value) {
            var data = that.state.editData;
            data.userId = value;
            that.setState({ editData: data });
        });


    }
    handleSaveClick() {

        const config = {
            url: URLS.EDIT_BASE_DATA_URL,
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

    handleEditComplete() {
        console.log("done");
        let tags = this.state.skills || [];

        tags.push({ skillId: new Date().getDate(), skillName: this.state.tag });
        this.setState({ skills: tags });
        var data = this.state.editData;
        data.skills = tags;
        this.setState({ editData: data });
        console.log(this.state);
    }

    showImage() {
        ImagePicker.showImagePicker(options, response => {
            console.log("Response = ", response);

            if (response.didCancel) {
                console.log("User cancelled image picker");
            } else if (response.error) {
                console.log("ImagePicker Error: ", response.error);
            } else if (response.customButton) {
                console.log("User tapped custom button: ", response.customButton);
            } else {
                const source = { uri: response.uri };
                // this.image = source;
                // You can also display the image using data:
                // const source = { uri: "data:image/jpeg;base64," + response.data };
                console.log(source);
                this.setState({
                    avatarSource: source.uri
                });
            }
        });
    }

    render() {
        console.log("This is edit profile basic info");
        let serviceItems = this.state.cohorts.map((s, i) => {
            return <Picker.Item key={i} value={s} label={s} />;
        });
        let employmentStates = this.state.employmentState.map((s, i) => {
            return <Picker.Item key={i} value={s} label={s} />;
        });
        return (
            <ScrollView>
                <View style={styles.defaultContainer}>

                    <Avatar
                        rounded
                        title="AM"
                        size="xlarge"
                        onPress={() => {
                            this.showImage();
                            console.log("Works!");
                        }}
                        source={{
                            uri: this.state.avatarSource
                        }}
                        showEditButton
                    />
                    <Input
                        placeholder="First Name"
                        errorStyle={{ color: "red" }}
                        errorMessage=""
                        value={this.state.firstName}
                        onChangeText={firstName => {
                            this.setState({ firstName });
                            var data = this.state.editData;
                            data.firstName = firstName;
                            this.setState({ editData: data });
                        }}
                    />
                    <Input
                        placeholder="Last Name"
                        errorStyle={{ color: "red" }}
                        errorMessage=""
                        value={this.state.lastName}
                        onChangeText={lastName => {
                            this.setState({ lastName });
                            var data = this.state.editData;
                            data.lastName = lastName;
                            this.setState({ editData: data });
                        }}
                    />
                    <TextInput
                        multiline={true}
                        placeholder="Bio"
                        value={this.state.bio}
                        onChangeText={bio => {
                            this.setState({ bio });
                            var data = this.state.editData;
                            data.bio = bio;
                            this.setState({ editData: data });
                        }}
                    />
                    <View>
                        <Picker
                            mode="dropdown"
                            selectedValue={this.state.cohort}
                            style={{ height: 50, width: "50%" }}
                            onValueChange={(itemValue, itemIndex) => {
                                this.setState({ cohort: itemValue })
                                var data = this.state.editData;
                                data.cohort = itemValue;
                                this.setState({ editData: data });
                            }
                            }
                        >
                            {serviceItems}
                        </Picker>
                    </View>

                    <Picker
                        mode="dropdown"
                        selectedValue={this.state.emolyment}
                        style={{ height: 50, width: "50%" }}
                        onValueChange={(itemValue, itemIndex) => {


                            this.setState({ emolyment: itemValue })
                            var data = this.state.editData;
                            data.empStat = itemValue;
                            this.setState({ editData: data });
                        }}
                    >
                        {employmentStates}
                    </Picker>
                    <View>
                        <Input
                            onSubmitEditing={this.handleEditComplete.bind(this)}
                            placeholder="Add skills"
                            errorStyle={{ color: "red" }}
                            errorMessage=""
                            onChangeText={text => this.setState({ tag: text })}
                        />
                    </View>
                    <FlatList
                        horizontal={true}
                        data={this.state.skills}
                        renderItem={({ item }) => (
                            <TagComponent title={item.skillName}></TagComponent>
                        )}
                        extraData={this.state}
                        keyExtractor={item => item.skillId + item.skillName}
                    />

                    <Button title="Save" onPress={() => { this.handleSaveClick() }}></Button>

                </View>
            </ScrollView>
        );
    }
}

const options = {
    title: "Select Avatar",
    //   customButtons: [{ name: "fb", title: "Choose Photo from Facebook" }],
    storageOptions: {
        skipBackup: true,
        path: "images",
        cameraRoll: true,
        waitUntilSaved: true
    }
};
