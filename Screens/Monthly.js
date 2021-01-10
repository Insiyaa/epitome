import React, { Component } from 'react';
import { Container, Header, Left, Body, Right, Button, Icon, Title, Text } from 'native-base';
import {Picker} from '@react-native-picker/picker';


export default function Monthly({ navigation }) {
	return (
		<Container>
			<Header>
				<Body>
					<Picker
						selectedValue='Monthly'
						style={{height: 50, width: 100}}
						onValueChange={(itemValue, itemIndex) =>
							navigation.navigate(itemValue)
						}>
						<Picker.Item label="Daily" value="Daily" />
						<Picker.Item label="Monthly" value="Monthly" />
					</Picker>
				</Body>
				<Right>
					<Button transparent>
						<Text>Settings</Text>
					</Button>
				</Right>
			</Header>
		</Container>
	);
}