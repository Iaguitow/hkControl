import React, { useState, useEffect } from 'react';
import { CheckIcon, Icon, Select} from "native-base";
import { Entypo } from "@expo/vector-icons";

export default function SingleSelect({multRequests, setMultRequests, requests_id, requests_type}) {

    const [requestInOut, setRequestInOut] = useState(requests_type);

    const arrayItems = [{dscarray:'IN'},{dscarray:'OUT'}, {dscarray:'FRONT'}, {dscarray:'CORRIDOR'}];

    useEffect(()=>{
        setRequestInOut(requests_type);
    },[multRequests]);

    return (
        <Select
            selectedValue={requestInOut}
            onValueChange={itemValue => {
                setRequestInOut(itemValue);
                    for(let item of Object.keys(multRequests)) {
                        if(multRequests[item].id == requests_id){
                            multRequests[item].type = itemValue.toString();
                        }
                    }
                    setMultRequests(multRequests);
                }
            }
            textAlign={"center"}
            {...NATIVEBASE_PROPS.SELECT}
        >
            {
                arrayItems.map((item, index) => {
                    return (
                        <Select.Item
                            _text={
                                {
                                    fontWeight: "bold",
                                    color: item.dscarray.toString().includes("OUT")?"red.700":"green.700" 
                                }
                            }
                            {...NATIVEBASE_PROPS.SELECT_ITEM} key={index}
                            label={item.dscarray} value={item.dscarray}
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
        w:"180%",
        fontSize: 16,
        height: 50,
        alignSelf: "center",
        borderWidth: 2,
        borderColor: "#00b9f3",
        accessibilityLabel: "Choose Request",
        placeholder: "Choose Request",
        borderRadius: 10,
        _selectedItem: {
            bg: "#00b9f3",
            endIcon: <CheckIcon size="5" />,
        },
        dropdownIcon: <Icon name="chevron-down" size={"sm"} color={"#00b9f3"} as={Entypo} />
    },
}