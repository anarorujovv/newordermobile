import { ActivityIndicator, Modal, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import useTheme from '../../../Services/useTheme'
import Button from './../../../Shared/UI/Button';
import AsyncStorage from '@react-native-async-storage/async-storage'
import uuid from 'react-native-uuid';
import apiHeader from '../../../Services/apiHeader'
import useData from '../../../Shared/Stage/useData'
import ToastMessage from './../../../Shared/UI/ToastMessage';
import { ConvertFixedTable } from '../../../Services/convertFiexTabel';
import Input from '../../../Shared/UI/Input';
import date from './../../../Services/date';
import IconButton from '../../../Shared/UI/IconButton';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MyKeyboardModal from './../../../Shared/Components/MyKeyboardModal';
import { openShift } from '../../../Services/api/restShift';
import priceIcon from '../../../Services/priceIcon';
import numberReturnFormat from '../../../Services/numberReturnFormat';

const AddTail = ({ modalVisible, setModalVisible, tail, getReloadFunction }) => {

  const [isLoading, setIsLoading] = useState(false);

  const inputValues = useData((state) => state.inputValues);
  const setInputValue = useData((state) => state.setInputValue);
  const setTail = useData((state) => state.setTail);

  const [keyModal, setKeyModal] = useState(false);
  const [data, setData] = useState(null)

  const colors = useTheme();

  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => {
    setInputValue("cashIn", !isEnabled ? ConvertFixedTable(data.Body.CashBalance) : "0");
    setIsEnabled(previousState => !previousState)
  };

  const styles = StyleSheet.create({
    container: {
      width: '100%',
      height: '100%',
      backgroundColor: "rgba(0,0,0,0.4)",
      justifyContent: 'center',
      alignItems: 'center'
    },
    modalView: {
      width: '90%',
      backgroundColor: colors.primary_1,
      flexDirection: 'column',
      alignItems: 'center',
      padding: 20,
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
      width: '20%',
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    balanceRow: {
      width: '100%',
      flexDirection: "row",
      justifyContent: 'center',
      alignItems: 'center',
      gap: 20
    },
    balanceRowText: {
      color: colors.white,
    }
  })

  const addTailCOMP = async () => {

    setIsLoading(true);
    let tailAnswer = tail;

    if (tailAnswer == null) {
      const result = await openShift((answer) => { });
      if (result != null) {
        setTail(result)
        tailAnswer = result;
      } else {
        ToastMessage('Növbə açılmadı...')
      }
    }

    let time = date();
    let sumPrice = ConvertFixedTable(inputValues['cashIn']);

    let newJson = {
      Id: uuid.v4(),
      ShiftId: tailAnswer,
      CreateUserId: await AsyncStorage.getItem("userId"),
      Moment: time,
      Description: "",
      Name: String(new Date().getTime() + Math.ceil(Math.random() + 1) * 100),
      Sum: sumPrice == "" ? 0 : sumPrice,
    }

    await apiHeader('pos/pos_cashin.php', 'POST', newJson).then(item => {
      if (item.Headers.ResponseStatus == "0") {
        backModal();
        getReloadFunction();
        ToastMessage('Növbə açıldı...');
      }
    }).catch(err => {
      console.log(err)
    })

    setIsLoading(false)
  }

  const backModal = () => {
    setModalVisible(false);
    setInputValue("cashIn", 0);
    setIsEnabled(false);
  }

  const getComp = async () => {
    setData(await apiHeader('pos/pos_getretailstore.php', 'POST', {}))
  }

  useEffect(() => {
    if (modalVisible) {
      getComp();
    }
    if (!modalVisible) {
      backModal();
    }
  }, [modalVisible])

  return (
    <Modal
      animationType='fade'
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => backModal()}
    >
      <TouchableOpacity activeOpacity={1} style={styles.container}>
        <TouchableOpacity activeOpacity={1} onPress={() => null} style={styles.modalView}>
          {/* {
            data != null ?
              <Text style={{ color: colors.white, fontSize: 20, marginBottom: 10 }}>Kassa balans: <Text style={{fontWeight:'bold'}}>
                {ConvertFixedTable(data.Body.CashBalance)} {priceIcon.azn}</Text></Text>
              :
              <ActivityIndicator size={20} color={colors.white} />
          } */}

          <IconButton onPress={() => {
            setKeyModal(true)
          }} icon={<Fontisto name='keyboard' size={20} color={colors.primary_2} />} />
          <Input
            inputName={'cashIn'}
            value={String(inputValues['cashIn'])}
            inputWidth={300}
            onChangeText={(e) => {
              setInputValue("cashIn", numberReturnFormat(e));
            }}
            label={'Məbləğ'}
          />

          <View style={{ margin: 10 }} />
          <Button buttonWidth={300} isLoading={isLoading} onPress={addTailCOMP} text={'Kassa mədaxil'} bg={colors.primary_2} />

        </TouchableOpacity>
      </TouchableOpacity>
      <MyKeyboardModal modal={keyModal} setModal={setKeyModal} />
    </Modal>
  )
}

export default AddTail