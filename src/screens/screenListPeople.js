import React from 'react';
import { Center } from "native-base";
import ListPeople from "../components/CompoListPeople";

const ScreenListPeople = () => {
    return (
        <Center flex={1}>
            <ListPeople />
        </Center>
    );
};

export default ScreenListPeople;