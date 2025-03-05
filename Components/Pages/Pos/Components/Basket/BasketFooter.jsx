import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import IconButton from './../../../../Shared/UI/IconButton';
import Entypo from 'react-native-vector-icons/Entypo'
import priceIcon from '../../../../Services/priceIcon'
import useTheme from '../../../../Services/useTheme';
import useData from '../../../../Shared/Stage/useData';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';
import { ConvertFixedTable } from '../../../../Services/convertFiexTabel';
import apiHeader from '../../../../Services/apiHeader';
import ErrorSound from './../../../../Services/Sound/ErrorSound';
import SuccessSound from './../../../../Services/Sound/SuccessSound';
import SaleModal from './components/SaleModal';
import { openShift } from '../../../../Services/api/restShift';
import ToastMessage from '../../../../Shared/UI/ToastMessage';
import date from '../../../../Services/date';
import InfoSound from '../../../../Services/Sound/InfoSound';
import WarningSound from './../../../../Services/Sound/WarningSound';
import AddTail from '../../../Tails/components/AddTail';
import { createSale, createSalesTable, deleteSaleItem, getAllSalesTable } from '../../../../Shared/Stage/sale_sql';


const BasketFooter = ({ searchRef }) => {

    const basket = useData((state) => state.basket);
    const setBasket = useData((state) => state.setBasket)
    const tail = useData((state) => state.tail);
    const setTail = useData((state) => state.setTail);

    const cloudIncreases = useData((state) => state.cloudIncreases);
    const cloudReduce = useData((state) => state.cloudReduce);

    const [saleModal, setSaleModal] = useState(false);
    const [tailModal, setTailModal] = useState(false);


    const colors = useTheme();

    const styles = StyleSheet.create({
        text: {
            color: colors.stableWhite,
            fontSize: 20,
            fontWeight: 'bold'
        }
    })

    const [isLoading, setIsLoading] = useState(false);

    const handlePressDemand = async () => {
        setIsLoading(true)
        let basketInfo = { ...basket };
        if (!basketInfo.positions[0]) {
            alert("Səbət boşdur!")
            WarningSound()
        } else {
            if (tail != null) {
                setSaleModal(true)
            } else {
                const result = await openShift(() => { });
                if (result != null) {
                    setTail(result);
                    InfoSound()
                    setTailModal(true);
                    alert("Növbə açıldı")

                } else {
                    alert("Növbə açılmadı!")
                }
            }
        }
        setIsLoading(false)
    }



    const restApiFunct = async (mB, isCash) => {
        if (ConvertFixedTable(mB)< 0) {
            WarningSound();
            alert("Qaytarılacaq məbləğ 0 dan aşağı ola bilməz!")
        } else {
            let basketInfo = { ...basket };

            let saleOBJ = {
                Id: uuid.v4(),
                ShiftId: tail,
                OwnerId: await AsyncStorage.getItem("userId"),
                Modify: "2024-05-21T15:57:26.606422+04:00",
                Name: String(new Date().getTime() + Math.ceil(Math.random() + 1) * 100),
                Moment: date(),
                CustomerId: "",
                EmployeeId: "",
                Amount: 0,
                Bank: 0,
                UseBonus: 0.0,
                Credit: 0.0,
                AllSum: basketInfo.allSum,
                MoneyBack: mB,
                Discount: 0.0,
                Description: "",
                Items: [
                ]
            }


            if (isCash) {
                saleOBJ.Amount = saleOBJ.AllSum;
            } else {
                saleOBJ.Bank = saleOBJ.AllSum;
            }


            for (let index = 0; index < basketInfo.positions.length; index++) {
                let position = basketInfo.positions[index];
                let obj = {
                    ProductId: position.Id,
                    Party: "",
                    UnitId: position.UnitId,
                    BasicPrice: ConvertFixedTable(position.Price),
                    Price: ConvertFixedTable(position.Price),
                    Quantity: position.quantity,
                    VatPercentage: position.VatPercentage,
                    PriceExcVat: position.PriceExclVat,
                    UnitId: position.UnitId,
                    Ratio: position.Units[0].Ratio
                }
                saleOBJ.Items.push(obj);
            }
            const d = await getAllSalesTable();
            if (d == null) {
                await createSalesTable();
            }
            const insert = await createSale(saleOBJ);

            // const insertSalesData = await createDemand(saleOBJ);
            // for (let index = 0; index < saleOBJ.Items.length; index++) {
            //     let item = saleOBJ.Items[index];
            //     const insertSalesItems = await createDemandItems(item, saleOBJ.Id);
            //     console.log(insertSalesItems);
            // }



            if (insert == 1) {
                setBasket({
                    positions: [],
                    allSum: 0
                })
                SuccessSound();
                ToastMessage("ƏMƏLİYYAT UĞURLA BAŞA ÇATDI")
                if (searchRef.current) {
                    searchRef.current.focus();
                }
                cloudIncreases();
                setSaleModal(false);
            } else {
                alert("SATIŞ İCRA OLUNMADI!")
                ErrorSound();
            }
        }

    }

    const getSalesRefresh = async () => {
        const result = await getAllSalesTable();
        if (result != null) {
            if (result[0]) {
                let list = [...result];
                list.forEach(   element => {
                    element.CustomerId = null;
                    element.Description = null;
                    element.EmployeeId = null;
                })

                for (let index = 0; index < list.length; index++) {
                    const result = await apiHeader('pos/pos_sale.php', 'POST', list[index]);
                    if (result.Headers.ResponseStatus == "0") {
                        const deleteAnswer = await deleteSaleItem(list[index].Id);
                        if (deleteAnswer != null) {
                            cloudReduce()
                        }
                    }
                }

            }
        }
    }

    useEffect(() => {
        const interval = setInterval(() => {
            getSalesRefresh();
        }, 30000);
        return () => clearInterval(interval);
    }, []);

    return (
        <>
            <View style={{ flexDirection: 'row' }}>
                <View style={{ width: '13%', height: '100%' }}>
                    <IconButton size={'100%'} icon={<Entypo name='dots-three-vertical' size={15} />} />
                </View>
                <TouchableOpacity onPress={handlePressDemand} style={{ width: "87%", height: '100%', flexDirection: 'row', justifyContent: 'space-between', paddingRight: 40, paddingLeft: 20, alignItems: 'center' }}>
                    {
                        isLoading ?

                            <ActivityIndicator size={25} color={colors.white} />
                            :
                            <>

                                <Text style={styles.text}>Satış</Text>
                                <Text style={styles.text} >{ConvertFixedTable(basket.allSum)} {priceIcon.azn}</Text>
                            </>
                    }
                </TouchableOpacity>
            </View>
            <SaleModal modalVisible={saleModal} setModalVisible={setSaleModal} getRestApiComp={restApiFunct} />
            <AddTail tail={tail} setTail={setTail} modalVisible={tailModal} setModalVisible={setTailModal} getReloadFunction={() => { }} />
        </>
    )
}

export default BasketFooter
