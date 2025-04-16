import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Flex,
  Text,
  Heading,
  VStack,
  Button,
  useColorMode,
  Avatar,
  AvatarGroup,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  CircularProgress,
  IconButton,
  HStack,
  Badge,
  Divider,
  ButtonGroup
} from "@chakra-ui/react";
import { MdArrowDropDownCircle } from "react-icons/md";
import { BsFillJournalBookmarkFill } from "react-icons/bs";
import { FaClipboardList } from "react-icons/fa";
import { TimeIcon } from "@chakra-ui/icons";

// Define interfaces for type safety
interface Instructor {
  id: string;
  name: string;
  avatarUrl: string;
}

interface AssignmentItem {
  id: string;
  title: string;
  status: "submitted" | "overdue" | "upcoming";
  dueDate?: string; // Added dueDate
}

interface AssessmentInfo {
  total: number;
  completed: number;
  lastUpdated: string;
  assignments: AssignmentItem[];
}


interface Course {
  id: string;
  code: string;
  title: string;
  category: string;
  progress: number;
  assessment: AssessmentInfo;
  instructors: Instructor[];
  participants?: Instructor[];
}

const IconBook1 = BsFillJournalBookmarkFill as React.FC;
const IconArrowDropDownCircle = MdArrowDropDownCircle as React.FC;
const IconAssessment = FaClipboardList as React.FC;

