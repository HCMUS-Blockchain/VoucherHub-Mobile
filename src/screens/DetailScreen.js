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
  Heading,
  ScrollView,
} from "native-base";
import { Ionicons } from "@expo/vector-icons";

import VoucherDetail from "../../components/VoucherDetail";
const DetailScreen = () => {
  return (
    <>
      <StatusBar bg="#3700B3" barStyle="light-content" />
      <Box mb="10">
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
      </Box>
      <ScrollView>
        <Box ml="7">
          <VoucherDetail />
        </Box>
        <Box p="1">
          <Heading>Phuc Long discount 65% for Student(U22)</Heading>
          <Text color="#AC1616">Remain Voucher: 10</Text>
          <HStack w="100%" alignItem="center">
            <Box
              w="8"
              h="8"
              bgColor="blue.300"
              borderRadius="5"
              alignItems="center"
              alignContent="center"
              alignSelf="center"
            >
              <Ionicons name="calendar" size={24} color="#5669FF" />
            </Box>
            <VStack ml="2">
              <Text>8:00 AM, 14 December, 2022</Text>
              <Text fontSize="10" color="gray.400">
                Exp date: 8:00PM, 20 December 2022
              </Text>
            </VStack>
          </HStack>
          <HStack w="100%" alignItem="center">
            <Box alignSelf="center">
              <Image
                alt="phuclong"
                source={require("../assets/img/phuclong.png")}
                width="8"
                height="8"
              />
            </Box>
            <VStack ml="2">
              <Text>Phuc Long</Text>
              <Text fontSize="10" color="gray.400">
                224 Nguyen Tri Phuong, Quan 10
              </Text>
            </VStack>
            <Button
              size="sm"
              borderRadius="20"
              alignSelf="center"
              ml="30"
              bgColor="#5669FF"
            >
              See others
            </Button>
          </HStack>
          <Heading fontSize="18" mt="2">
            Conditions
          </Heading>
          <Text>
            Contrary to popular belief, Lorem Ipsum is not simply random text.
            It has roots in a piece of classical Latin literature from 45 BC,
            making it over 2000 years old. Richard McClintock, a Latin professor
            at Hampden-Sydney College in Virginia, looked up one of the more
            obscure Latin words, consectetur, from a Lorem Ipsum passage, and
            going through the cites of the word in classical literature,
            discovered the undoubtable source. Lorem Ipsum comes from sections
            1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes
            of Good and Evil) by Cicero, written in 45 BC. This book is a
            treatise on the theory of ethics, very popular during the
            Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit
            amet..", comes from a line in section 1.10.32.
          </Text>
        </Box>
        <Center>
          <Button
            w="180"
            borderRadius="15"
            rightIcon={
              <Ionicons name="arrow-forward-circle" size={24} color="white" />
            }
            backgroundColor="#BD261C"
          >
            CHOOSE GAME
          </Button>
        </Center>
      </ScrollView>
    </>
  );
};

export default DetailScreen;