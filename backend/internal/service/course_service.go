package service

import "github.com/labstack/echo/v4"

type CourseService struct{}

func (s *CourseService) GetCourses(c echo.Context) error {
	return c.JSON(200, map[string]string{"message": "dummy get courses"})
}

func (s *CourseService) GetCourse(c echo.Context) error {
	return c.JSON(200, map[string]string{"message": "dummy get course"})
}

func (s *CourseService) CreateCourse(c echo.Context) error {
	return c.JSON(200, map[string]string{"message": "dummy create course"})
}

func (s *CourseService) UpdateCourse(c echo.Context) error {
	return c.JSON(200, map[string]string{"message": "dummy update course"})
}

func (s *CourseService) DeleteCourse(c echo.Context) error {
	return c.JSON(200, map[string]string{"message": "dummy delete course"})
}

func (s *CourseService) GetCourseInstructors(c echo.Context) error {
	return c.JSON(200, map[string]string{"message": "dummy get course instructors"})
}

func (s *CourseService) AddCourseInstructor(c echo.Context) error {
	return c.JSON(200, map[string]string{"message": "dummy add course instructor"})
}

func (s *CourseService) RemoveCourseInstructor(c echo.Context) error {
	return c.JSON(200, map[string]string{"message": "dummy remove course instructor"})
}

func (s *CourseService) GetCourseStudents(c echo.Context) error {
	return c.JSON(200, map[string]string{"message": "dummy get course students"})
}

func (s *CourseService) EnrollStudent(c echo.Context) error {
	return c.JSON(200, map[string]string{"message": "dummy enroll student"})
}

func (s *CourseService) UnenrollStudent(c echo.Context) error {
	return c.JSON(200, map[string]string{"message": "dummy unenroll student"})
}
