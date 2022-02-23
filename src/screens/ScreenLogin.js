import React, { useState, useEffect } from "react";
import { Animated } from "react-native";
import { MaterialIcons, AntDesign } from "@expo/vector-icons";
import { LinearGradient } from 'expo-linear-gradient';
import FootTabLogin from "../components/FootTabLogin";
import dbLogin from "../classes/ClassDBLogin";
import SocialMedia from "../classes/ClassSocialMedia";
import Toast from "../components/CompoToast";
import GeneralUtils from "../utils/GeneralUtils";
import { actionsTypesAPI } from "../Actions/ConstActionsApi";
import { actions } from "../Actions/ActionLogin";
import CompoApiLoadingView from "../components/CompoApiLoadingView";
import { useDispatch, useSelector } from "react-redux";

import {
    Input,
    Icon,
    Stack,
    Button,
    Text,
    HStack,
    KeyboardAvoidingView,
    Center,
    Image
} from "native-base";

function Login({ navigation }) {

    /////////////VARIABLE TO HANDLE THE EMAIL AND PASSWORD TO DB/////////////
    const [invalidEmail, setInvalidEmail] = useState(false);
    const [email, setEmail] = useState("");

    const [invalidPassword, setInvalidPassword] = useState(false);
    const [password, setPassword] = useState("");

    /////////////VARIABLE TO HANDLE THE PASSWORD VISUALIZATION /////////////
    const [show, setShow] = useState(false)
    const handleClick = () => setShow(!show)

    /////////////VARIABLE TO HANDLE THE ANIMATIONS /////////////
    const [heightInput,] = useState(new Animated.Value(1));
    const [heightInput2,] = useState(new Animated.Value(1));
    const [offset,] = useState(new Animated.ValueXY({ x: 0, y: 80 }));
    const [opacity] = useState(new Animated.Value(0));

    /////////////VARIABLE TO HANDLE THE STYLE CHANGING ON SOCIAL MEDIA BUTTONS /////////////
    const [isSignUping, setIsSignUping] = useState(false);

    /////////////VARIABLE TO HANDLE THE STYLE CHANGING ON LOGIN AND PASSWORD INPUTS /////////////
    const [borderFocusWidth, setBorderFocusWidth] = useState(1);
    const [borderFocusWidth2, setBorderFocusWidth2] = useState(1);

    /////////////VARIABLE TO HANDLE THE LOGIN BUTTON STATUS /////////////
    const [isLogin, setIslogin] = useState(false);

    /////////////VARIABLE AND FUNCTIONS TO HANDLE THE LOGIN BUTTON WITH REDUX /////////////
    const user = useSelector(state => state.reducerLogin);
    const dispatch = useDispatch();
    const handleLogin = (userDt) => {dispatch(actions.login(userDt))}

    useEffect(() => {
        setIslogin(false);
        setIsSignUping(false);
        if(user.api_status === actionsTypesAPI.STATUS_ERRO){
            console.log("ERRO: "+user);
            return;
        }
        else if(user.api_status === actionsTypesAPI.STATUS_USER_NOT_FOUND){
            console.log("NOT FOUND: "+user);
            return;
        }
        else if(user.api_status === actionsTypesAPI.STATUS_OK){
            navigation.navigate("Drawer");
        }

        Animated.parallel([
            Animated.spring(offset.y, {
                toValue: 0,
                speed: 4,
                bounciness: 18,
                useNativeDriver: true
            }),
            Animated.timing(opacity, {
                toValue: 1,
                duration: 400,
                useNativeDriver: true
            })
        ]).start();
    }, [user.login_attempts]);

    return (
        <LinearGradient style={{ flex: 1 }}
            colors={['#00b9f3', '#061b21', '#061b21']}
            start={[1, 0]} end={[0, 3]}
            locations={[0.7, 0.1, 0.2]}
        >
        
            <KeyboardAvoidingView
                bgColor={"transparent"}
                flex={1}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
            
{/*/////////////////////////////////// ANIMATION TO BOUNCE THE SCREEN WHEN IT LOADS /////////////////////////////////*/}
                <Animated.View flex={1} style={{
                    opacity: opacity,
                    transform: [{ translateY: offset.y }]
                }}>
                    <Center flex={1} safeAreaTop>  </Center>

{/*/////////////////////////////////// LOGO IMAGE  /////////////////////////////////*/}
                    <Stack space={6} w="100%" alignItems="center" marginBottom={10}>
                        <Image {...styless.IMG} source={require('../../assets/icon.png')}/>
                        <Text color={"#00b9f3"} fontWeight={"bold"} fontSize={16}> Welcome to IOwl </Text>

{/*/////////////////////////////////// EMAIL INPUT /////////////////////////////////*/}
                        <Animated.View style={{ transform: [{ scale: heightInput }] }}>
                            <Input
                                onChangeText={(email) => {
                                    setEmail(email);
                                }}
                                onFocus={() => {
                                    setBorderFocusWidth(3);
                                    Animated.timing(
                                        heightInput, {
                                        toValue: 1.1,
                                        duration: 300,
                                        useNativeDriver: true
                                    }
                                    ).start();
                                }}
                                onEndEditing={() => {
                                    setBorderFocusWidth(1);
                                    Animated.timing(
                                        heightInput, {
                                        toValue: 1,
                                        duration: 300,
                                        useNativeDriver: true
                                    }
                                    ).start();
                                }}
                                {...styless.INPUTS}
                                isInvalid={invalidEmail}
                                borderWidth={borderFocusWidth}                               
                                InputLeftElement={
                                    <Icon
                                        {...styless.ICON}
                                        as={<MaterialIcons name="person" />}
                                    />
                                }
                            />
                        </Animated.View>

{/*/////////////////////////////////// PASSWORD INPUT /////////////////////////////////*/}
                        <Animated.View style={{ transform: [{ scale: heightInput2 }] }}>
                            <Input
                                onChangeText={(password) => {
                                    setPassword(password);
                                }}
                                onFocus={() => {
                                    setBorderFocusWidth2(3);
                                    Animated.timing(
                                        heightInput2, {
                                        toValue: 1.1,
                                        duration: 300,
                                        useNativeDriver: true
                                    }
                                    ).start();
                                }}
                                onEndEditing={() => {
                                    setBorderFocusWidth2(1);
                                    Animated.timing(
                                        heightInput2, {
                                        toValue: 1,
                                        duration: 300,
                                        useNativeDriver: true
                                    }
                                    ).start();
                                }}
                                type={show ? "text" : "password"}
                                isInvalid={invalidPassword}
                                borderWidth={borderFocusWidth2}
                                {...styless.INPUTS}
                                InputLeftElement={
                                    <Icon
                                        as={<MaterialIcons name="lock" />}
                                        {...styless.ICON}
                                    />
                                }
                                InputRightElement={
                                    <Button size="md" bg={"rgb(0,185,243)"} rounded="none" w="1/6" h="full" onPress={handleClick}>
                                        <Text color={"white"} fontWeight={"bold"} marginLeft={-2}> {show ? "Hide" : "Show"} </Text>
                                    </Button>
                                }
                                placeholderTextColor={"rgb(0,185,243)"}
                                placeholder="Password"
                            />
                        </Animated.View>
                        <HStack space={1}>

{/*/////////////////////////////////// GOOGLE BUTTON /////////////////////////////////*/}
                            <Button
                                isLoading={isSignUping}
                                {...styless.BUTTON.GOOGLE}
                                onPress={() => {
                                    
                                    SocialMedia.GoogleSignin().then(googleResponse => {
                                        setIsSignUping(true);
                                        if (googleResponse === "cancel") {
                                            setIsSignUping(false);
                                            return;
                                        }
                                        var dateToday = new Date();
                                        dateToday = GeneralUtils.date_DBformat(dateToday);
                                        const name = googleResponse.user.familyName + ", " + googleResponse.user.givenName;
                                        const email = googleResponse.user.email;
                                        const phone = null;
                                        const password = GeneralUtils.generatePassword(5);
                                        const dateofBirth = dateToday;
                                        const dtactive = dateToday;
                                        const googleId = googleResponse.user.id;
                                        const googleAcessToken = googleResponse.accessToken;
                                        
                                        dbLogin.postRegisterPeople(name.toUpperCase(), email.toLowerCase(), phone, password, dateofBirth, dtactive, googleId).then((response) => {
                                            if (response === "User Already Exists") {
                                                Toast.showToast("User Already Exists");
                                                setIsSignUping(false);
                                                return;
                                            }
                                            Toast.showToast("Sucessfully Registered");
                                            const userDt = {email: email, password: password, googleAcessToken: googleAcessToken}
                                            handleLogin(userDt);
                                        }).catch((error) => {
                                            console.log(error);
                                            setIsSignUping(false);
                                        });
                                    }).catch((error) => {
                                        alert(error);
                                        setIsSignUping(false);
                                    });
                                }}
                            >
                                <HStack alignItems={"flex-end"} space={3} paddingRight={2}>
                                    <Icon
                                        as={<AntDesign name="googleplus" />}
                                        color={"white"}
                                        size={7}
                                        ml="3"
                                    />
                                    <Text
                                        color={"white"}
                                        fontWeight={"bold"}
                                        fontSize={18}
                                    >
                                        Google Sign Up
                                    </Text>
                                </HStack>
                            </Button>
                        </HStack>

                        {/*/////////////////////////////////// BUTTON LOGIN /////////////////////////////////*/}
                        <Button
                            onPress={() => {
                                setIslogin(true);
                                if (!!email.trim() && !!password.trim()) {
                                    if(!GeneralUtils.validateEmail(email.trim())){
                                        setInvalidEmail(true);
                                        Toast.showToast("Invalid Input", "Invalid Input", "Wrong Email, please check it. Probably you forgot to type a character or something.");
                                        setIslogin(false);
                                        return;
                                    }
                                    const userDt = {email: email, password: password, googleAcessToken: ""}
                                    handleLogin(userDt);
                                }
                                else if (!email.trim()) {
                                    setInvalidEmail(true);
                                    Toast.showToast("Invalid Input", "Empty E-mail", "You must fill the E-mail field. All fields must be filled without exception.");
                                    setIslogin(false);
                                    return;
                                } else if (!password.trim()) {
                                    setInvalidPassword(true);
                                    Toast.showToast("Invalid Input", "Empty Password", "You must fill the Password field. All fields must be filled without exception.");
                                    setIslogin(false);
                                    return;
                                }
                                
                            }}
                            isLoading={isLogin}
                            {...styless.BUTTON.LOGIN}
                        >
                            Login...
                        </Button>
                    </Stack>
                </Animated.View>
            </KeyboardAvoidingView>
            
            <FootTabLogin navigation={navigation} isLogin={isLogin} isSignUping={isSignUping} />
            {isLogin || isSignUping? <CompoApiLoadingView/>: null}
        </LinearGradient>
    )
}

