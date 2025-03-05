import { StyleSheet } from 'react-native'
import React, { useContext } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Pos from './../Pages/Pos/Pos';
import Setting from './../Pages/Setting/Setting';
import Tails from './../Pages/Tails/Tails';
import Demands from '../Pages/Demands/Demands';
import DemandReturn from './../Pages/Demands/components/DemandReturn';

const Stack = createNativeStackNavigator();

const StackNavigation = () => {
  
  return (
      <Stack.Navigator screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen name='pos' component={Pos} />
        <Stack.Screen name='setting' component={Setting} />
        <Stack.Screen name='demands' component={Demands} />
        <Stack.Screen name='tails' component={Tails} />
        <Stack.Screen name='return' component={DemandReturn}/>
      </Stack.Navigator>
  )
}

export default StackNavigation

const styles = StyleSheet.create({})