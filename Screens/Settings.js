import React, { Component, useState } from "react";
import {
    Appearance,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';
import { Body, Button, Container, Header, Left, Right, Picker } from 'native-base';
import moment from 'moment'

import {actions, getContentCSS, RichEditor, RichToolbar} from 'react-native-pell-rich-editor';

import { MaterialIcons } from '@expo/vector-icons';
// import {Picker} from '@react-native-picker/picker';


// import firebase from 'firebase';
// import "firebase/firestore";




export default function AddEntry({navigation}) {

  return (
    <Container>
			<Header style={styles.header}>
				<Left>
					<MaterialIcons 
						name="arrow-back" 
						size={26} 
						color="#6F6F6F"
						onPress={() => {
							navigation.goBack()
						}}
						/>
				</Left>
				<Body>
					<Text style={styles.headerText}>
                        Settings
                    </Text>
				</Body>

			</Header>
			
    </Container>
  );
}

const styles = StyleSheet.create({
	header: {
		backgroundColor: '#EDEDED'
	},
	headerText: {
        fontSize: 16,
		color: '#484848',
        fontFamily: 'OpenSans_semiBold',
        left: '20%'
    }
});

