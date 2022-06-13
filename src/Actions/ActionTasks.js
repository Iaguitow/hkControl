import { actionsTypes } from "./ConstActions";
import dbTasks from "../classes/ClassDBTasks";

const TasksActions = {
    getTasks: (idpeople, token_api, {setIsMounted}) => dispatch => {
        dbTasks.getTasks(idpeople,token_api).then(response =>{
            dispatch({
                type: actionsTypes.GET_TASKS,
                payload: {tasks:response.data, error_message: null},
            });
        }).catch(error => {
            dispatch({
                type: actionsTypes.GET_TASKS_ERROR,
                payload: {tasks:null, error_message: error.message},
            });
        }).finally(endpoint =>{
            setIsMounted(true);
        });
    },
    updateTask: (idTask, taskdone, token_api, idpeople, {setIsMounted}) => dispatch => {
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
    }
}

export { TasksActions }