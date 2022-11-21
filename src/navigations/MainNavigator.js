import StackNavigator from "./StackNavigator";
import {useLogin} from "../context/LoginProvider";
import BottomNav from "./BottomNav";

const MainNavigator = () => {
    const {isLogin} = useLogin()
    return (
        isLogin ? <BottomNav/> : <StackNavigator/>
    )

}
export default MainNavigator
