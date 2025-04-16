import React, { useState, useEffect } from "react";
import {
  Box,
  Heading,
  Text,
  Flex,
  Badge,
  VStack,
  IconButton,
  HStack,
  Divider,
  Stat,
  StatLabel,
  StatNumber,
  StatGroup,
} from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import { ChevronLeftIcon, TimeIcon } from "@chakra-ui/icons";
import { MdArrowDropDownCircle, MdArrowBack } from "react-icons/md";
import { Link as ChakraLink } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

interface Assignment {
  id: string;
  number: number;
  sessionName: string;
  dueDate: string;
  status: "submitted" | "overdue" | "upcoming";
}

interface Course {
  id: string;
  code: string;
  title: string;
  assessment?: {
    total: number;
    completed: number;
    lastUpdated: string;
  };
}

const IconArrowDropDownCircle = MdArrowDropDownCircle as React.FC;
const IconArrowBack = MdArrowBack as React.FC;

const AssessmentDetail: React.FC = () => {
  const navigate = useNavigate();
  const { courseId } = useParams<{ courseId: string }>();
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
    { 
      id: "1", 
      code: "LE7323", 
      title: "IT Service & Risk Management",
      assessment: {
        total: 3,
        completed: 2,
        lastUpdated: "2d ago"
      }
    },
    { 
      id: "2", 
      code: "LE7323", 
      title: "Digital Banking",
      assessment: {
        total: 4,
        completed: 2,
        lastUpdated: "3d ago"
      }
    },
    { 
      id: "3", 
      code: "LE7323", 
      title: "User Experience Research & Design",
      assessment: {
        total: 4,
        completed: 3,
        lastUpdated: "5d ago"
      }
    },
    { 
      id: "4", 
      code: "LE7323", 
      title: "Introduction to Database System",
      assessment: {
        total: 3,
        completed: 1,
        lastUpdated: "6d ago"
      }
    },
  ];

  // State for current course
  const [currentCourse, setCurrentCourse] = useState(allCourses[0]);

  // Find current course based on courseId
  useEffect(() => {
    const course = allCourses.find((c) => c.id === courseId) || allCourses[0];
    setCurrentCourse(course);
  }, [courseId]);

  // Mock data for assignments
  const assignments: Assignment[] = [
    {
      id: "1",
      number: 1,
      sessionName: "Session 2 PILGAN IT Governance",
      dueDate: "10 March 2025, 23:59hrs",
      status: "submitted",
    },
    {
      id: "2",
      number: 2,
      sessionName: "Session 4 Paper on Auditing Information Technology Based",
      dueDate: "10 March 2025, 23:59hrs",
      status: "overdue",
    },
    {
      id: "3",
      number: 3,
      sessionName: "Session 5 Case Study on E-Commerce & E-Business",
      dueDate: "11 April 2025, 23:59hrs",
      status: "upcoming",
    },
  ];

  const handleGoBack = () => {
    navigate("/assessment");
  };

  const handleAssignmentClick = (assignmentId: string) => {
    navigate(`/assessment/${courseId}/assignment/${assignmentId}`);
  };

  // Get assignment counts by status
  const getAssignmentStatusCounts = () => {
    const counts = {
      submitted: 0,
      overdue: 0,
      upcoming: 0
    };
    
    assignments.forEach(assignment => {
      counts[assignment.status]++;
    });
    
    return counts;
  };

  const statusCounts = getAssignmentStatusCounts();

  const getStatusBadge = (status: Assignment["status"]) => {
    switch (status) {
      case "submitted":
        return <Badge colorScheme="green">Submitted</Badge>;
      case "overdue":
        return <Badge colorScheme="red">Overdue</Badge>;
      case "upcoming":
        return <Badge colorScheme="blue">Upcoming</Badge>;
      default:
        return null;
    }
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
                {/* Breadcrumb section */}
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
                  {currentCourse.title}
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
                    {currentCourse.title}
                  </Heading>
                </Flex>
              </Box>
            </Flex>
            
            {/* Assignment Summary Stats */}
            <Box 
              bg="white" 
              p={4} 
              borderRadius="lg"
              boxShadow="sm"
              borderWidth="1px"
              borderColor="gray.200"
              mb={6}
            >
              <StatGroup mb={4}>
                <Stat>
                  <StatLabel>Total Assignments</StatLabel>
                  <StatNumber>{assignments.length}</StatNumber>
                </Stat>
                <Stat>
                  <StatLabel>Completed</StatLabel>
                  <StatNumber>{statusCounts.submitted}</StatNumber>
                </Stat>
                <Stat>
                  <StatLabel>Overdue</StatLabel>
                  <StatNumber color="red.500">{statusCounts.overdue}</StatNumber>
                </Stat>
                <Stat>
                  <StatLabel>Upcoming</StatLabel>
                  <StatNumber color="blue.500">{statusCounts.upcoming}</StatNumber>
                </Stat>
              </StatGroup>
              
              <Divider mb={4} />
              
              <HStack spacing={4} justify="center">
                <Box>
                  <Badge colorScheme="green" mr={1}>{statusCounts.submitted}</Badge>
                  <Text as="span" fontSize="sm">Submitted</Text>
                </Box>
                <Box>
                  <Badge colorScheme="red" mr={1}>{statusCounts.overdue}</Badge>
                  <Text as="span" fontSize="sm">Overdue</Text>
                </Box>
                <Box>
                  <Badge colorScheme="blue" mr={1}>{statusCounts.upcoming}</Badge>
                  <Text as="span" fontSize="sm">Upcoming</Text>
                </Box>
              </HStack>
            </Box>

            {/* Assignments List */}
            <Heading as="h2" size="sm" mb={4}>All Assignments</Heading>
            <VStack spacing={4} align="stretch" w="100%">
              {assignments.map((assignment) => (
                <Box
                  key={assignment.id}
                  bg="white"
                  p={4}
                  borderRadius="lg"
                  boxShadow="sm"
                  borderWidth="1px"
                  borderColor="gray.200"
                  cursor="pointer"
                  onClick={() => handleAssignmentClick(assignment.id)}
                  transition="all 0.2s"
                  _hover={{
                    transform: "translateY(-2px)",
                    boxShadow: "md",
                  }}
                  width="100%"
                >
                  <Flex direction="column">
                    <Flex
                      justifyContent="space-between"
                      alignItems="center"
                      mb={2}
                    >
                      <Badge variant="subtle" colorScheme="blue">
                        Assignment {assignment.number}
                      </Badge>
                      {getStatusBadge(assignment.status)}
                    </Flex>
                    <Text fontWeight="semibold" mb={2}>
                      {assignment.sessionName}
                    </Text>
                    <Flex alignItems="center" color="gray.600">
                      <TimeIcon mr={2} />
                      <Text fontSize="sm">Due: {assignment.dueDate}</Text>
                    </Flex>
                  </Flex>
                </Box>
              ))}
            </VStack>
          </Box>
        </Box>
      </Flex>
    </>
  );
};

export default AssessmentDetail;