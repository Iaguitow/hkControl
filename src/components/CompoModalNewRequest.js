
import React, { useState } from "react"
import { useSelector, useDispatch } from "react-redux";
import { RequestActions } from "../Actions/ActionRequests";
import { Entypo, MaterialIcons } from "@expo/vector-icons";
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

const ModalNewRequest = ({ showModal, setShowModal }) => {

    let [request, setRequest] = useState("");

    return (
    <Center >
        <Modal size={"xl"} isOpen={showModal} onClose={() => setShowModal(false)}>
            <Modal.Content >
                <Modal.CloseButton />
                <Modal.Header>NEW REQUEST</Modal.Header>
                <Modal.Body>
                    <VStack space={2}>
                        <Text {...NATIVEBASE_PROPS.TEXT}> CHOOSE ANY PRE-DEFINIED REQUEST: </Text>
                        <Select
                            key={1}
                            selectedValue={request}
                            dropdownIcon={<Icon name="chevron-down" size={"sm"} color={"#00b9f3"} as={Entypo} />}
                            minWidth="200"
                            fontSize={16}
                            height={50}
                            borderWidth={2}
                            borderColor={"#00b9f3"}
                            accessibilityLabel="Choose Request"
                            placeholder="Choose Request"
                            borderRadius={10}
                            _selectedItem={{
                                bg: "teal.600",
                                endIcon: <CheckIcon key={2} size="5" />
                            }}
                            mt={1}
                            onValueChange={itemValue => setRequest(itemValue)}
                        >
                            <Select.Item key={3} label="UX Research" value="ux" />
                        </Select>
                        <Divider {...NATIVEBASE_PROPS.DIVIDERS} />
                        <HStack space={5} alignSelf={"center"} alignItems={"center"}>
                            <VStack {...NATIVEBASE_PROPS.VSTACK_DETAILS_AMOUNT_ROOM}>
                                <Text {...NATIVEBASE_PROPS.TEXT}> AMOUNT: </Text>
                                <Input {...NATIVEBASE_PROPS.INPUT} placeholder={"Amount"} maxLength={2}/>
                            </VStack>
                            <VStack {...NATIVEBASE_PROPS.VSTACK_DETAILS_AMOUNT_ROOM}>
                                <Text {...NATIVEBASE_PROPS.TEXT}> ROOM: </Text>
                                <Input {...NATIVEBASE_PROPS.INPUT} placeholder={"Room"} maxLength={3}/>
                            </VStack>
                            <VStack {...NATIVEBASE_PROPS.VSTACK_CHECKBOX}>
                                <Text mt={-1.5} {...NATIVEBASE_PROPS.TEXT}> PRIORITY: </Text>
                                <Checkbox {...NATIVEBASE_PROPS.CHECKBOX} />
                            </VStack>
                        </HStack>
                        <Divider {...NATIVEBASE_PROPS.DIVIDERS} />
                        <Text {...NATIVEBASE_PROPS.TEXT}> REQUEST DESCRIPTION: </Text>
                        <TextArea 
                            {...NATIVEBASE_PROPS.TEXTAREA}  
                        />
                    </VStack>
                    <Divider mt={3} {...NATIVEBASE_PROPS.DIVIDERS} />
                </Modal.Body>
                <Modal.Footer>
                    <Button.Group space={2}>
                        <Button variant="ghost" colorScheme="blueGray" onPress={() => {
                            setShowModal(false);
                        }}>
                            <Text {...NATIVEBASE_PROPS.TEXT}> CANCEL </Text>
                        </Button>
                        <Button onPress={() => {
                            setShowModal(false);
                        }}>
                            <Text color={"white"} {...NATIVEBASE_PROPS.TEXT}> SAVE </Text>
                        </Button>
                    </Button.Group>
                </Modal.Footer>
            </Modal.Content>
        </Modal>
    </Center>
    );
};

const NATIVEBASE_PROPS={
    VSTACK_DETAILS_AMOUNT_ROOM:{
        alignSelf:"center", 
        alignItems:"center",
        width:"25%"
    },
    CHECKBOX:{
        size:"lg", 
        value:"danger",
        colorScheme:"danger",
        accessibilityLabel:"PRIORITY"
    },
    DIVIDERS:{
        alignSelf:"center", 
        bgColor:"coolGray.300", 
        thickness:"3",
        orientation:"horizontal",
        w:"98%"
      },
    VSTACK_CHECKBOX:{
        space:2,
        alignSelf:"center",
        alignItems:"center"
    },
    TEXT:{
        fontWeight:"bold"
    },
    ICON_INPUT: {
        color: "rgb(0,185,243)",
        size: 8,
        ml: "2"
      },
    TEXTAREA: {                            
        totalLines:20,
        h:150,
        placeholder:"DESCRIPTION",
        w: "100%",
        autoCapitalize: "none",
        selectionColor: "black",
        color: "black",
        borderRadius: 10,
        borderWidth:2,
        borderColor: "rgb(0,185,243)",
        fontSize: "md",
        placeholderTextColor: "rgb(0,185,243)",
        autoCompleteType: 'off',
        alignSelf: "center"
      },
    INPUT: {
        w: "100%",
        textAlign:"center",
        keyboardType:"numeric",
        autoCapitalize: "none",
        selectionColor: "black",
        color: "black",
        borderRadius: 10,
        borderWidth:2,
        borderColor: "rgb(0,185,243)",
        fontSize: 18,
        placeholderTextColor: "rgb(0,185,243)",
        autoCompleteType: 'off',
        alignSelf: "center"
      }
}

export default ModalNewRequest;