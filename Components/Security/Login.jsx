import { StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import useTheme from '../Services/useTheme'
import Foundation from 'react-native-vector-icons/Foundation';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Button from '../Shared/UI/Button';
import StackNavigation from './../Routes/StackNavigation';
import api from './../Services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Input from '../Shared/UI/Input';
import useData from '../Shared/Stage/useData';
import IconButton from '../Shared/UI/IconButton';
import Fontisto from 'react-native-vector-icons/Fontisto';
import axios from 'axios';

const Login = () => {
  const colors = useTheme();

  const inputValues = useData((state) => state.inputValues);
  const setKeyModal = useData((state) => state.setKeyModal);

  const [answer, setAnswer] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.primary_1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    form: {
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
      borderRadius: 5
    },
    headerText: {
      color: colors.white,
      fontSize: 40,
      fontWeight: 'bold'
    }
  })

  const handlePress = async () => {
    setIsLoading(true);
    let obj = {
      login: inputValues['login'], password: inputValues['password']
    }
    const result = await axios.post('https://api.akul.az/1.0/online/controllers/pos/pos_getlogin.php', obj);

    if (result.data.Headers.ResponseStatus == "0") {
      setAnswer(true);
      const data = result.data.Body;
      await AsyncStorage.setItem("rsId", data.RetailStoreId);
      await AsyncStorage.setItem("userId", data.UserId);
      await AsyncStorage.setItem("token", data.Token);
      await AsyncStorage.setItem("publicMode",data.PublicMode);

      const resultStore = await fetch(`https://api.akul.az/1.0/${data.PublicMode}/controllers/pos/pos_getretailstore.php`, {
        method: 'POST',
        headers: {
          "Token": data.Token
        },
        body: JSON.stringify({})
      })
      let answer = await resultStore.json();
      await AsyncStorage.setItem("retail", JSON.stringify(answer.Body));
      setIsLoading(true);
    } else {
      alert(result.data.Body)
    }
  }

  if (answer) return <StackNavigation />

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.headerText}>Daxil ol</Text>
        <IconButton
        onPress={() => {
          setKeyModal(true)
        }}
        br={60}
        size={60}
        icon={<Fontisto  name='keyboard' size={30} color={colors.white}/>}
        />
        <View style={{ margin: 20 }} />
        <Input
          inputName={'login'}
          label={"Login"}
          inputWidth={300}
          left={<MaterialCommunityIcons size={20} name='email' />}
          value={inputValues['login']}
          placeholder={'login...'}
        />
        <View style={{ margin: 10 }} />
        <Input
          inputName={'password'}
          label={'Şifrə'}
          inputWidth={300}
          value={inputValues['password']}
          left={<Foundation size={20} name='lock' />}
          placeholder={'şifrə...'}
        />
        <View style={{ margin: 20 }} />
        <Button isLoading={isLoading} bg={colors.primary_2} text={'Daxil ol'} onPress={handlePress} />
      </View>
    </View>
  )
}

export default Login