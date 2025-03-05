import { Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useRef, useState } from 'react'
import useTheme from '../../Services/useTheme'
import Fontisto from 'react-native-vector-icons/Fontisto'
import DefaultInput from '../UI/DefaultInput'

const CustomersModal = ({ modalVisible, setModalVisible }) => {

  const ref = useRef(null)

  const colors = useTheme();

  const styles = StyleSheet.create({
    container: {
      width: '100%',
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: "rgba(0,0,0,0.4)"
    },
    modalView: {
      width: '50%',
      height: '50%',
      backgroundColor: colors.primary_1
    },
    inputContainer: {
      width: '100%',
      height: 70,
      borderWidth: 2,
      borderColor: colors.yellow,
      flexDirection: 'row',
      borderRadius: 5
    },
    iconContainer: {
      width: '10%',
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center'
    },
    input: {
      width: '80%',
      height: '100%',
      color: colors.white,
      fontSize: 20,
      paddingRight: '5%',
      fontWeight: 'bold'
    },
    item: {
      width: '100%',
      height: 70,
      justifyContent: 'center',
      paddingLeft: '10.5%'
    },
    itemText: {
      fontSize: 20,
      color: colors.white,
      fontWeight: 'bold'
    },
    right: {
      width: '10%',
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center'
    }
  })

  return (
    <Modal
      animationType='fade'
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <TouchableOpacity activeOpacity={1} onPress={() => {
        setModalVisible(false)
      }} style={styles.container}>
        <TouchableOpacity activeOpacity={1} onPress={() => null} style={styles.modalView}>

          <View style={styles.inputContainer}>
            <View style={styles.iconContainer}>
              <Fontisto name='search' color={colors.yellow} size={30} />
            </View>

            <DefaultInput
              ref={ref}
              placeholder='Поиск покупателя по имени, телефону, email и дисконтной карте'
              placeholderTextColor={colors.inputColors.borderColor}
              cursorColor={'white'} style={styles.input} />
          </View>
          <TouchableOpacity activeOpacity={1} style={styles.item}>
            <Text style={styles.itemText}>Hello World</Text>
          </TouchableOpacity>

        </TouchableOpacity>
      </TouchableOpacity>

    </Modal>
  )
}

export default CustomersModal