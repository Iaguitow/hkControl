import React, { useState } from "react";
import { StatusBar, StyleSheet } from 'react-native';
import { NavigationContainer, DrawerActions, useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons, MaterialIcons, AntDesign, FontAwesome5, FontAwesome, EvilIcons } from "@expo/vector-icons";
import { createDrawerNavigator, DrawerContentScrollView, useDrawerStatus } from "@react-navigation/drawer";
import { useSelector } from "react-redux";
import { LinearGradient } from 'expo-linear-gradient';
import { allDrawerScreens } from "../utils/ConstDrawerScreens";
import ScreenProfile from "../screens/ScreenProfile";
import ScreenRequests from "../screens/ScreenRequests";
import {
  Box,
  Pressable,
  VStack,
  Text,
  Center,
  HStack,
  Divider,
  Icon,
  Image
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
      return "profile";
    case allDrawerScreens.REQUESTS:
      return "tasks";
    case allDrawerScreens.TASKS:
      return "tasks";
    case allDrawerScreens.SKILLS:
      return "head-check-outline";
    case allDrawerScreens.PROJECTS:
      return "laptop-code";
    case allDrawerScreens.CONFIGURATION:
      return "gear";
    case allDrawerScreens.LOGOUT:
      return "logout"
    case allDrawerScreens.COMPETITORS:
      return "account-search-outline"
    default:
      return undefined;
  }
};

/*****************************  NAVIGATION POINTING ****************************/
function MyDrawer({ navigation }) {
  
  const navigations = useNavigation();
  const [imageDrawerProfile,setImageDrawerProfile] = useState(null);

  return (
    <Box flex={1} bg={"white"}>
      <Drawer.Navigator
        screenOptions={{
          headerTransparent: false,
          headerBackground: () =>{
            return(
              <LinearGradient {...nativeBaseProps.HeaderBackgroundColor}/>
            );
          },
          headerTitle: (title) => {
            if (title.children !== allDrawerScreens.COMPETITORS) {
              return (
                // NECESSARY PUT DYNAMIC, CREATE A FUNCTION WITH SWITCH CASE TAKING THE CURRENTLY HOUR AND RETURNING THE GREEDING.
                <Text color={"white"}>
                  Good Morning Iago
                </Text>
              );
            }else if(title.children === allDrawerScreens.COMPETITORS){
              return (
                //WHEN SHOW COMPETITOR IT IS NECESSARY SHOW ALSO THE SERCH BAR, CHANGE THE ICON BY SEARCH BAR 
                <Icon
                  onPress={() => {
                    navigations.dispatch(DrawerActions.openDrawer());
                  }}
                  color={"rgb(255,255,255)"}
                  as={<MaterialIcons name="menu" />}
                  size={9}
                  mb={2}
                />
              );
            }
          },
          headerRight: () => {
            return (
              <Icon {...nativeBaseProps.HeaderIconsProps} as={<MaterialIcons name="notifications-active" />}/>
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
        drawerContent={(props) => <CustomDrawerContent {...props} imageDrawerProfile={ imageDrawerProfile } />}
      >
        <Drawer.Screen name={allDrawerScreens.PROFILE} children={() => { return <ScreenProfile navigation={ navigation } setImageDrawerProfile={ setImageDrawerProfile }/>}} />
        <Drawer.Screen name={allDrawerScreens.REQUESTS} component={ScreenRequests} />
        <Drawer.Screen name={allDrawerScreens.TASKS} component={Component} />
        {/*
        <Drawer.Screen name={allDrawerScreens.SKILLS} component={Component} />
        <Drawer.Screen name={allDrawerScreens.PROJECTS} component={Component} />
        */}
        <Drawer.Screen name={allDrawerScreens.CONFIGURATION} component={Component} />
        <Drawer.Screen name={allDrawerScreens.COMPETITORS} component={Component} />
        <Drawer.Screen name={allDrawerScreens.LOGOUT} component={Component} />

      </Drawer.Navigator>
    </Box>
  );
}

function CustomDrawerContent(props) {

  const user = useSelector(state => state.reducerLogin);
  const isOpen = useDrawerStatus() === "open";

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
                                return (<AntDesign size={30}  color={index === props.state.index ? nativeBaseProps.OptionsColor.selected : nativeBaseProps.OptionsColor.unselected} name={getIcon(name)} />)
                              } else if (name === (allDrawerScreens.REQUESTS || allDrawerScreens.LOGOUT)) {
                                return (<FontAwesome size={30} color={index === props.state.index ? nativeBaseProps.OptionsColor.selected : nativeBaseProps.OptionsColor.unselected} name={getIcon(name)} />)
                              } else if (name === allDrawerScreens.TASKS) {
                                return (<FontAwesome5 size={30} color={index === props.state.index ? nativeBaseProps.OptionsColor.selected : nativeBaseProps.OptionsColor.unselected} name={getIcon(name)} />)
                              } else if (name === allDrawerScreens.PROJECTS) {
                                return (<FontAwesome5 size={25} color={index === props.state.index ? nativeBaseProps.OptionsColor.selected : nativeBaseProps.OptionsColor.unselected} name={getIcon(name)} />)
                              } else if (name === allDrawerScreens.CONFIGURATION) {
                                return (<EvilIcons size={35} color={index === props.state.index ? nativeBaseProps.OptionsColor.selected : nativeBaseProps.OptionsColor.unselected} name={getIcon(name)} />)
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

export default function CompoDrawer({ navigation, nativeBaseProps}) {

  return (
    <NavigationContainer independent={true}>
      <MyDrawer navigation={ navigation } nativeBaseProps = { nativeBaseProps } />
    </NavigationContainer>
  );
}

const nativeBaseProps = {
  HeaderIconsProps:{
    color:"rgb(255,255,255)",
    size:9,
    m:2,
  },
  DrawerBackgroundColor:{
    colors:['#00b9f3', '#061b21', '#061b21'],
    start:[1, 0], 
    end:[0, 3],
    locations:[0.7, 0.1, 0.2],
    style:{ flex: 1 },
  },
  HeaderBackgroundColor:{
    colors:['#061b21', '#00b9f3', '#00b9f3'],
    start:[1, 0], 
    end:[0, 3],
    locations:[0.7, 0.1, 0.2],
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