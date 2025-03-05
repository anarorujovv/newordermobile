import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import useTheme from '../../../Services/useTheme'
import priceIcon from '../../../Services/priceIcon';

const Item = ({ SalePointName, Name, Moment, Amount, ...props }) => {

    const colors = useTheme();

    const styles = StyleSheet.create({
        container: {
            width: '100%',
            padding: 10,
            backgroundColor: colors.primary_3,
            borderRadius: 5
        },
        row: {
            flexDirection: 'row',
            justifyContent: "space-between",
            alignItems: 'center'
        },
        left: {
            color: colors.white
        },
        right: {
            color: colors.white,
            fontWeight: 'bold'
        }
    })

    return (
        <TouchableOpacity {...props} style={styles.container}>
            {
                SalePointName ?
                    <View style={styles.row}>
                        <Text style={styles.left}>Satış №: </Text>
                        <Text style={styles.right}>{SalePointName}</Text>
                    </View>
                    :
                    ''
            }

            {
                Name ?
                    <View style={styles.row}>
                        <Text style={styles.left}>Sənədin adı: </Text>
                        <Text style={styles.right}>{Name}</Text>
                    </View>
                    :
                    ''
            }

            {
                Moment ?
                    <View style={styles.row}>
                        <Text style={styles.left}>Tarix: </Text>
                        <Text style={styles.right}>{Moment}</Text>
                    </View>
                    :
                    ''
            }


            {
                Amount ?
                    <View style={styles.row}>
                        <Text style={styles.left}>Yekun məbləğ: </Text>
                        <Text style={styles.right}>{Amount} {priceIcon.azn}</Text>
                    </View>
                    :
                    ""
            }

        </TouchableOpacity>
    )
}

export default Item
