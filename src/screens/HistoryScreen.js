import {Box, Heading, ScrollView, Text} from "native-base";
import {TouchableOpacity} from "react-native";
import VoucherItem from "../components/VoucherItem";
import AnimatedLottieView from "lottie-react-native";
import {useEffect, useState} from "react";
import {getAll} from "../api/history";
import Loader from "../components/Loader";
import HistoryItem from "../components/HistoryItem";

const HistoryScreen = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true)
        getAll().then((res) => {
            console.log(res.data.histories)
            setLoading(false)
            setData(res.data.histories);
        }).catch((e) => {
            setLoading(false)
        })
    }, []);
    return (
        <Box
            safeArea
            paddingX="2"
            paddingY="3"
        >
            <Loader loading={loading}/>
            <Heading>My History</Heading>
            <Text
                fontSize="sm"
                fontWeight="bold"
                mt="2"
                ml="2"
            >
                {data.length} Items
            </Text>
            <ScrollView
                style={{marginBottom: 50}}
                /*refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }*/
                showsVerticalScrollIndicator={false}>
                {
                    data && (data.map((item, index) => {
                        return (
                            <TouchableOpacity
                                key={index}
                            >
                                <HistoryItem key={item._id} item={item}/>
                            </TouchableOpacity>
                        )
                    }))
                }
            </ScrollView>
            {data && data.length === 0 && <AnimatedLottieView
                source={require('../../src/assets/nodatafound.json')}
                autoPlay
                style={{width: 300, height: 300, alignSelf: 'center', marginTop: -30}}
                loop/>}
        </Box>
    );
}

export default HistoryScreen;
