import React, { useState } from 'react';
import { Box } from "native-base";
import CompoTasks from "../components/CompoTasks";
import { useFocusEffect } from '@react-navigation/native';
import { TasksActions } from "../Actions/ActionTasks";
import { useSelector, useDispatch } from "react-redux";
import CompoLoadingView from "../components/CompoApiLoadingView";

const ScreenTasks = () => {
    const [isMounted, setIsMounted] = useState(false);

    const dispatch = useDispatch();
    const getTask = (idpeople, token_api) => {dispatch(TasksActions.getTasks(idpeople, token_api, {setIsMounted})) }
    const user = useSelector(state => state.reducerLogin);
    
    useFocusEffect(
        React.useCallback(() => {
        const token_api = user.payload.tokenapi;
        const idpeople = user.payload.idpeople;
        
        getTask(idpeople,token_api,{setIsMounted});
        return () => setIsMounted(false);
        }, [])
    );

    return (
        <Box flex={1}>
            <CompoTasks setIsMounted={ setIsMounted }/>
            {!isMounted && <CompoLoadingView />}
        </Box>
    );
};

export default ScreenTasks;