import { Router,  Request, Response } from "express";
const  questions = require('../../src/questions.json');
export const router = Router()


router.get('/api/questions/:quizId', (request: Request, response: Response) => {
  const { quizId } = request.params;

  const intId = parseInt(quizId);
  
  if (!intId) {
    return response.status(400).json("No id");
  }

  return response.status(200).send(questions);
})