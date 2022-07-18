import * as actionTypes from "./actionTypes"
const initialState = {
    arr:[],
    openInner:false,
}

const reducer = (state=initialState,action)=>{        
        switch(action.type){
        case actionTypes.GET_TEAM_MEMBER:
            let newState = {}                                                                   
            let oldObjIndex =state.arr.findIndex(obj=>obj?.userId===action.payload?.userId)
             if(oldObjIndex>=0){
               let newArr = [...state.arr].slice(0,oldObjIndex+1)
                newState = {...state,arr:[...newArr]}
             }else{
               let newArr = [...state.arr,action.payload]
                newState = {...state,arr:[...newArr]}
             }
            return newState
         case actionTypes.SET_DEFAULT:
             return {...initialState}  
       
             
        default: 
        return initialState
        }
}

export default reducer

