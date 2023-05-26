import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { MaterialIcons } from "@expo/vector-icons";
import { Animated, Platform } from 'react-native';
import { useSelector, useDispatch } from "react-redux";
import { useRoute, useFocusEffect } from "@react-navigation/native";
import { jobCategoriesActions } from "../Actions/ActionJobCategory";
import SelectJobCategory from "./ComporSingleSelectJobCategory";
import CompoLoadingView from "./CompoApiLoadingView";
import Toast from "./CompoToast";
import GeneralUtils from "../utils/GeneralUtils";
import { ProfileActions } from "../Actions/ActionProfile";
import { actionsTypesAPI } from "../Actions/ConstActionsApi";
import {
  Stack,
  Text,
  HStack,
  Input,
  Box,
  Icon,
  ScrollView,
  View,
  Center,
  Switch,
  Image,
  Button
} from "native-base";

const CompoProfileContext = ({ navigation }) => {

  const dispatch = useDispatch();
  const getJobCategories = (token_api) => { dispatch(jobCategoriesActions.getJobCategories(token_api, { setIsMounted })) }
  const updateProfile = (token_api, breaktime, idpeople, profileObjec) => {dispatch(ProfileActions.updateProfile(token_api, breaktime, idpeople, profileObjec, { setIsMounted })) }

  const user = useSelector(state => state.reducerLogin);
  const jobCategories = useSelector(state => state.reducerJobCategory);
  const profile = useSelector(state => state.reducerProfile);

  // FULL NAME //
  const [invalidName, setInvalidName] = useState(false);
  const [name, setName] = useState("");

  // EMAIL //
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [email, setEmail] = useState("");

  // PHONE //
  const [InvalidPhone, setInvalidPhone] = useState(false);
  const [phone, Setphone] = useState("");

  // ANIMATIONS //
  const [nameAnimation,] = useState(new Animated.Value(1));
  const [emailAnimation,] = useState(new Animated.Value(1));
  const [phoneAnimation,] = useState(new Animated.Value(1));

  // BORDER WIDTH //
  const [borderNameWidth, setBorderNameWidth] = useState(1);
  const [borderEmailWidth, setBorderEmailWidth] = useState(1);
  const [borderPhoneWidth, setBorderPhoneWidth] = useState(1);

  const [isMounted, setIsMounted] = useState(false);
  const [userActiveStatus, setUserActiveStatus] = useState(true);
  const [imgProfile, setImgProfile] = useState(null);
  const [profileInfo, setProfileInfo] = useState({active:"N", dtactive:null, dtdeactive:null, phone:null, name:null, email:null});
  const [isRegistering, setIsRegistering] = useState(false);
  const [idpeople, setIdpeople] = useState(user.payload.idpeople);
  const userJobLevel = user.payload.joblevel;
  const [jobSelected, setJobSelected] = useState(userJobLevel);
  
  const route = useRoute();

  useFocusEffect(
    React.useCallback(() => {
      setIsMounted(false);
      if (route.params) {
        if(route.params.from === "listpeople"){
          setJobSelected(route.params.profile.payload.joblevel);
          setIdpeople(route.params.profile.payload.idpeople);
        }
        setImgProfile(route.params.imgProfile);
        setProfileInfo(route.params.profile.payload);
        setName(route.params.profile.payload.name);
        setEmail(route.params.profile.payload.email);
        Setphone(route.params.profile.payload.phonenumber);
        setUserActiveStatus(route.params.profile.payload.active == "S"?true:false); 
      }
      const token_api = user.payload.tokenapi;
      getJobCategories(token_api, setIsMounted);
    }, [])
  );

  return (
    <View flex={1}>
      <LinearGradient {...nativeBaseProps.LinearColor}>
        <Box safeArea={true}>
          <HStack>
            <Icon
              paddingLeft={3}
              {...nativeBaseProps.ICON_GOBACK}
              as={<MaterialIcons name="arrow-back-ios" />}
              onPress={() => {
                if(route.params.from === "listpeople"){
                  route.params.onRefresh();
                }
                  navigation.goBack(); 
                }
              }
            />
            <Box {...nativeBaseProps.BOX_TITLE}>
              <Text {...nativeBaseProps.TEXT_TITLE}> PROFILE EDITION </Text>
            </Box>
          </HStack>
        </Box>
      </LinearGradient>

      <Box {...nativeBaseProps.BOX_BODY}>
        <ScrollView {...nativeBaseProps.SCROLLVIEW_BODY}>

          <Image
            {...nativeBaseProps.IMG_PROFILE}
            source={imgProfile === null ? require('../../assets/defaultProfile2.png') : { uri: imgProfile }}
            key={imgProfile}
          />
          <Stack {...nativeBaseProps.STACK_BODY}>
            {!!jobCategories.payload.jobcategories && <SelectJobCategory
              categories={jobCategories.payload.jobcategories}
              EDIT_USER_JOB={user.payload.screenFunctionAccess.EDIT_USER_JOB}
              setJobSelected={setJobSelected}
              jobSelected={jobSelected}
            />}

            {/*/////////////////////////////////// INPUT FULL NAME /////////////////////////////////*/}
            <Animated.View style={{ transform: [{ scale: nameAnimation }] }}>
              <Input
                isDisabled={true}
                onChangeText={(text) => {
                  setName(text);
                }}
                value={name}
                onFocus={() => {
                  setBorderNameWidth(2);
                  Animated.timing(nameAnimation, {
                    toValue: 1.1,
                    duration: 300,
                    useNativeDriver: true
                  }).start();
                }}
                onEndEditing={() => {
                  setBorderNameWidth(1);
                  Animated.timing(nameAnimation, {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: true
                  }).start();
                }}
                InputLeftElement={
                  <Icon
                    as={<MaterialIcons name='person' />}
                    {...nativeBaseProps.ICON_INPUT}
                  />
                }
                isInvalid={invalidName}
                {...nativeBaseProps.INPUT}
                borderWidth={borderNameWidth}
                maxLength={50}
                placeholder="Full Name"
              />
            </Animated.View>

            {/*/////////////////////////////////// INPUT EMAIL /////////////////////////////////*/}
            <Animated.View style={{ transform: [{ scale: emailAnimation }] }}>
              <Input
                onChangeText={(text) => {
                  setEmail(text);
                }}
                value={email}
                onFocus={() => {
                  setBorderEmailWidth(2);
                  Animated.timing(emailAnimation, {
                    toValue: 1.1,
                    duration: 300,
                    useNativeDriver: true
                  }).start();
                }}
                onEndEditing={() => {
                  setBorderEmailWidth(1)
                  Animated.timing(emailAnimation, {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: true
                  }).start();
                }}
                InputLeftElement={
                  <Icon
                    as={<MaterialIcons name="mail" />}
                    {...nativeBaseProps.ICON_INPUT}
                  />
                }
                isInvalid={invalidEmail}
                {...nativeBaseProps.INPUT}
                borderWidth={borderEmailWidth}
                placeholder="Email"
                maxLength={50}
              />
            </Animated.View>

            {/*/////////////////////////////////// PHONE INPUT /////////////////////////////////*/}
            <Animated.View style={{ transform: [{ scale: phoneAnimation }] }}>
              <Input
                onChangeText={(text) => {
                  Setphone(text);
                }}
                value={phone}
                onFocus={() => {
                  setBorderPhoneWidth(2);
                  Animated.timing(phoneAnimation, {
                    toValue: 1.1,
                    duration: 300,
                    useNativeDriver: true
                  }).start();
                }}
                onEndEditing={() => {
                  setBorderPhoneWidth(1);
                  Animated.timing(phoneAnimation, {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: true
                  }).start();
                }}
                InputLeftElement={
                  <Icon
                    as={<MaterialIcons name="phone" />}
                    {...nativeBaseProps.ICON_INPUT}
                  />
                }
                isInvalid={InvalidPhone}
                {...nativeBaseProps.INPUT}
                borderWidth={borderPhoneWidth}
                keyboardType='numeric'
                placeholder="Phone"
                maxLength={11}
              />
            </Animated.View>
          </Stack>

          <Center
            mt={5}
            mb={5}
          >
            <Text
              fontSize={18}
              fontWeight={"bold"}
              color={"rgb(0,185,243)"}
            >
              USER STATUS:
            </Text>
            <Box
              w={"90%"}
              borderRadius={10}
              borderColor={"gray.400"}
              p={2}
              borderWidth={3}
            >
              <Text
                mb={2}
              >
                Active/Deactive
              </Text>
              <Stack
                space={4}
              >
                <Switch
                  trackColor={userActiveStatus?"green.700":"red.600"}
                  disabled={user.payload.screenFunctionAccess.EDIT_ACTIVE_USER==="N"?true:false}
                  onToggle={(valueStatus) => {
                    setUserActiveStatus(valueStatus);
                  }}
                  value={userActiveStatus}
                  size={"md"}
                >
                </Switch>

                <Text>
                  Activation Date: {profileInfo.dtactive}
                </Text>
                <Text>
                  Deactivation Date: {profileInfo.dtdeactive}
                </Text>
                
              </Stack>
            </Box>
            <Button
                {...nativeBaseProps.SAVE_BUTTON}
                isLoading={isRegistering}
                onPress={()=>{
                  setIsRegistering(true);
                  setIsMounted(false);

                  if(!!email.trim() && !!phone.trim() && (phone.length === 11)){

                    if(!(GeneralUtils.validateEmail(email))) {
                      setInvalidEmail(true);
                      Toast.showToast("Invalid Input","Email Invalid!","Wrong Email, please check it. Probably you forgot to type a character or something.");
                      setIsRegistering(false);
                      setIsMounted(true);
                      return;
                    }

                    if(!!jobCategories.payload.jobcategories){
                      const token_api = user.payload.tokenapi; 
                      const jobcategory = jobCategories.payload.jobcategories.find(job => job.categorylevel == jobSelected); 
                      const profileObjec = {
                        username: name,
                        useremail: email,
                        userphone: phone,
                        userIDjobcategory: jobcategory.idjobcategory,
                        useractive: userActiveStatus?"S":"N"
                      }
                      
                      updateProfile(token_api, null, idpeople, profileObjec);
                      setIsRegistering(false);
                      if(profile.api_status === actionsTypesAPI.STATUS_OK){
                        Toast.showToast("Sucessfully Registered");
                      }
                  }
                    
                  }else if(!email.trim()){ 
                    setInvalidEmail(true);
                    setIsRegistering(false);
                    setIsMounted(true);
                    Toast.showToast("Invalid Input","Empty Name","You must fill the Name field. All fields must be filled without exception.");
                    return;

                  }else if(!phone.trim() || (phone.length !== 11)){
                    setInvalidPhone(true);
                    setIsRegistering(false);
                    setIsMounted(true);
                    Toast.showToast("Invalid Input","Empty Phone or Incorrect Number","You must fill the Phone field. All fields must be filled without exception.");
                    return;

                  }
                }}
              >
                  SAVE INFORMATION
            </Button>
          </Center>
          {!isMounted && <CompoLoadingView/>}
        </ScrollView>
      </Box>
    </View>

  );
}

