import { actionsTypes } from "./ConstActions";
import dbPeople from "../classes/ClassDBPeople";

const PeopleActions = {
    getPeople:(peopleList = false, idpeople, token_api) => dispatch =>{
        dbPeople.getPeople(peopleList, idpeople, token_api).then(response =>{
            dispatch({
                type: actionsTypes.GET_PEOPLE,
                payload: {people:response.data, error_message: null},
            });
        }).catch(error =>{
            dispatch({
                type: actionsTypes.GET_PEOPLE_ERROR,
                payload: {people:null, error_message: error},
            });
        }).finally(endPoint => {
            
        });
    },
    registerPeople: ()=>({
        type: "registerPeople"
    }),
    updatePeople: (idpeople, pushtoken, token_api) => dispatch =>{
        dbPeople.updatePeople(peopleList = false, idpeople,pushtoken,token_api).then(response =>{
            dispatch({
                type: actionsTypes.UPDATE_PEOPLE,
                payload: {people:response.data, error_message: null},
            });
        }).catch(error =>{
            dispatch({
                type: actionsTypes.UPDATE_PEOPLE_ERROR,
                payload: {people:null, error_message: error},
            });
        }).finally(endPoint => {

        });
    },
}

export { PeopleActions }