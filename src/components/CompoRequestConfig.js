import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import {
    Text,
    Box,
    Heading,
    View,
    ScrollView,
    HStack,
    Icon,
    Input,
    IconButton,
    Checkbox,
    VStack,
    Center,
    useToast,
    Divider,
    Button
} from "native-base";
import Toasts from "./CompoToast";
import CompoApiLoadingView from './CompoApiLoadingView';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons, Feather } from "@expo/vector-icons";
import { RequestTypeActions } from '../Actions/ActionRequestType';


const CompoRequestConfig = ({ navigation }) => {


    const [isMounted, setIsMounted] = useState(false);
    const requestsType = useSelector(state => state.reducerRequestType);
    const user = useSelector(state => state.reducerLogin);


    const handleToastSavetion = () => {
        Toasts.showToast("Save");
    }


    const dispatch = useDispatch();
    const insertNewRequestType = (description, token_api) => {
        dispatch(RequestTypeActions.insertRequestType(description, token_api, { setIsMounted, handleToastSavetion }))
    }
    const updateRequestType = (idrequest, slatime, active, token_api) => {
        dispatch(RequestTypeActions.updateRequestType(idrequest, slatime, active, token_api, { setIsMounted, handleToastSavetion }))
    }
    const deleteRequestType = (idrequest, token_api) => {
        dispatch(RequestTypeActions.deleteRequestType(idrequest, token_api, { setIsMounted, handleToastSavetion }))
    }


    const [list, setList] = React.useState([]);
    const [inputValue, setInputValue] = React.useState("");
    const toast = useToast();

    const addItem = title => {
        if (title === "") {
            toast.show({
                title: "Please Enter Text",
                status: "warning"
            });
            return;
        }
        setIsMounted(true)
        const token_api = user.payload.tokenapi;
        insertNewRequestType(title.toString().toUpperCase(), token_api, { setIsMounted, handleToastSavetion });
    };



    const handleDelete = (idrequest) => {
        setIsMounted(true)
        const token_api = user.payload.tokenapi;
        deleteRequestType(idrequest, token_api);
    };


    const handleStatusChange = (idrequest, slatime, active) => {
        setIsMounted(true);
        const token_api = user.payload.tokenapi;
        updateRequestType(idrequest, slatime, active, token_api);
    };


    const requestTypeArray = [];
    useEffect(() => {
        if (requestsType.payload.requestType != null) {
            for (var i = 0, ii = requestsType.payload.requestType.length; i < ii; i++) {
                requestTypeArray.push({
                    id: requestsType.payload.requestType[i].idrequests,
                    title: requestsType.payload.requestType[i].resquestdescription,
                    isDeactive: requestsType.payload.requestType[i].active == "Y" ? false : true,
                    slatime: requestsType.payload.requestType[i].slatime
                });
            }
            setList(requestTypeArray);
        }
    }, [requestsType.payload.requestType]);


    return (
        <Box>
            <LinearGradient {...nativeBaseProps.LINEARCOLOR}>
                <Box safeArea={true}>
                    <HStack>
                        <Button
                            h={10}
                            backgroundColor={"transparent"}
                            leftIcon={
                                <Icon
                                    size={7}
                                    ml={2}
                                    {...nativeBaseProps.ICON_GOBACK}
                                    as={<MaterialIcons name="arrow-back-ios" />}
                                />
                            }
                            onPress={() => {
                                navigation.goBack();
                            }
                            }
                        >
                        </Button>
                        <Box {...nativeBaseProps.BOX_TITLE}>
                            <Text {...nativeBaseProps.TEXT_TITLE}> REQUEST CONFIGURATION </Text>
                        </Box>
                    </HStack>
                </Box>
            </LinearGradient>


            <ScrollView scrollIndicatorInsets={{ top: 1, bottom: 1 }}>
                <View flex={1} mb={"160"}>
                    <Center w="100%">
                        <Box p={2} w="100%">
                            <Heading mb="2" size="md">
                                Requisition List
                            </Heading>
                            <VStack space={4}>
                                <HStack space={1}>
                                    <Input
                                        {...nativeBaseProps.INPUT}
                                        flex={1}
                                        onChangeText={v => setInputValue(v)}
                                        value={inputValue}
                                        placeholder="Add New Request"
                                        autoCapitalize='characters'
                                    />
                                    <IconButton
                                        borderRadius="sm"
                                        variant="solid"
                                        icon={<Icon as={Feather} name="plus" size="sm" color="warmGray.50" />}
                                        onPress={() => {
                                            addItem(inputValue);
                                            setInputValue("");
                                        }}
                                    />
                                </HStack>
                                <Divider {...nativeBaseProps.DIVIDERS.HEAD_DIVIDER}></Divider>
                                <VStack space={2}>
                                    {list.length > 0 && list.map((item, itemI) =>
                                        <View
                                            key={itemI}
                                        >
                                            <HStack
                                                w="100%"
                                                justifyContent="space-between"
                                                alignItems="center"
                                                key={item.title + itemI.toString()}
                                            >
                                                <Checkbox
                                                    isChecked={item.isDeactive}
                                                    onChange={(t) => {
                                                        handleStatusChange(item.id, item.slatime, !item.isDeactive);
                                                    }
                                                    }
                                                    value={item.title}
                                                    accessibilityLabel={item.title}
                                                    size="lg"
                                                    borderColor={"#00b9f3"}
                                                    _checked={{
                                                        color: "red.600",
                                                        backgroundColor: "red.600",
                                                        borderColor: "red.600"
                                                    }}
                                                >
                                                </Checkbox>
                                                <Text
                                                    width="100%"
                                                    flexShrink={1}
                                                    textAlign="left"
                                                    mx="2"
                                                    strikeThrough={item.isDeactive}
                                                    onPress={() => {
                                                        handleStatusChange(item.id, item.slatime, !item.isDeactive);
                                                    }}
                                                >
                                                    {item.title}
                                                </Text>
                                                <Input
                                                    textAlign={"center"}
                                                    w={"70px"}
                                                    keyboardType='number-pad'
                                                    onEndEditing={(text) => {
                                                        handleStatusChange(item.id, text.nativeEvent.text.replace(/\D/g, ""), item.isDeactive);
                                                    }
                                                    }
                                                >
                                                    {item.slatime + " Min"}
                                                </Input>
                                                <IconButton
                                                    size="md"
                                                    icon={<Icon as={Feather} name="trash-2" size="lg" color="red.600" />}
                                                    onPress={() => handleDelete(item.id)}
                                                />
                                            </HStack>
                                            <Divider {...nativeBaseProps.DIVIDERS.LIST_DIVIDER}></Divider>
                                        </View>
                                    )}
                                </VStack>
                            </VStack>
                        </Box>
                    </Center>
                </View>
            </ScrollView>
            {isMounted && <CompoApiLoadingView />}
        </Box>
    );
};


