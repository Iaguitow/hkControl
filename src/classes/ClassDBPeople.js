import axios from "axios";
import Toast from "../components/CompoToast"

class People {

  getPeople(listPeople = true, page = 1, idPeople = 0) {
    return new Promise((resolve, reject) => {
      try {
        return axios({
          method: 'get',
          //HOUSE IP
          url: "http://192.168.1.144:3000/routes/people/people",
          //SCHOOL IP
          //url: "http://172.26.192.211:3000/routes/people",
          withCredentials: true,
          params: { listPeople, page, idPeople },
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          }
        }).then(function (response) {
          if(typeof response.data !== "object"){
            alert(response.data);
            return;
          }
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

var people = new People();
export default people;