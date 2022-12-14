import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {getAll, sendPuzzle} from "../api/puzzle";
import Loader from "../components/Loader";
import {BottomSheet} from "react-native-btr";
import {Button, Input, Text, useToast, VStack} from "native-base";
import Colors from "../constants/colors";
import onShare from "../utils/share";
const APP_WEB_GIFT = "http://10.123.0.213:3000";
import Modal from "react-native-modal";
import {Ionicons} from "@expo/vector-icons";
import {checkUserExist} from "../api/user";
const PuzzleCollection = () => {
    const [img, setImg] = useState()
    const [loading, setLoading] = useState(false)
    const [quantity, setQuantity] = useState(0)
    const [idPuzzle, setIdPuzzle] = useState()
    const [piece, setPiece] = useState()
    const [emailFriend, setEmailFriend] = useState("")
    const [visibleModal, setVisibleModal] = useState(false)
    const toast = useToast();
    const toggleModal = () => {
        setVisibleModal(!visibleModal);
    };
    const getListImage = async () => {
        const data = await getAll()
        if (data.data.success) {
            return data.data.puzzles
        } else {
            return []
        }
    }
    const [visible, setVisible] = useState(false);
    const toggleBottomNavigationView = () => {
        setVisible(!visible);
    };
    useEffect(() => {
        setLoading(true)
        getListImage().then((res) => {
            setImg(res)
            setLoading(false)
        })
    }, [])
    //share link
    const shareLink = () => {
        let content
        if (idPuzzle) {
             content = `Congratulation! You have received the puzzle from your friend. You can get it at ${APP_WEB_GIFT}/puzzle?id=${idPuzzle}&&userId=${img.user}&&name=BlackPanther&&piece=${piece}`;
        } else  content = "You don't have any puzzle to share"
        onShare({
            content
        })
    }

    const sendPuzzleToFriend = () => {
        toggleModal()
        const email={
            email:emailFriend
        }
        checkUserExist(email).then((res) => {
            const user = res.data.message
            const userSend = {
                userId : user._id,
                id : idPuzzle,
                name : "BlackPanther",
                piece
            }
            console.log(userSend)
            setLoading(true)
            sendPuzzle(userSend).then(r => {
                toast.show({
                    description: "Send successfully",
                    placement: "top"
                })
                getListImage().then((res) => {
                    setImg(res)
                    setLoading(false)
                })
                setLoading(false)
            })

            toggleBottomNavigationView()
        }).catch((e) => {
            console.log(e)
            toast.show({
                description: "Friend is not existed",
                placement: "top"
            })
            toggleBottomNavigationView()
        })
    }
    return (
        <View style={styles.container}>
            <Loader loading={loading}/>
            <Modal isVisible={visibleModal}>
                <View style={{
                    backgroundColor:"white",
                    justifyContent:"center"
                }}>
                    <VStack w="100%" alignSelf="center">
                        <Input
                            onChangeText={setEmailFriend}
                            placeholder="Fill by your friend email"
                            width="100%"
                            py="2"
                            px="1"
                            fontSize="12"
                            variant="unstyled"
                            InputLeftElement={
                                <Ionicons name="search-outline" size={24} color="white" />
                            }
                        />
                        <Button
                            style={{
                                borderRadius:0
                            }}
                            title="Hide modal"
                            onPress={sendPuzzleToFriend}>
                            Send
                        </Button>
                    </VStack>
                </View>
            </Modal>
            {img &&
                <View style={styles.box}>
                    <TouchableOpacity
                        onPress={() => {
                            setVisible(true)
                            setQuantity(img.piece_1.quantity)
                            setIdPuzzle(null)
                            setPiece("piece_1")
                            if (img.piece_1.id.length > 0) {
                                for (let i = 0; i < img.piece_1.id.length; i++) {
                                    if (img.piece_1.id[i]) {
                                        setIdPuzzle(img.piece_1.id[i])
                                        break
                                    }
                                }
                            }
                        }}
                        style={img.piece_1.quantity > 0 ? styles.imgContainer : styles.notPossess}>
                        <Image
                            style={styles.img}
                            source={{uri: img.piece_1.img}}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            setVisible(true)
                            setQuantity(img.piece_2.quantity)
                            setIdPuzzle(null)
                            setPiece("piece_2")
                            if (img.piece_2.id.length > 0) {
                                for (let i = 0; i < img.piece_2.id.length; i++) {
                                    if (img.piece_2.id[i]) {
                                        setIdPuzzle(img.piece_2.id[i])
                                        break
                                    }
                                }
                            }
                        }}
                        style={img.piece_2.quantity > 0 ? styles.imgContainer : styles.notPossess}>
                        <Image
                            style={styles.img}
                            source={{uri: img.piece_2.img}}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            setVisible(true)
                            setQuantity(img.piece_3.quantity)
                            setIdPuzzle(null)
                            setPiece("piece_3")
                            if (img.piece_3.id.length > 0) {
                                for (let i = 0; i < img.piece_3.id.length; i++) {
                                    if (img.piece_3.id[i]) {
                                        setIdPuzzle(img.piece_3.id[i])
                                        break
                                    }
                                }
                            }
                        }}
                        style={img.piece_3.quantity > 0 ? styles.imgContainer : styles.notPossess}>
                        <Image
                            style={styles.img}
                            source={{uri: img.piece_3.img}}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            setVisible(true)
                            setQuantity(img.piece_4.quantity)
                            setIdPuzzle(null)
                            setPiece("piece_4")
                            if (img.piece_4.id.length > 0) {
                                for (let i = 0; i < img.piece_4.id.length; i++) {
                                    if (img.piece_4.id[i]) {
                                        setIdPuzzle(img.piece_4.id[i])
                                        break
                                    }
                                }
                            }
                        }}
                        style={img.piece_4.quantity > 0 ? styles.imgContainer : styles.notPossess}>
                        <Image
                            style={styles.img}
                            source={{uri: img.piece_4.img}}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            setVisible(true)
                            setQuantity(img.piece_5.quantity)
                            setIdPuzzle(null)
                            setPiece("piece_5")
                            if (img.piece_5.id.length > 0) {
                                for (let i = 0; i < img.piece_5.id.length; i++) {
                                    if (img.piece_5.id[i]) {
                                        setIdPuzzle(img.piece_5.id[i])
                                        break
                                    }
                                }
                            }
                        }}
                        style={img.piece_5.quantity > 0 ? styles.imgContainer : styles.notPossess}>
                        <Image
                            style={styles.img}
                            source={{uri: img.piece_5.img}}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            setVisible(true)
                            setQuantity(img.piece_6.quantity)
                            setIdPuzzle(null)
                            setPiece("piece_6")
                            if (img.piece_6.id.length > 0) {
                                for (let i = 0; i < img.piece_6.id.length; i++) {
                                    if (img.piece_6.id[i]) {
                                        setIdPuzzle(img.piece_6.id[i])
                                        break
                                    }
                                }
                            }
                        }}
                        style={img.piece_6.quantity > 0 ? styles.imgContainer : styles.notPossess}>
                        <Image
                            style={styles.img}
                            source={{uri: img.piece_6.img}}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            setVisible(true)
                            setQuantity(img.piece_7.quantity)
                            setIdPuzzle(null)
                            setPiece("piece_7")
                            if (img.piece_7.id.length > 0) {
                                for (let i = 0; i < img.piece_7.id.length; i++) {
                                    if (img.piece_7.id[i]) {
                                        setIdPuzzle(img.piece_7.id[i])
                                        break
                                    }
                                }
                            }
                        }}
                        style={img.piece_7.quantity > 0 ? styles.imgContainer : styles.notPossess}>
                        <Image
                            style={styles.img}
                            source={{uri: img.piece_7.img}}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            setVisible(true)
                            setQuantity(img.piece_8.quantity)
                            setIdPuzzle(null)
                            setPiece("piece_8")
                            if (img.piece_8.id.length > 0) {
                                for (let i = 0; i < img.piece_8.id.length; i++) {
                                    if (img.piece_8.id[i]) {
                                        setIdPuzzle(img.piece_8.id[i])
                                        break
                                    }
                                }
                            }
                        }}
                        style={img.piece_8.quantity > 0 ? styles.imgContainer : styles.notPossess}>
                        <Image
                            style={styles.img}
                            source={{uri: img.piece_8.img}}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            setVisible(true)
                            setQuantity(img.piece_9.quantity)
                            setIdPuzzle(null)
                            setPiece("piece_9")
                            if (img.piece_9.id.length > 0) {
                                for (let i = 0; i < img.piece_9.id.length; i++) {
                                    if (img.piece_9.id[i]) {
                                        setIdPuzzle(img.piece_9.id[i])
                                        break
                                    }
                                }
                            }
                        }}
                        style={img.piece_9.quantity > 0 ? styles.imgContainer : styles.notPossess}>
                        <Image
                            style={styles.img}
                            source={{uri: img.piece_9.img}}
                        />
                    </TouchableOpacity>
                </View>
            }
            <BottomSheet
                visible={visible}
                onBackButtonPress={toggleBottomNavigationView}
                onBackdropPress={toggleBottomNavigationView}
            >
                <View style={styles.bottomNavigationView}>
                    <TouchableOpacity
                        style={styles.panelButton}>
                        <Text style={styles.panelButtonTitle}>
                            S??? l?????ng: {quantity}
                        </Text>
                    </TouchableOpacity>
                    {quantity > 0 &&
                        <TouchableOpacity
                            onPress={shareLink}
                            style={styles.panelButton}>
                            <Text style={styles.panelButtonTitle}>
                                Share Everyone
                            </Text>
                        </TouchableOpacity>
                    }
                    {quantity > 0 &&
                        <TouchableOpacity
                            onPress={toggleModal}
                            style={styles.panelButton}>
                            <Text style={styles.panelButtonTitle}>
                                Share With My Friend
                            </Text>
                        </TouchableOpacity>
                    }
                </View>
            </BottomSheet>
        </View>
    );
}
export default PuzzleCollection;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    box: {
        width: "80%",
        height: 300,
        backgroundColor: '#c0afaf',
        borderRadius: 10,
        borderWidth: 10,
        borderColor: '#795858',
        flexDirection: 'row',
        flexWrap: 'wrap',
    }, imgContainer: {
        width: '33.33%',
        height: '33.33%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    img: {
        width: '98%',
        height: '98%',
    },
    notPossess: {
        width: '33.33%',
        height: '33.33%',
        justifyContent: 'center',
        alignItems: 'center',
        opacity: 0.2,
    },
    bottomNavigationView: {
        padding: 20,
        backgroundColor: '#FFFFFF',
        paddingTop: 20,
    },
    panelButton: {
        padding: 13,
        borderRadius: 10,
        backgroundColor: Colors.main,
        alignItems: 'center',
        marginVertical: 7,
    },
    panelButtonTitle: {
        fontSize: 17,
        fontWeight: 'bold',
        color: 'white',
    }
})
