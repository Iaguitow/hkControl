import React, { useEffect, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { useSelector, useDispatch } from "react-redux";
import { ActionRooms } from "../Actions/ActionRooms.js";
import CompoApiLoadingView from '../components/CompoApiLoadingView';
import { RequestTypeActions } from "../Actions/ActionRequestType";
import { PeopleActions } from "../Actions/ActionPeople.js";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import { View, Container, Heading, Text, VStack, Icon, Box, HStack, Button } from "native-base";

const ScreenConfig = ({ navigation }) => {
    const [isMounted, setIsMounted] = useState(false);

    const dispatch = useDispatch();
    const getFloors = (token_api) => { dispatch(ActionRooms.getFloors(token_api, { setIsMounted })) }
    const getRequestType = (token_api) => {dispatch(RequestTypeActions.getRequestType(token_api,{setIsMounted})) }
    const getPeople = (peopleList, idpeople, token_api) => { dispatch(PeopleActions.getPeople(peopleList, idpeople, token_api, setIsMounted)) }
    const user = useSelector(state => state.reducerLogin);

    useFocusEffect(
        React.useCallback(() => {
            setIsMounted(false);
            const token_api = user.payload.tokenapi;
            const idpeople = user.payload.idpeople;
            const peopleList = true;
            getRequestType(token_api, setIsMounted);
            getFloors(token_api, setIsMounted);
            getPeople(peopleList, idpeople, token_api, setIsMounted);
            return () => { false };
        }, [])
    );

    return (
        <View flex={1} alignItems={"center"} alignContent={"center"} justifyContent={"center"} justifyItems={"center"}>
            <VStack space={10}>
                <Container
                    borderRadius={"10"}
                    minW={"90%"}
                    backgroundColor={"gray.700"}
                    p={10}
                    borderWidth={4}
                    borderColor={"#00b9f3"}
                    shadow={'7'}
                >
                    <HStack space={10} alignSelf={"flex-end"}>
                        <Button
                            w={"200px"}
                            mb={2}
                            mt={-5}
                            shadow={9}
                            onPress={() =>{
                                navigation.navigate("CompoRequestConfig");
                            }}
                        >
                            <Text fontSize={16} fontWeight={"bold"} color={"white"}>
                                Access Requests.
                            </Text>

                        </Button>
                        <Box
                            mb={2}
                            mt={-5}
                            p={2}
                            borderWidth={3}
                            borderRadius={100}
                            borderColor={"#00b9f3"}
                        >
                            <Icon
                                size={"8"}
                                color={"white"}
                                as={<Ionicons name="git-pull-request" />}
                            />
                        </Box>
                    </HStack>
                    <Heading
                        color={"white"}
                    >
                        Click above to access
                        <Text color="#00b9f3"> Request Configuration.</Text>
                    </Heading>
                </Container>

                <Container
                    borderRadius={"10"}
                    minW={"90%"}
                    backgroundColor={"gray.700"}
                    p={10}
                    borderWidth={4}
                    borderColor={"#00b9f3"}
                    shadow={'7'}
                >
                    <HStack space={10} alignSelf={"flex-end"}>
                        <Button
                            w={"200px"}
                            mb={2}
                            mt={-5}
                            shadow={9}
                            onPress={() =>{
                                navigation.navigate("CompoFloorConfig");
                            }}
                        >
                            <Text fontSize={16} fontWeight={"bold"} color={"white"}>
                                Access Floors.
                            </Text>

                        </Button>
                        <Box
                            mb={2}
                            mt={-5}
                            p={2}
                            borderWidth={3}
                            borderRadius={100}
                            borderColor={"#00b9f3"}
                        >
                            <Icon
                                size={"8"}
                                color={"white"}
                                as={<MaterialCommunityIcons name="office-building-cog" />}
                            />
                        </Box>
                    </HStack>
                    <Heading
                        color={"white"}
                    >
                        Click above to access
                        <Text color="#00b9f3"> Floor Configuration.</Text>
                    </Heading>
                </Container>
            </VStack>
            {!isMounted && <CompoApiLoadingView />}
        </View>
    );
};



export default ScreenConfig;