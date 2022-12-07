import { Box, VStack, Image, Text, HStack } from "native-base";
const VoucherItem = (props) => {
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
          source={{uri:props.item.image}}
          resizeMode="contain"
        />
        <VStack w="250" ml="2">
          <Text>Discount {props.item.discount}%</Text>
          <Text fontSize="12" color="gray.400">
            {props.item.description}
          </Text>
          <Text fontSize="12" color="gray.400">
            {props.item.expiredDate}
          </Text>
        </VStack>
      </HStack>
    </Box>
  );
};

export default VoucherItem;
