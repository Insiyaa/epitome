import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import PlaceholderScreen from './Screens/PlaceholderScreen';
import MainScreen from "./Screens/MainScreen";
import AddEntry from "./Screens/AddEntry";

const Stack = createStackNavigator();

export default function App() {
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
          component={PlaceholderScreen} 
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

