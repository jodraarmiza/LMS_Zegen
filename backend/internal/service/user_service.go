package service

import "github.com/labstack/echo/v4"

type UserService struct{}

func (s *UserService) GetUsers(c echo.Context) error {
	return c.JSON(200, map[string]string{"message": "dummy get users"})
}

func (s *UserService) GetCurrentUser(c echo.Context) error {
	return c.JSON(200, map[string]string{"message": "dummy get current user"})
}

func (s *UserService) GetUser(c echo.Context) error {
	return c.JSON(200, map[string]string{"message": "dummy get user"})
}

func (s *UserService) UpdateUser(c echo.Context) error {
	return c.JSON(200, map[string]string{"message": "dummy update user"})
}

func (s *UserService) UpdateCurrentUser(c echo.Context) error {
	return c.JSON(200, map[string]string{"message": "dummy update current user"})
}

func (s *UserService) UpdatePassword(c echo.Context) error {
	return c.JSON(200, map[string]string{"message": "dummy update password"})
}

func (s *UserService) UploadProfilePhoto(c echo.Context) error {
	return c.JSON(200, map[string]string{"message": "dummy upload profile photo"})
}

func (s *UserService) GetStudents(c echo.Context) error {
	return c.JSON(200, map[string]string{"message": "dummy get students"})
}

func (s *UserService) GetStudent(c echo.Context) error {
	return c.JSON(200, map[string]string{"message": "dummy get student"})
}

func (s *UserService) UpdateStudent(c echo.Context) error {
	return c.JSON(200, map[string]string{"message": "dummy update student"})
}

func (s *UserService) GetInstructors(c echo.Context) error {
	return c.JSON(200, map[string]string{"message": "dummy get instructors"})
}

func (s *UserService) GetInstructor(c echo.Context) error {
	return c.JSON(200, map[string]string{"message": "dummy get instructor"})
}

func (s *UserService) UpdateInstructor(c echo.Context) error {
	return c.JSON(200, map[string]string{"message": "dummy update instructor"})
}
