// import React in our code
import React from 'react';
import { ProfileActions } from "../Actions/ActionProfile";

// import all the components we are going to use
import {
  Text,
  Dimensions
} from 'react-native';

import {
  Divider,
  HStack,
  Stack,
  View
} from "native-base";

// Import the chart component
import { LineChart } from 'react-native-chart-kit';
import { useSelector, useDispatch } from "react-redux";

export default function PerformanceLineChart({ setIsMounted }) {

  const user = useSelector(state => state.reducerLogin);

  const dispatch = useDispatch();
  const getProfileChart = (idpeople, token_api) => { dispatch(ProfileActions.getProfileChart(idpeople, token_api, { setIsMounted })) }

  const profileChart = useSelector(state => state.reducerProfile.payload_chart);

  React.useEffect(() => {
    setIsMounted(false);
    const token_api = user.payload.tokenapi;
    const idpeople = user.payload.idpeople;
    const joblevel = user.payload.joblevel;
    const userObject = { token_api, idpeople, joblevel }
    getProfileChart(userObject, { setIsMounted });
  }, []);

  const chartDataLabel = ['INITIAL'];
  const chartDataInfoPositive = [0];
  const chartDataInfoNegative = [0];

  if (profileChart.length > 0) {
    for (i = 0; i < profileChart.length; i++) {
      chartDataLabel.push(
        profileChart[i].monthRequests
      );
      chartDataInfoPositive.push(
        profileChart[i].positivePercentagem
      );
      chartDataInfoNegative.push(
        profileChart[i].negativePercentagem
      );

    }
  }

  return (
    <View>
      <Text>
        PERFORMANCE ON LAST FIVE MONTHS:
      </Text>
      <Text>Performance IN % - PERCENTAGE:</Text>
      <LineChart
        yAxisSuffix='%'
        renderDotContent={({ x, y, indexData }) => {
          return (
            <View
              key={indexData + Math.random()}
              style={{
                position: 'absolute',
                top: y - 16,
                left: x - 8,
              }}>
              <Text style={{ fontSize: 12, color: "white", fontWeight:"bold" }}>
                {indexData.toString() + "%"}
              </Text>
            </View>
          )
        }}
        data={{
          labels: chartDataLabel,
          datasets: [
            {
              data: chartDataInfoPositive,
              strokeWidth: 3,
              color: (opacity = 1) => `#00FFFF`
            },
            {
              data: chartDataInfoNegative,
              strokeWidth: 3,
              color: (opacity = 1) => `#FF5733`
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
      <Stack mt={2} space={2}>
      <HStack space={3}>
        <Divider
          bgColor="#00FFFF"
          thickness="3"
          orientation="horizontal"
          alignSelf="center"
          w={"20%"}
        />
        <Text>
          Requests done Within SLA.
        </Text>
      </HStack>
      <HStack space={3}>
        <Divider
          bgColor="#FF5733"
          thickness="3"
          orientation="horizontal"
          alignSelf="center"
          w={"20%"}
        />
        <Text>
          Requests done Outside SLA.
        </Text>
      </HStack>
      </Stack>
    </View>
  );
};