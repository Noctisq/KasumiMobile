import React, {useState} from 'react';

import {
  StyleSheet,
  Platform,
  View,
  Text,
  TouchableOpacity,
  Image,
  Linking,
  Alert
} from 'react-native';

export default function SongCard({props}) {
  return (
    <View style={styles.container}>
      <View style={styles.upperCard}>
        <View style={styles.Profile}>
          <Image
            source={{uri: props.img}}
            style={{
              width: 50,
              height: 50,
              margin: 10,

              borderRadius: 120 / 2,
            }}
          />
          <View style={styles.TextContainer}>
            <Text style={styles.Name}>{props.title}</Text>
            <Text style={styles.Role}>{props.author}</Text>
          </View>
        </View>
       
      </View>
      <View style={styles.lowerCard}>
      <Text style={styles.Role}>{props.url}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 150,
    marginBottom: 10,
    marginLeft: 15,
    marginRight: 15,
    borderColor: '#ee0206',
    borderLeftWidth: 10,
  },

  upperCard: {
    backgroundColor: '#000',

    flexDirection: 'row',

    flex: 0.7,
  },
  Profile: {
    flex: 0.95,
    flexDirection: 'row',
  },
  TextContainer: {
    justifyContent: 'center',
  },
  Name: {
    color: 'white',
    fontSize: 18,
    marginBottom: 5,
    fontFamily: 'p5hatty'
  },
  Role: {
    fontSize: 20,
    fontFamily: 'p5hatty',
    color: "white"
  },
  ext: {
    flexDirection: 'column-reverse',
    alignContent: 'space-between',
  },
  NumExt: {
    fontSize: 18,
  },

  lowerCard: {
    backgroundColor: '#000',
    flex: 0.3,
    flexDirection: 'row',
    justifyContent:'center',
    alignItems: 'center'
  },

  email: {
    flex: 0.6,
    marginLeft: 7,
    alignItems: 'center',

    flexDirection: 'row',
  },

  number: {
    flex: 0.4,

    alignItems: 'center',

    flexDirection: 'row',
  },
  emailText: {
    marginLeft: 5,
    fontSize: 12,
  },
});
