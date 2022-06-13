import React from "react"
import { LinearGradient } from 'expo-linear-gradient';
import { useSelector, useDispatch } from "react-redux";
import { RequestActions } from "../Actions/ActionRequests";
import {
  Box,
  FlatList,
  HStack,
  Switch,
  Text,
  Divider,
  VStack,
  Button
} from "native-base";

const CompoRequests = ({ setIsMounted }) => {

  const dispatch = useDispatch();
  const updateRequest = (idrequests, requestdone, idpeople, token_api,) => {dispatch(RequestActions.updateRquests(idrequests, requestdone, idpeople, token_api, {setIsMounted})) }
  const requests = useSelector(state => state.reducerRequests);
  const user = useSelector(state => state.reducerLogin);
  
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
        data={requests.payload.requests}
        renderItem={({ item }) => (
          <VStack {...NativeBaseProps.VSTACK_FLATLIST} >
            <HStack 
              {...NativeBaseProps.HSTACK_FLATLIST_ITEM}
              keyExtractor={(item) => item.idresquests}
            >
              <Text fontSize={12} {...NativeBaseProps.TEXT_BY}>
                {item.whoresquested}
              </Text>
              <Divider {...NativeBaseProps.DIVIDER} />
              <Text fontSize={11} {...NativeBaseProps.TEXT_TIME}>
                {item.dtrequested}
              </Text>
              <Divider {...NativeBaseProps.DIVIDER} />
              <Text {...NativeBaseProps.TEXT_DESCRIPTION}>
                {item.howmanyitem+"-"+item.requestdsc}
              </Text>
              <Divider {...NativeBaseProps.DIVIDER} />
              <Text fontSize={12} {...NativeBaseProps.TEXT_ROOM_NO}>
                {item.roomnumber}
              </Text>
              <Divider {...NativeBaseProps.DIVIDER} />
              <Text fontSize={11} {...NativeBaseProps.TEXT_TIME_DONE}>
                {item.dtrequestdone}
              </Text>
              <Divider {...NativeBaseProps.DIVIDER} />
                <Switch
                  onChange={() => {
                    setIsMounted(false);
                    const token_api = user.payload.tokenapi;
                    const idpeople = user.payload.idpeople;
                    const requestdone = item.dtrequestdone==null?!false:null
                    updateRequest(item.idresquests,requestdone,idpeople,token_api, {setIsMounted});
                  }} 
                  isChecked={item.dtrequestdone==null?false:true} 
                  offTrackColor={item.priority=="CRITICAL"?"red.600":"#FFFF00"}  
                  {...NativeBaseProps.SWITCH} 
                />
            </HStack>
            <Button
              {...NativeBaseProps.PICTURE_BUTTON}
              borderBottomColor={item.dtrequestdone==null?item.priority=="CRITICAL"?"red.600":"#FFFF00":"#00FF00"}
            > 
              VIEW PICTURE 
            </Button>
          </VStack>
        )}
        keyExtractor={(item) => item.idresquests}
      />
    </LinearGradient>
    </Box>
  )
}

const NativeBaseProps = {
  PICTURE_BUTTON:{
    mb:2, 
    minW:"99%", 
    maxW:"99%", 
    borderTopRadius:0, 
    borderBottomWidth:4,
    _text:{
      fontWeight: "bold",
      fontSize: "16",
      color: "white"
    },  
  },
  VSTACK_FLATLIST:{
    alignItems:"center"
  },
  DIVIDER:{
    bg:"gray.400",
    thickness:"2",
    orientation:"vertical"
  },
  SWITCH:{
    onTrackColor:"#00FF00",  
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
    borderTopRadius:5,
    bgColor:"rgba(255,255,255,0.4)",
    mb:0
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