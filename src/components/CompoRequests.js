import React, { useState, memo, useEffect, useCallback } from "react";
import { Platform } from "react-native";
import CompoRequestDetails from "./CompoRequestDetails.js";
import { RefreshControl, Alert, AppState } from "react-native"
import { useSelector, useDispatch } from "react-redux";
import { RequestActions } from "../Actions/ActionRequests";
import { actionsTypesAPI } from "../Actions/ConstActionsApi";
import { useRoute } from "@react-navigation/native";
import { MaterialIcons, MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import Toasts from "./CompoToast";
import * as Notifications from 'expo-notifications';
import { Collapse, CollapseHeader, CollapseBody } from "accordion-collapse-react-native";
import {
  Box,
  useToast,
  HStack,
  Switch,
  Text,
  Divider,
  VStack,
  Button,
  ScrollView,
  useDisclose,
  Icon,
  Center
} from "native-base";

const CompoRequests = ({ setIsMounted }) => {

  const ttoast = useToast();
  const [requestDetail, setRequestDetails] = useState(null);
  const [timeStamp, setTimeStamp] = useState(null);
  const dateNow = new Date();

  const [chevronOpenReq, setChevronOpenReq] = useState(true);
  const setChevron_OpenReq = useCallback(() => {
    setChevronOpenReq(!chevronOpenReq);
    setChevronDoneReq(false);
    setChevronCancelReq(false);
  });

  const [chevronDoneReq, setChevronDoneReq] = useState(false);
  const setChevron_DoneReq = useCallback(() => {
    setChevronDoneReq(!chevronDoneReq);
    //setChevronOpenReq(!chevronDoneReq?false:true);
    setChevronOpenReq(false);
    setChevronCancelReq(false);
  });

  const [chevronCancelReq, setChevronCancelReq] = useState(false);
  const setChevron_CancelReq = useCallback(() => {
    setChevronCancelReq(!chevronCancelReq);
    //setChevronOpenReq(!chevronCancelReq?false:true);
    setChevronOpenReq(false);
    setChevronDoneReq(false);
  });

  const {
    isOpen,
    onOpen,
    onClose
  } = useDisclose();


  const dispatch = useDispatch();
  const updateRequest = (userAccess, idrequests, requestdone, idpeople, token_api, joblevel) => { dispatch(RequestActions.updateRquests(userAccess, idrequests, requestdone, idpeople, token_api, joblevel, { setIsMounted })) }
  const getRequests = (userAccess, idpeople, joblevel, token_api) => { dispatch(RequestActions.getRequests(userAccess, idpeople, joblevel, token_api, { setIsMounted, setRefreshing })) }
  const requests = useSelector(state => state.reducerRequests);
  const user = useSelector(state => state.reducerLogin);
  const screenAccess = user.payload.screenAccess;
  const screenFunctionsAccess = user.payload.screenFunctionAccess
  const userAccess = { screenAccess, screenFunctionsAccess }

  const [refreshing, setRefreshing] = useState(false);


  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setIsMounted(true);
    const token_api = user.payload.tokenapi;
    const idpeople = user.payload.idpeople;
    const joblevel = user.payload.joblevel;
    getRequests(userAccess, idpeople, joblevel, token_api, { setIsMounted, setRefreshing });
  }, []);

  const item = [{ openReq: [],amountOpenNormal:0,amountOpenCritical:0, doneReq: [], amountDone:0, cancelledReq: [], amountCanceled:0 }];

  if (requests.payload.requests !== null) {

    
    item[0].amountCanceled = requests.payload.requests[0].amountCanceled;
    item[0].amountDone = requests.payload.requests[0].amountDone;
    item[0].amountOpenNormal = requests.payload.requests[0].amountOpenNormal;
    item[0].amountOpenCritical = requests.payload.requests[0].amountOpenCritical;
 

    for (var i = 0, ii = requests.payload.requests.length; i < ii; i++) {

      if (i > 0 ? requests.payload.requests[i].idresquests != requests.payload.requests[i - 1].idresquests : true == true) {

        if (!!requests.payload.requests[i].dtrequestdone) {
          item[0].doneReq.push({
            idresquests: requests.payload.requests[i].idresquests,
            responsiblePhoneNumber: requests.payload.requests[i].responsiblePhoneNumber,
            responsible: requests.payload.requests[i].responsible,
            dtcancellation: requests.payload.requests[i].dtcancellation,
            whocancelled: requests.payload.requests[i].whocancelled,
            reason: requests.payload.requests[i].reason,
            requesttimedealyed: requests.payload.requests[i].requesttimedealyed,
            fulldtrequest: requests.payload.requests[i].fulldtrequest,
            fulldtrequestdone: requests.payload.requests[i].fulldtrequestdone,
            whoresquested: requests.payload.requests[i].whoresquested,
            fullwhoresquested: requests.payload.requests[i].fullwhoresquested,
            dtrequested: requests.payload.requests[i].dtrequested,
            requestdsc: requests.payload.requests[i].requestdsc,
            roomnumber: requests.payload.requests[i].roomnumber,
            dtrequestdone: requests.payload.requests[i].dtrequestdone,
            priority: requests.payload.requests[i].priority,
            timeStampRequested: requests.payload.requests[i].timeStampRequested,
          });

        } else if (!!requests.payload.requests[i].dtcancellation) {
          item[0].cancelledReq.push({
            idresquests: requests.payload.requests[i].idresquests,
            responsiblePhoneNumber: requests.payload.requests[i].responsiblePhoneNumber,
            responsible: requests.payload.requests[i].responsible,
            dtcancellation: requests.payload.requests[i].dtcancellation,
            whocancelled: requests.payload.requests[i].whocancelled,
            reason: requests.payload.requests[i].reason,
            requesttimedealyed: requests.payload.requests[i].requesttimedealyed,
            fulldtrequest: requests.payload.requests[i].fulldtrequest,
            fulldtrequestdone: requests.payload.requests[i].fulldtrequestdone,
            whoresquested: requests.payload.requests[i].whoresquested,
            fullwhoresquested: requests.payload.requests[i].fullwhoresquested,
            dtrequested: requests.payload.requests[i].dtrequested,
            requestdsc: requests.payload.requests[i].requestdsc,
            roomnumber: requests.payload.requests[i].roomnumber,
            dtrequestdone: requests.payload.requests[i].dtrequestdone,
            priority: requests.payload.requests[i].priority,
            timeStampRequested: requests.payload.requests[i].timeStampRequested,
          });

        } else {
          item[0].openReq.push({
            idresquests: requests.payload.requests[i].idresquests,
            responsiblePhoneNumber: requests.payload.requests[i].responsiblePhoneNumber,
            responsible: requests.payload.requests[i].responsible,
            dtcancellation: requests.payload.requests[i].dtcancellation,
            whocancelled: requests.payload.requests[i].whocancelled,
            reason: requests.payload.requests[i].reason,
            requesttimedealyed: requests.payload.requests[i].requesttimedealyed,
            fulldtrequest: requests.payload.requests[i].fulldtrequest,
            fulldtrequestdone: requests.payload.requests[i].fulldtrequestdone,
            whoresquested: requests.payload.requests[i].whoresquested,
            fullwhoresquested: requests.payload.requests[i].fullwhoresquested,
            dtrequested: requests.payload.requests[i].dtrequested,
            requestdsc: requests.payload.requests[i].requestdsc,
            roomnumber: requests.payload.requests[i].roomnumber,
            dtrequestdone: requests.payload.requests[i].dtrequestdone,
            priority: requests.payload.requests[i].priority,
            timeStampRequested: requests.payload.requests[i].timeStampRequested,
          });
        }
      }
    }
  }

  const route = useRoute();
  const notificationListener = React.useRef();

  useEffect(() => {

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      onRefresh();

    });

    const stateSubscription = AppState.addEventListener('change', nextAppState => {
      if (nextAppState === 'active') {
        onRefresh();
      }
    });

    if (route.params) {
      setRequestDetails(route.params.item);
      onOpen();
    } else {
      return () => {
        stateSubscription.remove()
        Notifications.removeNotificationSubscription(notificationListener.current);
      };
    }

    return () => {
      stateSubscription.remove();
      Notifications.removeNotificationSubscription(notificationListener.current);
    };
  }, [route.params, notificationListener.current]);


  return (
    <Box flex={1} minWidth={"100%"} mb={8}>
      <ScrollView
        scrollIndicatorInsets={{ top: 1, bottom: 1 }}
        refreshControl={<RefreshControl tintColor={'white'} title={'UPDATING...'} titleColor={'white'} refreshing={refreshing} onRefresh={onRefresh} />}
      >
        <Collapse
          disabled={false}
          isExpanded={chevronOpenReq ? true : false}
          style={{ marginBottom: 10, borderTopColor: chevronOpenReq ? "#00b9f3" : "rgba(0,0,0,0.6)", borderTopWidth: 4 }}
          onToggle={(openRedStatus) => {
            setChevron_OpenReq(true);
          }}
        >
          <CollapseHeader>
            <HStack
              {...NativeBaseProps.HSTACK_LIST_OPEN_REQUESTS}
              paddingTop={2}
              paddingBottom={4}
              backgroundColor={"trueGray.700"}
              borderBottomColor={chevronOpenReq ? "#00b9f3" : "rgba(0,0,0,0.6)"}
              justifyContent={"flex-start"}
            >
              <VStack
                space={5}
                ml={5}
              >
                <Text  {...NativeBaseProps.TEXT_DESCRIPTION_OPENREQ_SECTION} fontSize={18} color={chevronOpenReq ? "#00b9f3" : "gray.800"}>
                  {"OPEN ORDERS:"}
                </Text>
                <Center {...NativeBaseProps.CENTER} >
                  <HStack justifyContent={"space-between"} width={"100%"}>

                    <VStack space={2}>
                      <HStack
                        alignItems={"center"}
                        space={2}
                      >
                        <Icon
                          size={"xl"}
                          as={<MaterialCommunityIcons name={"checkbox-blank-outline"} />}
                          color={chevronOpenReq ? "red.400" : "gray.800"}
                        />
                        <Text  {...NativeBaseProps.TEXT_DESCRIPTION_OPENREQ_SECTION} fontSize={16} color={chevronOpenReq ? "white" : "gray.800"}>
                          {"-  PRIORITIES: "}
                        </Text>
                        <Text {...NativeBaseProps.TEXT_DESCRIPTION_OPENREQ_SECTION_INFO} fontSize={16} fontWeight="bold" color={chevronOpenReq ? "red.400" : "gray.800"} >
                          {!!item && item[0].amountOpenCritical}
                        </Text>
                      </HStack>

                      <HStack
                        alignItems={"center"}
                        space={2}
                      >
                        <Icon
                          size={"xl"}
                          as={<MaterialCommunityIcons name={"checkbox-blank-outline"} />}
                          color={chevronOpenReq ? "yellow.500" : "gray.800"}
                        />
                        <Text  {...NativeBaseProps.TEXT_DESCRIPTION_OPENREQ_SECTION} fontSize={16} color={chevronOpenReq ? "white" : "gray.800"}>
                          {"-  NORMAL: "}
                        </Text>
                        <Text {...NativeBaseProps.TEXT_DESCRIPTION_OPENREQ_SECTION_INFO} fontSize={16} fontWeight="bold" color={chevronOpenReq ? "yellow.400" : "gray.800"}>
                          {!!item && item[0].amountOpenNormal}
                        </Text>
                      </HStack>
                    </VStack>

                    <HStack
                      space={4}
                    >
                      <Icon
                        size={"45px"}
                        as={<Ionicons name={chevronOpenReq ? "ios-folder-open" : "ios-folder"}
                        />}
                        color={chevronOpenReq ? "white" : "gray.800"}
                      />

                      <Icon
                        size={"35px"}
                        as={<MaterialCommunityIcons name={chevronOpenReq ? "chevron-up" : "chevron-down"} />}
                        color={chevronOpenReq ? "white" : "black"}
                      />
                    </HStack>
                  </HStack>
                </Center>
              </VStack>
            </HStack>
          </CollapseHeader>
          <CollapseBody>
            {item[0].openReq.map((item, index) => {
              return (
                <VStack
                  key={item.idresquests}
                  {...NativeBaseProps.VSTACK_FLATLIST}
                >
                  <HStack space={2} alignItems={"center"} justifyContent={"space-between"}>
                    <HStack space={1} alignItems={"center"}>
                      <Text {...NativeBaseProps.TEXT_DESCRIPTION_REQUESTS_TITLE} >
                        ROOM:
                      </Text>
                      <Text {...NativeBaseProps.TEXT_DESCRIPTION_REQUESTS} fontWeight={"bold"} fontSize={18}>
                        {item.roomnumber}
                      </Text>
                    </HStack>

                    <Switch
                      disabled={item.dtcancellation != null || userAccess.screenFunctionsAccess.FINISH_REQUEST == "N" ? true : false}
                      onToggle={() => {
                        if (item.dtrequestdone !== null) {
                          Toasts.showToast("Cancel Request", "", "", ttoast);
                          return;
                        }
                        Alert.alert(
                          'WARNING',
                          'BE AWARE YOU WILL NOT BE ABLE TO GO BACK! ARE YOU SURE ABOUT TO FINISH THIS REQUEST FOR THE ROOM: ' + item.roomnumber + " ?!",
                          [
                            {
                              text: 'Cancel',
                              onPress: () => { },
                              style: 'cancel',
                            },
                            {
                              text: 'Yes', onPress: () => {
                                setIsMounted(true);
                                const token_api = user.payload.tokenapi;
                                const idpeople = user.payload.idpeople;
                                const joblevel = user.payload.joblevel;
                                const requestdone = item.dtrequestdone == null ? !false : null
                                updateRequest(userAccess, item.idresquests, requestdone, idpeople, token_api, joblevel, { setIsMounted });
                                if (requests.api_status === actionsTypesAPI.STATUS_OK) {
                                  Toasts.showToast("Request Successfully Saved");
                                }
                              }
                            },
                          ],
                          { cancelable: false },
                        );
                      }}
                      isChecked={item.dtrequestdone == null ? false : true}
                      offTrackColor={item.dtcancellation != null ? "black" : item.priority == "CRITICAL" ? "red.600" : "#FFFF00"}
                      {...NativeBaseProps.SWITCH}
                    />
                  </HStack>

                  <HStack space={2}>

                    <HStack space={1}>
                      <Text  {...NativeBaseProps.TEXT_DESCRIPTION_REQUESTS_TITLE}>
                        BY:
                      </Text>
                      <Text  {...NativeBaseProps.TEXT_DESCRIPTION_REQUESTS}>
                        {item.whoresquested}
                      </Text>
                    </HStack>

                    <Divider {...NativeBaseProps.DIVIDER} />

                    <HStack space={1}>
                      <Text {...NativeBaseProps.TEXT_DESCRIPTION_REQUESTS_TITLE}>
                        Time Req.:
                      </Text>
                      <Text {...NativeBaseProps.TEXT_DESCRIPTION_REQUESTS} fontWeight={"bold"}>
                        {item.dtrequested}
                      </Text>
                    </HStack>

                    <Divider {...NativeBaseProps.DIVIDER} />

                    <HStack space={1}>
                      <Text {...NativeBaseProps.TEXT_DESCRIPTION_REQUESTS_TITLE}>
                        Time Done.:
                      </Text>
                      <Text {...NativeBaseProps.TEXT_DESCRIPTION_REQUESTS}>
                        {item.dtrequestdone}
                      </Text>
                    </HStack>

                  </HStack>

                  <HStack>
                    <Text {...NativeBaseProps.TEXT_DESCRIPTION_REQUESTS_TITLE}>
                      DSC:
                    </Text>
                    <Text {...NativeBaseProps.TEXT_DESCRIPTION_REQUESTS}>
                      {item.requestdsc}
                    </Text>
                  </HStack>

                  <HStack space={2} alignItems={"center"} justifyContent={"space-between"}>
                    <Button
                      shadow={9}
                      _text={
                        {
                          fontWeight: "bold",
                          fontSize: "16",
                        }
                      }
                      h={"40px"}
                      w={"200px"}
                      endIcon={<Icon size={9} as={MaterialIcons} name="read-more" />}
                      onPress={() => {
                        setTimeStamp(dateNow.getTime());
                        setRequestDetails(item);
                        onOpen();
                      }}
                    >
                      <Text justifyContent={"center"} {...NativeBaseProps.TEXT_DESCRIPTION_REQUESTS_TITLE}>
                        DETAILS
                      </Text>
                    </Button>
                  </HStack>

                </VStack>
              )
            })}
          </CollapseBody>
        </Collapse>

        {
          /**************************************************************************************************************************************************
          -------------------------------------------------------------FINISHED ORDERS-----------------------------------------------------------------------
          ***************************************************************************************************************************************************/
        }

        <Collapse
          disabled={false}
          isExpanded={chevronDoneReq ? true : false}
          style={{ marginBottom: 10, borderTopColor: chevronDoneReq ? "#00b9f3" : "rgba(0,0,0,0.6)", borderTopWidth: 4 }}
          onToggle={(openRedStatus) => {
            setChevron_DoneReq(openRedStatus ? true : false);
          }}
        >
          <CollapseHeader>
            <HStack
              {...NativeBaseProps.HSTACK_LIST_OPEN_REQUESTS}
              paddingTop={2}
              paddingBottom={4}
              backgroundColor={"trueGray.700"}
              borderBottomColor={chevronDoneReq ? "#00b9f3" : "rgba(0,0,0,0.6)"}
              justifyContent={"flex-start"}
            >
              <VStack
                space={5}
                ml={5}
              >
                <Text  {...NativeBaseProps.TEXT_DESCRIPTION_OPENREQ_SECTION} fontSize={18} color={chevronDoneReq ? "#00b9f3" : "gray.800"}>
                  {"FINISHED ORDERS:"}
                </Text>
                <Center {...NativeBaseProps.CENTER} >
                  <HStack justifyContent={"space-between"} width={"100%"}>
                    <HStack
                      space={2}
                      alignItems={"center"}
                    >
                      <Icon
                        size={"xl"}
                        as={<MaterialCommunityIcons name={"checkbox-marked-outline"} />}
                        color={chevronDoneReq ? "green.500" : "gray.800"}
                      />
                      <Text  {...NativeBaseProps.TEXT_DESCRIPTION_OPENREQ_SECTION} fontSize={16} color={chevronDoneReq ? "white" : "gray.800"}>
                        {"-  QTY: "}
                      </Text>
                      <Text {...NativeBaseProps.TEXT_DESCRIPTION_OPENREQ_SECTION_INFO} fontSize={16} fontWeight="bold" color={chevronDoneReq ? "green.500" : "gray.800"} >
                        {!!item && item[0].amountDone}
                      </Text>
                    </HStack>
                    <HStack
                      space={4}
                    >
                      <Icon
                        size={"45px"}
                        as={<Ionicons name={chevronDoneReq ? "ios-folder-open" : "ios-folder"}
                        />}
                        color={chevronDoneReq ? "white" : "gray.800"}
                      />

                      <Icon
                        size={"35px"}
                        as={<MaterialCommunityIcons name={chevronDoneReq ? "chevron-up" : "chevron-down"} />}
                        color={chevronDoneReq ? "white" : "black"}
                      />
                    </HStack>
                  </HStack>
                </Center>
              </VStack>
            </HStack>
          </CollapseHeader>
          <CollapseBody>
            {item[0].doneReq.map((item, index) => {
              return (
                <VStack
                  key={item.idresquests}
                  {...NativeBaseProps.VSTACK_FLATLIST}
                >
                  <HStack space={2} alignItems={"center"} justifyContent={"space-between"}>
                    <HStack space={1} alignItems={"center"}>
                      <Text {...NativeBaseProps.TEXT_DESCRIPTION_REQUESTS_TITLE} >
                        ROOM:
                      </Text>
                      <Text {...NativeBaseProps.TEXT_DESCRIPTION_REQUESTS} fontWeight={"bold"} fontSize={18}>
                        {item.roomnumber}
                      </Text>
                    </HStack>

                    <Switch
                      disabled={item.dtcancellation != null || userAccess.screenFunctionsAccess.FINISH_REQUEST == "N" ? true : false}
                      onToggle={() => {
                        if (item.dtrequestdone !== null) {
                          Toasts.showToast("Cancel Request", "", "", ttoast);
                          return;
                        }
                        Alert.alert(
                          'WARNING',
                          'BE AWARE YOU WILL NOT BE ABLE TO GO BACK! ARE YOU SURE ABOUT TO FINISH THIS REQUEST FOR THE ROOM: ' + item.roomnumber + " ?!",
                          [
                            {
                              text: 'Cancel',
                              onPress: () => { },
                              style: 'cancel',
                            },
                            {
                              text: 'Yes', onPress: () => {
                                setIsMounted(true);
                                const token_api = user.payload.tokenapi;
                                const idpeople = user.payload.idpeople;
                                const joblevel = user.payload.joblevel;
                                const requestdone = item.dtrequestdone == null ? !false : null
                                updateRequest(userAccess, item.idresquests, requestdone, idpeople, token_api, joblevel, { setIsMounted });
                                if (requests.api_status === actionsTypesAPI.STATUS_OK) {
                                  Toasts.showToast("Request Successfully Saved");
                                }
                              }
                            },
                          ],
                          { cancelable: false },
                        );
                      }}
                      isChecked={item.dtrequestdone == null ? false : true}
                      offTrackColor={item.dtcancellation != null ? "black" : item.priority == "CRITICAL" ? "red.600" : "#FFFF00"}
                      {...NativeBaseProps.SWITCH}
                    />
                  </HStack>

                  <HStack space={2}>

                    <HStack space={1}>
                      <Text  {...NativeBaseProps.TEXT_DESCRIPTION_REQUESTS_TITLE}>
                        BY:
                      </Text>
                      <Text  {...NativeBaseProps.TEXT_DESCRIPTION_REQUESTS}>
                        {item.whoresquested}
                      </Text>
                    </HStack>

                    <Divider {...NativeBaseProps.DIVIDER} />

                    <HStack space={1}>
                      <Text {...NativeBaseProps.TEXT_DESCRIPTION_REQUESTS_TITLE}>
                        Time Req.:
                      </Text>
                      <Text {...NativeBaseProps.TEXT_DESCRIPTION_REQUESTS} fontWeight={"bold"}>
                        {item.dtrequested}
                      </Text>
                    </HStack>

                    <Divider {...NativeBaseProps.DIVIDER} />

                    <HStack space={1}>
                      <Text {...NativeBaseProps.TEXT_DESCRIPTION_REQUESTS_TITLE}>
                        Time Done.:
                      </Text>
                      <Text {...NativeBaseProps.TEXT_DESCRIPTION_REQUESTS}>
                        {item.dtrequestdone}
                      </Text>
                    </HStack>

                  </HStack>

                  <HStack>
                    <Text {...NativeBaseProps.TEXT_DESCRIPTION_REQUESTS_TITLE}>
                      DSC:
                    </Text>
                    <Text {...NativeBaseProps.TEXT_DESCRIPTION_REQUESTS}>
                      {item.requestdsc}
                    </Text>
                  </HStack>

                  <HStack space={2} alignItems={"center"} justifyContent={"space-between"}>
                    <Button
                      shadow={9}
                      _text={
                        {
                          fontWeight: "bold",
                          fontSize: "16",
                        }
                      }
                      h={"40px"}
                      w={"200px"}
                      endIcon={<Icon size={9} as={MaterialIcons} name="read-more" />}
                      onPress={() => {
                        setTimeStamp(dateNow.getTime());
                        setRequestDetails(item);
                        onOpen();
                      }}
                    >
                      <Text justifyContent={"center"} {...NativeBaseProps.TEXT_DESCRIPTION_REQUESTS_TITLE}>
                        DETAILS
                      </Text>
                    </Button>
                  </HStack>

                </VStack>
              )
            })}
          </CollapseBody>
        </Collapse>

        {
          /**************************************************************************************************************************************************
          -------------------------------------------------------------CANCELLED ORDERS-----------------------------------------------------------------------
          ***************************************************************************************************************************************************/
        }

        <Collapse
          disabled={false}
          isExpanded={chevronCancelReq ? true : false}
          style={{ marginBottom: 10, borderTopColor: chevronCancelReq ? "#00b9f3" : "rgba(0,0,0,0.6)", borderTopWidth: 4 }}
          onToggle={(openRedStatus) => {
            setChevron_CancelReq(openRedStatus ? true : false);
          }}
        >
          <CollapseHeader>
            <HStack
              {...NativeBaseProps.HSTACK_LIST_OPEN_REQUESTS}
              paddingTop={2}
              paddingBottom={4}
              backgroundColor={"trueGray.700"}
              borderBottomColor={chevronCancelReq ? "#00b9f3" : "rgba(0,0,0,0.6)"}
              justifyContent={"flex-start"}
            >
              <VStack
                space={5}
                ml={5}
              >
                <Text  {...NativeBaseProps.TEXT_DESCRIPTION_OPENREQ_SECTION} fontSize={18} color={chevronCancelReq ? "#00b9f3" : "gray.800"}>
                  {"CANCELLED ORDERS:"}
                </Text>
                <Center {...NativeBaseProps.CENTER} >
                  <HStack justifyContent={"space-between"} width={"100%"}>
                    <HStack
                      space={2}
                      alignItems={"center"}
                    >
                      <Icon
                        size={"xl"}
                        as={<MaterialCommunityIcons name={"checkbox-blank-off-outline"} />}
                        color={chevronCancelReq ? "black" : "gray.800"}
                      />
                      <Text  {...NativeBaseProps.TEXT_DESCRIPTION_OPENREQ_SECTION} fontSize={16} color={chevronCancelReq ? "white" : "gray.800"}>
                        {"-  QTY: "}
                      </Text>
                      <Text {...NativeBaseProps.TEXT_DESCRIPTION_OPENREQ_SECTION_INFO} fontSize={16} fontWeight="bold" color={chevronCancelReq ? "black" : "gray.800"} >
                        {!!item && item[0].amountCanceled}
                      </Text>
                    </HStack>
                    <HStack
                      space={4}
                    >
                      <Icon
                        size={"45px"}
                        as={<Ionicons name={chevronCancelReq ? "ios-folder-open" : "ios-folder"}
                        />}
                        color={chevronCancelReq ? "white" : "gray.800"}
                      />

                      <Icon
                        size={"35px"}
                        as={<MaterialCommunityIcons name={chevronCancelReq ? "chevron-up" : "chevron-down"} />}
                        color={chevronCancelReq ? "white" : "black"}
                      />
                    </HStack>
                  </HStack>
                </Center>
              </VStack>
            </HStack>
          </CollapseHeader>
          <CollapseBody>
            {item[0].cancelledReq.map((item, index) => {
              return (
                <VStack
                  key={item.idresquests}
                  {...NativeBaseProps.VSTACK_FLATLIST}
                >
                  <HStack space={2} alignItems={"center"} justifyContent={"space-between"}>
                    <HStack space={1} alignItems={"center"}>
                      <Text {...NativeBaseProps.TEXT_DESCRIPTION_REQUESTS_TITLE} >
                        ROOM:
                      </Text>
                      <Text {...NativeBaseProps.TEXT_DESCRIPTION_REQUESTS} fontWeight={"bold"} fontSize={18}>
                        {item.roomnumber}
                      </Text>
                    </HStack>

                    <Switch
                      disabled={item.dtcancellation != null || userAccess.screenFunctionsAccess.FINISH_REQUEST == "N" ? true : false}
                      onToggle={() => {
                        if (item.dtrequestdone !== null) {
                          Toasts.showToast("Cancel Request", "", "", ttoast);
                          return;
                        }
                        Alert.alert(
                          'WARNING',
                          'BE AWARE YOU WILL NOT BE ABLE TO GO BACK! ARE YOU SURE ABOUT TO FINISH THIS REQUEST FOR THE ROOM: ' + item.roomnumber + " ?!",
                          [
                            {
                              text: 'Cancel',
                              onPress: () => { },
                              style: 'cancel',
                            },
                            {
                              text: 'Yes', onPress: () => {
                                setIsMounted(true);
                                const token_api = user.payload.tokenapi;
                                const idpeople = user.payload.idpeople;
                                const joblevel = user.payload.joblevel;
                                const requestdone = item.dtrequestdone == null ? !false : null
                                updateRequest(userAccess, item.idresquests, requestdone, idpeople, token_api, joblevel, { setIsMounted });
                                if (requests.api_status === actionsTypesAPI.STATUS_OK) {
                                  Toasts.showToast("Request Successfully Saved");
                                }
                              }
                            },
                          ],
                          { cancelable: false },
                        );
                      }}
                      isChecked={item.dtrequestdone == null ? false : true}
                      offTrackColor={item.dtcancellation != null ? "black" : item.priority == "CRITICAL" ? "red.600" : "#FFFF00"}
                      {...NativeBaseProps.SWITCH}
                    />
                  </HStack>

                  <HStack space={2}>

                    <HStack space={1}>
                      <Text  {...NativeBaseProps.TEXT_DESCRIPTION_REQUESTS_TITLE}>
                        BY:
                      </Text>
                      <Text  {...NativeBaseProps.TEXT_DESCRIPTION_REQUESTS}>
                        {item.whoresquested}
                      </Text>
                    </HStack>

                    <Divider {...NativeBaseProps.DIVIDER} />

                    <HStack space={1}>
                      <Text {...NativeBaseProps.TEXT_DESCRIPTION_REQUESTS_TITLE}>
                        Time Req.:
                      </Text>
                      <Text {...NativeBaseProps.TEXT_DESCRIPTION_REQUESTS} fontWeight={"bold"}>
                        {item.dtrequested}
                      </Text>
                    </HStack>

                    <Divider {...NativeBaseProps.DIVIDER} />

                    <HStack space={1}>
                      <Text {...NativeBaseProps.TEXT_DESCRIPTION_REQUESTS_TITLE}>
                        Time Done.:
                      </Text>
                      <Text {...NativeBaseProps.TEXT_DESCRIPTION_REQUESTS}>
                        {item.dtrequestdone}
                      </Text>
                    </HStack>

                  </HStack>

                  <HStack>
                    <Text {...NativeBaseProps.TEXT_DESCRIPTION_REQUESTS_TITLE}>
                      DSC:
                    </Text>
                    <Text {...NativeBaseProps.TEXT_DESCRIPTION_REQUESTS}>
                      {item.requestdsc}
                    </Text>
                  </HStack>

                  <HStack space={2} alignItems={"center"} justifyContent={"space-between"}>
                    <Button
                      shadow={9}
                      _text={
                        {
                          fontWeight: "bold",
                          fontSize: "16",
                        }
                      }
                      h={"40px"}
                      w={"200px"}
                      endIcon={<Icon size={9} as={MaterialIcons} name="read-more" />}
                      onPress={() => {
                        setTimeStamp(dateNow.getTime());
                        setRequestDetails(item);
                        onOpen();
                      }}
                    >
                      <Text justifyContent={"center"} {...NativeBaseProps.TEXT_DESCRIPTION_REQUESTS_TITLE}>
                        DETAILS
                      </Text>
                    </Button>
                  </HStack>

                </VStack>
              )
            })}
          </CollapseBody>
        </Collapse>

      </ScrollView>
      {requestDetail !== null && <CompoRequestDetails
        id_whocancelled={user.payload.idpeople}
        token_api={user.payload.tokenapi}
        joblevel={user.payload.joblevel}
        requestDetail={requestDetail}
        isOpen={isOpen} onClose={onClose}
        onOpen={onOpen}
        onRefresh={onRefresh}
        timeStamp={timeStamp}
        userAccess={userAccess}
      />}
    </Box>
  )
}


