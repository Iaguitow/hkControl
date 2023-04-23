import axios from "axios";
import LocalStorage from "../utils/LocalStorage";
import Toast from "../components/CompoToast"

class Login {

  postRegisterPeople(name,email,phone,password,dateofbirth,dtactive,googleId = null){
      return new Promise((resolve, reject) =>{
        try {
            return axios({
                method: "post",
                //HOUSE IP
                url: "https://nodejsserver-hkcontroller.azurewebsites.net/routes/login/login/register",
                //SCHOOL IP
                //url: "http://172.26.192.211:3000/routes/login/register",
                withCredentials: true,
                data: {name,email,phone,password,dateofbirth,dtactive,googleId},
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            }).then(function (response){
                resolve(response.data);  
              
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

  postLogin(email, password, googleAcessToken = ""){
      return new Promise((resolve, reject) =>{
          try {
              return axios({
                  method: "post",
                  //HOUSE IP
                  url: "https://nodejsserver-hkcontroller.azurewebsites.net/routes/login/login/",
                  //SCHOOL IP
                  //url: "http://172.26.192.211:3000/routes/login",
                  withCredentials: true,
                  data: {email, password},
                  headers: {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json',
                  }
              }).then(function (response){
                  if(typeof response.data === "string"){
                    console.log(response);
                      Toast.showToast(response.data);
                      resolve(response.data);
                  }
                  const user = response.data[0];
                  LocalStorage.storeUserSession(user.idpeople,user.email,user.name,user.tokenapi, googleAcessToken).then(() =>{
                      resolve(user);
                  }).catch((error) => {reject(error)});
              }).catch(function (error){
                  console.log(error);
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

  getLoginRecoveryCode(to, subject, text) {
        return new Promise((resolve, reject) => {
          try {
            return axios({
              method: 'PUT',
              //HOUSE IP
              url: "https://nodejsserver-hkcontroller.azurewebsites.net/routes/login/login/recoverycode",
              //SCHOOL IP
              //url: "http://172.26.192.140:3000/routes/login/recoverycode",
              withCredentials: true,
              params: { to, subject, text },
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              }
            }).then(function (response) {
              resolve(response.data);
            }).catch(function (error) {
              Toast.showToast("Error","Connection Error",error.message+", If this error continue happening, please verify your connectionn or try again later. ");
              reject(false);
            }).finally(function () {
              
            });
          } catch (error) {
            Toast.showToast("Error","Connection Error",error.message+", If this error continue happening, please verify your connectionn or try again later. ");
            reject(false);
          }
        })
  }

  postNewPassword(code, password, email) {
        return new Promise((resolve, reject) => {
          try {
            return axios({  
              method: 'POST',
              //HOUSE IP
              url: "https://nodejsserver-hkcontroller.azurewebsites.net/routes/login/login/resetpassword",
              //SCHOOL IP
              //url: "http://172.26.192.211:3000/routes/login/resetpassword",
              withCredentials: true,
              data: { code, password, email},
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              }
            }).then(function (response) {
              resolve(response.data);
            }).catch(function (error) {
              Toast.showToast("Error","Connection Error",error.message+", If this error continue happening, please verify your connectionn or try again later. ");
              reject(false);
            }).finally(function () {
              
            });
          } catch (error) {
            Toast.showToast("Error","Connection Error",error.message+", If this error continue happening, please verify your connectionn or try again later. ");
            reject(false);
          }
        })
  }
  
}

var login = new Login();
export default login;