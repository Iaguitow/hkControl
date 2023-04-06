import React, { useEffect, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { useSelector, useDispatch } from "react-redux";
import CompoConfig from '../components/CompoConfig';
import { ActionRooms } from "../Actions/ActionRooms.js";
import CompoApiLoadingView from '../components/CompoApiLoadingView';
import { PeopleActions } from "../Actions/ActionPeople.js";

import { View, ScrollView } from "native-base";

const ScreenConfig = () => {
    const [isMounted, setIsMounted] = useState(false);

    const dispatch = useDispatch();
    const getFloors = (token_api) => {dispatch(ActionRooms.getFloors(token_api,{setIsMounted})) }
    const getPeople = (peopleList,idpeople,token_api) => {dispatch(PeopleActions.getPeople(peopleList,idpeople,token_api)) }
    const user = useSelector(state => state.reducerLogin);

    useFocusEffect(
        React.useCallback(() => {
            setIsMounted(false);
            const token_api = user.payload.tokenapi;
            const idpeople = user.payload.idpeople;
            const peopleList = true;
            getPeople(peopleList,idpeople,token_api);
            getFloors(token_api, setIsMounted);
            return () => {false};
        }, [])
    );

    return (
        <View flex={1} alignItems={"center"}>
            <ScrollView flex={1}>
                <CompoConfig token_api={user.payload.tokenapi} isMounted={isMounted} setIsMounted={setIsMounted}></CompoConfig>
            </ScrollView>
            {!isMounted && <CompoApiLoadingView />}
        </View>
    );
};



export default ScreenConfig;