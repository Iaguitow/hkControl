import { LinearGradient } from 'expo-linear-gradient';
import React, { useState, useEffect } from 'react';
import { MaterialIcons } from "@expo/vector-icons";
import { SafeAreaView, Animated, View } from 'react-native';
import { useSelector, useDispatch } from "react-redux";
import {
  Stack,
  Text,
  HStack,
  Input,
  Box,
  Icon,
  ScrollView,
  Select,
  CheckIcon,
  Button,
  Divider
} from "native-base";

const CompoProfileContext = ({ navigation }) => {

  // FULL NAME //
  const [invalidName, setInvalidName] = useState(false);
  const [name, setName] = useState("");

  // EMAIL //
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [email, setEmail] = useState("");

  // PHONE //
  const [InvalidPhone, setInvalidPhone] = useState(false);
  const [phone, Setphone] = useState("");

  // CITY //
  const [city, setCity] = useState("");

  // ANIMATIONS //
  const [nameAnimation,] = useState(new Animated.Value(1));
  const [emailAnimation,] = useState(new Animated.Value(1));
  const [phoneAnimation,] = useState(new Animated.Value(1));

  // BORDER WIDTH //
  const [borderNameWidth, setBorderNameWidth] = useState(1);
  const [borderEmailWidth, setBorderEmailWidth] = useState(1);
  const [borderPhoneWidth, setBorderPhoneWidth] = useState(1);

  const dispatch = useDispatch();
  const user = useSelector(state => state.reducerLogin);

  useEffect(() => {
    const token_api = user.payload.tokenapi;
  
  },[]);

  return (
    <SafeAreaView style={{ flex: 1 }}>

      <LinearGradient {...nativeBaseProps.LinearColor}>
        <Box>
          <HStack>
            <Icon
              {...nativeBaseProps.ICON_GOBACK}
              onPress={() => { navigation.goBack(); }}
              as={<MaterialIcons name="arrow-back-ios" />}
            />
            <Box {...nativeBaseProps.BOX_TITLE}>
              <Text {...nativeBaseProps.TEXT_TITLE}> Profile Edition </Text>
            </Box>
          </HStack>
        </Box>
      </LinearGradient>

      <Box {...nativeBaseProps.BOX_BODY}>
        <ScrollView {...nativeBaseProps.SCROLLVIEW_BODY}>
          <Stack {...nativeBaseProps.STACK_BODY}>

            {/*/////////////////////////////////// INPUT FULL NAME /////////////////////////////////*/}
            <Animated.View style={{ transform: [{ scale: nameAnimation }] }}>
              <Input
                onChangeText={(text) => {
                  setName(text);
                }}
                onFocus={() => {
                  setBorderNameWidth(2);
                  Animated.timing(nameAnimation, {
                    toValue: 1.1,
                    duration: 300,
                    useNativeDriver: true
                  }).start();
                }}
                onEndEditing={() => {
                  setBorderNameWidth(1);
                  Animated.timing(nameAnimation, {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: true
                  }).start();
                }}
                InputLeftElement={
                  <Icon
                    as={<MaterialIcons name='person' />}
                    {...nativeBaseProps.ICON_INPUT}
                  />
                }
                isInvalid={invalidName}
                {...nativeBaseProps.INPUT}
                borderWidth={borderNameWidth}
                maxLength={50}
                placeholder="Full Name"
              />
            </Animated.View>

            {/*/////////////////////////////////// INPUT EMAIL /////////////////////////////////*/}
            <Animated.View style={{ transform: [{ scale: emailAnimation }] }}>
              <Input
                onChangeText={(text) => {
                  setEmail(text);
                }}
                onFocus={() => {
                  setBorderEmailWidth(2);
                  Animated.timing(emailAnimation, {
                    toValue: 1.1,
                    duration: 300,
                    useNativeDriver: true
                  }).start();
                }}
                onEndEditing={() => {
                  setBorderEmailWidth(1)
                  Animated.timing(emailAnimation, {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: true
                  }).start();
                }}
                InputLeftElement={
                  <Icon
                    as={<MaterialIcons name="mail" />}
                    {...nativeBaseProps.ICON_INPUT}
                  />
                }
                isInvalid={invalidEmail}
                {...nativeBaseProps.INPUT}
                borderWidth={borderEmailWidth}
                placeholder="Email"
                maxLength={50}
              />
            </Animated.View>

            {/*/////////////////////////////////// PHONE INPUT /////////////////////////////////*/}
            <Animated.View style={{ transform: [{ scale: phoneAnimation }] }}>
              <Input
                onChangeText={(text) => {
                  Setphone(text);
                }}
                onFocus={() => {
                  setBorderPhoneWidth(2);
                  Animated.timing(phoneAnimation, {
                    toValue: 1.1,
                    duration: 300,
                    useNativeDriver: true
                  }).start();
                }}
                onEndEditing={() => {
                  setBorderPhoneWidth(1);
                  Animated.timing(phoneAnimation, {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: true
                  }).start();
                }}
                InputLeftElement={
                  <Icon
                    as={<MaterialIcons name="phone" />}
                    {...nativeBaseProps.ICON_INPUT}
                  />
                }
                isInvalid={InvalidPhone}
                {...nativeBaseProps.INPUT}
                borderWidth={borderPhoneWidth}
                keyboardType='numeric'
                placeholder="Phone"
                maxLength={11}
              />
            </Animated.View>

            {/*/////////////////////////////////// CITY INPUT ////////////////////////////////aa/*/
              /*{!cities_available.payload.cities?null:
                <Select
                key={1}
                selectedValue={city}
                _selectedItem={{
                  bg: "teal.600",
                  endIcon: <CheckIcon size="5" />
                }}
                onValueChange={itemValue => setCity(itemValue)} 
                {...nativeBaseProps.INPUT}
                maxLength={50}
                placeholder="City Name"
              >
              {cities_available.payload.cities.map((item,index) =>{
                return(
                <Select.Item key={index} label={item.name} value={item.idcity}  />
                );
              })}
              </Select>
              }*/
            }
          </Stack>
        </ScrollView>
      </Box>
    </SafeAreaView>
  );
}

