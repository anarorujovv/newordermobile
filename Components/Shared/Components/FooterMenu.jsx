import { ActivityIndicator, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import useTheme from '../../Services/useTheme'
import Fontisto from 'react-native-vector-icons/Fontisto'
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6'
import Ionicons from 'react-native-vector-icons/Ionicons'
import RNRestart from 'react-native-restart';
import AsyncStorage from '@react-native-async-storage/async-storage'
import apiHeader from '../../Services/apiHeader'
import { ConvertFixedTable } from '../../Services/convertFiexTabel'
import priceIcon from '../../Services/priceIcon'

const FooterMenu = ({ modalVisible, setModalVisible, navigation }) => {
    const colors = useTheme();
    const [data, setData] = useState(null);

    const styles = StyleSheet.create({
        container: {
            width: '100%',
            height: '100%',
            justifyContent: 'flex-end',
            alignItems: 'flex-start',
            backgroundColor: "rgba(0,0,0,0.4)",
            paddingBottom: 50
        },
        modalView: {
            width: 200,
            backgroundColor: colors.primary_1
        },
        item: {
            width: '100%',
            height: 60,
            flexDirection: 'row'
        },
        itemLeft: {
            width: '30%',
            justifyContent: 'center',
            alignItems: 'center'
        },
        itemRight: {
            width: '70%',
            justifyContent: 'center',
            paddingLeft: 5,
            color: colors.white
        },
        text: {
            color: colors.white,
            fontSize: 17
        }
    })
    
    let list = [
        {
            name: "Növbələr",
            icon: <FontAwesome6 name='clock-rotate-left' color={colors.stableGrey} size={20} />,
            navigation: () => {
                navigation.navigate("tails")
                setModalVisible(false)
            }
        },
        {
            name: "Satışlar",
            icon: <Fontisto name='nav-icon-list-a' color={colors.stableGrey} size={20} />,
            navigation: () => {
                navigation.navigate("demands")
                setModalVisible(false)
            }
        },
        {
            name: "Ayarlar",
            icon: <Fontisto name='player-settings' color={colors.stableGrey} size={20} />,
            navigation: () => {
                navigation.navigate("setting")
                setModalVisible(false)
            }
        },
        {
            name: "Hesabdan çıx",
            icon: <Ionicons name='exit' color={colors.stableGrey} size={20} />,
            navigation: (async () => {
                RNRestart.restart();
                await AsyncStorage.removeItem("token");
                await AsyncStorage.removeItem("userId");
                await AsyncStorage.removeItem("rsId")
            })

        }
    ]

    const updateBalance = async () => {
        setData(await apiHeader('pos/pos_getretailstore.php', 'POST', {}))
    }

    useEffect(() => {
        if (modalVisible) {
            updateBalance()
        }
    }, [modalVisible])

    return (
        <Modal
            animationType='fade'
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
        >
            <TouchableOpacity activeOpacity={1} onPress={() => {
                setModalVisible(false)
            }} style={styles.container}>
                <TouchableOpacity activeOpacity={1} onPress={() => null} style={styles.modalView}>
                    { /* <View style={[styles.item, {
                        borderBottomWidth: 1,
                        borderColor: colors.grey_1,
                        paddingLeft: 20
                    }]}>
                        <View style={styles.itemLeft}>
                            <Text style={[styles.text, {
                                color: colors.orange
                            }]}>Kassa:</Text>
                        </View>
                        <View style={styles.itemRight}>
                            {
                                data != null ?
                                    <Text style={styles.text}>{ConvertFixedTable(data.Body.CashBalance)} {priceIcon.azn}</Text>
                                    :
                                    <ActivityIndicator color={colors.white} size={20} />
                            }
                        </View>
                    </View>
                    */}
                    {
                        list.map(item => (
                            <TouchableOpacity style={styles.item} onPress={item.navigation}>
                                <View style={styles.itemLeft}>
                                    {item.icon}
                                </View>
                                <View style={styles.itemRight}>
                                    <Text style={styles.text}>{item.name}</Text>
                                </View>
                            </TouchableOpacity>
                        ))
                    }
                </TouchableOpacity>
            </TouchableOpacity>
        </Modal>
    )
}

export default FooterMenu