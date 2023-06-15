import {
    Center,
    Modal,
    Input,
    CheckIcon,
    Button,
    Icon,
    VStack,
    HStack,
    Text,
    Checkbox,
    Divider,
    View,
    KeyboardAvoidingView,
    TextArea
} from "native-base";

import React, { useState, useEffect, useRef } from "react"
import { Animated } from 'react-native';
import { useSelector, useDispatch } from "react-redux";
import { Entypo, AntDesign } from "@expo/vector-icons";
import CompoLoadingView from "../components/CompoApiLoadingView";
import ModalSelect from "./CompoModalMultSelect";
import ModalSingleSelect from "./CompoSingleSelectInOut";
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
    const insertNewRequest = (userAccess, requestObj, token_api, idpeople, joblevel) => { dispatch(RequestActions.insertNewRequest(userAccess, requestObj, token_api, idpeople, joblevel, { setIsMounted, startEffect, setShowModal, handleFeedbackToast })) }


    const [priorityValue, setPriorityValue] = useState(false);
    const [selectIsDisabled, setSelectIsDisabled] = useState(true);
    const [saveButtonIsDisabled, setSaveButtonIsDisabled] = useState(true);
    const [amountValue, setAmountValue] = useState(1);
    const [roomValue, setRoomValue] = useState("");
    const [instructionValue, setInstructionValue] = useState("");
    const [isOpenAlert, setIsOpenAlert] = React.useState(false);
    const [alertType, setIsAlertType] = React.useState("Error");
    const [fadeEffect, setFadeEffect] = useState(new Animated.Value(0));


    const [multRequests, setMultRequests] = useState([]);


    const screenAccess = user.payload.screenAccess;
    const screenFunctionsAccess = user.payload.screenFunctionAccess
    const userAccess = { screenAccess, screenFunctionsAccess }


    useEffect(() => {
        setAmountValue(1);
        setRoomValue("");
        setMultRequests([]);
        setIsOpenAlert(false);
        setPriorityValue(false);
        setInstructionValue("");
        setSelectIsDisabled(true);
        setSaveButtonIsDisabled(true);
        setFadeEffect(new Animated.Value(0));

        if (requests.api_status === actionsTypesAPI.STATUS_OK) {
            if (typeof requests.payload.requests == "boolean") {
                setIsOpenAlert(!requests.payload.request);
                return;
            }
        }

    }, [requests.api_inserts_requests]);


    const startEffect = () => {
        Animated.timing(fadeEffect, {
            toValue: 1,
            duration: 1500,
            useNativeDriver: true
        }).start(() => { returnEffect(); });
    }


    const returnEffect = () => {
        Animated.timing(fadeEffect, {
            toValue: 0,
            duration: 1500,
            useNativeDriver: true
        }).start();
    }


    const requestTypeArray = [{ name: "REQUESTS: ", id: 0, children: [] }];


    if (requestsType.payload.requestType != null) {
        for (var i = 0, ii = requestsType.payload.requestType.length; i < ii; i++) {
            if (requestsType.payload.requestType[i].active == "Y") {
                requestTypeArray[0].children.push({
                    id: requestsType.payload.requestType[i].idrequests,
                    name: requestsType.payload.requestType[i].resquestdescription,
                    amount: 1,
                    type: "IN"
                });
            }
        }
    }


    const getResponsibleFromRoom = () => {

        for (let item of Object.keys(rooms.payload.rooms)) {
            if (rooms.payload.rooms[item].roomnumber.toString() == roomValue.toString() &&
                (user.payload.profession != "HOUSE STEWARD" && user.payload.profession != "PUBLIC AREA")
            ) {
                return rooms.payload.rooms[item].idpeople;
            }
        }
        return user.payload.idpeople;

    }

    const handleFeedbackToast = () => {
        Toasts.showToast("Request Successfully Saved");
    }


    return (
        <Center>
            <Modal closeOnOverlayClick={false} size={"xl"} isOpen={showModal} onClose={() => {
                setAmountValue(1);
                setRoomValue("");
                setPriorityValue(false);
                setInstructionValue("");
                setSelectIsDisabled(true);
                setIsOpenAlert(false);
                setSaveButtonIsDisabled(true);
                setFadeEffect(new Animated.Value(0));
                setShowModal(false);
            }}>
                <KeyboardAvoidingView style={{ width: '100%' }} behavior="position">
                    <Center>
                        <Modal.Content >
                            <Modal.CloseButton />
                            <Modal.Header>NEW REQUEST</Modal.Header>
                            <Modal.Body _scrollview={{nestedScrollEnabled:true, horizontal:false}}>
                                <VStack space={4}>
                                    <HStack>
                                        <Text {...NATIVEBASE_PROPS.STEPS_TEXT}> STEP 1 </Text>
                                        <Divider {...NATIVEBASE_PROPS.DIVIDERS} />
                                    </HStack>
                                    <Text {...NATIVEBASE_PROPS.TEXT}> SELECT ROOM AND PRIORITY: </Text>
                                    <HStack {...NATIVEBASE_PROPS.HSTACK}>
                                        <VStack {...NATIVEBASE_PROPS.VSTACK_DETAILS_AMOUNT_ROOM}>
                                            <Text {...NATIVEBASE_PROPS.TEXT}> ROOM: </Text>
                                            <Input
                                                {...NATIVEBASE_PROPS.INPUT}
                                                placeholder={"Room"}
                                                returnKeyType="done"
                                                maxLength={3}
                                                value={roomValue}
                                                onChangeText={(room) => {
                                                    setRoomValue(room);
                                                }}
                                                onEndEditing={() => {
                                                    if (!generalUtils.validateRooms(roomValue, rooms)) {
                                                        setIsOpenAlert(true);
                                                        setSelectIsDisabled(true);
                                                        return;
                                                    }
                                                    setSelectIsDisabled(false);

                                                }}
                                            />
                                        </VStack>
                                        <VStack {...NATIVEBASE_PROPS.VSTACK_CHECKBOX}>
                                            <Text mt={-1.5} {...NATIVEBASE_PROPS.TEXT}> PRIORITY: </Text>
                                            <Checkbox {...NATIVEBASE_PROPS.CHECKBOX}
                                                isChecked={priorityValue}
                                                onChange={(value) => {
                                                    setPriorityValue(!priorityValue);
                                                }}
                                            />
                                        </VStack>
                                    </HStack>
                                    <Text {...NATIVEBASE_PROPS.TEXT}> ADD INSTRUCTIONS: </Text>
                                    <TextArea
                                        {...NATIVEBASE_PROPS.TEXTAREA}
                                        onEndEditing={(e) => {
                                            setInstructionValue(e.nativeEvent.text.toString());
                                        }}
                                    />
                                    <HStack>
                                        <Text {...NATIVEBASE_PROPS.STEPS_TEXT}> STEP 2 </Text>
                                        <Divider {...NATIVEBASE_PROPS.DIVIDERS} />
                                    </HStack>

                                    <Text {...NATIVEBASE_PROPS.TEXT}> YOUR REQUESTS: </Text>
                                    <ModalSelect
                                        setMultRequests={setMultRequests}
                                        requestTypeArray={requestTypeArray}
                                        selectIsDisabled={selectIsDisabled}
                                        setSaveButtonIsDisabled={setSaveButtonIsDisabled}
                                        multRequests={multRequests}

                                    />
                                    {multRequests.map((requests, index) => {

                                        multRequests[index].responsible = getResponsibleFromRoom();
                                        multRequests[index].who_requested = user.payload.idpeople;
                                        multRequests[index].roomnumber = roomValue;
                                        multRequests[index].priority = priorityValue ? "C" : "N";
                                        multRequests[index].profession = user.payload.profession;
                                        multRequests[index].finaldescription = requests.name;
                                        multRequests[index].instructions = instructionValue;

                                        return (
                                            <View
                                                key={index}
                                            >
                                                <HStack space={1}
                                                >
                                                    <Input
                                                        {...NATIVEBASE_PROPS.INPUT_REQUEST_AMOUNT}
                                                        placeholder={"1"}
                                                        maxLength={2}
                                                        returnKeyType="done"
                                                        selectTextOnFocus={true}
                                                        selectionColor={"rgb(0,185,243)"}
                                                        _focus={
                                                            {selectionColor:"rgb(0,185,243)"}
                                                        }
                                                        key={requests.id}
                                                        onFocus={() => {
                                                            setSaveButtonIsDisabled(true);
                                                        }}
                                                        onEndEditing={(e) => {
                                                            for (let item of Object.keys(multRequests)) {
                                                                if (multRequests[item].id == requests.id) {
                                                                    multRequests[item].amount = e.nativeEvent.text === "" ? 1 : parseInt(e.nativeEvent.text);
                                                                }
                                                            }
                                                            setMultRequests(multRequests);
                                                            setSaveButtonIsDisabled(false);
                                                        }}
                                                    >
                                                        {requests.amount}
                                                    </Input>
                                                    <Input
                                                        {...NATIVEBASE_PROPS.INPUT_REQUEST}
                                                        value={requests.name.toUpperCase()}
                                                        key={requests.name}
                                                    />
                                                    <ModalSingleSelect
                                                        multRequests={multRequests}
                                                        setMultRequests={setMultRequests}
                                                        requests_id={requests.id}
                                                        requests_type={requests.type}
                                                    />
                                                </HStack>
                                                <Divider
                                                    {...NATIVEBASE_PROPS.DIVIDE_REQUEST}
                                                />
                                            </View>
                                        )
                                    }
                                    )
                                    }
                                </VStack>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button.Group space={2}>
                                    <Button variant="outline" borderWidth={2} borderColor="red.400" onPress={() => {
                                        setShowModal(false);
                                    }}>
                                        <Text {...NATIVEBASE_PROPS.TEXT}> CANCEL </Text>
                                    </Button>
                                    <Button
                                        disabled={saveButtonIsDisabled}
                                        opacity={saveButtonIsDisabled ? 0.4 : 1}
                                        onPress={() => {
                                            setIsMounted(false);

                                            var joblevel = user.payload.joblevel;
                                            var token_api = user.payload.tokenapi;
                                            var idpeople = user.payload.idpeople;

                                            insertNewRequest(userAccess, multRequests, token_api, idpeople, joblevel, { setIsMounted, startEffect, setShowModal, handleFeedbackToast });

                                            /*if(requests.api_status === actionsTypesAPI.STATUS_OK){
                                                Toasts.showToast("Request Successfully Saved");
                                            }*/


                                        }}>
                                        <Text color={"white"} {...NATIVEBASE_PROPS.TEXT}> SAVE </Text>
                                    </Button>
                                    <Animated.View style={{ opacity: fadeEffect }}>
                                        <Icon name="checkcircle" size={"lg"} color={"green.500"} alignSelf={"center"} as={AntDesign} />
                                    </Animated.View>
                                </Button.Group>
                            </Modal.Footer>
                            {!isMounted && <CompoLoadingView />}
                        </Modal.Content>
                    </Center>
                </KeyboardAvoidingView>
            </Modal>
            <Alerts alertType={alertType} isOpenAlert={isOpenAlert} setIsOpenAlert={setIsOpenAlert} />
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
    SELECT_ITEM: {
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
        w: "85%"
    },
    DIVIDE_REQUEST: {
        alignSelf: "center",
        bgColor: "coolGray.300",
        thickness: "3",
        orientation: "horizontal",
        w: "98%",
        mt: 3
    },
    VSTACK_CHECKBOX: {
        space: 2,
        alignSelf: "center",
        alignItems: "center"
    },
    TEXT: {

    },
    STEPS_TEXT: {
        fontWeight: "bold"
    },
    ICON_INPUT: {
        color: "rgb(0,185,243)",
        size: 8,
        ml: "2"
    },
    TEXTAREA: {
        totalLines: 20,
        maxLength:300,
        h: 100,
        placeholder: "INSTRUCTIONS",
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
        _disabled: { bgColor: "gray.200" }
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
    },


    INPUT_REQUEST: {
        w: "60%",
        height: 50,
        alignSelf: "center",
        isDisabled: true,
        autoCapitalize: "none",
        selectionColor: "black",
        color: "black",
        borderRadius: 10,
        borderWidth: 2,
        borderColor: "rgb(0,185,243)",
        fontSize: 14,
        placeholderTextColor: "rgb(0,185,243)",
        autoCompleteType: 'off'
    },


    INPUT_REQUEST_AMOUNT: {
        w: "15%",
        height: 50,
        textAlign: "center",
        keyboardType: "number-pad",
        autoCapitalize: "none",
        selectionColor: "black",
        color: "black",
        borderRadius: 10,
        borderWidth: 2,
        borderColor: "rgb(0,185,243)",
        fontSize: 14,
        placeholderTextColor: "rgb(0,185,243)",
        autoCompleteType: 'off',
        alignSelf: "center",
    }
}


export default ModalNewRequest;

