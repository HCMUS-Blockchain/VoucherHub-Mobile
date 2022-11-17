import React, {useEffect, useState} from 'react';
import {Box, Button, Center, FormControl, Heading, HStack, Icon, Image, Input, Text, VStack} from 'native-base';
import {StyleSheet} from "react-native";
import {FontAwesome} from "@expo/vector-icons";
import colors from "../constants/colors";
import clients from "../api/clients";
import Loader from "../components/Loader";
const RegisterScreen = ({navigation}) => {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState("");
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        if (email.length > 0 && password.length > 0 && confirmPassword.length > 0 && fullName.length > 0) {
            setErrors("");
        }
    }, [email, password]);
    const signUp = async () => {
        //Show Loader
        setLoading(true);
        const dataToSend = {
            fullName,
            email,
            password,
            confirmPassword
        }
        try {
            const response = await clients.post('/users/create', dataToSend);
            //Hide Loader
            setLoading(false);
            navigation.navigate("SuccessLoginScreen");
        } catch (e) {
            if (e.response) {
                if (e.response?.data?.error){
                    //Hide Loader
                    setLoading(false);
                    setErrors(e.response.data.error);
                }
            }
        }
    }
    return (
        <Center style={styles.container} w="100%">
            <Loader loading={loading} />
            <Box safeArea p="2" w="90%" maxW="290">
                <Heading size="lg" fontWeight="600" color="coolGray.800" _dark={{
                    color: "warmGray.50"
                }}>
                    Sign up
                </Heading>

                <VStack space={5} mt="5">
                    <FormControl>
                        <Input leftElement={<Icon as={FontAwesome} size={4} ml={3} name="user" color="black"/>
                        } placeholder="Full name" size={3}/>
                    </FormControl>
                    <FormControl>
                        <Input
                            onChangeText={setEmail}
                            leftElement={<Icon as={FontAwesome} size={4} ml={3} name="envelope-o" color="black"/>
                            } placeholder="abc@email.com" size={3}/>
                    </FormControl>
                    <FormControl>
                        <Input
                            onChangeText={setPassword}
                            type="password"
                            leftElement={<Icon as={FontAwesome} size={3} ml={3} name="lock" color="black"/>}
                            placeholder="Your Password"
                            rightElement={<Icon as={FontAwesome} size={3} mr={4} name="eye-slash"
                                                color="coolGray.800"/>} size={3}/>
                    </FormControl>
                    <FormControl>
                        <Input
                            onChangeText={setConfirmPassword}
                            type="password"
                            leftElement={<Icon as={FontAwesome} size={3} ml={3} name="lock" color="black"/>}
                            placeholder="Confirm Password"
                            rightElement={<Icon as={FontAwesome} size={3} mr={4} name="eye-slash"
                                                color="coolGray.800"/>} size={3}/>
                    </FormControl>
                    <HStack justifyContent="center">
                        {errors !== "" ? <Text style={styles.error}>{errors}</Text> : null}
                    </HStack>
                    <Button mt="3" style={styles.colorDanger} onPress={signUp}>
                        Sign up
                    </Button>
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
                </VStack>
            </Box>
        </Center>
    )
}

const styles = StyleSheet.create({
    colorDanger: {
        backgroundColor: colors.main,
        borderRadius: 15,
        height: 40,
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
    }
})

export default RegisterScreen;
