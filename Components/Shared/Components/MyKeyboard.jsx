import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import useTheme from '../../Services/useTheme'
import useData from '../Stage/useData';

const MyKeyboard = () => {

  const colors = useTheme();
  const setInputValue = useData((state) => state.setInputValue);
  const focusedInput = useData((state) => state.focusedInput);
  const inputValues = useData((state) => state.inputValues);
  const keyModal = useData((state) => state.keyModal)
  const setKeyModal = useData((state) => state.setKeyModal)

  const styles = StyleSheet.create({
    modalView: {
      width: '100%',
      height: '50%',
      backgroundColor: colors.primary_5,
      alignItems: 'flex-end',
      justifyContent: 'center',
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
      width: '6%',
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
    headerLetter: ['@', 'q', 'ü', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p',"ö","ğ", 'Delete'],
    contentLetter: ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l',"ı","ə"],
    bottomLetter: ['z', 'x', 'c', 'v', 'b', 'n', 'm',"ç","ş", '.']
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

  useEffect(() => {
    if (focusedInput == null) {
      setKeyModal(false);
    }
  }, [focusedInput])
  return (
    focusedInput != null ?
      keyModal ?
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
            <TouchableOpacity
              onPress={() => {
                setKeyModal(false)
              }}
              style={styles.fakeButton}>
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
              setKeyModal(false)
            }} style={[styles.button, {
              width: '16%'
            }]}>
              <Text style={styles.buttonText}>Bağla</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
        :
        ''
      :
      ''
  )
}

export default MyKeyboard

