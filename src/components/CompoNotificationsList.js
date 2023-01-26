import React,{useEffect, useState} from 'react';
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import generalUtils from '../utils/GeneralUtils';
import { ActionRequestLog } from "../Actions/ActionRequestLog";
import CompoApiLoadingView from "../components/CompoApiLoadingView"

import {
    Box,
    Text,
    Center,
    Icon,
    Actionsheet,
    ScrollView,
    Divider,
    VStack
} from "native-base";

export default function notificationList({ isOpen, onClose }) {

    const navigations = useNavigation();
    const dispatch = useDispatch();

    const [showLoading, setShowLoading] = useState(true);

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
    const getRequestLog = (idpeople,token_api, setShowLoading) => {dispatch(ActionRequestLog.getRequestLogs(idpeople,token_api,setShowLoading)) }

    useEffect(()=>{
        const token_api = user.payload.tokenapi;
        const idpeople = user.payload.idpeople;
        getRequestLog(idpeople,token_api,setShowLoading);

        return () =>{
            return;
        }
    },[isOpen==true?true:null])

    const requestlogs = useSelector(state => state.reducerRequestLog);
    const log = [];
    let logDateTimeString = null;

    if (requestlogs.payload.logs !== null) {
        for (var i = 0, ii = requestlogs.payload.logs.length; i < ii; i++) {
            logDateTimeString = generalUtils.date_DBformat(requestlogs.payload.logs[i].dtlog,1);
            log.push({
                dtlog: logDateTimeString,
                finaldescription: requestlogs.payload.logs[i].finaldescription,
                howmanylogsnotseen: requestlogs.payload.logs[i].howmanylogsnotseen,
                logtype: requestlogs.payload.logs[i].logtype,
                seen: requestlogs.payload.logs[i].seen
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
                                            navigations.navigate("Requests");
                                        }}
                                        >
                                        <VStack>
                                            <Text py={1.5} fontSize="14" color="gray.600" fontWeight={"bold"}>
                                                {item.finaldescription.toString()}
                                            </Text>
                                            <Text py={1.5} fontSize="14" color="gray.600" fontWeight={"bold"}>
                                                { item.dtlog.toString() }
                                            </Text>
                                        </VStack>
                                        
                                    </Actionsheet.Item>
                                    <Divider thickness={2}></Divider>
                                </Box>
                                    )
                                })
                        }
                    </ScrollView>
                    {showLoading && <CompoApiLoadingView></CompoApiLoadingView>}
                </Actionsheet.Content>
                
            </Actionsheet>
        </Center>
    );
}