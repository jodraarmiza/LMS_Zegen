import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Flex,
  Text,
  Heading,
  Tabs,
  TabList,
  Tab,
  Avatar,
  Progress,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  IconButton,
} from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import {
  BsLightningCharge,
  BsFillJournalBookmarkFill,
  BsPersonWorkspace,
} from "react-icons/bs";
import { HiOutlineLightBulb } from "react-icons/hi2";
import { Link as ChakraLink } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

// Define interfaces for type safety
interface Instructor {
  id: string;
  name: string;
  avatarUrl: string;
}

interface LearningOutcome {
  id: string;
  code: string;
  description: string;
}

interface RubricCriteria {
  id: string;
  learningOutcome: LearningOutcome;
  keyIndicator: string;
  proficiencyLevels: {
    excellent: string;
    good: string;
    average: string;
    poor: string;
  };
}

interface Course {
  id: string;
  code: string;
  title: string;
  category: string;
  instructors: Instructor[];
  distribution: {
    passed: number;
    inProgress: number;
    failed: number;
    notStarted: number;
  };
}

const IconPersonWorkspace = BsPersonWorkspace as React.FC;
const IconLightning = BsLightningCharge as React.FC;
const IconFillJournalBookmark = BsFillJournalBookmarkFill as React.FC;
const IconBulb = HiOutlineLightBulb as React.FC;
const AssessmentRubric: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();

  // Mock data for the course
  const course: Course = {
    id: "1",
    code: "LB2123",
    title: "IT Service & Risk Management",
    category: "IT",
    instructors: [
      {
        id: "101",
        name: "Joni Zimbatima",
        avatarUrl: "https://placehold.co/32x32?text=JZ",
      },
      {
        id: "102",
        name: "Alan Russ",
        avatarUrl: "https://placehold.co/32x32?text=AR",
      },
    ],
    distribution: {
      passed: 30,
      inProgress: 15,
      failed: 30,
      notStarted: 25,
    },
  };

  // Mock data for learning outcomes
  const learningOutcomes: LearningOutcome[] = [
    {
      id: "1",
      code: "LO1",
      description: "Identify the foundation of AIS Concepts",
    },
    {
      id: "2",
      code: "LO2",
      description: "Explain the controls in AIS Concepts",
    },
    {
      id: "3",
      code: "LO3",
      description: "Apply the controls in AIS Concepts",
    },
  ];

  // Mock data for rubric criteria
  const rubricCriteria: RubricCriteria[] = [
    {
      id: "1",
      learningOutcome: learningOutcomes[0],
      keyIndicator:
        "Students can define basic terms related to accounting information systems",
      proficiencyLevels: {
        excellent:
          "Students can define more than 5 basic terms related to accounting information systems with complete explanation",
        good: "Students can define 3 to 5 basic terms related to accounting information systems with good explanation",
        average:
          "Students can define 2 to 3 basic things related to accounting information systems with minimal explanation",
        poor: "Students cannot create define basic things related to accounting information systems",
      },
    },
    {
      id: "2",
      learningOutcome: learningOutcomes[0],
      keyIndicator: "Students can list basic things related to system controls",
      proficiencyLevels: {
        excellent:
          "Students can list more than 5 things related to accounting information systems",
        good: "Students can list 3 to 5 things related to accounting information systems",
        average:
          "Students can list only 1 to 2 basic things related to accounting information systems",
        poor: "Students cannot list accounting information systems",
      },
    },
    {
      id: "3",
      learningOutcome: learningOutcomes[1],
      keyIndicator:
        "Students can explain basic things related to accounting information systems",
      proficiencyLevels: {
        excellent:
          "Students can explain more than 5 basic things related to accounting information systems",
        good: "Students can explain between 3 to 5 things related to accounting information systems",
        average:
          "Students can explain 1 to 2 basic things related to accounting information systems",
        poor: "Students cannot explain basic things related to accounting information systems",
      },
    },
    {
      id: "4",
      learningOutcome: learningOutcomes[1],
      keyIndicator:
        "Students can show and tell something related to accounting information systems",
      proficiencyLevels: {
        excellent:
          "Students can show and tell more than 5 basic things related to accounting information systems",
        good: "Students can show and tell between 3 to 5 basic things related to accounting information systems",
        average:
          "Students can show and tell 1 to 2 things related to accounting information systems",
        poor: "Students cannot show and tell things related to accounting information systems",
      },
    },
  ];

  // State for selected assessment
  const [selectedAssessment, setSelectedAssessment] = useState("assignment1");
  const [activeTab, setActiveTab] = useState(6); // Assessment Rubric tab (index 6)

  // Setup Effect to initialize activeTab based on URL
  useEffect(() => {
    // Initialize active tab based on URL
    const path = window.location.pathname;
    if (path.includes("/session")) {
      setActiveTab(0);
    } else if (path.includes("/syllabus")) {
      setActiveTab(1);
    } else if (path.includes("/forum")) {
      setActiveTab(2);
    } else if (path.includes("/assessment")) {
      setActiveTab(3);
    } else if (path.includes("/exam")) {
      setActiveTab(4);
    } else if (path.includes("/gradebook")) {
      setActiveTab(5);
    } else if (path.includes("/rubric")) {
      setActiveTab(6);
    } else if (path.includes("/people")) {
      setActiveTab(7);
    } else if (path.includes("/attendance")) {
      setActiveTab(8);
    }
  }, []);

  // Go back to courses page
  const handleBackToCourse = () => {
    navigate(`/courses`);
  };

  // Handle tab change
  const handleTabChange = (index: number) => {
    setActiveTab(index);
    // Navigate to the appropriate route based on tab selection
    switch (index) {
      case 0: // Session tab
        navigate(`/course/${courseId}/session/1`);
        break;
      case 1: // Syllabus tab
        navigate(`/course/${courseId}/syllabus`);
        break;
      case 2: // Forum tab
        navigate(`/course/${courseId}/forum`);
        break;
      case 3: // Assessment tab
        navigate(`/course/${courseId}/assessment`);
        break;
      case 4: // Exam tab
        navigate(`/course/${courseId}/exam`);
        break;
      case 5: // Gradebook tab
        navigate(`/course/${courseId}/gradebook`);
        break;
      case 6: // Assessment Rubric tab
        navigate(`/course/${courseId}/rubric`);
        break;
      case 7: // People tab
        navigate(`/course/${courseId}/people`);
        break;
      case 8: // Attendance tab
        navigate(`/course/${courseId}/attendance`);
        break;
      default:
        // Default case - stay on current page
        break;
    }
  };

  return (
    <Box bg="gray.50" w="full" overflowX="hidden" overflowY="hidden">
      {/* Main layout */}
      <Flex w="full" direction="column">
        {/* Content wrapper - takes full width */}
        <Box flex="1" position="relative" overflowX="hidden">
          {/* Course breadcrumb and header */}
          <Box bg="white" borderBottomWidth="1px" borderBottomColor="gray.200">
            <Box px={6} py={4}>
              {/* Custom breadcrumb section */}
              <Box>
                <Text fontSize="sm" color="gray.500" mb={2}>
                  <ChakraLink
                    as={RouterLink}
                    to="/courses"
                    color="gray.500"
                    _hover={{ textDecoration: "underline" }}
                  >
                    Course
                  </ChakraLink>
                  {" / "}
                  <Text as="span" fontWeight="medium" color={"gray.900"}>
                    {course.title}
                  </Text>
                </Text>

                {/* Title with back button */}
                <Flex alignItems="center" mb={4}>
                  <IconButton
                    aria-label="Back"
                    icon={<ArrowBackIcon />}
                    variant="ghost"
                    mr={2}
                    onClick={handleBackToCourse}
                  />
                  <Heading as="h1" size="md" fontWeight="semibold">
                    {course.title}
                  </Heading>
                </Flex>
              </Box>
            </Box>

            {/* Course title and code */}
            <Box px={2} py={2}>
              {/* Main content row with course info and progress bar */}
              <Flex direction="row" justify="space-between" align="flex-end">
                {/* Left side - Course info */}
                <Box flex="0.8" marginLeft={10} mb={4}>
                  <Flex alignItems="center">
                    <Box
                      bg="blue.500"
                      color="white"
                      p={3}
                      borderRadius="md"
                      mr={2}
                      mb={{ base: 2, md: 0 }}
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      fontSize="20px"
                    >
                      <IconFillJournalBookmark />
                    </Box>
                    <Text fontWeight="medium" mr={4}>
                      Course
                    </Text>
                    <Box fontSize="20px" color="gray" marginRight={1}>
                      <IconLightning />
                    </Box>
                    <Text color="gray.500" marginRight={5}>
                      {course.code}
                    </Text>
                    <Box fontSize="20px" color="gray" marginRight={1}>
                      <IconBulb />
                    </Box>
                    <Text color="gray.500">{course.code}</Text>
                  </Flex>

                  <Heading as="h1" size="lg" mt={2} mb={3}>
                    {course.title}
                  </Heading>

                  {/* Instructors */}
                  <Flex align="center" mb={3}>
                    <Box fontSize="18px" color="gray" mr={4}>
                      <IconPersonWorkspace />
                    </Box>
                    {course.instructors.map((instructor) => (
                      <Flex key={instructor.id} align="center" mr={4}>
                        <Avatar
                          size="xs"
                          name={instructor.name}
                          src={instructor.avatarUrl}
                          mr={1}
                        />
                        <Text fontSize="sm">{instructor.name}</Text>
                      </Flex>
                    ))}
                  </Flex>
                </Box>

                {/* Right side - Progress bar */}
                <Box flex="0.8" ml={6} mr={10} mb={10}>
                  {/* Session count */}
                  <Flex alignItems="center" mb={2}>
                    <Text fontSize="2xl" fontWeight="bold" mr={2}>
                      13
                    </Text>
                    <Text fontSize="sm" color="gray.600">
                      Sessions
                    </Text>
                  </Flex>

                  {/* Progress percentages */}
                  <Flex justifyContent="space-between" mb={1} width="100%">
                    <Text fontSize="xs" color="gray.600">
                      30%
                    </Text>
                    <Text fontSize="xs" color="gray.600">
                      15%
                    </Text>
                    <Text fontSize="xs" color="gray.600">
                      30%
                    </Text>
                    <Text fontSize="xs" color="gray.600">
                      25%
                    </Text>
                  </Flex>

                  {/* Session progress bar */}
                  <Box position="relative" mb={2}>
                    <Progress
                      value={100}
                      size="sm"
                      bg="gray.200"
                      borderRadius="full"
                      h="8px"
                    />
                    <Flex
                      position="absolute"
                      top="0"
                      left="0"
                      height="100%"
                      width="100%"
                    >
                      <Box
                        width={`${course.distribution.passed}%`}
                        bg="green.600"
                        borderLeftRadius="full"
                      />
                      <Box
                        width={`${course.distribution.inProgress}%`}
                        bg="blue.500"
                      />
                      <Box
                        width={`${course.distribution.failed}%`}
                        bg="red.500"
                      />
                      <Box
                        width={`${course.distribution.notStarted}%`}
                        bg="gray.400"
                        borderRightRadius="full"
                      />
                    </Flex>
                  </Box>

                  {/* Legend */}
                  <Flex
                    width="100%"
                    justifyContent="space-between"
                    fontSize="xs"
                    color="gray.600"
                  >
                    <Flex alignItems="center">
                      <Box
                        as="span"
                        w="2"
                        h="2"
                        borderRadius="full"
                        bg="green.600"
                        display="inline-block"
                        mr="1"
                      />
                      <Text>Passed</Text>
                    </Flex>
                    <Flex alignItems="center">
                      <Box
                        as="span"
                        w="2"
                        h="2"
                        borderRadius="full"
                        bg="blue.500"
                        display="inline-block"
                        mr="1"
                      />
                      <Text>In Progress</Text>
                    </Flex>
                    <Flex alignItems="center">
                      <Box
                        as="span"
                        w="2"
                        h="2"
                        borderRadius="full"
                        bg="red.500"
                        display="inline-block"
                        mr="1"
                      />
                      <Text>Failed</Text>
                    </Flex>
                    <Flex alignItems="center">
                      <Box
                        as="span"
                        w="2"
                        h="2"
                        borderRadius="full"
                        bg="gray.400"
                        display="inline-block"
                        mr="1"
                      />
                      <Text>Up Coming</Text>
                    </Flex>
                  </Flex>
                </Box>
              </Flex>

              {/* Tabs for course navigation */}
              <Box borderBottomWidth="1px" borderBottomColor="gray.200">
                <Tabs
                  index={activeTab}
                  onChange={handleTabChange}
                  variant="unstyled"
                >
                  <TabList>
                    <Tab
                      _selected={{
                        color: "blue.500",
                        borderBottomWidth: "3px",
                        borderBottomColor: "blue.500",
                      }}
                      fontWeight="medium"
                      px={4}
                      py={3}
                    >
                      <Box as="span" mr={2}>
                        <Box as="span" fontSize="md">
                          📄
                        </Box>
                      </Box>
                      Session
                    </Tab>
                    <Tab
                      _selected={{
                        color: "blue.500",
                        borderBottomWidth: "3px",
                        borderBottomColor: "blue.500",
                      }}
                      fontWeight="medium"
                      px={4}
                      py={3}
                    >
                      <Box as="span" mr={2}>
                        <Box as="span" fontSize="md">
                          📘
                        </Box>
                      </Box>
                      Syllabus
                    </Tab>
                    <Tab
                      _selected={{
                        color: "blue.500",
                        borderBottomWidth: "3px",
                        borderBottomColor: "blue.500",
                      }}
                      fontWeight="medium"
                      px={4}
                      py={3}
                    >
                      <Box as="span" mr={2}>
                        <Box as="span" fontSize="md">
                          💬
                        </Box>
                      </Box>
                      Forum
                    </Tab>
                    <Tab
                      _selected={{
                        color: "blue.500",
                        borderBottomWidth: "3px",
                        borderBottomColor: "blue.500",
                      }}
                      fontWeight="medium"
                      px={4}
                      py={3}
                    >
                      <Box as="span" mr={2}>
                        <Box as="span" fontSize="md">
                          📝
                        </Box>
                      </Box>
                      Assessment
                    </Tab>
                    <Tab
                      _selected={{
                        color: "blue.500",
                        borderBottomWidth: "3px",
                        borderBottomColor: "blue.500",
                      }}
                      fontWeight="medium"
                      px={4}
                      py={3}
                    >
                      <Box as="span" mr={2}>
                        <Box as="span" fontSize="md">
                          📝
                        </Box>
                      </Box>
                      Exam
                    </Tab>
                    <Tab
                      _selected={{
                        color: "blue.500",
                        borderBottomWidth: "3px",
                        borderBottomColor: "blue.500",
                      }}
                      fontWeight="medium"
                      px={4}
                      py={3}
                    >
                      <Box as="span" mr={2}>
                        <Box as="span" fontSize="md">
                          📊
                        </Box>
                      </Box>
                      Gradebook
                    </Tab>
                    <Tab
                      _selected={{
                        color: "blue.500",
                        borderBottomWidth: "3px",
                        borderBottomColor: "blue.500",
                      }}
                      fontWeight="medium"
                      px={4}
                      py={3}
                    >
                      <Box as="span" mr={2}>
                        <Box as="span" fontSize="md">
                          📋
                        </Box>
                      </Box>
                      Assessment Rubric
                    </Tab>
                    <Tab
                      _selected={{
                        color: "blue.500",
                        borderBottomWidth: "3px",
                        borderBottomColor: "blue.500",
                      }}
                      fontWeight="medium"
                      px={4}
                      py={3}
                    >
                      <Box as="span" mr={2}>
                        <Box as="span" fontSize="md">
                          👥
                        </Box>
                      </Box>
                      People
                    </Tab>
                    <Tab
                      _selected={{
                        color: "blue.500",
                        borderBottomWidth: "3px",
                        borderBottomColor: "blue.500",
                      }}
                      fontWeight="medium"
                      px={4}
                      py={3}
                    >
                      <Box as="span" mr={2}>
                        <Box as="span" fontSize="md">
                          📅
                        </Box>
                      </Box>
                      Attendance
                    </Tab>
                  </TabList>
                </Tabs>
              </Box>
            </Box>
          </Box>

          {/* Assessment Rubric Content */}
          <Box p={6}>
            {/* Rubric Table */}
            <Box>
              <Table
                variant="simple"
                bg="white"
                size="md"
                borderWidth="1px"
                borderColor="gray.200"
              >
                <Thead borderBottomWidth="1px" borderBottomColor="gray.200">
                  <Tr>
                    <Th
                      width="25%"
                      py={4}
                      px={4}
                      borderRightWidth="1px"
                      borderRightColor="gray.200"
                    >
                      Learning Outcomes
                    </Th>
                    <Th
                      width="25%"
                      py={4}
                      px={4}
                      borderRightWidth="1px"
                      borderRightColor="gray.200"
                    >
                      Key Indicator
                    </Th>
                    <Th colSpan={4} textAlign="center" py={4} px={0}>
                      <Text fontSize="md" fontWeight="medium">
                        Proficiency Level
                      </Text>
                    </Th>
                  </Tr>
                  <Tr>
                    <Th
                      width="25%"
                      py={3}
                      px={4}
                      borderRightWidth="1px"
                      borderRightColor="gray.200"
                      borderBottomWidth="1px"
                      borderBottomColor="gray.200"
                    ></Th>
                    <Th
                      width="25%"
                      py={3}
                      px={4}
                      borderRightWidth="1px"
                      borderRightColor="gray.200"
                      borderBottomWidth="1px"
                      borderBottomColor="gray.200"
                    ></Th>
                    <Th
                      width="12.5%"
                      py={3}
                      px={2}
                      borderRightWidth="1px"
                      borderRightColor="gray.200"
                      borderBottomWidth="1px"
                      borderBottomColor="gray.200"
                      textAlign="center"
                    >
                      <Text fontSize="sm" fontWeight="medium">
                        Excellent
                      </Text>
                      <Text fontSize="xs" color="gray.500">
                        (85-100)
                      </Text>
                    </Th>
                    <Th
                      width="12.5%"
                      py={3}
                      px={2}
                      borderRightWidth="1px"
                      borderRightColor="gray.200"
                      borderBottomWidth="1px"
                      borderBottomColor="gray.200"
                      textAlign="center"
                    >
                      <Text fontSize="sm" fontWeight="medium">
                        Good
                      </Text>
                      <Text fontSize="xs" color="gray.500">
                        (70-84)
                      </Text>
                    </Th>
                    <Th
                      width="12.5%"
                      py={3}
                      px={2}
                      borderRightWidth="1px"
                      borderRightColor="gray.200"
                      borderBottomWidth="1px"
                      borderBottomColor="gray.200"
                      textAlign="center"
                    >
                      <Text fontSize="sm" fontWeight="medium">
                        Average
                      </Text>
                      <Text fontSize="xs" color="gray.500">
                        (60-69)
                      </Text>
                    </Th>
                    <Th
                      width="12.5%"
                      py={3}
                      px={2}
                      textAlign="center"
                      borderBottomWidth="1px"
                      borderBottomColor="gray.200"
                    >
                      <Text fontSize="sm" fontWeight="medium">
                        Poor
                      </Text>
                      <Text fontSize="xs" color="gray.500">
                        (0-59)
                      </Text>
                    </Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {/* LO1 Criteria */}
                  <Tr>
                    <Td
                      rowSpan={2}
                      py={4}
                      px={4}
                      borderRightWidth="1px"
                      borderRightColor="gray.200"
                      verticalAlign="top"
                    >
                      <Text fontWeight="medium">
                        LO1: Identify the foundation of AIS Concepts
                      </Text>
                    </Td>
                    <Td
                      py={4}
                      px={4}
                      borderRightWidth="1px"
                      borderRightColor="gray.200"
                    >
                      <Text>
                        Students can define basic terms related to accounting
                        information systems
                      </Text>
                    </Td>
                    <Td
                      fontSize="sm"
                      py={4}
                      px={2}
                      borderRightWidth="1px"
                      borderRightColor="gray.200"
                    >
                      Students can define more than 5 basic terms related to
                      accounting information systems
                    </Td>
                    <Td
                      fontSize="sm"
                      py={4}
                      px={2}
                      borderRightWidth="1px"
                      borderRightColor="gray.200"
                    >
                      Students can define 3 to 5 basic terms related to
                      accounting information systems
                    </Td>
                    <Td
                      fontSize="sm"
                      py={4}
                      px={2}
                      borderRightWidth="1px"
                      borderRightColor="gray.200"
                    >
                      Students can define 1 to 2 basic things related to
                      accounting information systems
                    </Td>
                    <Td fontSize="sm" py={4} px={2}>
                      Students cannot clearly define things related to
                      accounting information systems
                    </Td>
                  </Tr>
                  <Tr>
                    <Td
                      py={4}
                      px={4}
                      borderRightWidth="1px"
                      borderRightColor="gray.200"
                      borderTopWidth="1px"
                      borderTopColor="gray.200"
                    >
                      <Text>
                        Students can list basic things related to system
                        controls
                      </Text>
                    </Td>
                    <Td
                      fontSize="sm"
                      py={4}
                      px={2}
                      borderRightWidth="1px"
                      borderRightColor="gray.200"
                      borderTopWidth="1px"
                      borderTopColor="gray.200"
                    >
                      Students can list more than 5 things related to accounting
                      information systems
                    </Td>
                    <Td
                      fontSize="sm"
                      py={4}
                      px={2}
                      borderRightWidth="1px"
                      borderRightColor="gray.200"
                      borderTopWidth="1px"
                      borderTopColor="gray.200"
                    >
                      Students can list 3 to 5 basic things related to
                      information systems
                    </Td>
                    <Td
                      fontSize="sm"
                      py={4}
                      px={2}
                      borderRightWidth="1px"
                      borderRightColor="gray.200"
                      borderTopWidth="1px"
                      borderTopColor="gray.200"
                    >
                      Students can list only 1 to 2 basic things related to
                      accounting information systems
                    </Td>
                    <Td
                      fontSize="sm"
                      py={4}
                      px={2}
                      borderTopWidth="1px"
                      borderTopColor="gray.200"
                    >
                      Students cannot list accounting information systems
                    </Td>
                  </Tr>

                  {/* LO2 Criteria */}
                  <Tr>
                    <Td
                      rowSpan={2}
                      py={4}
                      px={4}
                      borderRightWidth="1px"
                      borderRightColor="gray.200"
                      verticalAlign="top"
                      borderTopWidth="1px"
                      borderTopColor="gray.200"
                    >
                      <Text fontWeight="medium">
                        LO2: Explain the controls in AIS Concepts
                      </Text>
                    </Td>
                    <Td
                      py={4}
                      px={4}
                      borderRightWidth="1px"
                      borderRightColor="gray.200"
                      borderTopWidth="1px"
                      borderTopColor="gray.200"
                    >
                      <Text>
                        Students can explain basic things related to accounting
                        information systems
                      </Text>
                    </Td>
                    <Td
                      fontSize="sm"
                      py={4}
                      px={2}
                      borderRightWidth="1px"
                      borderRightColor="gray.200"
                      borderTopWidth="1px"
                      borderTopColor="gray.200"
                    >
                      Students can explain more than 5 basic things related to
                      accounting information systems
                    </Td>
                    <Td
                      fontSize="sm"
                      py={4}
                      px={2}
                      borderRightWidth="1px"
                      borderRightColor="gray.200"
                      borderTopWidth="1px"
                      borderTopColor="gray.200"
                    >
                      Students can explain between 3 to 5 things related to
                      accounting information systems
                    </Td>
                    <Td
                      fontSize="sm"
                      py={4}
                      px={2}
                      borderRightWidth="1px"
                      borderRightColor="gray.200"
                      borderTopWidth="1px"
                      borderTopColor="gray.200"
                    >
                      Students can explain 1 to 2 basic things related to
                      accounting information systems
                    </Td>
                    <Td
                      fontSize="sm"
                      py={4}
                      px={2}
                      borderTopWidth="1px"
                      borderTopColor="gray.200"
                    >
                      Students cannot explain basic things related to accounting
                      information systems
                    </Td>
                  </Tr>
                  <Tr>
                    <Td
                      py={4}
                      px={4}
                      borderRightWidth="1px"
                      borderRightColor="gray.200"
                      borderTopWidth="1px"
                      borderTopColor="gray.200"
                    >
                      <Text>
                        Students can show and tell something related to
                        accounting information systems
                      </Text>
                    </Td>
                    <Td
                      fontSize="sm"
                      py={4}
                      px={2}
                      borderRightWidth="1px"
                      borderRightColor="gray.200"
                      borderTopWidth="1px"
                      borderTopColor="gray.200"
                    >
                      Students can show and tell more than 5 basic things
                      related to accounting information systems
                    </Td>
                    <Td
                      fontSize="sm"
                      py={4}
                      px={2}
                      borderRightWidth="1px"
                      borderRightColor="gray.200"
                      borderTopWidth="1px"
                      borderTopColor="gray.200"
                    >
                      Students can show and tell between 3 to 5 basic things
                      related to accounting information systems
                    </Td>
                    <Td
                      fontSize="sm"
                      py={4}
                      px={2}
                      borderRightWidth="1px"
                      borderRightColor="gray.200"
                      borderTopWidth="1px"
                      borderTopColor="gray.200"
                    >
                      Students can show and tell 1 to 2 things related to
                      accounting information systems
                    </Td>
                    <Td
                      fontSize="sm"
                      py={4}
                      px={2}
                      borderTopWidth="1px"
                      borderTopColor="gray.200"
                    >
                      Students cannot show and tell things related to accounting
                      information systems
                    </Td>
                  </Tr>
                </Tbody>
              </Table>
            </Box>
          </Box>
        </Box>
      </Flex>
    </Box>
  );
};

export default AssessmentRubric;
