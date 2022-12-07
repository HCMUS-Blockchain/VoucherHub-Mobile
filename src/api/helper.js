import clients from "./clients";
import AsyncStorage from "@react-native-async-storage/async-storage";

exports.postData = async (url, data) => {
    const token = await AsyncStorage.getItem('token')
    if (token !== null){
        return clients.post(url, data, {
            headers: {
                Authorization: `JWT ${token}`,
            }
        })
    }
    return null
}

exports.getData = async (url) => {
    const token = await AsyncStorage.getItem('token')
    if (token !== null){
        return clients.get(url, {
            headers: {
                Authorization: `JWT ${token}`,
            }
        })
    }
    return null
}
