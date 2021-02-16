import * as types from "./../constants/actionTypes";
const initialState = {
  data: [],
};
let myReducers = (state = initialState, action) => {
  switch (action.type) {
    case types.BOOK_AUTHOR:
      return { ...state, data: action.payload };
    default:
      return state;
  }
};
export default myReducers;
