import { actionsTypes } from "./ConstActions";
import dbPeople from "../classes/ClassDBPeople";

const PeopleActions = {
    getPeople: () => ({
        type: "getPeople"
    }),
    registerPeople: ()=>({
        type: "registerPeople"
    }),
    updatePeople: (idpeople, pushtoken, token_api) => dispatch =>{
        dbPeople.updatePeople(idpeople,pushtoken,token_api).then(response =>{
            dispatch({
                type: actionsTypes.UPDATE_PEOPLE,
                payload: response.data[0],
            });
        }).catch(error =>{
            dispatch({
                type: actionsTypes.UPDATE_PEOPLE_ERROR,
                payload: error,
            });
        }).finally(endPoint => {

        });
    },
}

export { PeopleActions }