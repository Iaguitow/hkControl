const actionsTypes = {
///////////////////LOGIN ACTIONS///////////////////
    LOGIN: "LOGIN",
    LOGIN_ERROR: "LOGIN_ERROR",
    LOGIN_NOT_FOUND: "LOGIN_NOT_FOUND",
    LOGOUT: "LOGOUT",

///////////////////PEOPLE ACTIONS///////////////////
    GET_PEOPLE: "GET_PEOPLE",
    GET_PEOPLE_ERROR: "GET_PEOPLE_ERROR",
    REGISTER_PEOPLE: "REGISTER_PEOPLE",
    REGISTER_PEOPLE_ERROR: "REGISTER_PEOPLE_ERROR",
    UPDATE_PEOPLE: "UPDATE_PEOPLE",
    UPDATE_PEOPLE_ERROR: "UPDATE_PEOPLE_ERROR",

///////////////////PROFILE ACTION///////////////////
    GET_PROFILE: "GET_PROFILE",
    GET_PROFILE_ERROR: "GET_PROFILE_ERROR",
    UPDATE_PROFILE: "EDIT_PROFILE",
    UPDATE_PROFILE_ERROR: "EDIT_PROFILE_ERROR",
    GET_PROFILE_CHART: "GET_PROFILE_CHART",
    GET_PROFILE_CHART_ERROR: "GET_PROFILE_CHART_ERROR",

///////////////////GDRIVER ACTION///////////////////
    GET_FILES: "GET_FILES",
    GET_FILES_ERROR: "GET_FILES_ERROR",
    UPDATE_FILES: "UPDATE_FILES",
    UPDATE_FILES_ERROR: "UPDATE_FILES_ERROR",

///////////////////REQUESTS ACTION/////////////////////
    GET_REQUESTS: "GET_REQUESTS",
    GET_REQUESTS_ERROR: "GET_REQUESTS_ERROR",
    UPDATE_REQUESTS: "UPDATE_REQUESTS",
    UPDATE_REQUESTS_ERROR: "UPDATE_REQUESTS_ERROR",
    INSERT_NEW_REQUEST: "INSERT_NEW_REQUEST",
    INSERT_NEW_REQUEST_ERROR: "INSERT_NEW_REQUEST_ERROR", 


///////////////////REQUESTTYPE ACTION/////////////////////
    GET_REQUEST_TYPE: "GET_REQUEST_TYPE",
    GET_REQUEST_TYPE_ERROR: "GET_REQUEST_TYPE_ERROR",
    UPDATE_REQUEST_TYPE: "UPDATE_REQUEST_TYPE",
    UPDATE_REQUEST_TYPE_ERROR: "UPDATE_REQUEST_TYPE_ERROR",

///////////////////REQUEST LOG ACTION/////////////////////
    GET_REQUEST_LOG: "GET_REQUEST_LOG",
    GET_REQUEST_LOG_ERROR: "GET_REQUEST_LOG_ERROR",
    UPDATE_REQUEST_LOG_TYPE: "UPDATE_REQUEST_LOG_TYPE",
    UPDATE_REQUEST_LOG_TYPE_ERROR: "UPDATE_REQUEST_LOG_TYPE_ERROR",
    INSERT_NEW_REQUEST_LOG: "INSERT_NEW_REQUEST_LOG",
    INSERT_NEW_REQUEST_LOG_ERROR: "INSERT_NEW_REQUEST_ERROR_LOG",     

///////////////////JOB CATEGORIES ACTIONS////////////////////
    GET_JOB_CATEGORIES: "GET_JOB_CATEGORIES",
    GET_JOB_CATEGORIES_ERROR: "GET_JOB_CATEGORIES_ERROR",
    UPDATE_JOB_CATEGORIES: "UPDATE_JOB_CATEGORIES",
    UPDATE_JOB_CATEGORIES_ERROR: "UPDATE_JOB_CATEGORIES_ERROR",

///////////////////ROOMS ACTIONS////////////////////
    GET_ROOMS: "GET_ROOMS",
    GET_ROOMS_ERROR: "GET_ROOMS_ERROR",
    UPDATE_ROOMS: "UPDATE_ROOMS",
    UPDATE_ROOMS_ERROR: "UPDATE_ROOMS_ERROR",

    GET_FLOORS: "GET_FLOORS",
    GET_FLOORS_ERROR: "GET_FLOORS_ERROR",
    UPDATE_FLOORS: "UPDATE_FLOORS",
    UPDATE_FLOORS_ERROR: "UPDATE_FLOORS_ERROR",

///////////////////TASKS ACTIONS////////////////////
    GET_TASKS: "GET_TASKS",
    GET_TASKS_ERROR: "GET_TASKS_ERROR",
    UPDATE_TASKS: "UPDATE_TASKS",
    UPDATE_TASKS_ERROR: "UPDATE_TASKS_ERROR",

///////////////////CHECKLIST ACTIONS////////////////////
    GET_CHECKLIST: "GET_CHECKLIST",
    GET_CHECKLIST_ERROR: "GET_CHECKLIST_ERROR",
    UPDATE_CHECKLIST: "UPDATE_CHECKLIST",
    UPDATE_CHECKLIST_ERROR: "UPDATE_CHECKLIS_ERROR",
    
///////////////////CHART ACTIONS////////////////////
    GET_CHART_TOTAL_REQUESTS: "GET_TOTAL_REQUESTS",
    GET_CHART_TOTAL_REQUESTS_ERROR: "GET_CHECKLIST_ERROR",
    GET_CHART_LONGER_REQ_TO_DO: "GET_CHART_LONGER_REQ_TO_DO",
    GET_CHART_LONGER_REQ_TO_DO_ERROR: "GET_CHART_LONGER_REQ_TO_DO_ERROR",
    GET_CHART_PERF_PORTERS: "GET_CHART_PERF_PORTERS",
    GET_CHART_PERF_PORTERS_ERROR: "GET_CHART_PERF_PORTERS_ERROR",
};

export { actionsTypes }