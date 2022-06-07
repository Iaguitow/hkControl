import { actionsTypes } from "./ConstActions";
import dbRequests from "../classes/ClassDBRequests";
import { useSelector } from "react-redux";

const RequestActions = {
    getRequests: (idpeople, token_api, {setIsMounted}) => dispatch => {
        dbRequests.getRequests(idpeople,token_api).then(response =>{
            dispatch({
                type: actionsTypes.GET_REQUESTS,
                payload: {requests:response.data, error_message: null},
            });
        }).catch(error => {
            dispatch({
                type: actionsTypes.GET_REQUESTS_ERROR,
                payload: {requests:null, error_message: error.message},
            });
        }).finally(endpoint =>{
            setIsMounted(true);
        });
    },
    updateRquests: (idrequests, requestdone, idpeople, token_api, {setIsMounted}) => dispatch => {
        dbRequests.updateRequests(idrequests, requestdone, idpeople, token_api).then(response =>{
            dispatch({
                type: actionsTypes.UPDATE_REQUESTS,
                payload: {requests:response.data, error_message: null},
            });
        }).catch(error => {
            dispatch({
                type: actionsTypes.UPDATE_REQUESTS_ERROR,
                payload: {requests:null, error_message: error.message},
            });
        }).finally(endpoint =>{
            setIsMounted(true);
        });
    }
}

export { RequestActions }