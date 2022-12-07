import {Ionicons} from "@expo/vector-icons";
import {Button} from "native-base";
import {getAllVouchersByCategoryName} from "../api/voucher";

const Item = (props) => {
    const filterByCategory = async () => {
        props.setLoading(true);
        const voucherByCategory = await getAllVouchersByCategoryName(props.title)
        props.setData(voucherByCategory.data.vouchers)
        props.setLoading(false);
    }
    return (
        <Button
            onPress={filterByCategory}
            w="120"
            bgColor={props.bgColor}
            borderRadius={20}
            mr="1.5"
            leftIcon={<Ionicons name={props.iconName} size={24} color="white"/>}
        >
            {props.title}
        </Button>
    );
};

export default Item;
