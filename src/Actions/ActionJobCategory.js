import { actionsTypes } from "./ConstActions";
import dbJobCategories from "../classes/ClassDBJobsCategory";

const jobCategoriesActions = {
    getJobCategories: (token_api) => dispatch => {
        dbJobCategories.getJobCategories(token_api).then(response =>{
            dispatch({
                type: actionsTypes.GET_JOB_CATEGORIES ,
                payload: {jobcategories:response.data, error_message: null},
            });
        }).catch(error => {
            dispatch({
                type: actionsTypes.GET_JOB_CATEGORIES_ERROR ,
                payload: {jobcategories:null, error_message: error.message},
            });
        }).finally(endpoint =>{

        });
    },
    updateJobCategories: (token_api) => dispatch => {

    }
}

export { jobCategoriesActions }