import React, {useEffect, useState, memo} from "react"
import { RefreshControl } from "react-native"
import { SafeAreaView } from "react-native";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons"
import { PeopleActions } from "../Actions/ActionPeople.js";
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


const ListPeople = ({navigation, setIsMounted}) => {

 const peopleList = useSelector(state => state.reducerPeople);
 const user = useSelector(state => state.reducerLogin);

 const [search, setSearch] = useState('');
 const [filteredDataSource, setFilteredDataSource] = useState([]);
 const [masterDataSource, setMasterDataSource] = useState([]);
 const [refreshing, setRefreshing] = useState(false);

 useEffect(() =>{
  
   if (peopleList.payload.people !== null) {
       setMasterDataSource(peopleList.payload.people);
       setFilteredDataSource(peopleList.payload.people);
     }
 },[peopleList.payload.people]);

 const dispatch = useDispatch();
 const getPeople = (peopleList,idpeople,token_api,setIsMounted) => {dispatch(PeopleActions.getPeople(peopleList,idpeople,token_api,setIsMounted, setRefreshing)) }

 const onRefresh = React.useCallback(() => {
    setIsMounted(false);
    setRefreshing(true);
    const token_api = user.payload.tokenapi;
    const idpeople = user.payload.idpeople;
    const peopleList = true;
    getPeople(peopleList,idpeople,token_api,setIsMounted, setRefreshing);
}, []);

React.useEffect(() => {
  const unsubscribe = navigation.addListener('focus', (test) => {
    onRefresh();
  });

  return unsubscribe;
}, [navigation]);


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
       scrollIndicatorInsets={{ top: 1, bottom: 1 }}
       refreshControl={<RefreshControl tintColor={'black'} title={'UPDATING...'} titleColor={'black'} refreshing={refreshing} onRefresh={onRefresh} />}
       renderItem={({ item, index }) => (
         <Box
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
                 borderColor={ item.active == "S"?"#00b9f3":"red.600"}
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
                   navigation.navigate(
                    "CompoProfile",
                    
                    /*{imgProfile:item.profileImg, profile:{payload:payload}, from:"listpeople", onRefresh: () => {onRefresh}}*/
                    {imgProfile:item.profileImg, profile:{payload:payload}, from:"listpeople"}
                   );
                 }}
                 endIcon={<Icon size={6} as={MaterialCommunityIcons} name="account-edit-outline"/>}
                 backgroundColor={user.payload.screenFunctionAccess.EDIT_USER === "N"?"rgba(0,185,243,0.2)":"rgba(0,185,243,1)"}
                 disabled={user.payload.screenFunctionAccess.EDIT_USER === "N"?true:false}
                 shadow={9}
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