// Component to display assignment status badges
const AssignmentStatusBadge = ({ status }: { status: AssignmentItem["status"] }) => {
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

const AssessmentsGeneral: React.FC = () => {
  const navigate = useNavigate();
  const { colorMode } = useColorMode();

  // State for search query
  const [searchQuery, setSearchQuery] = useState("");

  // State for semester dropdown
  const [selectedSemester, setSelectedSemester] = useState("2025 Even Semester");
  const semesters = [
    "2025 Even Semester",
    "2024 Odd Semester",
    "2024 Even Semester",
    "2023 Odd Semester",
  ];

  // Courses data with assessments
  const allCourses: Course[] = [
    {
      id: "1",
      code: "LE7323",
      title: "IT Service & Risk Management",
      category: "IT",
      progress: 65,
      assessment: {
        total: 3,
        completed: 2,
        lastUpdated: "2d ago",
        assignments: [
          {
            id: "a1",
            title: "Session 2 PILGAN IT Governance",
            status: "submitted",
            dueDate: "10 March 2025, 23:59hrs"
          },
          {
            id: "a2",
            title: "Session 4 Paper on Auditing Information Technology Based",
            status: "overdue",
            dueDate: "10 March 2025, 23:59hrs"
          },
          {
            id: "a3",
            title: "Session 5 Case Study on E-Commerce & E-Business",
            status: "upcoming",
            dueDate: "11 April 2025, 23:59hrs"
          },
        ],
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
    },
    {
      id: "2",
      code: "LE7323",
      title: "Digital Banking",
      category: "Banking",
      progress: 45,
      assessment: {
        total: 4,
        completed: 2,
        lastUpdated: "3d ago",
        assignments: [
          {
            id: "b1",
            title: "Session 2 PILGAN IT Governance",
            status: "submitted",
            dueDate: "5 March 2025, 23:59hrs"
          },
          {
            id: "b2",
            title: "Session 4 Paper on Auditing Information Technology Based",
            status: "submitted",
            dueDate: "12 March 2025, 23:59hrs"
          },
          {
            id: "b3",
            title: "Session 5 Case Study on E-Commerce & E-Business",
            status: "overdue",
            dueDate: "1 April 2025, 23:59hrs"
          },
          {
            id: "b4",
            title: "Final Digital Banking Project",
            status: "upcoming",
            dueDate: "20 April 2025, 23:59hrs"
          },
        ],
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
    },
    {
      id: "3",
      code: "LE7323",
      title: "User Experience Research & Design",
      category: "Design",
      progress: 75,
      assessment: {
        total: 4,
        completed: 3,
        lastUpdated: "5d ago",
        assignments: [
          {
            id: "c1",
            title: "Session 2 PILGAN IT Governance",
            status: "submitted",
            dueDate: "25 February 2025, 23:59hrs"
          },
          {
            id: "c2",
            title: "Session 4 Paper on Auditing Information Technology Based",
            status: "submitted",
            dueDate: "10 March 2025, 23:59hrs"
          },
          {
            id: "c3",
            title: "Session 5 Case Study on E-Commerce & E-Business",
            status: "submitted",
            dueDate: "25 March 2025, 23:59hrs"
          },
          {
            id: "c4",
            title: "Final UX Prototype",
            status: "upcoming",
            dueDate: "15 April 2025, 23:59hrs"
          },
        ],
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
    },
    {
      id: "4",
      code: "LE7323",
      title: "Introduction to Database System",
      category: "IT",
      progress: 30,
      assessment: {
        total: 3,
        completed: 1,
        lastUpdated: "6d ago",
        assignments: [
          {
            id: "d1",
            title: "Session 2 PILGAN IT Governance",
            status: "submitted",
            dueDate: "10 March 2025, 23:59hrs"
          },
          {
            id: "d2",
            title: "Session 4 Paper on Auditing Information Technology Based",
            status: "overdue",
            dueDate: "10 March 2025, 23:59hrs"
          },
          {
            id: "d3",
            title: "Session 5 Case Study on E-Commerce & E-Business",
            status: "upcoming",
            dueDate: "11 April 2025, 23:59hrs"
          },
        ],
      },
      instructors: [
        {
          id: "105",
          name: "Cody Fisher",
          avatarUrl: "https://placehold.co/32x32?text=CF",
        },
      ],
      participants: [
        {
          id: "204",
          name: "Leslie Alexander",
          avatarUrl: "https://placehold.co/32x32?text=LA",
        },
        {
          id: "205",
          name: "Dianne Russell",
          avatarUrl: "https://placehold.co/32x32?text=DR",
        },
        {
          id: "206",
          name: "Jacob Jones",
          avatarUrl: "https://placehold.co/32x32?text=JJ",
        },
      ],
    },
  ];

  // State for filtered courses
  const [filteredCourses, setFilteredCourses] = useState<Course[]>(allCourses);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<
    "all" | "submitted" | "overdue" | "upcoming"
  >("all");

  const [filteredAssignments, setFilteredAssignments] = useState<
    (AssignmentItem & { courseId: string; courseTitle: string })[]
  >([]);

  // Filter courses based on selected filter and search query
  useEffect(() => {
    // Create a copy of courses that we can filter
    let filteredCourseList = [...allCourses];
    
    if (selectedFilter !== "all") {
      // Filter courses that have at least one assignment with the selected status
      filteredCourseList = filteredCourseList.filter(course => 
        course.assessment.assignments.some(assignment => 
          assignment.status === selectedFilter
        )
      );
    }
    
    // Apply search filter if there is a search query
    if (searchQuery.trim()) {
      const lowerCaseQuery = searchQuery.toLowerCase();
      filteredCourseList = filteredCourseList.filter(
        course =>
          course.title.toLowerCase().includes(lowerCaseQuery) ||
          course.code.toLowerCase().includes(lowerCaseQuery) ||
          course.assessment.assignments.some(assignment => 
            assignment.title.toLowerCase().includes(lowerCaseQuery)
          )
      );
    }
    
    setFilteredCourses(filteredCourseList);
    
    // Filter assignments separately for potential assignment view
    const allAssignments = allCourses.flatMap(course =>
      course.assessment.assignments.map(assignment => ({
        ...assignment,
        courseId: course.id,
        courseTitle: course.title,
      }))
    );
    
    // Filter assignments based on status
    let filteredAssignmentList = allAssignments;
    
    if (selectedFilter !== "all") {
      filteredAssignmentList = filteredAssignmentList.filter(
        assignment => assignment.status === selectedFilter
      );
    }
    
    // Apply search filter to assignments
    if (searchQuery.trim()) {
      const lowerCaseQuery = searchQuery.toLowerCase();
      filteredAssignmentList = filteredAssignmentList.filter(
        assignment =>
          assignment.title.toLowerCase().includes(lowerCaseQuery) ||
          assignment.courseTitle.toLowerCase().includes(lowerCaseQuery)
      );
    }
    
    setFilteredAssignments(filteredAssignmentList);
  }, [searchQuery, selectedFilter, allCourses]);

  // Function to handle course card click - navigates to assessment detail
  const handleCourseClick = (courseId: string) => {
    navigate(`/assessment/${courseId}`);
  };

  // Function to handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Function to connect to the global search in navbar
  useEffect(() => {
    const handleGlobalSearch = (event: Event) => {
      const customEvent = event as CustomEvent;
      if (customEvent.detail && customEvent.detail.query) {
        setSearchQuery(customEvent.detail.query);
      }
    };

    // Listen for global search events
    window.addEventListener("globalSearch", handleGlobalSearch);

    return () => {
      window.removeEventListener("globalSearch", handleGlobalSearch);
    };
  }, []);

  // Get assignment status counts for a course
  const getAssignmentStatusCounts = (course: Course) => {
    const counts = {
      submitted: 0,
      overdue: 0,
      upcoming: 0
    };
    
    course.assessment.assignments.forEach(assignment => {
      counts[assignment.status]++;
    });
    
    return counts;
  };

  return (
    <>
      {/* Main content with Sidebar */}
      <Flex>
        {/* Content wrapper - takes full width after sidebar */}
        <Box flex="1" position="relative" overflowX="hidden">
          {/* Main courses list - fill all available space */}
          <Box p={6} w="100%" overflowY="auto" maxH="calc(100vh - 57px)">
            {/* Header with title, semester and search */}
            <Flex
              justify="space-between"
              align="center"
              flexWrap="wrap"
              gap={4}
              px={6}
              mb={6}
            >
              {/* Dropdown semester di kiri */}
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
            </Flex>

            {/* Fixed filter buttons at top */}
            <Flex justify="flex-end" mb={4} pb={2} px={6} borderBottom="1px solid" borderColor="gray.100">
              <ButtonGroup size="md" isAttached variant="outline" borderRadius="md" overflow="hidden">
                <Button
                  py={2}
                  px={6}
                  bg={selectedFilter === "all" ? "blue.500" : "white"}
                  color={selectedFilter === "all" ? "white" : "gray.700"}
                  _hover={{ bg: selectedFilter === "all" ? "blue.600" : "gray.100" }}
                  onClick={() => setSelectedFilter("all")}
                  borderRadius="md" 
                  borderRightRadius={0}
                >
                  All
                </Button>
                <Button
                  py={2}
                  px={6}
                  bg={selectedFilter === "submitted" ? "blue.500" : "white"}
                  color={selectedFilter === "submitted" ? "white" : "gray.700"}
                  _hover={{ bg: selectedFilter === "submitted" ? "blue.600" : "gray.100" }}
                  onClick={() => setSelectedFilter("submitted")}
                  borderRadius="0"
                >
                  Submitted
                </Button>
                <Button
                  py={2}
                  px={6}
                  bg={selectedFilter === "upcoming" ? "blue.500" : "white"}
                  color={selectedFilter === "upcoming" ? "white" : "gray.700"}
                  _hover={{ bg: selectedFilter === "upcoming" ? "blue.600" : "gray.100" }}
                  onClick={() => setSelectedFilter("upcoming")}
                  borderRadius="0"
                >
                  Upcoming
                </Button>
                <Button
                  py={2}
                  px={6}
                  bg={selectedFilter === "overdue" ? "blue.500" : "white"}
                  color={selectedFilter === "overdue" ? "white" : "gray.700"}
                  _hover={{ bg: selectedFilter === "overdue" ? "blue.600" : "gray.100" }}
                  onClick={() => setSelectedFilter("overdue")}
                  borderRadius="md"
                  borderLeftRadius={0}
                >
                  Overdue
                </Button>
              </ButtonGroup>
            </Flex>

            {/* No results message */}
            {filteredCourses.length === 0 && (
              <Box
                textAlign="center"
                py={10}
                bg="white"
                borderRadius="lg"
                borderWidth="1px"
                borderColor="gray.200"
              >
                <Text fontSize="lg" color="gray.600">
                  No courses found with {selectedFilter !== "all" ? selectedFilter : ""} assignments
                  {searchQuery ? ` matching "${searchQuery}"` : ""}
                </Text>
                <Button
                  mt={4}
                  colorScheme="blue"
                  size="sm"
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedFilter("all");
                  }}
                >
                  Reset Filters
                </Button>
              </Box>
            )}

            {/* Course list - stretch to full width */}
            <VStack spacing={4} align="stretch" w="100%">
              {filteredCourses.map((course) => {
                const statusCounts = getAssignmentStatusCounts(course);
                
                // Filter assignments based on selected filter for preview
                let previewAssignments = [...course.assessment.assignments];
                if (selectedFilter !== "all") {
                  previewAssignments = previewAssignments.filter(
                    assignment => assignment.status === selectedFilter
                  );
                }
                // Limit to 2 assignments for preview
                previewAssignments = previewAssignments.slice(0, 2);
                
                return (
                  <Box
                    key={course.id}
                    bg="white"
                    p={4}
                    borderRadius="lg"
                    boxShadow="sm"
                    borderWidth="1px"
                    borderColor="gray.200"
                    cursor="pointer"
                    onClick={() => handleCourseClick(course.id)}
                    transition="all 0.2s"
                    _hover={{
                      transform: "translateY(-2px)",
                      boxShadow: "md",
                    }}
                    width="100%"
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
                          {course.code}
                        </Text>
                      </Flex>

                      <Flex>
                        <AvatarGroup size="sm" max={3} spacing="-0.75rem">
                          {course.instructors?.map((instructor) => (
                            <Avatar
                              key={instructor.id}
                              name={instructor.name}
                              src={instructor.avatarUrl}
                            />
                          ))}
                          {course.participants?.map((participant) => (
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
                      {course.title}
                    </Text>

                    {/* Assignment Status Summary Section */}
                    <Flex justifyContent="space-between" my={3}>
                      <HStack spacing={4}>
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
                    </Flex>
                    
                    {/* Assignment list preview - filtered based on selected filter */}
                    <Box mt={2} mb={3}>
                      <Divider mb={3} />
                      <Text fontSize="sm" fontWeight="medium" mb={2}>
                        {selectedFilter === "all" 
                          ? "Recent Assignments:" 
                          : `${selectedFilter.charAt(0).toUpperCase() + selectedFilter.slice(1)} Assignments:`}
                      </Text>
                      
                      {previewAssignments.length > 0 ? (
                        <VStack align="stretch" spacing={2}>
                          {previewAssignments.map((assignment) => (
                            <Flex 
                              key={assignment.id} 
                              justify="space-between" 
                              align="center"
                              p={2}
                              borderRadius="md"
                              bg="gray.50"
                            >
                              <Box>
                                <Text fontSize="sm" noOfLines={1}>{assignment.title}</Text>
                                {assignment.dueDate && (
                                  <Flex alignItems="center" color="gray.600" fontSize="xs">
                                    <TimeIcon mr={1} boxSize={3} />
                                    <Text>Due: {assignment.dueDate}</Text>
                                  </Flex>
                                )}
                              </Box>
                              <AssignmentStatusBadge status={assignment.status} />
                            </Flex>
                          ))}
                        </VStack>
                      ) : (
                        <Text fontSize="sm" color="gray.500" textAlign="center" py={2}>
                          No {selectedFilter} assignments
                        </Text>
                      )}
                      
                      {selectedFilter === "all" && course.assessment.assignments.length > 2 && (
                        <Text fontSize="xs" color="blue.500" textAlign="right">
                          +{course.assessment.assignments.length - 2} more assignments
                        </Text>
                      )}
                      
                      {selectedFilter !== "all" && 
                       course.assessment.assignments.filter(a => a.status === selectedFilter).length > 2 && (
                        <Text fontSize="xs" color="blue.500" textAlign="right">
                          +{course.assessment.assignments.filter(a => a.status === selectedFilter).length - 2} more {selectedFilter} assignments
                        </Text>
                      )}
                    </Box>

                    <Box mt={4}>
                      <Flex alignItems="center" position="relative" h="4px">
                        <Box
                          bg="gray.100"
                          h="full"
                          w="full"
                          borderRadius="full"
                          position="absolute"
                        />
                        <Box
                          bg="blue.500"
                          h="full"
                          w={`${course.progress}%`}
                          borderRadius="full"
                          position="relative"
                          zIndex={1}
                        >
                          <Box
                            position="absolute"
                            right="-12px"
                            top="50%"
                            transform="translateY(-50%)"
                            bg="blue.500"
                            color="white"
                            borderRadius="full"
                            w="37px"
                            h="22px"
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            fontSize="xs"
                            fontWeight="semibold"
                          >
                            {course.progress}%
                          </Box>
                        </Box>
                      </Flex>
                      <Flex alignItems="center" gap={2} mt={4}>
                        <CircularProgress
                          value={
                            (course.assessment.completed /
                              course.assessment.total) *
                            100
                          }
                          size="32px"
                          color="blue.600"
                        />
                        <Text>
                          Total Assessment ({course.assessment.completed}/
                          {course.assessment.total})
                        </Text>
                        <Text color="gray.500">
                          Updated {course.assessment.lastUpdated}
                        </Text>
                      </Flex>
                    </Box>
                  </Box>
                );
              })}
            </VStack>
          </Box>
        </Box>
      </Flex>
    </>
  );
};

export default AssessmentsGeneral;