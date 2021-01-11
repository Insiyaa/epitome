import React, { Component, useState, useEffect } from 'react';
import { Container, Header, Left, Body, Right, Button, Icon, Title, Text } from 'native-base';
import { StyleSheet } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import { Entypo, MaterialIcons } from '@expo/vector-icons';

// Use React hooks to populate data
function Daily() {
	return <Text>Daily!</Text>;
	
}

function Monthly() {
	return <Text>Monthly</Text>;
}

function Content(label) {
	label = label['label']
	if (label == 'Daily') {
		return <Daily />
	} else {
		return <Monthly />
	}
}

export default function MainScreen({ navigation }) {

	const [label, setLabel] = useState('Daily');
	
	
	return (
		<Container>
			<Header style={styles.header}>
				<Left>
					<Entypo name="feather" size={30} color="black" />
				</Left>
				<Body>
					<Picker
						selectedValue={label}
						mode={'dropdown'}
						style={styles.picker}
						onValueChange={(itemValue, itemIndex) =>
							setLabel(itemValue)
						}>
						<Picker.Item label="Daily" value="Daily" />
						<Picker.Item label="Monthly" value="Monthly" />
					</Picker>
				</Body>
				<Right>
					<Button 
						transparent
						onPress={() => {
							navigation.navigate('Settings')
						}}
					>
					<MaterialIcons name="settings" size={24} color="black" />
					</Button>
				</Right>
			</Header>
			<Content label={label} />
		</Container>
	);
}

const styles = StyleSheet.create({
  picker: {
		height: '100%',
		width: 130,
		left: '40%',
		padding: 0
	},
	header: {
		backgroundColor: '#C4C4C4'
	}
});