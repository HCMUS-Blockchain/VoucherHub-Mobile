import {Box, Text, View} from "native-base";
import {StyleSheet, TouchableOpacity} from "react-native";
import AnimatedLottieView from "lottie-react-native";
import PuzzleDetail from "../components/PuzzleDetail";
import VoucherDetail from "../components/VoucherDetail";

const ReceiveVoucher = (props) => {
    console.log(props.route.params)
    return (
        <View style={styles.container}>
            <Box ml="7"
                 style={{
                        position: 'absolute',
                        bottom: 240,
                 }}
            >
                <TouchableOpacity onPress={() => props?.navigation.navigate('BottomNavs',{screen: 'Profile',})
                }>
                    {/*<VoucherDetail*/}
                    {/*    code={props?.route?.params?.code}*/}
                    {/*    expiredDate={props?.route?.params?.expiredDate}*/}
                    {/*    discount={props?.route?.params?.discount}*/}
                    {/*/>*/}

                    <PuzzleDetail
                        img={props?.route?.params?.img}
                    />

                    <AnimatedLottieView
                        source={require('../assets/cgra.json')}
                        autoPlay
                        loop />
                </TouchableOpacity>
                <Text
                    style={styles.text}
                >
                    Congratulations! You have received a puzzle game!
                </Text>
            </Box>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },text: {
        fontSize:24,
        textAlign: 'center',
        color: "#5F6D7A",
        paddingTop: 20,
    }
})
export default ReceiveVoucher
