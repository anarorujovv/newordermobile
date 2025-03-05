import { ActivityIndicator, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import useTheme from '../../../Services/useTheme';
import BasketItem from './../../Pos/Components/Basket/components/BasketItem';
import { ConvertFixedTable } from '../../../Services/convertFiexTabel';
import Button from '../../../Shared/UI/Button';
import AntDesign from 'react-native-vector-icons/AntDesign';
import IconButton from '../../../Shared/UI/IconButton';
import apiHeader from '../../../Services/apiHeader';
import uuid from 'react-native-uuid';
import useData from '../../../Shared/Stage/useData';
import ErrorSound from '../../../Services/Sound/ErrorSound';
import ToastMessage from './../../../Shared/UI/ToastMessage';
import { getProductId } from '../../../Shared/Stage/products_sql';

const DemandReturn = ({ navigation, route }) => {
  const { demand } = route.params;
  const [returnDemand, setReturnDemand] = useState(null);
  const [openEditModal, setOpenEditModal] = useState({ modal: false, index: null, product: null });
  const tail = useData((state) => state.tail);

  const [isLoading, setIsLoading] = useState(false);

  const colors = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.primary_1
    },
    modalContainer: {
      width: '100%',
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: "rgba(0,0,0,0.4)"
    },
    modalView: {
      width: '90%',
      height: 600,
      backgroundColor: colors.primary_3,
      flexDirection: 'column',
      alignItems: 'center',
      paddingBottom: 20,
      position: "relative",
      justifyContent: 'center',
      paddingTop: 70
    },
    item: {
      width: '100%',
      height: 50,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: 'center',
      paddingLeft: 15,
      paddingRight: 15
    },
    left: {
      color: colors.white,
    },
    right: {
      color: colors.white,
      fontWeight: "bold"
    },
    divider: {
      width: '100%',
      height: 1,
      backgroundColor: colors.grey_1,
    },
    positionHeaderText: {
      color: colors.white,
      fontWeight: 'bold',
      fontSize: 25,
      paddingLeft: 10
    },
    positionsContainer: {
      display: 'flex',
      flexDirection: "column",
      width: '50%',
      alignItems: 'flex-end'
    },
    quantityController: {
      width: 300,
      height: 70,
      backgroundColor: colors.grey_1,
      borderRadius: 300,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: "space-between",
      paddingLeft: 5,
      paddingRight: 5,
      marginTop: 50,
    },
    quantity: {
      fontSize: 30,
      color: colors.inputColors.labelColor,
      fontWeight: "bold",
    },
    inputTopText: {
      color: colors.yellow,
      fontWeight: "bold",
      width: 300,
      fontSize: 18
    },
    saveButton: {
      position: 'absolute',
      width: 300,
      height: 50,
      backgroundColor: colors.yellow,
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
      elevation: 10,
      bottom: 30,
      left: '40%'
    },
    saveText: {
      fontSize: 20,
      color: colors.white
    }
  })

  const handleOpenEditModal = (product, index) => {
    let pr = { ...product }
    pr.Quantity = ConvertFixedTable(product.Quantity);
    setOpenEditModal({ modal: true, index: index, product: pr });
  }

  const save = async () => {
    setIsLoading(true);
    if (tail == null) {
      alert("Növbə açılmalıdır!");
      ErrorSound();
      return;
    };
    let obj = { ...returnDemand };
    const result = await apiHeader('pos/pos_return.php', 'POST', obj);
    if (result.Headers.ResponseStatus == "0") {
      ToastMessage("QAYTARMA UĞURLA BAŞA ÇATDI");
      navigation.goBack();
    } else {
      alert(result.Body)
    }
    setIsLoading(false);
  }

  const getComponents = async () =>  {
    let demandJson = demand;
    demandJson.LinkId = demandJson.Id;
    demandJson.Id = uuid.v4();
    demandJson.Name = String(new Date().getTime() + Math.ceil(Math.random() + 1) * 100)
    for(let index = 0;index < demandJson.Items.length;index ++){
      const result = await getProductId(demandJson.Items[index].ProductId);
      demandJson.Items[index].ProductName = result.Name
    }
    setReturnDemand(demandJson);
  }

  
  useEffect(() => {
    getComponents();
  }, [demand])

  return (
    <View style={styles.container}>
      {
        returnDemand == null ?
          <View style={{
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            alignItems: "center"
          }}>
            <ActivityIndicator size={50} color={colors.white} />
          </View>

          :
          <View style={{
            width: "100%",
            height: '100%',
          }}>
            <View>
              <View style={styles.item}>
                <Text style={styles.left}>Sənədin Adı</Text>
                <Text style={styles.right}>{returnDemand.Name}</Text>
              </View>
              <View style={styles.divider} />
              <View style={styles.item}>
                <Text style={styles.left}>Tarix</Text>
                <Text style={styles.right}>{returnDemand.Moment}</Text>
              </View>
            </View>

            <Text style={styles.positionHeaderText}>Məhsullar</Text>
            <View style={styles.positionsContainer}>
              {
                [...returnDemand.Items].map((item, index) => {
                  return (
                    <React.Fragment key={item.ProductId}>
                      <BasketItem handleOpen={() => {
                        handleOpenEditModal(item, index);
                      }} name={item.ProductName} price={ConvertFixedTable(item.Price)} quantity={ConvertFixedTable(item.Quantity)} key={item.ProductId} />
                      <View style={styles.divider} />
                    </React.Fragment>
                  );
                })
              }
            </View>
            <View style={{ marginLeft: 20, marginTop: 20 }}>
              <Button onPress={save} buttonWidth={300} text={'Geri qaytarma'} isLoading={isLoading} bg={colors.yellow} />
            </View>
          </View>
      }

      <Modal
        animationType='fade'
        transparent={true}
        visible={openEditModal.modal}
        onRequestClose={() => setOpenEditModal(rel => ({ ...rel, ['modal']: false }))}
      >
        <TouchableOpacity activeOpacity={1} onPress={() => {
          setOpenEditModal(rel => ({ ...rel, ['modal']: false }))
        }} style={styles.modalContainer}>
          <TouchableOpacity activeOpacity={1} onPress={() => null} style={styles.modalView}>
            {
              openEditModal.product != null ?
                <View style={styles.quantityController}>
                  <IconButton disabled={openEditModal.product.Quantity == 1} onPress={() => {
                    let info = { ...openEditModal };
                    info.product.Quantity -= 1;
                    setOpenEditModal(info);

                  }} bg={openEditModal.product.Quantity == 1 ? colors.inputColors.borderColor : colors.primary_1} size={60} br={60} icon={
                    <AntDesign name='minus' size={30} color={colors.primary_2} />
                  } />
                  <Text style={styles.quantity}>{openEditModal.product.Quantity}</Text>
                  <IconButton onPress={() => {
                    let info = { ...openEditModal };
                    if (info.product.Quantity + 1 <= demand.Items[info.index].Quantity) {
                      info.product.Quantity += 1;
                      setOpenEditModal(info);
                    }
                  }} bg={colors.primary_1} size={60} br={60} icon={
                    <AntDesign name='plus' color={colors.primary_2} size={30} />
                  } />
                </View>
                :
                ''
            }
            <View style={{ width: '100%', alignItems: 'center', marginTop: 100 }}>
              <Button onPress={() => {
                let obj = { ...returnDemand };
                obj.Items[openEditModal.index].Quantity = openEditModal.product.Quantity
                setReturnDemand(obj);
                setOpenEditModal({ index: null, modal: false, product: null })
              }} buttonWidth={300} text={'Yadda Saxla'} bg={colors.yellow} />
            </View>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </View >
  )
}

export default DemandReturn
