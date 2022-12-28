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
        <VStack w="250" ml="2" paddingRight="2">
          <Text fontSize="12" color="gray.400"
          >
            You just received a {props.item.type} from {props.item.game}
          </Text>
          <Text fontSize="12" color="gray.400">
            {props.item.date}
          </Text>
        </VStack>
      </HStack>
    </Box>
  );
};

export default VoucherItem;
