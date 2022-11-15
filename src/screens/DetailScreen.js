import {
  StatusBar,
  Text,
  HStack,
  Box,
  Image,
  Header,
  ZStack,
  Flex,
  Button,
  VStack,
  Center,
} from "native-base";
import { Ionicons } from "@expo/vector-icons";
import Voucher from "../assets/img/voucher_06.svg";

const DetailScreen = () => {
  return (
    <>
      <StatusBar bg="#3700B3" barStyle="light-content" />
      <Box>
        <Image
          alt="Logo"
          w="100%"
          h="150"
          position="relative"
          source={require("../assets/img/image80.png")}
        />
        <HStack
          justifyContent="space-around"
          alignItems="center"
          bg="red.100"
          w="80%"
          borderRadius="20"
          p="2"
          position="absolute"
          bottom="-30"
          right="10"
        >
          <ZStack mt="-7">
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
          <Text pl="8" color="#3F38DD">
            +20 Going
          </Text>
          <Button borderRadius="15" bg="#3F38DD">
            Invite
          </Button>
        </HStack>
        <Voucher width={120} height={40} />
      </Box>
    </>
  );
};

export default DetailScreen;
