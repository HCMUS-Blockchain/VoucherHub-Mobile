import {TouchableOpacity} from "react-native";
import {StyleSheet} from "react-native";
import {Image, Text, View} from "native-base";

const SuccessLoginScreen = ({navigation}) => {
    return(
        <View
            style={{
                flex: 1,
                backgroundColor: '#307ecc',
                justifyContent: 'center',
            }}>
            <Image
                alt="Success Logo"
                source={require('../../src/assets/img/success.png')}
                style={{
                    height: 150,
                    resizeMode: 'contain',
                    alignSelf: 'center'
                }}
            />
            <Text style={styles.successTextStyle}>
                Registration Successful
            </Text>
            <TouchableOpacity
                style={styles.buttonStyle}
                activeOpacity={0.5}
                onPress={() => navigation.navigate('LoginScreen')}>
                <Text style={styles.buttonTextStyle}>Login Now</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    SectionStyle: {
        flexDirection: 'row',
        height: 40,
        marginTop: 20,
        marginLeft: 35,
        marginRight: 35,
        margin: 10,
    },
    buttonStyle: {
        backgroundColor: '#7DE24E',
        borderWidth: 0,
        color: '#FFFFFF',
        borderColor: '#7DE24E',
        height: 40,
        alignItems: 'center',
        borderRadius: 30,
        marginLeft: 35,
        marginRight: 35,
        marginTop: 20,
        marginBottom: 20,
    },
    buttonTextStyle: {
        color: '#FFFFFF',
        paddingVertical: 10,
        fontSize: 16,
    },
    inputStyle: {
        flex: 1,
        color: 'white',
        paddingLeft: 15,
        paddingRight: 15,
        borderWidth: 1,
        borderRadius: 30,
        borderColor: '#dadae8',
    },
    errorTextStyle: {
        color: 'red',
        textAlign: 'center',
        fontSize: 14,
    },
    successTextStyle: {
        color: 'white',
        textAlign: 'center',
        fontSize: 18,
        padding: 30,
    },
});

export default SuccessLoginScreen;
