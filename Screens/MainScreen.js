import React, { Component, useState, useEffect } from 'react';
import { Container, Header, Left, Body, Right, Button, Icon, Title, Text, Picker } from 'native-base';
import { StyleSheet, TouchableOpacity, FlatList, View, TouchableHighlight, ScrollView } from 'react-native';
import Modal from 'react-native-modal';
import HTML from "react-native-render-html";
// import {Picker} from '@react-native-picker/picker';
// import RNPickerSelect from 'react-native-picker-select';
import { Entypo, MaterialIcons } from '@expo/vector-icons';
import firebase from 'firebase';
import "firebase/firestore";
// import { LogBox } from 'react-native';



// We will have a flat list of dates, and store the content in state. On clicking title update state and pass that
// state data into the modal and open the modal.



// Use React hooks to populate data


export default function MainScreen({ navigation }) {
	// LogBox.ignoreAllLogs()
		// need to render as list of modals
	const [entries, setEntries] = useState({'daily': [], 'monthly': []});


	const [label, setLabel] = useState('daily');
	useEffect(() => {
		let data = []
		firebase.firestore()
		.collection(label)
		.get()
		.then(querySnapshot => {
			// console.log('Total users: ', querySnapshot.size);

			querySnapshot.forEach(documentSnapshot => {
				// console.log('User ID: ', documentSnapshot.id, documentSnapshot.data());
				data.push(documentSnapshot.data());
			});
			let newEntries = {'daily': [], 'monthly': []}
			newEntries[label] = data;
			setEntries(newEntries);
		});
	}, [label])

	const onPressItem = (index) => {
		console.log('item pressed')
		setModalData(entries[label][index]);
		toggleModal();
	}
	const MyItem = ({item, index}) => (
		<TouchableOpacity 
		onPress={() => {
			onPressItem(index);
		}}
		>
			<Text style={styles.itemText}>{item.title}</Text>
		</TouchableOpacity>
	)
	const renderItem = ({ item, index }) => (
		<MyItem 
			style={styles.row}
			item={item}
			index={index}
			onPressItem={() => {
				onPressItem(item);
			}}
		/>
	);

	const keyExtractor = (item, index) => item.timestamp.toString()

	const flatListItemSeparator = () => {
		return (
			<View
			style={styles.itemSeparator}
			/>
		);
	}

	const Content = () => {
		return (
			<FlatList
				data={entries[label]}
				renderItem={renderItem}
				keyExtractor={keyExtractor}
			/>
		);	
	}
	const toggleModal = () => {
		setModalVisible(!isModalVisible);
	};
	

	// function MyModal({item}) {
	// 	return (
				

	// );
	// }

	const [isModalVisible, setModalVisible] = useState(false);
	const [modalData, setModalData] = useState({title: '', body: ''});
	
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
						<Picker.Item label="Daily" value="daily" />
						<Picker.Item label="Monthly" value="monthly" />
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
			<Modal isVisible={isModalVisible}>
				<View style={{flex: 1}}>
					<Text>{modalData.title}</Text>
					<HTML source={{ html: modalData.body }} />

					<Button title="Hide modal" onPress={toggleModal} ><Text> Hide Modal</Text></Button>
				</View>
			</Modal>

			{/* <ScrollView style={styles.container}> */}
				<FlatList 
					data={entries[label]}
					ItemSeparatorComponent = {flatListItemSeparator}
					renderItem={renderItem}
					keyExtractor={keyExtractor}
				/>
			{/* </ScrollView> */}
			


			{/* <Content label={label} /> */}
			<TouchableOpacity
				style={styles.floatingButton}
				onPress={() => {
					navigation.navigate("Add")
					console.log('add pressed')
				}}
			>
				<Entypo name="plus" size={24} color="white" />
			</TouchableOpacity>
			{/* {modalVisible && <MyModal item={modalData} /> } */}
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
	},
	floatingButton: {
		borderWidth:1,
		borderColor:'rgba(0,0,0,0.2)',
		alignItems:'center',
		justifyContent:'center',
		width:60,
		position: 'absolute',                                          
		bottom: '4%',                                                    
		right: '8%',
		height:60,
		backgroundColor:'black',
		borderRadius:100,
	},
	container: {
    flex: 1,
    // justifyContent: 'center',
    padding: 20,
    backgroundColor: 'red',
  },
  innerContainer: {
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: 'blue',
  },
	buttonContainer: {
			paddingVertical: 15,
			marginTop: 20,
			backgroundColor: '#2c3e50',
			borderRadius: 15
	},
	buttonText: {
			textAlign: 'center',
			color: '#ecf0f1',
			fontWeight: '700'
	},
	itemText: {
		padding: 10,
		fontSize: 15,
		color: '#ecf0f1',
	},
	itemSeparator: {
		height: 1,
		width: "100%",
		backgroundColor: "#34495e",
	},
	row: {
		backgroundColor: '#2c3e50',
		borderRadius: 5
	},
});