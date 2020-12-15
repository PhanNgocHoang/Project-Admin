import * as types from './../constants/actionTypes'
let initialState = [{test: true}]
let myReducers = (state = initialState, action) =>{
    switch(action.type){
        case types.LIST_ALL_TYPE_BOOK:
            return state
        default:return state

    }
}
export default myReducers