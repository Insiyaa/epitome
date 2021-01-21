import React, { useState } from "react";

import {
    ScrollView,
    StyleSheet,
} from 'react-native';

import { Body, Container, Header, Left, Right, Picker } from 'native-base';
import moment from 'moment'

import {actions, RichEditor, RichToolbar} from 'react-native-pell-rich-editor';

import { MaterialIcons } from '@expo/vector-icons';


import firebase from 'firebase';
import "firebase/firestore";

const saveEntry = (collection, data, currentUserUID) => {
	console.log(collection, data)
	let title = '';
	if (collection === 'daily') {
		title = moment().format('ddd, MMMM Do YYYY');
	} else {
		title = moment().format('MMMM');
	}

	firebase
	.firestore()
	.collection('users')
	.doc(currentUserUID)
	.collection(collection)
	.add({
	  title: title,
	  body: data,
	  timestamp: Date.now()
	})
	.then(() => {
	  console.log('Entry added!');
	});	
}


export default function AddEntry({navigation}) {
	const [label, setLabel] = useState('daily');
	const [richText] = useState(React.createRef());
	const [disabled] = useState(false);
	const initHTML = `<b>Summary:</b>
	</br>
	<b>Satisfaction (out of 10): </b>
	</br>
	<b>Location: </b>
	`;
	const [richHTML, setRichHTML] = useState(initHTML);
	let currentUserUID = firebase.auth().currentUser.uid;

	
  return (
    <Container>
			<Header style={styles.header}>
				<Left>
					<MaterialIcons 
						name="close" 
						size={26} 
						color="#6F6F6F"
						onPress={() => {
							navigation.goBack()
						}}
						/>
				</Left>
				<Body>
					<Picker
						selectedValue={label}
						mode={'dropdown'}
						style={styles.picker}
						onValueChange={(itemValue) =>
							setLabel(itemValue)
						}>
						<Picker.Item label="Daily" value="daily" />
						<Picker.Item label="Monthly" value="monthly" />
					</Picker>
				</Body>
				<Right>
					<MaterialIcons 
						name="save" 
						size={26} 
						color="#6F6F6F" 
						onPress={() => {
							console.log('save pressed')
							saveEntry(label, richHTML, currentUserUID)
							navigation.goBack()
						}}
					/>
				</Right>
			</Header>
			<ScrollView style={[styles.scroll]} keyboardDismissMode={'none'}>
					<RichToolbar
							style={[styles.richBar]}
							flatContainerStyle={styles.flatStyle}
							editor={richText}
							disabled={disabled}
							selectedIconTint={'#2095F2'}
							disabledIconTint={'#bfbfbf'}
							actions={[
								actions.keyboard,
								actions.setBold,
								actions.setItalic,
								// actions.setStrikethrough,
								actions.setUnderline,
								actions.insertBulletsList,
								actions.insertOrderedList,
								// actions.checkboxList,
								actions.removeFormat,
								actions.undo,
								actions.redo
							]}
					/>
					<RichEditor
							// initialFocus={true}
							disabled={disabled}
							editorStyle={styles.contentStyle} // default light style
							ref={richText}
							style={styles.rich}
							placeholder={'Please input content'}
							initialContentHTML={initHTML}
							editorInitializedCallback={() => {
								richText.current?.registerToolbar()
							}}
							onChange={(html) => {
								setRichHTML(html)
							}}
							// onPaste={that.handlePaste}
							// onKeyUp={that.handleKeyUp}
							// onKeyDown={that.handleKeyDown}
							// onMessage={that.handleMessage}
							// onFocus={that.handleFocus}
							// onBlur={that.handleBlur}
							pasteAsPlainText={true}
					/>
					
			</ScrollView>
    </Container>
  );
}

const styles = StyleSheet.create({
	header: {
		backgroundColor: '#EDEDED'
	},
	headerBody: {
		fontSize: 18,
		fontWeight: 'bold',
		textAlign: 'center',
		left: '50%'
	},
    contentStyle: {
        backgroundColor: '#fff',
        color: '#000033',
    },
    container: {
        flex: 1,
        backgroundColor: '#efefef',
    },
    rich: {
        minHeight: 300,
        flex: 1,
    },
    richBar: {
        borderColor: '#efefef',
        borderTopWidth: StyleSheet.hairlineWidth,
    },
    scroll: {
        backgroundColor: '#ffffff',
	},
	picker: {
		height: '100%',
		width: 130,
		left: '40%',
		padding: 0,
		color: '#777777'
	},
});

