import axios from "axios";
import Toasts from "../components/CompoToast";

class JobCategory {

    getJobCategories(token_api){
        return new Promise((resolve,reject)=>{
            try {
                return axios({
                    method: "GET",
                    //HOUSE IP
                    url: "https://nodejsserver-hkcontroller.azurewebsites.net/routes/jobs/get/jobcategories",
                    //SCHOOL IP
                    //url: "http://172.26.192.211:3000/routes/jobs/get/jobcategories",
                    withCredentials: true,
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
        }).catch(err =>{
            reject(err);

        });
    }
    
}

var JobCategories = new JobCategory();
export default JobCategories;