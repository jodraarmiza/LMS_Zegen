package service

import "github.com/labstack/echo/v4"

type GradeService struct{}

func (s *GradeService) GetCourseGrades(c echo.Context) error {
	return c.JSON(200, map[string]string{"message": "dummy get course grades"})
}

func (s *GradeService) GetMyGrades(c echo.Context) error {
	return c.JSON(200, map[string]string{"message": "dummy get my grades"})
}

func (s *GradeService) GetUserGrades(c echo.Context) error {
	return c.JSON(200, map[string]string{"message": "dummy get user grades"})
}

func (s *GradeService) CreateGrade(c echo.Context) error {
	return c.JSON(200, map[string]string{"message": "dummy create grade"})
}

func (s *GradeService) UpdateGrade(c echo.Context) error {
	return c.JSON(200, map[string]string{"message": "dummy update grade"})
}

func (s *GradeService) DeleteGrade(c echo.Context) error {
	return c.JSON(200, map[string]string{"message": "dummy delete grade"})
}

func (s *GradeService) CalculateCourseGrade(c echo.Context) error {
	return c.JSON(200, map[string]string{"message": "dummy calculate course grade"})
}

func (s *GradeService) CalculateUserCourseGrade(c echo.Context) error {
	return c.JSON(200, map[string]string{"message": "dummy calculate user course grade"})
}
