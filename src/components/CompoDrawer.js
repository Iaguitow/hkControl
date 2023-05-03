import React, { useState, useEffect, useRef, useMemo, memo, useCallback } from "react";
import { StatusBar, StyleSheet, Alert } from 'react-native';
import { NavigationContainer, DrawerActions, useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons, MaterialIcons, FontAwesome5, FontAwesome, EvilIcons, Ionicons } from "@expo/vector-icons";
import { createDrawerNavigator, DrawerContentScrollView, useDrawerStatus } from "@react-navigation/drawer";
import generalUtils from '../utils/GeneralUtils';
import { LinearGradient } from 'expo-linear-gradient';
import { useSelector, useDispatch } from "react-redux";
import { allDrawerScreens } from "../utils/ConstDrawerScreens";
import ScreenProfile from "../screens/ScreenProfile";
import ScreenRequests from "../screens/ScreenRequests";
import ScreenTasks from "../screens/ScreenTasks";
import ScreenCheckList from "../screens/ScreenCheckList";
import ScreenListPeople from "../screens/ScreenListPeople";
import ScreenConfig from "../screens/ScreenConfig";
import ScreenAnalyticalCharts from "../screens/ScreenAnalyticalCharts";
import FabButoon from "../components/CompoFabButon";
import CompoNotificationList from "../components/CompoNotificationsList";
import { ActionRooms } from "../Actions/ActionRooms.js";
import { ActionRequestLog } from "../Actions/ActionRequestLog.js";
import { PeopleActions } from "../Actions/ActionPeople";
import * as Notifications from 'expo-notifications';

import {
  Box,
  Pressable,
  VStack,
  Text,
  Center,
  HStack,
  Divider,
  Icon,
  Image,
  Badge,
  useDisclose
} from "native-base";

const Drawer = createDrawerNavigator();

function Component(props) {
  return (
    <Center>
      <Text mt="12" fontSize="18">
        This is {props.route.name} page.
      </Text>
    </Center>
  );
}

const getIcon = (screenName) => {
  switch (screenName) {
    case allDrawerScreens.PROFILE:
      return "ios-people-outline";
    case allDrawerScreens.REQUESTS:
      return "tasks";
    case allDrawerScreens.TASKS:
      return "tasks";
    case allDrawerScreens.CHECK_LIST:
      return "check-square-o";
    case allDrawerScreens.PROJECTS:
      return "laptop-code";
    case allDrawerScreens.CONFIGURATION:
      return "gear";
    case allDrawerScreens.LOGOUT:
      return "logout"
    case allDrawerScreens.PEOPLE:
      return "account-search-outline"
    case allDrawerScreens.CHARTS:
      return "chart-bar-stacked"
    default:
      return undefined;
  }
};

