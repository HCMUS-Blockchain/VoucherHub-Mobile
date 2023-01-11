import {Box, Flex, HStack, Image, Pressable, Text, useToast, View, VStack, ZStack,} from "native-base";
import {Ionicons} from "@expo/vector-icons";
import {useNavigation} from "@react-navigation/native";
import Moment from "moment/moment";
import {addFavorite, deleteFavorite, getNewestCampaign} from "../api/campaign";
import {useLogin} from "../context/LoginProvider";
import {useState} from "react";
import Loader from "./Loader";

const Store = (props) => {
    const toast = useToast();
    const {profile} = useLogin()
    const navigation = useNavigation();
    const [isLoading, setLoading] = useState(false);
    return (
        <Pressable
            w="237"
            h="235"
            rounded="lg"
            overflow="hidden"
            borderColor="coolGray.200"
            borderWidth="1"
            mr="5"
            mt="5"
        >
            <Box mr="3" ml="3">
                <Loader loading={isLoading}/>
                <Flex>
                    <Image
                        alignContent="center"
                        alt="Logo"
                        borderRadius="20"
                        mt="1"
                        w="100%"
                        h="65%"
                        resizeMode="contain"
                        source={{uri: props.image}}
                        position="relative"
                    />
                </Flex>
                <View
                    style={{
                        marginTop: -38
                    }}
                >
                    <Text isTruncated w="210">
                        {props.title}
                    </Text>
                    <Text isTruncated w="210">
                        {props.description}
                    </Text>
                    <Flex w="100%" h="7" direction="row" mt="2">
                        <ZStack>
                            <Image
                                alignContent="center"
                                alt="Logo"
                                borderRadius="90"
                                w="7"
                                h="7"
                                source={{
                                    uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZmlsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
                                }}
                            />
                            <Image
                                alignContent="center"
                                alt="Logo"
                                borderRadius="90"
                                w="7"
                                h="7"
                                mr={5}
                                ml={5}
                                shadow={5}
                                source={{
                                    uri: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjB8fHByb2ZpbGV8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
                                }}
                            />
                            <Image
                                alignContent="center"
                                alt="Logo"
                                borderRadius="90"
                                w="7"
                                h="7"
                                mr={10}
                                ml={10}
                                shadow={5}
                                source={{
                                    uri: "https://images.unsplash.com/photo-1497316730643-415fac54a2af?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8cHJvZmlsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
                                }}
                            />
                        </ZStack>
                        <Text fontSize="10" ml="20" alignSelf="center" color="#3F38DD">
                            +20 Going
                        </Text>
                    </Flex>
                    <HStack alignItems="center" mt="2">
                        <Ionicons name="location" size={24} color="#716E90"/>
                        <Text isTruncated w="180" fontSize="10">
                            {props.address}
                        </Text>
                    </HStack>
                </View>
            </Box>
        </Pressable>
    );
};

export default Store;
