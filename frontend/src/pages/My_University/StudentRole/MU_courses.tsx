

import React, { useState } from 'react';
import {
  Box,
  Flex,
  Text,
  Heading,
  Grid,
  Badge,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  SimpleGrid,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  useColorModeValue,
  Collapse,
  Icon,
  Progress,
  Divider,
  HStack,
} from '@chakra-ui/react';
import {
  ChevronDownIcon,
  ChevronRightIcon,
  SearchIcon,
  DownloadIcon,
  ExternalLinkIcon,
  InfoIcon,
  ArrowBackIcon,
} from '@chakra-ui/icons';

// Define type for course data
type Course = {
  id: number;
  code: string;
  name: string;
  lecturer: string;
  credits: number;
  semester: number;
  schedule: string;
  room: string;
  progress: number;
  status: string;
};

type CourseMaterial = {
  id: number;
  title: string;
  type: string;
  date: string;
  size: string;
};

// Mock data
const semesters = [
  { id: 1, name: "Semester 1" },
  { id: 2, name: "Semester 2" },
  { id: 3, name: "Semester 3 (Current)" },
  { id: 4, name: "Semester 4" },
  { id: 5, name: "Semester 5" },
  { id: 6, name: "Semester 6" },
  { id: 7, name: "Semester 7" },
  { id: 8, name: "Semester 8" },
];

const courses: Course[] = [
  {
    id: 1,
    code: "CS101",
    name: "Introduction to Computer Science",
    lecturer: "Dr. Jane Smith",
    credits: 3,
    semester: 3,
    schedule: "Monday, 09:00 - 11:30",
    room: "Room A301",
    progress: 75,
    status: "In Progress"
  },
  {
    id: 2,
    code: "DB202",
    name: "Database Management Systems",
    lecturer: "Prof. John Davis",
    credits: 4,
    semester: 3,
    schedule: "Tuesday, 13:00 - 15:30",
    room: "Lab 201",
    progress: 60,
    status: "In Progress"
  },
  {
    id: 3,
    code: "SE304",
    name: "Software Engineering",
    lecturer: "Dr. Michael Brown",
    credits: 4,
    semester: 3,
    schedule: "Wednesday, 10:00 - 12:30",
    room: "Room B105",
    progress: 65,
    status: "In Progress"
  },
  {
    id: 4,
    code: "NW205",
    name: "Computer Networks",
    lecturer: "Dr. Sarah Johnson",
    credits: 3,
    semester: 3,
    schedule: "Friday, 14:00 - 16:30",
    room: "Lab 302",
    progress: 80,
    status: "In Progress"
  },
  {
    id: 5,
    code: "AI401",
    name: "Artificial Intelligence",
    lecturer: "Prof. Robert Wilson",
    credits: 3,
    semester: 3,
    schedule: "Thursday, 09:00 - 11:30",
    room: "Room C201",
    progress: 70,
    status: "In Progress"
  }
];

const courseMaterials: CourseMaterial[] = [
  { id: 1, title: "Course Syllabus", type: "PDF", date: "Mar 15, 2025", size: "2.3 MB" },
  { id: 2, title: "Week 1: Introduction", type: "PDF", date: "Mar 17, 2025", size: "5.1 MB" },
  { id: 3, title: "Week 2: Basic Concepts", type: "PDF", date: "Mar 24, 2025", size: "3.7 MB" },
  { id: 4, title: "Lab Exercise 1", type: "ZIP", date: "Mar 25, 2025", size: "8.2 MB" },
  { id: 5, title: "Week 3: Advanced Topics", type: "PDF", date: "Apr 1, 2025", size: "4.5 MB" },
  { id: 6, title: "Lecture Slides", type: "PPTX", date: "Apr 8, 2025", size: "10.3 MB" }
];

