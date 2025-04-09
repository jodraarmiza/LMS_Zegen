package service

import "github.com/labstack/echo/v4"

type ExamService struct{}

func (s *ExamService) GetExams(c echo.Context) error {
	return c.JSON(200, map[string]string{"message": "dummy get exams"})
}

func (s *ExamService) GetExam(c echo.Context) error {
	return c.JSON(200, map[string]string{"message": "dummy get exam"})
}

func (s *ExamService) CreateExam(c echo.Context) error {
	return c.JSON(200, map[string]string{"message": "dummy create exam"})
}

func (s *ExamService) UpdateExam(c echo.Context) error {
	return c.JSON(200, map[string]string{"message": "dummy update exam"})
}

func (s *ExamService) DeleteExam(c echo.Context) error {
	return c.JSON(200, map[string]string{"message": "dummy delete exam"})
}

func (s *ExamService) GetQuestions(c echo.Context) error {
	return c.JSON(200, map[string]string{"message": "dummy get questions"})
}

func (s *ExamService) AddQuestion(c echo.Context) error {
	return c.JSON(200, map[string]string{"message": "dummy add question"})
}

func (s *ExamService) UpdateQuestion(c echo.Context) error {
	return c.JSON(200, map[string]string{"message": "dummy update question"})
}

func (s *ExamService) DeleteQuestion(c echo.Context) error {
	return c.JSON(200, map[string]string{"message": "dummy delete question"})
}

func (s *ExamService) StartExam(c echo.Context) error {
	return c.JSON(200, map[string]string{"message": "dummy start exam"})
}

func (s *ExamService) SubmitExam(c echo.Context) error {
	return c.JSON(200, map[string]string{"message": "dummy submit exam"})
}

func (s *ExamService) AnswerQuestion(c echo.Context) error {
	return c.JSON(200, map[string]string{"message": "dummy answer question"})
}

func (s *ExamService) GetAttempts(c echo.Context) error {
	return c.JSON(200, map[string]string{"message": "dummy get attempts"})
}

func (s *ExamService) GetMyAttempts(c echo.Context) error {
	return c.JSON(200, map[string]string{"message": "dummy get my attempts"})
}

func (s *ExamService) GetAttempt(c echo.Context) error {
	return c.JSON(200, map[string]string{"message": "dummy get attempt"})
}
