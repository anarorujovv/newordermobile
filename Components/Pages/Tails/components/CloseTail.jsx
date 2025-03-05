import { ActivityIndicator, Modal, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
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
import { closeShift } from '../../../Services/api/restShift';
import { ConvertFixedTable } from '../../../Services/convertFiexTabel';

const CloseTail = ({ modalVisible, setModalVisible, tail, setTail, getReloadFunction }) => {

    const ref = useRef(null)
    const [isLoading, setIsLoading] = useState(false);
    const [keyModal, setKeyModal] = useState(false);

    const inputValues = useData((state) => state.inputValues);
    const setInputValue = useData((state) => state.setInputValue);

    const [data, setData] = useState(null);

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

    const addTailCOMPCustomPrice = async (price) => {
        setIsLoading(true);

        let sumPrice = price;
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
                const result = await closeShift((answer) => { }, tail);
                if (result != null) {
                    backModal();
                    setTail(null)
                    getReloadFunction();
                    ToastMessage('Növbə açıldı...')
                } else {
                    ToastMessage('Növbə bağlanmadı...')
                }
            }
        }).catch(err => {
            console.log(err)
        })

        setIsLoading(false);
    }

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
                const result = await closeShift((answer) => { }, tail);
                if (result != null) {
                    backModal();
                    setTail(null)
                    getReloadFunction();
                    ToastMessage('Növbə açıldı...')
                } else {
                    ToastMessage('Növbə bağlanmadı...')
                }
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
            <TouchableOpacity activeOpacity={1} onPress={backModal} style={styles.container}>
                <TouchableOpacity activeOpacity={1} onPress={() => null} style={styles.modalView}>
                    {/* {
                        data != null
                            ?
                            <Text style={{ color: colors.white, fontSize: 20, marginBottom: 10 }}>Kassa balans: <Text style={{ fontWeight: 'bold' }}>
                                {ConvertFixedTable(data.Body.CashBalance)} {priceIcon.azn}</Text></Text>
                            :
                            ''
                    } */}
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
                    {
                        data != null ?

                            <View style={styles.balanceRow}>
                         
                                <Button buttonWidth={300} isLoading={isLoading} onPress={() => {
                                    addTailCOMPCustomPrice(ConvertFixedTable(data.Body.CashBalance))
                                }} text={'Kassa balansını sıfırla'} bg={colors.primary_2} />

                            </View>

                            :
                            <ActivityIndicator size={20} color={colors.white} />
                    }
                    <View style={{ margin: 10 }} />
                    <Button buttonWidth={300} isLoading={isLoading} onPress={addTailCOMP} text={'Kassa məxaric'} bg={colors.primary_2} />
                </TouchableOpacity>
            </TouchableOpacity>
            <MyKeyboardModal modal={keyModal} setModal={setKeyModal} />
        </Modal>
    )
}

export default CloseTail