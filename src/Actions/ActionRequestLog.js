import { actionsTypes } from "./ConstActions";
import dbRequestLogs from "../classes/ClassDBRequestLog";

const ActionRequestLog = {
    getRequestLogs: (idpeople, token_api) => dispatch => {
        dbRequestLogs.getRequestLogs(idpeople,token_api).then(response =>{
            dispatch({
                type: actionsTypes.GET_REQUEST_LOG,
                payload: {logs:response.data, error_message: null},
            });
        }).catch(error => {
            dispatch({
                type: actionsTypes.GET_REQUEST_LOG_ERROR,
                payload: {logs:null, error_message: error.message},
            });
        }).finally(endpoint =>{

        });
    },

    insertNewRequest: (requestCancellationObj, token_api, setShowLoading, onRefresh, idpeople, joblevel) => dispatch => {
        dbRequestLogs.insertNewRequestLog(requestCancellationObj, token_api, idpeople, joblevel).then(response =>{
            dispatch({
                type: actionsTypes.INSERT_NEW_REQUEST_LOG,
                payload: {logs:response.data, error_message: null},
            });
        }).catch(error => {
            dispatch({
                type: actionsTypes.INSERT_NEW_REQUEST_LOG_ERROR,
                payload: {logs:null, error_message: error.message},
            });
            return;
        }).finally(endpoint =>{
            
            if(typeof setShowLoading === "function"){
                setShowLoading(false);
            }

            if(typeof onRefresh === "function"){
                onRefresh();
            }
        });
    }
}

export { ActionRequestLog }