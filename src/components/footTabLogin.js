import React from 'react';
import {
  Box,
  Text,
  Icon,
  HStack,
  Center,
  Pressable,
  Divider
} from 'native-base';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function FootTabLogin({ navigation, isLogin, isSignUping }) {
  const [selected, setSelected] = React.useState(2);
  return (
      <Box flex={0} bg="transparent">
        <HStack bg="rgb(3,17,29)" alignItems="center" shadow={6}>
        {/*****************************  REGISTER BUTTON *************************/}
          <Pressable
            disabled={isLogin || isSignUping? true:false}
            opacity={selected === 0 ? 1 : 0.5}
            py="3"
            flex={1}
            onPress={() => {
              try{
                setSelected(0);
                  setTimeout(() =>{
                    setSelected(2);
                    navigation.navigate("RegisterPeople");
                  },300);
              }
              catch(err){
                console.log(err);
              }
            }}>
            <Center>
              <Icon
                mb="1"
                as={
                  <MaterialCommunityIcons
                    name={'account-outline'}
                  />
                }
                color="rgb(0,185,243)"
                size="xl"
              />
              <Text color="rgb(0,185,243)" fontSize="14" fontWeight={"bold"}>
                REGISTER
              </Text>
            </Center>
          </Pressable>
          {/*****************************  LOST PASSWORD BUTTON *************************/}
          <Divider bgColor={"gray.700"} thickness="2" mx="1" orientation="vertical" />
          <Pressable
            disabled={isLogin || isSignUping? true:false}
            opacity={selected === 1 ? 1 : 0.5}
            py="2"
            flex={1}
            onPress={() => {
              setSelected(1);
                setTimeout(() => {
                  setSelected(2);
                  navigation.navigate("ScreenLoginRecovery");
                },300);
              }}
          >
            <Center>
              <Icon
                mb="1"
                as={<MaterialCommunityIcons name="lock-question" />}
                color="rgb(0,185,243)"
                size="xl"
              />
              <Text color="rgb(0,185,243)" fontSize="14" fontWeight={"bold"}>
                LOST PASSWORD
              </Text>
            </Center>
          </Pressable>
        </HStack>
      </Box>
  );
}