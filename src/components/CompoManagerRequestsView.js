import React, { useState, useRef, useEffect, memo, useCallback } from 'react';
import { RefreshControl, AppState } from "react-native"
import CompoRequestDetails from "./CompoRequestDetails.js";
import { Collapse, CollapseHeader, CollapseBody } from "accordion-collapse-react-native";
import { useSelector, useDispatch } from "react-redux";
import { useRoute } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { RequestActions } from "../Actions/ActionRequests";
import {
  Box,
  HStack,
  Text,
  Divider,
  Center,
  Icon,
  VStack,
  Button,
  ScrollView,
  useDisclose
} from "native-base";

const CompoManagerRequestsView = ({ setIsMounted }) => {

  const {
    isOpen,
    onOpen,
    onClose
  } = useDisclose();

  const dispatch = useDispatch();
  const section = [];

  const getRequests = (userAccess,idpeople, joblevel, token_api) => {dispatch(RequestActions.getRequests(userAccess,idpeople, joblevel, token_api, {setIsMounted, setRefreshing})) }

  const requests = useSelector(state => state.reducerRequests.payload.requests);
  const user = useSelector(state => state.reducerLogin);
  const screenAccess = user.payload.screenAccess;
  const screenFunctionsAccess = user.payload.screenFunctionAccess
  const userAccess = {screenAccess,screenFunctionsAccess}
  
  const [refreshing, setRefreshing] = useState(false);

  const [chevronWeek, setChevronWeek] = useState(null);
  const setChevron_Week = useCallback((index) =>{
    setChevronWeek(index);
  });


  const [chevronDay, setChevronDay] = useState(null);
  const setChevron_Day = useCallback((index) =>{
    setChevronDay(index);
  });

  const [chevronPorter, setChevronPorter] = useState(null);
  const setChevron_porter = useCallback((index) =>{
    setChevronPorter(index);
  });

  const [requestDetail, setRequestDetail] = useState(null);

  const [timeStamp, setTimeStamp] = useState(null);
  const dateNow = new Date();

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setIsMounted(true);
    const token_api = user.payload.tokenapi;
    const idpeople = user.payload.idpeople;
    const joblevel = user.payload.joblevel;
    getRequests(userAccess,idpeople,joblevel,token_api,{setIsMounted, setRefreshing});
  }, []);

  if (requests !== null) {

    for (var i = 0, ii = requests.length; i < ii; i++) {

      const days = [];
      
      if (i > 0 ? requests[i].requestWeek != requests[i - 1].requestWeek : true == true) {
        
        for (var c = 0, cc = requests.length; c < cc; c++) {

          const porters = [];
          if (c > 0 ? ((requests[c].requestWeek == requests[i].requestWeek) && (requests[c].dtrequested != requests[c - 1].dtrequested)) : requests[c].requestWeek == requests[i].requestWeek) {

            for (var b = 0, bb = requests.length; b < bb; b++) {

              const porterRequests = [];
              if (!!porters.length ? ((requests[b].dtrequested == requests[c].dtrequested) && (requests[b].responsible != requests[b - 1].responsible)) : requests[b].dtrequested == requests[c].dtrequested) {

                for (var x = 0, xx = requests.length; x < xx; x++) {

                  if (requests[x].responsible == requests[b].responsible && requests[x].dtrequested == requests[b].dtrequested) {

                    porterRequests.push({
                      requestdsc: requests[x].requestdsc,
                      responsiblePhoneNumber: requests[x].responsiblePhoneNumber,
                      reason: requests[x].reason,
                      responsible: requests[x].responsible,
                      dtcancellation: requests[x].dtcancellation,
                      whocancelled: requests[x].whocancelled,
                      requesttimedealyed: requests[x].requesttimedealyed,
                      fulldtrequest: requests[x].fulldtrequest,
                      fulldtrequestdone: requests[x].fulldtrequestdone,
                      fullwhoresquested: requests[x].fullwhoresquested, 
                      idresquests: requests[x].idresquests,
                      whoresquested: requests[x].whoresquested,
                      timeRequested: requests[x].timeRequested,
                      timeRequestDone: requests[x].timeRequestDone,
                      priority: requests[x].priority,
                      roomnumber: requests[x].roomnumber,
                      howmanyitem: requests[x].howmanyitem,
                      requestPreviewDsc: requests[x].requestPreviewDsc,
                      timeStampRequested: requests[x].timeStampRequested,
                    });
                  }
                }

                porters.push({
                  requestsPerDayPorterConcluded: requests[b].requestsPerDayPorterConcluded,
                  requestsPerDayPorterOpens: requests[b].requestsPerDayPorterOpens,
                  responsible: requests[b].responsible,
                  porterRequests: porterRequests,
                  
                });
                
              }
            }

            days.push({
              dayDate: requests[c].dtrequested,
              requestsPerDayOpens: requests[c].requestsPerDayOpens,
              requestsPerDayConcluded: requests[c].requestsPerDayConcluded,
              percentagemConcluded: requests[c].percentagemConcluded,
              porters: porters
            });
          }
        }
        section.push({
          requestsPerWeek: requests[i].requestsPerWeek,
          requestWeek: requests[i].requestWeek,
          dtrequestWeek: requests[i].dtrequestWeek,
          days: days
        });
      }
    }
  }

  const route = useRoute();

  useEffect(()=>{
    const appStateSubscription = AppState.addEventListener('change', nextAppState =>{
      if (nextAppState === 'active'){
        onRefresh();
      }
    })
    if(route.params){
      setRequestDetail(route.params.item);
      onOpen();
    }else{
      return () => appStateSubscription.remove();
    }
    return () => appStateSubscription.remove();
  },[route.params]);


  return (
    <Box flex={1} Width={"100%"}>
      <ScrollView
        scrollIndicatorInsets={{ top: 1, bottom: 1 }} 
        refreshControl={<RefreshControl tintColor={'white'} title={'UPDATING...'} titleColor={'white'} refreshing={refreshing} onRefresh={onRefresh} />}
      >
        <VStack>
          {section.map((section, index) => {
            return (
              <Collapse
                key={index}
                disabled={false}
                isExpanded={chevronWeek == index?true:false}
                onToggle={(weekStatus) => {
                  setChevron_Week(weekStatus ? index : null);
                }}
              >
                <CollapseHeader style={{ marginTop: 5 }} >
                  <HStack
                    {...NativeBaseProps.HSTACK_FLATLIST_HEADER_ITEM}
                    justifyContent="flex-end"
                  >
                    <Center {...NativeBaseProps.CENTER} >
                      <VStack space={3}>
                        <HStack space={1}>
                          <Text {...NativeBaseProps.TEXT_DESCRIPTION_WEEK_SECTION}>
                            {"WEEK: "}
                          </Text>
                          <Text {...NativeBaseProps.TEXT_DESCRIPTION_SECTION_WEEK_INFO}>
                            {section.requestWeek}
                          </Text>
                        </HStack>
                        <HStack space={1}>
                          <Text {...NativeBaseProps.TEXT_DESCRIPTION_WEEK_SECTION}>
                            {"DATE: "}
                          </Text>
                          <Text {...NativeBaseProps.TEXT_DESCRIPTION_SECTION_WEEK_INFO}>
                            {section.dtrequestWeek}
                          </Text>
                        </HStack>
                        <HStack space={1}>
                          <Text {...NativeBaseProps.TEXT_DESCRIPTION_WEEK_SECTION}>
                            {"QUANTITY: "}
                          </Text>
                          <Text {...NativeBaseProps.TEXT_DESCRIPTION_SECTION_WEEK_INFO}>
                            {section.requestsPerWeek + "-Requests."}
                          </Text>
                        </HStack>
                      </VStack>
                    </Center>
                    <Icon
                      size={"35px"}
                      as={<MaterialCommunityIcons  name={chevronWeek == index ? "chevron-up" : "chevron-down"} />}
                      color={chevronWeek == index ? "white" : "black"}
                    />
                  </HStack>
                </CollapseHeader>
                <CollapseBody>
                  {section.days.map((day, index) => {
                    return (
                      <Collapse
                        key={index}
                        disabled={false}
                        isExpanded={chevronDay == index?true:false}
                        style={{marginBottom:10,borderTopColor:chevronDay==index?"#00b9f3":"gray",borderTopWidth:4}}
                        onToggle={(dayStatus) => {
                          setChevron_Day(dayStatus ? index : null);
                        }}
                      >
                        <CollapseHeader>
                          <HStack
                            {...NativeBaseProps.HSTACK_LIST_DAY_PORTER}
                            paddingTop={4}
                            paddingBottom={4}
                            borderBottomColor= {chevronDay==index?"#00b9f3":"gray.500"}
                            justifyContent="flex-end"
                          >
                            <Center {...NativeBaseProps.CENTER} >
                              <VStack space={2}>
                                <HStack>
                                  <Text  {...NativeBaseProps.TEXT_DESCRIPTION_DAY_SECTION} fontSize={18} color="#00b9f3">
                                    {"DATE: "}
                                  </Text>
                                  <Text {...NativeBaseProps.TEXT_DESCRIPTION_DAY_SECTION_INFO} fontSize={18} fontWeight="bold" color="#00b9f3">
                                    {day.dayDate}
                                  </Text>
                                </HStack>
                                <HStack>
                                  <Text {...NativeBaseProps.TEXT_DESCRIPTION_DAY_SECTION}>
                                    {"OPEN: "}
                                  </Text>
                                  <Text {...NativeBaseProps.TEXT_DESCRIPTION_DAY_SECTION_INFO} color={"red.500"} fontWeight="bold">
                                    {day.requestsPerDayOpens}
                                  </Text>
                                </HStack>
                                <HStack>
                                  <Text {...NativeBaseProps.TEXT_DESCRIPTION_DAY_SECTION}>
                                    {"COMPLETED: "}
                                  </Text>
                                  <Text {...NativeBaseProps.TEXT_DESCRIPTION_DAY_SECTION_INFO} color={"green.500"} fontWeight="bold">
                                    {day.requestsPerDayConcluded}
                                  </Text>
                                </HStack>
                                <HStack>
                                  <Text {...NativeBaseProps.TEXT_DESCRIPTION_DAY_SECTION}>
                                    {"PERCENT. REQUESTS COMPLETED: "}
                                  </Text>
                                  <Text {...NativeBaseProps.TEXT_DESCRIPTION_DAY_SECTION_INFO} color={day.percentagemConcluded > 70 ? "green.500" : "red.500"} fontWeight="bold">
                                    {day.percentagemConcluded + " %"}
                                  </Text>
                                </HStack>
                              </VStack>
                            </Center>
                            <Icon
                              size={"35px"}
                              as={<MaterialCommunityIcons name={chevronDay == index ? "chevron-up" : "chevron-down"} />}
                              color={chevronDay == index ? "white" : "black"}
                            />
                          </HStack>
                        </CollapseHeader>
                        <CollapseBody>
                          {day.porters.map((porter, index) => {
                            return (
                              <Collapse 
                                key={index} 
                                disabled={false} 
                                isExpanded={chevronPorter == index?true:false}
                                onToggle={(porterStatus) => {
                                  setChevron_porter(porterStatus ? index : null);
                                }}
                                >
                                <CollapseHeader>
                                  <HStack
                                    {...NativeBaseProps.HSTACK_LIST_DAY_PORTER}
                                    borderBottomColor={chevronPorter==index?"#00b9f3":"gray.500"}
                                    justifyContent="flex-end"
                                  >
                                      <VStack width={"83%"} alignItems={"flex-start"}>
                                        <Text {...NativeBaseProps.TEXT_DESCRIPTION_HEADER_LIST}>
                                          {porter.responsible}
                                        </Text>
                                        <HStack>
                                          <Text {...NativeBaseProps.TEXT_DESCRIPTION_DAY_SECTION}>
                                            {"OPEN: "}
                                          </Text>
                                          <Text {...NativeBaseProps.TEXT_DESCRIPTION_DAY_SECTION_INFO} color={"red.500"} fontWeight="bold">
                                            {porter.requestsPerDayPorterOpens}
                                          </Text>
                                          <Text {...NativeBaseProps.TEXT_DESCRIPTION_DAY_SECTION} marginLeft={5}>
                                            {"COMPLETED: "}
                                          </Text>
                                          <Text {...NativeBaseProps.TEXT_DESCRIPTION_DAY_SECTION_INFO} color={"green.500"} fontWeight="bold">
                                            {porter.requestsPerDayPorterConcluded}
                                          </Text>
                                        </HStack>
                                      </VStack>
                                    <Icon
                                      size={"35px"}
                                      as={<MaterialCommunityIcons name={chevronPorter == index ? "chevron-up" : "chevron-down"} />}
                                      color={chevronPorter == index ? "white" : "black"}
                                    />
                                  </HStack>
                                </CollapseHeader>
                                <CollapseBody style={{marginBottom:20}}>
                                  {porter.porterRequests.map((portersRequests,index) =>{
                                    return(
                                      <HStack 
                                        key={index} 
                                        space={2} 
                                        mt={2}
                                        bgColor={"rgba(255,255,255,0.1)"}
                                        alignItems={"center"}
                                        height={"50px"}
                                      >
                                        <Text  {...NativeBaseProps.TEXT_DESCRIPTION_REQUESTS} minWidth={"10%"} maxWidth={"10%"}>
                                          {portersRequests.whoresquested}
                                        </Text>
                                        <Divider {...NativeBaseProps.DIVIDER} />
                                        <Text  {...NativeBaseProps.TEXT_DESCRIPTION_REQUESTS} minWidth={"10%"} maxWidth={"10%"}>
                                          {portersRequests.timeRequested}
                                        </Text>
                                        <Divider {...NativeBaseProps.DIVIDER} />
                                        <Text  {...NativeBaseProps.TEXT_DESCRIPTION_REQUESTS} minWidth={"20%"} maxWidth={"20%"} noOfLines={1}>
                                          {portersRequests.requestPreviewDsc}
                                        </Text>
                                        <Divider {...NativeBaseProps.DIVIDER} />
                                        <Text  {...NativeBaseProps.TEXT_DESCRIPTION_REQUESTS} minWidth={"8%"} maxWidth={"8%"}>
                                          {portersRequests.roomnumber}
                                        </Text>
                                        <Divider {...NativeBaseProps.DIVIDER} />
                                        <Text  {...NativeBaseProps.TEXT_DESCRIPTION_REQUESTS} minWidth={"10%"} maxWidth={"10%"}>
                                          {portersRequests.timeRequestDone}
                                        </Text>
                                        <Divider {...NativeBaseProps.DIVIDER} />
                                        <Icon
                                          size={"35px"}
                                          minWidth={"8%"} maxWidth={"8%"}
                                          as={<MaterialCommunityIcons name={portersRequests.dtcancellation != null ? "checkbox-blank-off-outline":
                                          portersRequests.timeRequestDone == null? "checkbox-blank-outline":"checkbox-marked-outline"} 
                                            
                                          />}
                                          color={portersRequests.dtcancellation != null ? "black":portersRequests.timeRequestDone != null ? "green.500" : portersRequests.priority == "CRITICAL"? "red.500":"yellow.500"}
                                        />
                                        <Divider {...NativeBaseProps.DIVIDER} />
                                        <Button 
                                          size={"30px"}
                                          onPress={()=>{
                                            setTimeStamp(dateNow.getTime());
                                            setRequestDetail(portersRequests);
                                            onOpen();
                                          }}
                                          >
                                          ...
                                        </Button>
                                      </HStack>
                                    )
                                  })
                                  }
                                </CollapseBody>
                              </Collapse>
                            )
                          })
                          }
                        </CollapseBody>
                      </Collapse>
                    );
                  })
                  }
                </CollapseBody>
              </Collapse>
            )
          })
          }
        </VStack>
      </ScrollView>
      {requestDetail !== null && <CompoRequestDetails 
        id_whocancelled = {user.payload.idpeople} 
        token_api = {user.payload.tokenapi} 
        joblevel = {user.payload.joblevel} 
        requestDetail={requestDetail} 
        isOpen={isOpen} onClose={onClose}
        onRefresh={onRefresh}
        timeStamp={timeStamp}
        userAccess={userAccess}  
      />}
    </Box>
  );
}

