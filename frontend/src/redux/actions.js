import {
  CHANGE_TOTAL_QUESTIONS,
  CHANGE_SCORE,
} from "./actionsTypes";


export const handleTotalQuestionsChange = (payload) => ({
  type: CHANGE_TOTAL_QUESTIONS,
  payload,
});

export const handleScoreChange = (payload) => ({
  type: CHANGE_SCORE,
  payload,
});
