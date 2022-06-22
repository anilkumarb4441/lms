import {combineReducers} from 'redux'
import bookingsReducer from "./screens/bookings/reducer"
import servicesReducer from "./screens/services/reducer"

const rootReducer = combineReducers({
    bookings:bookingsReducer,
    services:servicesReducer
})

export default rootReducer   