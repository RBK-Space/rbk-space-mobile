import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import Skills from '../data/Skills';
import TagComponent from '../components/TagComponent';

export interface Props {
    data: Skills[];
}
export default class TagsList extends React.Component<Props> {
    constructor(props: Props) {
        super(props)
    }
    render() {
        const _renderItem = ({ item }) => (
            <TagComponent title={item.skillName}

            />
        );
        return (
            <View style={styles.container}>
                <FlatList
                    data={this.props.data}
                    renderItem={_renderItem}
                    keyExtractor={item => item.skillId + item.skillName}
                    contentContainerStyle={styles.list}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    list: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    text: {
        backgroundColor: "rgb(90, 90, 90)",
        marginBottom: 10,
        margin: 4,
        padding: 5,
        alignSelf: "flex-start",
        flexDirection: 'row',
        flex: 1,
    }
});