import React, { useState, useEffect } from 'react';
import { MaterialIcons, Entypo, AntDesign } from "@expo/vector-icons";
import ImagePicker from "../utils/ImagePicker";
import gdriverService from "../classes/ClassGDrive";
import { tagActions } from "../Actions/ActionTags";
import { ProfileActions } from "../Actions/ActionProfile"
import { useSelector, useDispatch } from "react-redux";
import { allFilesTypeNames } from "../utils/ConstFilesTypeNames";
import CompoLoadingView from "../components/CompoApiLoadingView";
import {
    Stack,
    Text,
    HStack,
    Image,
    Box,
    AspectRatio,
    Heading,
    Icon,
    Badge,
    VStack,
    View,
    ScrollView,
    Button,
    Divider
} from "native-base";

const ScreenProfile = ({ navigation, setIsMounted, setImageDrawerProfile }) => {

    const user = useSelector(state => state.reducerLogin);
    const tags = useSelector(state => state.reducerTags);
    const profile = useSelector(state => state.reducerProfile);

    const dispatch = useDispatch();
    const getProfile = (idpeople, token_api) => {dispatch(ProfileActions.getProfile(idpeople, token_api)) }
    const getTags = (idpeople, token_api) => {dispatch(tagActions.getTags(idpeople, token_api,{ setIsMounted })) }

    const [imgProfile, setImgProfile] = useState(null);
    const [imgBackProfile, setImgBackProfile] = useState(null);

    useEffect(() => {
        setIsMounted(false);
        
        const imgprofID = user.payload.fileidimgprofile;
        const imgbackprofID = user.payload.fileidimgbackprofile;
        const imgIDArray = [imgprofID,imgbackprofID];
        const token_api = user.payload.tokenapi;
        const idpeople = user.payload.idpeople;

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
            //setIsMounted(true);
            getProfile(idpeople,token_api);
            getTags(idpeople,token_api);
            
        });
    },[]);

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
                                    maxH={165}
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
                                        if(imgCaptured.cancelled){
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
                                <Icon {...nativeBaseProps.ICON_COLOR} as={<Entypo name={"plus"}/>} />
                            </Badge>
                            <Badge {...nativeBaseProps.BG_ICON_BADGE}
                                onTouchStart={() =>{
                                    setIsMounted(false);
                                    ImagePicker.imagePicker(true).then(imgCaptured =>{
                                        if(imgCaptured.cancelled){
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
                                <Icon {...nativeBaseProps.ICON_COLOR} as={<MaterialIcons name={"add-a-photo"}/>} />
                            </Badge>
                        </Box>
                        <Badge 
                            {...nativeBaseProps.EDIT_PROFILE_BADGE_ICON}
                            onTouchStart={() =>{
                                navigation.navigate("CompoProfile");
                            }}    
                        >
                            <Icon {...nativeBaseProps.ICON_COLOR} as={<AntDesign name={"edit"}/>} />        
                        </Badge>
                        <Stack {...nativeBaseProps.STACK_INFO}>
                            <Stack>
                                <Heading {...nativeBaseProps.NAME}>
                                    {profile.payload.name}
                                </Heading>
                                <Text {...nativeBaseProps.SCHOOL_INFO}>
                                    {profile.payload.schoolTitle}
                                </Text>
                            </Stack>
                            <Stack space={1}>
                                <Text {...nativeBaseProps.ADDRESS_CONTACT}>
                                        {profile.payload.lives}
                                </Text>
                                <Text {...nativeBaseProps.ADDRESS_CONTACT}>
                                        {profile.payload.email}
                                </Text>
                                <Text {...nativeBaseProps.ADDRESS_CONTACT}>
                                        {profile.payload.phonenumber}
                                </Text>
                            </Stack>
                            <Divider {...nativeBaseProps.DIVIDERS} />
                            <VStack>
                                <Text {...nativeBaseProps.TITLE_TEXT}>
                                        PROFESSION:
                                </Text>
                                <Text {...nativeBaseProps.INFO_TEXT}>
                                        {profile.payload.profession}
                                </Text>
                            </VStack>
                            <VStack>
                                <Text {...nativeBaseProps.TITLE_TEXT}>
                                        ABOUT YOU:
                                </Text>
                                <Text {...nativeBaseProps.INFO_TEXT}>
                                        {profile.payload.aboutyou}
                                </Text>
                            </VStack>
                            <VStack>
                                <Text {...nativeBaseProps.TITLE_TEXT}>
                                        MY GOAL:
                                </Text>
                                <Text {...nativeBaseProps.INFO_TEXT}>
                                        {profile.payload.goal}
                                </Text>
                            </VStack>
                            <HStack>
                                <HStack>
                                    <Text {...nativeBaseProps.EDIT_DATE_TEXT}>
                                        LAST EDIT: 15/10/1991
                                    </Text>
                                </HStack>
                            </HStack>
                        </Stack>
                    </Box>
                </Box>
                    <Box {...nativeBaseProps.FIRST_BOX}>
                        <Badge {...nativeBaseProps.EDIT_PROFILE_BADGE_ICON}>
                            <Icon {...nativeBaseProps.ICON_COLOR} as={<AntDesign name={"edit"}/>} />        
                        </Badge>
                        <Heading {...nativeBaseProps.INTERESETED}>
                                    INTERESTING TAGS:
                         </Heading>
                         <Divider {...nativeBaseProps.DIVIDERS} />
                        <View {...nativeBaseProps.TAGS_VIEW}>
                            {tags.payload.tags && tags.payload.tags.map((item,index) => {
                                return(
                                    <Button
                                        rightIcon={<Icon size={5} as={<AntDesign name={"check"}/>} />}
                                        {...nativeBaseProps.TAGS}
                                        key={item.tags_idtags}>
                                        {item.tagname}
                                    </Button>
                                )
                            })}
                        </View>
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
    TAGS_VIEW:{
        flexDirection:"row",
        flexGrow:10,
        maxW:"100%",
        alignItems:"flex-start",
        flexWrap:"wrap",
        mb:4,
        mt:2
    }, 
    TAGS:{
        borderColor:"coolGray.600",
        _text:{fontWeight:"bold"}, 
        borderWidth:"2",
        backgroundColor:"rgb(0,185,243)",
        color:"white",
        borderRadius:"20",
        p:1,
        marginTop:2 ,
        flexDirection:"column", 
        marginLeft:1 
        
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
        borderColor:"coolGray.300",
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
    INTERESETED:{
        size:"lg", 
        marginTop:-6, marginBottom:2, marginLeft:2,
        alignSelf:"flex-start"
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