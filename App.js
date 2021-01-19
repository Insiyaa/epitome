import { StatusBar } from 'expo-status-bar';
import React, {useEffect} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import PlaceholderScreen from './Screens/PlaceholderScreen';
import MainScreen from "./Screens/MainScreen";
import AddEntry from "./Screens/AddEntry";
import Settings from './Screens/Settings'
import { LogBox } from 'react-native';
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';
// import NotifService from './NotifService';
// import * as Font from 'expo-font';

import firebase from 'firebase';
import "firebase/firestore";

import firebaseConfig from './firebase'

console.log(firebaseConfig)
firebase.initializeApp(firebaseConfig);
// firebase.firestore().enablePersistence()
// .catch(function(err) {
//     if (err.code == 'failed-precondition') {
//         // Multiple tabs open, persistence can only be enabled
//         // in one tab at a a time.
//         // ...
//         console.log('err-1')
//     } else if (err.code == 'unimplemented') {
//         // The current browser does not support all of the
//         // features required to enable persistence
//         // ...
//         console.log('err-2')
//     }
// });

const Stack = createStackNavigator();

export default function App() {
  LogBox.ignoreLogs(['Setting a timer']);
  
  let [fontsLoaded] = useFonts({
    'Roboto': require('native-base/Fonts/Roboto.ttf'),
    'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
    'OpenSans_semiBold': require('./assets/fonts/OpenSans-SemiBold.ttf'),
  });

  if (!fontsLoaded) return <AppLoading />
  else
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="MainScreen"
          component={MainScreen}
          options={{
            title: '',
            headerStyle: {
              backgroundColor: 'white',
              elevation: 0,
              height: 0
            }
          }}  
        />
        <Stack.Screen 
          name="Settings" 
          component={Settings}
          options={{
            title: '',
            headerLeft: null,
            headerShown: false,
          }} 
        />
        <Stack.Screen 
          name="Add" 
          component={AddEntry} 
          options={{
            title: '',
            headerLeft: null,
            headerShown: false,
          }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

