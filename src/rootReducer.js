import {combineReducers} from 'redux'
import leadsReducer from "./screens/leads/reducer"
import servicesReducer from "./screens/services/reducer"
import myTeamReducer from "./screens/Myteam/reducer"

const rootReducer = combineReducers({
    leads:leadsReducer,
    services:servicesReducer,
    myTeam:myTeamReducer
})

export default rootReducer   