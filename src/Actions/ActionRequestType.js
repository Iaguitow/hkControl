import { actionsTypes } from "./ConstActions";
import dbRequests from "../classes/ClassDBRequests";

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
            setIsMounted(false);
        });
    },
}

export { RequestTypeActions }