const nativeBaseProps = {
    LINEARCOLOR: {
        colors: ['#061b21', '#00b9f3', '#00b9f3'],
        start: [0.5, 1],
        end: [0.5, 0],
        locations: [0, 0.9, 0.9],
        height: 100
    },
    INPUT: {
        w: "90%",
        autoCapitalize: "none",
        selectionColor: "black",
        color: "black",
        borderWidth: 2,
        borderRadius: 10,
        borderColor: "rgb(0,185,243)",
        height: 50,
        fontSize: "md",
        autoCompleteType: 'off',
        alignSelf: "center"
    },
    DIVIDERS: {
        HEAD_DIVIDER: {
            mt: 2,
            alignSelf: "center",
            bgColor: "coolGray.300",
            thickness: "4",
            orientation: "horizontal",
            w: "100%"
        },
        LIST_DIVIDER: {
            alignSelf: "center",
            bgColor: "#00b9f3",
            thickness: "1",
            orientation: "horizontal",
            w: "98%"
        }


    },
    TEXT_TITLE: {
        color: "white",
        bold: true,
        fontSize: 16,
        mr: "10"
    },
    BOX_TITLE: {
        justifyContent: "center",
        w: "100%",
        alignItems: "center"
    },
    ICON_GOBACK: {
        color: "rgb(255,255,255)"
    },


}


export default CompoRequestConfig;

