import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import useTheme from '../../../../Services/useTheme'
import Entypo from 'react-native-vector-icons/Entypo';
import FooterMenu from './../../../../Shared/Components/FooterMenu';
import NetInfo from '@react-native-community/netinfo';
import { WifiGlobalContext } from '../../../../Shared/Stage/WifiGlobalStatus';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import productsLocalRefresh from './../../../../Services/SQL/productsLocalRefresh';
import AsyncStorage from '@react-native-async-storage/async-storage';
import date from '../../../../Services/date';

const ProductsFooter = ({ navigation, searchRef }) => {

    const { wifi, setWifi } = useContext(WifiGlobalContext);

    const colors = useTheme();
    const [modal, setModal] = useState(false);
    const [aboutTheDay, setAboutTheDay] = useState();

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            width: "100%",
            height: '100%',
            backgroundColor: colors.primary_5,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderWidth: 0.5,
            borderColor: colors.stableGrey
        },
        centerText: {
            color: colors.inputColors.labelColor,
            fontSize: 17,
            fontWeight: "bold"
        },
        endText: {
            color: colors.white,
            fontSize: 17,
        },
        endContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center'
        },
        firstContainer: {
            flexDirection: 'row',
            width: 120,
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            borderRightWidth: 0.5,
            borderColor: colors.stableGrey
        }
    })

    const getInfo = async () => {
        setModal(true);
    }

    const getRefreshLocalDatabase = async () => {
        await productsLocalRefresh();
        await AsyncStorage.setItem("fromDate",date());
    }

    useEffect(() => {
        let time = setInterval(() => {
            getRefreshLocalDatabase();
        }, 360000)
        return () => clearInterval(time);
    }, [])

    useEffect(() => {
        let time = setInterval(() => {
            NetInfo.addEventListener(state => {
                if (state.isConnected != wifi) {
                    setWifi(state.isConnected);
                }
            });
        }, 1000)
        return () => clearInterval(time);
    }, [])

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={getInfo} style={styles.firstContainer}>
                <Entypo name='menu' size={20} color={colors.primary_2} />
                <View style={{ margin: 5 }} />
                <Text style={styles.endText}>Menu</Text>
            </TouchableOpacity>
            
            <View style={styles.endContainer}>
                <Text style={styles.endText}>{aboutTheDay != null ? aboutTheDay : ''}</Text>
                <View style={{ margin: 5 }} />
                <MaterialCommunityIcons name='wifi-strength-4' color={colors.green_1} size={15} />
                <View style={{ margin: 5 }} />
            </View>
            <FooterMenu navigation={navigation} modalVisible={modal} setModalVisible={setModal} />
        </View>
    )
}

export default ProductsFooter