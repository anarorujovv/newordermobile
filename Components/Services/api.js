import axios from "axios"
import WarningSound from "./Sound/WarningSound";
import AsyncStorage from "@react-native-async-storage/async-storage";

const api = async (link, obj) => {

    const pbMode = await AsyncStorage.getItem("publicMode");
    try {
        const result = await axios.post(`https://api.akul.az/1.0/${pbMode}/controllers/${link}`, obj);
        return result;
    } catch (error) {
        alert("İnternet bağlantınızı yoxluyun!")
        WarningSound()
        return {};
    }
}

export default api; 