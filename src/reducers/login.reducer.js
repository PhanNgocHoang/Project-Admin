import * as types from './../constants/actionTypes'
let initialState = {
    data: {}
}
let myReducers = (state = initialState, action) => {
    switch (action.type) {
        case types.DATA_LOGIN:
            console.log("🚀 ~ file: login.reducer.js ~ line 12 ~ myReducers ~ data", action.payload)
            return { ...state, data: action.payload }
        default: return state

    }
}
export default myReducers