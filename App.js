import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// ************************* Screens **************************
// import PlaceholderScreen from './Screens/PlaceholderScreen';
import MainScreen from "./Screens/MainScreen";
import AddEntry from "./Screens/AddEntry";
import Settings from './Screens/Settings'
import WelcomeScreen from './Screens/WelcomeScreen'
import SignUp from "./Screens/SignUp";
import LoadingScreen from "./Screens/LoadingScreen";
import SignIn from "./Screens/SignIn";

import { LogBox } from 'react-native';

import AppLoading from 'expo-app-loading';

import { useFonts } from 'expo-font';

// Firebase
import firebase from 'firebase';
import "firebase/firestore";

import firebaseConfig from './firebase'

if (!firebase.apps.length) {
  console.log('Connected with Firebase')
  firebase.initializeApp(firebaseConfig);
}

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
        name={'Loading'} 
        component={LoadingScreen} 
        options={{ headerShown: false }}
        />
        
        <Stack.Screen 
        name='Home' 
        component={WelcomeScreen} 
        options={{ headerShown: false }}
        />

        <Stack.Screen 
        name='Sign Up' 
        component={SignUp} 
        options={{ headerShown: false }}
        />

        <Stack.Screen 
        name='Sign In' 
        component={SignIn} 
        options={{ headerShown: false }}
        />

        <Stack.Screen
          name="MainScreen"
          component={MainScreen}
          options={{
            title: '',
            headerLeft: null,
            headerShown: false,
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


