import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import useTheme from '../../Services/useTheme'
import AntDesign from 'react-native-vector-icons/AntDesign'
import priceIcon from '../../Services/priceIcon'
import CountController from './CountController';

const CardItem = ({ name, price, quantity, press, inBasket, isDisabled }) => {

    const colors = useTheme();

    const styles = StyleSheet.create({
        container: {
            backgroundColor: !isDisabled ? colors.primary_3 : colors.inputColors.borderColor,
            width: 175,
            height: 250,
            alignItems: 'center',
            flexDirection: "column",
            justifyContent: 'space-between',
            padding: 10,
            borderRadius:10
        },
        headerText: {
            color: colors.inputColors.labelColor,
            fontSize: 20,
            fontWeight: "bold",
        },
        avatar: {
            width: '100%',
            height: 140,
            backgroundColor: colors.grey_1,
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 10,
            marginBottom: 10
        },
        contentText: {
            color: colors.white,
            fontWeight: "bold",
            fontSize: 18,
            alignItems: 'center',
            width: '100%',
            textAlign: 'center',
            overflow: "hidden",
            height: 45
        },
        footerContainer: {
            width: '100%',
            height: '15%',
            borderTopWidth: 0.5,
            borderColor: colors.inputColors.borderColor,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 5
        },
        priceStyle: {
            width: '100%',
            color: colors.white,
            fontWeight: 'bold',
            textAlign: 'center',
            fontSize: 20,
        }
    })
    return (
        <TouchableOpacity disabled={isDisabled} onPress={() => {
            if (isDisabled) {
                
            } else {
                press()
            }
        }}  style={styles.container}>
            <View style={{ width: '100%', height: "85%", alignItems: 'center' }}>
                <Text style={styles.contentText}>{name}</Text>
                <View style={styles.avatar}>
                    <AntDesign color={colors.orange} name='appstore1' size={80} />
                </View>
            </View>

            <View style={styles.footerContainer}>
                {
                    inBasket ?
                        <CountController quantity={quantity} />
                        :
                        <Text style={styles.priceStyle}>{price}{priceIcon.azn}</Text>
                }
            </View>

        </TouchableOpacity>
    )
}

export default CardItem