const NativeBaseProps = {
  INPUT_AMOUNT: {
    width: "22%",
    textAlign: "center",
    fontSize: 18,
    keyboardType: 'numeric',
    placeholder: "Amount",
    maxLength: 2,
    selectionColor: "white",
    placeholderTextColor: "white",
    color: "white"
  },
  CENTER: {
    flexDirection: "row",
    width: "100%"
  },
  VSTACK_FLATLIST: {
    alignItems: "center",
    borderBottomWidth: 3,
    borderBottomColor: "gray.400"
  },
  LINEAR_BACK_GROUND_COLOR: {
    colors: ['#00b9f3', '#061b21', '#061b21'],
    start: [1, 0],
    end: [0, 3],
    locations: [0.7, 0.1, 0.2],
    style: { flex: 1 },
  },

  HSTACK_LIST_DAY_PORTER: {
    space: 1,
    alignItems: "center",
    alignSelf: "center",
    minH: 60,
    borderTopRadius: 0,
    bgColor: "rgba(255,255,255,0.1)",
    mb: 0,
    minW: "100%",
    borderBottomWidth: 4,
  },


  HSTACK_FLATLIST_HEADER_ITEM: {
    space: 1,
    alignItems: "center",
    minH: 60,
    borderTopRadius: 0,
    bgColor: "#00b9f3",
    borderBottomWidth: 4,
    borderBottomColor: "black",
    width: "100%"
  },
  TEXT_HOW_MANY: {
    maxW: "50%",
    minW: "12%",
    textAlign: "center",
    fontWeight: "bold",
    color: "white"
  },
  TEXT_DESCRIPTION: {
    maxW: "75%",
    minW: "75%",
    noOfLines: 5,
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
    fontSize: 16
  },
  TEXT_DESCRIPTION_ITEM: {
    maxW: "75%",
    minW: "75%",
    noOfLines: 5,
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
  },
  TEXT_DESCRIPTION_HEADER_LIST: {
    fontWeight: "bold",
    fontSize: 18,
    color: "white",
  },
  TEXT_DESCRIPTION_REQUESTS: {
    fontWeight: "bold",
    fontSize: 13,
    color: "white",
  },
  TEXT_DESCRIPTION_WEEK_SECTION: {
    fontWeight: "bold",
    fontSize: 18,
    color: "white",
  },
  TEXT_DESCRIPTION_SECTION_WEEK_INFO: {
    fontSize: 18,
    color: "white",
  },
  TEXT_DESCRIPTION_DAY_SECTION: {
    fontWeight: "bold",
    fontSize: 14,
    color: "white",
  },
  TEXT_DESCRIPTION_DAY_SECTION_INFO: {
    fontSize: 14,
    color: "white",
  },
  HSTACK_HEADER: {
    space: 1,
    alignItems: "center",
    alignSelf: "center",
    minH: 60,
    borderBottomWidth: 4,
    borderBottomColor: "#00b9f3",
    borderRadius: 5,
    my: 0,
    bgColor: "rgba(0,185,243,0.5)",
    width: "100%"
  },
  DIVIDER: {
    bg: "gray.400",
    thickness: "2",
    orientation: "vertical"
  },
}

export default memo(CompoManagerRequestsView);