import React, { useState } from 'react';
import { Center } from "native-base";
import CompoResquests from "../components/CompoRequests";
import CompoManagerRequestsView from '../components/CompoManagerRequestsView';
import { useFocusEffect } from '@react-navigation/native';
import { RequestActions } from "../Actions/ActionRequests";
import { useSelector, useDispatch } from "react-redux";
import { LinearGradient } from 'expo-linear-gradient';
import CompoLoadingView from "../components/CompoApiLoadingView";

const ScreenRequests = () => {
    const [isMounted, setIsMounted] = useState(false);

    const dispatch = useDispatch();
    const getRequests = (idpeople, joblevel, token_api) => {dispatch(RequestActions.getRequests(idpeople, joblevel, token_api, {setIsMounted})) }
    const user = useSelector(state => state.reducerLogin);
    const joblevel = user.payload.joblevel;

    useFocusEffect(
        React.useCallback(() => {

        setIsMounted(true);
    
        const token_api = user.payload.tokenapi;
        const idpeople = user.payload.idpeople;
        
        getRequests(idpeople, joblevel, token_api,{setIsMounted});
        return () => setIsMounted(true);
        }, [])
    );

    return (
        <Center flex={1}>
            <LinearGradient {...NativeBaseProps.LINEAR_BACK_GROUND_COLOR}  />
            {
                joblevel.toString().includes("PS","M","CO")?<CompoManagerRequestsView setIsMounted={ setIsMounted }/>:<CompoResquests setIsMounted={ setIsMounted }/>

            }
            {isMounted && <CompoLoadingView />}
        </Center>
    );
};

const NativeBaseProps = {
    LINEAR_BACK_GROUND_COLOR: {
      colors: ['#00b9f3', '#061b21', '#061b21'],
      start:[0.5, 1], 
      end:[0.5, 0],
      locations:[0, 0.9, 0.9],
      style: { flex: 1,position:"absolute", width:"100%", height:"100%" }
    }
}

export default ScreenRequests;