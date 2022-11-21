import {Image, Text, View} from "native-base";
import {StyleSheet, TouchableOpacity} from "react-native";
import * as ImagePicker from 'expo-image-picker';
import {BottomSheet} from 'react-native-btr';
import {useState} from "react";
import Colors from "../constants/colors";
import clients from "../api/clients";
import findExtension from "../utils/helper";
import Loader from "../components/Loader";
import {useLogin} from "../context/LoginProvider";

const UploadImageScreen = (props) => {
    const {setProfile} = useLogin()
    const [visible, setVisible] = useState(false);
    const [profileImage, setProfileImage] = useState(null);
    const [progress,setProgress] = useState(false)
    const { token } = props.route.params;
    const toggleBottomNavigationView = () => {
        setVisible(!visible);
    };
    const openImageCamera = async () => {
        let permissionResult = await ImagePicker.requestCameraPermissionsAsync();
        if (permissionResult.granted === false) {
            alert("Permission to access camera roll is required! Please go to settings and allow permission.");
            return;
        }
        let pickerResult = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.5
        });
        if (pickerResult.canceled === true) {
            return;
        }
        setProfileImage(pickerResult.assets[0].uri);
        setVisible(false);
    }
    const uploadProfileImage = async () => {
        setProgress(true)
        const formData = new FormData();
        formData.append('profile', {
            name: new Date() + "_profile",
            uri: profileImage,
            type: "image/" + findExtension(profileImage)
        })
        try{
            const res = await clients.post('/users/upload-profile', formData,{
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'multipart/form-data',
                    authorization: `JWT ${token}`
                }
            })
            if(res.data.success){
                setProfile(res.data.user)
                setProgress(false)
                props.navigation.navigate('SuccessLoginScreen')
            }
            setProgress(false)
        }catch (e){
            console.log(e)
            alert("Upload failed")
            setProgress(false)
        }
    }
    const removeCurrentImage = () => {
        setProfileImage(null)
        setVisible(false)
    }
    const openImageLibrary = async () => {
        const {status} = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to make this work! Please go to Settings > Privacy > Camera Roll and enable permission.');
        } else if (status === 'granted') {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });
            if (!result.canceled) {
                setVisible(false)
                setProfileImage(result.assets[0].uri);
            }
        }
    }
    return (
        <View style={styles.container}>
            <Loader loading={progress} />
            <View>
                <TouchableOpacity
                    onPress={toggleBottomNavigationView}
                    style={styles.uploadBtnContainer}>
                    {profileImage ? <Image
                        alt={'Profile Image'}
                        source={{uri: profileImage}}
                        style={{width: '100%', height: '100%'}}
                    /> : <Text style={styles.uploadBtn}>Upload Image</Text>}
                </TouchableOpacity>
                <Text
                    onPress={() => props.navigation.navigate('SuccessLoginScreen')}
                    style={styles.skip}>Skip</Text>
                {profileImage && <Text
                    onPress={uploadProfileImage}
                    style={[styles.skip, {
                        backgroundColor: Colors.main,
                        borderRadius: 8,
                        marginTop: 15,
                    }]}>Upload</Text>}
                <BottomSheet
                    visible={visible}
                    onBackButtonPress={toggleBottomNavigationView}
                    onBackdropPress={toggleBottomNavigationView}
                >
                    <View style={styles.bottomNavigationView}>
                        <View style={{alignItems: 'center'}}>
                            <Text style={styles.panelTitle}>Upload Photo</Text>
                            <Text style={styles.panelSubtitle}>Choose Your Profile Picture</Text>
                        </View>
                        <TouchableOpacity
                            onPress={openImageCamera}
                            style={styles.panelButton}>
                            <Text style={styles.panelButtonTitle}>Take Photo</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.panelButton}
                                          onPress={openImageLibrary}
                        >
                            <Text style={styles.panelButtonTitle}>Choose From Library</Text>
                        </TouchableOpacity>
                        {profileImage && <TouchableOpacity
                            onPress={removeCurrentImage}
                            style={styles.panelButton}>
                            <Text style={styles.panelButtonTitle}>Remove Current Image</Text>
                        </TouchableOpacity>}
                        <TouchableOpacity
                            onPress={() => setVisible(false)}
                            style={styles.panelButton}>
                            <Text style={styles.panelButtonTitle}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </BottomSheet>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    uploadBtnContainer: {
        height: 125,
        width: 125,
        borderRadius: 125 / 2,
        justifyContent: 'center',
        alignItems: 'center',
        borderStyle: 'dashed',
        borderWidth: 1,
        overflow: 'hidden',
    },
    uploadBtn: {
        textAlign: 'center', fontSize: 16, opacity: 0.3, fontWeight: 'bold'
    },
    skip: {
        textAlign: 'center',
        padding: 10,
        fontSize: 16,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        letterSpacing: 1,
        opacity: 0.5
    },
    bottomNavigationView: {
        padding: 20,
        backgroundColor: '#FFFFFF',
        paddingTop: 20,
    },
    panelTitle: {
        fontSize: 27,
        height: 35,
        padding: 5,
    },
    panelSubtitle: {
        fontSize: 14,
        color: 'gray',
        height: 30,
        marginBottom: 10,
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
export default UploadImageScreen;
