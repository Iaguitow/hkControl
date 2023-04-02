import { actionsTypes } from "./ConstActions";
import DBChartsData from "../classes/ClassDBCharts";

const ChartActions = {
    getChartTotalRequestPerday: (token_api, {setIsMounted}) => dispatch =>{
        DBChartsData.getChartTotalRequestPerday(token_api).then(response =>{
            dispatch({
                type: actionsTypes.GET_CHART_TOTAL_REQUESTS,
                payload_TR: response.data,
            });
        }).catch(error =>{
            dispatch({
                type: actionsTypes.GET_CHART_TOTAL_REQUESTS_ERROR,
                payload_TR: error,
            });
        }).finally(endPoint => {
            if(typeof setIsMounted === "function"){
                //setIsMounted(true);
            }
            
        });
    },
    
    getChartReqToBeDone: (token_api, {setIsMounted}) => dispatch =>{
        DBChartsData.getChartReqToBeDone(token_api).then(response =>{
            dispatch({
                type: actionsTypes.GET_CHART_LONGER_REQ_TO_DO,
                payload_LR: response.data,
            });
        }).catch(error =>{
            dispatch({
                type: actionsTypes.GET_CHART_LONGER_REQ_TO_DO_ERROR,
                payload_LR: error,
            });
        }).finally(endPoint => {
            if(typeof setIsMounted === "function"){
                //setIsMounted(true);
            }
            
        });
    },

    getChartPerfPorter: (token_api, {setIsMounted}) => dispatch =>{
        DBChartsData.getChartPerfPorter(token_api).then(response =>{
            dispatch({
                type: actionsTypes.GET_CHART_PERF_PORTERS,
                payload_PP: response.data,
            });
        }).catch(error =>{
            dispatch({
                type: actionsTypes.GET_CHART_PERF_PORTERS_ERROR,
                payload_PP: error,
            });
        }).finally(endPoint => {
            if(typeof setIsMounted === "function"){
                setIsMounted(true);
            }
            
        });
    },
}

export { ChartActions }