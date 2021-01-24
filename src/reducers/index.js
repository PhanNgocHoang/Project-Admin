import { combineReducers } from 'redux'
import typesbook from './typesbook.reducers'
import login from './login.reducer'
export const myReducers = combineReducers({
    typesbook,
    login
})