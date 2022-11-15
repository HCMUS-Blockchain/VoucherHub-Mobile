import {
  Box,
  Center,
  Image,
  Text,
  ZStack,
  VStack,
  HStack,
  Flex,
  Pressable,
} from "native-base";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const Voucher = () => {
  const navigation = useNavigation();
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
      onPress={() => {
        navigation.navigate("DetailScreen");
      }}
    >
      <Box mr="3" ml="3">
        <Flex>
          <Image
            alignContent="center"
            alt="Logo"
            borderRadius="20"
            mt="1"
            source={require("../src/assets/img/image80.png")}
            position="relative"
          />
          <VStack
            bgColor="red.100"
            w="47"
            borderRadius="10"
            position="absolute"
            top="2"
            left="2"
          >
            <Text alignSelf="center" color="#F0635A">
              20
            </Text>
            <Text alignSelf="center" isTruncated w="99%" color="#F0635A">
              June
            </Text>
          </VStack>
          <Box
            w="10"
            h="10"
            bgColor="red.100"
            borderRadius="10"
            alignItems="center"
            justifyContent="center"
            position="absolute"
            right="0"
            top="0"
            mt="2"
            mr="2"
          >
            <Ionicons name="bookmark" size={24} color="#EB5757" />
          </Box>
        </Flex>

        <Text isTruncated w="210">
          Phuc Long Off 65% for Student asasaas
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
          <Ionicons name="location" size={24} color="#716E90" />
          <Text isTruncated w="180" fontSize="10">
            224 Nguyen Tri Phuong, District 10
          </Text>
        </HStack>
      </Box>
    </Pressable>
  );
};

export default Voucher;
