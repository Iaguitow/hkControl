import React, { useState, useEffect } from 'react';
import { CheckIcon, Icon, Select} from "native-base";
import { Entypo } from "@expo/vector-icons";

export default function SingleSelectJobCategory({categories,userJobLevel, jobSelected, setJobSelected}) {

    const [listJobs, setListJobs] = useState([]);

    useEffect(()=>{
        setListJobs(categories);
    },[]);

    return (
        <Select
            isDisabled={userJobLevel.toString().includes("HS","PA")?true:false}
            selectedValue={jobSelected}
            onValueChange={itemValue => {
                setJobSelected(itemValue);

                }
            }
            textAlign={"center"}
            {...NATIVEBASE_PROPS.SELECT}
        >
            {
                listJobs.map((item, index) => {
                    return (
                        <Select.Item
                            _text={
                                {
                                    fontWeight: "bold" 
                                }
                            }
                            {...NATIVEBASE_PROPS.SELECT_ITEM} key={index}
                            label={item.categoryname} value={item.categorylevel}
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
        accessibilityLabel: "Choose the Category",
        placeholder: "Choose the Category",
        borderRadius: 10,
        _selectedItem: {
            bg: "#00b9f3",
            endIcon: <CheckIcon size="5" />,
        },
        dropdownIcon: <Icon name="chevron-down" size={"sm"} color={"#00b9f3"} as={Entypo} />
    },
}