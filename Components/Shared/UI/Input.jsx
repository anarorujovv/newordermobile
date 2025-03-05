import { StyleSheet, Text, View } from 'react-native'
import React, { useRef, useState } from 'react'
import useTheme from '../../Services/useTheme';
import DefaultInput from './DefaultInput';

const Input = ({ label, left, inputWidth, ...props }) => {

    const ref = useRef(null);

    const colors = useTheme();

    const styles = StyleSheet.create({
        inputContainer: {
            width: inputWidth ? inputWidth : "100%",
            height: 60,
            borderWidth: 2,
            borderColor: colors.yellow,
            flexDirection: 'row',
            borderRadius: 5
        },
        iconContainer: {
            width: '10%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
        },
        input: {
            width: '90%',
            height: '100%',
            color: colors.white,
            fontSize: 17,
            paddingRight: '5%',
            fontWeight: 'bold',
            paddingLeft: '5%'
        },
        item: {
            width: '100%',
            height: 70,
            justifyContent: 'center',
            paddingLeft: '10.5%'
        },
        itemText: {
            fontSize: 15,
            color: colors.white,
            fontWeight: 'bold'
        },
        right: {
            width: '10%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            paddingRight: 15
        }
    })
    return (
        <>
            <Text style={{
                width: inputWidth,
                marginBottom: 4,
                fontSize: 17,
                fontWeight: "bold",
                color: colors.yellow
            }}>{label}</Text>
            <View style={styles.inputContainer}>
                {
                    left &&
                    <View style={styles.iconContainer}>
                        <Text style={{
                            color: colors.yellow,
                        }}>{left}</Text>
                    </View>
                }
                <DefaultInput
                    {...props}
                    ref={ref}

                    placeholderTextColor={colors.inputColors.borderColor}
                    cursorColor={colors.yellow} style={styles.input} />
            </View>
        </>
    )
}

export default Input