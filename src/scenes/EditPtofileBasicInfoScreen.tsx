import React from "react";
import {
    View,
    ScrollView,
    Picker,
    FlatList,
} from "react-native";
import styles from "../styles/styles";
import UserProfile from "../data/UserProfile";
import { Avatar } from "react-native-elements";
import ImagePicker from "react-native-image-picker";
import { Input } from "react-native-elements";
import TagComponent from "../components/TagComponent";
import Skills from "../data/Skills";

export interface Props {
    style?: Object;
    data?: UserProfile;
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
}

export default class EditPtofileBasicInfoScreen extends React.Component<
    Props,
    State
    > {
    image: string;
    constructor(props: Props) {
        super(props);
        this.state = {
            tag: "",
            firstName: this.props.data.userName,
            avatarSource: this.props.data.image,
            cohort: this.props.data.cohort,
            lastName: this.props.data.userName,
            bio: this.props.data.bio,
            skills: this.props.data.skills,
            refresh: true,
            emolyment: this.props.data.employment ? "employed" : "not employed",
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
    }
    handleEditComplete() {
        console.log("done");
        let tags = this.state.skills;
        tags.push({ id: 11, name: this.state.tag });
        this.setState({ skills: tags });
        console.log(this.state)

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
                    />
                    <Input
                        placeholder="Last Name"
                        errorStyle={{ color: "red" }}
                        errorMessage=""
                    />
                    <Input
                        placeholder="Bio"
                        errorStyle={{ color: "red" }}
                        errorMessage=""
                    />
                    <View>
                        <Picker
                            mode="dropdown"
                            selectedValue={this.state.cohort}
                            style={{ height: 50, width: "50%" }}
                            onValueChange={(itemValue, itemIndex) =>
                                this.setState({ cohort: itemValue })}>
                            {serviceItems}
                        </Picker>
                    </View>

                    <Picker
                        mode="dropdown"
                        selectedValue={this.state.emolyment}
                        style={{ height: 50, width: "50%" }}
                        onValueChange={(itemValue, itemIndex) =>
                            this.setState({ emolyment: itemValue })}>
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
                            <TagComponent title={item.name}></TagComponent>
                        )}
                        extraData={this.state}
                        keyExtractor={item => item.id + item.name}
                    />
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
