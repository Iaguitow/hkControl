import axios from "axios";
import Toasts from "../components/CompoToast";

class Requests{

    getRequestType(token_api){
        return new Promise((resolve,reject) => {
            try {  
                return axios({
                    method: "GET",
                    //HOUSE IP
                    url: "http://192.168.1.144:3000/routes/requests/requestType",
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

    getRequests(idpeople, token_api){
        return new Promise((resolve,reject) => {
            try {  
                return axios({
                    method: "GET",
                    //HOUSE IP
                    url: "http://192.168.1.144:3000/routes/requests/requests",
                    //SCHOOL IP
                    //url: "http://172.26.192.211:3000/routes/requests",
                    withCredentials: true,
                    params: {idpeople},
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

    updateRequests(idrequests, requestdone, idpeople, token_api){
        return new Promise((resolve,reject) => {
            try {  
                return axios({
                    method: "POST",
                    //HOUSE IP
                    url: "http://192.168.1.144:3000/routes/requests/update/requests",
                    //SCHOOL IP
                    //url: "http://172.26.192.211:3000/routes/update/requests",
                    withCredentials: true,
                    data: {idrequests,requestdone,idpeople},
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

    insertNewRequest(requestObj, token_api, idpeople){
        return new Promise((resolve,reject) => {
            try {  
                return axios({
                    method: "POST",
                    //HOUSE IP
                    url: "http://192.168.1.144:3000/routes/requests/insert/new_request",
                    //SCHOOL IP
                    //url: "http://172.26.192.211:3000/routes/insert/new_request",
                    withCredentials: true,
                    data: {requestObj, idpeople},
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