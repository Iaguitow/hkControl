import { actionsTypes } from "../Actions/ConstActions";
import { actionsTypesAPI } from "../Actions/ConstActionsApi";

const INITIAL_STATE = {
    payload: {logs: null},
    api_status: actionsTypesAPI.STATUS_IDLE,
}

const reducers = (state = INITIAL_STATE, action) => {
    switch (action.type){
        case actionsTypes.GET_REQUEST_LOG:
            return {...state, payload: action.payload, api_status: actionsTypesAPI.STATUS_OK}
        break;
        case actionsTypes.GET_REQUEST_LOG_ERROR:
            return {...state, payload: action.payload, api_status: actionsTypesAPI.STATUS_ERRO}
        break;
        default:
            return {...state}
    }
}

export { reducers }