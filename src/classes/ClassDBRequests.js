import axios from "axios";
import Toasts from "../components/CompoToast";

class Requests{

    getRequestType(token_api){
        return new Promise((resolve,reject) => {
            try {  
                return axios({
                    method: "GET",
                    //HOUSE IP
                    url: "http://192.168.0.17:3000/routes/requests/requestType",
                    //SCHOOL IP
                    //url: "http://172.26.192.211:3000/routes/requestType",
                    withCredentials: true,
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

    getRequests(userAccess, idpeople, joblevel, token_api){
        return new Promise((resolve,reject) => {
            try {  
                return axios({
                    method: "GET",
                    //HOUSE IP
                    url: "http://192.168.0.17:3000/routes/requests/requests",
                    //SCHOOL IP
                    //url: "http://172.26.192.211:3000/routes/requests",
                    withCredentials: true,
                    params: {userAccess,idpeople,joblevel},
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

    updateRequests(userAccess, idrequests, requestdone, idpeople, token_api, joblevel, whoresquested){
        return new Promise((resolve,reject) => {
            try {  
                return axios({
                    method: "POST",
                    //HOUSE IP
                    url: "http://192.168.0.17:3000/routes/requests/update/requests",
                    //SCHOOL IP
                    //url: "http://172.26.192.211:3000/routes/update/requests",
                    withCredentials: true,
                    data: {userAccess,idrequests,requestdone,idpeople, joblevel, whoresquested},
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

    insertNewRequest(userAccess, requestObj, token_api, idpeople,joblevel){
        return new Promise((resolve,reject) => {
            try {  
                return axios({
                    method: "POST",
                    //HOUSE IP
                    url: "http://192.168.0.17:3000/routes/requests/insert/new_request",
                    //SCHOOL IP
                    //url: "http://172.26.192.211:3000/routes/insert/new_request",
                    withCredentials: true,
                    data: {userAccess,requestObj, idpeople, joblevel},
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

}

var Request = new Requests();
export default Request;