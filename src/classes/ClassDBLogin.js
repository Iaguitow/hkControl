import axios from "axios";
import LocalStorage from "../utils/LocalStorage";
import Toast from "../components/CompoToast"

class Login {
    postLogin(email, password){
        return new Promise((resolve, reject) =>{
            try {
                return axios({
                    method: "post",
                    url: "http://192.168.1.144:3000/routes/login",
                    withCredentials: true,
                    params: {email, password},
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    }
                }).then(function (response){
                    if(typeof response.data !== "object"){
                        alert(response.data);
                        return;
                    }
                    const user = response.data[0];
                    LocalStorage.storeUserSession(user.idpeople,user.email,user.name,user.tokenapi).then(() =>{
                        resolve(user);
                    });
                }).catch(function (error){
                    Toast.showToast("Error","Connection Error",error.message+", If this error continue happening, please verify your connectionn or try again later. ");
                    reject(false);
                }).finally(function (){

                });
            }      
            catch (error) {
                Toast.showToast("Error","Connection Error",error.message+", If this error continue happening, please verify your connectionn or try again later. ");
                reject(false);
            }
        });
    }
}

var login = new Login();
export default login;