import { actionsTypes } from "../Actions/ConstActions";
import { actionsTypesAPI } from "../Actions/ConstActionsApi";

const INITIAL_STATE = {
    payload:{profile:null},
    payload_chart:{profile_chart:null},
    api_status: actionsTypesAPI.STATUS_IDLE,
    api_requests: 0
}

const reducers = (state = INITIAL_STATE, action) => {
    switch (action.type){
        case actionsTypes.GET_PROFILE:
            return {...state, payload: action.payload, api_status: actionsTypesAPI.STATUS_OK, api_request: state.api_requests+1}
        break;
        case actionsTypes.GET_PROFILE_ERROR:
            return {...state, payload: action.payload, api_status: actionsTypesAPI.STATUS_ERRO, api_request: state.api_requests+1}
        break;
        case actionsTypes.UPDATE_PROFILE:
            return {...state, payload: action.payload, api_status: actionsTypesAPI.STATUS_OK, api_request: state.api_requests+1}
        break;
        case actionsTypes.UPDATE_PROFILE_ERROR:
            return {...state, payload: action.payload, api_status: actionsTypesAPI.STATUS_ERRO, api_request: state.api_requests+1}
        break;
        case actionsTypes.GET_PROFILE_CHART:
            return {...state, payload_chart: action.payload_chart, api_status: actionsTypesAPI.STATUS_OK, api_request: state.api_requests+1}
        break;
        case actionsTypes.GET_PROFILE_CHART_ERROR:
            return {...state, payload_chart: action.payload_chart, api_status: actionsTypesAPI.STATUS_ERRO, api_request: state.api_requests+1}
        break;
        default:
            return {...state}
    }
}


export { reducers }