import {createContext, useContext, useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import clients from "../api/clients";

const LoginContext = createContext()

const LoginProvider = ({children}) => {
    const [isLogin, setIsLogin] = useState(false)
    const [profile,setProfile] = useState({})
    const [isPending,setIsPending] = useState(false)
    const fetchUser = async () => {
        setIsPending(true)
        const token = await AsyncStorage.getItem("token");
        if (token) {
            try{
                const user = await clients.get("/api/profile", {
                    headers: {
                        Authorization: `JWT ${token}`,
                    },
                });
                if (user.data.success) {
                    setIsLogin(true);
                    setProfile(user.data)
                }else{
                    setIsLogin(false)
                    setProfile({})
                }
            }catch (e) {
                console.log(e)
                setIsLogin(false)
                setProfile({})
            }
            setIsPending(false)
        }else{
            setIsLogin(false)
            setProfile({})
            setIsPending(false)
        }
    };
    useEffect(() => {
        fetchUser();
    }, []);
    return (
        <LoginContext.Provider value={{isLogin,setIsLogin,profile,setProfile,isPending,setIsPending}}>
            {children}
        </LoginContext.Provider>
    )
}
export const useLogin = () => useContext(LoginContext)
export default LoginProvider

