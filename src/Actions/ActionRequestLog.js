import { actionsTypes } from "./ConstActions";
import dbRequestLogs from "../classes/ClassDBRequestLog";

const ActionRequestLog = {
    getRequestLogs: (idpeople, token_api, setShowLoading) => dispatch => {
        dbRequestLogs.getRequestLogs(idpeople,token_api,setShowLoading).then(response =>{
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
            if(typeof setShowLoading === "function"){
                setShowLoading(false);
            }
        });
    },
}

export { ActionRequestLog }