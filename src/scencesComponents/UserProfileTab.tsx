import * as React from "react";
import { View, Text } from "react-native";
import { ScrollView, FlatList } from "react-native-gesture-handler";
import UserItem from "../data/User";
import ScrollableTabView from "react-native-scrollable-tab-view";
import TagComponent from "../components/TagComponent";
import PortofolioScreen from "../scenes/PortofoiloScreen";
import styles from "../styles/styles";
import TagsList from "./TagsList";
export interface Props {
  data: UserItem;
}

export default class TabViewExample extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }
  render() {
    return (
      <ScrollableTabView
        style={{ flex: 10 }}
        tabBarActiveTextColor="#B51983"
        tabBarUnderlineStyle={{
          backgroundColor: "#B51983"
        }}
      >
        <View tabLabel="General">
          <ScrollView>
            <View
              style={{
                alignContent: "center",
                justifyContent: "center"
              }}
            >
              <Text style={styles.bio_text}>
                {this.props.data.cohort
                  ? `Hello!My name is ${this.props.data.username} from ${this.props.data.cohort} I'm  ${this.props.data.empStat}`
                  : `Hello!My name is ${this.props.data.username}`}
                }
              </Text>

              <TagsList data={this.props.data.skills}></TagsList>
            </View>
          </ScrollView>
        </View>
        <View tabLabel="Bio">
          <ScrollView>
            <View
              style={{
                alignContent: "center",
                justifyContent: "center"
              }}
            >
              <Text style={styles.bio_text}>{this.props.data.bio}</Text>
            </View>
          </ScrollView>
        </View>
        <View tabLabel="Portoflio">
          <PortofolioScreen
            Portofolio={this.props.data.projects}
          ></PortofolioScreen>
        </View>
      </ScrollableTabView>
    );
  }
}

{
  /* <Text style={{ paddingTop: 20 }}>
       {`Employment Status :${
          this.props.data.empStat ? "employed" : "not yet"
          } `}  
      {`Employment Status :${
          this.props.data.empStat
          } `}
      </Text> */
}
