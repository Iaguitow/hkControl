import { actionsTypes } from "./ConstActions";
import dbCheckList from "../classes/ClassDBCheckList";

const CheckListActions = {
    getCheckList: (idpeople, token_api, {setIsMounted}) => dispatch => {
        dbCheckList.getCheckList(idpeople, token_api).then(response =>{
            dispatch({
                type: actionsTypes.GET_CHECKLIST,
                payload: {checklist:response.data, error_message: null},
            });
        }).catch(error => {
            dispatch({
                type: actionsTypes.GET_CHECKLIST_ERROR,
                payload: {checklist:null, error_message: error.message},
            });
        }).finally(endpoint =>{
            setIsMounted(true);
        });
    },
    /*updateTask: (idTask, taskdone, token_api, idpeople, {setIsMounted}) => dispatch => {
        dbTasks.updateTasks(idTask, taskdone, token_api, idpeople).then(response =>{
            dispatch({
                type: actionsTypes.UPDATE_TASKS ,
                payload: {tasks:response.data, error_message: null},
            });
        }).catch(error => {
            dispatch({
                type: actionsTypes.UPDATE_TASKS_ERROR ,
                payload: {tasks:null, error_message: error.message},
            });
        }).finally(endpoint =>{
            setIsMounted(true);
        });
    }*/
}

export { CheckListActions }