import { 
  Button,  
  Typography, 
  CircularProgress,
  RadioGroup, 
  FormControlLabel, 
  Radio, 
  Stack } from "@mui/material";
import { Box } from "@mui/system";
import { decode } from "html-entities";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import useAxios from "../hooks/useAxios";
import { handleScoreChange, handleTotalQuestionsChange } from "../redux/actions";

const getRandomInt = (max) => {
  return Math.floor(Math.random() * Math.floor(max));
};

const Questions = () => {
  const {
    score,
  } = useSelector((state) => state);
  const history = useHistory();
  const dispatch = useDispatch();

  let apiUrl = `/api/questions/1`;
  
  const { response, loading } = useAxios({ url: apiUrl });
  const [questionIndex, setQuestionIndex] = useState(0);
  const [options, setOptions] = useState([]);
  const [value, setValue] = useState('');

  useEffect(() => {
    if (response?.length) {
      const question = response[questionIndex];
      let answers = [...question.incorrect_answers];
      answers.splice(
        getRandomInt(question.incorrect_answers.length),
        0,
        question.correct_answer
      );
      setOptions(answers);
    }
  }, [response, questionIndex]);

  if (loading) {
    return (
      <Box mt={20}>
        <CircularProgress />
      </Box>
    );
  }

  const handleClickAnswer = (e) => {
    setValue(e.target.value);
    const question = response[questionIndex];
    if (e.target.value === question.correct_answer) {
      dispatch(handleScoreChange(score + 1));
    }
    dispatch(handleTotalQuestionsChange(response?.length));
  };

  const handleClickBtnAdvance = () => {
    if (questionIndex + 1 < response.length) {
      setQuestionIndex(questionIndex + 1);
    } else {
      history.push("/score");
    }
  }

  const handleClickBtnReturn = () => {
    if (questionIndex > 0 && questionIndex < response.length) {
      setQuestionIndex(questionIndex - 1);
    }
  }

  return (
    <Box>
      <Typography variant="h4">{questionIndex + 1} / {response.length}</Typography>
      <Typography mt={5}>
        {decode(response[questionIndex].question)}
      </Typography>
      
      <RadioGroup 
      name="radio-buttons-group"
      value={value}
      onChange={handleClickAnswer}
      >
      {options.map((data, id) => (
        <Box mt={2} key={id}>
          <FormControlLabel value={decode(data)} control={<Radio />} label={decode(data)} />
        </Box>
      ))}
      </RadioGroup>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          '& > *': { m: 1},
        }}
      >
        <Stack direction="row" spacing={2}>
          <Button variant="contained" onClick={handleClickBtnReturn}>Voltar</Button>
          <Button variant="contained" onClick={handleClickBtnAdvance} >Avançar</Button>
        </Stack>
      </Box>

    </Box>
  );
};

export default Questions;
