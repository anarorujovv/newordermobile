import axios from "axios"
import WarningSound from "../Sound/WarningSound";

const adminLoginApi = async (obj) => {
    try {
        const result = await axios.post("https://api.akul.az/1.0/online/login/send.php", obj);
    return result;
    } catch (error) {
        alert("İnternet bağlantınızı yoxluyun!")
        WarningSound()
        return {}
    }
}

export default adminLoginApi;