import { View, StyleSheet, Text, Animated } from 'react-native';
import React, {useEffect, useRef, memo} from 'react';
import LottieView from 'lottie-react-native';
import { BlurView } from "expo-blur";

function ApiLoading() {

  const fadeEffect = useRef(new Animated.Value(0)).current;

  useEffect(() =>{
    Animated.timing(fadeEffect,{
      toValue: 1,
      duration: 250,
      useNativeDriver: true
    }).start();   
  },[]);

  return (
    <Animated.View style={[StyleSheet.absoluteFillObject,{opacity:fadeEffect},styles.animatedView]}>
      <View style={ [StyleSheet.absoluteFillObject,styles.container]}>
          <BlurView intensity={10} style={styles.blur} >
            <LottieView style={styles.lottie} source={require("../../assets/loader2.json")} autoPlay loop/>
          </BlurView>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
    animatedView:{
      width:"100%", 
      flex:1, 
      alignItems:"center", 
      justifyContent:"center"
    },  
    blur:{
      height:"100%", 
      width:"100%", 
      alignItems:"center", 
      justifyContent:"center"
    },
    lottie:{
      width: 270,
      height: 270,
    },
    text:{
      color:"white",
      fontSize: 20,
      fontWeight: "bold",
      margin: -50
    },  
    container:{
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(255,255,255,0.3)",
        zIndex: 1,
        flex: 1,
    },
});

export default memo(ApiLoading);