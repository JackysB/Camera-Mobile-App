import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, Image, View, Text, ImageBackground } from 'react-native';

class FotoItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    render() {
        const opacity = this.props.isSelected ? 1 : 0
        const opacity2 = this.props.isSelected ? 0.5 : 1
        const helpWidth = this.props.isGrid ? '100%' : '70%'
        const helpHeight = this.props.isGrid ? '100%' : '100%'
        const helpLeft = this.props.isGrid ? '0%' : '27.5%'
        return (
            <TouchableOpacity onPress={this.props.toBigPhoto} onLongPress={() => this.props.toggleImageSelection(this.props.id)}>
                <View style={styles.container}>
                    <ImageBackground style={[styles.imageContainer, { width: this.props.width, height: this.props.height, opacity: opacity2 }]}
                        imageStyle={{ borderRadius: 5 }} source={{ uri: this.props.source }}>
                        <Text style={{ fontSize: this.props.size, color: '#F9F7F7', position: 'absolute', right: 5, bottom: 5 }}>{this.props.id}</Text>
                        <View style={{ flex: 1, justifyContent: 'center', position: 'relative', left: helpLeft }}>
                            <ImageBackground source={require('../assets/add.png')}
                                style={{ width: helpWidth, height: helpHeight, opacity: opacity }}>
                            </ImageBackground>
                        </View>
                    </ImageBackground>
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 2,
    },
    imageContainer: {
        flex: 1,
    },
});

export default FotoItem;