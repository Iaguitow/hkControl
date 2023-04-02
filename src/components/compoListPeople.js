import React, {useEffect, useState, memo} from "react"
import { SafeAreaView } from "react-native";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons"
import { useFocusEffect } from '@react-navigation/native';
import generalUtils from "../utils/GeneralUtils";
import { useSelector, useDispatch } from "react-redux";
import {
  Box,
  FlatList,
  Avatar,
  HStack,
  VStack,
  Text,
  Input,
  Icon,
  Button
} from "native-base";

const ListPeople = ({navigation}) => {

  const peopleList = useSelector(state => state.reducerPeople);

  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);

  useEffect(() =>{
    if (peopleList.payload.people !== null) {
        setMasterDataSource(peopleList.payload.people);
        setFilteredDataSource(peopleList.payload.people);
      }
  },[peopleList.payload.people]);

  return (
    <Box width={"100%"} flex={1}>
      <SafeAreaView>
        <Box borderColor={"gray.200"} borderBottomWidth={2}>
        <Input
          onChangeText={(text) =>{
            generalUtils.searchFilterFunction(text, masterDataSource, setFilteredDataSource, setSearch);
          }}
          value={search}
          alignSelf={"center"}
          marginTop={2}
          marginBottom={1}
          placeholder="Search Users..."
          bg="transparent"
          height={12}
          width="95%"
          borderRadius="20"
          borderWidth={3}
          fontSize="16"
          InputLeftElement={
            <Icon
              m="2"
              ml="3"
              size="6"
              color="gray.400"
              as={<MaterialIcons name="search" />}
            />
          }
        />
        </Box>
      </SafeAreaView>
      <FlatList
        data={filteredDataSource}
        scrollEnabled={true}
        renderItem={({ item, index }) => (
          <Box
            borderLeftWidth={8}
            borderRightWidth={8}
            borderLeftColor={item.active == "S"?"green.500":"red.600"}
            borderRightColor={item.active == "S"?"green.500":"red.600"}
            borderTopWidth={4}
            borderBottomWidth={4}
            borderColor="coolGray.300"
            pl="1"
            pr="2"
            py="2"
          >
            <HStack>
              <VStack width={"30%"} marginLeft={3}>
                <Avatar
                  borderWidth={5}
                  borderColor={"#00b9f3"}
                  size="110px"
                  source={item.profileImg === null?require('../../assets/defaultProfile2.png'):{uri:item.profileImg}}
                  onTouchStart={() =>{
                    
                  }}
                />
              </VStack>
              <VStack width={"63%"} position={"relative"} paddingTop={2}>
                <Text
                  fontSize={16}
                  color="coolGray.700"
                  bold
                >
                  {item.name}
                </Text>
                <Text
                  fontSize={14}
                  color="coolGray.600"
                >
                  {item.profession}
                </Text>
                <Button
                  onPress={() =>{
                    const payload = {
                      name: item.name,
                      email: item.email,
                      phonenumber: item.phonenumber,
                      active: item.active,
                      dtactive: item.dtactive,
                      dtdeactive: item.dtdeactive,
                      idpeople: item.id,
                      joblevel: item.joblevel
                    }
                    navigation.navigate("CompoProfile",{imgProfile:item.profileImg, profile:{payload:payload}, from:"listpeople"});
                  }}
                  endIcon={<Icon size={6} as={MaterialCommunityIcons} name="account-edit-outline"/>}
                >
                  <Text fontSize={16} fontWeight={"bold"} color={"white"}>
                    Click to edit
                  </Text>
                </Button>
                <HStack paddingTop={2} alignItems={"flex-end"} space={8}>
                  <Icon
                    alignSelf={"center"}
                    size={8}
                    as={MaterialCommunityIcons}
                    name="email-outline"
                    color="pink.500"
                    onPress={() =>{
                      generalUtils.sendEmail(item.email);
                    }}
                  />
                  <HStack alignSelf={"center"}>
                    <Icon
                      size={8}
                      as={MaterialIcons}  
                      name={"phone-enabled"}
                      color="#00b9f3"
                      onPress={() =>{
                        generalUtils.callNumber(item.phonenumber);
                      }}
                    />
                  </HStack>
                  <HStack alignSelf={"center"}>
                    <Icon
                      size={8}
                      as={MaterialCommunityIcons}  
                      name={"whatsapp"}
                      color="green.600"
                      onPress={() =>{
                        generalUtils.sendWhatsApp(item.phonenumber);
                      }}
                    />
                  </HStack>
                </HStack>
              </VStack>
            </HStack>
          </Box>
          
        )}
        keyExtractor={(item) => item.id}
      />
    </Box>
  )
}

export default memo(ListPeople);