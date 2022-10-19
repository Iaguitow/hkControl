import axios from "axios";
import Toasts from "../components/CompoToast";

class Requests{

    getRequestLogs(idpeople,token_api){
        return new Promise((resolve,reject) => {
            try {  
                return axios({
                    method: "GET",
                    //HOUSE IP
                    url: "http://192.168.1.144:3000/routes/requestLog/requestLog",
                    //SCHOOL IP
                    //url: "http://172.26.192.211:3000/routes/requestLog",
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
}

var Request = new Requests();
export default Request;