import {Image, View} from "native-base";
import {StyleSheet} from "react-native";
import {useLogin} from "../context/LoginProvider";
import {useEffect} from "react";

const SplashScreen = ({navigation}) => {
    const {isLogin} = useLogin()
    useEffect(()=> {
        const timeout = setTimeout(() => {
            if (navigation) {
                try {
                    if (!isLogin) {
                        navigation.replace('OnLoadingScreen')
                    }
                } catch (e) {
                    console.log(e)
                }
            }
        }, 3000)
        return () => {
            clearTimeout(timeout);
        };
    },[])
    return (
        <View style={styles.container}>
            <Image
                alt="Logo"
                source={require('../assets/img/logo.png')}
                style={{width: '90%', resizeMode: 'contain', margin: 30}}
            />
        </View>
    )
}


export default SplashScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#e1e4e7',
    }
});
