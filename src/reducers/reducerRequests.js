import { actionsTypes } from "../Actions/ConstActions";
import { actionsTypesAPI } from "../Actions/ConstActionsApi";

const INITIAL_STATE = {
    payload: {requests: null},
    api_status: actionsTypesAPI.STATUS_IDLE,
    api_requests: 0,
    api_inserts_requests: 0,
    api_update_requests: 0,
    activeToastUpdate: false,
    activeToastInsert: false,
}

const reducers = (state = INITIAL_STATE, action) => {
    switch (action.type){
        case actionsTypes.GET_REQUESTS:
            return {...state, payload: action.payload, api_status: actionsTypesAPI.STATUS_OK, api_requests: state.api_requests+1}
        break;
        case actionsTypes.GET_REQUESTS_ERROR:
            return {...state, payload: action.payload, api_status: actionsTypesAPI.STATUS_ERRO, api_requests: state.api_requests+1}
        break;
        case actionsTypes.UPDATE_REQUESTS:
            return {...state, payload: action.payload, 
                    api_status: actionsTypesAPI.STATUS_OK, 
                    api_requests: state.api_requests+1, 
                    api_update_requests: state.api_update_requests+1, 
                    activeToastUpdate: state.api_update_requests+1 != state.api_update_requests?true:false
                }
        break;
        case actionsTypes.UPDATE_REQUESTS_ERROR:
            return {...state, payload: action.payload, 
                api_status: actionsTypesAPI.STATUS_ERRO, 
                api_requests: state.api_requests+1, 
                api_update_requests: state.api_update_requests+1, 
                activeToastUpdate: state.api_update_requests+1 != state.api_update_requests?true:false
            }
        break;
        case actionsTypes.INSERT_NEW_REQUEST:
            return {...state, payload: action.payload, 
                api_status: actionsTypesAPI.STATUS_OK, 
                api_requests: state.api_requests+1, 
                api_inserts_requests: state.api_inserts_requests+1, 
                activeToastInsert: state.api_inserts_requests+1 != state.api_inserts_requests?true:false
            }
        break;
        case actionsTypes.INSERT_NEW_REQUEST_ERROR:
            return {...state, payload: action.payload, 
                api_status: actionsTypesAPI.STATUS_ERRO, 
                api_requests: state.api_requests+1, 
                api_inserts_requests: state.api_inserts_requests+1, 
                activeToastInsert: state.api_inserts_requests+1 != state.api_inserts_requests?true:false
            }
        break;
        default:
            return {...state}
    }
}

export { reducers }