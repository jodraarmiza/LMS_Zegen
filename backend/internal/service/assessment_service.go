package service

import "github.com/labstack/echo/v4"

type AssessmentService struct{}

func (s *AssessmentService) GetAssessments(c echo.Context) error {
	return c.JSON(200, map[string]string{"message": "dummy get assessments"})
}

func (s *AssessmentService) GetAssessment(c echo.Context) error {
	return c.JSON(200, map[string]string{"message": "dummy get assessment"})
}

func (s *AssessmentService) CreateAssessment(c echo.Context) error {
	return c.JSON(200, map[string]string{"message": "dummy create assessment"})
}

func (s *AssessmentService) UpdateAssessment(c echo.Context) error {
	return c.JSON(200, map[string]string{"message": "dummy update assessment"})
}

func (s *AssessmentService) DeleteAssessment(c echo.Context) error {
	return c.JSON(200, map[string]string{"message": "dummy delete assessment"})
}

func (s *AssessmentService) SubmitAssessment(c echo.Context) error {
	return c.JSON(200, map[string]string{"message": "dummy submit assessment"})
}

func (s *AssessmentService) GetSubmissions(c echo.Context) error {
	return c.JSON(200, map[string]string{"message": "dummy get submissions"})
}

func (s *AssessmentService) GetSubmission(c echo.Context) error {
	return c.JSON(200, map[string]string{"message": "dummy get submission"})
}

func (s *AssessmentService) GradeSubmission(c echo.Context) error {
	return c.JSON(200, map[string]string{"message": "dummy grade submission"})
}

func (s *AssessmentService) GetMySubmissions(c echo.Context) error {
	return c.JSON(200, map[string]string{"message": "dummy get my submissions"})
}

func (s *AssessmentService) GetRubric(c echo.Context) error {
	return c.JSON(200, map[string]string{"message": "dummy get rubric"})
}

func (s *AssessmentService) CreateRubricItem(c echo.Context) error {
	return c.JSON(200, map[string]string{"message": "dummy create rubric item"})
}

func (s *AssessmentService) UpdateRubricItem(c echo.Context) error {
	return c.JSON(200, map[string]string{"message": "dummy update rubric item"})
}

func (s *AssessmentService) DeleteRubricItem(c echo.Context) error {
	return c.JSON(200, map[string]string{"message": "dummy delete rubric item"})
}
