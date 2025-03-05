import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Feather from 'react-native-vector-icons/Feather';
import useTheme from '../../../../Services/useTheme';

const BasketHeader = () => {
  
  const colors = useTheme();

  const styles = StyleSheet.create({
    container:{
      flex:1,
      flexDirection:'row',
    },
    leftContainer: {
      justifyContent: 'center',
      alignItems: "center",
      width: '15%',
      height: '100%'
    },
    centerContainer: {
      width: '85%',
      height: '100%',
      justifyContent:'center',
    },
    text:{
      color:colors.white,
      fontSize:20
    }
  })

  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.leftContainer}>
        <Feather name='search' size={30} color={colors.white} />
      </View>
      <View style={styles.centerContainer}>
        <Text style={styles.text}>Müştəri əlavə et</Text>
      </View>
    </TouchableOpacity>
  )
}

export default BasketHeader
