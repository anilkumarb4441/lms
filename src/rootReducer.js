import {combineReducers} from 'redux'
import leadsReducer from "./screens/leads/reducer"
import servicesReducer from "./screens/services/reducer"

const rootReducer = combineReducers({
    leads:leadsReducer,
    services:servicesReducer
})

export default rootReducer   