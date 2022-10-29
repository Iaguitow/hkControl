import React, { useState } from 'react';
import { Box } from "native-base";
import CompoCheckList from "../components/CompoCheckList";
import { useFocusEffect } from '@react-navigation/native';
import { CheckListActions } from "../Actions/ActionCheckList";
import { useSelector, useDispatch } from "react-redux";
import CompoLoadingView from "../components/CompoApiLoadingView";
import { LinearGradient } from 'expo-linear-gradient';

const ScreenCheckList = () => {
    const [isMounted, setIsMounted] = useState(false);

    const dispatch = useDispatch();
    const getChecklist = (idpeople, token_api) => {dispatch(CheckListActions.getCheckList(idpeople, token_api, {setIsMounted})) }
    const user = useSelector(state => state.reducerLogin);
    
    useFocusEffect(
        React.useCallback(() => {
        const token_api = user.payload.tokenapi;
        const idpeople = user.payload.idpeople;
        
        getChecklist(idpeople,token_api,{setIsMounted});
        return () => setIsMounted(false);
        }, [])
    );

    return (
        <Box flex={1}>
        <LinearGradient {...NativeBaseProps.LINEAR_BACK_GROUND_COLOR}  />
            <CompoCheckList setIsMounted={ setIsMounted }/>
            {!isMounted && <CompoLoadingView />}
        </Box>
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


export default ScreenCheckList;