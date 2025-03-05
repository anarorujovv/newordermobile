import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import useTheme from '../../../../../Services/useTheme'
import Button from '../../../../../Shared/UI/Button'
import IconButton from '../../../../../Shared/UI/IconButton'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Input from './../../../../../Shared/UI/Input';
import { ConvertFixedTable } from '../../../../../Services/convertFiexTabel'
import allSumReport from '../../../../../Services/allSumReport'
import UnitsSelection from './../../../../../Shared/UI/UnitsSelection';
import { WifiGlobalContext } from '../../../../../Shared/Stage/WifiGlobalStatus'

const BasketEditModal = ({ modalVisible, setModalVisible, basket, setBasket }) => {

    const { searchRef } = useContext(WifiGlobalContext);
    const [product, setProduct] = useState(null);
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
            width: '90%',
            height: 600,
            backgroundColor: colors.primary_3,
            flexDirection: 'column',
            alignItems: 'center',
            paddingBottom: 20,
            position: "relative",
            justifyContent: 'center',
            paddingTop: 70
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
        header: {
            width: '100%',
            height: "5%",
            backgroundColor: colors.primary_1,
            position: 'absolute',
            top: 0
        },
        buttonAndName: {
            position: 'absolute',
            flexDirection: 'row',
            alignItems: 'center',
            width: '100%',
            top: 10,
            left: 20
        },
        text: {
            fontSize: 17,
            color: colors.white,
            fontWeight: 'bold',
            marginLeft: 10,
            width: '70%',
        },
        quantityController: {
            width: 300,
            height: 70,
            backgroundColor: colors.grey_1,
            borderRadius: 300,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: "space-between",
            paddingLeft: 5,
            paddingRight: 5,
            marginTop: 50,
        },
        quantity: {
            fontSize: 30,
            color: colors.inputColors.labelColor,
            fontWeight: "bold",
        },
        inputTopText: {
            color: colors.yellow,
            fontWeight: "bold",
            width: 300,
            fontSize: 18
        }
    })

    const save = async () => {
        let basketInfo = { ...basket };
        basketInfo.positions[modalVisible.index] = { ...product };
        if (basketInfo.positions[0]) {
            basketInfo.allSum = allSumReport(basketInfo.positions);
        }
        setBasket(basketInfo);
        setModalVisible({ modal: false, index: null });
        searchRef.current.focus();
    }

    const getComponent = async () => {
        let index = modalVisible.index;
        let info = { ...basket.positions[index] };
        info.Price = String(ConvertFixedTable(info.Price))

        setProduct(info);
    }

    useEffect(() => {
        if (modalVisible.modal) {
            getComponent();
        } else {

        }
    }, [modalVisible])

    return (
        product == null ?
            ""
            :
            <Modal
                animationType='fade'
                transparent={true}
                visible={modalVisible.modal}
                onRequestClose={() => setModalVisible(rel => ({ ...rel, ['modal']: false }))}
            >
                <TouchableOpacity activeOpacity={1} onPress={() => {
                    setModalVisible(rel => ({ ...rel, ['modal']: false }))
                }} style={styles.container}>
                    <TouchableOpacity activeOpacity={1} onPress={() => null} style={styles.modalView}>
                        <View style={styles.header} />
                        <View style={styles.buttonAndName}>
                            <View style={{ borderWidth: 4, borderRadius: 90, borderColor: colors.primary_3 }}>
                                <IconButton bg={colors.primary_1} size={50} br={50} icon={<AntDesign name="appstore1" colors={colors.inputColors.labelColor} size={30} />} />
                            </View>
                            <Text style={styles.text}>{product.Name}</Text>
                        </View>

                        <Input
                            label={"Qiymət"}
                            inputWidth={300}
                            value={product.Price}
                            editable={false}
                            placeholder='qiymət'
                        />
                        <View style={{ margin: 10 }} />
                        <UnitsSelection
                            label={'Vahid'}
                            inputWidth={300}
                            info={product}
                            setInfo={setProduct}
                            value={product.UnitId}
                            selections={product.Units}
                        />
                        <View style={styles.quantityController}>
                            <IconButton disabled={product.quantity == 1} onPress={() => {
                                setProduct(rel => ({ ...rel, ['quantity']: String(Number(rel.quantity) - 1) }))
                            }} bg={product.quantity == 1 ? colors.inputColors.borderColor : colors.primary_1} size={60} br={60} icon={
                                <AntDesign name='minus' size={30} color={colors.primary_2} />
                            } />
                            <Text style={styles.quantity}>{product.quantity}</Text>
                            <IconButton onPress={() => {
                                setProduct(rel => ({ ...rel, ['quantity']: String(Number(rel.quantity) + 1) }))
                            }} bg={colors.primary_1} size={60} br={60} icon={
                                <AntDesign name='plus' color={colors.primary_2} size={30} />
                            } />
                        </View>
                        <View style={{ width: '100%', alignItems: 'center', marginTop: 100 }}>
                            <Button buttonWidth={300} onPress={save} text={'Yadda Saxla'} bg={colors.yellow} />
                        </View>
                    </TouchableOpacity>
                </TouchableOpacity>
            </Modal>
    )
}

export default BasketEditModal