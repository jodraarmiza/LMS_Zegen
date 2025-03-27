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
} from "@chakra-ui/react";
import { MdArrowDropDownCircle } from "react-icons/md";
import { BsFillJournalBookmarkFill } from "react-icons/bs";


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
}

const IconBook1 = BsFillJournalBookmarkFill as React.FC;
const IconArrowDropDownCircle = MdArrowDropDownCircle as React.FC;

const Courses: React.FC = () => {
  const navigate = useNavigate();
  const { colorMode } = useColorMode();

  // State for search query
  const [searchQuery, setSearchQuery] = useState("");

  // State for semester dropdown
  const [selectedSemester, setSelectedSemester] =
    useState("2025 Even Semester");
  const semesters = [
    "2025 Even Semester",
    "2024 Odd Semester",
    "2024 Even Semester",
    "2023 Odd Semester",
  ];

  // Courses data
  const allCourses: Course[] = [
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
    },
    {
      id: "4",
      code: "LB2123",
      title: "Introduction to Database System",
      category: "IT",
      progress: 30,
      session: {
        total: 12,
        completed: 4,
        lastUpdated: "6d ago",
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

  // Update filtered courses when search query changes
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredCourses(allCourses);
      return;
    }

    const lowerCaseQuery = searchQuery.toLowerCase();
    const filtered = allCourses.filter(
      (course) =>
        course.title.toLowerCase().includes(lowerCaseQuery) ||
        course.category.toLowerCase().includes(lowerCaseQuery) ||
        course.code.toLowerCase().includes(lowerCaseQuery) ||
        course.instructors.some((instructor) =>
          instructor.name.toLowerCase().includes(lowerCaseQuery)
        )
    );

    setFilteredCourses(filtered);
  }, [searchQuery]);

  // Function to handle course card click - navigates directly to session
  const handleCourseClick = (courseId: string) => {
    navigate(`/course/${courseId}/session/1`);
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

  return (
    <>
      

      {/* Main content with Sidebar */}
      <Flex>
        {/* Sidebar */}
        

        {/* Content wrapper - takes full width after sidebar */}
        <Box flex="1" position="relative" overflowX="hidden">
          {/* Main courses list - fill all available space */}
          <Box p={6} w="100%" overflowY="auto" maxH="calc(100vh - 57px)">
            {/* Header with title, semester and search */}
            <Flex
              justifyContent="space-between"
              mb={6}
              w="100%"
              alignItems="center"
              flexWrap="wrap"
            >
              <Box p={2}>
                <Box mb={6}>
                  <Text fontSize="sm" color="gray.500" mb={1}>
                    Course
                  </Text>
                  <Heading as="h1" size="lg" fontWeight="semibold" mb={10}>
                    My Courses
                  </Heading>
                </Box>
              </Box>

              {/* Dropdown menu di sebelah kanan */}
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
                  No courses found matching "{searchQuery}"
                </Text>
                <Button
                  mt={4}
                  colorScheme="blue"
                  size="sm"
                  onClick={() => setSearchQuery("")}
                >
                  Clear Search
                </Button>
              </Box>
            )}

            {/* Course list - stretch to full width */}
            <VStack spacing={4} align="stretch" w="100%">
              {filteredCourses.map((course) => (
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
                        bg="green.500"
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
                          bg="green.500"
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
                          (course.session.completed / course.session.total) *
                          100
                        }
                        size="32px"
                        color="blue.600"
                      />
                      <Text>
                        Total Session ({course.session.completed}/
                        {course.session.total})
                      </Text>
                      <Text color="gray.500">
                        Updated {course.session.lastUpdated}
                      </Text>
                    </Flex>
                  </Box>
                </Box>
              ))}
            </VStack>
          </Box>
        </Box>
      </Flex>
    </>
  );
};

export default Courses;
