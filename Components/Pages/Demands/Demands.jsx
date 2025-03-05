import { ActivityIndicator, FlatList, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import useTheme from '../../Services/useTheme'
import { demandItemsSearch, getAllDemands } from '../../Shared/Stage/demands_sql'
import Item from './components/Item';
import Input from '../../Shared/UI/Input';
import IconButton from '../../Shared/UI/IconButton';
import Entypo from 'react-native-vector-icons/Entypo'
import useData from '../../Shared/Stage/useData';
import Button from '../../Shared/UI/Button';
import demandsLocal from '../../Services/SQL/demandsLocal';

const Demands = ({ navigation }) => {

  const [localModal, setLocalModal] = useState(false);
  const [text, setText] = useState("");

  const [demands, setDemands] = useState([]);

  const inputValues = useData((state) => state.inputValues);
  const setInputValue = useData((state) => state.setInputValue);
  const setKeyModal = useData((state) => state.setKeyModal);

  const colors = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.primary_1,
      paddingLeft: 10,
      paddingRight: 10
    },
    notTokenReturnText: {
      color: colors.white,
    },
    notDocumentErr: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    listContainer: {
      flex: 1,
      width: '100%'
    },
    modalContainer: {
      width: '100%',
      height: '100%',
      backgroundColor: "rgba(0,0,0,0.4)",
      justifyContent: 'center',
      alignItems: 'center'
    },
    modalView: {
      width: 200,
      height: 200,
      backgroundColor: colors.primary_1,
      flexDirection: 'column',
      alignItems: 'center',
      padding: 20,
      justifyContent: "center"
    },
    loadingText: {
      color: colors.white
    }
  })


  const getDemandsList = async () => {
    const result = await getAllDemands();
    if (result == null) {
      setDemands(null);
    } else {
      if (result[0]) {
        setDemands(result);
      } else {
        setDemands([]);
      }
    }
  }

  const getFastSearchSales = async () => {
    let searchValue = inputValues['salesSearch'];
    const result = await demandItemsSearch(searchValue);
    if (result == null) {
      setDemands(null);
    } else {
      if (result[0]) {
        setDemands(result);
      } else {
        setDemands([]);
      }
    }
  }

  const handleOpenModal = async () => {
    setDemands([]);
    setLocalModal(true)
    await demandsLocal(setText);
    setTimeout(() => {
      setLocalModal(false);
    }, 1000);
    getDemandsList();
  }

  useEffect(() => {
    let time;
    if (inputValues['salesSearch'] != "") {
      time = setTimeout(() => {
        getFastSearchSales()
      }, 500);
    } else {
      getDemandsList();
    }

    return () => clearTimeout(time);
  }, [inputValues['salesSearch']])

  return (
    <View style={styles.container}>
      <View style={{ marginTop: 10 }} />
      <Button onPress={handleOpenModal} text={'Yenilə'} bg={colors.yellow} buttonWidth={'100%'} isLoading={false} />
      <Input
        inputName={"salesSearch"}
        inputWidth={'100%'}
        label={'Axtarış'}
        value={inputValues['salesSearch']}
        onChangeText={(e) => {
          setInputValue("salesSearch", e)
        }}
        left={
          <IconButton onPress={() => {
            setKeyModal(true);
          }} bg={colors.primary_2} br={5} size={30} icon={<Entypo name='keyboard' color={colors.black} size={20} />} />
        }
      />
      {
        demands == null ?
          <View style={styles.notDocumentErr}>
            <Text>Satış listi boşdur!</Text>
          </View>
          :
          <View style={styles.listContainer}>
            {
              demands[0] ?
                <FlatList
                  data={demands}
                  renderItem={({ item, index }) => {
                    return (
                      <View>
                        <Item
                          onPress={() => {
                            navigation.navigate('return', {
                              demand: item
                            });
                          }}
                          Moment={item.Moment}
                          Amount={item.Amount}
                          Name={item.Name}
                        />
                        <View style={{ margin: 10 }} />
                      </View>
                    );
                  }}
                />
                :
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                  <ActivityIndicator size={50} color={colors.primary_2} />
                </View>
            }
          </View>
      }

      <Modal
        animationType='fade'
        transparent={true}
        visible={localModal}
      >
        <TouchableOpacity activeOpacity={1} style={styles.modalContainer}>
          <TouchableOpacity activeOpacity={1} onPress={() => null} style={styles.modalView}>
            <ActivityIndicator size={50} color={colors.yellow} />
            <Text style={styles.loadingText}>{text}</Text>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </View>
  )
}

export default Demands
