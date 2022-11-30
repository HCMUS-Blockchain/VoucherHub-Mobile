import Voucher from "../assets/img/voucher_06.svg";
import {Box, HStack, VStack} from "native-base";
import {Text} from "react-native";

const VoucherDetail = (props) => {
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
                    transform: [{rotate: "270deg"}],
                    position: "absolute",
                    left: 20,
                    top: 0,
                    bottom: 0,
                    marginBottom: "auto",
                    marginTop: "auto",
                    marginLeft: 10,
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
                Code: {props.code}
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
                Exp: {props.expiredDate}{" "}
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
                SAVE {props.discount}%
            </Text>
            <Text
                style={{
                    transform: [{rotate: "270deg"}],
                    position: "absolute",
                    left: 288,
                    top: 0,
                    bottom: 0,
                    marginBottom: "auto",
                    marginTop: "auto",
                    marginLeft: 10,
                    textAlign: "center",
                    fontSize: 10,
                    color: "white",
                    fontWeight: "bold",
                }}
            >
                CODE: {props.code}
            </Text>
        </Box>
    );
};

export default VoucherDetail;
