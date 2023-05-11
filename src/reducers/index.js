import { combineReducers } from 'redux'

import { reducers as reducerLogin } from "./reducerLogin";
import { reducers as reducerPeople } from "./reducerPeople";
import { reducers as reducerGdriver } from "./reducerGdriver";
import { reducers as reducerRequests } from "./reducerRequests";
import { reducers as reducerProfile } from "./reducerProfile";
import { reducers as reducerJobCategory } from "./reducerJobCategory";
import { reducers as reducerTasks } from "./reducerTasks";
import { reducers as reducerCheckList } from "./reducerCheckList";
import { reducers as reducerRequestType } from "./reducerRequestType";
import { reducers as reducerRooms } from "./reducerRooms";
import {reducers as reducerRequestLog } from "./reducerRequestLogs";
import {reducers as reducerCharts } from "./reducerCharts";

const reducers = combineReducers({
    reducerLogin,
    reducerPeople,
    reducerGdriver,
    reducerRequests,
    reducerProfile,
    reducerJobCategory,
    reducerTasks,
    reducerCheckList,
    reducerRequestType,
    reducerRooms,
    reducerRequestLog,
    reducerCharts
});

const rootReducer = (state, action) => {

    if (action.type === 'LOGOUT') {
      return reducers({
            reducerLogin: undefined,
            reducerPeople: undefined,
            reducerGdriver: undefined,
            reducerRequests: undefined,
            reducerProfile: undefined,
            reducerJobCategory: undefined,
            reducerTasks: undefined,
            reducerCheckList: undefined,
            reducerRequestType: undefined,
            reducerRooms: undefined,
            reducerRequestLog: undefined,
            reducerCharts: undefined
      }, action);
    }
  
    return reducers(state, action)
}
  

export { rootReducer }
