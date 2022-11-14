import { Ionicons } from "@expo/vector-icons";
import { HStack, Input, StatusBar, Text, VStack } from "native-base";
import React from "react";
const Header = () => {
  return (
    <>
      <StatusBar />
      <HStack
        bg="#BD261C"
        px="1"
        py="2"
        justify="flex-start"
        direction="column"
        alignItems="center"
        w="100%"
        h="120"
        borderBottomRadius={50}
      >
        <HStack justifyContent="center">
          <VStack alignItems="center">
            <HStack>
              <Text color="white:alpha.70" fontSize="10">
                Current locations
              </Text>
              <Ionicons name="chevron-down-outline" size={20} color="white" />
            </HStack>
            <Text
              color="white"
              fontSize="10"
              fontWeight="bold"
              alignSelf="center"
            >
              152B Tran Hung Dao, Quan 1, Tp.HCM
            </Text>
          </VStack>
          <Ionicons name="notifications" size={24} color="white" />
        </HStack>
        <VStack w="100%" alignSelf="center">
          <Input
            placeholder="Search People & Places"
            width="100%"
            py="2"
            px="1"
            fontSize="12"
            variant="unstyled"
            InputLeftElement={
              <Ionicons name="search-outline" size={24} color="white" />
            }
          />
        </VStack>
      </HStack>
    </>
  );
};

export default Header;
