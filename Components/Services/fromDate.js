import AsyncStorage from "@react-native-async-storage/async-storage"

const fromDate = async () => {
    const result = await AsyncStorage.getItem("fromDate");
    return result;
}

export default fromDate