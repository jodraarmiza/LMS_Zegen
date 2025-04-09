package service

import "github.com/labstack/echo/v4"

type AttendanceService struct{}

func (s *AttendanceService) GetSessionAttendance(c echo.Context) error {
	return c.JSON(200, map[string]string{"message": "dummy get session attendance"})
}

func (s *AttendanceService) GetMyAttendance(c echo.Context) error {
	return c.JSON(200, map[string]string{"message": "dummy get my attendance"})
}

func (s *AttendanceService) MarkAttendance(c echo.Context) error {
	return c.JSON(200, map[string]string{"message": "dummy mark attendance"})
}

func (s *AttendanceService) MarkMyAttendance(c echo.Context) error {
	return c.JSON(200, map[string]string{"message": "dummy mark my attendance"})
}

func (s *AttendanceService) GetUserAttendance(c echo.Context) error {
	return c.JSON(200, map[string]string{"message": "dummy get user attendance"})
}

func (s *AttendanceService) GetCourseAttendance(c echo.Context) error {
	return c.JSON(200, map[string]string{"message": "dummy get course attendance"})
}

func (s *AttendanceService) GetMyCourseAttendance(c echo.Context) error {
	return c.JSON(200, map[string]string{"message": "dummy get my course attendance"})
}

func (s *AttendanceService) GetUserCourseAttendance(c echo.Context) error {
	return c.JSON(200, map[string]string{"message": "dummy get user course attendance"})
}
