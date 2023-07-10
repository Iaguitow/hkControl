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

    getFloors: (token_api, {setIsMounted}) => dispatch => {
        dbRooms.getFloors(token_api).then(response =>{
            dispatch({
                type: actionsTypes.GET_FLOORS,
                payload_F: {floors:response.data, error_message: null},
            });
        }).catch(error => {
            dispatch({
                type: actionsTypes.GET_FLOORS_ERROR,
                payload_F: {floors:null, error_message: error.message},
            });
        }).finally(endpoint =>{

        });
    },

    updateFloors: (floorObj,token_api, {setIsMounted, handleToastSavetion, setLoadingButton_floor}) => dispatch => {
        dbRooms.updateFloor(floorObj, token_api).then(response =>{
            handleToastSavetion();
            dispatch({
                type: actionsTypes.UPDATE_FLOORS,
                payload_F: {floors:response.data, error_message: null},
            });
        }).catch(error => {
            dispatch({
                type: actionsTypes.UPDATE_FLOORS_ERROR,
                payload_F: {floors:null, error_message: error.message},
            });
        }).finally(endpoint =>{
            setLoadingButton_floor(null);
            setIsMounted(true);
        });
    },
}

export { ActionRooms }