import React, { useState,useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Platform } from 'react-native';
import { Animated, View } from 'react-native';
import { MaterialIcons, AntDesign } from "@expo/vector-icons";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import GeneralUtils from "../utils/GeneralUtils";
import Toast from "./CompoToast";
import dbLogin from "../classes/ClassDBLogin";
import { actionsTypesAPI } from "../Actions/ConstActionsApi";
import { actions } from "../Actions/ActionLogin";
import { useDispatch, useSelector } from "react-redux";

import {
  KeyboardAvoidingView,
  Input,
  Icon,
  Stack,
  Button,
  Text,
  ScrollView
} from "native-base";

export default function CompoRegisterPeople(props) {

    /////////////VARIABLE AND FUNCTIONS TO HANDLE THE LOGIN BUTTON WITH REDUX /////////////
    const user = useSelector(state => state.reducerLogin);
    const dispatch = useDispatch();
    const handleLogin = (userDt) => {dispatch(actions.login(userDt))}
    
    useEffect(() => {
        setisRegistering(false);
        props.sendIsRegisteringStateToParent(false);

        if(user.api_status === actionsTypesAPI.STATUS_OK){
            Toast.showToast("Sucessfully Registered");
        }

    }, [user.login_attempts]);

//////////////////////////// STATES FOR THE INPUTS //////////////////////////////
// FULL NAME //
  const [invalidName, setInvalidName] = useState(false);
  const [name, setName] = useState(""); 

// EMAIL //
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [email, setEmail] = useState("");

// PHONE //
  const [InvalidPhone, setInvalidPhone] = useState(false);
  const [phone,Setphone] = useState("");

// PASSOWRD 01 //
  const [InvalidPassword, setInvalidPassword] = useState(false);
  const [password1,SetPassword1] = useState("");

// PASSOWRD CONFIRMATION //
  const [InvalidPasswordConfirmation, setInValidPasswordConfirmation] = useState(false)
  const [passwordConfirmation, SetPasswordConfirmation] = useState("");

//////////////////////////// STATES AND FUNCTIONS TO DATEPICKER //////////////////////////////
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isDatePickerSelected, setDatePickerSelected] = useState(false);
  const [dateToday, setDate] = useState(new Date());

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setDate(date);
    setDatePickerSelected(true)
    hideDatePicker();
  };

