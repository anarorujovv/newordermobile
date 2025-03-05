import { Button, FlatList, StyleSheet, View } from 'react-native'
import React, { useState } from 'react'
import BasketItem from './components/BasketItem';
import { ConvertFixedTable } from '../../../../Services/convertFiexTabel';
import BasketEditModal from './components/BasketEditModal';
import useData from '../../../../Shared/Stage/useData';
import allSumReport from '../../../../Services/allSumReport';

const BasketContent = () => {

  const basket = useData((state) => state.basket);
  const setBasket = useData((state) => state.setBasket)

  const [openModal, setOpenModal] = useState({ modal: false, index: null });

  const handleCansel = (deleteItemIndex) => {
    let basketList = { ...basket };
    basketList.positions.splice(deleteItemIndex, 1);
    if (basketList.positions[0]) {
      basketList.allSum = allSumReport(basketList.positions);
    } else {
      basketList.allSum = 0;
    }
    setBasket(basketList);
  }

  const handleOpenModal = (productIndex) => {
    setOpenModal({ modal: true, index: productIndex });
  }

  return (
    <View >
      {
        basket.positions[0] &&

        <FlatList data={basket.positions} renderItem={({ item, index }) => (
          <BasketItem handleOpen={() => {
            handleOpenModal(index)
          }} name={item.Name} price={ConvertFixedTable(item.Price)} quantity={item.quantity} handleCansel={() => {
            handleCansel(index)
          }} />
        )} />
      }
      <BasketEditModal basket={basket} setBasket={setBasket} modalVisible={openModal} setModalVisible={setOpenModal} />
    </View>
  )
}

export default BasketContent

const styles = StyleSheet.create({})