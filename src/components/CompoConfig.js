import React, { useState, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { useSelector, useDispatch } from "react-redux";

import { Text,Box,Heading,Stack,View,Button } from "native-base";
import SingleSelectFloorResponsible from './CompoSingleSelectFloorsResponsibles';
import SingleSelectFloorSupervisor from './CompoSingleFloorsSupervisor';
import Toasts from "./CompoToast";
import { ActionRooms } from "../Actions/ActionRooms.js";

const CompoConfig = ({token_api,isMounted,setIsMounted}) => {

    handleToastSavation = () => {
        Toasts.showToast("Save");
    }

    const dispatch = useDispatch();
    const updateFloor = (floorObj,token_api) => {dispatch(ActionRooms.updateFloors(floorObj,token_api,{setIsMounted, handleToastSavation})) }

    const floors = useSelector(state => state.reducerRooms);
    const peopleList = useSelector(state => state.reducerPeople);
    

    const [supervisors, setSupervisors] = useState([]);
    const [porters, setPorters] = useState([]);
    const [floorMaped, setFloorMaped] = useState([]);

    useEffect(()=>{

        const superviSors = peopleList.payload.people.filter(supervisors => supervisors.profession === "ROOM SUPERVISOR" && supervisors.active === "S");
        const porteRs = peopleList.payload.people.filter(porters => porters.profession === "HOUSE STEWARD" && porters.active === "S");

        setSupervisors(superviSors);
        setPorters(porteRs);

        if(!!peopleList.payload.people){
            setIsMounted(true);
            setFloorMaped(floors.payload_F.floors);
        }
        
    },[peopleList.payload.people]);

    return (
        <View>
        {isMounted && floorMaped.map((item, index) =>{
            return(
                <Stack 
                    flex={1} 
                    alignItems={"center"} 
                    space={2} 
                    mt={5}
                    mb={5}
                    shadow={'7'}
                    key={index}
                >
                    <Box alignItems="center">
                        <Box 
                            w="95%"
                            minW={"95%"} 
                            rounded="lg" 
                            overflow="hidden" 
                            borderColor="#00b9f3" 
                            borderWidth="2" 
                            backgroundColor="gray.50"
                        >
                            <Stack p="4" space={3}>
                                <Heading size="md" ml="-1">
                                    {item.floorname}
                                </Heading>
                                <Text color={"#00b9f3"} fontWeight="bold">
                                    SELECT FLOOR SUPERVISOR:
                                </Text>
                                {supervisors && <SingleSelectFloorSupervisor 
                                    supervisors={supervisors}
                                    supervsiorSelected={item.fk_supervisor_floor}
                                    setFloorMaped={setFloorMaped}
                                    floorMaped={floorMaped}
                                    idfloors={item.idfloors}
                                />}
                                <Text color={"#00b9f3"} fontWeight="bold">
                                    SELECT FLOOR PORTER:
                                </Text>
                                {porters && <SingleSelectFloorResponsible
                                    responsible={porters}
                                    responsibleSelected={item.fk_porter_floor}
                                    setFloorMaped={setFloorMaped}
                                    floorMaped={floorMaped}
                                    idfloors={item.idfloors}
                                />}
                                <Button
                                    {...nativeBaseProps.SAVE_BUTTON}
                                    isLoading={false}
                                    onPress={()=>{
                                        setIsMounted(true);
                                        var floorToSave = floorMaped.find(data => data.idfloors === item.idfloors);
                                        //var peopless = peopleList.payload.people.filter(data => data.profession === "HOUSE STEWARD" && data.active === "S");
                                        //console.log(peopless);
                                        updateFloor(floorToSave, token_api, setIsMounted, handleToastSavation);
                                    }}
                                >
                                    {"SAVE "+item.floorname}
                                </Button>
                            </Stack>
                        </Box>
                    </Box>
                </Stack>
            )
        })}
        </View>
    );
};

const nativeBaseProps = {
    SAVE_BUTTON:{
      bgColor:"rgb(0,98,130)",
      marginTop:5,
      alignSelf:"center",
      borderRadius:10,
      borderColor:"white",
      w: "70%",
      height:50,
      isLoadingText:"Submitting",
      variant:"outline",
      _loading:{
          bg: "rgba(0,185,243,0.5)",
          _text: { color: "rgb(0,185,243)", fontWeight: "bold", fontSize: "16" },
          borderWidth: 1,
      },
      _text:{
          fontWeight: "bold",
          fontSize: "16",
          color: "white"
      },
      _pressed:{
          gColor: "rgba(0,185,243,0.5)",
      }
  }
  
  }

export default CompoConfig;