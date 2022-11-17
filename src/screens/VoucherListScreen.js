import { Heading, Box, VStack, Input, ScrollView } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import HorizontalScrollViewFilter from "../components/HorizontalScrollViewFilter";
import VoucherItem from "../components/VoucherItem";
const VoucherListScreen = () => {
  return (
    <Box safeArea>
      <Heading>My Voucher</Heading>
      <VStack w="100%" alignSelf="center" mb="7">
        <Input
          placeholder="Search People & Places"
          width="100%"
          py="2"
          px="1"
          fontSize="12"
          variant="unstyled"
          InputLeftElement={
            <Ionicons name="search-outline" size={24} color="black" />
          }
        />
      </VStack>
      <HorizontalScrollViewFilter />
      <ScrollView showsVerticalScrollIndicator={false}>
        <VoucherItem />
        <VoucherItem />
        <VoucherItem />
        <VoucherItem />
        <VoucherItem />
        <VoucherItem />
      </ScrollView>
    </Box>
  );
};

export default VoucherListScreen;
