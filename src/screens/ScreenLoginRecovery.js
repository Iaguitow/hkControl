import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import CompoLoginRecovery from '../components/CompoLoginRecovery';
import Logo from '../../assets/second_logo.svg';
import {
  VStack,
  HStack,
  Divider,
  Text,
  View
} from "native-base";

function LoginRecovery({ navigation }) {

  const [TextRecoveryLoginColor, setTextRecoveryLoginColor] = useState(true);
  const [TextLoginColor, setTextLoginColor] = useState(false);

  return (
    ///////////////////////// HEADER AND LOGO /////////////////////////
    <View style={{ flexDirection: "column", flexGrow: 1 }} >
      <View style={styles.Header}>
        <LinearGradient style={{ flex: 1 }}
          colors={['#00b9f3', '#061b21', '#061b21']}
          start={[1, 0]} end={[0, 3]}
          locations={[0.1, 0.4, 0.6]}
        >
          <VStack flex={1} safeAreaTop>
            <View justifyContent={"center"} flex={1} flexDirection={"row"}>
              <Logo width={150} height={150}> </Logo>
            </View>
            <View flex={1} flexDirection={"column"} justifyContent={"flex-end"}>
              <HStack alignSelf={"flex-end"} space={2} marginRight={3} mb={2}>
                <Text style={{ fontWeight: "bold", fontSize: 18, color: TextRecoveryLoginColor ? "rgb(0,185,243)" : "white" }}>Login Recovery</Text>
                <Divider bgColor={"gray.300"} thickness="2" mx="1" orientation="vertical" />
                <Text style={{ fontWeight: "bold", fontSize: 18, color: TextLoginColor ? "rgb(0,185,243)" : "white" }} onPress={() => {
                  setTextRecoveryLoginColor(false);
                  setTextLoginColor(true);
                  setTimeout(() => {
                    navigation.goBack();
                  }, 200);
                }}>
                  Login
                </Text>
              </HStack>
            </View>
          </VStack>
        </LinearGradient>
      </View>
      <CompoLoginRecovery navigation={navigation} />
    </View>
  );
}

export default LoginRecovery;

const styles = StyleSheet.create({
  Header: {
    flex: 0.4,
    backgroundColor: 'white',
    borderBottomLeftRadius: 100,
    width: "100%",
    overflow: "hidden"
  },
});