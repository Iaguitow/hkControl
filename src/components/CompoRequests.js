import React, {useState} from "react"
import { RefreshControl } from "react-native"
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
  const getRequests = (idpeople, token_api) => {dispatch(RequestActions.getRequests(idpeople, token_api, {setIsMounted, setRefreshing})) }
  const requests = useSelector(state => state.reducerRequests);
  const user = useSelector(state => state.reducerLogin);
  
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setIsMounted(true);
    const token_api = user.payload.tokenapi;
    const idpeople = user.payload.idpeople;
    getRequests(idpeople,token_api,{setIsMounted, setRefreshing});
  }, []);

  return (
    <Box flex={1} minWidth={"100%"} mb={8}>
      
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
        refreshControl={<RefreshControl tintColor={'white'} title={'UPDATING...'} titleColor={'white'} refreshing={refreshing} onRefresh={onRefresh} />}
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
                {item.requestdsc}
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
                    setIsMounted(true);
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
              {...NativeBaseProps.DETAILS_BUTTON}
              borderBottomColor={item.dtrequestdone==null?item.priority=="CRITICAL"?"red.600":"#FFFF00":"#00FF00"}
            > 
              VIEW DETAILS... 
            </Button>
          </VStack>
        )}
        keyExtractor={(item) => item.idresquests}
      />
    </Box>
  )
}

const NativeBaseProps = {
  DETAILS_BUTTON:{
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
    maxW:"9%", 
    minW:"9%",
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
    maxW:"40%", 
    minW:"40%", 
    noOfLines:2, 
    textAlign:"center", 
    fontWeight:"bold", 
    color:"white"
  },
  TEXT_TIME:{
    maxW:"9%",
    minW:"9%", 
    textAlign:"center", 
    fontWeight:"bold", 
    color:"white",
  },
  TEXT_BY:{
    maxW:"11%",
    minW:"11%",
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