import {useEffect, useRef, useState} from "react";
import clients from "../api/clients";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {FlatList, Image, SafeAreaView, StyleSheet, Animated} from "react-native";
import Loader from "../components/Loader";
import VoucherDetail from "../components/VoucherDetail";
import {View} from "native-base";
import getData from "../api/helper";
import {getAll} from "../api/voucher";

const HEIGHT_IMG = 100;
const ITEM_PADDING = 10;
const ITEM_MARGIN_BOTTOM = 20;
const ITEM_SIZE = HEIGHT_IMG + ITEM_PADDING * 2 + ITEM_MARGIN_BOTTOM
const MyVouchers = () => {
    const scrollY = useRef(new Animated.Value(0)).current;
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        getListVoucher().then((res) => {
            setData(res);
        })
    }, []);
    const getListVoucher = async () => {
        setLoading(true);
        const token = await AsyncStorage.getItem("token");
        if (token) {
            try {
                const vouchers = await getAll()
                setLoading(false);
                return vouchers.data.vouchers
            } catch (e) {
                console.log(e)
                setLoading(false);
                return []
            }

        }
    }
    const renderItem = ({item, index}) => {
        const scale = scrollY.interpolate({
            inputRange: [
                -1,0,
                ITEM_SIZE * index,
                ITEM_SIZE * (index + 2)
                ],
            outputRange: [1,1,1,0]
        })
        const opacity = scrollY.interpolate({
            inputRange: [ -1,0,
                ITEM_SIZE * index,
                ITEM_SIZE * (index + 0.6)
                ],
            outputRange: [1,1,1,0]
        })
        return (
            <Animated.View style={[styles.item,
                {transform: [{scale}],
                    opacity
                }]}>
                <View style={styles.itemContent}>
                    <VoucherDetail
                        code={item.code}
                        expiredDate={item.expiredDate}
                        discount={item.discount}
                    />
                </View>

            </Animated.View>
        )
    }
    return (
        <SafeAreaView style={styles.container}>
            <Image
                source={require('../assets/img/bg_voucher.jpg')}
                style={StyleSheet.absoluteFillObject}
                blurRadius={70}
            />
            {
                loading ? <Loader loading={loading}/> : (
                    <FlatList
                        data={data}
                        renderItem={renderItem}
                        keyExtractor={item => item._id}
                        onScroll={Animated.event(
                            [{nativeEvent: {contentOffset: {y: scrollY}}},],{useNativeDriver: false})}
                    />
                )
            }
        </SafeAreaView>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    item: {
        flexDirection: 'row',
        marginBottom: ITEM_MARGIN_BOTTOM,
        borderRadius: 10,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 10},
        shadowOpacity: 0.5,
        shadowRadius: 20,
        padding: ITEM_PADDING,
    },
    itemContent: {
        justifyContent: 'center',
        flex: 1,
        marginLeft:18,
    }
})

export default MyVouchers