const NativeBaseProps = {
  VSTACK_FLATLIST: {
    space: 3,
    mt: 3,
    bgColor: "trueGray.700",
    w: "98%",
    h: Platform.OS == "android" ? "195" : "195",
    alignSelf: "center",
    p: 5,
    pt: Platform.OS == "android" ? 0 : 4,
    borderWidth: 3,
    borderRadius: 10,
    borderColor: "#06d9ff"
  },
  CENTER: {
    flexDirection: "row",
    width: "100%"
  },
  TEXT_DESCRIPTION_OPENREQ_SECTION: {
    fontWeight: "bold",
    fontSize: 14,
    color: "white",
  },
  TEXT_DESCRIPTION_OPENREQ_SECTION_INFO: {
    fontSize: 14,
    color: "white",
  },
  HSTACK_LIST_OPEN_REQUESTS: {
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
  DIVIDER: {
    bg: "gray.800",
    thickness: "2",
    orientation: "vertical"
  },
  SWITCH: {
    onTrackColor: "#00FF00"
  },
  TEXT_DESCRIPTION_REQUESTS: {
    fontSize: 14,
    color: "#06d9ff",
  },
  TEXT_DESCRIPTION_REQUESTS_TITLE: {
    fontWeight: "bold",
    fontSize: 14,
    color: "white",
  },
  LINEAR_BACK_GROUND_COLOR: {
    colors: ['#00b9f3', '#061b21', '#061b21'],
    start: [1, 0],
    end: [0, 3],
    locations: [0.7, 0.1, 0.2],
    style: { flex: 1 },
  },
  HSTACK_FLATLIST_ITEM: {
    space: 1,
    flexWrap: "wrap",
    alignItems: "center",
    alignSelf: "center",
    minH: 60,
    borderTopRadius: 5,
    bgColor: "rgba(255,255,255,0.4)",
    mb: 0
  },
  HSTACK_HEADER: {
    space: 1,
    flexWrap: "wrap",
    alignItems: "center",
    alignSelf: "center",
    minH: 60,
    borderBottomWidth: 4,
    borderBottomColor: "#00b9f3",
    borderRadius: 5,
    my: 1,
    bgColor: "rgba(0,185,243,0.5)"
  }
}


export default memo(CompoRequests);

