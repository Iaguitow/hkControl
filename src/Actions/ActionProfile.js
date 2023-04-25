import { actionsTypes } from "./ConstActions";
import dbProfile from "../classes/ClassDBProfile";

const ProfileActions = {
    getProfile: (idpeople,token_api, {setIsMounted}) => dispatch =>{
        dbProfile.getProfile(idpeople,token_api).then(response =>{
            dispatch({
                type: actionsTypes.GET_PROFILE,
                payload: response.data[0],
            });
        }).catch(error =>{
            dispatch({
                type: actionsTypes.GET_PROFILE_ERROR,
                payload: error,
            });
        }).finally(endPoint => {
            if(typeof setIsMounted === "function"){
                setIsMounted(true);
            }
            
        });
    },

    updateProfile: (token_api, breakType, idpeople,profileObjec, {setIsMounted}) => dispatch => {
        dbProfile.updateProfile(token_api, breakType, idpeople,profileObjec).then(response =>{
            dispatch({
                type: actionsTypes.UPDATE_PROFILE ,
                payload: response.data[0],
            });
        }).catch(error => {
            dispatch({
                type: actionsTypes.UPDATE_PROFILE_ERROR ,
                payload: error,
            });
        }).finally(endpoint =>{
            if(typeof setIsMounted === "function"){
                setIsMounted(true);
            }
        });
    },

    getProfileChart: (userObject,{setIsMounted}) => dispatch =>{
        dbProfile.getProfileChart(userObject).then(response =>{
            dispatch({
                type: actionsTypes.GET_PROFILE_CHART ,
                payload_chart: response.data,
            });
        }).catch(error =>{
            dispatch({
                type: actionsTypes.GET_PROFILE_CHART_ERROR,
                payload_chart: error,
            });
        }).finally(endPoint => {
            if(typeof setIsMounted === "function"){
                //setIsMounted(true);
            }
            
        });
    },
}

export { ProfileActions }