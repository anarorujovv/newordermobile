import AsyncStorage from "@react-native-async-storage/async-storage";
import WarningSound from "./Sound/WarningSound";

const apiHeader = async (link, method, body) => {
    const pbMode = await AsyncStorage.getItem("publicMode");
    try {
        let result = await fetch(`https://api.akul.az/1.0/${pbMode}/controllers/${link}`, {
            method: method,
            headers: {
                "Token": await AsyncStorage.getItem("token"),
                "RegisterId": "K01",
                "Authorization": `Bearer ${await AsyncStorage.getItem("jwttoken")}`
            },
            body: JSON.stringify(body)

        })
        return result.json();
    } catch (error) {
        alert("İnternet bağlantınızı yoxluyun!")
        WarningSound()
        return {};
    }

}
export default apiHeader;