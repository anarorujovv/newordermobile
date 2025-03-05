import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import useTheme from '../../../../../Services/useTheme'
import AntDesign from 'react-native-vector-icons/AntDesign'
import priceIcon from '../../../../../Services/priceIcon'

const BasketItem = ({name,price,quantity,handleOpen,handleCansel}) => {

  const colors = useTheme();
  const styles = StyleSheet.create({
    container: {
      width: '100%',
      height:80,
      flexDirection: 'row',
      alignItems: 'center',
    },
    left:{
      width:'15%',
      height:'100%',
      justifyContent:'center',
      alignItems:'center'
    },
    center:{
      width:"65%",
      height:'100%',
      display:'flex',
      justifyContent:'space-evenly'
    },
    right:{
      width:'20%',
      height:'100%',
      flexDirection:'row',
      justifyContent:"space-around",
      alignItems:'center'
    },
    avatar:{
      width:45,
      height:45,
      backgroundColor:colors.grey_1,
      borderRadius:5,
      justifyContent:'center',
      alignItems:'center'
    },
    name:{
      color:colors.white,
      fontSize:18,
      fontWeight:'bold',
      height:40
    },
    price:{
      fontSize:16,
      fontWeight:'bold',
      color:colors.inputColors.labelColor
    },
    cansel:{
      width:40,
      height:40,
      borderWidth:1,
      borderRadius:5,
      justifyContent:'center',
      alignItems:'center'
    }
  })
  
  return (
    <TouchableOpacity onPress={handleOpen} style={styles.container}>
      <View style={styles.left}>
        <View style={styles.avatar}>
          <AntDesign name='appstore1' color={colors.orange} size={30}/>
        </View>
      </View>
      <View style={styles.center}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.price}>{price} {priceIcon.azn}</Text>
      </View>
      <View style={styles.right}>
      <Text style={styles.price}>{quantity}</Text>
        <TouchableOpacity onPress={handleCansel} style={styles.cansel}>
          <AntDesign size={30} color={colors.white} name='close'/>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  )
}

export default BasketItem
