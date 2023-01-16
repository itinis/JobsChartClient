
import { ADD_CHARTJOBS, REMOVE_CHARTJOBS, TOGGLE_CHARTJOBS } from './actions';
import { ChartJobs } from '../Model/ChartJobs';
export interface IAppState {
    chartJobs: ChartJobs[];
    lastUpdate?: Date;
}
export function rootReducer(state: any, action: any) {
    switch (action.type) {
        case ADD_CHARTJOBS:
            action.chartJobs.id = state.chartJobs.length ;

            return Object.assign({}, state, {
                chartJobs: state.chartJobs.concat(Object.assign({}, action.chartJobs)),
                lastUpdate: new Date()
            })

        case TOGGLE_CHARTJOBS:
            var chartJob = state.chartJobs.find((t: { id: any; }) => t.id === action.id);
            var index = state.chartJobs.indexOf(chartJob);
            return Object.assign({}, state, {
                chartJobs: [
                    ...state.chartJobs,
                    Object.assign({}, chartJob, { isCompleted: !chartJob.isCompleted }),
                    ...state.chartJobs.slice(index + 1)
                ],
                lastUpdate: new Date()
            })
        case REMOVE_CHARTJOBS:
            return Object.assign({}, state, {
                chartJobs: state.chartJobs.filter((t: { id: any; }) => t.id !== action.id),
                lastUpdate: new Date()
            })
    }
    return state;
}
export const INITIAL_STATE: IAppState = {
    chartJobs: [],
    lastUpdate: undefined
}