export default function CompoProfile({ navigation }) {
  return (
    <View flex={1}>
      <CompoProfileContext navigation={navigation} />
    </View>
  );
}

const nativeBaseProps = {
  ICON_INPUT: {
    color: "rgb(0,185,243)",
    size: 6,
    ml: "2"
  },
  INPUT: {
    w: "90%",
    autoCapitalize: "none",
    selectionColor: "black",
    color: "black",
    borderRadius: 10,
    borderColor: "rgb(0,185,243)",
    height: 50,
    fontSize: "md",
    placeholderTextColor: "rgb(0,185,243)",
    autoCompleteType: 'off',
    alignSelf: "center"
  },
  LinearColor: {
    colors: ['#061b21', '#00b9f3', '#00b9f3'],
    start: [0.5, 1],
    end: [0.5, 0],
    locations: [0, 0.9, 0.9],
    height: Platform.OS === 'ios' ? 100 : 60 
  },
  TEXT_TITLE: {
    color: "white",
    bold: true,
    fontSize: 16,
    mr:"10"
  },
  BOX_TITLE: {
    justifyContent: "center",
    w: "100%",
    alignItems:"center"
  },
  STACK_BODY: {
    space: 6,
    w: "100%",
    alignItems: "center",
    flex: 1,
    marginTop: 4
  },
  SCROLLVIEW_BODY: {
    w: "100%",
    flex: 1,
    marginTop: 4
  },
  BOX_BODY: {
    alignItems: "center",
    backgroundColor: "white",
    overflow: "hidden",
    flex: 1,
  },
  ICON_GOBACK: {
    size: 7,
    ml: 2,
    mt: 2,
    mb: 2,
    color: "rgb(255,255,255)"
  },
  IMG_PROFILE: {
    borderColor: "rgb(0,185,243)",
    borderWidth: 3,
    alignSelf: "center",
    size: 200,
    alt: "LOGO",
    borderRadius: 100
  },
  SAVE_BUTTON:{
    bgColor:"rgb(0,98,130)",
    marginTop:5,
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