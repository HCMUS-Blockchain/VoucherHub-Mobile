import clients from "./clients";
import AsyncStorage from '@react-native-async-storage/async-storage';
export const SignIn = async (email, password) => {
    try{
        const signInResponse = await clients.post('/users/signin', {email, password});
        if (signInResponse.data.success){
            const token = signInResponse.data.token;
            await AsyncStorage.setItem('token', token);
        }
        return signInResponse
    }catch (e){
        console.log(e)
    }
}
export const SignOut = async () => {
    try{
        const token = await AsyncStorage.getItem('token')
        if (token !== null){
            const res = await clients.get('/users/signout',{
                headers:{
                    Authorization:`JWT ${token}`
                }
            })
            if (res.data.success){
                await AsyncStorage.removeItem('token')
                return true
            }
        }
        return false
    }catch (e){
        console.log(e)
    }
}
