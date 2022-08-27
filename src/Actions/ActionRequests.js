import { actionsTypes } from "./ConstActions";
import dbRequests from "../classes/ClassDBRequests";

const RequestActions = {
    getRequests: (idpeople, joblevel, token_api, {setIsMounted, setRefreshing = ""}) => dispatch => {
        dbRequests.getRequests(idpeople,joblevel,token_api).then(response =>{
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
            setIsMounted(false);
            if(typeof setRefreshing === "function"){
                setRefreshing(false);
            }
        });
    },
    updateRquests: (idrequests, requestdone, idpeople, token_api, joblevel, {setIsMounted}) => dispatch => {
        dbRequests.updateRequests(idrequests, requestdone, idpeople, token_api, joblevel).then(response =>{
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
            setIsMounted(false);
        });
    },

    insertNewRequest: (requestObj, token_api, idpeople, joblevel,{setIsMounted, startEffect, setShowModal}) => dispatch => {
        dbRequests.insertNewRequest(requestObj, token_api, idpeople,joblevel).then(response =>{
            //startEffect();
            dispatch({
                type: actionsTypes.INSERT_NEW_REQUEST,
                payload: {requests:response.data, error_message: null},
            });
        }).catch(error => {
            dispatch({
                type: actionsTypes.INSERT_NEW_REQUEST_ERROR,
                payload: {requests:null, error_message: error.message},
            });
            return;
        }).finally(endpoint =>{
            setIsMounted(false);
            setShowModal(false);
        });
    }
}

export { RequestActions }