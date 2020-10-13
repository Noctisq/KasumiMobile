
import React from 'react';
import { StyleSheet, Alert, View, ActivityIndicator, ScrollView, TextInput, TouchableOpacity, Button } from 'react-native';
import SongCard from '../components/songCard';


export default function ModalSc(props: any) {


    const [text, setText] = React.useState('');
    const [results, setResults] = React.useState<object[]>([])
    const [load, setLoading] = React.useState(false);
    const searchSongs = () => {
        setLoading(true)
        fetch('https://kasumiotravez.herokuapp.com/kasumi/searchMusic', {
            method: 'POST',
            headers: {
                Accept: 'application/json, text/plain,',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                search: text,
            }),
        }).then(response => {
            return response.json()
        }).then(response => {
            setResults(response);
            setLoading(false);
        })

    }

    const addToqueue = (element: any) => {
        setLoading(true);
        console.log("CHIGNAS A TU PUTA AMDRE PENDEJO", element)
        fetch('https://kasumiotravez.herokuapp.com/kasumi/addSong', {
            method: 'POST',
            headers: {
                Accept: 'application/json, text/plain,',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                song: element,
            }),
        }).then(response => {
           
            setLoading(false);
        }).catch(err => {
            console.log(err)
        })
    }
    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row', height: 50 }}>
                <View
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                        backgroundColor: '#000',
                        borderWidth: 0,
                    }}
                />
                <View
                    style={{
                        flex: 6,
                        justifyContent: 'center',
                        backgroundColor: '#000',
                        borderWidth: 0,
                    }}>
                    <View style={styles.inputSection}>

                        <TextInput
                            onChangeText={text => setText(text)}
                            placeholder="Busca una cancion senpai"
                            style={styles.textInput} />
                    </View>
                </View>
                <View
                    style={{
                        flex: 1,
                        backgroundColor: '#000',
                        justifyContent: 'space-evenly',
                    }}>

                </View>
            </View>
            <ScrollView style={{ flex: 1, backgroundColor: '#181818' }}>
                {

                    load ? <ActivityIndicator color="white"></ActivityIndicator>
                        : results.map(element => {
                            console.log(element)
                            return (
                                <TouchableOpacity onPress={() => {
                                    addToqueue(element)
                                }} key={element.id}>
                                    <SongCard props={element}></SongCard>
                                </TouchableOpacity>
                            );
                        })
                }
            </ScrollView>
            <Button
                onPress={searchSongs}
                title="Buscar"
                color="#ee0206"
                accessibilityLabel="Learn more about this purple button"
            />
            <Button
                onPress={props.props}
                title="Salir"
                color="#ee0206"
                accessibilityLabel="Learn more about this purple button"
            />
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',

    },

    textInput: {
        flex: 1,
        fontFamily: 'p5hatty',
        color: 'black',
        marginLeft: 10,
        fontSize: 20
        // borderWidth: 1
    },
    crearPublicacionesInput: {
        color: '#616161',
        marginLeft: 10,
    },
    searchIcon: {
        padding: 8,
        margin: 6,
        height: 38,
        width: 40,
        alignItems: 'center',
    },
    inputSection: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',

        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#000',
        height: 38,
        borderRadius: 20,
        margin: 0,
    },
    crearPublicacionArea: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#f2f2f2',
        height: 80,

        backgroundColor: '#f2f2f2',
        justifyContent: 'center',
        flexDirection: 'row',
    },

    inputContainer: {
        flexDirection: 'row',

        alignItems: 'center',
        backgroundColor: '#fff',
        borderWidth: 0.5,
        borderColor: '#fff',
        height: 50,

        margin: 10,
        flex: 1,
    },
});
