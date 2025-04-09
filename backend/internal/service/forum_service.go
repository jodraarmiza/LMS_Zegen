package service

import "github.com/labstack/echo/v4"

type ForumService struct{}

func (s *ForumService) GetThreads(c echo.Context) error {
	return c.JSON(200, map[string]string{"message": "dummy get threads"})
}

func (s *ForumService) GetThread(c echo.Context) error {
	return c.JSON(200, map[string]string{"message": "dummy get thread"})
}

func (s *ForumService) CreateThread(c echo.Context) error {
	return c.JSON(200, map[string]string{"message": "dummy create thread"})
}

func (s *ForumService) UpdateThread(c echo.Context) error {
	return c.JSON(200, map[string]string{"message": "dummy update thread"})
}

func (s *ForumService) DeleteThread(c echo.Context) error {
	return c.JSON(200, map[string]string{"message": "dummy delete thread"})
}

func (s *ForumService) GetMessages(c echo.Context) error {
	return c.JSON(200, map[string]string{"message": "dummy get messages"})
}

func (s *ForumService) CreateMessage(c echo.Context) error {
	return c.JSON(200, map[string]string{"message": "dummy create message"})
}

func (s *ForumService) UpdateMessage(c echo.Context) error {
	return c.JSON(200, map[string]string{"message": "dummy update message"})
}

func (s *ForumService) DeleteMessage(c echo.Context) error {
	return c.JSON(200, map[string]string{"message": "dummy delete message"})
}

func (s *ForumService) IncrementViews(c echo.Context) error {
	return c.JSON(200, map[string]string{"message": "dummy increment views"})
}
