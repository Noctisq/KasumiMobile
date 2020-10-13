
import React, { useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, SafeAreaView, ImageBackground, ActivityIndicator, ActivityIndicatorBase, Alert, Modal } from 'react-native';
import ModalSc from './search'
import Slider from '@react-native-community/slider';

let intervals: NodeJS.Timeout[] = [];


interface Song {
    title?: string,
    url?: string,
    img?: string,
    duration?: string
}

const pause = () => {

    fetch('https://kasumiotravez.herokuapp.com/kasumi/pause', {
        method: 'get',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    });
    clearInterval(intervals[0]);
    intervals.shift()
}




export default function Inicio() {

    const [load, setLoading] = React.useState(true);
    const [songs, setSongs] = React.useState<Song[]>([]);
    const [currentSong, setCurrentSong] = React.useState<Song | undefined>({})
    const [time, setTime] = React.useState<number>(1);
    const [modalVisible, setVisible] = React.useState(false);

    const skip = () => {
        fetch('https://kasumiotravez.herokuapp.com/kasumi/skip', {
            method: 'get',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        });
    
        setTime(0);
    }

    useEffect(() => {


        fetch('https://kasumiotravez.herokuapp.com/kasumi/getQueue', {
            method: 'get',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        }).then((response => {
            return response.json();
        })).then((response => {
            onSongsRecieved(response);
            setFirstSong();
        }))

    }, [songs])

    useEffect(() => {

        const interval = setInterval(() => {
            console.log("ya")
            setTime((prevState) => (prevState + 1))
        }, 1000);

        interval

        intervals.push(interval);


    }, [])

    const resume = () => {

        fetch('https://kasumiotravez.herokuapp.com/kasumi/resume', {
            method: 'get',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        });

        const interval = setInterval(() => {
            console.log("ya")
            setTime((prevState) => (prevState + 1))
        }, 1000);
        interval
        intervals.push(interval);
    }

    const onSongsRecieved = (songs: Song[]) => {
        setSongs(songs);
    }


    const setFirstSong = () => {
        const currentsong = songs?.shift();
        setCurrentSong(currentsong);
    }

    const setModal = () => {
        
        setVisible(false);
    }

    const getDuration = () => {
        let stringM = '';
        let stringS = '';
        const intNum = parseInt(currentSong?.duration || '2') / 60;
        const minutes = Math.floor(intNum);
        const seconds = parseInt(currentSong?.duration || '2') % 60;


        if (seconds < 10 && minutes > 9) {
            stringS = '0' + seconds.toString();
            stringM = minutes.toString();

        } else if (minutes < 10 && seconds > 9) {
            stringM = '0' + minutes.toString();
            stringS = seconds.toString();
        } else if (minutes < 10 && seconds < 10) {
            stringM = '0' + minutes.toString();
            stringS = '0' + seconds.toString();
        } else {

            stringM = minutes.toString();
            stringS = seconds.toString();

        }


        return stringM?.toString() + ':' + stringS?.toString();

    }

    console.log(songs)
    return (


        <SafeAreaView style={styles.container}>

            <View style={styles.imageContainer}>
                <Image
                    source={

                        { uri: currentSong?.img }
                    }

                    style={{
                        flex: 1


                    }}
                    resizeMode='cover'
                />

            </View>
            <View style={styles.player}>
                <Text style={styles.text}>{currentSong?.title}</Text>
                <Text style={styles.textArt}>{currentSong?.url}</Text>
                <View style={{
                    flexDirection: "column"
                }} pointerEvents="none">


                    <Slider
                        style={{ marginTop: 20, width: 300, alignSelf: "center" }}
                        value={time}
                        minimumValue={0}
                        maximumValue={parseInt(currentSong?.duration || '2')}
                        thumbTintColor={"#f2f2f2"}
                        minimumTrackTintColor="#f2f2f2"
                        maximumTrackTintColor="#f2f2f2"
                    />


                    <View style={{
                        flexDirection: 'row',
                        width: 300,
                        alignSelf: "center"

                    }}>


                    </View>

                </View>
                <ImageBackground source={require('../images/bgB.png')} style={{

                    flexDirection: "row",
                    height: 370,
                    marginTop: 40,

                }}>
                    <View style={{
                        flex: 0.33,
                        marginTop: 40,
                    }}>
                        <TouchableOpacity onPress={resume}>
                            <View>
                                <Image
                                    source={
                                        require('../images/BotonPlayKasumi.png')
                                    }

                                    style={{
                                        width: 150,
                                        height: 100,
                                        alignSelf: "center",
                                        marginTop: 40,
                                    }}
                                    resizeMode='contain'
                                />
                            </View>

                        </TouchableOpacity>
                        <TouchableOpacity onPress={skip}>
                            <Image
                                source={
                                    require('../images/BotonNextKasumi.png')
                                }

                                style={{
                                    width: 150,
                                    height: 100,
                                    alignSelf: "center",
                                    marginLeft: 30,

                                }}
                                resizeMode='contain'
                            />
                        </TouchableOpacity>
                    </View>

                    <View style={{
                        flex: 0.33,


                    }}>
                        <Image
                            source={
                                require('../images/kasumi.png')
                            }

                            style={{
                                marginTop: 80,
                                width: 150,
                                height: 175,
                                borderRadius: 120 / 2
                            }}

                        />
                    </View>
                    <View style={{
                        flex: 0.33
                    }}>
                        <TouchableOpacity onPress={pause}>
                            <Image
                                source={
                                    require('../images/BotonPauseKasumi.png')
                                }
                                style={{
                                    width: 150,
                                    height: 100,
                                    alignSelf: "center",
                                    marginTop: 80,
                                }}
                                resizeMode='contain'
                            />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                            setVisible(true);
                        }}>
                            <Image
                                source={
                                    require('../images/BotonPauseKasumi.png')
                                }
                                style={{
                                    width: 150,
                                    height: 100,
                                    alignSelf: "center",

                                }}
                                resizeMode='contain'
                            />
                        </TouchableOpacity>
                    </View>
                </ImageBackground>
            </View>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                }}
            >
                <ModalSc props={setModal}></ModalSc>
            </Modal>
        </SafeAreaView>



    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#191919',

    },

    imageContainer: {
        marginLeft: 50,
        marginRight: 50,
        marginTop: 50,
        marginBottom: 30,
        flex: 0.3,

    },
    player: {

        flex: 0.7,

    },
    text: {
        color: 'white',
        marginLeft: 60, fontSize: 30,
        fontFamily: 'p5hatty',
        marginRight: 60
    },
    textArt: {
        color: 'white',
        marginLeft: 60, marginTop: 3, fontSize: 15,
        fontFamily: 'p5hatty'
    }
});
