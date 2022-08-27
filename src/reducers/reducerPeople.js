import { actionsTypes } from "../Actions/ConstActions";
import { actionsTypesAPI } from "../Actions/ConstActionsApi"

const INITIAL_STATE = {
    payload:{people:null},
    loading: false,
    api_status: actionsTypesAPI.STATUS_IDLE,
    get_attempts: 0,
    update_attempts:0
}

const reducers = (state = INITIAL_STATE, action) => {
    switch (action.type){
        case actionsTypes.GET_PEOPLE:
            return {...state, payload:action.payload, loading: true, api_status: actionsTypesAPI.STATUS_OK , get_attempts: state.get_attempts+1}
        break;
        case actionsTypes.GET_PEOPLE_ERROR:
            return {...state, payload:action.payload, loading: false, api_status: actionsTypesAPI.STATUS_ERRO, get_attempts: state.get_attempts+1}
        break;
        case actionsTypes.UPDATE_PEOPLE:
            return {...state, payload:action.payload, loading: false, api_status: actionsTypesAPI.STATUS_OK, update_attempts: state.update_attempts+1}
        break;
        case actionsTypes.UPDATE_PEOPLE_ERROR:
            return {...state, payload:action.payload, loading: false, api_status: actionsTypesAPI.STATUS_ERRO, update_attempts: state.update_attempts+1}
        break;
        default:
            return state
    }
}

export { reducers };