import axios from "axios";
import Toasts from "../components/CompoToast";

class Profile {
    getProfile(idpeople, token_api){
        return new Promise((resolve,reject) => {
            try {
                axios({
                    method: "GET",
                    //HOUSE IP
                    url: "https://nodejsserver-hkcontroller.azurewebsites.net/routes/profiles/get/profiles/",
                    //SCHOOL IP
                    //url: "http://172.26.192.211:3000/routes/get/profiles/",
                    withCredentials: true,
                    params: {idpeople},
                    headers:{
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': "Bearer "+token_api
                    }
                }).then(response =>{
                    resolve(response);
                }).catch(error =>{
                    Toasts.showToast("Error","Connection Error",error.message+", If this error continue happening, please verify your connectionn or try again later. ");
                    reject(error);
                });
            } catch (error) {
                Toasts.showToast("Error","Connection Error",error.message+", If this error continue happening, please verify your connectionn or try again later. ");
                reject(error);
            }

        });
    }

    updateProfile(token_api, breakType = null, idpeople, profileObjec = null){
        return new Promise((resolve,reject) => {
            try {  
                return axios({
                    method: "POST",
                    //HOUSE IP
                    url: "https://nodejsserver-hkcontroller.azurewebsites.net/routes/profiles/update/profiles/",
                    //SCHOOL IP
                    //url: "http://172.26.192.211:3000/routes/update/profiles/",
                    withCredentials: true,
                    data: {breakType,idpeople,profileObjec},
                    headers:{
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': "Bearer "+token_api
                    }

                }).then(response => {
                    resolve(response);

                }).catch(error =>{
                    Toasts.showToast("Error","Connection Error",error.message+", If this error continue happening, please verify your connectionn or try again later. ");
                    reject(error);

                });

            } catch (error) {
                Toasts.showToast("Error","Connection Error",error.message+", If this error continue happening, please verify your connectionn or try again later. ");
                reject(error);

            }

        }).catch(err =>{
            reject(err);

        });
    }

    getProfileChart(userObject){
        return new Promise((resolve,reject) => {
            try {
                axios({
                    method: "GET",
                    //HOUSE IP
                    url: "https://nodejsserver-hkcontroller.azurewebsites.net/routes/profiles/get/profiles/chart/",
                    //SCHOOL IP
                    //url: "http://172.26.192.211:3000/routes/get/profiles/chart/",
                    withCredentials: true,
                    params: {idpeople:userObject.idpeople,joblevel:userObject.joblevel},
                    headers:{
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': "Bearer "+userObject.token_api
                    }
                }).then(response =>{
                    resolve(response);
                }).catch(error =>{
                    Toasts.showToast("Error","Connection Error",error.message+", If this error continue happening, please verify your connectionn or try again later. ");
                    reject(error);
                });
            } catch (error) {
                Toasts.showToast("Error","Connection Error",error.message+", If this error continue happening, please verify your connectionn or try again later. ");
                reject(error);
            }

        });
    }


} 

var Profiles = new Profile();
export default Profiles;