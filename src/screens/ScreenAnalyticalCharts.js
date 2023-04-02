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

    return (
        <ScrollView>
            <View flex={1} alignItems={"center"}>
                <CompoChartTotalRequests setIsMounted={setIsMounted}></CompoChartTotalRequests>
                <CompoChartLongerReqToBeDone setIsMounted={setIsMounted}></CompoChartLongerReqToBeDone>
                <CompoChartPerfPorters setIsMounted={setIsMounted}></CompoChartPerfPorters>
                {!isMounted && <CompoLoadingView />}
            </View>
        </ScrollView>
    );
};

const NativeBaseProps = {

}



export default ScreenAnalyticalCharts;