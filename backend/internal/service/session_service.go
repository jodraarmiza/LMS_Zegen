package service

import "github.com/labstack/echo/v4"

type SessionService struct{}

func (s *SessionService) GetSessions(c echo.Context) error {
	return c.JSON(200, map[string]string{"message": "dummy get sessions"})
}

func (s *SessionService) GetSession(c echo.Context) error {
	return c.JSON(200, map[string]string{"message": "dummy get session"})
}

func (s *SessionService) CreateSession(c echo.Context) error {
	return c.JSON(200, map[string]string{"message": "dummy create session"})
}

func (s *SessionService) UpdateSession(c echo.Context) error {
	return c.JSON(200, map[string]string{"message": "dummy update session"})
}

func (s *SessionService) DeleteSession(c echo.Context) error {
	return c.JSON(200, map[string]string{"message": "dummy delete session"})
}

func (s *SessionService) GetSessionContents(c echo.Context) error {
	return c.JSON(200, map[string]string{"message": "dummy get session contents"})
}

func (s *SessionService) AddSessionContent(c echo.Context) error {
	return c.JSON(200, map[string]string{"message": "dummy add session content"})
}

func (s *SessionService) UpdateSessionContent(c echo.Context) error {
	return c.JSON(200, map[string]string{"message": "dummy update session content"})
}

func (s *SessionService) DeleteSessionContent(c echo.Context) error {
	return c.JSON(200, map[string]string{"message": "dummy delete session content"})
}

func (s *SessionService) GetMaterials(c echo.Context) error {
	return c.JSON(200, map[string]string{"message": "dummy get materials"})
}

func (s *SessionService) AddMaterial(c echo.Context) error {
	return c.JSON(200, map[string]string{"message": "dummy add material"})
}

func (s *SessionService) UpdateMaterial(c echo.Context) error {
	return c.JSON(200, map[string]string{"message": "dummy update material"})
}

func (s *SessionService) DeleteMaterial(c echo.Context) error {
	return c.JSON(200, map[string]string{"message": "dummy delete material"})
}

func (s *SessionService) DownloadMaterial(c echo.Context) error {
	return c.JSON(200, map[string]string{"message": "dummy download material"})
}
