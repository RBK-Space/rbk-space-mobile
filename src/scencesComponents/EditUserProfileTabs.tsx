import * as React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { TabView, SceneMap } from "react-native-tab-view";
import EditPtofileBasicInfoScreen from "../scenes/EditPtofileBasicInfoScreen";
import UserProfile from "../data/UserProfile";
import EditContactScreen from "../scenes/EditContactScreen";
import EditPortfoliloScreen from "../scenes/EditPortfoliloScreen";
import CallAPI from '../net/ApiUtils.js'
import URLS from '../net/ApiConst';
import User from "../data/User";
export interface Props {
  data: User;
}




export default class EditUserProfileTabs extends React.Component<Props> {
  constructor(props: Props) {
    super(props);

    const configSkills = {
      url: URLS.GET_SKILLS,
      method: 'GET',
    };
    const configEmp = {
      url: URLS.GET_EMP,
      method: 'GET',
    };
    const configCohorts = {
      url: URLS.GET_COHORT,
      method: 'GET',
    };
    const request = CallAPI(configSkills, respnse => this.onSkillsSuccess(respnse), error => this.onSkillsError(error));
    const request1 = CallAPI(configEmp, respnse => this.onEmpSuccess(respnse), error => this.onEmpError(error));
    const request2 = CallAPI(configCohorts, respnse => this.onCohortSuccess(respnse), error => this.onCohortError(error));

  }

  onSkillsSuccess(response) {
    console.log("onSkillsSuccess", response)
    var constants = this.state.constants
    constants.skills = response.data[0]
    this.setState({ constants })
  }
  onSkillsError(error) {
    console.log('onSkillsError: ', error);
  }

  onEmpSuccess(response) {
    console.log("onEmpSuccess", response)
    var constants = this.state.constants
    constants.empstate = response.data[0]
    this.setState({ constants })
  }
  onEmpError(error) {
    console.log('onEmpError: ', error);
  }

  onCohortSuccess(response) {
    console.log("onCohortSuccess", response)
    var constants = this.state.constants
    constants.cohorts = response.data[0]
    this.setState({ constants })
  }
  onCohortError(error) {
    console.log('onCohortError: ', error);
  }
  state = {
    index: 0,
    routes: [
      { key: "first", title: "Basic info" },
      { key: "second", title: "Contact info" },
      { key: "third", title: "Portfolio" }

    ],
    constants: { skills: [], cohorts: [], empstate: [] }

  };

  render() {
    return (
      <TabView
        navigationState={this.state}
        renderScene={SceneMap({
          first: () => <EditPtofileBasicInfoScreen data={this.props.data} constants={this.state.constants} />,
          second: () => <EditContactScreen data={this.props.data} ></EditContactScreen>,
          third: () => <EditPortfoliloScreen data={this.props.data}  ></EditPortfoliloScreen>
        })}
        onIndexChange={index => this.setState({ index })}
        initialLayout={{ width: Dimensions.get("window").width }}
      />
    );
  }
}
