import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {signIn} from '../firebaseMethods';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handlePress = () => {
    if (!email) {
      Alert.alert('Email field is required.');
    }

    if (!password) {
      Alert.alert('Password field is required.');
    }

    signIn(email, password);
    setEmail('');
    setPassword('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Sign in to your account:</Text>

      <TextInput
        style={styles.formInput}
        placeholder="Enter your email"
        value={email}
        onChangeText={(email) => setEmail(email)}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.formInput}
        placeholder="Enter your password"
        value={password}
        onChangeText={(password) => setPassword(password)}
        secureTextEntry={true}
      />

      <TouchableOpacity style={styles.button} onPress={handlePress}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 120,
    padding: 5,
    backgroundColor: '#6F6F6F',
    // borderWidth: 2,
    borderColor: 'white',
    borderRadius: 50,
    alignSelf: 'center',
    margin: "2%",
  },
  buttonText: {
    fontSize: 16,
    color: 'white',
    fontFamily: 'OpenSans_semiBold',
    textAlign: 'center',
    padding: 2
  },
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: '#EDEDED',
    alignItems: 'center',
    justifyContent: 'center',
  },
  formInput: {
    width: 300,
    fontSize:18,
    borderWidth: 1,
    borderColor:'#DADADA',
    borderRadius: 10,
    padding: 10,
    margin: 5,
  },
  text: {
    textAlign: 'center',
    fontSize: 18,
    margin: 10,
    fontFamily: 'OpenSans_semiBold',
    color: '#6F6F6F',
  }
});