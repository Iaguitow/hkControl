import React, {memo} from 'react';
import { ScrollView } from 'react-native';
import { Collapse, CollapseHeader, CollapseBody } from "accordion-collapse-react-native";
import { useSelector } from "react-redux";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  Box,
  HStack,
  Text,
  Divider,
  Center,
  Icon,
  Input
} from "native-base";

const CompoCheckList = ({ setIsMounted }) => {

  const checklist = useSelector(state => state.reducerCheckList);
  const section = [];

  if (checklist.payload.checklist !== null) {
    for (var i = 0, ii = checklist.payload.checklist.length; i < ii; i++) {

      if (i > 0 ? checklist.payload.checklist[i].floorname != checklist.payload.checklist[i - 1].floorname : true == true) {
        const items = [];
        for (var b = 0, bb = checklist.payload.checklist.length; b < bb; b++) {

          if (checklist.payload.checklist[b].floorname == checklist.payload.checklist[i].floorname) {
            items.push({
              portername: checklist.payload.checklist[b].portername,
              checkname: checklist.payload.checklist[b].checkname,
              idcheck: checklist.payload.checklist[b].idcheck,
              keyItem: b,
              keySelect: i + checklist.payload.checklist[b].portername + checklist.payload.checklist[b].idcheck,
            });
          }
        }
        section.push({
          floorname: checklist.payload.checklist[i].floorname,
          keySectionDay: checklist.payload.checklist[i].floorname,
          data: items
        });
      }
    }
  }

  return (
    <Box flex={1} Width={"100%"}>
      
        <ScrollView scrollIndicatorInsets={{ top: 1, bottom: 1 }}>
          <HStack
            {...NativeBaseProps.HSTACK_HEADER}
          >
            <Text {...NativeBaseProps.TEXT_DESCRIPTION}>
              DESCRIPTION {/*DESCRIPTION*/}
            </Text>
            <Divider {...NativeBaseProps.DIVIDER} />
            <Text {...NativeBaseProps.TEXT_HOW_MANY}>
              HOW MANY? {/*DT DONE*/}
            </Text>
          </HStack>
          {section.map((obj, index) => {
            return (
              
                <Collapse key={obj.floorname} disabled={true} isExpanded={true}>
                  <CollapseHeader style={{ marginTop: 5 }} >
                    <HStack
                      {...NativeBaseProps.HSTACK_FLATLIST_HEADER_ITEM}
                    >
                      <Center {...NativeBaseProps.CENTER} >
                        <Text {...NativeBaseProps.TEXT_DESCRIPTION_HEADER_LIST}>
                          {obj.floorname}
                        </Text>
                        <Icon
                          as={<MaterialCommunityIcons name="office-building" />}
                          {...NativeBaseProps.ICON_INPUT}
                        />
                      </Center>
                    </HStack>
                  </CollapseHeader>
                  <CollapseBody>
                    {
                      obj.data.map((item, index) => {
                        return (
                          <HStack
                            {...NativeBaseProps.HSTACK_FLATLIST_ITEM}
                            key={item.keySelect}
                          >
                            <Text  {...NativeBaseProps.TEXT_DESCRIPTION_ITEM}>{item.checkname}</Text>
                            <Divider {...NativeBaseProps.DIVIDER} />
                            <Input  {...NativeBaseProps.INPUT_AMOUNT} onEndEditing={(text) => {text.nativeEvent.text}}/>
                          </HStack>
                        )
                      })
                    }
                  </CollapseBody>
                </Collapse>
                
            )
          })
          }
          </ScrollView>

    </Box>

  );
}
const NativeBaseProps = {
  INPUT_AMOUNT: {
    width: "22%",
    textAlign: "center",
    fontSize: 18,
    keyboardType: 'numeric',
    placeholder: "Amount",
    maxLength: 2,
    selectionColor: "white",
    placeholderTextColor: "white",
    color: "white"
  },
  CENTER: {
    flexDirection: "row",
    width: "100%"
  },
  VSTACK_FLATLIST: {
    alignItems: "center",
    borderBottomWidth: 3,
    borderBottomColor: "gray.400"
  },
  ICON_INPUT: {
    color: "white"
  },
  LINEAR_BACK_GROUND_COLOR: {
    colors: ['#00b9f3', '#061b21', '#061b21'],
    start:[0.5, 1], 
    end:[0.5, 0],
    locations:[0, 0.8, 0.9],
    style: { flex: 1 },
  },
  HSTACK_FLATLIST_ITEM: {
    space: 1,
    alignItems: "center",
    alignSelf: "center",
    minH: 60,
    borderTopRadius: 0,
    bgColor: "rgba(255,255,255,0.4)",
    mb: 0,
    minW: "100%",
    borderBottomWidth: 3,
    borderBottomColor: "gray.400"
  },
  HSTACK_FLATLIST_HEADER_ITEM: {
    space: 1,
    alignItems: "center",
    minH: 60,
    borderTopRadius: 0,
    bgColor: "#00b9f3",
    borderBottomWidth: 4,
    borderBottomColor: "gray.400",
    width: "100%"
  },
  TEXT_HOW_MANY: {
    maxW: "50%",
    minW: "12%",
    textAlign: "center",
    fontWeight: "bold",
    color: "white"
  },
  TEXT_DESCRIPTION: {
    maxW: "75%",
    minW: "75%",
    noOfLines: 5,
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
    fontSize: 16
  },
  TEXT_DESCRIPTION_ITEM: {
    maxW: "75%",
    minW: "75%",
    noOfLines: 5,
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
  },
  TEXT_DESCRIPTION_HEADER_LIST: {
    noOfLines: 20,
    fontWeight: "bold",
    fontSize: 18,
    color: "white",
  },
  HSTACK_HEADER: {
    space: 1,
    alignItems: "center",
    alignSelf: "center",
    minH: 60,
    borderBottomWidth: 4,
    borderBottomColor: "#00b9f3",
    borderRadius: 5,
    my: 0,
    bgColor: "rgba(0,185,243,0.5)",
    width: "100%"
  },
  DIVIDER: {
    bg: "gray.400",
    thickness: "2",
    orientation: "vertical"
  },
}

export default memo(CompoCheckList);