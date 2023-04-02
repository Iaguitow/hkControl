// import React in our code
import React from 'react';

// import all the components we are going to use
import {
    Dimensions,
} from 'react-native';

import {
    Center,
    Divider,
    HStack,
    Stack,
    Icon,
    Text,
    View
} from "native-base";

// Import the chart component
import { BarChart } from 'react-native-chart-kit';

// Import resources
import { useSelector, useDispatch } from "react-redux";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ChartActions } from '../Actions/ActionChartsScreen';

export default function CompoChartLongerReqToBeDone({ setIsMounted }) {

    const user = useSelector(state => state.reducerLogin);

    const dispatch = useDispatch();
    const getChartPerfPorter = (token_api) => { dispatch(ChartActions.getChartPerfPorter(token_api, { setIsMounted })) }
    const chartPerfPorter = useSelector(state => state.reducerCharts.payload_PP);

    React.useEffect(() => {
        const token_api = user.payload.tokenapi;
        getChartPerfPorter(token_api, { setIsMounted });
    }, []);

    const chartDataLabel = [];
    const chartDataInfo = [];
    const chartDataLabelExplain = [];

    if (chartPerfPorter.length > 0) {
        for (i = 0; i < chartPerfPorter.length; i++) {
            chartDataLabel.push(
                chartPerfPorter[i].abvName
            );
            chartDataInfo.push(
                chartPerfPorter[i].positivePercentagem
            );
            chartDataLabelExplain.push({
                abvName: chartPerfPorter[i].abvName,
                firstName: chartPerfPorter[i].firstName
            })
        }
    }

    return (
        <View>
            <Stack mt={5}>
                <Center>
                    <Text fontWeight={"bold"}>
                        PORTER PERFORMANCE IN %.
                    </Text>
                <BarChart
                    data={{
                        labels: chartDataLabel,
                        datasets: [
                            {
                                data: chartDataInfo,
                                colors: [
                                    (opacity = 1) => `#5C5CFF`,
                                    (opacity = 1) => `white`,
                                    (opacity = 1) => `#00FFFF`,
                                    (opacity = 1) => `#FF5733`,
                                    (opacity = 1) => `#d896ff`,
                                    (opacity = 1) => `#005b96`,
                                    (opacity = 1) => `#fb9f9f`,
                                    (opacity = 1) => `#1e1e1e`,
                                    (opacity = 1) => `#ffbaba`,
                                    (opacity = 1) => `#a70000`,
                                    (opacity = 1) => `yellow`,
                                    (opacity = 1) => `#ffbaba`,
                                    (opacity = 1) => `#d0d0d0`,
                                    (opacity = 1) => `#e47200`,
                                    (opacity = 1) => `#4b6043`,
                                    (opacity = 1) => `#A3A300`,
                                    (opacity = 1) => `#32CD32`,
                                ],
                            },
                        ],
                    }}
                    yAxisSuffix='%'
                    style={{
                        marginVertical: 8,
                        borderRadius: 16,
                    }}
                    fromZero={true}
                    withCustomBarColorFromData={true}
                    flatColor={true}
                    withVerticalLabels={true}
                    width={Dimensions.get('window').width - 16}
                    height={220}
                    showValuesOnTopOfBars={true}
                    verticalLabelRotation={40}
                    showBarTops={false}
                    chartConfig={{
                        style: {
                            borderRadius: 16,
                        },
                        barPercentage:0.25,
                        barRadius:10,
                        backgroundColor: '#1cc910',
                        backgroundGradientFrom: '#00baf3',
                        backgroundGradientTo: '#061b21',
                        decimalPlaces: 0,
                        color: (opacity = 1) => `white`,
                        labelColor: (opacity = 1) => `white`,
                        propsForLabels:{
                            fontWeight:"bold",
                            fontSize:12,
                        },
                        propsForBackgroundLines: {
                            strokeWidth: "2",
                            stroke: "rgba(255, 255, 255, 0.4)"
                        },
                        
                    }}
                />
                </Center>
                <View justifyContent={"center"} flexDir={"row"} flexWrap={"wrap"}  >
                {chartDataLabelExplain.map((item,index)=>{
                    return(
                        <HStack space={0} alignItems={"center"} key={index}>
                            <Text fontWeight={"bold"}>{"| "+item.abvName}</Text>
                            <Text>{"-"+item.firstName}</Text>
                        </HStack>
                    )
                })}
                </View>
                <Divider {...nativeBaseProps.DIVIDERS}></Divider>
            </Stack>
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