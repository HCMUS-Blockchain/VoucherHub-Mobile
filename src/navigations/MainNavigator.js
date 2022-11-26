import StackNavigator from "./StackNavigator";
import {useLogin} from "../context/LoginProvider";
import StackSubNavigator from "./StackSubNavigator";

const MainNavigator = () => {
    const {isLogin} = useLogin()
    return (
        isLogin ? <StackSubNavigator/> : <StackNavigator/>
    )

}
export default MainNavigator
