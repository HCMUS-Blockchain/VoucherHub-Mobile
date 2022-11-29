import StackNavigator from "./StackNavigator";
import {useLogin} from "../context/LoginProvider";
import StackSubNavigator from "./StackSubNavigator";
import ReceiveVoucher from "../screens/ReceiveVoucher";

const MainNavigator = () => {
    const {isLogin} = useLogin()
    return (
        isLogin ? <StackSubNavigator/> : <StackNavigator/>
    )

}
export default MainNavigator
