import React from "react";
import {
    View,
    ScrollView,
    Picker,
    FlatList,
    TextInput,
    Button,
    Alert,
    Platform,
    Text
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
import { TagSelect } from 'react-native-tag-select';
import { RNS3 } from 'react-native-s3-upload';
import config from "../../config/config.json"

export interface Props {
    style?: Object;
    data?: User;
    constants?: any
}
const dialogOptions = {
    title: "Loading",
    message: "This is a message!",
    isCancelable: true
}

//get data from Api
interface State {
    imgUrl: string,
    bio: string,
    empStatus: Number,
    userId: Number,
    cohortId: Number,
    fullName: string,
    imageChanged: boolean;
}

export default class EditPtofileBasicInfoScreen extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            imgUrl: this.props.data.image,
            bio: this.props.data.bio,
            empStatus: this.props.data.epmId,
            userId: this.props.data.userId,
            cohortId: this.props.data.cohortId,
            fullName: this.props.data.fullName,
            imageChanged: false
        };

    }

    uploadImage() {
        DialogProgress.show(dialogOptions)
        const file = {
            uri: this.state.imgUrl,
            name: `rbk-space${new Date().getTime()}.jpg`,
            type: "image/jpeg"
        }

        RNS3.put(file, config.Awsconfig).then(response => {
            if (response.status !== 201) {
                console.log(response);
            } else {
                console.log(response.body);
                this.props.data.image = response.body.postResponse.location;
                this.setState({ imgUrl: response.body.postResponse.location, imageChanged: false })
                //after upload image on Aws push for the edit profile
                this.editProfileApi()
            }
        });

    }

    editProfileApi() {
        console.log(this.state.empStatus)
        var editData = {
            imgUrl: this.state.imgUrl,
            bio: this.state.bio,
            empStatus: this.state.empStatus,
            userId: this.state.userId,
            cohortId: this.state.cohortId,
            fullName: this.state.fullName,
        }
        const config = {
            url: URLS.EDIT_BASE_DATA_URL,
            method: "POST",
            data: editData
        };
        const request = CallAPI(
            config,
            respnse => this.onLoginSuccess(respnse),
            error => this.onLoginError(error)
        );
    }

    handleSaveClick() {
        if (this.state.imageChanged)
            this.uploadImage()
        else {
            DialogProgress.show(dialogOptions)
            this.editProfileApi()

        }
    }

    onLoginSuccess(response) {
        console.log(">>>.", response);
        Alert.alert("Profile updated")
        DialogProgress.hide()
    }

    onLoginError(error) {
        console.log("onError: ", error);
        Alert.alert("Error")
        DialogProgress.hide()
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
                console.log(source);
                this.setState({
                    imgUrl: source.uri,
                    imageChanged: true
                });
            }
        });
    }

    render() {
        console.log("This is edit profile basic info");
        let serviceItems = this.props.constants.cohorts.map((cohort, i) => {
            return <Picker.Item key={cohort.cohortId} value={cohort.cohortId} label={cohort.cohortName} />;
        });
        let employmentStates = this.props.constants.empstate.map((empState, i) => {
            return <Picker.Item key={empState.empId} value={empState.empId} label={empState.empStatus} />;
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
                            uri: this.state.imgUrl
                        }}
                        showEditButton
                    />
                    <Input
                        placeholder="First Name"
                        errorStyle={{ color: "red" }}
                        errorMessage=""
                        value={this.state.fullName}
                        onChangeText={fullName => {
                            this.setState({ fullName });
                        }}
                    />

                    <TextInput
                        multiline={true}
                        placeholder="Bio"
                        value={this.state.bio}
                        onChangeText={bio => {
                            this.setState({ bio });
                        }}
                    />
                    {/* <View> */}
                    <Picker
                        mode="dropdown"
                        selectedValue={this.state.cohortId}
                        style={{ height: 50, width: "50%" }}
                        onValueChange={(itemValue, itemIndex) => {
                            console.log(itemValue)
                            this.setState({ cohortId: itemValue })

                        }
                        }
                    >
                        {serviceItems}
                    </Picker>

                    <Picker
                        mode="dropdown"
                        selectedValue={this.state.empStatus}
                        style={{ height: 50, width: "50%" }}
                        onValueChange={(itemValue, itemIndex) => {
                            this.setState({ empStatus: itemValue })
                        }}
                    >
                        {employmentStates}
                    </Picker>
                    <Text>Select your skills </Text>
                    {/* <View>s
                        <Input
                            onSubmitEditing={this.handleEditComplete.bind(this)}
                            placeholder="Add skills"
                            errorStyle={{ color: "red" }}
                            errorMessage=""
                            onChangeText={text => this.setState({ tag: text })}
                        />
                    </View> */}
                    {/* <FlatList
                        horizontal={true}
                        data={this.state.skills}
                        renderItem={({ item }) => (
                            <TagComponent title={item.skillName}></TagComponent>
                        )}
                        extraData={this.state}
                        keyExtractor={item => item.skillId + item.skillName}
                    /> */}



                    <Button title="Save" onPress={() => { this.handleSaveClick() }}></Button>

                </View>
            </ScrollView>
        );
    }
}

const options = {
    title: "Select Avatar",
    storageOptions: {
        skipBackup: true,
        path: "images",
        cameraRoll: true,
        waitUntilSaved: true
    }
};
