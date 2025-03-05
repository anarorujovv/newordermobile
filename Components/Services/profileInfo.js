import apiHeader from "./apiHeader";

const profileInfo = async () => {
    return await apiHeader('pos/pos_getretailstore.php','POST',{}).then(element => element.json())
}

export default profileInfo;