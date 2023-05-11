import React,{useEffect, useState, memo, useCallback } from 'react';
import DialogInput from 'react-native-dialog-input';
import { MaterialIcons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import generalUtils from '../utils/GeneralUtils';
import { ActionRequestLog } from "../Actions/ActionRequestLog";
import CompoApiLoadingView from "../components/CompoApiLoadingView"

import {
    Box,
    Text,
    Center,
    HStack,
    Icon,
    Actionsheet,
    ScrollView,
    Divider,
    VStack,
    Switch
} from "native-base";

function requestDetails({userAccess,id_whocancelled, token_api, joblevel, requestDetail, isOpen, onClose, onOpen, onRefresh, timeStamp}) {

    const dispatch = useDispatch();

    const [showLoading, setShowLoading] = useState(false);

    const [visibleCancelDialog, setVisibleCancelDialog] = useState(false);

    const handleDialogCancellaion = () => {
        setVisibleCancelDialog(false);
        setShowLoading(false);
    }

    const insertNewRquest_Log = (requestCancellationObj, token_api,setShowLoading) => {dispatch(ActionRequestLog.insertNewRequest(requestCancellationObj, token_api,setShowLoading, onRefresh)) }

    const [numberSecs, setNumberSecs] = useState(0);
    const [numberMin, setNumberMin] = useState(0);
    const [numberHour, setNumberHour] = useState(0);

    const [timerId, setTimerId] = useState(0);
    
    let timer = null;
    const increment = (hoursDifference, minutesDifference, secondsDifference) => {
          let counterSecs = secondsDifference;
          let counterMin = minutesDifference;
          timer = setInterval(()=>{

            hoursDifference>0?setNumberHour(hoursDifference):null;
            minutesDifference>0?setNumberMin(minutesDifference):null;

            counterSecs<60?setNumberSecs((previousTime) => {return previousTime+1+secondsDifference>60?60:previousTime+1+secondsDifference}):setNumberSecs(60);

            secondsDifference = 0;
            minutesDifference = 0;
            hoursDifference = 0;
            counterSecs += 1;

            if(counterSecs>=60){
                counterSecs=0
                setNumberSecs(0);

                counterMin<60?setNumberMin((previousTime) => previousTime+1):setNumberMin(60);
                counterMin +=1;

                if(counterMin>=60){
                    counterMin=0;
                    setNumberMin(0);
                    setNumberHour((previousTime) => previousTime+1);
                };
            }
        },1000);
        setTimerId(timer);
        return(()=>{
            clearInterval(timerId);
        })
    }

    useEffect(()=>{
        const dateStampRequest = new Date(requestDetail.timeStampRequested.toString());
        const dateNow = new Date();
        var difference = dateNow.getTime() - dateStampRequest.getTime();

        /*var daysDifference = Math.floor(difference/1000/60/60/24);
        difference -= daysDifference*1000*60*60*24*/

        var hoursDifference = Math.floor(difference/1000/60/60);
        difference -= hoursDifference*1000*60*60;
    
        var minutesDifference = Math.floor(difference/1000/60);
        difference -= minutesDifference*1000*60;
    
        var secondsDifference = Math.floor(difference/1000);


        increment(hoursDifference, minutesDifference, secondsDifference);
    },[timeStamp]);
    
    return (
        <Center>
            <Actionsheet isOpen={isOpen}
                onClose={()=>{
                    onClose();
                    clearInterval(timerId);
                    setNumberHour(0);
                    setNumberMin(0);
                    setNumberSecs(0);
                }} 
                size="full"
            >
                <Actionsheet.Content
                    backgroundColor={"coolGray.200"}
                >
                    <DialogInput 
                        isDialogVisible={visibleCancelDialog}
                        title={"CANCELLATION REASON"}
                        message={"Message for Feedback"}
                        hintInput ={"Enter Text"}
                        submitInput={ (inputText) => {

                        if(inputText == "" || inputText == undefined){
                            alert("Please Enter Text");
                            return;
                        }

                        var requestCancellationObj = {
                            reason: inputText,
                            fk_request: requestDetail.idresquests,
                            fk_whocancelled: id_whocancelled,
                        }

                        clearInterval(timerId);
                        setVisibleCancelDialog(false);
                        insertNewRquest_Log(requestCancellationObj,token_api,setShowLoading, onRefresh);
                        onClose();
                    }}
                    closeDialog={() => {
                        handleDialogCancellaion();
                    }}>
                </DialogInput>

                    <ScrollView w="100%">
                        <Box flex={1} flexDir={"row"} alignItems={"center"} justifyContent="center">
                            <HStack space={20}>
                                <Text fontSize="18" color="green.600" fontWeight={"bold"}>
                                    Room - {requestDetail.roomnumber}
                                </Text>

                                {/*<Text fontSize="18" color={requestDetail.requesttimedealyed == null?"green.600":"red.600"} fontWeight={"bold"}>
                                    {requestDetail.requesttimedealyed == null?"DONE!":"Delayed: "} {requestDetail.requesttimedealyed}
                                </Text>*/}
                                {<Text fontSize="18" color={requestDetail.requesttimedealyed == null?requestDetail.dtcancellation !== null?"red.600":"green.600":"red.600"} fontWeight={"bold"}>
                                    {requestDetail.dtcancellation !== null?"CANCELED":requestDetail.requesttimedealyed == null?"DONE!":numberHour.toString().padStart(2,"0")+":"+numberMin.toString().padStart(2,"0")+":"+numberSecs.toString().padStart(2,"0")}
                                </Text>}
                            </HStack>
                        </Box>

                        <Divider thickness={4} bgColor={"rgb(0,185,243)"} borderRadius={10} ></Divider>

                        <Actionsheet.Item backgroundColor={"coolGray.200"}>
                            <VStack space={4}>
                                <VStack>
                                    <Text {...NativeBaseProps.SUB_TEXT}>
                                        WHO REQUESTED:
                                    </Text>
                                    <Text>
                                        {requestDetail.fullwhoresquested}
                                    </Text>
                                </VStack>

                                <Divider thickness={1}></Divider>

                                <HStack space={250} w={"100%"} flexDir={"row"}>
                                    <VStack>
                                        <Text {...NativeBaseProps.SUB_TEXT}>
                                            RESPONSIBLE:
                                        </Text>
                                        <Text>
                                            {requestDetail.responsible}
                                        </Text>
                                    </VStack>
                                
                                    <Icon
                                        position={"absolute"}
                                        marginLeft={"300px"}
                                        size={"40px"}
                                        as={<MaterialIcons  name={"phone-enabled"}/>}
                                        color={"rgb(0,185,243)"}
                                        onPress={()=>{
                                            generalUtils.callNumber(requestDetail.responsiblePhoneNumber);
                                        }}
                                    />
                                </HStack>

                                <Divider thickness={1}></Divider>

                                <VStack>
                                    <Text {...NativeBaseProps.SUB_TEXT}>
                                        DATE & TIME REQUESTED:
                                    </Text>
                                    <Text>
                                        {requestDetail.fulldtrequest}
                                    </Text>
                                </VStack>

                                <Divider thickness={1}></Divider>

                                <VStack>
                                    <Text {...NativeBaseProps.SUB_TEXT}>
                                        DATE & TIME DONE:
                                    </Text>
                                    <Text>
                                        {requestDetail.fulldtrequestdone}
                                    </Text>
                                </VStack>

                                <Divider thickness={1}></Divider>

                                <VStack>
                                    <Text {...NativeBaseProps.SUB_TEXT}>
                                        DESCRIPTION:
                                    </Text>
                                    <Text color={requestDetail.requestdsc.includes("IN |")?"green.500":requestDetail.requestdsc.includes("OUT |")?"red.500":"black"}>
                                        {requestDetail.requestdsc}
                                    </Text>
                                </VStack>

                                <Divider thickness={1}></Divider>
                                
                                <VStack>
                                    <Text {...NativeBaseProps.SUB_TEXT}>
                                        PRIORITY:
                                    </Text>
                                    <Text fontWeight={"bold"} color={requestDetail.priority=="NORMAL"?"yellow.500":"red.500"}>
                                        {requestDetail.priority}
                                    </Text>
                                </VStack>

                                <Divider thickness={4}></Divider>

                                <Text fontSize="18" color="gray.600" fontWeight={"bold"}>
                                    CANCELLATION DATA:
                                </Text>

                                <HStack space={20}>
                                    <VStack space={2}>
                                        <Text {...NativeBaseProps.SUB_TEXT} >
                                            CANCEL:
                                        </Text>
                                        <Switch
                                            disabled={
                                                userAccess.screenFunctionsAccess.CANCEL_REQUEST==="N" || requestDetail.fulldtrequestdone !== null 
                                                || requestDetail.dtcancellation !== null ?true:false
                                            }
                                            isChecked={requestDetail.dtcancellation !== null ?true:false}
                                            onToggle={() => {
                                                setShowLoading(true);
                                                setVisibleCancelDialog(true);

                                            }} 
                                            //isChecked={item.cancelled==null?false:true}
                                            onTrackColor={"red.900"}
                                            onThumbColor={"red.400"}
                                            offTrackColor={requestDetail.dtcancellation !== null?"red.700":"coolGray.400"}
                                            offThumbColor={"coolGray.600"} 
                                        />
                                    </VStack>
                                    <VStack>
                                        <Text {...NativeBaseProps.SUB_TEXT}>
                                            CANCELLATION DATE:
                                        </Text>
                                        <Text>
                                            {requestDetail.dtcancellation}
                                        </Text>
                                    </VStack>
                                </HStack>

                                <VStack>
                                        <Text {...NativeBaseProps.SUB_TEXT}>
                                            CANCELED BY:
                                        </Text>
                                        <Text>
                                            {requestDetail.whocancelled}
                                        </Text>
                                </VStack>

                                <VStack>
                                    <Text {...NativeBaseProps.SUB_TEXT}>
                                        CANCELLATION REASON:
                                    </Text>
                                    <Text>
                                        {requestDetail.reason}
                                    </Text>
                                </VStack>

                            </VStack>
                        </Actionsheet.Item>
                    </ScrollView>
                    {showLoading && <CompoApiLoadingView></CompoApiLoadingView>}
                </Actionsheet.Content>
                
            </Actionsheet>
        </Center>
    );
}

const NativeBaseProps = {
    SUB_TEXT:{
        fontWeight:"bold", 
        color:"rgb(0,185,243)",
        fontSize:"12px",
        
    }
}

export default memo(requestDetails)