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
            setIsMounted(true);
        });
    },

    updateProfile: () => dispatch => {

    }
}

export { ProfileActions }