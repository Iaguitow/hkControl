import React,{useEffect, useState, memo} from 'react';
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { ActionRequestLog } from "../Actions/ActionRequestLog";

import {
    Box,
    Text,
    Center,
    Icon,
    Actionsheet,
    ScrollView,
    Divider,
    VStack,
    HStack
} from "native-base";

function notificationList({ isOpen, onClose }) {

    const navigations = useNavigation();
    const dispatch = useDispatch();

    const getIcon = (logType) => {
        switch (logType) {
            case 'UPDATED':
                return "update";
            case 'INSERTED':
                return "fiber-new";
            case 'CANCELED':
                return "cancel";
            default:
                return undefined;
        }
    };

    const getColorIcon = (logType) => {
        switch (logType) {
            case 'UPDATED':
                return "green.400";
            case 'INSERTED':
                return "rgb(0,185,243)";
            case 'CANCELED':
                return "red.400";
            default:
                return undefined;
        }
    };

    const user = useSelector(state => state.reducerLogin);
    const getRequestLog = (idpeople,token_api) => {dispatch(ActionRequestLog.getRequestLogs(idpeople,token_api)) }

    useEffect(()=>{
        const token_api = user.payload.tokenapi;
        const idpeople = user.payload.idpeople;
        getRequestLog(idpeople,token_api);

        return () =>{
            return;
        }
    },[isOpen==true?true:null])

    const requestlogs = useSelector(state => state.reducerRequestLog);
    const log = [];

    if (requestlogs.payload.logs !== null) {
        for (var i = 0, ii = requestlogs.payload.logs.length; i < ii; i++) {
            
            log.push({
                dtlog: requestlogs.payload.logs[i].dtlog,
                finaldescription: requestlogs.payload.logs[i].finaldescription,
                howmanylogsnotseen: requestlogs.payload.logs[i].howmanylogsnotseen,
                logtype: requestlogs.payload.logs[i].logtype,
                seen: requestlogs.payload.logs[i].seen,
                fk_requests: requestlogs.payload.logs[i].fk_requests,
                dtcancellation: requestlogs.payload.logs[i].dtcancellation,
                reason: requestlogs.payload.logs[i].reason,
                requesttimedealyed: requestlogs.payload.logs[i].requesttimedealyed,
                fulldtrequest: requestlogs.payload.logs[i].fulldtrequest,
                fulldtrequestdone: requestlogs.payload.logs[i].fulldtrequestdone,
                fullwhoresquested: requestlogs.payload.logs[i].fullwhoresquested,
                requestdsc: requestlogs.payload.logs[i].requestdsc,
                roomnumber: requestlogs.payload.logs[i].roomnumber,
                priority: requestlogs.payload.logs[i].priority,
                responsiblePhoneNumber: requestlogs.payload.logs[i].responsiblePhoneNumber,
                responsible: requestlogs.payload.logs[i].responsible,
                whocancelled: requestlogs.payload.logs[i].whocancelled,
                timeStampRequested: requestlogs.payload.logs[i].timeStampRequested
            });
        }
    }
    
    return (
        <Center>
            <Actionsheet isOpen={isOpen} onClose={onClose} size="full">
                <Actionsheet.Content>
                    <ScrollView w="100%">
                        <Box w="100%" h={60} px={4} justifyContent="center">
                            <Text fontSize="18" color="gray.600" fontWeight={"bold"}>
                                NEWS
                            </Text>
                        </Box>
                        <Divider thickness={4} bgColor={"rgb(0,185,243)"} borderRadius={10} ></Divider>
                        {log.map((item, index) => {
                            return (
                                <Box w="100%" justifyContent="center" key={index}>
                                    <Actionsheet.Item 
                                        startIcon={<Icon color={getColorIcon(item.logtype.toString())} as={MaterialIcons} size="8" name={getIcon(item.logtype.toString())} />}
                                        onPress={() =>{
                                            onClose();
                                            navigations.navigate("Requests",{
                                                item
                                            });
                                            //setOpenDetails(true);
                                        }}
                                        >
                                        <VStack>
                                            <Text py={1.5} fontSize="14" color="gray.600" fontWeight={"bold"}>
                                                {item.finaldescription.toString()}
                                            </Text>
                                            <Text py={1.5} fontSize="14" color="gray.600" fontWeight={"bold"}>
                                                { item.dtlog.toString() }
                                            </Text>

                                            <HStack>
                                            <Text py={1.5} fontSize="14" color="gray.600" fontWeight={"bold"}>
                                                { "PRIORITY: " }
                                            </Text>
                                            <Text 
                                                py={1.5} 
                                                fontSize="14" 
                                                color = {item.priority == "CRITICAL"?"red.600":"yellow.600"}
                                                fontWeight={"bold"}
                                            >
                                                { item.priority }
                                            </Text>
                                            </HStack>

                                            <HStack>
                                            <Text py={1.5} fontSize="14" color="gray.600" fontWeight={"bold"}>
                                                { "STATUS: " }
                                            </Text>
                                            <Text 
                                                py={1.5} 
                                                fontSize="14" 
                                                color = {item.dtcancellation?"red.600":"green.600"}
                                                fontWeight={"bold"}
                                            >
                                                { item.dtcancellation?"CANCELED":item.fulldtrequestdone?"DONE":"NEW REQUEST!" }
                                            </Text>
                                            </HStack>
                                        </VStack>
                                        
                                    </Actionsheet.Item>
                                    <Divider thickness={2}></Divider>
                                </Box>
                                    )
                                })
                        }
                    </ScrollView>
                </Actionsheet.Content>
                
            </Actionsheet>
        </Center>
    );
}

export default memo(notificationList);