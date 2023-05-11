//PACKAGES
import React, {memo} from 'react';
import { StatusBar,LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NativeBaseProvider, View} from 'native-base';
import { Provider } from "react-redux";
import { store } from "./store";
import 'react-native-gesture-handler';

// SCREENS
import Login from "./src/screens/ScreenLogin";
import RegisterPeople from "./src/screens/ScreenRegisterPeople";
import ScreenLoginRecovery from "./src/screens/ScreenLoginRecovery";
import Drawer from "./src/components/CompoDrawer"
import CompoProfile from "./src/components/CompoProfile";
import CompoFloorConfig from './src/components/CompoFloorConfig';
import CompoRequestConfig from './src/components/CompoRequestConfig';

LogBox.ignoreLogs([
  "The contrast ratio",
  "Non-serializable values were found in the navigation",
  "This can break usage such as persisting and restoring state",
]);

const Stack = createNativeStackNavigator();
StatusBar.setHidden(false);

function App() {

  return (
    <NativeBaseProvider>
      <Provider store={store}>
        <View flex={1}>
          <NavigationContainer independent={true}>
            <StatusBar style="inverted"/>
            <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
              <Stack.Screen name='Login' component={Login} />
              <Stack.Screen name='RegisterPeople' component={RegisterPeople}/>
              <Stack.Screen name='Drawer' component={Drawer}/>
              <Stack.Screen name='ScreenLoginRecovery' component={ScreenLoginRecovery} />
              <Stack.Screen name='CompoProfile' component={CompoProfile}/>
              <Stack.Screen name='CompoFloorConfig' component={CompoFloorConfig} />
              <Stack.Screen name="CompoRequestConfig" component={CompoRequestConfig} />
            </Stack.Navigator>
          </NavigationContainer>
        </View>
      </Provider>
    </NativeBaseProvider>
  )
}

export default memo(App);