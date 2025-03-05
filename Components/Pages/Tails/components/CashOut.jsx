import { Modal, StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import useTheme from '../../../Services/useTheme'
import Button from './../../../Shared/UI/Button';
import AsyncStorage from '@react-native-async-storage/async-storage'
import apiHeader from '../../../Services/apiHeader'
import useData from '../../../Shared/Stage/useData'
import uuid from 'react-native-uuid';
import date from '../../../Services/date';
import Input from '../../../Shared/UI/Input';
import ToastMessage from '../../../Shared/UI/ToastMessage';
import numberReturnFormat from './../../../Services/numberReturnFormat';
import IconButton from '../../../Shared/UI/IconButton';
import Fontisto from 'react-native-vector-icons/Fontisto'
import MyKeyboardModal from '../../../Shared/Components/MyKeyboardModal';


const CashOut = ({ modalVisible, setModalVisible, tail, setTail, getReloadFunction }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [keyModal, setKeyModal] = useState(false);

    const inputValues = useData((state) => state.inputValues);
    const setInputValue = useData((state) => state.setInputValue);

    const colors = useTheme();

    const styles = StyleSheet.create({
        container: {
            flex: 1,
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
            padding: 20
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

        let sumPrice = inputValues['cashOut'];
        let time = date();
        let newJson = {
            Id: uuid.v4(),
            ShiftId: tail,
            CreateUserId: await AsyncStorage.getItem("userId"),
            Moment: time,
            Description: "",
            Name: String(new Date().getTime() + Math.ceil(Math.random() + 1) * 100),
            Sum: sumPrice,
        }

        await apiHeader('pos/pos_cashout.php', 'POST', newJson).then(async item => {
            if (item.Headers.ResponseStatus == "0") {
                backModal();
                setTail(null)
                getReloadFunction();
                ToastMessage('Məxaric olundu');
            }
        }).catch(err => {
            console.log(err)
        })

        setIsLoading(false);
    }

    const backModal = () => {
        setModalVisible(false);
        setInputValue("cashOut", 0);
    }

    useEffect(() => {
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
            <TouchableOpacity activeOpacity={1} onPress={backModal} style={styles.container}>
                <TouchableOpacity activeOpacity={1} onPress={() => null} style={styles.modalView}>
                    <IconButton onPress={() => {
                        setKeyModal(true)
                    }} icon={<Fontisto name='keyboard' size={20} color={colors.primary_2} />} />
                    <Input
                        inputName="cashOut"
                        value={String(inputValues['cashOut'])}
                        onChangeText={(e) => {
                            setInputValue("cashOut", numberReturnFormat(e));
                        }}
                        inputWidth={300}
                        label={'Məbləğ'}
                    />

                    <View style={{ margin: 10 }} />
                    <Button buttonWidth={300} isLoading={isLoading} onPress={addTailCOMP} text={'Kassa məxaric'} bg={colors.primary_2} />
                </TouchableOpacity>
            </TouchableOpacity>
            <MyKeyboardModal modal={keyModal} setModal={setKeyModal} />
        </Modal>
    )
}

export default CashOut