import React, { Component } from 'react';
import { Text, StyleSheet, View, FlatList } from 'react-native';
import RadioButton from './RadioButton';

class RadioGroup extends Component {
    constructor(props) {
        super(props);
        const defaultKey = Object.keys(this.props.data)[0];
        this.state = {
            selectedKey: defaultKey
        };
    }

    componentDidMount() {
        const defaultKey = Object.keys(this.props.data)[0];
        this.handlePress(defaultKey);
    }

    handlePress = (key) => {
        this.setState({ selectedKey: key });
        if (this.props.onSelect) {
            this.props.onSelect(key);
        }
    };

    render() {
        return (
            <View style={styles.container}>
                <Text style={{ color: this.props.color, marginLeft: 10, marginBottom: 10, marginTop: 10 }}>{this.props.groupName}</Text>
                <FlatList
                    data={Object.keys(this.props.data).map(key => ({ key, value: this.props.data[key] }))}
                    keyExtractor={(item) => item.key.toString()}
                    renderItem={({ item, index }) => {
                        return (
                            <RadioButton
                                text={item.key}
                                value={item.value}
                                selected={this.state.selectedKey === item.key}
                                onPress={() => this.handlePress(item.key)}
                                color={this.props.color}
                                color2={this.props.color2}
                            />
                        );
                    }}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginLeft: 25,
    }
});

export default RadioGroup;
