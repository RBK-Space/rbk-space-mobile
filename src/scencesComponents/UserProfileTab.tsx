import * as React from "react";
import { View, Text } from "react-native";
import { ScrollView, FlatList } from "react-native-gesture-handler";
import UserProfile from "../data/UserProfile";
import ScrollableTabView from "react-native-scrollable-tab-view";
import TagComponent from "../components/TagComponent";
import PortofolioScreen from "../scenes/PortofoiloScreen";

export interface Props {
    data: UserProfile;
}

export default class TabViewExample extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
    }
    render() {
        return (
            <ScrollableTabView style={{ flex: 10 }}>
                <View tabLabel="General">
                    <ScrollView>
                        <View>
                            <Text>
                                {`Hello!My name is ${this.props.data.userName} from ${this.props.data.cohort} I'm a ${this.props.data.job}
                `}
                            </Text>

                            <Text style={{ paddingTop: 20 }}>
                                {`Employment Status :${
                                    this.props.data.employment ? "employed" : "not yet"
                                    } `}
                            </Text>
                        </View>
                    </ScrollView>
                </View>
                <View tabLabel="Bio">
                    <ScrollView>
                        <View>
                            <Text>{this.props.data.bio}</Text>
                            <FlatList

                                horizontal={true}
                                data={this.props.data.skills}
                                renderItem={({ item }) => (
                                    <TagComponent title={item.name}></TagComponent>
                                )}
                                keyExtractor={item => item.id + item.name}
                            />
                        </View>
                    </ScrollView>
                </View>
                <View tabLabel="Portoflio">
                    <PortofolioScreen
                        Portofolio={this.props.data.Portofolio}
                    ></PortofolioScreen>
                </View>
            </ScrollableTabView>
        );
    }
}
