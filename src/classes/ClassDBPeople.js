import axios from "axios";
import Toast from "../components/CompoToast"

class People {

  getPeople(peopleList, idpeople, token_api) {
    return new Promise((resolve, reject) => {
      try {
        return axios({
          method: 'GET',
          //HOUSE IP
          url: "https://nodejsserver-hkcontroller.azurewebsites.net/routes/people/getPeople",
          //SCHOOL IP
          //url: "http://172.26.192.211:3000/routes/getPeople",
          withCredentials: true,
          params: {peopleList, idpeople},
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': "Bearer "+token_api
          }
        }).then(response => {
          resolve(response);
          
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

  updatePeople(peopleList, idpeople, pushExpoToken, token_api){
    return new Promise((resolve,reject) => {
        try {  
            return axios({
                method: "POST",
                //HOUSE IP
                url: "https://nodejsserver-hkcontroller.azurewebsites.net/routes/people/update/people",
                //SCHOOL IP
                //url: "https://nodejsserver-hkcontroller.azurewebsites.net/routes/people/update/people",
                withCredentials: true,
                data: {peopleList,idpeople,pushExpoToken},
                headers:{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': "Bearer "+token_api
                }

            }).then(response => {
                resolve(response);

            }).catch(error =>{
                Toast.showToast("Error","Connection Error",error.message+", If this error continue happening, please verify your connectionn or try again later. ");
                reject(error);

            });

        } catch (error) {
            Toast.showToast("Error","Connection Error",error.message+", If this error continue happening, please verify your connectionn or try again later. ");
            reject(error);

        }

    }).catch(err =>{
        reject(err);

    });
}
  
}

var people = new People();
export default people;