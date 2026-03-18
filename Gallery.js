import React, { Component } from 'react';
import { View, StyleSheet, StatusBar, FlatList, Alert } from 'react-native';
import { Dimensions } from "react-native";
import * as MediaLibrary from "expo-media-library";
import MyButton from './MyButton';
import FotoItem from './FotoItem';

class Gallery extends Component {
    constructor(props) {
        super(props);
        this.state = {
            numcolumn: 5,
            width: 0,
            object: [],
            isGrid: true,
            selectedImages: [],
        };
    }

    componentDidMount() {
        this.refresh = this.props.navigation.addListener('focus', () => {
            this.reFresh();
        });
        this.calculateWidth();
    }

    calculateWidth = () => {
        const imgW = this.state.isGrid
            ? Math.round((Dimensions.get("window").width - (this.state.numcolumn - 1) * 5) / this.state.numcolumn)
            : Math.round(Dimensions.get("window").width - 7)

        this.setState({
            width: imgW,
        });
    }

    async reFresh() {
        let { status } = await MediaLibrary.requestPermissionsAsync();
        if (status !== 'granted') {
            alert('brak uprawnień do czytania image-ów z galerii');
            return;
        }
        const album = await MediaLibrary.getAlbumAsync("DCIM");
        const photos = await MediaLibrary.getAssetsAsync({
            album: album,
            first: 100,
            mediaType: ['photo'],
        });

        this.setState({
            object: photos.assets,
        }, this.calculateWidth);
    }

    toggleLayout = () => {
        this.setState(prevState => ({
            isGrid: !prevState.isGrid,
            numcolumn: prevState.isGrid ? 1 : 5,
        }), this.calculateWidth);
    }

    toggleImageSelection = (id) => {
        const selectedIndex = this.state.selectedImages.indexOf(id);
        if (selectedIndex === -1) {
            this.setState(prevState => ({
                selectedImages: [...prevState.selectedImages, id]
            }));
        } else {
            this.setState(prevState => ({
                selectedImages: prevState.selectedImages.filter(imageId => imageId !== id)
            }));
        }
    }

    deleteSelectedImages = async () => {
        if (this.state.selectedImages.length === 0) {
            return;
        }
        Alert.alert(
            'Delete Photos',
            `Are you sure you want to delete selected photos?`,
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Confirm',
                    onPress: async () => {
                        try {
                            await MediaLibrary.deleteAssetsAsync(this.state.selectedImages);
                            this.setState({
                                selectedImages: []
                            });
                            this.reFresh();
                        } catch (error) {
                            console.error('Error deleting photos:', error);
                        }
                    }
                }
            ],
            { cancelable: true }
        );
    }

    render() {
        const itemHeight = this.state.isGrid ? this.state.width : this.state.width / 2;
        return (
            <View style={styles.container}>
                <StatusBar />
                <View style={styles.buttonContainer}>
                    <MyButton text='LIST / GRID STYLE' size={10} color='#112D4E' testPress={this.toggleLayout} />
                    <MyButton text='PHOTO CAMERA' size={10} color='#112D4E' testPress={() => { this.props.navigation.navigate("PhotoCamera") }} />
                    <MyButton text='DELETE SELECTED' size={10} color='#112D4E' testPress={this.deleteSelectedImages} />
                </View>
                <FlatList
                    data={this.state.object}
                    numColumns={this.state.numcolumn}
                    key={this.state.numcolumn}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => {
                        return (
                            <FotoItem
                                width={this.state.width}
                                height={itemHeight}
                                source={item.uri}
                                id={item.id}
                                size={this.state.isGrid ? 7 : 15}
                                isGrid={this.state.isGrid}
                                isSelected={this.state.selectedImages.includes(item.id)}
                                toggleImageSelection={this.toggleImageSelection}
                                toBigPhoto={() => {
                                    this.props.navigation.navigate("BigPhoto", { source: item.uri, id: item.id, imgWidth: item.width, imgHeight: item.height })
                                }}
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
        flexDirection: 'column',
        backgroundColor: '#DBE2EF',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        marginBottom: '2%',
    }
});

export default Gallery;