import {ScrollView, View} from "native-base";
import {RefreshControl, StyleSheet, TouchableOpacity} from "react-native";
import VoucherItem from "../components/VoucherItem";
import AnimatedLottieView from "lottie-react-native";
import {useCallback, useEffect, useState} from "react";
import {getDataUnSeen, getListNoti, getNumberUnSeenNoti} from "../api/notification";
import Loader from "../components/Loader";
import NotificationItem from "../components/NotificationItem";

const NotificationScreen = () => {
    const [data, setData] = useState([]);
    const [dataUnseen, setDataUnseen] = useState([]);
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    useEffect(() => {
        setLoading(true);
        getListNoti().then((res) => {
            console.log("res",res)
            setData(res.data.notifications);
            setLoading(false);
        }).catch((e) => {
            console.log(e)
            setLoading(false);
        })
        getDataUnSeen().then((res) => {
            setDataUnseen(res.data.listID)
            setLoading(false);
        }).catch((e)=>{
            console.log(e)
            setLoading(false)
        })

    }, []);
    const onRefresh = useCallback(() => {
        setRefreshing(true);
        getListNoti().then((res) => {
            setData(res.data.notifications);
            setRefreshing(false);
        }).catch((e) => {
            console.log(e)
            setRefreshing(false);
        })
    }, []);
    return (
        <View style={styles.container}>
            <Loader loading={loading}/>
            <ScrollView
                style={{marginBottom: 150}}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
                showsVerticalScrollIndicator={false}>
                {
                    data && (data.map((item, index) => {
                        return (
                            <NotificationItem
                                key={item._id}
                                item={item}
                                check={dataUnseen.includes(item._id)}
                            />
                        )
                    }))
                }
            </ScrollView>
            {data && data.length === 0 && <AnimatedLottieView
                source={require('../../src/assets/nodatafound.json')}
                autoPlay
                style={{width: 300, height: 300, alignSelf: 'center', marginTop: -300}}
                loop/>}
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})
export default NotificationScreen
