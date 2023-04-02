import React, { useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { useSelector, useDispatch } from "react-redux";

import { View, ScrollView, Text } from "native-base";

const CompoConfig = () => {

    return (
        <ScrollView>
            <View flex={1} alignItems={"center"}>
                <Text>
                    Testando a tela de configuracao.
                </Text>
            </View>
        </ScrollView>
    );
};

export default CompoConfig;