import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import useTheme from '../../Services/useTheme'
import IconButton from './IconButton';
import AntDesign from 'react-native-vector-icons/AntDesign';

const CountController = ({quantity}) => {

  const colors = useTheme();

  const styles = StyleSheet.create({
    container: {
      width: '100%',
      height: '100%',
      justifyContent:'center',
      alignItems:'center',
      marginTop:5
    },
    viewContainer:{
      width:'100%',
      height:'100%',
      backgroundColor:colors.primary_5,
      borderRadius:100,
      flexDirection:'row',
      justifyContent:'space-between',
      alignItems:'center',
      paddingLeft:2,
      paddingRight:2
    },
    count:{
      color:colors.white,
      fontSize:18,
    }

  })

  return (
    <View style={styles.container}>
      <View style={styles.viewContainer}>
        <IconButton size={30} br={100} bg={colors.primary_1} icon={<AntDesign size={18} name='minus'/>}/>
        <Text style={styles.count}>{quantity}</Text>
        <IconButton size={30} br={100} bg={colors.primary_1} icon={<AntDesign size={18} name='plus'/>}/>
      </View>
    </View>
  )
}

export default CountController

