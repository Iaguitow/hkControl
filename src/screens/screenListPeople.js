import React, {useEffect,useState} from 'react';
import { Center } from "native-base";
import CompoListPeople from "../components/CompoListPeople";
import CompoApiLoadingView from '../components/CompoApiLoadingView';
import { useFocusEffect } from '@react-navigation/native';
import { PeopleActions } from "../Actions/ActionPeople.js";
import { useSelector, useDispatch } from "react-redux";

const ScreenListPeople = ({navigation}) => {

    const [isMounted, setIsMounted] = useState(false);
 
    const dispatch = useDispatch();
    const getPeople = (peopleList,idpeople,token_api,setIsMounted) => {dispatch(PeopleActions.getPeople(peopleList,idpeople,token_api,setIsMounted)) }

    const user = useSelector(state => state.reducerLogin);

    useFocusEffect(
        React.useCallback(() => {
            setIsMounted(true);
            const token_api = user.payload.tokenapi;
            const idpeople = user.payload.idpeople;
            const peopleList = true;
            getPeople(peopleList,idpeople,token_api,setIsMounted);

            return () => false;
        }, [])
    );

    return (
        <Center flex={1}>
            <CompoListPeople navigation={navigation} />
            {isMounted && <CompoApiLoadingView></CompoApiLoadingView>}
        </Center>
    );
};

export default ScreenListPeople;