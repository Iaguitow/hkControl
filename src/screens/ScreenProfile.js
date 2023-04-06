import React, { useState, useEffect } from 'react';
import { AppState, Alert } from 'react-native';
import { MaterialIcons, Entypo, AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import ImagePicker from "../utils/ImagePicker";
import { useFocusEffect } from '@react-navigation/native';
import gdriverService from "../classes/ClassGDrive";
import { ProfileActions } from "../Actions/ActionProfile";
import { useSelector, useDispatch } from "react-redux";
import { allFilesTypeNames } from "../utils/ConstFilesTypeNames";
import  PerformanceLineChart  from "../components/CompoLineChart"
import CompoLoadingView from "../components/CompoApiLoadingView";
import {
    Stack,
    Text,
    Button,
    Image,
    Box,
    AspectRatio,
    Heading,
    Icon,
    Badge,
    VStack,
    View,
    ScrollView,
    Divider
} from "native-base";

const ScreenProfile = ({ navigation, setIsMounted, setImageDrawerProfile }) => {

    const user = useSelector(state => state.reducerLogin);
    const profile = useSelector(state => state.reducerProfile);

    const dispatch = useDispatch();
    const getProfile = (idpeople, token_api) => {dispatch(ProfileActions.getProfile(idpeople, token_api ,{ setIsMounted })) }
    const updateProfile = (token_api, breaktime, idpeople) => {dispatch(ProfileActions.updateProfile(token_api, breaktime, idpeople, null, { setIsMounted })) }

    const [imgProfile, setImgProfile] = useState(null);
    const [imgBackProfile, setImgBackProfile] = useState(null);

    const [breakButtonText, SetBreakButtonText] = useState("START BREAK...");
    const [numberSecs, setNumberSecs] = useState(0);
    const [numberMin, setNumberMin] = useState(0);
    const [stateApp, setStateApp] = useState(AppState.currentState);

    const token_api = user.payload.tokenapi;
    const idpeople = user.payload.idpeople;
    const breaktime = profile.payload.breaktime;
    const dateTimeInBreak = profile.payload.datetimeBreakIn;
    const joblevel = user.payload.joblevel;
    const funcetionScreenAccess = user.payload.screenFunctionAccess;


    const increment = (minutesDifference = 0, secondsDifference = 0) => {

          let counterSecs = secondsDifference;
          let counterMin = minutesDifference;

          window.TimerId = setInterval(()=>{

            if(counterMin>=2){
                setIsMounted(false);
                counterSecs=0;
                counterMin=0;
                setNumberSecs(0);
                setNumberMin(0);
                clearInterval(window.TimerId);
                updateProfile(token_api,'N',idpeople, null, { setIsMounted });
                SetBreakButtonText("START BREAK...");
                alert("Your break have been finished. Please be ready to receive requests.");
            }

            minutesDifference>0?setNumberMin(minutesDifference):null

            counterSecs<60?setNumberSecs((previousTime) => previousTime+1+secondsDifference):setNumberSecs(60);

            secondsDifference = 0;
            minutesDifference = 0;
            counterSecs += 1;
            
            if(counterSecs>=60){
                counterSecs=0
                setNumberSecs(0);

                counterMin<60?setNumberMin((previousTime) => previousTime+1):setNumberMin(60);
                counterMin +=1;
            }
            setIsMounted(true);
        },1000);
    }

    const handle_initial_timer = () => {
        const dateStampRequest = new Date(profile.payload.datetimeBreakIn.toString());
        const dateNow = new Date();

        var difference = dateStampRequest<dateNow?dateNow.getTime() - dateStampRequest.getTime():dateStampRequest.getTime() - dateNow.getTime();
        var minutesDifference = Math.floor(difference/1000/60);

        difference -= minutesDifference*1000*60;
        var secondsDifference = Math.floor(difference/1000);

        SetBreakButtonText("COUNTING...");
        increment(minutesDifference, secondsDifference);
    }

    useEffect(() => {

        setIsMounted(false);
        breaktime === "Y"?SetBreakButtonText("COUNTING..."):SetBreakButtonText("START BREAK...");
        getProfile(idpeople,token_api, {setIsMounted});

        if(!!dateTimeInBreak && breaktime === "Y"){
            setIsMounted(false);
            setNumberSecs(0);
            setNumberMin(0);
            clearInterval(window.TimerId);
            handle_initial_timer();
        }

        const subscription = AppState.addEventListener('change', nextAppState => {
            if(nextAppState === "active"){
                setStateApp(nextAppState);
            } else if(nextAppState === "background"){
                setStateApp(nextAppState);
            }
        });

        return () => {
            window.clearInterval(window.TimerId);
            subscription.remove();
          }
    },[stateApp]);

    useFocusEffect(
        React.useCallback(() => {
            setIsMounted(false);
            const imgprofID = user.payload.fileidimgprofile;
            const imgbackprofID = user.payload.fileidimgbackprofile;
            const imgIDArray = [imgprofID,imgbackprofID];
    
            gdriverService.getFile(imgIDArray,token_api).then(allFilesData => {
                if(!allFilesData.data.toString().includes("File not found")){
                    for(let i = 0; i<allFilesData.data.length;i++){
                    
                        if(allFilesData.data[i].fileName.replace(/[0-9]/g, '') === allFilesTypeNames.IMGPROF){
                            setImgProfile(allFilesData.data[i].fileLink.replace("s220","s1000"));
                            setImageDrawerProfile(allFilesData.data[i].fileLink.replace("s220","s1000"));
        
                        }else if(allFilesData.data[i].fileName.replace(/[0-9]/g, '') === allFilesTypeNames.IMGBACKPROF){
                            setImgBackProfile(allFilesData.data[i].fileLink.replace("s220","s1000"));
                        }
                    }
                }
            }).catch(error => { 
                console.log(error);
                
            }).finally(endPoint =>{
                setIsMounted(true);
                /*getProfile(idpeople,token_api, {setIsMounted});*/
                
            });
        }, [])
    );

    return (
        <ScrollView>
            <Stack alignSelf="center">
                <Box {...nativeBaseProps.FIRST_BOX}>
                    <Box >
                        <Box>
                            <AspectRatio 
                                {...nativeBaseProps.ASPECT_RATIO}>
                                <Image 
                                    source={imgBackProfile === null?require('../../assets/defaultImgBackProfile.jpg'):{uri: imgBackProfile}}
                                    maxH={190}
                                    key={imgBackProfile} 
                                    alt="Background"    
                                />
                            </AspectRatio>
                            <Image 
                                {...nativeBaseProps.IMG_PROFILE} 
                                source={imgProfile === null?require('../../assets/defaultProfile2.png'):{uri:imgProfile}}
                                key={imgProfile} 
                            />
                            <Badge {...nativeBaseProps.PLUS_ICON_BADGE}
                            
                            ////////////////PROFILE IMAGE////////////////
                                onTouchStart={() =>{
                                    setIsMounted(false);

                                    ImagePicker.imagePicker().then(imgCaptured =>{
                                        if(imgCaptured.canceled){
                                            setIsMounted(true);
                                            return;
                                        }
                                        const filetypename = user.payload.idpeople+allFilesTypeNames.IMGPROF;
                                        const folderid = user.payload.folderid;
                                        const token_api = user.payload.tokenapi;

                                        gdriverService.sendFile(imgCaptured.base64,folderid,filetypename,token_api).then(result => {
                                            setImgProfile('data:image/png;base64,'+imgCaptured.base64);
                                            setImageDrawerProfile('data:image/png;base64,'+imgCaptured.base64);
                                        }).catch(error=>{
                                            console.log(error);
                                        }).finally(endPoint => {setIsMounted(true)});
                                    });
                                }}
                            >
                                <Icon size={"25px"} {...nativeBaseProps.ICON_COLOR} as={<Entypo name={"plus"}/>} />
                            </Badge>
                            <Badge {...nativeBaseProps.BG_ICON_BADGE}
                                onTouchStart={() =>{
                                    setIsMounted(false);
                                    ImagePicker.imagePicker(true).then(imgCaptured =>{
                                        if(imgCaptured.canceled){
                                            setIsMounted(true);
                                            return;
                                        }
                                        const filetypename = user.payload.idpeople+allFilesTypeNames.IMGBACKPROF;
                                        const folderid = user.payload.folderid;
                                        const token_api = user.payload.tokenapi;

                                        ////////////////BACKGROUND IMAGE////////////////
                                        gdriverService.sendFile(imgCaptured.base64,folderid,filetypename,token_api).then(result => {
                                            setImgBackProfile('data:image/png;base64,'+imgCaptured.base64);
                                        }).catch(error=>{
                                            console.log(error);
                                        }).finally(endPoint => {setIsMounted(true)});
                                    });
                                }}
                            >
                                <Icon size={"30px"} {...nativeBaseProps.ICON_COLOR} as={<MaterialIcons name={"add-a-photo"}/>} />
                            </Badge>
                        </Box>
                        <Badge 
                            {...nativeBaseProps.EDIT_PROFILE_BADGE_ICON}
                            onTouchStart={() =>{
                                navigation.navigate("CompoProfile",{imgProfile:imgProfile, profile:profile, from:"profile"});
                            }}    
                        >
                            <Icon size={"35px"} {...nativeBaseProps.ICON_COLOR} as={<AntDesign name={"edit"}/>} />        
                        </Badge>
                        <Stack {...nativeBaseProps.STACK_INFO}>
                            <Stack>
                                <Heading {...nativeBaseProps.NAME}>
                                    {profile.payload.name}
                                </Heading>
                                <Text {...nativeBaseProps.SCHOOL_INFO}>
                                    {profile.payload.profession}
                                </Text>
                            </Stack>
                            <Stack space={1}>
                                <Text {...nativeBaseProps.ADDRESS_CONTACT}>
                                        {profile.payload.email}
                                </Text>
                                <Text {...nativeBaseProps.ADDRESS_CONTACT}>
                                        {profile.payload.phonenumber}
                                </Text>
                                {funcetionScreenAccess.BREAK_TIME==="y" && <Button
                                    isDisabled={breaktime==="Y"?true:false}
                                    _text={
                                        {
                                            fontWeight:"bold",
                                            fontSize:16
                                        }
                                    }
                                    rightIcon={
                                        <Icon size={6} as={<MaterialCommunityIcons name='food'> </MaterialCommunityIcons>}/>
                                    }
                                    onPress={()=>{
                                        Alert.alert(
                                            'WARNING!!!',
                                            'BEFORE PROCEEDING MAKE SURE YOU ARE IN THE KITCHEN AND READY FOR YOUR BREAK.',
                                            [
                                            {
                                                text: 'Cancel',
                                                onPress: () => {},
                                                style: 'cancel',
                                            },
                                            {text: 'Yes', onPress: () => {
                                                setIsMounted(false);
                                                SetBreakButtonText("COUNTING...");
                                                updateProfile(token_api,'Y',idpeople,{ setIsMounted });
                                                increment();
                                            }},
                                            ],
                                            {cancelable: false},
                                        );
                                    }}
                                > 
                                    {breakButtonText.toString().includes("COUNTING...")?breakButtonText.toString()
                                    +" "+numberMin.toString().padStart(2,"0")+":"+numberSecs.toString().padStart(2,"0"):breakButtonText.toString()
                                    }
                                </Button>}
                            </Stack>
                            <Divider {...nativeBaseProps.DIVIDERS} />
                            <VStack>

                                <PerformanceLineChart setIsMounted={setIsMounted} />
                            </VStack>



                        </Stack>
                    </Box>
                </Box>
            </Stack>
        </ScrollView>
    )
};

export default function Profile({navigation, setImageDrawerProfile }) {
    const [isMounted, setIsMounted] = useState(false);
    return (
      <View>
        <ScreenProfile navigation={ navigation } setIsMounted={ setIsMounted } setImageDrawerProfile={ setImageDrawerProfile } />
        {!isMounted && <CompoLoadingView />}
      </View>
    );
  }

const nativeBaseProps = {
    DIVIDERS:{
        alignSelf:"center", 
        bgColor:"coolGray.300", 
        thickness:"3",
        orientation:"horizontal",
        w:"98%"
      },

    EDIT_DATE_TEXT:{
        color:"rgb(0,185,243)", 
        fontWeight:"700"
    },
    TITLE_TEXT:{
        fontWeight:"700"
    },
    INFO_TEXT:{
        fontWeight:"400", 
        left:2
    },
    FIRST_BOX:{
        mb:2,
        alignItems:"center", 
        backgroundColor:"white", 
        rounded:"lg", 
        overflow:"hidden", 
        borderColor:"coolGray.300", 
        borderWidth:"2",
    },
    ASPECT_RATIO:{
        w:"100%", 
        ratio:22/9,
        borderBottomWidth:3,
        borderColor:"rgb(0,185,243)",
        borderBottomRadius:5
    },
    STACK_INFO:{
        p:"4", 
        space:3
    },
    NAME:{
        size:"lg", 
        ml:"-1"
    },

    SCHOOL_INFO:{
        fontSize:"md", 
        color:"gray.600", 
        fontWeight:"500", 
        ml:"-0.5", 
        mt:"-1",
        numberOfLines:1
    },
    ADDRESS_CONTACT:{
        fontSize:"sm", 
        color:"gray.500",
        ml:"-0.5", 
        mt:"-1"
    },
    ICON_COLOR:{
        color:"rgb(0,185,243)", 
    },
    EDIT_PROFILE_BADGE_ICON:{
        alignSelf:"flex-end",
        marginTop:5, 
        right:10, 
        color:"rgb(0,185,243)",
        shadow:'6',
        zIndex:2,
        variant:"solid",
        backgroundColor:"white",
        rounded: "full",
        size:12 
    },
    BG_ICON_BADGE:{
        size:10, 
        shadow:'6',
        backgroundColor:"white",
        position:"absolute", 
        rounded:"full", 
        right:10, 
        top:10,
        zIndex:1,
        variant:"solid",
    },
    PLUS_ICON_BADGE:{
        size:8, 
        shadow:'6', 
        alignItems:"center", 
        justifyContent:"center", 
        backgroundColor:"white", 
        position:"absolute", 
        rounded:"full", 
        bottom:-45, 
        left:135, 
        zIndex:2, 
        variant:"solid"
    },
    IMG_PROFILE: {
        borderColor:"rgb(0,185,243)",
        borderWidth:3,  
        marginTop: 0,
        alignSelf: "center",
        marginBottom: 0,
        size: 150,
        alt: "LOGO",
        borderRadius: 100,
        position:"absolute",
        left:"5", 
        bottom:"-60", 
        px:"3",
        py:"1.5", 
        zIndex:1
    }
}