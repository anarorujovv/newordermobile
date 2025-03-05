import { StyleSheet,Text,TouchableOpacity, View } from 'react-native'
import React, { useEffect,useCallback } from 'react'
import useTheme from '../../../../Services/useTheme'
import AntDesign from 'react-native-vector-icons/AntDesign';
import DefaultInput from './../../../../Shared/UI/DefaultInput';
import useData from '../../../../Shared/Stage/useData';
import allSumReport from '../../../../Services/allSumReport';
import BeepSound from './../../../../Services/Sound/BeepSound';
import Entypo from 'react-native-vector-icons/Entypo';
import { getProductsTable, getUnitsTable } from '../../../../Shared/Stage/products_sql';


const ProductsHeader = ({ setProducts, searchRef }) => {
  const basket = useData((state) => state.basket);
  const setBasket = useData((state) => state.setBasket);

  const inputValues = useData((state) => state.inputValues);
  const setInputValue = useData((state) => state.setInputValue);
  const setKeyModal = useData((state) => state.setKeyModal);
  const cloudCount = useData((state) => state.cloudCount);

  const colors = useTheme();


  const styles = StyleSheet.create({
    header: {
      flex: 1,
      width: '100%',
      height: '100%',
      flexDirection: 'row',
    },
    left: {
      width: '7%',
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center'
    },
    input: {
      width: '83%',
      height: '100%',
      fontSize: 20,
      fontWeight: 'bold',
      paddingLeft: 10,
      color: colors.white
    },
    right: {
      width: '10%',
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    button:{
      width:40,
      height:40,
      justifyContent:'center',
      alignItems:'center',
      backgroundColor:colors.primary_2,
      borderRadius:5,
      position:"relative"
    },
    text:{
      color:colors.black,
      position:'absolute',
      fontSize:12
    }
  });

  const getProducts = useCallback(async () => {
    setProducts(null);
  }, [setProducts]);

  const getSearchProductsScan = async () => {
    BeepSound();
    let sr = inputValues['productsSearch']
    setInputValue("productsSearch", "");
    if (searchRef.current) {
      searchRef.current.focus();
    }

    let productsList = await getProductsTable(sr);
    if (productsList != null) {
      if (productsList[0]) {
        if (productsList.length == 1) {
          let basketInfo = { ...basket };
          let answer = true;
          productsList[0].Units = await getUnitsTable(productsList[0].Id);
          for (let index = 0; index < basketInfo.positions.length; index++) {
            if (basketInfo.positions[index].Id == productsList[0].Id) {
              basketInfo.positions[index].quantity += 1;
              answer = false;
            }
          }

          if (answer) {
            basketInfo.positions.push({ ...productsList[0], quantity: 1 })
          }
          if (basketInfo.positions[0]) {
            basketInfo.allSum = allSumReport(basketInfo.positions);
          }

          setBasket(basketInfo);
          setProducts(null)
        }
      } else {
        setInputValue("productsSearch", "");
        if (searchRef.current) {
          searchRef.current.focus();
        }
        alert("Məhsul tapılmadı!")
      }

    } else {
      setInputValue("productsSearch", "");
      if (searchRef.current) {
        searchRef.current.focus();
      }
      alert("Localda məhsul yoxdur!")
    }
  }

  const getSearchProducts = useCallback(async () => {
    let sr = inputValues['productsSearch']
    let productsList = await getProductsTable(sr);
    if (productsList != null) {
      if (productsList) {
        for (let index = 0; index < basket.positions.length; index++) {
          for (let indexProduct = 0; indexProduct < productsList.length; indexProduct++) {
            if (basket.positions[index].Id == productsList[indexProduct].Id) {
              productsList[indexProduct].shown = true;
            }
          }
        }

        for (let index = 0; index < productsList.length; index++) {
          productsList[index].Units = await getUnitsTable(String(productsList[index].Id));
        }

        setProducts(productsList);
      } else {
        setInputValue("productsSearch", "");
        if (searchRef.current) {
          searchRef.current.focus();
        }
        alert("Məhsul tapılmadı! ")
      }

    } else {
      setInputValue("productsSearch", "");
      if (searchRef.current) {
        searchRef.current.focus();
      }
      alert("Localda məhsul yoxdur! ")
    }
  }, [inputValues['productsSearch'], setProducts]);


  useEffect(() => {
    let time;
    if (inputValues['productsSearch'] === "") {
      getProducts();
    } else {
      if (Number(inputValues['productsSearch']) && inputValues['productsSearch'].length > 7) {
        time = setTimeout(() => {
          getSearchProductsScan();
        }, 70);
      } else {
        time = setTimeout(() => {
          getSearchProducts();
        }, 530);
      }
    }

    return () => clearTimeout(time);
  }, [inputValues['productsSearch'], getProducts, getSearchProducts]);

  useEffect(() => {
    if (searchRef.current) {
      searchRef.current.focus();
    }
  }, [searchRef]);


  return (
    <View style={styles.header}>
      <View style={styles.left}>
        <View style={styles.button}>
          <AntDesign name='cloudo' color={colors.black} size={30}/>
          <Text style={styles.text}>{cloudCount}</Text>
        </View>
      </View>
      <DefaultInput
        inputName={'productsSearch'}
        value={inputValues['productsSearch']}
        onChangeText={(e) => {
          setInputValue("productsSearch", e)
        }}
        ref={searchRef}
        cursorColor={colors.white}
        placeholderTextColor={colors.inputColors.labelColor}
        placeholder='Məhsul axtarın...'
        style={styles.input}
      />
      <TouchableOpacity onPress={() => {
        setKeyModal(true);
      }} style={styles.right}>
        <Entypo name='keyboard' color={colors.primary_2} size={30} />
      </TouchableOpacity>

    </View>
  )
}



export default ProductsHeader;