//////////////////////////// STATES FOR THE ANIMATION //////////////////////////////  
    const [nameAnimation,] = useState(new Animated.Value(1));
    const [emailAnimation,] = useState(new Animated.Value(1));
    const [phoneAnimation,] = useState(new Animated.Value(1));
    const [passwordAnimation,] = useState(new Animated.Value(1));
    const [passwordAnimation2,] = useState(new Animated.Value(1));

    //////////////////////////// STATE FOR THE REGISTERING CONTROL //////////////////////////////
    const [isRegistering, setisRegistering] = useState(false);

    //////////////////////////// STATES FOR THE PASSWORD CONTROL //////////////////////////////
    const [showPass, setShowPass] = useState(false);
    const handleClick = () => setShowPass(!showPass);

    return (
        <KeyboardAvoidingView
            flex={1}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <ScrollView>
                <View style={{ flex: 1, backgroundColor: "transparent", marginTop: 20 }}>
                    <Stack space={6} w="100%" alignItems="center" flex={1}>

{/************************* FULL NAME INPUT *************************/}
                        <Animated.View style={{ transform: [{ scale: nameAnimation }] }}>
                            <Input
                                onChangeText={(text) =>{                                    
                                    setName(text);
                                }}
                                onFocus={() => {
                                    Animated.timing(nameAnimation, {
                                        toValue: 1.1,
                                        duration: 300,
                                        useNativeDriver: true
                                    }).start();
                                }}
                                onEndEditing={() => {
                                    Animated.timing(nameAnimation, {
                                        toValue: 1,
                                        duration: 300,
                                        useNativeDriver: true
                                    }).start();
                                }}
                                InputLeftElement={
                                    <Icon
                                        as={<MaterialIcons name='person' />}
                                        {...styless.ICON}
                                    />
                                }
                                isInvalid={invalidName}
                                {...styless.INPUT}
                                maxLength={50}
                                placeholder="Full Name"
                            />
                        </Animated.View>

{/************************* EMAIL INPUT *************************/}
                        <Animated.View style={{ transform: [{ scale: emailAnimation }] }}>
                            <Input
                                onChangeText={(text) =>{
                                    setEmail(text);
                                }}
                                onFocus={() => {
                                    Animated.timing(emailAnimation, {
                                        toValue: 1.1,
                                        duration: 300,
                                        useNativeDriver: true
                                    }).start();
                                }}
                                onEndEditing={() => {
                                    Animated.timing(emailAnimation, {
                                        toValue: 1,
                                        duration: 300,
                                        useNativeDriver: true
                                    }).start();
                                }}
                                InputLeftElement={
                                    <Icon
                                        as={<MaterialIcons name="mail" />}
                                        {...styless.ICON}
                                    />
                                }
                                isInvalid={invalidEmail}
                                {...styless.INPUT}
                                placeholder="Email"
                                maxLength={50}
                            />
                        </Animated.View>

{/************************* PHONE INPUT *************************/}
                        <Animated.View style={{ transform: [{ scale: phoneAnimation }] }}>
                            <Input
                                onChangeText={(text) => {                                    
                                    Setphone(text);
                                }}
                                onFocus={() => {
                                    Animated.timing(phoneAnimation, {
                                        toValue: 1.1,
                                        duration: 300,
                                        useNativeDriver: true
                                    }).start();
                                }}
                                onEndEditing={() => {
                                    Animated.timing(phoneAnimation, {
                                        toValue: 1,
                                        duration: 300,
                                        useNativeDriver: true
                                    }).start();
                                }}
                                InputLeftElement={
                                    <Icon
                                        as={<MaterialIcons name="phone" />}
                                        {...styless.ICON}
                                    />
                                }
                                isInvalid={InvalidPhone}
                                {...styless.INPUT}
                                keyboardType='numeric'
                                placeholder="Phone"
                                maxLength={11}
                            />
                        </Animated.View>

{/************************* PASSWORD INPUT *************************/}
                        <Animated.View style={{ transform: [{ scale: passwordAnimation }] }}>
                            <Input
                                onChangeText={(text) => {
                                    SetPassword1(text);
                                }}
                                
                                onFocus={() => {
                                    Animated.timing(passwordAnimation, {
                                        toValue: 1.1,
                                        duration: 300,
                                        useNativeDriver: true
                                    }).start();
                                }}
                                onEndEditing={() => {
                                    Animated.timing(passwordAnimation, {
                                        toValue: 1,
                                        duration: 300,
                                        useNativeDriver: true
                                    }).start();
    
                                }}

                                InputLeftElement={
                                    <Icon
                                        as={<MaterialIcons name="lock" />}
                                        {...styless.ICON}
                                    />
                                }
                                InputRightElement={
                                    <Button size="md" bg={"rgb(0,98,130)"} rounded="none" w="1/6" h="full" onPress={handleClick}>
                                        <Text color={"white"} fontWeight={"bold"} marginLeft={-2}> {showPass ? "Hide" : "Show"} </Text>
                                    </Button>
                                }
                                type={showPass ? "text" : "password"}
                                isInvalid={InvalidPassword}
                                {...styless.INPUT}
                                placeholder="Password"
                                maxLength={25}
                            />
                        </Animated.View>

{/************************* PASSWORD CONFIRMATION INPUT *************************/}
                        <Animated.View style={{ transform: [{ scale: passwordAnimation2 }] }}>
                            <Input
                                onChangeText={(text)=>{
                                    SetPasswordConfirmation(text);
                                }}
                                onFocus={() => {
                                    Animated.timing(passwordAnimation2, {
                                        toValue: 1.1,
                                        duration: 300,
                                        useNativeDriver: true
                                    }).start();
                                }}
                                onEndEditing={() => {
                                    Animated.timing(passwordAnimation2, {
                                        toValue: 1,
                                        duration: 300,
                                        useNativeDriver: true
                                    }).start();
                                }}
                                InputLeftElement={
                                    <Icon
                                        as={<MaterialIcons name="lock" />}
                                        {...styless.ICON}
                                    />
                                }
                                InputRightElement={
                                    <Button size="md" bg={"rgb(0,98,130)"} rounded="none" w="1/6" h="full" onPress={handleClick}>
                                        <Text color={"white"} fontWeight={"bold"} marginLeft={-2}> {showPass ? "Hide" : "Show"} </Text>
                                    </Button>
                                }
                                type={showPass ? "text" : "password"}
                                isInvalid={InvalidPasswordConfirmation}
                                maxLength={25}
                                placeholder="Password Confirmation"
                                {...styless.INPUT}
                            />
                        </Animated.View>

{/************************* DATE OF BIRTH BUTTON *************************/}
                        <View alignItems={"center"}
                            onTouchStart={()=>{setDatePickerVisibility(true);}}
                        >
                        <Stack>
                            <Input
                                borderWidth={isDatePickerVisible?3:1}
                                {...styless.DATEOFBIRTH}
                                InputLeftElement={
                                    <Icon
                                        as={<AntDesign name="calendar" />}
                                        onPress={()=>{console.log("test");}}
                                        {...styless.ICON}
                                    />
                                }
                            >
                                {isDatePickerSelected && dateToday.toString().substring(4, 15)}
                            </Input>
                            <DateTimePickerModal
                                isVisible={isDatePickerVisible}
                                mode="date"
                                onConfirm={handleConfirm}
                                onCancel={hideDatePicker}
                                locale="en_GB"
                                timePickerModeAndroid='spinner'
                            />
                            </Stack>
                        </View>

{/************************* REGISTER BUTTON *************************/}
                        <Button
                            onPress={() => {
                                setisRegistering(true); 
                                if(!!name.trim() && !!phone.trim() && (phone.length === 11) && !!password1.trim() && !!passwordConfirmation.trim()){

                                    const dateEveryday = new Date();
                                    const DOBformatted = GeneralUtils.date_DBformat(dateToday);
                                    const dtactive =  GeneralUtils.date_DBformat(dateEveryday);

                                    if(password1 !== passwordConfirmation){
                                        setInValidPasswordConfirmation(true);
                                        Toast.showToast("Invalid Input","Password Invalid!","The Password Confirmation does not match to the first Password field. Make sure that both password are the same.");
                                        setisRegistering(false);
                                        return;
                                    }
                                    if(!(GeneralUtils.validateEmail(email))) {
                                        setInvalidEmail(true);
                                        Toast.showToast("Invalid Input","Email Invalid!","Wrong Email, please check it. Probably you forgot to type a character or something.");
                                        setisRegistering(false);
                                        return;
                                    }
                                    if(dateToday.toString().substring(4, 15) === dateEveryday.toString().substring(4, 15)){
                                        setisRegistering(false);
                                        Toast.showToast("Invalid Input","Date of Birth Invalid!","Check your date of birth, it will not be available for anyone, but it is necessary.");
                                        return;
                                    }
                                    props.sendIsRegisteringStateToParent(true);
                                    dbLogin.postRegisterPeople(name.toUpperCase(),email.toLowerCase(),phone,password1,DOBformatted,dtactive).then(response =>{
                                        if(response === actionsTypesAPI.STATUS_USER_ALREADY_EXIST){
                                            Toast.showToast("User Already Exists");
                                            setisRegistering(false);
                                            props.sendIsRegisteringStateToParent(false);
                                            return;
                                        }
                                        Toast.showToast("Sucessfully Registered");
                                        setisRegistering(false);
                                        props.navigation.goBack();
                                        /*const userDt = {email: email.toLowerCase(), password: password1, googleAcessToken: ""}
                                        handleLogin(userDt);*/
                                    }).catch(erro =>{
                                        setisRegistering(false);
                                        props.sendIsRegisteringStateToParent(false);
                                        return;
                                    });
                                }else if(!name.trim()){ 
                                    setInvalidName(true);
                                    setisRegistering(false);
                                    Toast.showToast("Invalid Input","Empty Name","You must fill the Name field. All fields must be filled without exception.");
                                    return;
                                }else if(!phone.trim() || (phone.length !== 11)){
                                    setInvalidPhone(true);
                                    setisRegistering(false);
                                    Toast.showToast("Invalid Input","Empty Phone or Incorrect Number","You must fill the Phone field. All fields must be filled without exception.");
                                    return;
                                }else if(!password1.trim()){
                                    setInvalidPassword(true);
                                    setisRegistering(false);
                                    Toast.showToast("Invalid Input","Empty Password","You must fill the Password field. All fields must be filled without exception.");
                                    return;
                                }else if(!passwordConfirmation.trim()){
                                    setInValidPasswordConfirmation(true);
                                    setisRegistering(false);
                                    Toast.showToast("Invalid Input","Empty Password Confirmation","You must fill the Password Confirmation field. All fields must be filled without exception.");
                                    return;
                                }
                                
                            }}
                            isLoading={isRegistering}
                            {...styless.BUTTON}
                        >
                            Register
                        </Button>
                        <StatusBar style={"light"} />
                    </Stack>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

const styless = {
        ICON:{
            color:"rgb(0,185,243)",
            size:6,
            ml:"2"
        },
        INPUT:{
            w:"90%",
            autoCapitalize:"none",
            selectionColor:"black",
            color:"black",
            borderRadius:10,
            borderColor:"rgb(0,185,243)",
            borderWidth:1,
            height:50,
            fontSize:"md",
            placeholderTextColor:"rgb(0,185,243)",
            autoCompleteType:'off'
        },
        DATEOFBIRTH:{
            w:"90%",
            isReadOnly:true,
            autoCapitalize:"none",
            selectionColor:"black",
            color:"black",
            borderRadius:10,
            borderColor:"rgb(0,185,243)",
            height:50,
            fontSize:"md",
            placeholderTextColor:"rgb(0,185,243)",
            placeholder:"Date of Birth"
        },
        BUTTON:{
            bgColor:"rgb(0,98,130)",
            marginTop:0,
            alignSelf:"center",
            borderRadius:10,
            borderColor:"white",
            w: "70%",
            height:50,
            isLoadingText:"Submitting",
            variant:"outline",
            _loading:{
                bg: "rgba(0,185,243,0.5)",
                _text: { color: "rgb(0,185,243)", fontWeight: "bold", fontSize: "16" },
                borderWidth: 1,
            },
            _text:{
                fontWeight: "bold",
                fontSize: "16",
                color: "white"
            },
            _pressed:{
                gColor: "rgba(0,185,243,0.5)",
            }
        }
  }