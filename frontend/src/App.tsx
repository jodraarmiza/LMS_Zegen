import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Course from "./pages/Courses/courses";
import Courses from "./pages/Courses/courses";
import CourseSession from "./pages/Courses/CourseSession";
import CourseAttendance from "./pages/Courses/CourseAttendance";
import AttendanceGeneral from "./pages/Attendance/AttendanceGeneral";
import Login from "./pages/Login";
import HomeSelection from "./pages/HomeSelection";
import Forum from "./pages/Courses/Forum";
import ForumGeneral from "./pages/Forum/Forum";
import Syllabus from "./pages/Courses/Syllabus";
import Assessment from "./pages/Courses/Assessment";
import Gradebook from "./pages/Courses/Gradebook";
import AssessmentRubric from "./pages/Courses/AssessmentRubric";
import People from "./pages/Courses/People";
import GradebookGeneral from "./pages/gradebook/GradebookGeneral";
import GradebookCourse from "./pages/Courses/GradebookCourse";
import Profile from "./pages/Profile";
import AssessmentGeneral from "./pages/Assessment/AssessmentGeneral";
import AssessmentDetail from "./pages/Assessment/AssessmentDetail";
import AssessmentSubmission from "./pages/Assessment/AssessmentSubmission";
import Exam from "./pages/Courses/Exam";
import Schedule from "./pages/Schedule/Schedule";

// Import My University components
import MU_dashboard from "./pages/My_University/MU_dashboard";
import MU_courses from "./pages/My_University/MU_courses";
import MU_studentcard from "./pages/My_University/MU_studentcard";
import MU_studentrequest from "./pages/My_University/MU_studentrequest";
import MU_skpi from "./pages/My_University/MU_skpi";
import MU_events from "./pages/My_University/MU_events";
import MU_gradebook from "./pages/My_University/MU_gradebook";

const App: React.FC = () => {
  return (
    <ChakraProvider>
      <Routes>
        {/* Set login as the entry point */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<HomeSelection />} />

        {/* Profile Route */}
        <Route
          path="/profile"
          element={
            <Layout>
              <Profile />
            </Layout>
          }
        />

        {/* Forum Routes */}
        <Route
          path="/forum"
          element={
            <Layout>
              <ForumGeneral />
            </Layout>
          }
        />

        {/* Assessment Routes */}
        <Route
          path="/assessment"
          element={
            <Layout>
              <AssessmentGeneral />
            </Layout>
          }
        />
        <Route
          path="/assessment/:courseId"
          element={
            <Layout>
              <AssessmentDetail />
            </Layout>
          }
        />
        <Route
          path="/assessment/:courseId/assignment/:assignmentId"
          element={
            <Layout>
              <AssessmentSubmission />
            </Layout>
          }
        />

        {/* Schedule Route */}
        <Route
          path="/schedule"
          element={
            <Layout>
              <Schedule />
            </Layout>
          }
        />

        {/* Protected Routes with Layout */}
        <Route
          path="/dashboard"
          element={
            <Layout>
              <Dashboard />
            </Layout>
          }
        />
        <Route
          path="/gradebook"
          element={
            <Layout>
              <GradebookGeneral />
            </Layout>
          }
        />
        <Route
          path="/gradebook/:courseId"
          element={
            <Layout>
              <GradebookCourse />
            </Layout>
          }
        />
        <Route
          path="/courses"
          element={
            <Layout>
              <Courses />
            </Layout>
          }
        />
        <Route
          path="/course/:courseId"
          element={
            <Layout>
              <Course />
            </Layout>
          }
        />
        <Route
          path="/course/:courseId/session/:sessionId"
          element={
            <Layout>
              <CourseSession />
            </Layout>
          }
        />
        <Route
          path="/course/:courseId/attendance"
          element={
            <Layout>
              <CourseAttendance />
            </Layout>
          }
        />

        {/* Exam Routes */}
        <Route
          path="/course/:courseId/exam"
          element={
            <Layout>
              <Exam />
            </Layout>
          }
        />
        <Route
          path="/course/:courseId/exam/:examId/take"
          element={
            <Layout>
              <Exam />
            </Layout>
          }
        />
        <Route
          path="/course/:courseId/exam/:examId/results"
          element={
            <Layout>
              <Exam />
            </Layout>
          }
        />

        <Route
          path="/attendance"
          element={
            <Layout>
              <CourseAttendance />
            </Layout>
          }
        />
        <Route
          path="/attendance-general"
          element={
            <Layout>
              <AttendanceGeneral />
            </Layout>
          }
        />
        <Route
          path="/course/:courseId/forum"
          element={
            <Layout>
              <Forum />
            </Layout>
          }
        />
        <Route
          path="/course/:courseId/syllabus"
          element={
            <Layout>
              <Syllabus />
            </Layout>
          }
        />
        <Route
          path="/course/:courseId/assessment"
          element={
            <Layout>
              <Assessment />
            </Layout>
          }
        />
        <Route
          path="/course/:courseId/gradebook"
          element={
            <Layout>
              <Gradebook />
            </Layout>
          }
        />
        <Route
          path="/course/:courseId/rubric"
          element={
            <Layout>
              <AssessmentRubric />
            </Layout>
          }
        />
        <Route
          path="/course/:courseId/people"
          element={
            <Layout>
              <People />
            </Layout>
          }
        />

        {/* My University Routes */}
        <Route
          path="/my-university/dashboard"
          element={
            <Layout>
              <MU_dashboard />
            </Layout>
          }
        />
        <Route
          path="/my-university/course"
          element={
            <Layout>
              <MU_courses />
            </Layout>
          }
        />
        <Route
          path="/my-university/student-card"
          element={
            <Layout>
              <MU_studentcard />
            </Layout>
          }
        />
        <Route
          path="/my-university/request-letter"
          element={
            <Layout>
              <MU_studentrequest />
            </Layout>
          }
        />
        <Route
          path="/my-university/skpi"
          element={
            <Layout>
              <MU_skpi />
            </Layout>
          }
        />
        <Route
          path="/my-university/events"
          element={
            <Layout>
              <MU_events />
            </Layout>
          }
        />
        <Route
          path="/my-university/gradebook"
          element={
            <Layout>
              <MU_gradebook />
            </Layout>
          }
        />

        {/* Redirect unknown routes to login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </ChakraProvider>
  );
};

export default App;