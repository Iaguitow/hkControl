import React from 'react';
import { MaterialIcons } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import {
    Box,
    Text,
    Center,
    Icon,
    Actionsheet,
    ScrollView,
    Divider
} from "native-base";

export default function notificationList({ isOpen, onClose }) {

    const getIcon = (logType) => {
        switch (logType) {
            case 'UPDATED':
                return "update";
            case 'INSERTED':
                return "fiber-new";
            case 'CANCELED':
                return "cancel";
            default:
                return undefined;
        }
    };

    const getColorIcon = (logType) => {
        switch (logType) {
            case 'UPDATED':
                return "green.400";
            case 'INSERTED':
                return "rgb(0,185,243)";
            case 'CANCELED':
                return "red.400";
            default:
                return undefined;
        }
    };

    const requestlogs = useSelector(state => state.reducerRequestLog);

    const log = [];

    if (requestlogs.payload.logs !== null) {
        for (var i = 0, ii = requestlogs.payload.logs.length; i < ii; i++) {
            log.push({
                dtlog: requestlogs.payload.logs[i].dtlog,
                finaldescription: requestlogs.payload.logs[i].finaldescription,
                howmanylogsnotseen: requestlogs.payload.logs[i].howmanylogsnotseen,
                logtype: requestlogs.payload.logs[i].logtype,
                seen: requestlogs.payload.logs[i].seen
            });
        }
    }

    return (
        <Center>
            <Actionsheet isOpen={isOpen} onClose={onClose} size="full">
                <Actionsheet.Content>
                    <ScrollView w="100%">
                        <Box w="100%" h={60} px={4} justifyContent="center">
                            <Text fontSize="18" color="gray.600" fontWeight={"bold"}>
                                NEWS
                            </Text>
                        </Box>
                        <Divider thickness={4} bgColor={"rgb(0,185,243)"} borderRadius={10} ></Divider>
                        {log.map((item, index) => {
                            return (
                                <Box w="100%" justifyContent="center" key={index}>
                                    <Actionsheet.Item startIcon={<Icon color={getColorIcon(item.logtype.toString())} as={MaterialIcons} size="8" name={getIcon(item.logtype.toString())} />}>
                                        <Text py={1.5} fontSize="14" color="gray.600" fontWeight={"bold"}>
                                            {item.finaldescription.toString()}
                                        </Text>
                                    </Actionsheet.Item>
                                    <Divider thickness={2}></Divider>
                                </Box>
                            )
                        })
                        }
                    </ScrollView>
                </Actionsheet.Content>
            </Actionsheet>
        </Center>
    );
}