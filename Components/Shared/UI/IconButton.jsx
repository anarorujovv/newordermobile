import { Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import useTheme from '../../Services/useTheme'

const IconButton = ({ size, bg, icon,br, ...props }) => {

  const colors = useTheme();

  return (
    <View style={{ width: size, height: size, backgroundColor: bg && bg,overflow:'hidden',borderRadius:br }}>
      <TouchableOpacity {...props} style={{width:size,height:size,justifyContent:'center',alignItems:'center'}} >
        <Text style={{
          color:colors.stableWhite,
        }}>{icon}</Text>
      </TouchableOpacity>
    </View>
  )
}

export default IconButton