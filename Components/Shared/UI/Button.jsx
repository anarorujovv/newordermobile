import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import useTheme from '../../Services/useTheme'

const Button = ({ bg, text, buttonWidth, isLoading, ...props }) => {

    const colors = useTheme();

    const styles = StyleSheet.create({
        container: {
            backgroundColor: bg,
            width: buttonWidth ? buttonWidth : 300,
            height: 45,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 5,
            shadowOpacity: 1,
            shadowOffset: {
                width: 0,
                height: 0
            },
            shadowColor: "black",
            shadowRadius: 5,
        },
        color: {
            color: colors.stableWhite,
            fontWeight: 'bold',
            fontSize: 18,
        }
    })
    return (
        <View style={[styles.container]}>
            <TouchableOpacity disabled={isLoading} {...props} style={{
                width: 350,
                height: 50,
                justifyContent: 'center',
                alignItems: 'center'
            }} >
                {
                    isLoading ?
                        <ActivityIndicator size={20} color={
                            colors.stableWhite
                        } />
                        :
                        <Text style={styles.color}>{text}</Text>
                }
            </TouchableOpacity>
        </View>
    )
}

export default Button