/*****************************  NAVIGATION POINTING ****************************/
function MyDrawer({ navigation }) {
  
  const navigations = useNavigation();
  const user = useSelector(state => state.reducerLogin);
  
  const [imageDrawerProfile,setImageDrawerProfile] = useState(null);

  const [countRequests, setCountRequests] = useState(0);
  const setCount_Requests = useCallback((amount) =>{
    setCountRequests(amount);
  });
  
  const requestlogs = useSelector(state => state.reducerRequestLog);

  const countNotifications = useMemo(() =>{
    return counting(countRequests);
  },[countRequests])
  
  const {
    isOpen,
    onOpen,
    onClose
  } = useDisclose();

  useEffect(() =>{
    if(requestlogs.payload.logs !== null && typeof requestlogs.payload.logs !== 'undefined' && requestlogs.payload.logs.length !==0){
      setCount_Requests(requestlogs.payload.logs[0].howmanylogsnotseen);
    }
    return () =>{
      return;
    }
    
  },[!requestlogs.payload.logs]);

  return (
    <Box flex={1} bg={"white"}>
      <Drawer.Navigator
        screenOptions={{
          unmountOnBlur: true,
          headerTransparent: false,
          headerBackground: () =>{
            return(
              <LinearGradient {...nativeBaseProps.HeaderBackgroundColor}/>
            );
          },
          headerTitle: (title) => {
              return (
                <Text color={"white"} fontWeight="bold" fontSize={16}>
                  {title.children.toUpperCase()}
                </Text>
              );
          },
          headerRight: () => {
            return (
              <VStack
                onTouchStart={() => {
                  setCount_Requests(0);
                  onOpen();
                }}
              >
              {
                countNotifications>0 && <Badge
                  colorScheme="danger" 
                  rounded="full" 
                  mb={-8} mr={0} zIndex={1} 
                  variant="solid" 
                  alignSelf="flex-end" 
                  _text={{
                    fontSize: 12, 
                    fontWeight:"bold"
                  }}
                >
                  {countNotifications}
                </Badge>
              }
              <Icon {...nativeBaseProps.HeaderIconsProps} size={10} as={<MaterialIcons name="notifications-active" />}/>
              {isOpen && <CompoNotificationList isOpen={isOpen} onClose={onClose}></CompoNotificationList>}
              </VStack>
            );
          },
          headerLeft: () => {
            return (
              <Icon
                {...nativeBaseProps.HeaderIconsProps}
                onPress={() => {
                  navigations.dispatch(DrawerActions.openDrawer());
                }}
                as={<MaterialIcons name="menu" />}
              />
            );
          },
        }}
        drawerContent={(props) => <CustomDrawerContent {...props} countRequests={ countRequests } setCountRequests={ setCount_Requests } imageDrawerProfile={ imageDrawerProfile } />}
      >
        {user.payload.screenAccess.PROFILE === "Y" && <Drawer.Screen name={allDrawerScreens.PROFILE} children={() => { return <ScreenProfile navigation={ navigation } setImageDrawerProfile={ setImageDrawerProfile }/>}} />}
        {user.payload.screenAccess.REQUESTS === "Y" && <Drawer.Screen name={allDrawerScreens.REQUESTS} children={() => { return (<ScreenRequests></ScreenRequests>)}} />}
        {user.payload.screenAccess.TASKS === "Y" && <Drawer.Screen name={allDrawerScreens.TASKS} children={() => { return (<ScreenTasks></ScreenTasks>)}} />}
        {/*<Drawer.Screen name={allDrawerScreens.CHECK_LIST} children={() => { return (<ScreenCheckList></ScreenCheckList>)}} />*/}   
        {user.payload.screenAccess.PEOPLE === "Y" && <Drawer.Screen name={allDrawerScreens.PEOPLE} children={() => { return <ScreenListPeople navigation={ navigation } />}} />}
        {user.payload.screenAccess.CHARTS === "Y" && <Drawer.Screen name={allDrawerScreens.CHARTS} children={() => { return <ScreenAnalyticalCharts navigation={ navigation } />}} />}
        {user.payload.screenAccess.CONFIG === "Y" && <Drawer.Screen name={allDrawerScreens.CONFIGURATION} children={() => { return <ScreenConfig navigation={ navigation } />}} />}
        <Drawer.Screen name={allDrawerScreens.LOGOUT}
        children={() =>{ 
            Alert.alert(
              'Warning',
              'Are you sure about logout?',
              [
                {
                  text: 'Cancel',
                  onPress: () => {},
                  style: 'cancel',
                },
                {text: 'Yes', onPress: () => {
                  navigation.navigate("Login");
                }},
              ],
              {cancelable: false},
            );
        }} />

      </Drawer.Navigator>
    </Box>
  );
}

function CustomDrawerContent(props) {

  const user = useSelector(state => state.reducerLogin);
  const isOpen = useDrawerStatus() === "open";
  const notificationListener = useRef();
  const responseNotificationListener = useRef();

  useEffect(() =>{
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      props.setCountRequests(props.countRequests+1);
    });
  
    responseNotificationListener.current = Notifications.addNotificationResponseReceivedListener(notification => {
      props.navigation.navigate("Requests");
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseNotificationListener.current);
    };

  },[notificationListener.current])

  return (
    <LinearGradient {...nativeBaseProps.DrawerBackgroundColor}>
      <DrawerContentScrollView {...props}>
        <VStack space="4" my="5" mx="1">

{/*****************************  HEADER ****************************/}
          <Image {...nativeBaseProps.IMG} source={props.imageDrawerProfile === null? require('../../assets/defaultProfile2.png'): {uri: props.imageDrawerProfile}} 
            key={props.imageDrawerProfile}
          />
          <Box px="4">
            <Text {...nativeBaseProps.TextName}>
              {user.payload.name}
            </Text>
            <Text {...nativeBaseProps.TextProfession}>
              {user.payload.profession === null? "PROFESSION": user.payload.profession}
            </Text>
          </Box>
          <Divider {...nativeBaseProps.Dividers} />
          
{/*****************************  DRAWER BODY ****************************/}
          <VStack divider={<Divider {...nativeBaseProps.Dividers} />} space="0">
            <VStack space="2">
              <StatusBar barStyle={isOpen?"light-content":"light-content"} />
              {props.state.routeNames.map((name, index) => {
                return (
                  <Box key={index}>
                    {name==="Logout"?<Divider {...nativeBaseProps.Dividers} />:null}
                    <Pressable
                      px="5"
                      py={name==="Logout"?"2":"2"}
                      my={name==="Logout"?"1":"0"}
                      rounded="md"
                      bg={
                        index === props.state.index
                          ? "rgba(0,185,243,0.5)"
                          : "transparent"
                      }
                      onPress={(event) => {
                        props.navigation.navigate(name);
                      }}
                      key={index}
                    >
                      <HStack space="7" alignItems="center">
                        <Icon
                          as={() => {
                              if (name === allDrawerScreens.PROFILE) {
                                return (<Ionicons size={30}  color={index === props.state.index ? nativeBaseProps.OptionsColor.selected : nativeBaseProps.OptionsColor.unselected} name={getIcon(name)} />)
                              } else if ((name === allDrawerScreens.REQUESTS) || (name === allDrawerScreens.CHECK_LIST)) {
                                return (<FontAwesome size={30} color={index === props.state.index ? nativeBaseProps.OptionsColor.selected : nativeBaseProps.OptionsColor.unselected} name={getIcon(name)} />)
                              } else if (name === (allDrawerScreens.TASKS)) {
                                return (<FontAwesome5 size={30} color={index === props.state.index ? nativeBaseProps.OptionsColor.selected : nativeBaseProps.OptionsColor.unselected} name={getIcon(name)} />)
                              } else if (name === allDrawerScreens.PROJECTS) {
                                return (<FontAwesome5 size={25} color={index === props.state.index ? nativeBaseProps.OptionsColor.selected : nativeBaseProps.OptionsColor.unselected} name={getIcon(name)} />)
                              } else if (name === allDrawerScreens.CONFIGURATION) {
                                return (<EvilIcons style={{marginLeft:-4}} size={35} color={index === props.state.index ? nativeBaseProps.OptionsColor.selected : nativeBaseProps.OptionsColor.unselected} name={getIcon(name)} />)
                              }
                              else {
                                return (<MaterialCommunityIcons color={index === props.state.index ? nativeBaseProps.OptionsColor.selected : nativeBaseProps.OptionsColor.unselected} size={30} name={getIcon(name)} />)
                              }
                            }
                          }
                        />
                        <Text
                          style={styles.textOptionDrawer}
                          color={index === props.state.index ? nativeBaseProps.OptionsColor.selected : nativeBaseProps.OptionsColor.unselected}
                        >
                          {name}
                        </Text>
                      </HStack>
                    </Pressable>
                  </Box>
                )
              })}
            </VStack>
          </VStack>
        </VStack>
      </DrawerContentScrollView>
    </LinearGradient>
  );
}

