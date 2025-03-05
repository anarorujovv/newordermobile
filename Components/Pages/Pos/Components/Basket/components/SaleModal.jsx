import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import useTheme from '../../../../../Services/useTheme'
import Input from './../../../../../Shared/UI/Input';
import Button from './../../../../../Shared/UI/Button';
import { ConvertFixedTable } from '../../../../../Services/convertFiexTabel';
import useData from '../../../../../Shared/Stage/useData';

const SaleModal = ({ modalVisible, setModalVisible, getRestApiComp }) => {
    
    const basket = useData((state) => state.basket);

    const inputValues = useData((state) => state.inputValues);
    const setInputValue = useData((state) => state.setInputValue)

    const [isLoading, setIsLoading] = useState(false);

    const [isCash, setIsCash] = useState(true);

    const colors = useTheme();

    const styles = StyleSheet.create({
        container: {
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: "rgba(0,0,0,0.4)",
        },
        modalView: {
            paddingTop: 40,
            width: '90%',
            height: 600,
            backgroundColor: colors.primary_1,
            flexDirection: 'column',
            alignItems: 'center',
            padding: 20
        },
        content: {
            width: '100%',
            alignItems: 'center'
        },
        buttons: {
            width: '100%',
            height: 70,
            flexDirection: 'row',
            justifyContent: "center",
            gap: 10,
            marginTop: 20
        },
        button: {
            width: 80,
            height: 40,
            borderRadius: 5,
            backgroundColor: colors.primary_3,
            justifyContent: 'center',
            alignItems: 'center',
            shadowColor: 'black',
            shadowOffset: { width: 0, height: 5 },
            shadowRadius: 5,
            shadowOpacity: 1,
            elevation: 5
        },
        text: {
            color: colors.white,
            fontSize: 17,
            fontWeight: 'bold'
        }
    })

    let buttonGroups = [
        {
            label: '10',
            value: 10
        },
        {
            label: '20',
            value: 20,
        },
        {
            label: '50',
            value: 50
        },
        {
            label: '100',
            value: 100
        },
    ]

    const handlePress = (value) => {
        setInputValue("customerPrice", value)
    }

    const handleClose = async () => {
        setIsLoading(true)
        await getRestApiComp(isCash ? ConvertFixedTable(inputValues['customerPrice']) - ConvertFixedTable(basket.allSum) : 0, isCash);
        setIsLoading(false)
        modalBack();
    }

    const modalBack = () => {
        setInputValue("customerPrice", 0)
        setIsCash(true);
    }
    
    useEffect(() => {
        if (modalVisible) {
            setInputValue("customerPrice", ConvertFixedTable(basket.allSum));
        }
    }, [modalVisible])

    return (
        <Modal
            animationType='fade'
            transparent={true}
            visible={modalVisible}
            onRequestClose={modalBack}
        >
            <TouchableOpacity activeOpacity={1} onPress={modalBack} style={styles.container}>
                <TouchableOpacity activeOpacity={1} onPress={() => null} style={styles.modalView}>
                    <View style={{ width: '90%', alignItems: 'center' }}>
                        <View style={[styles.buttons, { marginTop: 0 }]}>
                            <TouchableOpacity activeOpacity={0.8} onPress={() => {
                                if (!isCash) {
                                    setIsCash(true)
                                }
                            }} style={[styles.button, { width: '49%' }, isCash && { backgroundColor: colors.grey_1 }]}>
                                <Text style={[styles.text, { color: colors.inputColors.borderColors }]}>Nağd</Text>
                            </TouchableOpacity>
                            <TouchableOpacity activeOpacity={0.8} onPress={() => {
                                if (isCash) {
                                    setIsCash(false)
                                }
                            }} style={[styles.button, { width: '49%' }, !isCash && { backgroundColor: colors.grey_1 }]}>
                                <Text style={[styles.text, { color: colors.inputColors.borderColors }]}>Nağdsız</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.content}>
                            <Input
                                editable={false}
                                label={'Məbləğ'}
                                inputWidth={300}
                                value={ConvertFixedTable(basket.allSum).toString()}
                            />
                            <View style={{ margin: 5 }}></View>
                            {
                                isCash &&
                                <Input
                                    inputName={"customerPrice"}
                                    label={'Ödənilən məbləğ'}
                                    inputWidth={300}
                                    placeholder="ödənilən məbləğ..."
                                    onChangeText={(e) => {
                                        setInputValue("customerPrice", e)
                                    }}
                                    value={String(inputValues['customerPrice'])}
                                />
                            }
                            {
                                isCash &&
                                <Text style={[styles.text, {
                                    marginTop: 10
                                }]}>Qaytarılacaq məbləğ:  {ConvertFixedTable(ConvertFixedTable(inputValues['customerPrice']) - ConvertFixedTable(basket.allSum))}</Text>
                            }
                        </View>
                        {
                            isCash &&
                            <View style={styles.buttons}>
                                {
                                    buttonGroups.map(item => (
                                        <TouchableOpacity activeOpacity={0.8} onPress={() => {
                                            handlePress(item.value);
                                        }} style={styles.button}>
                                            <Text style={[styles.text, {
                                                color: colors.inputColors.borderColors
                                            }]}>+{item.label}</Text>
                                        </TouchableOpacity>
                                    ))
                                }
                            </View>
                        }
                        <View style={{ margin: 20 }} />
                        <Button isLoading={isLoading} onPress={handleClose} text={'Satış et'} buttonWidth={300} bg={colors.green_1} />
                    </View>
                </TouchableOpacity>
            </TouchableOpacity>
        </Modal >
    )
}

export default SaleModal
