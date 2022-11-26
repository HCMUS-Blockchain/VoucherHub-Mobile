import {Image, StatusBar, Text, View} from "native-base";
import Colors from "../constants/colors";
import {ImageBackground} from "react-native";
import Buttons from "../components/Buttons";
const OnLoadingScreen = ({navigation}) => {
    return (
        <View style={{flex: 1, backgroundColor: Colors.white}}>
            <StatusBar barStyle="dark-content" backgroundColor="#fff"/>
            <View style={{flex: 3, flexDirection: "column", backgroundColor: '#ddd'}}>
                <ImageBackground source={require('../assets/img/handshake.png')}
                                 style={{flex: 1, width: '100%', backgroundColor: '#fff'}}/>
            </View>
            <View style={{flex: 2, backgroundColor: '#fff'}}>
                <View style={{
                    bottom:50,
                    flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    backgroundColor: '#fff'
                }}>
                    <Image alt="Logo" source={require('../assets/img/logo.png')}/>
                    <Text style={{
                        maxWidth: '50%',
                        color: "#5e5d5d",
                        fontSize: 14,
                        textAlign: 'center',
                        paddingTop: 10
                    }}>All new in one place, be the first to know last new</Text>
                </View>
                <View style={{flex: 1,bottom:30, flexDirection: 'column',justifyContent: 'flex-end', alignItems: 'center'}}>
                    <Buttons btn_text={"Get Started"} on_press={() => navigation.navigate("LoginScreen")}/>
                </View>
            </View>
        </View>
    )
}

export default OnLoadingScreen