const MyUniversityCourse = () => {
  const [selectedSemester, setSelectedSemester] = useState<number>(3);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredCourses, setFilteredCourses] = useState<Course[]>(courses);
  const [expandedCourse, setExpandedCourse] = useState<number | null>(null);
  const [detailView, setDetailView] = useState<boolean>(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [sortField, setSortField] = useState<string>("code");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  // Color mode values
  const bgCard = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const hoverBg = useColorModeValue('gray.50', 'gray.600');

  // Handle search and filtering
  React.useEffect(() => {
    const filtered = courses.filter(course => {
      return (
        (selectedSemester === 0 || course.semester === selectedSemester) &&
        (searchQuery === "" || 
          course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          course.code.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    });

    // Apply sorting
    const sorted = [...filtered].sort((a, b) => {
      // Type assertion to access dynamic properties
      const aValue = a[sortField as keyof Course];
      const bValue = b[sortField as keyof Course];

      if (aValue < bValue) {
        return sortDirection === "asc" ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortDirection === "asc" ? 1 : -1;
      }
      return 0;
    });

    setFilteredCourses(sorted);
  }, [selectedSemester, searchQuery, sortField, sortDirection]);

  // Handle course click
  const handleCourseClick = (course: Course) => {
    if (expandedCourse === course.id) {
      setExpandedCourse(null);
    } else {
      setExpandedCourse(course.id);
    }
  };

  // Handle detail view
  const handleViewDetails = (course: Course) => {
    setSelectedCourse(course);
    setDetailView(true);
  };

  // Handle back to list
  const handleBackToList = () => {
    setSelectedCourse(null);
    setDetailView(false);
  };

  // Handle sort
  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  return (
    <Box>
      {/* Page Header */}
      <Flex justify="space-between" align="center" mb={6}>
        <Box>
          <Heading as="h1" size="lg" color="gray.800">Courses</Heading>
          <Text color="gray.600" mt={1}>View and manage your enrolled courses</Text>
        </Box>

        {/* Semester Filter */}
        <Menu>
          <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
            {selectedSemester === 0 
              ? "All Semesters" 
              : semesters.find(s => s.id === selectedSemester)?.name || "Select Semester"}
          </MenuButton>
          <MenuList>
            <MenuItem onClick={() => setSelectedSemester(0)}>All Semesters</MenuItem>
            {semesters.map((semester) => (
              <MenuItem 
                key={semester.id} 
                onClick={() => setSelectedSemester(semester.id)}
                fontWeight={selectedSemester === semester.id ? "bold" : "normal"}
              >
                {semester.name}
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
      </Flex>

      {/* Search Bar */}
      <InputGroup mb={6}>
        <InputLeftElement pointerEvents="none">
          <SearchIcon color="gray.300" />
        </InputLeftElement>
        <Input 
          placeholder="Search courses..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </InputGroup>

      {!detailView ? (
        // Course List View
        <Box>
          {filteredCourses.length > 0 ? (
            <Box borderWidth="1px" borderRadius="lg" overflow="hidden">
              <Table variant="simple">
                <Thead bg={useColorModeValue('gray.50', 'gray.700')}>
                  <Tr>
                    <Th 
                      cursor="pointer" 
                      onClick={() => handleSort('code')}
                    >
                      <Flex align="center">
                        Course Code
                        {sortField === 'code' && (
                          <Icon 
                            as={sortDirection === 'asc' ? ChevronDownIcon : ChevronDownIcon} 
                            ml={1} 
                            transform={sortDirection === 'asc' ? 'rotate(0deg)' : 'rotate(180deg)'}
                          />
                        )}
                      </Flex>
                    </Th>
                    <Th 
                      cursor="pointer" 
                      onClick={() => handleSort('name')}
                    >
                      <Flex align="center">
                        Course Name
                        {sortField === 'name' && (
                          <Icon 
                            as={sortDirection === 'asc' ? ChevronDownIcon : ChevronDownIcon} 
                            ml={1} 
                            transform={sortDirection === 'asc' ? 'rotate(0deg)' : 'rotate(180deg)'}
                          />
                        )}
                      </Flex>
                    </Th>
                    <Th 
                      cursor="pointer" 
                      onClick={() => handleSort('credits')}
                    >
                      <Flex align="center">
                        Credits
                        {sortField === 'credits' && (
                          <Icon 
                            as={sortDirection === 'asc' ? ChevronDownIcon : ChevronDownIcon} 
                            ml={1} 
                            transform={sortDirection === 'asc' ? 'rotate(0deg)' : 'rotate(180deg)'}
                          />
                        )}
                      </Flex>
                    </Th>
                    <Th>Grade</Th>
                    <Th>Actions</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {filteredCourses.map((course) => (
                    <React.Fragment key={course.id}>
                      <Tr 
                        _hover={{ bg: hoverBg }} 
                        cursor="pointer" 
                        onClick={() => handleCourseClick(course)}
                      >
                        <Td fontWeight="medium">{course.code}</Td>
                        <Td>{course.name}</Td>
                        <Td>{course.credits}</Td>
                        <Td>
                          <Badge colorScheme="green" fontSize="0.8em" p={1}>
                            {course.status}
                          </Badge>
                        </Td>
                        <Td>
                          <Button 
                            size="sm" 
                            colorScheme="blue" 
                            rightIcon={<ChevronRightIcon />}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleViewDetails(course);
                            }}
                          >
                            View Details
                          </Button>
                        </Td>
                      </Tr>
                      <Tr>
                        <Td colSpan={5} p={0}>
                          <Collapse in={expandedCourse === course.id} animateOpacity>
                            <Box p={4} bg="gray.50">
                              <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                                <Box>
                                  <Text fontWeight="bold">Lecturer</Text>
                                  <Text>{course.lecturer}</Text>
                                </Box>
                                <Box>
                                  <Text fontWeight="bold">Schedule</Text>
                                  <Text>{course.schedule}</Text>
                                </Box>
                                <Box>
                                  <Text fontWeight="bold">Room</Text>
                                  <Text>{course.room}</Text>
                                </Box>
                                <Box>
                                  <Text fontWeight="bold">Progress</Text>
                                  <Flex align="center">
                                    <Progress
                                      value={course.progress}
                                      size="sm"
                                      colorScheme="blue"
                                      flex="1"
                                      mr={2}
                                    />
                                    <Text fontSize="sm">{course.progress}%</Text>
                                  </Flex>
                                </Box>
                              </Grid>
                              <Flex justify="flex-end" mt={4}>
                                <Button 
                                  colorScheme="blue" 
                                  size="sm"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleViewDetails(course);
                                  }}
                                >
                                  View Full Details
                                </Button>
                              </Flex>
                            </Box>
                          </Collapse>
                        </Td>
                      </Tr>
                    </React.Fragment>
                  ))}
                </Tbody>
              </Table>
            </Box>
          ) : (
            <Box textAlign="center" p={10} bg={bgCard} borderRadius="lg" shadow="sm">
              <Heading size="md" mb={2}>No courses found</Heading>
              <Text color="gray.500">
                {searchQuery || selectedSemester !== 3
                  ? "Try adjusting your search or filter"
                  : "No courses available for this semester"}
              </Text>
            </Box>
          )}
        </Box>
      ) : (
        // Course Detail View
        <Box>
          <Button 
            leftIcon={<ArrowBackIcon />} 
            mb={6} 
            onClick={handleBackToList}
            variant="outline"
          >
            Back to Courses
          </Button>

          {selectedCourse && (
            <Box>
              {/* Course Header */}
              <Box 
                bg={bgCard} 
                p={6} 
                borderRadius="lg" 
                shadow="sm" 
                borderWidth="1px" 
                borderColor={borderColor}
                mb={6}
              >
                <Flex justify="space-between" align="center" mb={4}>
                  <Box>
                    <Heading size="lg">{selectedCourse.name}</Heading>
                    <Flex align="center" mt={1}>
                      <Text color="gray.600" fontWeight="medium" mr={2}>{selectedCourse.code}</Text>
                      <Badge colorScheme="green">{selectedCourse.status}</Badge>
                    </Flex>
                  </Box>
                  <Badge colorScheme="blue" p={2} fontSize="md">
                    {selectedCourse.credits} Credits
                  </Badge>
                </Flex>

                <Divider my={4} />

                <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6}>
                  <Box>
                    <Text fontWeight="medium" color="gray.500" fontSize="sm">Lecturer</Text>
                    <Text mt={1}>{selectedCourse.lecturer}</Text>
                  </Box>
                  <Box>
                    <Text fontWeight="medium" color="gray.500" fontSize="sm">Schedule</Text>
                    <Text mt={1}>{selectedCourse.schedule}</Text>
                  </Box>
                  <Box>
                    <Text fontWeight="medium" color="gray.500" fontSize="sm">Room</Text>
                    <Text mt={1}>{selectedCourse.room}</Text>
                  </Box>
                  <Box>
                    <Text fontWeight="medium" color="gray.500" fontSize="sm">Progress</Text>
                    <HStack mt={1} spacing={2}>
                      <Progress
                        value={selectedCourse.progress}
                        size="sm"
                        colorScheme="blue"
                        flex="1"
                      />
                      <Text fontSize="sm">{selectedCourse.progress}%</Text>
                    </HStack>
                  </Box>
                </SimpleGrid>
              </Box>

              {/* Course Tabs */}
              <Box 
                bg={bgCard} 
                borderRadius="lg" 
                shadow="sm" 
                borderWidth="1px" 
                borderColor={borderColor}
              >
                <Tabs colorScheme="blue">
                  <TabList px={4}>
                    <Tab fontWeight="medium">Materials</Tab>
                    <Tab fontWeight="medium">Assessments</Tab>
                    <Tab fontWeight="medium">Forums</Tab>
                    <Tab fontWeight="medium">Meetings</Tab>
                    <Tab fontWeight="medium">Grades</Tab>
                  </TabList>

                  <TabPanels>
                    <TabPanel>
                      <Flex justify="space-between" align="center" mb={4}>
                        <Heading size="md">Course Materials</Heading>
                        <HStack>
                          <Button leftIcon={<DownloadIcon />} colorScheme="blue" variant="outline" size="sm">
                            Export
                          </Button>
                        </HStack>
                      </Flex>

                      <Table variant="simple">
                        <Thead>
                          <Tr>
                            <Th>Title</Th>
                            <Th>Type</Th>
                            <Th>Uploaded</Th>
                            <Th>Size</Th>
                            <Th>Actions</Th>
                          </Tr>
                        </Thead>
                        <Tbody>
                          {courseMaterials.map((material) => (
                            <Tr key={material.id} _hover={{ bg: hoverBg }}>
                              <Td>
                                <Flex align="center">
                                  <Box mr={3} p={2} bg="blue.50" borderRadius="md">
                                    <InfoIcon color="blue.500" />
                                  </Box>
                                  <Text fontWeight="medium">{material.title}</Text>
                                </Flex>
                              </Td>
                              <Td>
                                <Badge colorScheme="blue">{material.type}</Badge>
                              </Td>
                              <Td>{material.date}</Td>
                              <Td>{material.size}</Td>
                              <Td>
                                <HStack>
                                  <IconButton
                                    aria-label="Download"
                                    icon={<DownloadIcon />}
                                    size="sm"
                                    colorScheme="blue"
                                    variant="ghost"
                                  />
                                  <IconButton
                                    aria-label="Open"
                                    icon={<ExternalLinkIcon />}
                                    size="sm"
                                    colorScheme="blue"
                                    variant="ghost"
                                  />
                                </HStack>
                              </Td>
                            </Tr>
                          ))}
                        </Tbody>
                      </Table>
                    </TabPanel>

                    <TabPanel>
                      <Heading size="md" mb={4}>Assessments</Heading>
                      <Text color="gray.500">No assessments available for this course yet.</Text>
                    </TabPanel>

                    <TabPanel>
                      <Heading size="md" mb={4}>Forums</Heading>
                      <Text color="gray.500">No forum discussions available for this course yet.</Text>
                    </TabPanel>

                    <TabPanel>
                      <Heading size="md" mb={4}>Meetings</Heading>
                      <Text color="gray.500">No scheduled meetings available for this course yet.</Text>
                    </TabPanel>

                    <TabPanel>
                      <Heading size="md" mb={4}>Grades</Heading>
                      <Text color="gray.500">No grades available for this course yet.</Text>
                    </TabPanel>
                  </TabPanels>
                </Tabs>
              </Box>
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
};

export default MyUniversityCourse;