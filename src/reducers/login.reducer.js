import * as types from './../constants/actionTypes'
let initialState = {
    data: {}
}
let myReducers = (state = initialState, action) => {
    switch (action.type) {
        case types.DATA_LOGIN:
            return { ...state, data: action.payload }
        default: return state

    }
}
export default myReducers