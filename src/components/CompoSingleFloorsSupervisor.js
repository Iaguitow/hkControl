import React, { useState, useEffect } from 'react';
import { CheckIcon, Icon, Select} from "native-base";
import { Entypo } from "@expo/vector-icons";

export default function SingleSelectFloorSupervisor({supervisors, supervsiorSelected, setFloorMaped, floorMaped, idfloors}) {

    const [listofResponsible, setResponsible] = useState([]);
    const [supervisorSelected, setSupervisorSelected] = useState(supervsiorSelected);

    useEffect(()=>{
        setResponsible(supervisors);
    },[supervisors]);

    return (
        <Select
            selectedValue={supervisorSelected}
            onValueChange={idSupervisor => {
                    setSupervisorSelected(idSupervisor);
                    for(var i = 0; i<floorMaped.length; i++){
                        if(floorMaped[i].idfloors === idfloors){
                            floorMaped[i].fk_supervisor_floor = idSupervisor;
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
        accessibilityLabel: "Choose Supervisor",
        placeholder: "Choose Supervisor",
        borderRadius: 10,
        _selectedItem: {
            bg: "#00b9f3",
            endIcon: <CheckIcon size="5" />,
        },
        dropdownIcon: <Icon name="chevron-down" size={"sm"} color={"#00b9f3"} as={Entypo} />
    },
}