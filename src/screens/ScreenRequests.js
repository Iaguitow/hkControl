import React, { useState } from 'react';
import { Center } from "native-base";
import CompoResquests from "../components/CompoRequests";
import { useFocusEffect } from '@react-navigation/native';
import { RequestActions } from "../Actions/ActionRequests";
import { useSelector, useDispatch } from "react-redux";
import { LinearGradient } from 'expo-linear-gradient';
import CompoLoadingView from "../components/CompoApiLoadingView";

const ScreenRequests = () => {
    const [isMounted, setIsMounted] = useState(false);

    const dispatch = useDispatch();
    const getRequests = (idpeople, token_api) => {dispatch(RequestActions.getRequests(idpeople, token_api, {setIsMounted})) }
    const user = useSelector(state => state.reducerLogin);

    useFocusEffect(
        React.useCallback(() => {

        setIsMounted(true);
    
        const token_api = user.payload.tokenapi;
        const idpeople = user.payload.idpeople;
        
        getRequests(idpeople,token_api,{setIsMounted});
        return () => setIsMounted(true);
        }, [])
    );

    return (
        <Center flex={1}>
            <LinearGradient {...NativeBaseProps.LINEAR_BACK_GROUND_COLOR}  />
            <CompoResquests setIsMounted={ setIsMounted }/>
            {isMounted && <CompoLoadingView />}
        </Center>
    );
};

const NativeBaseProps = {
    LINEAR_BACK_GROUND_COLOR: {
      colors: ['#00b9f3', '#061b21', '#061b21'],
      start: [1, 0],
      end: [0, 3],
      locations: [0.7, 0.1, 0.2],
      style: { flex: 1,position:"absolute", width:"100%", height:"100%" }
    }
}

export default ScreenRequests;