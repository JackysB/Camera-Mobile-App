import React, { Component } from 'react';
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';

class RadioButton extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <TouchableOpacity style={styles.container} onPress={this.props.onPress}>
                <View style={[styles.outerCircle, { borderColor: this.props.color2 }]}>
                    {this.props.selected && <View style={[styles.innerCircle, { backgroundColor: this.props.color2 }]} />}
                </View>
                <Text style={{ color: this.props.color }}>{this.props.text}</Text>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
    },
    outerCircle: {
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    innerCircle: {
        width: 12,
        height: 12,
        borderRadius: 6,
    },
});

export default RadioButton;
