import Voucher from "../src/assets/img/voucher_06.svg";
import { Box, HStack, VStack } from "native-base";
import { Text } from "react-native";
const VoucherDetail = () => {
  return (
    <Box>
      <Box position="relative" w="260">
        <Voucher
          height="145"
          preserveAspectRatio="xMinYMin slice"
          width="300"
        />
      </Box>

      <Text
        style={{
          transform: [{ rotate: "270deg" }],
          position: "absolute",
          left: 20,
          top: 0,
          bottom: 0,
          marginBottom: "auto",
          marginTop: "auto",
          textAlign: "center",
          fontSize: 22,
          letterSpacing: 2,
          color: "white",
          fontWeight: "bold",
        }}
      >
        COUPON
      </Text>
      <Text
        style={{
          color: "white",
          fontSize: 8,
          position: "absolute",
          left: 72,
        }}
      >
        Code: 123456789
      </Text>
      <Text
        style={{
          color: "white",
          fontSize: 8,
          position: "absolute",
          left: 72,
          top: 11,
        }}
      >
        Exp: 23.03.2020{" "}
      </Text>
      <Text
        style={{
          color: "white",
          fontSize: 40,
          position: "absolute",
          fontWeight: "bold",
          width: 150,
          top: 20,
          left: 70,
        }}
      >
        SAVE 75%
      </Text>
      <Text
        style={{
          transform: [{ rotate: "270deg" }],
          position: "absolute",
          left: 288,
          top: 0,
          bottom: 0,
          marginBottom: "auto",
          marginTop: "auto",
          textAlign: "center",
          fontSize: 10,
          color: "white",
          fontWeight: "bold",
        }}
      >
        CODE: 123456789
      </Text>
    </Box>
  );
};

export default VoucherDetail;
