import React, { useState } from 'react';
import { Box, ScrollView } from "native-base";
import { RefreshControl } from "react-native"
import CompoTasks from "../components/CompoTasks";
import { useFocusEffect } from '@react-navigation/native';
import { TasksActions } from "../Actions/ActionTasks";
import { useSelector, useDispatch } from "react-redux";
import CompoLoadingView from "../components/CompoApiLoadingView";
import { LinearGradient } from 'expo-linear-gradient';

const ScreenTasks = () => {
    const [isMounted, setIsMounted] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    const dispatch = useDispatch();
    const getTask = (idpeople, token_api, joblevel) => { dispatch(TasksActions.getTasks(idpeople, token_api, joblevel, { setIsMounted, setRefreshing })) }
    const user = useSelector(state => state.reducerLogin);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setIsMounted(false);
        const token_api = user.payload.tokenapi;
        const idpeople = user.payload.idpeople;
        const joblevel = user.payload.joblevel;
        getTask(idpeople, token_api, joblevel, { setIsMounted, setRefreshing});
      }, []);

    useFocusEffect(
        React.useCallback(() => {
            onRefresh();
            return () => setIsMounted(false);
        }, [])
    );

    return (
        <Box flex={1}>
            <LinearGradient {...NativeBaseProps.LINEAR_BACK_GROUND_COLOR} />
            <ScrollView
                scrollIndicatorInsets={{ top: 1, bottom: 1 }}
                refreshControl={<RefreshControl tintColor={'white'} title={'UPDATING...'} titleColor={'white'} refreshing={refreshing} onRefresh={onRefresh} />}
            >
                <CompoTasks setIsMounted={setIsMounted} />
            </ScrollView>
            {!isMounted && <CompoLoadingView />}
        </Box>
    );

};

const NativeBaseProps = {
    LINEAR_BACK_GROUND_COLOR: {
        colors: ['#00b9f3', '#061b21', '#061b21'],
        start: [0.5, 1],
        end: [0.5, 0],
        locations: [0, 0.9, 0.9],
        style: { flex: 1, position: "absolute", width: "100%", height: "100%" }
    }
}



export default ScreenTasks;