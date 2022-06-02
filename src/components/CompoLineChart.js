// import React in our code
import React from 'react';

// import all the components we are going to use
import {
  Text,
  Dimensions,
  View,
} from 'react-native';

// Import the chart component
import {LineChart } from 'react-native-chart-kit';

export default function PerformanceLineChart() {
    return (
        <View>
        <Text>Your Performance IN % - PERCENTAGEM:</Text>
        <LineChart
          data={{
            labels: ['January', 'February', 'March', 'April', 'May', 'June'],
            datasets: [
              {
                data: [20, 45, 28, 80, 99, 43],
                strokeWidth: 3,
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`
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
            labelColor:(opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            propsForDots: {
                r: "5",
                strokeWidth: "1",
                stroke: "#FFFFFF"
            },
            propsForBackgroundLines:{
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
        </View>
    );
  };