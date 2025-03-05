import { ActivityIndicator, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react'
import useTheme from '../../Services/useTheme'
import Button from '../../Shared/UI/Button';
import demandsLocal from '../../Services/SQL/demandsLocal';
import productsLocal from './../../Services/SQL/productsLocal';

const Setting = () => {

  const [localModal, setLocalModal] = useState(false);
  const [text, setText] = useState("")

  const colors = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.primary_1,
      padding: 10
    },
    modalContainer: {
      width: '100%',
      height: '100%',
      backgroundColor: "rgba(0,0,0,0.4)",
      justifyContent: 'center',
      alignItems: 'center'
    },
    modalView: {
      width: 200,
      height: 200,
      backgroundColor: colors.primary_1,
      flexDirection: 'column',
      alignItems: 'center',
      padding: 20,
      justifyContent: "center"
    },
    loadingText: {
      color: colors.white
    }
  })
  const handleOpenModal = async () => {
    setLocalModal(true)
    await demandsLocal(setText);
    await productsLocal(setText);
    setTimeout(() => {
      setLocalModal(false);
    }, 1000);
  }

  return (
    <View style={styles.container}>

      <Button
        text={'V 2.0.9'}
        bg={colors.primary_2}
        buttonWidth={200}
        isLoading={false}
      />
      <Button
        onPress={handleOpenModal}
        text={'Sinxronizasiya et'}
        bg={colors.yellow}
        buttonWidth={200}
        isLoading={false} />
      <Modal
        animationType='fade'
        transparent={true}
        visible={localModal}
      >
        <TouchableOpacity activeOpacity={1} style={styles.modalContainer}>
          <TouchableOpacity activeOpacity={1} onPress={() => null} style={styles.modalView}>
            <ActivityIndicator size={50} color={colors.yellow} />
            <Text style={styles.loadingText}>{text}</Text>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </View>
  )
}

export default Setting