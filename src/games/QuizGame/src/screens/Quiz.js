import React, {useEffect, useState} from 'react'
import {
    Alert,
    Animated,
    BackHandler,
    Image,
    Modal,
    SafeAreaView,
    StatusBar,
    Text,
    TouchableOpacity,
    View
} from 'react-native'
import {COLORS, SIZES} from '../constants';
import * as Progress from 'react-native-progress';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import clients from "../../../../api/clients";
import Loader from "../../../../components/Loader";
import quizData from "../data/QuizData";

const form = [{
    "answer": "C",
    "optionA": "bakery",
    "optionB": "fishmonger's",
    "optionC": "green",
    "optionD": "jewellery shop",
    "question": "You can buy fish at the...",
},
    {
        "answer": "C",
        "optionA": "dairy corner",
        "optionB": "grocer's",
        "optionC": "butcher's",
        "optionD": "green grocer's",
        "question": "You can buy milk at the ...",
    },
    {
        "answer": "C",
        "optionA": "bakery",
        "optionB": "fishmonger's",
        "optionC": "green",
        "optionD": "jewellery shop",
        "question": "You can buy a pencil and a notebook at the ...",
    },
    {
        "answer": "C",
        "optionA": "bakery",
        "optionB": "fishmonger's",
        "optionC": "green",
        "optionD": "jewellery shop",
        "question": "You can buy meat at the...",
    },
    {
        "answer": "C",
        "optionA": "bakery",
        "optionB": "fishmonger's",
        "optionC": "green",
        "optionD": "jewellery shop",
        "question": "You can buy elephant at the...",
    }
]

