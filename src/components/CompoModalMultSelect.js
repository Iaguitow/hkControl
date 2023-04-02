import React, {Component, useState, useEffect} from 'react'
import {View, Text, StyleSheet} from 'react-native'
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import { MaterialIcons } from "@expo/vector-icons";
  
export default function SelectRequest({setMultRequests, requestTypeArray, selectIsDisabled, setSaveButtonIsDisabled, multRequests}) {

    const [selectedItems, setSelectedItems] = useState([]);

    const onSelectedItemsChange = (selectedItems) => {
      setSelectedItems(selectedItems);
    };

      return (
        <View
          style={{
            borderRadius:10,
            borderWidth:2,
            borderColor:'#00b9f3',
            marginBottom:10,
            height:70
          }
          }
        >
          <SectionedMultiSelect
             styles={{
                selectedSubItemText: {
                  color: '#00b9f3',
                  fontWeight:"bold"
                },
                button:{
                  backgroundColor:'#00b9f3'
                },
                selectToggleText:{
                  fontWeight:"bold",
                  color:selectIsDisabled?"#d3d3d3":"#00b9f3"
                }
              }
             }
            disabled={selectIsDisabled}
            confirmText='SELECT'
            modalWithSafeAreaView={true}
            showRemoveAll={true}
            items={requestTypeArray}
            IconRenderer={MaterialIcons}
            uniqueKey="id"
            subKey="children"
            selectText="Choose Requests..."
            showDropDowns={true}
            readOnlyHeadings={true}
            onSelectedItemsChange={onSelectedItemsChange}
            selectedItems={selectedItems}
            showCancelButton={true}
            showChips={false}
            expandDropDowns={true}
            onConfirm={()=>{

              const filteredResults = requestTypeArray[0].children.filter(result => {
                  return selectedItems.includes(result.id)
                }
              );
              
              if(multRequests.length>0){
                for(let itemFiltered of Object.keys(filteredResults)) {
                  for(let itemMult of Object.keys(multRequests)) {
                    if(multRequests[itemMult].id == filteredResults[itemFiltered].id){
                      filteredResults[itemFiltered].amount = multRequests[itemMult].amount;
                      filteredResults[itemFiltered].type = multRequests[itemMult].type;
                    }
                  }
                }
              }
              setMultRequests(filteredResults);
              setSaveButtonIsDisabled(filteredResults.length!==0?false:true);

            }}
          />
        </View>
      );

}