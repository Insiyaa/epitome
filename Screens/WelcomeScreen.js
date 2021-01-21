import {ImageBackground, StyleSheet, View, Text} from 'react-native';
import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function WelcomeScreen ({navigation}) {
  return (
     <ImageBackground
      style={styles.background}
      source={require('../assets/background.jpg')}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Welcome to Epitome</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Sign Up')} >
        <Text style={styles.buttonText}>Sign Up</Text>
       </TouchableOpacity>
      <Text style={styles.inlineText}>Already have an account?</Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Sign In')}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>
     </ImageBackground>
  )
}
const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: 150,
    borderRadius: 50,
    borderColor: 'white',
    backgroundColor: '#DADADA',
    padding: 5,
    margin: '2%'
  },
  buttonText: {
    fontSize: 16,
    fontFamily: 'OpenSans_semiBold',
    color: '#6F6F6F',
    textAlign: 'center',
    padding: 5
  },
  inlineText: {
    fontSize: 16,
    fontFamily: 'OpenSans_semiBold',
    color: '#DADADA',
    textAlign: 'center',
    marginTop: '5%',
  },
  title: {
    fontSize: 28,
    fontFamily: 'OpenSans_semiBold',
    color: 'white',
    textAlign: 'center'
  },
  titleContainer: {
    position: 'absolute',
    top: 170,
  },
});