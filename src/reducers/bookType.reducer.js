import * as types from "../constants/actionTypes";
const initialState = {
  data: [],
};
const myReducers = (state = initialState, action) => {
  switch (action.type) {
    case types.BOOK_TYPE:
      return { ...state, data: action.payload };
    default:
      return state;
  }
};
export default myReducers;
