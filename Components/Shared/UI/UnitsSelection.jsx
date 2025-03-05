import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useRef, useState } from 'react'
import useTheme from '../../Services/useTheme';
import { Picker } from '@react-native-picker/picker';
import { ConvertFixedTable } from '../../Services/convertFiexTabel';

const UnitsSelection = ({ label, left, inputWidth, value, setInfo, info, selections, ...props }) => {

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
      width: left ? '90%' : '100%',
      height: '100%',
      color: colors.white,
      fontSize: 17,
      paddingRight: '5%',
      fontWeight: 'bold',
      paddingLeft: '5%',
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
    },
    itemStyle: {
      backgroundColor: colors.primary_3,
      color: colors.white,
      width: inputWidth
    }
  })

  const handleSelect = (itemValue, itemIndex) => {
    const infoData = { ...info };
    infoData.UnitId = itemValue;
    let units = [...infoData.Units]
    for (let index = 0; index < units.length; index++) {
      if (units[index].Id == infoData.UnitId) {
        infoData.Price = String(ConvertFixedTable(units[index].Price));
      }
    }
    setInfo(infoData);
  }

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
        <Picker
          mode='dropdown'
          style={styles.input}
          selectedValue={value}
          onValueChange={handleSelect}>
          {
            selections.map(element => (
              <Picker.Item style={styles.itemStyle} key={element.Id} label={element.Name} value={element.Id} />
            ))
          }
        </Picker >
      </View>
    </>
  )
}

export default UnitsSelection