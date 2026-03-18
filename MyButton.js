import React, { Component } from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';

class MyButton extends Component {
    render() {
        return (
            <TouchableOpacity style={[{ backgroundColor: this.props.color }, styles.btn]} onPress={this.props.testPress}>
                <Text style={{ fontSize: this.props.size, color: '#F9F7F7', textAlign: 'center' }}>{this.props.text}</Text>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    btn: {
        padding: 7,
        borderRadius: 10,
        margin: 10,
    }
});

export default MyButton;