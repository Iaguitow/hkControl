import { actionsTypes } from "../Actions/ConstActions";
import { actionsTypesAPI } from "../Actions/ConstActionsApi";

const INITIAL_STATE = {
    payload: {requestType: null},
    api_status: actionsTypesAPI.STATUS_IDLE,
    api_requests: 0
}

const reducers = (state = INITIAL_STATE, action) => {
    switch (action.type){
        case actionsTypes.GET_REQUEST_TYPE:
            return {...state, payload: action.payload, api_status: actionsTypesAPI.STATUS_OK, api_request: state.api_requests+1}
        break;
        case actionsTypes.GET_REQUEST_TYPE_ERROR:
            return {...state, payload: action.payload, api_status: actionsTypesAPI.STATUS_ERRO, api_request: state.api_requests+1}
        break;
        case actionsTypes.UPDATE_REQUEST_TYPE:
            return {...state, payload: action.payload, api_status: actionsTypesAPI.STATUS_OK, api_request: state.api_requests+1}
        break;
        case actionsTypes.UPDATE_REQUEST_TYPE_ERROR:
            return {...state, payload: action.payload, api_status: actionsTypesAPI.STATUS_ERRO, api_request: state.api_requests+1}
        break;
        default:
            return {...state}
    }
}

export { reducers }