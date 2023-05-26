import React, { useState, useEffect } from 'react';
import { AppState } from 'react-native';
import { useSelector, useDispatch } from "react-redux";
import { Text, Box, Heading, Stack, View, Button, ScrollView, HStack, Icon } from "native-base";
import SingleSelectFloorResponsible from './CompoSingleSelectFloorsResponsibles';
import SingleSelectFloorSupervisor from './CompoSingleFloorsSupervisor';
import Toasts from "./CompoToast";
import { ActionRooms } from "../Actions/ActionRooms.js";
import CompoApiLoadingView from './CompoApiLoadingView';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from "@expo/vector-icons";

const CompoFloorConfig = ({ navigation }) => {

    const [isMounted, setIsMounted] = useState(false);
    const [loadingButton, setLoadingButton] = useState(null);
    const setLoadingButton_floor = React.useCallback((index) =>{
        setLoadingButton(index);
    });

    const handleToastSavetion = () => {
        Toasts.showToast("Save");
    }

    const dispatch = useDispatch();
    const updateFloor = (floorObj, token_api) => { dispatch(ActionRooms.updateFloors(floorObj, token_api, { setIsMounted, handleToastSavetion, setLoadingButton_floor })) }

    const floors = useSelector(state => state.reducerRooms);
    const peopleList = useSelector(state => state.reducerPeople);
    const user = useSelector(state => state.reducerLogin);

    const [supervisors, setSupervisors] = useState([]);
    const [porters, setPorters] = useState([]);
    const [floorMaped, setFloorMaped] = useState([]);

    useEffect(() => {
        setIsMounted(false);
        const superviSors = peopleList.payload.people.filter(supervisors => supervisors.profession === "ROOM SUPERVISOR" && supervisors.active === "S");
        const porteRs = peopleList.payload.people.filter(porters => porters.profession === "HOUSE STEWARD" && porters.active === "S");

        setSupervisors(superviSors);
        setPorters(porteRs);

        if (!!peopleList.payload.people) {
            setFloorMaped(floors.payload_F.floors);
            setIsMounted(true);
        }

    }, [peopleList.payload.people]);

    return (
        <Box>
            <LinearGradient {...nativeBaseProps.LINEARCOLOR}>
                <Box safeArea={true}>
                    <HStack>
                        <Icon
                            paddingLeft={3}
                            {...nativeBaseProps.ICON_GOBACK}
                            as={<MaterialIcons name="arrow-back-ios" />}
                            onPress={() => { navigation.goBack(); }}
                        />
                        <Box {...nativeBaseProps.BOX_TITLE}>
                            <Text {...nativeBaseProps.TEXT_TITLE}> FLOOR CONFIGURATION </Text>
                        </Box>
                    </HStack>
                </Box>
            </LinearGradient>

            <ScrollView>
                <View mb={100}>
                    {floorMaped.map((item, index) => {
                        return (
                            <Stack
                                flex={1}
                                alignItems={"center"}
                                space={2}
                                mt={5}
                                mb={5}
                                shadow={'7'}
                                key={index}
                            >
                                <Box alignItems="center">
                                    <Box
                                        w="95%"
                                        minW={"95%"}
                                        rounded="lg"
                                        overflow="hidden"
                                        borderColor="#00b9f3"
                                        borderWidth="2"
                                        backgroundColor="gray.50"
                                    >
                                        <Stack p="4" space={3}>
                                            <Heading size="md" ml="-1">
                                                {item.floorname}
                                            </Heading>
                                            <Text color={"#00b9f3"} fontWeight="bold">
                                                SELECT FLOOR SUPERVISOR:
                                            </Text>
                                            {supervisors && <SingleSelectFloorSupervisor
                                                supervisors={supervisors}
                                                supervsiorSelected={item.fk_supervisor_floor}
                                                setFloorMaped={setFloorMaped}
                                                floorMaped={floorMaped}
                                                idfloors={item.idfloors}
                                            />}
                                            <Text color={"#00b9f3"} fontWeight="bold">
                                                SELECT FLOOR PORTER:
                                            </Text>
                                            {porters && <SingleSelectFloorResponsible
                                                responsible={porters}
                                                responsibleSelected={item.fk_porter_floor}
                                                setFloorMaped={setFloorMaped}
                                                floorMaped={floorMaped}
                                                idfloors={item.idfloors}
                                            />}
                                            <Button
                                                {...nativeBaseProps.SAVE_BUTTON}
                                                isLoading={loadingButton == index? true: false}
                                                onPress={(buttonPressed) => {
                                                    setIsMounted(false);
                                                    !!buttonPressed?setLoadingButton_floor(index):null;
                                                    const token_api = user.payload.tokenapi;
                                                    var floorToSave = floorMaped.find(data => data.idfloors === item.idfloors);
                                                    //var peopless = peopleList.payload.people.filter(data => data.profession === "HOUSE STEWARD" && data.active === "S");
                                                    //console.log(peopless);
                                                    updateFloor(floorToSave, token_api, setIsMounted, handleToastSavetion, setLoadingButton_floor);
                                        
                                                }}
                                            >
                                                {"SAVE " + item.floorname}
                                            </Button>
                                        </Stack>
                                    </Box>
                                </Box>
                            </Stack>
                        )
                    })}
                </View>
            </ScrollView>
            {!isMounted && <CompoApiLoadingView />}
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
    SAVE_BUTTON: {
        bgColor: "rgb(0,98,130)",
        marginTop: 5,
        alignSelf: "center",
        borderRadius: 10,
        borderColor: "white",
        w: "70%",
        height: 50,
        isLoadingText: "Submitting",
        variant: "outline",
        _loading: {
            bg: "rgba(0,185,243,0.5)",
            _text: { color: "rgb(0,185,243)", fontWeight: "bold", fontSize: "16" },
            borderWidth: 1,
        },
        _text: {
            fontWeight: "bold",
            fontSize: "16",
            color: "white"
        },
        _pressed: {
            gColor: "rgba(0,185,243,0.5)",
        }
    },

    TEXT_TITLE: {
        color: "white",
        bold: true,
        fontSize: 16,
        mr:"10"
    },
    BOX_TITLE: {
        justifyContent: "center",
        w: "100%",
        alignItems:"center"
    },
    ICON_GOBACK: {
        size: 7,
        ml: 2,
        mt: 2,
        mb: 2,
        color: "rgb(255,255,255)"
    },

}

export default CompoFloorConfig;