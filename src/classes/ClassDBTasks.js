import axios from "axios";
import Toasts from "../components/CompoToast";

class Tasks{

    getTasks(idpeople, token_api){
        return new Promise((resolve,reject) => {
            try {
                return axios({
                    method: "GET",
                    //HOUSE IP
                    url: "http://192.168.0.17:3000/routes/tasks/tasks",
                    //SCHOOL IP
                    //url: "http://172.26.192.211:3000/routes/tasks",
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

    updateTasks(idTask, taskdone, token_api, idpeople){
        return new Promise((resolve,reject) => {
            try {  
                return axios({
                    method: "POST",
                    //HOUSE IP
                    url: "http://192.168.0.17:3000/routes/tasks/update/tasks",
                    //SCHOOL IP
                    //url: "http://172.26.192.211:3000/routes/update/tasks",
                    withCredentials: true,
                    data: {idTask,taskdone, idpeople},
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

var Task = new Tasks();
export default Task;