import { actionsTypes } from "./ConstActions";
import dbRequests from "../classes/ClassDBRequests";
import Toasts from "../components/CompoToast";

const RequestTypeActions = {
    getRequestType: (token_api,{setIsMounted}) => dispatch => {
        dbRequests.getRequestType(token_api).then(response =>{
            dispatch({
                type: actionsTypes.GET_REQUEST_TYPE,
                payload: {requestType:response.data, error_message: null},
            });
        }).catch(error => {
            dispatch({
                type: actionsTypes.GET_REQUEST_TYPE_ERROR,
                payload: {requestType:null, error_message: error.message},
            });
        }).finally(endpoint =>{
            setIsMounted(true);
        });
    },

    insertRequestType: (description, token_api, {setIsMounted, handleToastSavetion}) => dispatch => {
        dbRequests.insertNewRequestType(description, token_api).then(response =>{
            handleToastSavetion();
            dispatch({
                type: actionsTypes.INSERT_REQUEST_TYPE,
                payload: {requestType:response.data, error_message: null},
            });
        }).catch(error => {
            dispatch({
                type: actionsTypes.INSERT_REQUEST_TYPE_ERROR ,
                payload: {requestType:null, error_message: error.message},
            });
        }).finally(endpoint =>{
            setIsMounted(false);
        });
    },

    updateRequestType: (idrequest, slatime, active, token_api, {setIsMounted, handleToastSavetion}) => dispatch => {
        dbRequests.updateRequestType(idrequest, slatime, active?"N":"Y", token_api).then(response =>{
            handleToastSavetion();
            dispatch({
                type: actionsTypes.UPDATE_REQUEST_TYPE,
                payload: {requestType:response.data, error_message: null},
            });
        }).catch(error => {
            dispatch({
                type: actionsTypes.UPDATE_REQUEST_TYPE_ERROR ,
                payload: {requestType:null, error_message: error.message},
            });
        }).finally(endpoint =>{
            setIsMounted(false);
        });
    },

    deleteRequestType: (idrequest, token_api, {setIsMounted, handleToastSavetion}) => dispatch => {
        dbRequests.deleteRequestType(idrequest, token_api).then(response =>{
            
            if(!!response.data.sqlMessage){
                Toasts.showToast("Error","Connection Error",response.data.sqlMessage+",  IMPOSSIBLE DELETE THIS REQUEST BECAUSE IT HAS DEPENDENCIES. ");
                return;
            }
            handleToastSavetion();
            dispatch({
                type: actionsTypes.DELETE_REQUEST_TYPE,
                payload: {requestType:response.data, error_message: null},
            });
        }).catch(error => {
            dispatch({
                type: actionsTypes.DELETE_REQUEST_TYPE_ERROR ,
                payload: {requestType:null, error_message: error.message},
            });
        }).finally(endpoint =>{
            setIsMounted(false);
        });
    },
}

export { RequestTypeActions }