import React from "react";
import EditUserProfileTabs from "../scencesComponents/EditUserProfileTabs";
import UserProfile from "../data/profile.js";
export interface Props { }

interface State { }

export default class EditProfileScreen extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
    }

    render() {
        return <EditUserProfileTabs data={UserProfile}></EditUserProfileTabs>;
    }
}
