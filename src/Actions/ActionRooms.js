import { actionsTypes } from "./ConstActions";
import dbRooms from "../classes/ClassDBRooms";

const ActionRooms = {
    getRooms: (token_api) => dispatch => {
        dbRooms.getRooms(token_api).then(response =>{
            dispatch({
                type: actionsTypes.GET_ROOMS,
                payload: {rooms:response.data, error_message: null},
            });
        }).catch(error => {
            dispatch({
                type: actionsTypes.GET_ROOMS_ERROR,
                payload: {rooms:null, error_message: error.message},
            });
        }).finally(endpoint =>{

        });
    },
}

export { ActionRooms }