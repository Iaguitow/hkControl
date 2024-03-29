import React, { useState, useCallback, memo } from 'react';
import {Dimensions} from 'react-native';
import { Collapse, CollapseHeader, CollapseBody } from "accordion-collapse-react-native";
import { useSelector, useDispatch } from "react-redux";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TasksActions } from '../Actions/ActionTasks';
import {
  Box,
  HStack,
  Switch,
  Text,
  Divider,
  Center,
  Icon,
  VStack
} from "native-base";

const CompoTasks = ({ setIsMounted }) => {

  const windowheight = Dimensions.get('window').height;

  const [floorNameColor, setFloorNameColor] = useState(null);
  const setFloorName_Color = useCallback((index) => {
    setFloorNameColor(index);
  });

  const dispatch = useDispatch();
  const tasks = useSelector(state => state.reducerTasks);
  const user = useSelector(state => state.reducerLogin);
  const section = [];
  const updateTask = (idTask, taskdone, token_api, idpeople) => { dispatch(TasksActions.updateTask(idTask, taskdone, token_api, idpeople, { setIsMounted })) }

  if (tasks.payload.tasks !== null) {
    for (var i = 0, ii = tasks.payload.tasks.length; i < ii; i++) {

      if (i > 0 ? tasks.payload.tasks[i].floorname != tasks.payload.tasks[i - 1].floorname : true == true) {
        const items = [];
        for (var b = 0, bb = tasks.payload.tasks.length; b < bb; b++) {

          if (tasks.payload.tasks[b].floorname == tasks.payload.tasks[i].floorname) {
            items.push({
              portername: tasks.payload.tasks[b].portername,
              porterId: tasks.payload.tasks[b].porterId,
              supervisorname: tasks.payload.tasks[b].supervisorname,
              checked: tasks.payload.tasks[b].checked,
              timechecked: tasks.payload.tasks[b].timechecked,
              taskname: tasks.payload.tasks[b].taskname,
              idtask: tasks.payload.tasks[b].idTask,
              keyItem: b
            });
          }
        }
        section.push({
          porternameSection: tasks.payload.tasks[i].portername,
          floorname: tasks.payload.tasks[i].floorname,
          keySectionDay: tasks.payload.tasks[i].floorname,
          data: items
        });
      }
    }
  }

  return (
    <Box flex={1} Width={"100%"}>
        <HStack
          {...NativeBaseProps.HSTACK_HEADER}
        >
          <Text {...NativeBaseProps.TEXT_DESCRIPTION}>
            DESCRIPTION {/*DESCRIPTION*/}
          </Text>
          <Divider {...NativeBaseProps.DIVIDER} />
          <Text {...NativeBaseProps.TEXT_TIME_DONE}>
            T.D. {/*DT DONE*/}
          </Text>
          <Divider {...NativeBaseProps.DIVIDER} />
          <Text {...NativeBaseProps.TEXT_DONE}>
            DONE {/*DT DONE*/}
          </Text>
        </HStack>
        {section.map((obj, index) => {
          return (
            <Collapse
              key={obj.floorname}
              isExpanded={floorNameColor == index ? true : false}
              onToggle={(floorCollapseStatus) => {
                setFloorName_Color(floorCollapseStatus ? index : null);
              }}
            >
              <CollapseHeader 
                style={{ marginTop: 4}}
              >
                <VStack
                  height={((windowheight-200)/8)}
                  {...NativeBaseProps.HSTACK_FLATLIST_HEADER_ITEM}
                >
                  <Center {...NativeBaseProps.CENTER} >
                    <HStack
                      alignItems={"center"}
                    >
                      <Text {...NativeBaseProps.TEXT_DESCRIPTION_HEADER_LIST}
                        color={floorNameColor == index ? "white" : "coolGray.800"}
                      >
                        {obj.floorname}
                      </Text>
                      <Icon
                        size={8}
                        as={<MaterialCommunityIcons name="office-building" />}
                        color={floorNameColor == index ? "white" : "coolGray.800"}
                      />
                    </HStack>
                    <Text
                      color={floorNameColor == index ? "white" : "coolGray.800"}
                    >
                      {obj.porternameSection}
                    </Text>
                  </Center>
                </VStack>
              </CollapseHeader>
              <CollapseBody>
                <VStack {...NativeBaseProps.VSTACK_FLATLIST} >
                  {
                    obj.data.map((item) => {
                      return (

                        <HStack
                          {...NativeBaseProps.HSTACK_FLATLIST_ITEM}
                          key={item.keyItem}
                          borderBottomWidth={4}
                          borderBottomColor={"#00b9f3"}
                        //borderBottomColor={item.checked == "N" ? "red.500" : "#00FF00"}
                        >
                          <Text  {...NativeBaseProps.TEXT_DESCRIPTION}>{item.taskname}</Text>
                          <Divider {...NativeBaseProps.DIVIDER} />
                          <Text fontSize={11} {...NativeBaseProps.TEXT_TIME_DONE}>
                            {item.timechecked}
                          </Text>
                          <Divider {...NativeBaseProps.DIVIDER} />
                          <Switch
                            disabled={item.porterId == user.payload.idpeople ? false : true}
                            onToggle={() => {
                              setIsMounted(false);
                              const token_api = user.payload.tokenapi;
                              const idpeople = user.payload.idpeople;
                              const taskdone = item.checked == "N" ? !false : null;
                              const idTask = item.idtask;
                              updateTask(idTask, taskdone, token_api, idpeople, { setIsMounted });
                            }}
                            isChecked={item.checked == "N" ? false : true}
                            {...NativeBaseProps.SWITCH}
                          />
                        </HStack>

                      )
                    })
                  }
                </VStack>
              </CollapseBody>
            </Collapse>
          )
        })
        }
    </Box>
  );
}

