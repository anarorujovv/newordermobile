import uuid from 'react-native-uuid';
import apiHeader from '../apiHeader';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const openShift = async (setIsLoading) => {
    setIsLoading(true);
    let id = uuid.v4()

    let date = new Date();
    date.setHours(date.getHours() + 4);

    let obj = {
        ShiftId: id,
        CreateUserId: await AsyncStorage.getItem("userId"),
        Moment: date,
        Description: ""
    }
    const result = await apiHeader('pos/pos_openshift.php', 'POST', obj)
    setIsLoading(false)
    if (result.Headers.ResponseStatus == "0") {
        return result.Body
    } else {
        return null
    }
}

export const closeShift = async (setIsLoading,closeId) => {
    setIsLoading(true);

    let date = new Date();
    date.setHours(date.getHours() + 4);


    let obj = {
        ShiftId: closeId,
        CreateUserId: await AsyncStorage.getItem("userId"),
        Moment: date,
        Description: ""
    }


    const result = await apiHeader('pos/pos_closeshift.php', 'POST', obj)
    setIsLoading(false)
    if (result.Headers.ResponseStatus == "0") {
        return result.Body
    } else {
        return null
    }
}