export default function CompoProfile({ navigation }) {
  return (
    <View flex={1}>
      <CompoProfileContext navigation={navigation} />
    </View>
  );
}

const nativeBaseProps = {
  ICON_INPUT: {
    color: "rgb(0,185,243)",
    size: 6,
    ml: "2"
  },
  INPUT: {
    w: "90%",
    autoCapitalize: "none",
    selectionColor: "black",
    color: "black",
    borderRadius: 10,
    borderColor: "rgb(0,185,243)",
    height: 50,
    fontSize: "md",
    placeholderTextColor: "rgb(0,185,243)",
    autoCompleteType: 'off',
    alignSelf: "center"
  },
  LinearColor: {
    colors: ['#061b21', '#00b9f3', '#00b9f3'],
    start: [1, 0],
    end: [0, 3],
    locations: [0.7, 0.1, 0.2],
  },
  TEXT_TITLE: {
    ml: "28%",
    color: "white",
    bold: true,
    fontSize: 16,
  },
  BOX_TITLE: {
    justifyContent: "center",
    w: "100%"
  },
  STACK_BODY: {
    space: 6,
    w: "100%",
    alignItems: "center",
    flex: 1,
    marginTop: 4
  },
  SCROLLVIEW_BODY: {
    w: "100%",
    flex: 1,
    marginTop: 4
  },
  BOX_BODY: {
    alignItems: "center",
    backgroundColor: "white",
    overflow: "hidden",
    flex: 1,
  },
  ICON_GOBACK: {
    size: 7,
    ml: 2,
    mt: 2,
    mb: 2,
    color: "rgb(255,255,255)"
  }
}