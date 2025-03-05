import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import useTheme from '../../Services/useTheme'
import useData from '../Stage/useData';

const MyKeyboard = ({ modal, setModal }) => {

    const colors = useTheme();
    const setInputValue = useData((state) => state.setInputValue);
    const focusedInput = useData((state) => state.focusedInput);
    const inputValues = useData((state) => state.inputValues);
    const keyModal = useData((state) => state.keyModal)
    const setKeyModal = useData((state) => state.setKeyModal)


    const styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'flex-end',
            alignItems: 'center'
        },
        modalView: {
            width: '100%',
            height: '50%',
            backgroundColor: colors.primary_1,
            justifyContent: 'center',
            alignItems: 'flex-end',
            bottom: 0,
            zIndex: 9999999,
            paddingTop: 10
        },
        row: {
            width: '100%',
            flexDirection: 'row',
            marginBottom: 10,
            gap: 3,
            alignItems: 'center',
            justifyContent: 'center'
        },
        button: {
            width: '8%',
            height: 60,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: colors.white,
            borderRadius: 5,
        },
        buttonText: {
            fontSize: 20,
            color: colors.black,
        },
        fakeButton: {
            width: '12%',
            height: 60,
            backgroundColor: colors.white,
            borderRadius: 5,
            justifyContent: 'center',
            alignItems: 'center'
        }
    })

    let keyboardJsonFile = {
        keyboardNumbers: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '='],
        headerLetter: ['@', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'Delete'],
        contentLetter: ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
        bottomLetter: ['z', 'x', 'c', 'v', 'b', 'n', 'm', '.']
    };

    const handleAddKeyboardElement = (value) => {

        if (focusedInput == null) return;

        if (value == "Delete") {
            let inputText = inputValues[focusedInput];
            let newText = String(inputText).slice(0, -1);
            setInputValue(focusedInput, newText);
        } else {
            let inputText = inputValues[focusedInput];
            inputText += value;
            setInputValue(focusedInput, inputText);
        }

    }

    const backToModal = () => {
        setModal(false);
    }

    return (
        focusedInput != null ?
            <Modal
                visible={modal}
                transparent={true}
            >
                <TouchableOpacity style={styles.container} activeOpacity={1} onPress={backToModal}>
                    <TouchableOpacity activeOpacity={1} onPress={() => ""} style={styles.modalView}>

                        <View style={styles.row}>
                            {
                                keyboardJsonFile.keyboardNumbers.map(element => (
                                    <TouchableOpacity onPress={() => {
                                        handleAddKeyboardElement(element)
                                    }} style={styles.button}>
                                        <Text style={styles.buttonText}>{element}</Text>
                                    </TouchableOpacity>
                                ))
                            }
                        </View>

                        <View style={styles.row}>
                            {
                                keyboardJsonFile.headerLetter.map(element => (
                                    <TouchableOpacity onPress={() => {
                                        handleAddKeyboardElement(element)
                                    }} style={styles.button}>
                                        <Text style={styles.buttonText}>{element}</Text>
                                    </TouchableOpacity>
                                ))
                            }
                        </View>

                        <View style={styles.row}>
                            <TouchableOpacity style={styles.fakeButton}>
                                <Text style={styles.buttonText}>Shift</Text>
                            </TouchableOpacity>
                            {
                                keyboardJsonFile.contentLetter.map(element => (
                                    <TouchableOpacity onPress={() => {
                                        handleAddKeyboardElement(element)
                                    }} style={styles.button}>
                                        <Text style={styles.buttonText}>{element}</Text>
                                    </TouchableOpacity>
                                ))
                            }
                            <TouchableOpacity onPress={() => {
                                setModal(false)
                            }} style={styles.fakeButton}>
                                <Text style={styles.buttonText}>Enter</Text>
                            </TouchableOpacity>

                        </View>

                        <View style={styles.row}>
                            <TouchableOpacity style={[styles.fakeButton, {
                                width: '16%'
                            }]}>
                                <Text style={styles.buttonText}>Ctrl</Text>
                            </TouchableOpacity>
                            {
                                keyboardJsonFile.bottomLetter.map(element => (
                                    <TouchableOpacity onPress={() => {
                                        handleAddKeyboardElement(element)
                                    }} style={styles.button}>
                                        <Text style={styles.buttonText}>{element}</Text>
                                    </TouchableOpacity>
                                ))
                            }
                            <TouchableOpacity onPress={() => {
                                setModal(false)
                            }} style={[styles.button, {
                                width: '16%'
                            }]}>
                                <Text style={styles.buttonText}>Bağla</Text>
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>
                </TouchableOpacity>
            </Modal>
            :
            ''
    )
}

export default MyKeyboard

