import { Modal, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import useTheme from '../../../Services/useTheme'
import Input from '../../../Shared/UI/Input';
import Button from '../../../Shared/UI/Button';
import adminLoginApi from './../../../Services/api/adminLoginApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useData from '../../../Shared/Stage/useData';
import Entypo from 'react-native-vector-icons/Entypo'
import MyKeyboardModal from '../../../Shared/Components/MyKeyboardModal';

const AdminLoginModal = ({ modal, setModal, reload }) => {

  const colors = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const [keyModal, setKeyModal] = useState(false);

  const inputValues = useData((state) => state.inputValues);
  const setInputValue = useData((state) => state.setInputValue)

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "rgba(0,0,0,0.4)",
      justifyContent: 'center',
      alignItems: 'center'
    },
    modalView: {
      width: '50%',
      height: '60%',
      backgroundColor: colors.primary_1,
    },
    view: {
      flex: 1,
      width: '100%',
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center'
    }
  })

  const backModal = () => {
    setModal(false);
    setInputValue("adminLogin", "");
    setInputValue("adminPassword", "");
  }

  const handleLogin = async () => {

    setIsLoading(false)

    if (!inputValues['adminLogin'] || !inputValues['adminPassword']) return;

    const result = await adminLoginApi({ Login: inputValues['adminLogin'], Password: inputValues['adminPassword'] });
    if (result.data.Headers.ResponseStatus == "0") {
      await AsyncStorage.setItem("adminToken", result.data.Body.Token)
      reload();
      backModal();
    } else {
      console.log(result.data.Body);
    }

    setIsLoading(false);
  }

  return (
    <Modal
      visible={modal}
      onRequestClose={backModal}
      transparent={true}
    >
      <TouchableOpacity activeOpacity={1} style={styles.container}>
        <TouchableOpacity activeOpacity={1} style={styles.modalView}>

          <ScrollView>
            <View style={styles.view}>
              <TouchableOpacity onPress={() => {
                setKeyModal(true);
              }} style={styles.right}>
                <Entypo name='keyboard' color={colors.primary_2} size={30} />
              </TouchableOpacity>
              <Input
                inputName={"adminLogin"}
                value={inputValues['adminLogin'] || ""} inputWidth={'50%'} label={'Login'} />
              <Input
                inputName={"adminPassword"}
                value={inputValues['adminPassword'] || ""} inputWidth={'50%'} label={"Şifrə"} />
              <View style={{ marginTop: 40 }} />
              <Button
                onPress={handleLogin}
                text={'Daxil ol'} buttonWidth={'50%'} bg={colors.primary_2} isLoading={isLoading} />
            </View>
          </ScrollView>

        </TouchableOpacity>
      </TouchableOpacity>

      <MyKeyboardModal modal={keyModal} setModal={setKeyModal} />
    </Modal>
  )
}

export default AdminLoginModal
