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
		style={styles.listItem}
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
		<Container style={styles.container}>
			<Header style={styles.header}>
				<Left>
					<Entypo name="feather" size={32} color="#6F6F6F" />
				</Left>
				<Body>
					<Picker
						selectedValue={label}
						mode={'dropdown'}
						style={styles.picker}
						onValueChange={(itemValue, itemIndex) =>
							setLabel(itemValue)
						}>
						<Picker.Item label="Daily" value="daily" style={{fontFamily: 'OpenSans_semiBold'}}/>
						<Picker.Item label="Monthly" value="monthly"  style={{fontFamily: 'OpenSans_semiBold'}}/>
					</Picker>
				</Body>
				<Right>
					<Button 
						transparent
						onPress={() => {
							navigation.navigate('Settings')
						}}
					>
					<MaterialIcons name="settings" size={24} color="#6F6F6F" />
					</Button>
				</Right>
			</Header>
			<TouchableOpacity
				style={styles.floatingButton}
				onPress={() => {
					navigation.navigate("Add")
					console.log('add pressed')
				}}
			>
				<Entypo name="plus" size={24} color="#6F6F6F" />
			</TouchableOpacity>
			<View>


				<Modal propagateSwipe
				isVisible={isModalVisible}
				>
					<View style={{flex:1}}>
						<View style={styles.modalTitle}>
							<Text style={styles.modalTitleText}>
							{modalData.title}
							</Text>
						</View>
						
						<ScrollView style={styles.modalBody}>
							<HTML source={{ html: modalData.body }} style={styles.modalBodyText} />
						</ScrollView>
						
						<Button title="Hide modal" onPress={toggleModal} style={styles.closeButton}>
							<MaterialIcons 
							name="close" 
							size={26} 
							color="#6F6F6F"
							/>
						</Button>
					</View>
				</Modal>

				{/* <ScrollView > */}
					<FlatList 
						data={entries[label]}
						// ItemSeparatorComponent = {flatListItemSeparator}
						renderItem={renderItem}
						keyExtractor={keyExtractor}
					/>
				{/* </ScrollView> */}
			
			</View>
		</Container>
	);
}

const styles = StyleSheet.create({
  	container: {
		backgroundColor: '#EDEDED',
		fontFamily: 'OpenSans_semiBold',
	},
	picker: {
		height: '100%',
		width: 130,
		left: '40%',
		padding: 0,
		color: '#6F6F6F',
		fontFamily: 'OpenSans_semiBold',

	},
	header: {
		backgroundColor: '#EDEDED',
		elevation: 0
	},
	floatingButton: {
		// borderWidth:1,
		// borderColor:'rgba(0,0,0,0.2)',
		alignItems:'center',
		justifyContent:'center',
		// width:60,
		// position: 'absolute',                                          
		// top: '10%',                                                    
		// right: '50%',
		// height:60,
		backgroundColor:'#DADADA',
		margin: '5%',
		marginBottom: 0,
		height: '6%',
		borderRadius: 10,
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
	listItem: {
		backgroundColor: 'white',
		margin: '6%',
		marginBottom: 0,
		height: 50,
		borderRadius: 10,
		justifyContent: 'center'
	},
	itemText: {
		// padding: 10,
		fontSize: 15,
		color: '#484848',
		alignContent: 'center',
		alignSelf:'center',
		fontFamily: 'OpenSans_semiBold',

	},
	itemSeparator: {
		height: 1,
		width: "100%",
		backgroundColor: "#34495e",
	},
	row: {
		backgroundColor: 'white',
		borderRadius: 5
	},
	modalTitle: {
		backgroundColor: 'white',
		marginBottom: 0,
		height: 50,
		borderRadius: 10,
		justifyContent: 'center'
		
	},
	modalTitleText: {
		fontSize: 15,
		color: '#484848',
		alignContent: 'center',
		alignSelf:'center',
		fontFamily: 'OpenSans_semiBold',
	},
	modalBody: {
		marginTop: '6%',
		marginBottom: '6%',
		backgroundColor: 'white',
		height: 30,
		borderRadius: 10,
		padding: '6%'
	},
	modalBodyText: {
		fontSize: 15,
		color: '#484848',
		alignContent: 'center',
		alignSelf:'center',
		fontFamily: 'OpenSans_semiBold',
	},
	closeButton: {
		alignSelf: 'center',
		width: '20%',
		justifyContent: 'center',
		backgroundColor: 'white',
		borderRadius: 100
	}
});