import React, { useState, useEffect } from 'react';
import { CheckIcon, Icon, Select} from "native-base";
import { Entypo } from "@expo/vector-icons";

export default function SingleSelectFloorResponsible({responsible, responsibleSelected, setFloorMaped, floorMaped, idfloors, setIsMounted}) {

    const [listofResponsible, setResponsible] = useState([]);
    const [porterSelected, setPorterSelected] = useState(null);

    useEffect(()=>{
        setResponsible(responsible);
        setPorterSelected(responsibleSelected);
        return () =>{setIsMounted(true);}
    },[responsible]);
    
    return (
        <Select
            selectedValue={porterSelected}
            onValueChange={idPorter => {
                    setPorterSelected(idPorter);
                    for(var i = 0; i<floorMaped.length; i++){
                        if(floorMaped[i].idfloors === idfloors){
                            floorMaped[i].fk_porter_floor = idPorter;
                        }
                    }
                    setFloorMaped(floorMaped);
                }
            }
            textAlign={"center"}
            {...NATIVEBASE_PROPS.SELECT}
        >
            {
                listofResponsible.map((item, index) => {
                    return (
                        <Select.Item
                            _text={
                                {
                                    fontWeight: "bold" 
                                }
                            }
                            {...NATIVEBASE_PROPS.SELECT_ITEM} key={index}
                            label={item.name} value={item.id}
                        />
                    );
                })
            }
        </Select>

    );
}

const NATIVEBASE_PROPS = {
    SELECT_ITEM:{
        borderBottomWidth: 3,
        borderColor: "#00b9f3",
    },
    SELECT: {
        w:"90%",
        fontSize: 16,
        height: 50,
        alignSelf: "center",
        borderWidth: 2,
        borderColor: "#00b9f3",
        accessibilityLabel: "Choose Porter",
        placeholder: "Choose Porter",
        borderRadius: 10,
        _selectedItem: {
            bg: "#00b9f3",
            endIcon: <CheckIcon size="5" />,
        },
        dropdownIcon: <Icon name="chevron-down" size={"sm"} color={"#00b9f3"} as={Entypo} />
    },
}