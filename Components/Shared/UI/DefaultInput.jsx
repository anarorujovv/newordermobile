import { StyleSheet, Text, TextInput, View } from 'react-native'
import React, { forwardRef, useState } from 'react'
import useData from '../Stage/useData'

const DefaultInput = forwardRef(function DefaultInput(props, ref) {
    const setFocusedInput = useData((state) => state.setFocusedInput);
    const setInputValue = useData((state) => state.setInputValue);


    const getFocusComp = () => {
        setFocusedInput(props.inputName)
        if (props.focus) {
            props.focus();
        }
    }

    const getBlurComp = () => {
        setFocusedInput(null)
        if (props.blur) {
            props.blur();
        }
    }


    return (
        <>
            <TextInput
                showSoftInputOnFocus={false}
                onFocus={() => {
                    getFocusComp();
                }}
                onBlur={() => {
                    getBlurComp();
                }}
                {...props} ref={ref || null} />
        </>
    )
})

export default DefaultInput

