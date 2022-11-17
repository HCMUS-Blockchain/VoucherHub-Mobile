import { Box, VStack, Image, Text, HStack } from "native-base";
const VoucherItem = () => {
  return (
    <Box
      safeArea
      m="2"
      rounded="lg"
      overflow="hidden"
      borderColor="coolGray.200"
      borderWidth="1"
    >
      <HStack alignItems="center">
        <Image
          alt="Logo"
          w="100"
          h="100"
          alignSelf="center"
          source={require("../assets/img/image87.png")}
        />
        <VStack w="250" ml="2">
          <Text>Discount 50%</Text>
          <Text fontSize="12" color="gray.400">
            Reduce $2 for orders value over $50
          </Text>
          <Text fontSize="12" color="gray.400">
            Exp date: 23.03.2022
          </Text>
        </VStack>
      </HStack>
    </Box>
  );
};

export default VoucherItem;
