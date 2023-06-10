import React, { useEffect, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import CompoLoadingView from "../components/CompoApiLoadingView";
import CompoChartTotalRequests from '../components/CompoChartTotalRequests';
import CompoChartLongerReqToBeDone from '../components/CompoChartLongerReqDone';
import CompoChartPerfPorters from '../components/CompoChartPerfPorters';

import { View, Center, ScrollView } from "native-base";

const ScreenAnalyticalCharts = () => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(()=>{
        return () =>{
            setIsMounted(true);
        }
    },[]);

    return (
        <ScrollView flex={1} h={"100%"} horizontal={false} scrollIndicatorInsets={{ top: 1, bottom: 1 }}>
            <View flex={1} h={"100%"} justifyContent={"center"}>
              
                <View flex={1} alignItems={"center"} h={"100%"}>
                    <CompoChartTotalRequests isMounted={isMounted} setIsMounted={setIsMounted}></CompoChartTotalRequests>
                    <CompoChartLongerReqToBeDone isMounted={isMounted} setIsMounted={setIsMounted}></CompoChartLongerReqToBeDone>
                    <CompoChartPerfPorters isMounted={isMounted} setIsMounted={setIsMounted}></CompoChartPerfPorters>
                    {!isMounted&&<CompoLoadingView />}
                </View>
            </View>
        </ScrollView>

    );
};

export default ScreenAnalyticalCharts;