import React, { useState, useEffect, useRef } from "react"
import { Animated } from 'react-native';
import { useSelector, useDispatch } from "react-redux";
import { Entypo,AntDesign } from "@expo/vector-icons";
import {
    Center,
    Modal,
    Input,
    TextArea,
    Select,
    CheckIcon,
    Button,
    Icon,
    VStack,
    HStack,
    Text,
    Checkbox,
    Divider
} from "native-base";
import CompoLoadingView from "../components/CompoApiLoadingView";
import { actionsTypesAPI } from "../Actions/ConstActionsApi";
import generalUtils from "../utils/GeneralUtils";
import Alerts from "./CompoAlerts";
import Toasts from "./CompoToast";

import { RequestActions } from "../Actions/ActionRequests";

const ModalNewRequest = ({ isMounted, showModal, setShowModal, setIsMounted }) => {

    const dispatch = useDispatch();
    const user = useSelector(state => state.reducerLogin);
    const rooms = useSelector(state => state.reducerRooms);
    const requests = useSelector(state => state.reducerRequests);
    const requestsType = useSelector(state => state.reducerRequestType);
    const insertNewRequest = (requestObj, token_api, idpeople, joblevel) => {dispatch(RequestActions.insertNewRequest(requestObj, token_api, idpeople, joblevel, {setIsMounted, startEffect, setShowModal})) }

    const [requestType, setRequestType] = useState("");
    const [idTypeRequest, setIdTypeRequest] = useState("");
    const [priorityValue, setPriorityValue] = useState(false);
    const [disabledTextArea, setDisabledTextArea] = useState(user.payload.profession=="RECEPTIONIST"?true:false);
    const [textAreaValue, setTextAreaValue] = useState("");
    const [amountValue, setAmountValue] = useState("");
    const [roomValue, setRoomValue] = useState("");
    const [isOpenAlert, setIsOpenAlert] = React.useState(false);
    const [alertType, setIsAlertType] = React.useState("Error");
    const [fadeEffect,setFadeEffect] = useState(new Animated.Value(0));

    useEffect(() => {
        setRequestType("");
        setTextAreaValue("");
        setAmountValue("");
        setRoomValue("");
        setPriorityValue(false);
        setFadeEffect(new Animated.Value(0));
        
        if(requests.api_status === actionsTypesAPI.STATUS_OK){
            if(typeof requests.payload.requests == "boolean"){
                setIsOpenAlert(!requests.payload.request);
                return;
            }
        }
        
    },[requests.api_inserts_requests]);

    const startEffect = () =>{
        Animated.timing(fadeEffect,{
            toValue: 1,
            duration: 1500,
            useNativeDriver: true
          }).start(() =>{returnEffect();});
    }

    const returnEffect = () =>{
        Animated.timing(fadeEffect,{
            toValue: 0,
            duration: 1500,
            useNativeDriver: true
          }).start();
    }

    const requestTypeArray = [];

    if (requestsType.payload.requestType != null) {
        for (var i = 0, ii = requestsType.payload.requestType.length; i < ii; i++) {
            requestTypeArray.push({
                id: requestsType.payload.requestType[i].idrequests,
                requestTypeDescription: requestsType.payload.requestType[i].resquestdescription
            });
        }
    }

    return (
        <Center>
            <Modal avoidKeyboard={true} closeOnOverlayClick={false} size={"xl"} isOpen={showModal} onClose={() => {
                    setRequestType("");
                    setTextAreaValue("");
                    setAmountValue("");
                    setRoomValue("");
                    setPriorityValue(false);
                    setFadeEffect(new Animated.Value(0));
                    setShowModal(false);
                }}>
                <Modal.Content >
                    <Modal.CloseButton />
                    <Modal.Header>NEW REQUEST</Modal.Header>
                    <Modal.Body>
                        <VStack space={2}>
                            <Text {...NATIVEBASE_PROPS.TEXT}> CHOOSE ANY PRE-DEFINIED REQUEST: </Text>
                            <Select
                                selectedValue={requestType}
                                onValueChange={itemValue => {
                                        setRequestType(itemValue);
                                        if(itemValue !== "OTHER" && itemValue !== ""){
                                            let selectedRequest = requestTypeArray.filter(function (e) {
                                                return e.requestTypeDescription === itemValue.toString();
                                            });

                                            setIdTypeRequest(selectedRequest[0].id);
                                        }

                                    }
                                }
                                {...NATIVEBASE_PROPS.SELECT}
                            >
                                <Select.Item {...NATIVEBASE_PROPS.SELECT_ITEM} _text={{fontWeight:"bold"}} label="OTHER" value="OTHER" />
                                {
                                    requestTypeArray.map((item, index) => {
                                        return (
                                            <Select.Item 
                                                _text={
                                                        {
                                                            fontWeight:"bold",
                                                            color:item.requestTypeDescription.toString().includes("IN")?"green.700":"red.700"
                                                        }
                                                    } 
                                                {...NATIVEBASE_PROPS.SELECT_ITEM} key={index} 
                                                label={item.requestTypeDescription} value={item.requestTypeDescription} 
                                            />
                                        );
                                    })
                                }
                            </Select>
                            <Divider {...NATIVEBASE_PROPS.DIVIDERS} />
                            <HStack {...NATIVEBASE_PROPS.HSTACK}>
                                <VStack {...NATIVEBASE_PROPS.VSTACK_DETAILS_AMOUNT_ROOM}>
                                    <Text {...NATIVEBASE_PROPS.TEXT}> AMOUNT: </Text>
                                    <Input 
                                        {...NATIVEBASE_PROPS.INPUT} 
                                        placeholder={"Amount"} 
                                        maxLength={2} 
                                        value={amountValue}
                                        onChangeText={(amount) => {
                                            setAmountValue(amount);
                                        }}
                                    />
                                </VStack>
                                <VStack {...NATIVEBASE_PROPS.VSTACK_DETAILS_AMOUNT_ROOM}>
                                    <Text {...NATIVEBASE_PROPS.TEXT}> ROOM: </Text>
                                    <Input 
                                        {...NATIVEBASE_PROPS.INPUT} 
                                        placeholder={"Room"} 
                                        maxLength={3} 
                                        value={roomValue}
                                        onChangeText={(room) =>{
                                            setRoomValue(room);
                                        }}
                                        onEndEditing={() =>{
                                            if(requestType!=="OTHER"){
                                                setTextAreaValue("Room: "+roomValue+" | "+"Amount: "+amountValue+" - "+requestType);
                                            }
                                        }}          
                                    />
                                </VStack>
                                <VStack {...NATIVEBASE_PROPS.VSTACK_CHECKBOX}>
                                    <Text mt={-1.5} {...NATIVEBASE_PROPS.TEXT}> PRIORITY: </Text>
                                    <Checkbox {...NATIVEBASE_PROPS.CHECKBOX}
                                        isChecked={priorityValue}
                                        onChange={(value) =>{
                                            setPriorityValue(!priorityValue);
                                        }}
                                     />
                                </VStack>
                            </HStack>
                            <Divider {...NATIVEBASE_PROPS.DIVIDERS} />
                            <Text {...NATIVEBASE_PROPS.TEXT}> REQUEST DESCRIPTION: </Text>
                            <TextArea
                                isDisabled={disabledTextArea}
                                onChangeText={(text) =>{
                                    if(requestType!=="OTHER"){
                                        setTextAreaValue("Room: "+roomValue+" | "+"Amount: "+amountValue+" - "+requestType + " " + text);
                                    }
                                    setTextAreaValue(text);
                                }}
                                {...NATIVEBASE_PROPS.TEXTAREA}
                            >
                            {textAreaValue}
                            </TextArea>
                        </VStack>
                        <Divider mt={3} {...NATIVEBASE_PROPS.DIVIDERS} />
                    </Modal.Body>
                    <Modal.Footer>                                 
                        <Button.Group space={2}>
                            <Button variant="outline" borderWidth={2} borderColor="red.400" onPress={() => {
                                setShowModal(false);
                            }}>
                                <Text {...NATIVEBASE_PROPS.TEXT}> CANCEL </Text>
                            </Button>
                            <Button onPress={() => {

                                setIsMounted(true);
                                if(requestType == "" || amountValue == "" || roomValue == "" || (requestsType=="OTHER" && textAreaValue == "") || (!generalUtils.validateRooms(roomValue, rooms, requestType))){
                                    setIsOpenAlert(true);
                                    setIsMounted(false);
                                    return;
                                }
                                
                                var responsible = user.payload.idpeople;
                                var idrequest = requestType!="OTHER"?idTypeRequest:null;
                                var who_requested = user.payload.idpeople;
                                var roomnumber = roomValue;
                                var amount = amountValue;
                                var priority = priorityValue?"C":"N";
                                var finaldescription = textAreaValue;
                                var profession = user.payload.profession;
                                var joblevel = user.payload.joblevel;
                                var requestObject = {responsible, idrequest, who_requested, roomnumber, amount, priority, finaldescription, profession}
                                var token_api = user.payload.tokenapi;
                                var idpeople = user.payload.idpeople;
                                
                                insertNewRequest(requestObject, token_api, idpeople, joblevel, {setIsMounted, startEffect, setShowModal});
                                
                                if(requests.api_status === actionsTypesAPI.STATUS_OK){
                                    Toasts.showToast("Request Successfully Saved");
                                }

                            }}>
                                <Text color={"white"} {...NATIVEBASE_PROPS.TEXT}> SAVE </Text>
                            </Button>
                            <Animated.View style={{opacity:fadeEffect}}>
                                <Icon name="checkcircle" size={"lg"} color={"green.500"} alignSelf={"center"} as={AntDesign} />
                            </Animated.View>
                        </Button.Group>
                    </Modal.Footer>
                    {isMounted && <CompoLoadingView />}
                </Modal.Content>
            </Modal>
            <Alerts alertType={alertType} isOpenAlert={isOpenAlert} setIsOpenAlert={setIsOpenAlert}/>
        </Center>
    );
};

