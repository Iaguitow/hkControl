// import React in our code
import React from 'react';

// import all the components we are going to use
import {
    Dimensions,
    View,
} from 'react-native';

import {
    Center,
    Divider,
    HStack,
    Stack,
    Text
} from "native-base";

// Import the chart component
import { LineChart } from 'react-native-chart-kit';

// Import resources
import { useSelector, useDispatch } from "react-redux";
import { ChartActions } from '../Actions/ActionChartsScreen';

export default function CompoChartTotalRequests({ setIsMounted }) {

    const user = useSelector(state => state.reducerLogin);

    const dispatch = useDispatch();
    const getChartTotalRequests = (token_api) => { dispatch(ChartActions.getChartTotalRequestPerday(token_api, { setIsMounted })) }
    const chartTotalRequests = useSelector(state => state.reducerCharts.payload_TR);

    React.useEffect(() => {
        const token_api = user.payload.tokenapi;
        getChartTotalRequests(token_api, { setIsMounted });
    }, []);

    const chartDataLabel = ['INITIAL'];
    const chartDataInfo = [0];

    if (chartTotalRequests.length > 0) {
        for (i = 0; i < chartTotalRequests.length; i++) {
            chartDataLabel.push(
                chartTotalRequests[i].daysofweek
            );
            chartDataInfo.push(
                chartTotalRequests[i].totalRequests
            );

        }
    }

    return (
        <View>
            <Stack p={5}>
                <Center>
                    <Text fontWeight={"bold"}>
                        TOTAL OF REQUESTS ORDERED LAST 5 DAYS:
                    </Text>
                </Center>
                <LineChart
                    bezier
                    yAxisSuffix=''
                    renderDotContent={({ x, y, indexData }) => {
                        return (
                            <View
                                key={indexData + Math.random()}
                                style={{
                                    position: 'absolute',
                                    top: y - 16,
                                    left: x - 5,
                                }}>
                                <Text style={{ fontSize: 12, color: "white", fontWeight:"bold" }}>
                                    {indexData.toString()}
                                </Text>
                            </View>
                        )
                    }}
                    data={{
                        labels: chartDataLabel,
                        datasets: [
                            {
                                data: chartDataInfo,
                                strokeWidth: 3,
                                color: (opacity = 1) => `#00FFFF`
                            },
                        ],
                    }}
                    width={Dimensions.get('window').width - 16}
                    height={220}
                    chartConfig={{
                        backgroundColor: '#1cc910',
                        backgroundGradientFrom: '#00baf3',
                        backgroundGradientTo: '#061b21',
                        decimalPlaces: 0,
                        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                        labelColor: (opacity = 1) => `white`,
                        propsForLabels:{
                            fontWeight:"bold",
                        },
                        propsForDots: {
                            r: "2",
                            strokeWidth: "2",
                            stroke: "#FFFFFF",
                        },
                        propsForBackgroundLines: {
                            strokeWidth: "1",
                            stroke: "rgba(255, 255, 255, 0.4)"
                        },
                        style: {
                            borderRadius: 16,
                        },
                    }}
                    style={{
                        marginVertical: 8,
                        borderRadius: 16,
                    }}
                />
                <Divider {...nativeBaseProps.DIVIDERS}></Divider>
            </Stack>
            
            {/* *********************** STACK 02 ***************** */}
        </View>
    );
};

const nativeBaseProps = {
    DIVIDERS:{
        mt:2,
        alignSelf:"center", 
        bgColor:"coolGray.300", 
        thickness:"4",
        orientation:"horizontal",
        w:"98%"
      },
}