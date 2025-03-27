import React, { useState, useEffect } from "react";
import {
  Box,
  Heading,
  Text,
  Flex,
  Button,
  IconButton,
  Input,
  VStack,
  HStack,
  useToast,
} from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import { ChevronLeftIcon, TimeIcon, AttachmentIcon } from "@chakra-ui/icons";
import { MdArrowDropDownCircle, MdArrowBack } from "react-icons/md";
import { Link as ChakraLink } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

interface Course {
  id: string;
  code: string;
  title: string;
}

interface AssignmentData {
  id: string;
  number: number;
  sessionName: string;
  dueDate: string;
  description: string;
  allowedFileTypes: string;
  maxFileSize: string;
}

const IconArrowDropDownCircle = MdArrowDropDownCircle as React.FC;
const IconArrowBack = MdArrowBack as React.FC;

const AssessmentSubmission: React.FC = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const { courseId, assignmentId } = useParams<{ courseId: string; assignmentId: string }>();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isCollapsed, setIsCollapsed] = useState(false);

  // State for semester dropdown
  const [selectedSemester, setSelectedSemester] = useState("2025 Even Semester");
  const semesters = [
    "2025 Even Semester",
    "2024 Odd Semester",
    "2024 Even Semester",
    "2023 Odd Semester",
  ];

  // Mock data for available courses
  const allCourses: Course[] = [
    { id: "1", code: "LE7323", title: "IT Service & Risk Management" },
    { id: "2", code: "LE7323", title: "Digital Banking" },
    { id: "3", code: "LE7323", title: "User Experience Research & Design" },
    { id: "4", code: "LE7323", title: "Introduction to Database System" },
  ];

  // Mock assignments data with different numbers
  const allAssignments: AssignmentData[] = [
    {
      id: "1",
      number: 1,
      sessionName: "Session 2 PILGAN IT Governance",
      dueDate: "10 March 2025, 23:59hrs",
      description: "In this assignment, complete the multiple choice questions related to IT Governance frameworks and principles.",
      allowedFileTypes: ".pdf, .docx",
      maxFileSize: "5MB",
    },
    {
      id: "2",
      number: 2,
      sessionName: "Session 4 Paper on Auditing Information Technology Based",
      dueDate: "15 March 2025, 23:59hrs",
      description: "Write a research paper on modern approaches to IT auditing with focus on cloud environments.",
      allowedFileTypes: ".pdf, .docx",
      maxFileSize: "10MB",
    },
    {
      id: "3",
      number: 3,
      sessionName: "Session 5 Case Study on E-Commerce & E-Business",
      dueDate: "22 March 2025, 23:59hrs",
      description: "Analyze the provided case study on a real-world e-commerce platform and identify risk management strategies.",
      allowedFileTypes: ".pdf, .docx, .pptx",
      maxFileSize: "15MB",
    },
  ];

  // State for current course and assignment
  const [currentCourse, setCurrentCourse] = useState(allCourses[0]);
  const [currentAssignment, setCurrentAssignment] = useState(allAssignments[0]);

  // Find current course and assignment based on URL params
  useEffect(() => {
    const course = allCourses.find(c => c.id === courseId) || allCourses[0];
    setCurrentCourse(course);
    
    const assignment = allAssignments.find(a => a.id === assignmentId) || allAssignments[0];
    setCurrentAssignment(assignment);
  }, [courseId, assignmentId]);

  const handleGoBack = () => {
    navigate(`/assessment/${courseId}`);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleSubmit = () => {
    if (!selectedFile) {
      toast({
        title: "No file selected",
        description: "Please select a file to upload",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    // In a real app, you would upload the file to the server here
    toast({
      title: "Assignment submitted",
      description: `Successfully uploaded ${selectedFile.name}`,
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <>

      {/* Main content with Sidebar */}
      <Flex>

        {/* Content wrapper - takes full width after sidebar */}
        <Box flex="1" position="relative" overflowX="hidden">
          <Box p={6} w="100%" overflowY="auto" maxH="calc(100vh - 57px)">
            {/* Header with breadcrumb, title, and semester selector */}
            <Flex
              justifyContent="space-between"
              mb={6}
              w="100%"
              alignItems="flex-start"
              flexWrap="wrap"
            >
              <Box>
  {/* Breadcrumb section with assignment number */}
  <Text fontSize="sm" color="gray.500" mb={8}>
    <ChakraLink 
      as={RouterLink} 
      to="/assessment" 
      color="gray.500" 
      _hover={{ textDecoration: "underline" }}
    >
      Assessment
    </ChakraLink>
    {" > "}
    <ChakraLink 
      as={RouterLink} 
      to={`/assessment/${courseId}`} 
      color="gray.500" 
      _hover={{ textDecoration: "underline" }}
    >
      {currentCourse.title}
    </ChakraLink>
    {" > Assignment "}{currentAssignment.number}
  </Text>
  
  {/* Title with back button */}
  <Flex alignItems="center" mb={4}>
    <IconButton
      aria-label="Back"
      icon={<ChevronLeftIcon />}
      variant="ghost"
      mr={2}
      onClick={handleGoBack}
    />
    <Heading as="h1" size="md" fontWeight="semibold">
      Assignment {currentAssignment.number}
    </Heading>
  </Flex>
</Box>

            </Flex>

            {/* Assignment Details */}
            <Box
              bg="white"
              borderRadius="md"
              borderWidth="1px"
              borderColor="gray.200"
              p={4}
              mb={6}
            >
              <VStack spacing={4} align="stretch">
                <Flex direction="column">
                  <Text fontWeight="semibold">Assignment {currentAssignment.number}</Text>
                  <Text>{currentAssignment.sessionName}</Text>
                  <Flex alignItems="center" color="gray.600" mt={2}>
                    <TimeIcon mr={2} />
                    <Text fontSize="sm">Due: {currentAssignment.dueDate}</Text>
                  </Flex>
                </Flex>
              </VStack>
            </Box>

            {/* Assignment Description */}
            <Box
              bg="white"
              borderRadius="md"
              borderWidth="1px"
              borderColor="gray.200"
              p={4}
              mb={6}
            >
              <Heading size="sm" mb={4}>
                Description
              </Heading>
              <Text mb={4}>{currentAssignment.description}</Text>
            </Box>

            {/* Upload Section */}
            <Box
              bg="white"
              borderRadius="md"
              borderWidth="1px"
              borderColor="gray.200"
              p={4}
              mb={6}
            >
              <Heading size="sm" mb={4}>
                Upload Assignment
              </Heading>
              <HStack spacing={4} mb={4}>
                <Button
                  as="label"
                  htmlFor="file-upload"
                  colorScheme="blue"
                  leftIcon={<AttachmentIcon />}
                  cursor="pointer"
                >
                  Choose File
                  <Input
                    id="file-upload"
                    type="file"
                    display="none"
                    onChange={handleFileChange}
                  />
                </Button>
                <Text color="gray.600">
                  {selectedFile ? selectedFile.name : "No file chosen"}
                </Text>
              </HStack>
              <Text fontSize="sm" color="gray.600" mb={4}>
                Upload your assignment file. Allowed file types: {currentAssignment.allowedFileTypes}. Maximum file size: {currentAssignment.maxFileSize}.
              </Text>
              <Button colorScheme="blue" onClick={handleSubmit}>
                Submit Assignment
              </Button>
            </Box>
          </Box>
        </Box>
      </Flex>
    </>
  );
};

export default AssessmentSubmission;