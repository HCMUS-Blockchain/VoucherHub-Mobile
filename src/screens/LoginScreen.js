import {useEffect, useState} from 'react';
import colors from "../constants/colors";
import {
    Box,
    Button,
    Center,
    FormControl,
    Heading,
    HStack,
    Icon,
    Image,
    Input,
    Link,
    Pressable,
    Text,
    VStack
} from 'native-base';
import {FontAwesome} from '@expo/vector-icons';
import {StyleSheet} from "react-native";

const LoginScreen = ({navigation}) => {
    const [show, setShow] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState("");
    useEffect(() => {
        if (email.length > 0 && password.length > 0) {
            setErrors("");
        }
    }, [email, password]);
    const validate = () => {
        if (email === "" || password === "") {
            setErrors("Please do not let blank input");
        }
    }
    return (
        <Center style={styles.container} w="100%">
            <Image alt="Logo" source={require('../assets/img/logo.png')}/>
            <Box safeArea p="2" py="8" w="90%" maxW="290">
                <Heading mt="-10" size="lg" fontWeight="600" color="coolGray.800" _dark={{
                    color: "warmGray.50"
                }}>
                    Welcome
                </Heading>
                <Heading mt="1" _dark={{
                    color: "warmGray.200"
                }} color="coolGray.600" fontWeight="medium" size="xs">
                    Sign in to continue!
                </Heading>
                <VStack space={3} mt="5">
                    <FormControl>
                        <FormControl.Label>Email ID</FormControl.Label>
                        <Input
                            onChangeText={value => setEmail(value)}
                            leftElement={<Icon as={FontAwesome} size={4} ml={3} name="envelope-o" color="black"/>
                            } placeholder="abc@gmail.com" size={3}/>
                    </FormControl>
                    <FormControl>
                        <FormControl.Label>Password</FormControl.Label>
                        <Input
                            onChangeText={value => setPassword(value)}
                            type={show ? "text" : "password"}
                            leftElement={<Icon as={FontAwesome} size={4} ml={3} name="lock" color="black"/>}
                            placeholder="Your Password"
                            rightElement={<Pressable onPress={() => setShow(!show)}>
                                <Icon as={FontAwesome} size={4} mr={4} name={show ? "eye" : "eye-slash"}
                                      color="coolGray.800"/>
                            </Pressable>}
                            size={3}/>
                        <Text
                            onPress={()=>navigation.navigate('RegisterScreen')}
                            style={styles.forgotPw}
                            alignSelf="flex-end" mt="1">
                            Forgot Your Password?
                        </Text>
                    </FormControl>
                    <Button
                        onPress={validate}
                        rightIcon={<Icon as={FontAwesome} size={3} name="arrow-circle-right" color="white"/>}
                        mt="2" style={styles.colorDanger}>
                        <Text style={styles.btnTxt}>Sign In</Text>
                    </Button>
                    <HStack justifyContent="center">
                        {errors !== "" ? <Text style={styles.error}>{errors}</Text> : null}
                    </HStack>
                    <HStack mt="2" justifyContent="center">
                        <Text fontSize="sm" color="coolGray.600" _dark={{
                            color: "warmGray.200"
                        }}>
                            OR.{" "}
                        </Text>
                    </HStack>
                    <Button
                        mt="2" style={styles.colorParty}>
                        <HStack space={2}>
                            <Image style={styles.iconSize} alt="Google" source={require('../assets/img/google.png')}/>
                            <Text style={styles.txtParty}>Login with Google</Text>
                        </HStack>
                    </Button>
                    <Button
                        mt="2" style={styles.colorParty}>
                        <HStack space={2}>
                            <Image style={styles.iconSize} alt="Facebook"
                                   source={require('../assets/img/facebook.png')}/>
                            <Text style={styles.txtParty}>Login with Facebook</Text>
                        </HStack>
                    </Button>
                    <HStack mt="2" justifyContent="center">
                        <Text fontSize="sm" color="coolGray.600" _dark={{
                            color: "warmGray.200"
                        }}>
                            I'm a new user.{" "}
                        </Text>
                        <Text
                            onPress={()=>navigation.navigate('RegisterScreen')}
                            style={styles.forgotPw}>
                            Sign up
                        </Text>
                    </HStack>
                </VStack>
            </Box>
        </Center>
    )
}

const styles = StyleSheet.create({
    colorDanger: {
        backgroundColor: colors.main,
        borderRadius: 15,
    },
    container: {
        marginTop: 65,
        padding: 5,
    },
    btnTxt: {
        color: 'white',
        fontSize: 15,
    },
    txtParty: {
        color: 'black',
        fontSize: 15,
    }
    ,
    colorParty: {
        backgroundColor: colors.third_party,
        borderRadius: 6,
    },
    iconSize: {
        height: 20,
        width: 20,
    },
    error: {
        color: 'red',
    },
    forgotPw:{
        fontSize: 15,
        color:'#305eb7'
    }
})

export default LoginScreen;
