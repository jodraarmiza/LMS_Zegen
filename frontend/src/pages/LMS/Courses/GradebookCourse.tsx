import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Flex,
  Text,
  Heading,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { MdArrowDropDownCircle, MdArrowBack } from "react-icons/md";
import { BsFillJournalBookmarkFill } from "react-icons/bs";
import { Link as ChakraLink } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

// Define interfaces for type safety
interface Instructor {
  id: string;
  name: string;
  avatarUrl: string;
}

interface CourseSession {
  total: number;
  completed: number;
  lastUpdated: string;
}

interface Course {
  id: string;
  code: string;
  title: string;
  category: string;
  progress: number;
  session: CourseSession;
  instructors: Instructor[];
  participants?: Instructor[];
  currentGrade?: string;
  overallScore?: number;
  lastUpdated?: string;
}

interface Assessment {
  title: string;
  weight: number;
  score: number;
  lastUpdated: string;
}

const IconArrowDropDownCircle = MdArrowDropDownCircle as React.FC;
const IconArrowBack = MdArrowBack as React.FC;
const IconBook1 = BsFillJournalBookmarkFill as React.FC;

const GradebookCourse: React.FC = () => {
  const navigate = useNavigate();
  const { courseId } = useParams();

  // State for semester dropdown
  const [selectedSemester, setSelectedSemester] =
    useState("2025 Even Semester");
  const semesters = [
    "2025 Even Semester",
    "2024 Odd Semester",
    "2024 Even Semester",
    "2023 Odd Semester",
  ];

  // State for sidebar collapse
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Course details (would come from API or be passed from the previous screen)
  // This matches the structure from GradebookGeneral component
  const allCourses = [
    {
      id: "1",
      code: "LB2123",
      title: "IT Service & Risk Management",
      category: "IT",
      progress: 65,
      session: {
        total: 12,
        completed: 8,
        lastUpdated: "2d ago",
      },
      instructors: [
        {
          id: "101",
          name: "Devon Lane",
          avatarUrl: "https://placehold.co/32x32?text=DL",
        },
      ],
      participants: [
        {
          id: "201",
          name: "Jacob Jones",
          avatarUrl: "https://placehold.co/32x32?text=JJ",
        },
      ],
      currentGrade: "A-",
      overallScore: 87.5,
      lastUpdated: "March 19, 2025",
    },
    {
      id: "2",
      code: "LB2123",
      title: "Digital Banking",
      category: "Banking",
      progress: 45,
      session: {
        total: 15,
        completed: 7,
        lastUpdated: "3d ago",
      },
      instructors: [
        {
          id: "102",
          name: "Wade Warren",
          avatarUrl: "https://placehold.co/32x32?text=WW",
        },
        {
          id: "103",
          name: "Jane Cooper",
          avatarUrl: "https://placehold.co/32x32?text=JC",
        },
      ],
      currentGrade: "B+",
      overallScore: 78.2,
      lastUpdated: "March 17, 2025",
    },
    {
      id: "3",
      code: "LB2123",
      title: "User Experience Research & Design",
      category: "Design",
      progress: 75,
      session: {
        total: 20,
        completed: 15,
        lastUpdated: "5d ago",
      },
      instructors: [
        {
          id: "104",
          name: "Jane Cooper",
          avatarUrl: "https://placehold.co/32x32?text=JC",
        },
      ],
      participants: [
        {
          id: "202",
          name: "Esther Howard",
          avatarUrl: "https://placehold.co/32x32?text=EH",
        },
        {
          id: "203",
          name: "Robert Fox",
          avatarUrl: "https://placehold.co/32x32?text=RF",
        },
      ],
      currentGrade: "A",
      overallScore: 92.5,
      lastUpdated: "March 15, 2025",
    },
  ];

  // Find the current course based on the courseId from URL params
  const [currentCourse, setCurrentCourse] = useState(allCourses[0]);

  useEffect(() => {
    // In a real app, this would fetch course data from an API
    const course = allCourses.find((c) => c.id === courseId) || allCourses[0];
    setCurrentCourse(course);
  }, [courseId]);

  // Assessments data
  const assessments: Assessment[] = [
    {
      title: "Theory: Assignment",
      weight: 30,
      score: 90,
      lastUpdated: "34-min-yy 13:01hrs",
    },
    {
      title: "Theory: Mid Exam",
      weight: 35,
      score: 90,
      lastUpdated: "34-min-yy 15:48hrs",
    },
    {
      title: "Theory: Final Exam",
      weight: 35,
      score: 50,
      lastUpdated: "34-min-yy 13:33hrs",
    },
  ];

  const handleBackClick = () => {
    navigate("/gradebook");
  };

  return (
    <>
      {/* Main content with Sidebar */}
      <Flex>
        {/* Content wrapper - takes full width after sidebar */}
        <Box flex="1" position="relative" overflowX="hidden">
          {/* Main gradebook content - fill all available space */}
          <Box p={6} w="100%" overflowY="auto" maxH="calc(100vh - 57px)">
            {/* Header with title, back button and semester selector */}
            <Flex
              justifyContent="space-between"
              mb={6}
              w="100%"
              alignItems="center"
              flexWrap="wrap"
            >
              {/* <Box p={2}>
                <Flex alignItems="center" mb={2}>
                  <IconButton
                    aria-label="Back"
                    icon={<IconArrowBack />}
                    variant="ghost"
                    mr={2}
                    onClick={handleBackClick}
                  />
                  <Text fontSize="sm" color="gray.500">
                    Gradebook &gt; {currentCourse.title}
                  </Text>
                </Flex>
                <Heading as="h1" size="lg" fontWeight="semibold" mb={6}>
                  My Grades
                </Heading>
              </Box> */}
              <Box>
                {/* Breadcrumb section */}
                <Text fontSize="sm" color="gray.500" mb={8}>
                  <ChakraLink
                    as={RouterLink}
                    to="/gradebook"
                    color="gray.500"
                    _hover={{ textDecoration: "underline" }}
                  >
                    Gradebook
                  </ChakraLink>
                  {" > "}
                  {currentCourse.title}
                </Text>

                {/* Title with back button */}
                <Flex alignItems="center" mb={4}>
                  <IconButton
                    aria-label="Back"
                    icon={<IconArrowBack />}
                    variant="ghost"
                    mr={2}
                    onClick={handleBackClick}
                  />
                  <Heading as="h1" size="md" fontWeight="semibold">
                    {currentCourse.title}
                  </Heading>
                </Flex>
              </Box>

              {/* Dropdown menu at right */}
              <Box ml="auto" p={6}>
                <Menu>
                  <MenuButton
                    as={Box}
                    border="1px"
                    borderColor="gray.200"
                    borderRadius="md"
                    p={2}
                    bg="white"
                    width={{ base: "100%", md: "220px" }}
                    display="flex"
                    alignItems="center"
                    cursor="pointer"
                    position="relative"
                  >
                    <Text>{selectedSemester}</Text>
                    <Box
                      position="absolute"
                      right="8px"
                      top="50%"
                      transform="translateY(-50%)"
                      ml="auto"
                    >
                      <IconButton
                        aria-label="Dropdown"
                        icon={<IconArrowDropDownCircle />}
                        variant="unstyled"
                        color="blue.500"
                        fontSize="xl"
                        padding={0}
                        minW="auto"
                        h="auto"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                      />
                    </Box>
                  </MenuButton>
                  <MenuList zIndex={10}>
                    {semesters.map((semester, index) => (
                      <MenuItem
                        key={index}
                        onClick={() => setSelectedSemester(semester)}
                      >
                        {semester}
                      </MenuItem>
                    ))}
                  </MenuList>
                </Menu>
              </Box>
            </Flex>

            {/* Grade summary box */}
            {/* Course header info
            <Box
              bg="white"
              borderRadius="lg"
              p={4}
              mb={6}
              width="100%"
              borderWidth="1px"
              borderColor="gray.200"
              boxShadow="sm"
            >
              <Flex mb={3} justify="space-between">
                <Flex align="center">
                  <Box
                    bg="blue.500"
                    color="white"
                    h="30px"
                    w="30px"
                    borderRadius="md"
                    fontSize="xl"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    mr={2}
                  >
                    <IconBook1 />
                  </Box>
                  <Text fontSize="md" mr={2}>
                    Course
                  </Text>
                  <Text fontSize="xs" color="gray.500">
                    {currentCourse.code}
                  </Text>
                </Flex>

                <Flex>
                  <AvatarGroup size="sm" max={3} spacing="-0.75rem">
                    {currentCourse.instructors?.map((instructor) => (
                      <Avatar
                        key={instructor.id}
                        name={instructor.name}
                        src={instructor.avatarUrl}
                      />
                    ))}
                    {currentCourse.participants?.map((participant) => (
                      <Avatar
                        key={participant.id}
                        name={participant.name}
                        src={participant.avatarUrl}
                      />
                    ))}
                  </AvatarGroup>
                </Flex>
              </Flex>

              <Text fontWeight="medium" mb={3}>
                {currentCourse.title}
              </Text>
            </Box> */}

            {/* Grade summary box */}
            <Box bg="#E2E8F0" borderRadius="lg" p={4} mb={6} width="100%">
              <Flex
                justifyContent="space-between"
                alignItems="center"
                flexWrap={{ base: "wrap", md: "nowrap" }}
              >
                <Box flex="1" p={2} textAlign="center">
                  <Text fontWeight="bold" fontSize="2xl">
                    {currentCourse.currentGrade || "N/A"}
                  </Text>
                  <Text color="gray.600">Current Grade</Text>
                </Box>

                <Box flex="1" p={2} textAlign="center">
                  <Text fontWeight="bold" fontSize="2xl">
                    {currentCourse.overallScore
                      ? `${currentCourse.overallScore}%`
                      : "N/A"}
                  </Text>
                  <Text color="gray.600">Overall Score</Text>
                </Box>

                <Box flex="1" p={2} textAlign="center">
                  <Text fontWeight="medium">Last Updated</Text>
                  <Text color="gray.600">
                    {currentCourse.lastUpdated || "N/A"}
                  </Text>
                </Box>
              </Flex>
            </Box>

            {/* Assessment List */}
            <Box>
              {assessments.map((assessment, index) => (
                <Flex
                  key={index}
                  mb={4}
                  alignItems="center"
                  flexWrap={{ base: "wrap", md: "nowrap" }}
                  bg="white"
                  p={4}
                  borderRadius="md"
                  boxShadow="sm"
                  justifyContent="space-between"
                >
                  <Box flex="2">
                    <Text fontWeight="medium">{assessment.title}</Text>
                    <Text fontSize="sm" color="gray.500">
                      Last Updated: {assessment.lastUpdated}
                    </Text>
                  </Box>

                  <Flex
                    alignItems="center"
                    justifyContent="flex-end"
                    flex="1"
                    gap={3}
                  >
                    <Box
                      bg="gray.200"
                      borderRadius="full"
                      px={3}
                      py={1}
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <Text fontSize="sm">{assessment.weight}%</Text>
                    </Box>

                    <Text fontWeight="bold">{assessment.score}</Text>
                  </Flex>
                </Flex>
              ))}
            </Box>
          </Box>
        </Box>
      </Flex>
    </>
  );
};

export default GradebookCourse;