function CompoDrawer({ navigation, nativeBaseProps}) {

  const dispatch = useDispatch();
  const getRooms = (token_api) => {dispatch(ActionRooms.getRooms(token_api)) }
  const getRequestLog = (idpeople,token_api) => {dispatch(ActionRequestLog.getRequestLogs(idpeople,token_api)) }
  const updatePeople = (idpeople, pushExpoToken, token_api) => {dispatch(PeopleActions.updatePeople(idpeople, pushExpoToken, token_api))} 
  const user = useSelector(state => state.reducerLogin);

  useEffect(() => {
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
      }),
    });
    
    const token_api = user.payload.tokenapi;
    const idpeople = user.payload.idpeople;
    
    generalUtils.registerForPushNotificationsAsync().then(pushExpoToken =>{
      updatePeople(idpeople,pushExpoToken,token_api);
    });

    getRooms(token_api);
    getRequestLog(idpeople,token_api);

    return () =>{
      return;
    }

  },[]);

  return (
    <NavigationContainer independent={true}>
      <MyDrawer navigation={ navigation } nativeBaseProps = { nativeBaseProps } />
      <FabButoon/>
    </NavigationContainer>
  );
}

function counting(number=0){
  if(number === 0){
    return 0;
  }
  return number;
}

const nativeBaseProps = {
  HeaderIconsProps:{
    color:"rgb(255,255,255)",
    size:9,
    m:2,
  },
  DrawerBackgroundColor:{
    colors:['#00b9f3', '#061b21', '#061b21'],
    start:[0.5, 0], 
    end:[0.5, 1],
    locations:[0, 0.4, 1],
    style:{ flex: 1 },
  },
  HeaderBackgroundColor:{
    colors:['#061b21', '#00b9f3', '#00b9f3'],
    start:[0.5, 1], 
    end:[0.5, 0],
    locations:[0, 0.9, 0.9],
    style:{ flex: 1 },
  },
  TextName:{
    fontWeight:"bold", 
    fontSize:18, 
    color:"gray.100"
  },
  TextProfession:{
    marginLeft:-1, 
    p:2,
    borderWidth:2, 
    borderColor:"rgba(0,185,243,0.6)",
    borderRadius:17,
    alignSelf:"flex-start", 
    fontSize:14, 
    mt:"1", 
    color:"gray.300", 
    fontWeight:"500"
  },
  OptionsColor:{
    unselected: "rgba(255, 255, 255, 0.9)",
    selected:"rgb(0,185,243)",
  },
  Dividers:{
    alignSelf:"center", 
    bgColor:"rgba(255,255,255,0.5)", 
    thickness:"1", 
    mx:"1", 
    orientation:"horizontal",
    w:"90%"
  },
  IMG: {
    marginTop: 0,
    alignSelf: "center",
    marginBottom: 0,
    size: 140,
    alt: "LOGO",
    borderRadius: 100,
    borderWidth: 3,
    borderColor: "rgb(0,185,243)"
  }
}

const styles = StyleSheet.create({
  textOptionDrawer: {
    fontSize: 15,
    fontWeight: "bold",
  }
});

export default memo(CompoDrawer);