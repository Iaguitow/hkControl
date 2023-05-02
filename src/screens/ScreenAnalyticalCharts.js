import React, { useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { useSelector, useDispatch } from "react-redux";
import CompoLoadingView from "../components/CompoApiLoadingView";
import CompoChartTotalRequests from '../components/CompoChartTotalRequests';
import CompoChartLongerReqToBeDone from '../components/CompoChartLongerReqDone';
import CompoChartPerfPorters from '../components/CompoChartPerfPorters';

import { View, ScrollView } from "native-base";

const ScreenAnalyticalCharts = () => {
    const [isMounted, setIsMounted] = useState(false);

    useFocusEffect(
        React.useCallback(() => {
            setIsMounted(false);
            return () => {false};
        }, [])
    );

    return (
        <ScrollView>
            <View flex={1} alignItems={"center"}>
                <CompoChartTotalRequests isMounted={isMounted} setIsMounted={setIsMounted}></CompoChartTotalRequests>
                <CompoChartLongerReqToBeDone isMounted={isMounted} setIsMounted={setIsMounted}></CompoChartLongerReqToBeDone>
                <CompoChartPerfPorters isMounted={isMounted} setIsMounted={setIsMounted}></CompoChartPerfPorters>
                {!isMounted && <CompoLoadingView />}
            </View>
        </ScrollView>
    );
};

export default ScreenAnalyticalCharts;