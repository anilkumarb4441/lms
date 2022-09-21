import {combineReducers} from 'redux'
import leadsReducer from "./screens/leads/reducer"
import myTeamReducer from "./screens/Myteam/reducer"
import dashReduce from './screens/dashboard/reducer'

const rootReducer = combineReducers({
    leads:leadsReducer,
    myTeam:myTeamReducer,
    dashboard:dashReduce,

})

export default rootReducer   