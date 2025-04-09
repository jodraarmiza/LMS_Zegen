package service

import "github.com/labstack/echo/v4"

type ScheduleService struct{}

func (s *ScheduleService) GetSchedule(c echo.Context) error {
	return c.JSON(200, map[string]string{"message": "dummy get schedule"})
}

func (s *ScheduleService) GetEvent(c echo.Context) error {
	return c.JSON(200, map[string]string{"message": "dummy get event"})
}

func (s *ScheduleService) CreateEvent(c echo.Context) error {
	return c.JSON(200, map[string]string{"message": "dummy create event"})
}

func (s *ScheduleService) UpdateEvent(c echo.Context) error {
	return c.JSON(200, map[string]string{"message": "dummy update event"})
}

func (s *ScheduleService) DeleteEvent(c echo.Context) error {
	return c.JSON(200, map[string]string{"message": "dummy delete event"})
}

func (s *ScheduleService) GetActivities(c echo.Context) error {
	return c.JSON(200, map[string]string{"message": "dummy get activities"})
}

func (s *ScheduleService) GetActivity(c echo.Context) error {
	return c.JSON(200, map[string]string{"message": "dummy get activity"})
}

func (s *ScheduleService) CreateActivity(c echo.Context) error {
	return c.JSON(200, map[string]string{"message": "dummy create activity"})
}

func (s *ScheduleService) UpdateActivity(c echo.Context) error {
	return c.JSON(200, map[string]string{"message": "dummy update activity"})
}

func (s *ScheduleService) DeleteActivity(c echo.Context) error {
	return c.JSON(200, map[string]string{"message": "dummy delete activity"})
}
