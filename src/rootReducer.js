import {combineReducers} from 'redux'
import leadsReducer from "./screens/leads/reducer"
import myTeamReducer from "./screens/Myteam/reducer"

const rootReducer = combineReducers({
    leads:leadsReducer,
    myTeam:myTeamReducer
})

export default rootReducer   