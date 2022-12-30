import {ActivityIndicator, Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modal';
import _ from 'lodash';
import {useState} from "react";
import {playPuzzle} from "../../../api/voucher";
import Loader from "../../../components/Loader";

const Gift = (props) => {
    const [loading, setLoading] = useState(false);
    const receiveVoucherFunc = () => {
        setLoading(true);
        const data = {
            name: "BlackPanther",
        }
        playPuzzle(data).then((res) => {
            console.log(res.data);
            if (res.data.success){
                setLoading(false);
                props.displayModal(false);
                props.navigation.navigate('ReceiveVoucher', {img: res.data?.data?.img});
            }else{
                setLoading(false);
            }
        }).catch((err) => {
            setLoading(false);
            console.log(err)
        })
    }
    return (
        <Modal isVisible={props.display}
               onDismiss={() => props.displayModal(false)}
        >
            <Loader loading={loading}/>
            <View style={styles.container}>
                <View style={styles.btnClose}>
                    <Icon
                        name="close"
                        color="white"
                        size={30}
                        onPress={() => props.displayModal(false)}
                    />
                </View>

                {
                    _.isNil(props.gift) &&
                    <View style={{justifyContent: 'center'}}>
                        <ActivityIndicator
                            size="large"
                        />
                    </View>
                }

                {
                    !_.isNil(props.gift) &&
                    <View style={{alignItems: 'center'}}>
                        <TouchableOpacity
                            onPress={receiveVoucherFunc}
                        >
                            <Image
                                source={require('../shared/assets/images/flower.png')}
                            />
                        </TouchableOpacity>
                        <Text style={styles.message}>You got a {props.gift.name}!</Text>

                        <Text
                            style={[styles.point, {color: props.gift.point > 0 ? 'green' : 'red'}]}>{props.gift.point} points</Text>
                    </View>
                }
            </View>
        </Modal>
    );
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        borderRadius: 15,
        height: 300,
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnClose: {
        position: 'absolute',
        right: 20,
        top: 20,
        zIndex: 1000,
        backgroundColor: 'gray',
        borderRadius: 50,
        width: 35,
        height: 35,
        alignItems: 'center',
        justifyContent: 'center'
    },
    message: {
        fontSize: 18,
        marginTop: 20
    },
    point: {
        fontSize: 18,
        marginTop: 10,
        fontWeight: '500'
    }
})

export default Gift;
