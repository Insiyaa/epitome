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
import { Body, Button, Container, Header, Left, Right } from 'native-base';

import {actions, getContentCSS, RichEditor, RichToolbar} from 'react-native-pell-rich-editor';

import { MaterialIcons } from '@expo/vector-icons';





export default function AddEntry({navigation}) {
	const [richText, setRichText] = useState(React.createRef());
	const [disabled, setDisabled] = useState(false);
	const [richHTML, setRichHTML] = useState('');
	const theme =  Appearance.getColorScheme();
	const initHTML = `<b>Summary:</b>
	</br>
	<b>Satisfaction (out of 10): </b>
	</br>
	<b>Location: </b>
	`;
  return (
    <Container>
			<Header style={styles.header}>
				<Left>
					<MaterialIcons 
						name="close" 
						size={26} 
						color="black"
						onPress={() => {
							navigation.goBack()
						}}
						/>
				</Left>
				<Body>
					<Text style={styles.headerBody}>
						Add Entry
					</Text>
				</Body>
				<Right>
					<MaterialIcons name="save" size={26} color="black" />
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
									actions.setStrikethrough,
									actions.setUnderline,
									actions.insertBulletsList,
									actions.insertOrderedList,
									actions.checkboxList,
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
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
		},
		header: {
			backgroundColor: '#C4C4C4'
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
        // placeholderColor: '#a9a9a9',
        // cssText: '#editor {background-color: #f3f3f3}', // initial valid
        // contentCSSText: 'font-size: 16px; min-height: 200px; height: 100%;', // initial valid
    },
    container: {
        flex: 1,
        backgroundColor: '#efefef',
    },
    nav: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 5,
    },
    rich: {
        minHeight: 300,
        flex: 1,
    },
    topVi: {
        backgroundColor: '#fafafa',
    },
    richBar: {
        borderColor: '#efefef',
        borderTopWidth: StyleSheet.hairlineWidth,
    },
    richBarDark: {
        backgroundColor: '#191d20',
        borderColor: '#696969',
    },
    scroll: {
        backgroundColor: '#ffffff',
    },
    scrollDark: {
        backgroundColor: '#2e3847',
    },
    darkBack: {
        backgroundColor: '#191d20',
    },
    item: {
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: '#e8e8e8',
        flexDirection: 'row',
        height: 40,
        alignItems: 'center',
        paddingHorizontal: 15,
    },

    input: {
        flex: 1,
    },

    tib: {
        textAlign: 'center',
        color: '#515156',
    },
    flatStyle: {
        paddingHorizontal: 12,
		},
		saveButton: {
			// width: '20%',
			borderRadius: 20,
			alignContent: 'center',
			alignSelf: 'center'

		},
		buttonText: {
			padding: 20
		}
});

