import {Box, Heading, Input, ScrollView, VStack} from "native-base";
import {Ionicons} from "@expo/vector-icons";
import HorizontalScrollViewFilter from "../components/HorizontalScrollViewFilter";
import VoucherItem from "../components/VoucherItem";
import {useCallback, useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Loader from "../components/Loader";
import {getAll, searchVoucher} from "../api/voucher";
import AnimatedLottieView from "lottie-react-native";
const lodash = require('lodash');

const VoucherListScreen = () => {
    const [query, setQuery] = useState('');
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
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
        setData(search.data.vouchers);
        setLoading(false);
    }
    const debounceDropDown = useCallback(lodash.debounce((nextValue) => handleSearch(nextValue), 1000), [])
    const getListVoucher = async () => {
        setLoading(true);
        const token = await AsyncStorage.getItem("token");
        if (token) {
            try {
                const vouchers = await getAll()
                return vouchers.data.vouchers
            } catch (e) {
                setLoading(false);
                return []
            }
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
                />
            </VStack>

            <HorizontalScrollViewFilter
                setData={setData}
            />
            <ScrollView showsVerticalScrollIndicator={false}>
                {
                    data && (data.map((item, index) => {
                        return (
                            <VoucherItem key={index} item={item}/>
                        )
                    }))
                }
            </ScrollView>
            {data && data.length === 0 && <AnimatedLottieView
                source={require('../../src/assets/nodatafound.json')}
                autoPlay
                style={{width: 300, height: 300, alignSelf: 'center', marginTop: 20}}
                loop/>}
        </Box>
    );
};

export default VoucherListScreen;
