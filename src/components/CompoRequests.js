import React, {useEffect, useState} from "react"
import { LinearGradient } from 'expo-linear-gradient';
import {
  Box,
  FlatList,
  HStack,
  Switch,
  Text,
  Divider,
} from "native-base";

const CompoRequests = () => {

    const data = [{
        id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
        WHOREQUESTED: "Aafreen Khan",
    }, {
        id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
        WHOREQUESTED: "Sujitha Mathur",
    }, {
        id: "58694a0f-3da1-471f-bd96-145571e29d72",
        WHOREQUESTED: "Anci Barroco",
    }, {
        id: "68694a0f-3da1-431f-bd56-142371e29d72",
        WHOREQUESTED: "Aniket Kumar",
    }, {
        id: "28694a0f-3da1-471f-bd96-142456e29d72",
        WHOREQUESTED: "Kiara",
    }];

  return (
    <Box flex={1} minWidth={"100%"}>
    <LinearGradient {...NativeBaseProps.LINEAR_BACK_GROUND_COLOR}>
      <HStack
        {...NativeBaseProps.HSTACK_HEADER}
      >
        <Text {...NativeBaseProps.TEXT_BY}> 
          BY. {/*WHO REQUESTED*/}
        </Text>
        <Divider {...NativeBaseProps.DIVIDER}/>
        <Text  fontSize={13} {...NativeBaseProps.TEXT_TIME} >
          TIME {/*DT REQUEST*/}
        </Text>
        <Divider {...NativeBaseProps.DIVIDER} />
        <Text {...NativeBaseProps.TEXT_DESCRIPTION}>
          DESCRIPTION {/*DESCRIPTION*/}
        </Text>
        <Divider {...NativeBaseProps.DIVIDER} />
        <Text {...NativeBaseProps.TEXT_ROOM_NO}>
          No.
        </Text>
        <Divider {...NativeBaseProps.DIVIDER} />
        <Text {...NativeBaseProps.TEXT_TIME_DONE}>
          T.D. {/*DT DONE*/}
        </Text>
        <Divider {...NativeBaseProps.DIVIDER} />
        <Text {...NativeBaseProps.TEXT_DONE}>
          DONE {/*DT DONE*/}
        </Text>
      </HStack>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <HStack 
           borderBottomColor={Math.random()*100<50?"red.500":"#8bff94"}
           {...NativeBaseProps.HSTACK_FLATLIST_ITEM}
          >
            
            <Text fontSize={12} {...NativeBaseProps.TEXT_BY}>
              SERG. {/*WHO REQUESTED*/}
            </Text>
            <Divider {...NativeBaseProps.DIVIDER} />
            <Text fontSize={11} {...NativeBaseProps.TEXT_TIME}>
              15:40 {/*DT REQUEST*/}
            </Text>
            <Divider {...NativeBaseProps.DIVIDER} />
            <Text {...NativeBaseProps.TEXT_DESCRIPTION}>
              2 - SHAVERS asdas asdas duefhue pwerjhwe weuhr uii klit kit kit ki ki {/*DESCRIPTION*/}
            </Text>
            <Divider {...NativeBaseProps.DIVIDER} />
            <Text fontSize={12} {...NativeBaseProps.TEXT_ROOM_NO}>
              255
            </Text>
            <Divider {...NativeBaseProps.DIVIDER} />
            <Text fontSize={11} {...NativeBaseProps.TEXT_TIME_DONE}>
              15:50 {/*DT DONE*/}
            </Text>
            <Divider {...NativeBaseProps.DIVIDER} />
              <Switch defaultIsChecked {...NativeBaseProps.SWITCH} />
          </HStack>
        )}
      />
    </LinearGradient>
    </Box>
  )
}

const NativeBaseProps = {
  DIVIDER:{
    bg:"gray.400",
    thickness:"2",
    orientation:"vertical"
  },
  SWITCH:{
    onTrackColor:"#8bff94", 
    offTrackColor:"red.600", 
    maxW:"12%", 
    minW:"12%"
  },
  TEXT_DONE:{
    maxW:"12%", 
    minW:"12%",
    textAlign:"center", 
    fontWeight:"bold", 
    color:"white"
  },
  TEXT_TIME_DONE:{
    maxW:"8%", 
    minW:"8%",
    textAlign:"center", 
    fontWeight:"bold", 
    color:"white"
  },
  TEXT_ROOM_NO:{
    maxW:"6%", 
    minW:"6%", 
    textAlign:"center", 
    fontWeight:"bold", 
    color:"white"
  },
  TEXT_DESCRIPTION:{
    maxW:"44%", 
    minW:"44%", 
    noOfLines:5, 
    textAlign:"center", 
    fontWeight:"bold", 
    color:"white"
  },
  TEXT_TIME:{
    maxW:"8%",
    minW:"8%", 
    textAlign:"center", 
    fontWeight:"bold", 
    color:"white",
  },
  TEXT_BY:{
    maxW:"9%",
    minW:"9%",
    textAlign:"center",
    fontWeight:"bold",
    color:"white"
  },
  LINEAR_BACK_GROUND_COLOR:{
    colors:['#00b9f3', '#061b21', '#061b21'],
    start:[1, 0], 
    end:[0, 3],
    locations:[0.7, 0.1, 0.2],
    style:{ flex: 1 },
  },
  HSTACK_FLATLIST_ITEM:{
    space:1,
    flexWrap:"wrap",
    alignItems:"center",
    alignSelf:"center", 
    minH:60,   
    borderBottomWidth:4, 
    borderRadius:5,
    bgColor:"rgba(255,255,255,0.4)",
    mb:1
  },
  HSTACK_HEADER:{
    space:1,
    flexWrap:"wrap",
    alignItems:"center",
    alignSelf:"center", 
    minH:60,
    borderBottomWidth:4,
    borderBottomColor:"#00b9f3",
    borderRadius:5,
    my:1,
    bgColor:"rgba(0,185,243,0.5)"
  }
}

export default CompoRequests;