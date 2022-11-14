import {TouchableOpacity} from "react-native";
import {Text} from "native-base";
import Colors from "../constants/colors";
const Buttons = ({on_press,btn_text}) => {
    return (
        <TouchableOpacity style={{justifyContent:'center',width:'95%',backgroundColor:Colors.main,height:50,marginBottom:30,borderRadius:10}}
                          onPress={on_press}
        >
            <Text style={{fontSize:20,letterSpacing:1.5,textAlign:'center',position:'relative',color:Colors.white}} >{btn_text}</Text>
        </TouchableOpacity>
    )
}

export default Buttons

