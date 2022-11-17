import { Ionicons } from "@expo/vector-icons";
import { Button } from "native-base";
const Item = (props) => {
  return (
    <Button
      w="120"
      bgColor={props.bgColor}
      borderRadius={20}
      mr="1.5"
      leftIcon={<Ionicons name={props.iconName} size={24} color="white" />}
    >
      {props.title}
    </Button>
  );
};

export default Item;