const mapAnswer = (answer) => {
switch (answer) {
        case 'A':
            return "optionA"
        case 'B':
            return "optionB"
        case 'C':
            return "optionC"
        case 'D':
            return "optionD"
    }
}
const handleForm = (form) => {
    const newArray = []
    const arrForm = form.questions
    for (let i = 0; i < arrForm.length; i++) {
        const object = {
            options : [arrForm[i].optionA, arrForm[i].optionB, arrForm[i].optionC, arrForm[i].optionD],
            correct_option : arrForm[i][mapAnswer(arrForm[i].answer)],
            question : arrForm[i].question
        }
        newArray.push(object)
    }
    return newArray
}
const Quiz = (props) => {
    const [loading, setLoading] = useState(false)
    const getVoucher = async () => {
        const token = await AsyncStorage.getItem("token");
        setLoading(true)
        clients.post('/vouchers/playgame', {
            gameType: 'Quiz Game',
            points: score,
            campaignId: "6392b1093446e7413e28d683",
        }, {
            headers: {
                Authorization: `JWT ${token}`,
            }
        }).then((res) => {
            if (res.data.success) {
                props.navigation.navigate('ReceiveVoucher', {
                    code: res.data.voucher.code,
                    expiredDate: res.data.voucher.expiredDate,
                    discount: res.data.voucher.discount
                })
            } else {
                console.log(res.data.message)
            }
            setLoading(false)
        }).catch((e) => {
            console.log(e)
            Alert.alert('Warning', 'Voucher not available', [{text: 'OK'}])
            setLoading(false)
        })
    }
    useEffect(() => {
        const backAction = () => {
            Alert.alert("Hold on!", "Are you sure you want to go back?", [
                {
                    text: "Cancel",
                    onPress: () => null,
                    style: "cancel"
                },
                {text: "YES", onPress: () => props.navigation.goBack()}
            ]);
            return true;
        };

        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );

        return () => backHandler.remove();
    }, []);
    const allQuestions = handleForm(props.games)
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
    const [currentOptionSelected, setCurrentOptionSelected] = useState(null);
    const [correctOption, setCorrectOption] = useState(null);
    const [isOptionsDisabled, setIsOptionsDisabled] = useState(false);
    const [score, setScore] = useState(0)
    const [showNextButton, setShowNextButton] = useState(false)
    const [showScoreModal, setShowScoreModal] = useState(false)

    const validateAnswer = (selectedOption) => {
        let correct_option = allQuestions[currentQuestionIndex]['correct_option'];
        setCurrentOptionSelected(selectedOption);
        setCorrectOption(correct_option);
        setIsOptionsDisabled(true);
        if (selectedOption == correct_option) {
            // Set Score
            setScore(score + 1)
        }
        // Show Next Button
        setShowNextButton(true)// Set progress bar
        setProgressWidth((currentQuestionIndex+1)/allQuestions.length )
    }
    const handleNext = () => {
        if (currentQuestionIndex == allQuestions.length - 1) {
            // Last Question
            // Show Score Modal
            setShowScoreModal(true)
        } else {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setCurrentOptionSelected(null);
            setCorrectOption(null);
            setIsOptionsDisabled(false);
            setShowNextButton(false);

        }
        Animated.timing(progress, {
            toValue: currentQuestionIndex + 1,
            duration: 1000,
            useNativeDriver: true
        }).start();
    }
    const restartQuiz = () => {
        setShowScoreModal(false);

        setCurrentQuestionIndex(0);
        setScore(0);

        setCurrentOptionSelected(null);
        setCorrectOption(null);
        setIsOptionsDisabled(false);
        setShowNextButton(false);
        setProgressWidth(0)
        Animated.timing(progress, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: true
        }).start();
    }


    const renderQuestion = () => {

        return (
            <View style={{
                marginVertical: 40
            }}>
                {/* Question Counter */}
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'flex-end'
                }}>
                    <Text style={{
                        color: COLORS.white,
                        fontSize: 20,
                        opacity: 0.6,
                        marginRight: 2
                    }}>{currentQuestionIndex + 1}</Text>
                    <Text style={{color: COLORS.white, fontSize: 18, opacity: 0.6}}>/ {allQuestions.length}</Text>
                </View>

                {/* Question */}
                <Text style={{
                    color: COLORS.white,
                    fontSize: 30
                }}>{allQuestions[currentQuestionIndex]?.question}</Text>
            </View>
        )
    }
    const renderOptions = () => {
        return (
            <View>
                {
                    allQuestions[currentQuestionIndex]?.options.map(option => (
                        <TouchableOpacity
                            onPress={() => validateAnswer(option)}
                            disabled={isOptionsDisabled}
                            key={option}
                            style={{
                                borderWidth: 3,
                                borderColor: option == correctOption
                                    ? COLORS.success
                                    : option == currentOptionSelected
                                        ? COLORS.error
                                        : COLORS.secondary + '40',
                                backgroundColor: option == correctOption
                                    ? COLORS.success + '20'
                                    : option == currentOptionSelected
                                        ? COLORS.error + '20'
                                        : COLORS.secondary + '20',
                                height: 60, borderRadius: 20,
                                flexDirection: 'row',
                                alignItems: 'center', justifyContent: 'space-between',
                                paddingHorizontal: 20,
                                marginVertical: 10
                            }}
                        >
                            <Text style={{fontSize: 20, color: COLORS.white}}>{option}</Text>

                            {/* Show Check Or Cross Icon based on correct answer*/}
                            {
                                option == correctOption ? (
                                    <View style={{
                                        width: 30, height: 30, borderRadius: 30 / 2,
                                        backgroundColor: COLORS.success,
                                        justifyContent: 'center', alignItems: 'center'
                                    }}>
                                        <MaterialCommunityIcons name="check" style={{
                                            color: COLORS.white,
                                            fontSize: 20
                                        }}/>
                                    </View>
                                ) : option == currentOptionSelected ? (
                                    <View style={{
                                        width: 30, height: 30, borderRadius: 30 / 2,
                                        backgroundColor: COLORS.error,
                                        justifyContent: 'center', alignItems: 'center'
                                    }}>
                                        <MaterialCommunityIcons name="close" style={{
                                            color: COLORS.white,
                                            fontSize: 20
                                        }}/>
                                    </View>
                                ) : null
                            }

                        </TouchableOpacity>
                    ))
                }
            </View>
        )
    }
    const renderNextButton = () => {
        if (showNextButton) {
            return (
                <TouchableOpacity
                    onPress={handleNext}
                    style={{
                        marginTop: 20, width: '100%', backgroundColor: COLORS.accent, padding: 20, borderRadius: 5
                    }}>
                    <Text style={{fontSize: 20, color: COLORS.white, textAlign: 'center'}}>Next</Text>
                </TouchableOpacity>
            )
        } else {
            return null
        }
    }


    const [progress, setProgress] = useState(new Animated.Value(0));
    const progressAnim = progress.interpolate({
        inputRange: [0, allQuestions.length],
        outputRange: ['0%', '100%']
    })
    const [progressWidth, setProgressWidth] = useState(0);
    const renderProgressBar = () => {
        return (
            <View style={{
                width: '100%',
                height: 20,
                borderRadius: 20,
                alignItems: 'center',
                justifyContent: 'center',
                display: 'flex',
            }}>
                <Progress.Bar progress={progressWidth} width={280} />
            </View>
        )
    }


    return (
        <SafeAreaView style={{
            flex: 1
        }}>
            <StatusBar barStyle="light-content" backgroundColor={COLORS.primary}/>
            <Loader loading={loading}/>
            <View style={{
                flex: 1,
                paddingVertical: 40,
                paddingHorizontal: 16,
                backgroundColor: COLORS.background,
                position: 'relative'
            }}>

                {/* ProgressBar */}
                {renderProgressBar()}

                {/* Question */}
                {renderQuestion()}

                {/* Options */}
                {renderOptions()}

                {/* Next Button */}
                {renderNextButton()}

                {/* Score Modal */}
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={showScoreModal}
                >
                    <View style={{
                        flex: 1,
                        backgroundColor: COLORS.primary,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <View style={{
                            backgroundColor: COLORS.white,
                            width: '90%',
                            borderRadius: 20,
                            padding: 20,
                            alignItems: 'center'
                        }}>
                            <Text style={{
                                fontSize: 30,
                                fontWeight: 'bold'
                            }}>{score > (allQuestions.length / 2) ? 'Congratulations!' : 'Oops!'}</Text>

                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'flex-start',
                                alignItems: 'center',
                                marginVertical: 20
                            }}>
                                <Text style={{
                                    fontSize: 30,
                                    color: score > (allQuestions.length / 2) ? COLORS.success : COLORS.error
                                }}>{score}</Text>
                                <Text style={{
                                    fontSize: 20, color: COLORS.black
                                }}>/ {allQuestions.length}</Text>
                            </View>
                            {/* Retry Quiz button */}
                            <TouchableOpacity
                                onPress={getVoucher}
                                style={{
                                    backgroundColor: COLORS.accent,
                                    padding: 20, width: '100%', borderRadius: 20
                                }}>
                                <Text style={{
                                    textAlign: 'center', color: COLORS.white, fontSize: 20
                                }}>Voucher</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={restartQuiz}
                                style={{
                                    backgroundColor: COLORS.accent,
                                    padding: 20, width: '100%', borderRadius: 20, marginTop: 20
                                }}>
                                <Text style={{
                                    textAlign: 'center', color: COLORS.white, fontSize: 20
                                }}>Retry Quiz</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={()=> props.navigation.goBack()}
                                style={{
                                    backgroundColor: COLORS.accent,
                                    padding: 20, width: '100%', borderRadius: 20,
                                    marginTop: 20
                                }}>
                                <Text style={{
                                    textAlign: 'center', color: COLORS.white, fontSize: 20
                                }}>Return</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </Modal>

                {/* Background Image */}
                <Image
                    source={require('../assets/images/DottedBG.png')}
                    style={{
                        width: SIZES.width,
                        height: 130,
                        zIndex: -1,
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        opacity: 0.5
                    }}
                    resizeMode={'contain'}
                />

            </View>
        </SafeAreaView>
    )
}

export default Quiz
