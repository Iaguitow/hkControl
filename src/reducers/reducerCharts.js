import { actionsTypes } from "../Actions/ConstActions";
import { actionsTypesAPI } from "../Actions/ConstActionsApi";

const INITIAL_STATE = {
    payload_TR:{totalRequests:null},
    payload_LR:{longerRequests:null},
    payload_PP:{perfPorters:null},
    api_status: actionsTypesAPI.STATUS_IDLE,
    api_requests: 0
}

const reducers = (state = INITIAL_STATE, action) => {
    switch (action.type){
        case actionsTypes.GET_CHART_TOTAL_REQUESTS:
            return {...state, payload_TR: action.payload_TR, api_status: actionsTypesAPI.STATUS_OK, api_request: state.api_requests+1}
        break;
        case actionsTypes.GET_CHART_TOTAL_REQUESTS_ERROR:
            return {...state, payload_TR: action.payload_TR, api_status: actionsTypesAPI.STATUS_ERRO, api_request: state.api_requests+1}
        break;

        case actionsTypes.GET_CHART_LONGER_REQ_TO_DO:
            return {...state, payload_LR: action.payload_LR, api_status: actionsTypesAPI.STATUS_OK, api_request: state.api_requests+1}
        break;
        case actionsTypes.GET_CHART_LONGER_REQ_TO_DO_ERROR:
            return {...state, payload_LR: action.payload_LR, api_status: actionsTypesAPI.STATUS_ERRO, api_request: state.api_requests+1}
        break;

        case actionsTypes.GET_CHART_PERF_PORTERS:
            return {...state, payload_PP: action.payload_PP, api_status: actionsTypesAPI.STATUS_OK, api_request: state.api_requests+1}
        break;
        case actionsTypes.GET_CHART_PERF_PORTERS_ERROR:
            return {...state, payload_PP: action.payload_PP, api_status: actionsTypesAPI.STATUS_ERRO, api_request: state.api_requests+1}
        break;
        default:
            return {...state}
    }
}


export { reducers }