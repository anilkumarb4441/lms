import * as actionTypes from "./actionTypes"

 const initialState = {
    arr:[],
    hell:'it is',
}

const reducer = (state=initialState, action)=>{
    switch(action.type){
        case actionTypes.GET_FUNNEL_LEADS:
            let setState = {...state, arr:action.payload}
            console.log(setState, 'setState')
            return setState

        default: 
        return initialState
    }

}

export default reducer