const NativeBaseProps = {
  CENTER: {
    width: "100%"
  },
  PICTURE_BUTTON: {
    mb: 0,
    minW: "100%",
    maxW: "100%",
    borderTopRadius: 0,
    borderBottomWidth: 4,
    _text: {
      fontWeight: "bold",
      fontSize: "16",
      color: "white"
    },
  },
  VSTACK_FLATLIST: {
    alignItems: "center",
  },
  HSTACK_FLATLIST_ITEM: {
    space: 1,
    alignItems: "center",
    alignSelf: "center",
    minH: 60,
    borderTopRadius: 0,
    bgColor: "rgba(255,255,255,0.4)",
    mb: 0,
    minW: "100%"
  },
  HSTACK_FLATLIST_HEADER_ITEM: {
    space: 1,
    alignItems: "center",
    minH: 60,
    borderTopRadius: 0,
    bgColor: "rgba(255,255,255,0.4)",
    borderBottomWidth: 4,
    borderBottomColor: "gray.400",
    width: "100%"
  },
  SWITCH: {
    onTrackColor: "#00FF00",
    maxW: "12%",
    minW: "12%",
    offTrackColor: "red.600"
  },
  TEXT_DONE: {
    maxW: "12%",
    minW: "12%",
    textAlign: "center",
    fontWeight: "bold",
    color: "white"
  },
  TEXT_TIME_DONE: {
    maxW: "8%",
    minW: "8%",
    textAlign: "center",
    fontWeight: "bold",
    color: "white"
  },
  TEXT_DESCRIPTION: {
    maxW: "75%",
    minW: "75%",
    noOfLines: 5,
    textAlign: "center",
    color: "white"
  },
  TEXT_DESCRIPTION_HEADER_LIST: {
    noOfLines: 20,
    fontWeight: "bold",
    fontSize: 18,
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
    bgColor: "rgba(0,185,243,0.5)"
  },
  DIVIDER: {
    bg: "gray.400",
    thickness: "2",
    orientation: "vertical"
  },
}

export default memo(CompoTasks);