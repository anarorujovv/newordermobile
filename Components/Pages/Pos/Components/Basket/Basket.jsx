import { View } from 'react-native'
import React from 'react'
import BasketContent from './BasketContent'
import BasketFooter from './BasketFooter'
import useTheme from '../../../../Services/useTheme'
import BasketHeader from './BasketHeader';

const Basket = ({searchRef}) => {
  
  const colors = useTheme();

  return (
    <View style={{flex:1,backgroundColor:colors.primary_3}}>
      {/* <View style={{width:'100%',height:60}}>
        <BasketHeader/>
      </View> */}
      <View style={{flex:1}}>
        <BasketContent />
      </View>
      <View  style={{width:'100%',height:50,backgroundColor:colors.green_1}}>
        <BasketFooter searchRef={searchRef} />
      </View>
    </View>
  )
}

export default Basket

