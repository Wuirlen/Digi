import {
  CHANGE_TOTAL_QUESTIONS,
  CHANGE_SCORE,
} from "./actionsTypes";

const initialState = {
  total_of_questions: 0,
  score: 0,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_TOTAL_QUESTIONS:
      return {
        ...state,
        total_of_questions: action.payload,
      };
    case CHANGE_SCORE:
      return {
        ...state,
        score: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
