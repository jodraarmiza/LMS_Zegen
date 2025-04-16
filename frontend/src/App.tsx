import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import Layout from "./components/Layout";

// LMS Pages
import Dashboard from "./pages/LMS/Dashboard";
import Course from "./pages/LMS/StudentRole/Courses/courses";
import Courses from "./pages/LMS/StudentRole/Courses/courses";
import CourseSession from "./pages/LMS/StudentRole/Courses/CourseSession";
import CourseAttendance from "./pages/LMS/StudentRole/Courses/CourseAttendance";
import AttendanceGeneral from "./pages/LMS/StudentRole/Attendance/AttendanceGeneral";
import Login from "./pages/Login";
import HomeSelection from "./pages/HomeSelection";
import Forum from "./pages/LMS/StudentRole/Courses/Forum";
import ForumGeneral from "./pages/LMS/StudentRole/Forum/Forum";
import Syllabus from "./pages/LMS/StudentRole/Courses/Syllabus";
import Assessment from "./pages/LMS/StudentRole/Courses/Assessment";
import Gradebook from "./pages/LMS/StudentRole/Courses/Gradebook";
import AssessmentRubric from "./pages/LMS/StudentRole/Courses/AssessmentRubric";
import People from "./pages/LMS/StudentRole/Courses/People";
import GradebookGeneral from "./pages/LMS/StudentRole/gradebook/GradebookGeneral";
import GradebookCourse from "./pages/LMS/StudentRole/Courses/GradebookCourse";
import Profile from "./pages/Profile";
import AssessmentGeneral from "./pages/LMS/StudentRole/Assessment/AssessmentGeneral";
import AssessmentDetail from "./pages/LMS/StudentRole/Assessment/AssessmentDetail";
import AssessmentSubmission from "./pages/LMS/StudentRole/Assessment/AssessmentSubmission";
import Exam from "./pages/LMS/StudentRole/Courses/Exam";
import Schedule from "./pages/LMS/StudentRole/Schedule/Schedule";

// My University components
import MU_dashboard from "./pages/My_University/StudentRole/MU_dashboard";
import MU_Course from "./pages/My_University/StudentRole/MU_course";
import MU_studentrequest from "./pages/My_University/StudentRole/MU_studentrequest";
import MU_skpi from "./pages/My_University/StudentRole/MU_skpi";
import MU_events from "./pages/My_University/StudentRole/MU_events";
import MU_gradebook from "./pages/My_University/StudentRole/MU_gradebook";
import MU_finance from "./pages/My_University/StudentRole/MU_finance";

// Thesis components
import ThesisLayout from "./components/thesislayout";
import ThesisDashboard from "./pages/Thesis/StudentRole/thesis_dashboard";
import ThesisGuidelines from "./pages/Thesis/StudentRole/thesisguidelines";
import ThesisProposal from "./pages/Thesis/StudentRole/thesisproposal";
import ThesisConsultation from "./pages/Thesis/StudentRole/consultationpage";
import Defense from "./pages/Thesis/StudentRole/defense";
import Calendar from "./pages/Thesis/StudentRole/calendar";

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
          path="/my-university/courses"
          element={
            <Layout>
              <MU_Course />
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
        <Route
          path="/my-university/finance"
          element={
            <Layout>
              <MU_finance />
            </Layout>
          }
        />

        {/* Thesis Routes */}
        <Route path="/thesis" element={<ThesisLayout />}>
          <Route index element={<Navigate to="/thesis/dashboard" replace />} />
          <Route path="dashboard" element={<ThesisDashboard />} />
          <Route path="guidelines" element={<ThesisGuidelines />} />
          <Route path="proposal" element={<ThesisProposal />} />
          <Route path="consultation" element={<ThesisConsultation />} />
          <Route path="defense" element={<Defense />} />
          <Route path="calendar" element={<Calendar />} />
          <Route path="*" element={<Navigate to="/thesis/dashboard" replace />} />
        </Route>

        {/* Redirect unknown routes to login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </ChakraProvider>
  );
};

export default App;