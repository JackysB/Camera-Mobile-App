import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, FlatList } from 'react-native';
import { Camera, CameraType } from "expo-camera/legacy";
import * as MediaLibrary from "expo-media-library";
import { ToastAndroid } from "react-native";
import { Animated } from "react-native";
import RadioGroup from './RadioGroup';

class PhotoCamera extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasCameraPermission: null,
            type: CameraType.back,
            pos: new Animated.Value(580),
            whiteBalance: Camera.Constants.WhiteBalance,
            flashMode: Camera.Constants.FlashMode,
            ratios: { "4:3": 0, "16:9": 1 },
            currentWhiteBalance: Camera.Constants.WhiteBalance.auto,
            currentFlashMode: Camera.Constants.FlashMode.off,
            currentRatio: "4:3",
            availablePictureSizes: [],
            currentSize: '',
        };
        this.isHidden = true
    }
    componentDidMount() {
        this.permission()
        this.getSizes()
    }

    permission = async () => {
        let { status } = await Camera.requestCameraPermissionsAsync()
        this.setState({ hasCameraPermission: status == 'granted' })
    }

    takePicture = async () => {
        if (this.camera) {
            let foto = await this.camera.takePictureAsync();
            let asset = await MediaLibrary.createAssetAsync(foto.uri)
            ToastAndroid.showWithGravity(
                'Zdjęcie zrobione!',
                ToastAndroid.SHORT,
                ToastAndroid.CENTER
            );
        }
    }

    otherSide = () => {
        this.setState({
            type: this.state.type === CameraType.back
                ? CameraType.front
                : CameraType.back,
        });
    }

    settings = () => {
        if (this.isHidden) toPos = 0; else toPos = 580
        Animated.spring(
            this.state.pos,
            {
                toValue: toPos,
                velocity: 1,
                tension: 0,
                friction: 10,
                useNativeDriver: true
            }
        ).start();
        this.isHidden = !this.isHidden;
    }

    getSizes = async () => {
        try {
            if (this.camera) {
                const currentRatioSizes = await this.camera.getAvailablePictureSizesAsync(this.state.currentRatio);
                const firstSize = currentRatioSizes[0];
                this.setState({
                    availablePictureSizes: currentRatioSizes,
                    currentSize: firstSize,
                });
            }
        } catch (error) {
            console.error(error)
        }
    };


    handleWhiteBalanceChange = (key) => {
        this.setState({ currentWhiteBalance: key });
    }

    handleFlashModeChange = (key) => {
        this.setState({ currentFlashMode: key });
    }

    handleRatioChange = (key) => {
        this.setState({ currentRatio: key }, () => {
            this.getSizes();
        });
    }
    handlePictureSizeChange = (key) => {
        this.setState({ currentSize: key });
    }

    render() {
        let takePhoto = '../assets/add.png'
        let otherSide = '../assets/otherSide.png'
        let setitngs = '../assets/settings.png'
        const { hasCameraPermission } = this.state;
        const sizeData = this.state.availablePictureSizes.reduce((acc, size) => ({ ...acc, [size]: size }), {})

        if (hasCameraPermission == null) {
        } else if (hasCameraPermission == false) {
            return <Text>brak dostępu do kamery</Text>;
        } else {
            return (
                <View style={styles.container}>
                    <Camera
                        ref={ref => {
                            this.camera = ref;
                        }}
                        style={styles.camera}
                        type={this.state.type}
                        whiteBalance={this.state.currentWhiteBalance}
                        flashMode={this.state.currentFlashMode}
                        ratio={this.state.currentRatio}
                        pictureSize={this.state.currentSize}
                        onCameraReady={this.getSizes}
                    >
                    </Camera>
                    <View style={styles.buttonRow}>
                        <TouchableOpacity onPress={this.otherSide} style={styles.buttonContainer2}>
                            <Image resizeMode={'cover'} style={{ width: 40, height: 40 }} source={require(otherSide)}></Image>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.takePicture} style={styles.buttonContainer}>
                            <Image resizeMode={'cover'} style={{ width: 50, height: 50 }} source={require(takePhoto)}></Image>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.settings} style={styles.buttonContainer3}>
                            <Image resizeMode={'cover'} style={{ width: 40, height: 40 }} source={require(setitngs)}></Image>
                        </TouchableOpacity>
                    </View>
                    <Animated.View
                        style={[
                            styles.animatedView,
                            {
                                transform: [
                                    { translateY: this.state.pos }
                                ]
                            }]} >
                        <Text style={{ textAlign: 'center', fontSize: 25, marginTop: 20, color: "#F9F7F7" }}>Settings</Text>
                        <FlatList
                            data={[
                                {
                                    id: 'whiteBalance', groupName: 'WHITE BALANCE',
                                    data: this.state.whiteBalance,
                                    onSelect: this.handleWhiteBalanceChange
                                },
                                {
                                    id: 'flashMode', groupName: 'FLASH MODE',
                                    data: this.state.flashMode, onSelect: this.handleFlashModeChange
                                },
                                {
                                    id: 'ratios', groupName: 'CAMERA RATIO',
                                    data: this.state.ratios, onSelect: this.handleRatioChange
                                },
                                {
                                    id: 'pictureSize', groupName: 'PICTURE SIZE',
                                    data: sizeData,
                                    onSelect: this.handlePictureSizeChange
                                }
                            ]}
                            keyExtractor={(item) => item.id}
                            renderItem={({ item }) =>
                                Object.keys(this.state.availablePictureSizes).length > 0 && (<RadioGroup
                                    color="#FFFFFF"
                                    color2="#112D4E"
                                    onSelect={item.onSelect}
                                    direction="column"
                                    data={item.data}
                                    groupName={item.groupName}
                                />)}
                        />
                    </Animated.View>
                </View>
            );
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    camera: {
        aspectRatio: 3 / 4,
        width: '100%',
        height: '100%',
    },
    buttonRow: {
        position: 'absolute',
        bottom: 20,
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
    },
    buttonContainer: {
        marginHorizontal: 10,
        borderRadius: 50,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        justifyContent: 'center',
        alignItems: 'center',
        width: 80,
        height: 80,
        marginLeft: 22,
    },
    buttonContainer2: {
        marginHorizontal: 10,
        borderRadius: 50,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        justifyContent: 'center',
        alignItems: 'center',
        width: 60,
        height: 60,
        marginLeft: 30,
    },
    buttonContainer3: {
        marginHorizontal: 10,
        borderRadius: 50,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        justifyContent: 'center',
        alignItems: 'center',
        width: 60,
        height: 60,
        marginLeft: 25,
    },
    animatedView: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        width: '50%',
        backgroundColor: "#000000",
        opacity: 0.5,
        height: 580,
    },

});

export default PhotoCamera;