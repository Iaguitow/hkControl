import { combineReducers } from 'redux'

import { reducers as reducerLogin } from "./reducerLogin";
import { reducers as reducerPeople } from "./reducerPeople";
import { reducers as reducerGdriver } from "./reducerGdriver";
import { reducers as reducerRequests } from "./reducerRequests";
import { reducers as reducerProfile } from "./reducerProfile";
import { reducers as reducerCities } from "./reducerCities";
import { reducers as reducerTasks } from "./reducerTasks";

const reducers = combineReducers({
    reducerLogin,
    reducerPeople,
    reducerGdriver,
    reducerRequests,
    reducerProfile,
    reducerCities,
    reducerTasks
});

export { reducers }
