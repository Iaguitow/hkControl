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
    const getChartReqToBeDone = (token_api) => { dispatch(ChartActions.getChartReqToBeDone (token_api, { setIsMounted })) }
    const chartLongerReqToBeDone = useSelector(state => state.reducerCharts.payload_LR);

    React.useEffect(() => {
        const token_api = user.payload.tokenapi;
        getChartReqToBeDone(token_api, { setIsMounted });
    }, []);

    const chartDataLabel = [];
    const chartDataInfo = [];

    if (chartLongerReqToBeDone.length > 0) {
        for (i = 0; i < chartLongerReqToBeDone.length; i++) {
            chartDataLabel.push(
                chartLongerReqToBeDone[i].resquestdescription
            );
            chartDataInfo.push(
                chartLongerReqToBeDone[i].minuteDiff
            );

        }
    }

    return (
        <View>
            <Stack p={0}>
                <Center>
                    <Text fontWeight={"bold"}>
                        5 LONGER REQUESTS TO BE DONE:
                    </Text>
                    <Text fontWeight={"bold"}>
                        NUMBER MEANS MINUTES THAT IT TAKES TO BE DONE:
                    </Text>
                <BarChart
                    data={{
                        labels: chartDataLabel,
                        datasets: [
                            {
                                data: chartDataInfo,
                                colors: [
                                    (opacity = 1) => `#32CD32`,
                                    (opacity = 1) => `yellow`,
                                    (opacity = 1) => `#00FFFF`,
                                    (opacity = 1) => `#FF5733`,
                                    (opacity = 1) => `#d896ff`,
                                ]
                            },
                        ],
                    }}
                    style={{
                        marginVertical: 8,
                        borderRadius: 16,
                    }}
                    fromZero={true}
                    withCustomBarColorFromData={true}
                    flatColor={true}
                    withVerticalLabels={false}
                    width={Dimensions.get('window').width - 16}
                    height={220}
                    showValuesOnTopOfBars={true}
                    verticalLabelRotation={20}
                    showBarTops={true}
                    chartConfig={{
                        style: {
                            borderRadius: 16,
                        },
                        barPercentage:1,
                        barRadius:0,
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
                {chartDataLabel.map((item,index)=>{
                    return(
                        <HStack space={0} alignItems={"center"} key={index}>
                            <Icon
                                color={
                                    index==0?"#32CD32":index==1?"yellow.400":index==2?"#00FFFF":
                                    index==3?"#FF5733":index==4?"#d896ff":"transparent"
                                }
                                size={6}                               
                                as={<MaterialCommunityIcons name='square-rounded' />}
                            />
                            <Text>{"-"+item+" |"}</Text>
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