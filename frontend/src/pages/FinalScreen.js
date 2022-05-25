import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { handleTotalQuestionsChange, handleScoreChange } from "../redux/actions";

const FinalScreen = () => {
  const disptach = useDispatch();
  const history = useHistory();
  const { score, total_of_questions } = useSelector((state) => state);
  const percentage = (score/total_of_questions)*100;

  const handleBackToSettings = () => {
    disptach(handleScoreChange(0));
    disptach(handleTotalQuestionsChange(0));
    history.push("/questions");
  };

  return (
    <Box mt={30}>
      <Typography variant="h3" fontWeight="bold" mb={3}>
        Seu resultado foi {percentage}%
      </Typography>
      <Button onClick={handleBackToSettings} variant="contained">
        Voltar para Início
      </Button>
    </Box>
  );
};

export default FinalScreen;
