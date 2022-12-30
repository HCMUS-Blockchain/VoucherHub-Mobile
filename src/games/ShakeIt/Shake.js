import {Image, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import React, {useEffect} from "react";
import {ShakeEventExpo} from "./ShakeEventExpo";
import Gift from "./Gift/Gift";


const Shake = ({navigation}) => {
    const [displayModal, setDisplayModal] = React.useState(false);
    const [gift, setGift] = React.useState(null);
    const [score, setScore] = React.useState(0);
    useEffect(() => {
        ShakeEventExpo.addListener(() => {
            console.log(123)
            setDisplayModal(true);
            setGift({id: 1, name: 'Present', point: 10},);
            setScore(score + 10);
        });
        return () => {
            ShakeEventExpo.removeListener();
        }
    }, []);


    return (
        <SafeAreaView style={{flex: 1}}>
            <View style={styles.body}>
                <Text style={styles.sectionDescription}>
                    Shake your phone to receive a gift.
                </Text>
                <Image
                    style={{width: 100, height: 100, marginTop: 50}}
                    source={require('./shared/assets/images/shake.png')}
                />
                <Text style={styles.score}>
                    Score: {score}
                </Text>
            </View>
            <Gift
                gift={gift}
                displayModal={setDisplayModal}
                display={displayModal}
                navigation = {navigation}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    body: {
        backgroundColor: 'white',
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    sectionDescription: {
        fontSize: 20,
        fontWeight: '500',
        color: 'dimgray',
    },
    score: {
        marginTop: 50,
        fontSize: 40,
        fontWeight: '600',
        color: 'orange',
    }
});

export default Shake;
