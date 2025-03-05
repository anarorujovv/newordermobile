import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import useTheme from '../../Services/useTheme'
import useData from '../../Shared/Stage/useData'
import apiHeader from '../../Services/apiHeader';
import Button from '../../Shared/UI/Button';
import AddTail from './components/AddTail';
import CloseTail from './components/CloseTail';
import { ConvertFixedTable } from '../../Services/convertFiexTabel';
import priceIcon from '../../Services/priceIcon';
import CashOut from './components/CashOut';

const Tails = () => {
  const colors = useTheme();
  const [tailList, setTailList] = useState(null)
  const [shiftLoading, setShiftLoading] = useState(false);

  const tail = useData((state) => state.tail)
  const setTail = useData((state) => state.setTail);

  const basket = useData((state) => state.basket);

  const [inModal, setInModal] = useState(false);
  const [outModal, setOutModal] = useState(false);
  const [cashOutModal, setCashOutModal] = useState(false);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.primary_1,
    },
    header: {
      gap: 10,
      width: '100%',
      height: 60,
      backgroundColor: colors.primary_3,
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingLeft: 50,
      paddingRight: 50,
    },
    left: {
      flexDirection: 'row',
      alignItems: 'center'
    },
    right: {
      flexDirection: 'row',
      width: 500,
      justifyContent: "space-between",
      alignItems: 'center'
    },
    item: {
      width: '100%',
      backgroundColor: colors,
      paddingTop: 30,
      paddingBottom: 30,
      paddingLeft: 20,
      paddingRight: 20,
      borderRadius: 5,
    },
    text: {
      color: colors.white,
      fontSize: 18
    },
    textEnd: {
      color: colors.white,
      fontSize: 18,
    },
    row: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between'
    }
  })

  const getShiftList = async () => {
    setTailList([]);
    let date = new Date();
    let obj = {
      FromDate: date
    };
    const result = await apiHeader('pos/pos_sync_shifts.php', 'POST', obj);
    if (result.Body[0].Status == 1) {
      setTail(result.Body[0].Id);
    }
    setTailList(result.Body);
  }

  const OpenShift = async () => {
    setInModal(true)
  }

  const CloseShift = async () => {
    setOutModal(true)
  }

  const handleOutSum = async () => {
    setCashOutModal(true);
  }

  useEffect(() => {
    getShiftList();
  }, [])

  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <View style={styles.left}>
          <Button onPress={tail == null ? OpenShift : CloseShift} text={tail == null ? 'Növbə aç' : 'Növbəni bağla'} bg={tail == null ? colors.green_1 : colors.red} buttonWidth={200} isLoading={shiftLoading} />
        </View>
       {
        tail != null &&
        <View style={styles.right}>
        <Button onPress={handleOutSum} text={'Kassa Məxaric'} bg={colors.primary_2} buttonWidth={200} />
      </View>
       }
      </View>
      <View style={{ margin: 10 }} />
      {
        tailList == null
          ?
          ""
          :
          tailList[0] ?

            <FlatList
              data={tailList}
              renderItem={({ item, index }) => {
                return (
                  <View style={{
                    paddingLeft: 50,
                    paddingRight: 50,
                    marginBottom: 10
                  }}>
                    <View style={[styles.item, item.Status == 1 && { backgroundColor: colors.green_1 }]}>
                      <View style={styles.row}>
                        <Text style={styles.text}>Növbə açılma vaxtı</Text>
                        <Text style={styles.textEnd}>{item.OpenMoment}</Text>
                      </View>
                      <View style={styles.row}>
                        <Text style={styles.text}>Açılanda balans</Text>
                        <Text style={[styles.textEnd, { fontWeight: 'bold' }]}>{ConvertFixedTable(item.CloseBalance)} {priceIcon.azn}</Text>
                      </View>

                      {
                        item.CloseMoment != null ?
                          <>
                            <View style={[styles.row, { marginTop: 10 }]}>
                              <Text style={styles.text}>Növbə bağlanma vaxtı</Text>
                              <Text style={styles.textEnd}>{item.CloseMoment}</Text>
                            </View>
                            <View style={styles.row}>
                              <Text style={styles.text}>Bağlananda balans</Text>
                              <Text style={[styles.textEnd, { fontWeight: 'bold' }]}>{ConvertFixedTable(item.CloseBalance)} {priceIcon.azn}</Text>
                            </View>
                          </>
                          :
                          ''
                      }
                    </View>
                  </View>
                )
              }}
            />
            :
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <ActivityIndicator size={50} color={colors.yellow} />
            </View>
      }

      <AddTail modalVisible={inModal} setModalVisible={setInModal} getReloadFunction={getShiftList} tail={tail} setTail={setTail} />
      <CloseTail modalVisible={outModal} setModalVisible={setOutModal} getReloadFunction={getShiftList} tail={tail} setTail={setTail} />
      <CashOut modalVisible={cashOutModal} setModalVisible={setCashOutModal} getReloadFunction={getShiftList} tail={tail} setTail={setTail} />
    </View>
  )
}

export default Tails
