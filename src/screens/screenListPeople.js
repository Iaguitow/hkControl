import React, {useEffect} from 'react';
import { Center } from "native-base";
import CompoListPeople from "../components/CompoListPeople";
import { useFocusEffect } from '@react-navigation/native';
import { PeopleActions } from "../Actions/ActionPeople.js";
import { useSelector, useDispatch } from "react-redux";

const ScreenListPeople = () => {

    const dispatch = useDispatch();
    const getPeople = (peopleList,idpeople,token_api) => {dispatch(PeopleActions.getPeople(peopleList,idpeople,token_api)) }

    const user = useSelector(state => state.reducerLogin);

    useFocusEffect(
        React.useCallback(() => {
            const token_api = user.payload.tokenapi;
            const idpeople = user.payload.idpeople;
            const peopleList = true;
            getPeople(peopleList,idpeople,token_api);

            return () => true;
        }, [])
    );

    return (
        <Center flex={1}>
            <CompoListPeople />
        </Center>
    );
};

export default ScreenListPeople;