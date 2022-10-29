import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';

class GeneralUtils {

    validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/;

        if(re.test(email)){
            return true;
        }
        return false;
    };

    validateRooms(roomNumber, rooms, requestType){

        const onlyRooms = [];

        for(var i = 0; i<rooms.payload.rooms.length; i++){
            onlyRooms.push(rooms.payload.rooms[i].roomnumber.toString());
        }

        if(onlyRooms.includes(roomNumber.toString()) || (requestType == "OTHER" && roomNumber == 0)){
            return(true);
        }else{
            return(false);
        }
        
    }

    date_DBformat(dateToday, time = 0){

        let newDateToday = new Date(dateToday);
        if(time === 0){
          newDateToday = newDateToday.getFullYear() + "-" + ("0" + (newDateToday.getMonth() + 1)).slice(-2) + "-" + ("0" + newDateToday.getDate()).slice(-2);
        }
        else{
          newDateToday = newDateToday.getFullYear() + "-" + ("0" + (newDateToday.getMonth() + 1)).slice(-2) + "-" + ("0" + newDateToday.getDate()).slice(-2)+"  "+newDateToday.getHours()+":"+newDateToday.getMinutes();
        }
        return newDateToday;
    };

    generatePassword(length = 10){
        const passwordPossibilities = "ABCDEFGHIJKLMNOPQRSTUVWYXZabcdefghijklmnopqrstuvwxyz0123456789!@#*";
        let password = "";
        for (let i = 0;i <= length; i++){
            let letterAt = Math.floor(Math.random()*(passwordPossibilities.length+1));
            password += passwordPossibilities.charAt(letterAt); 
        }
        return password;
    }

    registerForPushNotificationsAsync = async () => {

        if (Device.isDevice) {
          const { status: existingStatus } = await Notifications.getPermissionsAsync();
          let finalStatus = existingStatus;
          if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
          }
          if (finalStatus !== 'granted') {
            alert('Failed to get push token for push notification!');
            return;
          }
          
          const token = (await Notifications.getExpoPushTokenAsync()).data;
          return token;
        } else {
          alert('Must use physical device for Push Notifications');
        }
      
        if (Platform.OS === 'android') {
          Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
          });
        }
    };
}

var generalUtils = new GeneralUtils();
export default generalUtils;