import {Box, View} from "native-base";
import {StyleSheet, TouchableOpacity} from "react-native";
import AnimatedLottieView from "lottie-react-native";
import VoucherDetail from "../components/VoucherDetail";
import {Touchable} from "react-native-web";

const ReceiveVoucher = (props) => {
    console.log(props)
    return (
        <View style={styles.container}>
            <AnimatedLottieView
                source={require('../assets/congrats.json')}
                autoPlay
                style={{width: 300, height: 300,position:'absolute',top:0,left:15,margin:'auto'}}
                loop />
            <Box ml="7"
                 style={{
                        position: 'absolute',
                        bottom: 250,
                 }}
            >
                <TouchableOpacity onPress={() => props.navigation.navigate('BottomNavs',{
                    screen: 'Profile',
                })}>
                    <VoucherDetail
                        code={props.route.params.code}
                        expiredDate={props.route.params.expiredDate}
                        discount={props.route.params.discount}
                    />
                </TouchableOpacity>

            </Box>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})
export default ReceiveVoucher