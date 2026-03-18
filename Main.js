import React, { Component } from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import MyButton from './MyButton'
class Main extends Component {
    constructor() {
        super();
        this.state = {};
    }
    nextPage = () => {
        this.props.navigation.navigate("Gallery")
    }
    render() {
        return (
            <View style={styles.container} >
                <StatusBar />
                <View style={styles.cont2}>
                    <MyButton size={60} text='Camera App' testPress={this.nextPage} />
                    <Text style={styles.text3}>show gallery pictures</Text>
                    <Text style={styles.text2}>take picture from camera</Text>
                    <Text style={styles.text2}>save photo to device</Text>
                    <Text style={styles.text2}>delete photos from device</Text>
                    <Text style={styles.text2}>share photo</Text>
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#3F72AF',
    },
    cont2: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text1: {
        fontSize: 60,
        textAlign: 'center',
        color: '#F9F7F7',
    },
    text2: {
        fontSize: 20,
        color: '#F9F7F7',
    },
    text3: {
        fontSize: 20,
        marginTop: 45,
        color: '#F9F7F7',
    }
});
export default Main;