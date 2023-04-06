import axios from "axios";
import Toasts from "../components/CompoToast";

class Room{

    getRooms(token_api){
        return new Promise((resolve,reject) => {
            try {
                return axios({
                    method: "GET",
                    //HOUSE IP
                    url: "http://192.168.0.17:3000/routes/rooms/rooms",
                    //SCHOOL IP
                    //url: "http://172.26.192.211:3000/routes/rooms/rooms",
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

    getFloors(token_api){
        return new Promise((resolve,reject) => {
            try {
                return axios({
                    method: "GET",
                    //HOUSE IP
                    url: "http://192.168.0.17:3000/routes/rooms/floors",
                    //SCHOOL IP
                    //url: "http://172.26.192.211:3000/routes/rooms/floors",
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

    updateFloor(floorObj, token_api){
        return new Promise((resolve,reject) => {
            try {  
                return axios({
                    method: "POST",
                    //HOUSE IP
                    url: "http://192.168.0.17:3000/routes/rooms/floors/update/floor",
                    //SCHOOL IP
                    //url: "http://172.26.192.211:3000/routes/update/floor",
                    withCredentials: true,
                    data: {floorObj},
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

var Rooms = new Room();
export default Rooms;