export default Login;

const styless = {
    BUTTON:{
        LOGIN:{
            marginTop:"10%",
            alignSelf:"center",
            borderRadius:10,
            borderColor:"rgb(0,185,243)",
            borderWidth:2,
            w:"60%",
            height:50,
            isLoadingText:"Submitting",
            variant:"outline",
            _loading:{
                bg: "rgba(0,185,243,0.5)",
                _text: { color: "rgb(0,185,243)", fontWeight: "bold", fontSize: "16" },
                borderColor: "rgb(0,185,243)",
                borderWidth: 1,
            },
            _text:{
                fontWeight: "bold",
                fontSize: "16"
            },
            _pressed:{
                bgColor: "rgba(0,185,243,0.5)",
                borderColor: "rgba(0,185,243,0.5)"
            }
        },
        GOOGLE:{
            _loading:{
                bg: 'rgba(0,185,243,0.5)',
                _text: { color: "rgb(0,185,243)", fontWeight: "bold", fontSize: "16" },
                borderColor: "rgb(0,185,243)",
                borderWidth: 1,
            },
            _text:{
                fontWeight: "bold",
                fontSize: "16"
            },
            _pressed:{
                    bgColor: "rgba(0,185,243,0.5)",
                    borderColor: "rgba(0,185,243,0.5)"
                },
            bgColor:'rgba(3,17,29,0.7)',
            shadow:9, w:"60%",
            h:"100%",
        }
    },
    INPUTS:{
        borderColor: "{'rgb(0,185,243)'}",
        w:"90%",
        autoCapitalize:"none",
        selectionColor:'white',
        color:'white',
        borderRadius:10,
        placeholderTextColor:"{'rgb(0,185,243)'}",
        placeholder:"Email",
        height:50,
        fontSize:"md",
        keyboardType:"email-address",
    },
    ICON:{
        color:"{'rgb(0,185,243)'}",
        size:6,
        ml:"2"
    },
    IMG:{
        marginTop:0,
        alignSelf:"center",
        marginBottom:0,
        size:150,
        alt:"LOGO",
        borderRadius:100
    }
}