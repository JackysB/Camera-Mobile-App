import React, { Component } from 'react';
import { StyleSheet, Image, View, Alert, Text } from 'react-native';
import * as MediaLibrary from "expo-media-library";
import MyButton from './MyButton'
import * as Sharing from 'expo-sharing';
import { ToastAndroid } from "react-native";

class BigPhoto extends Component {
    constructor(props) {
        super(props);
        this.state = {
            source: this.props.route.params.source,
            id: this.props.route.params.id,
            imgWidth: this.props.route.params.imgWidth,
            imgHeight: this.props.route.params.imgHeight
        }
    }

    delete = async () => {
        Alert.alert(
            'Delete Photo',
            `Are you sure you want to delete this photo?`,
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Confirm',
                    onPress: async () => {
                        try {
                            await MediaLibrary.deleteAssetsAsync([this.state.id]);
                            this.props.navigation.goBack();
                        } catch (error) {
                            console.error('Error deleting photo:', error);
                        }
                    }
                }
            ],
            { cancelable: true }
        );
    }


    share = async () => {
        try {
            const isAvailable = await Sharing.isAvailableAsync();
            if (isAvailable) {
                await Sharing.shareAsync(this.state.source);
            } else {
                ToastAndroid.showWithGravity(
                    'Udostępnianie nie powiodło się!',
                    ToastAndroid.SHORT,
                    ToastAndroid.CENTER
                );
            }
        } catch (err) {
            console.error("Error sharing the photo:", err);
        }
    }

    render() {
        return (
            <View style={styles.cont}>
                <Image
                    resizeMode={'cover'}
                    style={{ width: "80%", height: "80%", marginTop: '10%', borderRadius: 10 }}
                    source={{ uri: this.state.source }}
                />
                <Text>{this.state.imgWidth} x {this.state.imgHeight}</Text>
                <View style={styles.cont2}>
                    <MyButton text='share' testPress={this.share} color='#112D4E' size={20} />
                    <MyButton text='delete' testPress={this.delete} color='#112D4E' size={20} />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    cont: {
        flex: 1,
        alignItems: 'center',
        margin: 2,
        backgroundColor: '#DBE2EF',
    },
    cont2: {
        flexDirection: 'row',
    }
});

export default BigPhoto;