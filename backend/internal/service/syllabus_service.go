package service

import "github.com/labstack/echo/v4"

type SyllabusService struct{}

func (s *SyllabusService) GetSyllabus(c echo.Context) error {
	return c.JSON(200, map[string]string{"message": "dummy get syllabus"})
}

func (s *SyllabusService) CreateSyllabus(c echo.Context) error {
	return c.JSON(200, map[string]string{"message": "dummy create syllabus"})
}

func (s *SyllabusService) UpdateSyllabus(c echo.Context) error {
	return c.JSON(200, map[string]string{"message": "dummy update syllabus"})
}

func (s *SyllabusService) GetLearningOutcomes(c echo.Context) error {
	return c.JSON(200, map[string]string{"message": "dummy get learning outcomes"})
}

func (s *SyllabusService) AddLearningOutcome(c echo.Context) error {
	return c.JSON(200, map[string]string{"message": "dummy add learning outcome"})
}

func (s *SyllabusService) UpdateLearningOutcome(c echo.Context) error {
	return c.JSON(200, map[string]string{"message": "dummy update learning outcome"})
}

func (s *SyllabusService) DeleteLearningOutcome(c echo.Context) error {
	return c.JSON(200, map[string]string{"message": "dummy delete learning outcome"})
}

func (s *SyllabusService) GetTeachingStrategies(c echo.Context) error {
	return c.JSON(200, map[string]string{"message": "dummy get teaching strategies"})
}

func (s *SyllabusService) AddTeachingStrategy(c echo.Context) error {
	return c.JSON(200, map[string]string{"message": "dummy add teaching strategy"})
}

func (s *SyllabusService) UpdateTeachingStrategy(c echo.Context) error {
	return c.JSON(200, map[string]string{"message": "dummy update teaching strategy"})
}

func (s *SyllabusService) DeleteTeachingStrategy(c echo.Context) error {
	return c.JSON(200, map[string]string{"message": "dummy delete teaching strategy"})
}

func (s *SyllabusService) GetTextbooks(c echo.Context) error {
	return c.JSON(200, map[string]string{"message": "dummy get textbooks"})
}

func (s *SyllabusService) AddTextbook(c echo.Context) error {
	return c.JSON(200, map[string]string{"message": "dummy add textbook"})
}

func (s *SyllabusService) UpdateTextbook(c echo.Context) error {
	return c.JSON(200, map[string]string{"message": "dummy update textbook"})
}

func (s *SyllabusService) DeleteTextbook(c echo.Context) error {
	return c.JSON(200, map[string]string{"message": "dummy delete textbook"})
}
