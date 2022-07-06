import AsyncStorage from '@react-native-async-storage/async-storage';

class LocalStorage {

    async storeCheckListItems(idItem,amountItem){
        try {

            let checkListArray = [];
            let checkListObj = JSON.stringify({
                idItem: idItem,
                amountItem: amountItem
            });

            checkListArray.push(checkListObj);

            await AsyncStorage.setItem("checklist", checkListArray).then(result =>{
                return result;
            });

        } catch (error) {
            return error;
        }
    }

    async retrieveCheckListItems(key = "checklist"){
        try {
            const session = await AsyncStorage.getItem(checklist);
            if(session !== undefined){
                return session;
            }
            return false;
        } catch (error) {
            alert(error);
        }
    }

    async storeUserSession(idpeople,email,name,token, googleAcessToken){
        try {
            await AsyncStorage.setItem(
                "jwt_token", JSON.stringify({
                    idpeople: idpeople,
                    email: email,
                    name: name,
                    token: token,
                    googleAcessToken: googleAcessToken
                })
            ).then(result =>{
                return result;
            });
        } catch (error) {
            return error;
        }
    }
    async retrieveUserSession(userSession = "jwt_token"){
        try {
            const session = await AsyncStorage.getItem(userSession);
            if(session !== undefined){
                return session;
            }
            return false;
        } catch (error) {
            alert(error);
        }
    }
}

var localStorage = new LocalStorage();
export default localStorage;