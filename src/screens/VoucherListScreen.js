import {Box, Heading, Input, ScrollView, VStack} from "native-base";
import {Ionicons} from "@expo/vector-icons";
import HorizontalScrollViewFilter from "../components/HorizontalScrollViewFilter";
import VoucherItem from "../components/VoucherItem";
import {useCallback, useEffect, useState} from "react";
import Loader from "../components/Loader";
import {getAll, searchVoucher} from "../api/voucher";
import AnimatedLottieView from "lottie-react-native";
import {RefreshControl} from "react-native";

const lodash = require('lodash');

const VoucherListScreen = () => {
    const [query, setQuery] = useState('');
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        getRefresh().then((res) => {
            setData(res);
            setRefreshing(false);
        })
    }, []);
    useEffect(() => {
        getListVoucher().then((res) => {
            setData(res);
            setLoading(false);
        })
    }, []);
    const handleChange = ({nativeEvent}) => {
        const {text} = nativeEvent;
        setQuery(text);
        debounceDropDown(text);
    }
    const handleSearch = async value => {
        setLoading(true);
        const search = await searchVoucher(value);
        if (search.data.success) {
            setData(search.data.vouchers);
            setLoading(false);
        }else{
            setLoading(false);
            setData([]);
        }

    }
    const debounceDropDown = useCallback(lodash.debounce((nextValue) => handleSearch(nextValue), 1000), [])
    const getListVoucher = async () => {
        setLoading(true);
        try {
            const vouchers = await getAll()
            if (vouchers.data.success) {
                return vouchers.data.vouchers
            }
            else{
                return []
            }
        } catch (e) {
            setLoading(false);
            return []
        }
    }
    const getRefresh = async () => {
        try {
            const vouchers = await getAll()
            if (vouchers.data.success) {
                return vouchers.data.vouchers
            }
            else{
                return []
            }
        } catch (e) {
            return []
        }
    }
    return (
        <Box
            safeArea
            paddingX="2"
            paddingY="3"
        >
            <Loader loading={loading}/>
            <Heading>My Voucher</Heading>
            <VStack w="100%" alignSelf="center" mb="7">
                <Input
                    value={query}
                    placeholder="Search Places"
                    width="100%"
                    py="2"
                    px="1"
                    fontSize="12"
                    variant="unstyled"
                    onChange={handleChange}
                    InputLeftElement={
                        <Ionicons name="search-outline" size={24} color="black"/>
                    }
                    InputRightElement={
                        <Ionicons name="ios-close-circle"
                                  style={{display: query ? 'flex' : 'none', marginRight: 10}}
                                  size={24} color="black" onPress={() =>{
                            getListVoucher().then((res) => {
                                setData(res);
                                setLoading(false);
                            })
                            setQuery('')}}/>
                    }
                />
            </VStack>

            <HorizontalScrollViewFilter
                setData={setData}
            />
            <ScrollView
                style={{marginBottom: 120}}
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
                            <VoucherItem key={item._id} item={item}/>
                        )
                    }))
                }
            </ScrollView>
            {data && data.length === 0 && <AnimatedLottieView
                source={require('../../src/assets/nodatafound.json')}
                autoPlay
                style={{width: 300, height: 300, alignSelf: 'center',marginTop: -30}}
                loop/>}
        </Box>
    );
};

export default VoucherListScreen;
