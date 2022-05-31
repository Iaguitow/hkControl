const actionsTypes = {
///////////////////LOGIN ACTIONS///////////////////
    LOGIN: "LOGIN",
    LOGIN_ERROR: "LOGIN_ERROR",
    LOGIN_NOT_FOUND: "LOGIN_NOT_FOUND",
    LOGOUT: "LOGOUT",

///////////////////PEOPLE ACTIONS///////////////////
    GET_PEOPLE: "GET_PEOPLE",
    REGISTER_PEOPLE: "REGISTER_PEOPLE",

///////////////////PROFILE ACTION///////////////////
    GET_PROFILE: "GET_PROFILE",
    GET_PROFILE_ERROR: "GET_PROFILE_ERROR",
    UPDATE_PROFILE: "EDIT_PROFILE",
    UPDATE_PROFILE_ERROR: "EDIT_PROFILE_ERROR",

///////////////////GDRIVER ACTION///////////////////
    GET_FILES: "GET_FILES",
    GET_FILES_ERROR: "GET_FILES_ERROR",
    UPDATE_FILES: "UPDATE_FILES",
    UPDATE_FILES_ERROR: "UPDATE_FILES_ERROR",

///////////////////TAGS ACTION/////////////////////
    GET_TAGS: "GET_TAGS",
    GET_TAGS_ERROR: "GET_TAGS_ERROR",
    UPDATE_TAGS: "UPDATE_TAGS",
    UPDATE_TAGS_ERROR: "UPDATES_TAGS_ERROR",
    
///////////////////CITY ACTIONS////////////////////
    GET_CITIES: "GET_CITIES",
    GET_CITIES_ERROR: "GET_CITIES_ERROR",
    UPDATE_CITY: "UPDATE_CITY",
    UPDATE_CITY_ERROR: "UPDATE_CITY_ERROR",    
};

export { actionsTypes }