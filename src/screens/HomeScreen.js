import {
  Heading,
  Box,
  Flex,
  ScrollView,
  Text,
  View,
  HStack,
  Center,
  Container,
} from "native-base";
import { Ionicons } from "@expo/vector-icons";
const HomeScreen = () => {
  return (
    <Box px="5">
      <Flex justify="space-between" align="center" direction="row" w="100%">
        <Heading size="sm">Upcoming Events</Heading>
        <Flex direction="row">
          <Text>See all</Text>
          <Ionicons name="arrow-forward" size={24} color="black" />
        </Flex>
      </Flex>
    </Box>
  );
};

export default HomeScreen;
