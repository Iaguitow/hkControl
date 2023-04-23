import axios from "axios";
import Toasts from "../components/CompoToast";

class Charts {
    getChartTotalRequestPerday(token_api){
        return new Promise((resolve,reject) => {
            try {
                axios({
                    method: "GET",
                    //HOUSE IP
                    url: "https://nodejsserver-hkcontroller.azurewebsites.net/routes/charts/get/chart/totalRequests/",
                    //SCHOOL IP
                    //url: "http://172.26.192.211:3000/routes/get/charts/totalRequests/",
                    withCredentials: true,
                    params: {},
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

    getChartReqToBeDone(token_api){
        return new Promise((resolve,reject) => {
            try {
                axios({
                    method: "GET",
                    //HOUSE IP
                    url: "https://nodejsserver-hkcontroller.azurewebsites.net/routes/charts/get/chart/longerRequestToBeDone/",
                    //SCHOOL IP
                    //url: "http://172.26.192.211:3000/routes/get/charts/longerRequestToBeDone/",
                    withCredentials: true,
                    params: {},
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

    getChartPerfPorter(token_api){
        return new Promise((resolve,reject) => {
            try {
                axios({
                    method: "GET",
                    //HOUSE IP
                    url: "https://nodejsserver-hkcontroller.azurewebsites.net/routes/charts/get/chart/perfPorter/",
                    //SCHOOL IP
                    //url: "http://172.26.192.211:3000/routes/get/charts/perfPorter/",
                    withCredentials: true,
                    params: {},
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
} 

var ChartsData = new Charts();
export default ChartsData;