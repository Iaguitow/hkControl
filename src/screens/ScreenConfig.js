import React, { useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { useSelector, useDispatch } from "react-redux";
import CompoConfig from '../components/CompoConfig';

import { View, ScrollView, Text } from "native-base";

const ScreenConfig = () => {
    const [isMounted, setIsMounted] = useState(false);

    return (
        <ScrollView>
            <View flex={1} alignItems={"center"}>
                <CompoConfig setIsMounted={setIsMounted}></CompoConfig>
                {isMounted && <CompoLoadingView />}
            </View>
        </ScrollView>
    );
};



export default ScreenConfig;