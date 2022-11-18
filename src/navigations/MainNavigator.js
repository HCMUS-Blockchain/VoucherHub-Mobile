import StackNavigator from "./StackNavigator";
import {useLogin} from "../context/LoginProvider";
import BottomNav from "./BottomNav";

const MainNavigator = () => {
    const {isLogin} = useLogin()
    console.log("is login"+isLogin)
    return (
        isLogin ? <BottomNav/> : <StackNavigator/>
    )

}
export default MainNavigator
