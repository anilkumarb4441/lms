import * as actionTypes from "./actionTypes"

 const initialState = {
    arr:[],
    hell:'it is',
}

const reducer = (state=initialState, action)=>{

    switch(action.type){
        case actionTypes.GET_FUNNEL_LEADS:
            let setState = {...state, arr:[...state.arr,action.payload]}
            return {...state, arr:[...action.payload]}

        default: 
        return initialState
    }

}

export default reducer