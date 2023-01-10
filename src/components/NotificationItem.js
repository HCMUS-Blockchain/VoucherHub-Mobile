import { Box, VStack, Image, Text, HStack } from "native-base";
import Moment from "moment";
const VoucherItem = (props) => {
  console.log("props", props);
  return (
    <Box
      safeArea
      m="2"
      rounded="lg"
      overflow="hidden"
      borderColor="coolGray.200"
      borderWidth="1"
      backgroundColor={!props.check ? "gray.50" : "gray.300"}
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
          <Text>{props.item.message}</Text>
          <Text fontSize="12" color="gray.400"
          >
            {props.item.description}
          </Text>
          <Text fontSize="12" color="gray.400">
            {Moment(props.item.date).format("DD/MM/YYYY HH:mm")}
          </Text>
        </VStack>
      </HStack>
    </Box>
  );
};

export default VoucherItem;
