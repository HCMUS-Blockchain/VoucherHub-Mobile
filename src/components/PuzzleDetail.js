import {View} from "native-base";
import {Image, StyleSheet} from "react-native";

const PuzzleDetail = ({img}) => {
    return (
        <View style={styles.container}>
            <View style={styles.box}>
                <Image
                    style={styles.img}
                    source={{uri: img}}
                    />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    box: {
        width: "80%",
        height: 130,
        backgroundColor: '#c0afaf',
        borderRadius: 10,
        borderWidth: 10,
        borderColor: '#795858',
        justifyContent: 'center',
        alignItems: 'center',
    },img: {
        width: "95%",
        height: "95%",
        resizeMode: 'cover',
    }
})
export default PuzzleDetail;
