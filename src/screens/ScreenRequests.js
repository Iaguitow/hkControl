import React, { useState } from 'react';
import { Center } from "native-base";
import CompoResquests from "../components/CompoRequests";
import { useFocusEffect } from '@react-navigation/native';
import { RequestActions } from "../Actions/ActionRequests";
import { useSelector, useDispatch } from "react-redux";
import CompoLoadingView from "../components/CompoApiLoadingView";

const ScreenRequests = () => {
    const [isMounted, setIsMounted] = useState(false);

    const dispatch = useDispatch();
    const getRequests = (idpeople, token_api) => {dispatch(RequestActions.getRequests(idpeople, token_api, {setIsMounted})) }
    const user = useSelector(state => state.reducerLogin);
    const requests = useSelector(state => state.reducerRequests);

    useFocusEffect(
        React.useCallback(() => {
        const token_api = user.payload.tokenapi;
        const idpeople = user.payload.idpeople;
        
        getRequests(idpeople,token_api,{setIsMounted});
        return () => setIsMounted(false);
        }, [])
    );

    return (
        <Center flex={1}>
            <CompoResquests setIsMounted={ setIsMounted }/>
            {!isMounted && <CompoLoadingView />}
        </Center>
    );
};

export default ScreenRequests;