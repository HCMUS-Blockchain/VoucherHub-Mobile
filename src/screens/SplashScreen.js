import {Image, View} from "native-base";
import {StyleSheet} from "react-native";

const SplashScreen = ({navigation}) =>{
    setTimeout(()=>{
        navigation.replace('OnLoadingScreen')
    },3000)
    return(
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
