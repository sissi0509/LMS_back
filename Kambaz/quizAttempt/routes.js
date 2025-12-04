import attemptDao from "./dao.js";

userId, quizId, attemptData;

export default function AttemptRoutes() {
  const attemptDao = attemptDao();
  const createOrUpdateAttempt = (req, res) => {
    const { userId, quizId } = req.pramas;
  };
}