const NATIVEBASE_PROPS = {
    VSTACK_DETAILS_AMOUNT_ROOM: {
        alignSelf: "center",
        alignItems: "center",
        width: "25%"
    },
    HSTACK: {
        space: 5,
        alignSelf: "center",
        alignItems: "center"
    },
    SELECT_ITEM:{
        borderBottomWidth: 3,
        borderColor: "#00b9f3",
    },
    SELECT: {
        minWidth: "200",
        fontSize: 16,
        height: 50,
        borderWidth: 2,
        borderColor: "#00b9f3",
        accessibilityLabel: "Choose Request",
        placeholder: "Choose Request",
        borderRadius: 10,
        _selectedItem: {
            bg: "#00b9f3",
            endIcon: <CheckIcon size="5" />,
        },
        dropdownIcon: <Icon name="chevron-down" size={"sm"} color={"#00b9f3"} as={Entypo} />,
        mt: 1
    },
    CHECKBOX: {
        size: "lg",
        value: "danger",
        colorScheme: "danger",
        accessibilityLabel: "PRIORITY"
    },
    DIVIDERS: {
        alignSelf: "center",
        bgColor: "coolGray.300",
        thickness: "3",
        orientation: "horizontal",
        w: "98%"
    },
    VSTACK_CHECKBOX: {
        space: 2,
        alignSelf: "center",
        alignItems: "center"
    },
    TEXT: {
        fontWeight: "bold"
    },
    ICON_INPUT: {
        color: "rgb(0,185,243)",
        size: 8,
        ml: "2"
    },
    TEXTAREA: {
        totalLines: 20,
        h: 150,
        placeholder: "DESCRIPTION",
        w: "100%",
        autoCapitalize: "none",
        selectionColor: "black",
        color: "black",
        borderRadius: 10,
        borderWidth: 2,
        borderColor: "rgb(0,185,243)",
        fontSize: "md",
        placeholderTextColor: "rgb(0,185,243)",
        autoCompleteType: 'off',
        alignSelf: "center",
        _disabled:{bgColor:"gray.200"}
    },
    INPUT: {
        w: "100%",
        textAlign: "center",
        keyboardType: "numeric",
        autoCapitalize: "none",
        selectionColor: "black",
        color: "black",
        borderRadius: 10,
        borderWidth: 2,
        borderColor: "rgb(0,185,243)",
        fontSize: 18,
        placeholderTextColor: "rgb(0,185,243)",
        autoCompleteType: 'off',
        alignSelf: "center"
    }
}

export default ModalNewRequest;