import { actionsTypes } from "./ConstActions"
import dbLogin from "../classes/ClassDBLogin";

const actions = {
    login: (user) => dispatch =>{
        dbLogin.postLogin(user.email, user.password, user.googleAcessToken).then(response => {
            if(typeof response === "string"){
                dispatch( {
                    type: actionsTypes.LOGIN_NOT_FOUND,
                    payload: response,
                });
                return;
            }
            dispatch( {
                type: actionsTypes.LOGIN,
                payload: response,

            })
        }).catch(erro => {
            dispatch( {
                type: actionsTypes.LOGIN_ERROR,
                payload: erro,

            })
        });
    },
    logout: ()=>({
        type: actionsTypes.LOGOUT,
        payload: undefined
    })
}

export { actions }