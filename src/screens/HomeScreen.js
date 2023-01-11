import {Box, Button, Flex, Heading, HStack, Image, ScrollView, Text, VStack,} from "native-base";
import {Ionicons} from "@expo/vector-icons";
import Voucher from "../components/Voucher";
import {useEffect, useState} from "react";
import {getNewestCampaign} from "../api/campaign";
import Loader from "../components/Loader";
import Counterpart from "../components/Counterpart";
import {getPopularBranch} from "../api/counterpart";


const HomeScreen = () => {
    const [isLoading, setLoading] = useState(false);
    const [newestCampaigns, setNewestCampaign] = useState([]);
    const [popularBranches, setPopularBranches] = useState([]);
    useEffect(() => {
        setLoading(true);
        getNewestCampaign().then((res) => {
            setNewestCampaign(res.data.campaigns);
        })
        getPopularBranch().then((res) => {
            setPopularBranches(res.data.counterparts);
        })
        setLoading(false);
    }, []);
    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <Box px="5" bgColor="white">
                <Loader loading={isLoading}/>
                <Flex justify="space-between" align="center" direction="row" w="100%">
                    <Heading size="sm">Newest Campaigns</Heading>
                    <Flex direction="row">
                        <Text>See all</Text>
                        <Ionicons name="arrow-forward" size={24} color="black"/>
                    </Flex>
                </Flex>
                <ScrollView
                    w="100%"
                    horizontal={true}
                    showsVerticalScrollIndicator={false}
                >
                    {
                        newestCampaigns && newestCampaigns.map((item, index) => {
                            return (
                                <Voucher key={index}
                                         campaignID={item._id}
                                         image={item.image}
                                         title={item.name}
                                         date={item.createdAt}
                                         address={item.address}
                                         checkFavorite={item.checkFavorite}
                                         setNewestCampaign={setNewestCampaign}
                                />
                            )
                        })
                    }
                </ScrollView>
                <HStack bgColor="#31E1F7" borderRadius="10" mt="5">
                    <VStack space="3" justify="center" alignSelf="center" ml="2">
                        <Text>Invite your friends</Text>
                        <Text fontSize="10">Get $20 for ticker</Text>
                        <Button w="100" bgColor="#31C6D4">
                            INVITE
                        </Button>
                    </VStack>
                    <Image
                        alt="Logo"
                        w="167"
                        h="150"
                        source={require("../assets/img/banner.png")}
                    />
                </HStack>
                <Flex
                    justify="space-between"
                    align="center"
                    direction="row"
                    w="100%"
                    mt="2"
                >
                    <Heading size="sm">Popular Branch</Heading>
                    <Flex direction="row">
                        <Text>See all</Text>
                        <Ionicons name="arrow-forward" size={24} color="black"/>
                    </Flex>
                </Flex>
                <ScrollView
                    w="100%"
                    horizontal={true}
                    showsVerticalScrollIndicator={false}
                >
                    {
                        popularBranches && popularBranches.map((item, index) => {
                            return (
                                <Counterpart key={index}
                                         image={item.image}
                                         shop={item.nameOfShop}
                                         address={item.headquarter}
                                         phone={item.phone}
                                />
                            )
                        })
                    }
                </ScrollView>
                <Flex
                    justify="space-between"
                    align="center"
                    direction="row"
                    w="100%"
                    mt="2"
                >
                    <Heading size="sm">Nearby You</Heading>
                    <Flex direction="row">
                        <Text>See all</Text>
                        <Ionicons name="arrow-forward" size={24} color="black"/>
                    </Flex>
                </Flex>
            </Box>
        </ScrollView>
    );
};

export default HomeScreen;
