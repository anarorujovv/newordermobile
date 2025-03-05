import { StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useRef } from 'react'
import useTheme from '../../Services/useTheme'
import Products from './Components/Products/Products';
import Basket from './Components/Basket/Basket';
import { WifiGlobalContext } from '../../Shared/Stage/WifiGlobalStatus';

const Pos = ({ navigation }) => {

  const colors = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.primary_1,
      flexDirection: 'row'
    }
  })

  const { searchRef } = useContext(WifiGlobalContext);

  return (
    <View style={styles.container}>

      <View style={{ width: '60%', height: '100%' }}>
        <Products searchRef={searchRef} navigation={navigation} />
      </View>
      <View style={{ width: '40%', height: '100%', borderLeftWidth: 0.5, borderColor: colors.grey_1 }}>
        <Basket searchRef={searchRef} navigation={navigation} />
      </View>
    </View>
  )
}

export default Pos
