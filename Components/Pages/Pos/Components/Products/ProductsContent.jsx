import { ActivityIndicator, ScrollView, StyleSheet, View } from 'react-native'
import React, { useContext } from 'react'
import CardItem from '../../../../Shared/UI/CardItem'
import { ConvertFixedTable } from './../../../../Services/convertFiexTabel';
import useTheme from '../../../../Services/useTheme';
import allSumReport from '../../../../Services/allSumReport';
import useData from '../../../../Shared/Stage/useData';
import BeepSound from '../../../../Services/Sound/BeepSound';
import { WifiGlobalContext } from '../../../../Shared/Stage/WifiGlobalStatus';

const ProductsContent = ({ data, setData }) => {

  const { searchRef } = useContext(WifiGlobalContext);

  const setInputValue = useData((state) => state.setInputValue);
  
  const basket = useData((state) => state.basket);
  const setBasket = useData((state) => state.setBasket);

  const colors = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: '100%',
      height: '100%',
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 10,
      padding: 10
    }
  })
  
  const handlePressProduct = (item, index) => {
    searchRef.current.focus();
    BeepSound();
    setData(null)
    let basketInfo = { ...basket };
    basketInfo.positions.push({ ...item, quantity: 1 });
    if (basketInfo.positions[0]) {
      basketInfo.allSum = allSumReport(basketInfo.positions);
    }

    setBasket(basketInfo);
    setInputValue("productsSearch", "")
  }

  

  return (
    <ScrollView>
      <View style={styles.container}>
        {
          data == null ?
            ""
            :
            data[0] ?
              data.map((item, index) => (
                <CardItem isDisabled={item.shown} press={() => {
                  handlePressProduct(item, index);
                }} quantity={item.quantity} inBasket={item.inBasket} key={item.Id} name={item.Name} price={ConvertFixedTable(item.Price)} />
              ))
              :
              <View style={{
                width: '100%',
                height: '100%',
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                <ActivityIndicator size={60} color={colors.orange} />
              </View>
        }
      </View>
    </ScrollView>
  )
}

export default ProductsContent
