import { Box, VStack, Image, Text, HStack } from "native-base";
import Moment from 'moment';
const VoucherItem = (props) => {
  return (
    <Box
      safeArea
      m="2"
      rounded="lg"
      overflow="hidden"
      borderColor="coolGray.200"
      borderWidth="1"
      backgroundColor="#FBEAEB"
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
        <VStack w="200" ml="2" paddingRight="2">
          <Text
              fontWeight="bold"
              fontSize="12" color={props.item.message.includes("nhận") ? '#2F3C73' : '#AB729F'}
          >
            {props.item.message}
          </Text>
          <Text fontSize="12" color="gray.400"
          >
            {props.item.name}
          </Text>
          <Text fontSize="12" color="gray.400">
            {Moment(props.item.date).format('dddd, MMMM Do YYYY, h:mm:ss a')}
          </Text>
        </VStack>
      </HStack>
    </Box>
  );
};

export default VoucherItem;
