import React, { useState, useEffect } from "react";
import {
  Box,
  Heading,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Text,
  Flex,
  Button,
  Select,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  HStack,
  useToast,
  Card,
  CardBody,
  CardHeader,
  Grid,
  GridItem,
  Progress,
  Tag,
  Input,
  InputGroup,
  InputLeftElement,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Stack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Divider,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Alert,
  AlertIcon,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  VStack,
  useDisclosure,
  Tooltip,
} from "@chakra-ui/react";
import { 
  SearchIcon, 
  AddIcon, 
  ChevronDownIcon, 
  InfoIcon,
  CheckIcon,
  CloseIcon,
  WarningIcon,
  TimeIcon,
  DownloadIcon,
  RepeatIcon,
  EditIcon,
  CalendarIcon,
  StarIcon,
} from "@chakra-ui/icons";

// Types
interface Course {
  id: string;
  code: string;
  name: string;
  credits: number;
  semester: number;
  status: "enrolled" | "available" | "completed" | "pending" | "rejected";
  grade?: string;
  professor?: string;
  schedule?: string;
  room?: string;
  description?: string;
  prerequisites?: string[];
}

interface KRSHistory {
  id: string;
  semester: string;
  academicYear: string;
  status: "approved" | "pending" | "rejected";
  date: string;
  courseCount: number;
  totalCredits: number;
}

interface KRSRequest {
  id: string;
  reason: string;
  courses: string[];
  status: "pending" | "approved" | "rejected";
  submissionDate: string;
}

interface StudentInfo {
  nim: string;
  name: string;
  program: string;
  semester: number;
  academicYear: string;
  advisor: string;
  maxCredits: number;
  currentIpk: number;
}

const MU_Course: React.FC = () => {
  const toast = useToast();
  const [activeTab, setActiveTab] = useState(0);
  const [selectedSemester, setSelectedSemester] = useState<string>("3");
  const [searchQuery, setSearchQuery] = useState("");
  const [isKRSModalOpen, setIsKRSModalOpen] = useState(false);
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);
  const [currentView, setCurrentView] = useState<"list" | "history" | "request">("list");
  
  // Drawer state for course details
  const { isOpen: isDrawerOpen, onOpen: onDrawerOpen, onClose: onDrawerClose } = useDisclosure();
  const [selectedCourseDetails, setSelectedCourseDetails] = useState<Course | null>(null);
  
  // KRS Request modal
  const { isOpen: isRequestOpen, onOpen: onRequestOpen, onClose: onRequestClose } = useDisclosure();
  const [requestReason, setRequestReason] = useState("");

  // Student information
  const studentInfo: StudentInfo = {
    nim: "12345678",
    name: "Admin LMS",
    program: "Information Technology",
    semester: 3,
    academicYear: "2024/2025",
    advisor: "Dr. Robert Johnson",
    maxCredits: 24,
    currentIpk: 3.72,
  };

  // Mock data - In a real app, this would come from an API
  const [courses, setCourses] = useState<Course[]>([
    { 
      id: "CS101", 
      code: "CS101", 
      name: "Introduction to Programming", 
      credits: 3, 
      semester: 1, 
      status: "completed",
      grade: "A",
      professor: "Dr. John Smith",
      schedule: "Monday, 10:00 - 12:00",
      room: "Room 301",
      description: "This course introduces the fundamentals of programming using Python. Students will learn basic syntax, data structures, and algorithms.",
    },
    { 
      id: "CS102", 
      code: "CS102", 
      name: "Data Structures", 
      credits: 4, 
      semester: 2, 
      status: "completed",
      grade: "A-",
      professor: "Dr. Sarah Johnson",
      schedule: "Tuesday, 13:00 - 15:00",
      room: "Room 302",
      description: "This course covers fundamental data structures including arrays, linked lists, stacks, queues, trees, and graphs.",
      prerequisites: ["CS101"],
    },
    { 
      id: "CS203", 
      code: "CS203", 
      name: "Object-Oriented Programming", 
      credits: 3, 
      semester: 2, 
      status: "completed",
      grade: "B+",
      professor: "Dr. Michael Chen",
      schedule: "Thursday, 09:00 - 11:00",
      room: "Room 201",
      description: "This course focuses on object-oriented programming principles using Java. Students will learn about classes, inheritance, polymorphism, and encapsulation.",
      prerequisites: ["CS101"],
    },
    { 
      id: "CS201", 
      code: "CS201", 
      name: "Algorithms", 
      credits: 4, 
      semester: 3, 
      status: "enrolled",
      professor: "Dr. Robert Lee",
      schedule: "Wednesday, 13:00 - 15:00",
      room: "Room 305",
      description: "This course covers algorithm design paradigms, complexity analysis, and common algorithms for sorting, searching, and graph operations.",
      prerequisites: ["CS102"],
    },
    { 
      id: "CS202", 
      code: "CS202", 
      name: "Database Systems", 
      credits: 3, 
      semester: 3, 
      status: "enrolled",
      professor: "Dr. Emily Chen",
      schedule: "Friday, 09:00 - 11:00",
      room: "Room 401",
      description: "This course introduces database concepts, SQL, relational database design, and transaction management.",
      prerequisites: ["CS102"],
    },
    { 
      id: "CS204", 
      code: "CS204", 
      name: "Computer Architecture", 
      credits: 3, 
      semester: 3, 
      status: "enrolled",
      professor: "Dr. James Wilson",
      schedule: "Monday, 15:00 - 17:00",
      room: "Room 302",
      description: "This course covers computer organization, CPU design, memory systems, and input/output interfaces.",
    },
    { 
      id: "CS301", 
      code: "CS301", 
      name: "Operating Systems", 
      credits: 4, 
      semester: 4, 
      status: "available",
      professor: "Dr. Lisa Wang", 
      schedule: "Tuesday, 10:00 - 12:00",
      room: "Room 304",
      description: "This course covers operating system principles, process management, memory management, file systems, and security.",
      prerequisites: ["CS201", "CS204"],
    },
    { 
      id: "CS302", 
      code: "CS302", 
      name: "Computer Networks", 
      credits: 3, 
      semester: 4, 
      status: "available",
      professor: "Dr. David Kim",
      schedule: "Thursday, 13:00 - 15:00",
      room: "Room 305",
      description: "This course introduces network architecture, protocols, routing, and network applications.",
      prerequisites: ["CS201"],
    },
    { 
      id: "CS303", 
      code: "CS303", 
      name: "Software Engineering", 
      credits: 3, 
      semester: 4, 
      status: "available",
      professor: "Dr. Rachel Green",
      schedule: "Wednesday, 10:00 - 12:00",
      room: "Room 401",
      description: "This course covers software development methodologies, requirements engineering, design patterns, and testing techniques.",
      prerequisites: ["CS203"],
    },
    { 
      id: "CS304", 
      code: "CS304", 
      name: "Web Development", 
      credits: 3, 
      semester: 4, 
      status: "available",
      professor: "Dr. Thomas Brown",
      schedule: "Friday, 13:00 - 15:00",
      room: "Room 303",
      description: "This course introduces web technologies including HTML, CSS, JavaScript, and server-side programming.",
      prerequisites: ["CS203"],
    },
    { 
      id: "CS401", 
      code: "CS401", 
      name: "Artificial Intelligence", 
      credits: 4, 
      semester: 5, 
      status: "available",
      professor: "Dr. Anna Martinez",
      schedule: "Monday, 13:00 - 15:00",
      room: "Room 405",
      description: "This course covers search algorithms, knowledge representation, machine learning, and natural language processing.",
      prerequisites: ["CS201", "MATH301"],
    },
    { 
      id: "CS402", 
      code: "CS402", 
      name: "Machine Learning", 
      credits: 4, 
      semester: 5, 
      status: "available",
      professor: "Dr. Samuel Park",
      schedule: "Tuesday, 15:00 - 17:00",
      room: "Room 406",
      description: "This course introduces supervised and unsupervised learning, neural networks, and deep learning techniques.",
      prerequisites: ["CS401", "MATH302"],
    },
    { 
      id: "CS501", 
      code: "CS501", 
      name: "Cloud Computing", 
      credits: 3, 
      semester: 6, 
      status: "available",
      professor: "Dr. Jennifer Liu",
      schedule: "Wednesday, 15:00 - 17:00",
      room: "Room 501",
      description: "This course covers cloud service models, virtualization, containerization, and cloud security.",
      prerequisites: ["CS302", "CS303"],
    },
    { 
      id: "CS502", 
      code: "CS502", 
      name: "Big Data Analytics", 
      credits: 4, 
      semester: 6, 
      status: "available",
      professor: "Dr. Robert Chen",
      schedule: "Thursday, 10:00 - 12:00",
      room: "Room 502",
      description: "This course introduces big data processing frameworks, distributed computing, and analytics techniques.",
      prerequisites: ["CS402", "CS202"],
    },
    { 
      id: "CS601", 
      code: "CS601", 
      name: "Cybersecurity", 
      credits: 3, 
      semester: 7, 
      status: "available",
      professor: "Dr. Alexander White",
      schedule: "Monday, 10:00 - 12:00",
      room: "Room 601",
      description: "This course covers security principles, cryptography, network security, and ethical hacking.",
      prerequisites: ["CS302"],
    },
    { 
      id: "CS602", 
      code: "CS602", 
      name: "Mobile Application Development", 
      credits: 3, 
      semester: 7, 
      status: "available",
      professor: "Dr. Diana Rodriguez",
      schedule: "Tuesday, 13:00 - 15:00",
      room: "Room 602",
      description: "This course introduces mobile application development for Android and iOS platforms.",
      prerequisites: ["CS304", "CS203"],
    },
    { 
      id: "CS701", 
      code: "CS701", 
      name: "Advanced Topics in AI", 
      credits: 3, 
      semester: 8, 
      status: "available",
      professor: "Dr. William Zhang",
      schedule: "Wednesday, 10:00 - 12:00",
      room: "Room 701",
      description: "This course covers advanced topics in artificial intelligence including reinforcement learning and robotics.",
      prerequisites: ["CS401", "CS402"],
    },
    { 
      id: "CS702", 
      code: "CS702", 
      name: "Capstone Project", 
      credits: 6, 
      semester: 8, 
      status: "available",
      professor: "Dr. Elizabeth Taylor",
      schedule: "Thursday/Friday, 14:00 - 17:00",
      room: "Room 702",
      description: "In this course, students work on a comprehensive project that integrates knowledge from previous courses.",
      prerequisites: ["CS501", "CS502", "CS601"],
    },
    { 
      id: "MATH301", 
      code: "MATH301", 
      name: "Discrete Mathematics", 
      credits: 3, 
      semester: 3, 
      status: "enrolled",
      professor: "Dr. Victoria Adams",
      schedule: "Friday, 13:00 - 15:00",
      room: "Room 201",
      description: "This course covers logic, set theory, combinatorics, graph theory, and their applications in computer science.",
    },
    { 
      id: "MATH302", 
      code: "MATH302", 
      name: "Probability and Statistics", 
      credits: 3, 
      semester: 4, 
      status: "available",
      professor: "Dr. Nathan Harris",
      schedule: "Monday, 13:00 - 15:00",
      room: "Room 202",
      description: "This course introduces probability theory, random variables, statistical inference, and data analysis.",
      prerequisites: ["MATH301"],
    },
  ]);

  const [krsHistory, setKrsHistory] = useState<KRSHistory[]>([
    {
      id: "KRS-2023-1",
      semester: "1",
      academicYear: "2023/2024",
      status: "approved",
      date: "August 15, 2023",
      courseCount: 6,
      totalCredits: 18
    },
    {
      id: "KRS-2023-2",
      semester: "2",
      academicYear: "2023/2024",
      status: "approved",
      date: "January 10, 2024",
      courseCount: 5,
      totalCredits: 16
    },
    {
      id: "KRS-2024-1",
      semester: "3",
      academicYear: "2024/2025",
      status: "approved",
      date: "August 12, 2024",
      courseCount: 4,
      totalCredits: 13
    }
  ]);

  const [krsRequests, setKrsRequests] = useState<KRSRequest[]>([
    {
      id: "REQ-2024-01",
      reason: "Adding an elective course to improve programming skills",
      courses: ["CS304"],
      status: "pending",
      submissionDate: "September 5, 2024"
    }
  ]);

  // Filter courses based on selected semester and search query
  const filteredCourses = courses.filter(
    (course) => 
      course.semester === parseInt(selectedSemester) && 
      (searchQuery === "" || 
        course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.code.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Get enrolled courses for Current Courses tab
  const enrolledCourses = courses.filter(
    (course) => course.status === "enrolled"
  );

  // Get completed courses for Completed Courses tab
  const completedCourses = courses.filter(
    (course) => course.status === "completed"
  );

  // Handle opening course details drawer
  const handleViewCourseDetails = (course: Course) => {
    setSelectedCourseDetails(course);
    onDrawerOpen();
  };

  // Handle course selection for KRS
  const handleCourseSelection = (courseId: string) => {
    if (selectedCourses.includes(courseId)) {
      setSelectedCourses(selectedCourses.filter(id => id !== courseId));
    } else {
      setSelectedCourses([...selectedCourses, courseId]);
    }
  };

  // Handle KRS submission
  const handleKRSSubmit = () => {
    // In a real app, this would send the selected courses to an API
    toast({
      title: "KRS Submitted",
      description: `You have registered for ${selectedCourses.length} courses.`,
      status: "success",
      duration: 3000,
      isClosable: true,
    });
    setIsKRSModalOpen(false);

    // Update courses status
    const updatedCourses = courses.map(course => {
      if (selectedCourses.includes(course.id)) {
        return { ...course, status: "pending" as const };
      }
      return course;
    });
    setCourses(updatedCourses);
    
    // Reset selection
    setSelectedCourses([]);
  };

  // Handle KRS request submission
  const handleKRSRequestSubmit = () => {
    if (selectedCourses.length === 0 || requestReason.trim() === "") {
      toast({
        title: "Incomplete Form",
        description: "Please select at least one course and provide a reason for your request.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    // Create new request
    const newRequest: KRSRequest = {
      id: `REQ-2024-${krsRequests.length + 2}`,
      reason: requestReason,
      courses: [...selectedCourses],
      status: "pending",
      submissionDate: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric"
      })
    };

    setKrsRequests([...krsRequests, newRequest]);

    toast({
      title: "Request Submitted",
      description: "Your KRS request has been submitted and is awaiting approval.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });

    onRequestClose();
    setRequestReason("");
    setSelectedCourses([]);
  };

  // Calculate total credits for KRS
  const totalSelectedCredits = courses
    .filter(course => selectedCourses.includes(course.id))
    .reduce((total, course) => total + course.credits, 0);

  // Calculate completed credits
  const totalCompletedCredits = completedCourses.reduce(
    (total, course) => total + course.credits, 
    0
  );

  // Calculate progress percentage
  const creditProgress = Math.min(
    (totalCompletedCredits / 144) * 100, 
    100
  );

  // Render status badge
  const renderStatusBadge = (status: Course["status"]) => {
    switch (status) {
      case "enrolled":
        return (
          <Badge colorScheme="green" variant="subtle" px={2} py={1} borderRadius="md">
            <Flex align="center">
              <CheckIcon mr={1} boxSize={3} />
              <Text fontSize="xs">Enrolled</Text>
            </Flex>
          </Badge>
        );
      case "available":
        return (
          <Badge colorScheme="blue" variant="subtle" px={2} py={1} borderRadius="md">
            <Flex align="center">
              <Text fontSize="xs">Available</Text>
            </Flex>
          </Badge>
        );
      case "completed":
        return (
          <Badge colorScheme="purple" variant="subtle" px={2} py={1} borderRadius="md">
            <Flex align="center">
              <CheckIcon mr={1} boxSize={3} />
              <Text fontSize="xs">Completed</Text>
            </Flex>
          </Badge>
        );
      case "pending":
        return (
          <Badge colorScheme="orange" variant="subtle" px={2} py={1} borderRadius="md">
            <Flex align="center">
              <TimeIcon mr={1} boxSize={3} />
              <Text fontSize="xs">Pending</Text>
            </Flex>
          </Badge>
        );
      case "rejected":
        return (
          <Badge colorScheme="red" variant="subtle" px={2} py={1} borderRadius="md">
            <Flex align="center">
              <CloseIcon mr={1} boxSize={3} />
              <Text fontSize="xs">Rejected</Text>
            </Flex>
          </Badge>
        );
      default:
        return null;
    }
  };

  // Render KRS history status badge
  const renderKRSStatusBadge = (status: KRSHistory["status"] | KRSRequest["status"]) => {
    switch (status) {
      case "approved":
        return (
          <Badge colorScheme="green" variant="subtle" px={2} py={1} borderRadius="md">
            <Flex align="center">
              <CheckIcon mr={1} boxSize={3} />
              <Text fontSize="xs">Approved</Text>
            </Flex>
          </Badge>
        );
      case "pending":
        return (
          <Badge colorScheme="orange" variant="subtle" px={2} py={1} borderRadius="md">
            <Flex align="center">
              <TimeIcon mr={1} boxSize={3} />
              <Text fontSize="xs">Pending</Text>
            </Flex>
          </Badge>
        );
      case "rejected":
        return (
          <Badge colorScheme="red" variant="subtle" px={2} py={1} borderRadius="md">
            <Flex align="center">
              <CloseIcon mr={1} boxSize={3} />
              <Text fontSize="xs">Rejected</Text>
            </Flex>
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <Box p={6} bg="gray.50" minH="calc(100vh - 70px)">
      <Flex justify="space-between" align="center" mb={6}>
        <Box>
          <Heading size="lg" color="gray.700">Course Management</Heading>
          <Text color="gray.600" mt={1}>
            Manage your course registrations and view academic progress
          </Text>
        </Box>
        <HStack spacing={4}>
          <Button 
            variant={currentView === "list" ? "solid" : "outline"} 
            colorScheme="blue" 
            size="sm"
            onClick={() => setCurrentView("list")}
            leftIcon={<CalendarIcon />}
          >
            Courses
          </Button>
          <Button 
            variant={currentView === "history" ? "solid" : "outline"} 
            colorScheme="blue" 
            size="sm"
            onClick={() => setCurrentView("history")}
            leftIcon={<RepeatIcon />}
          >
            KRS History
          </Button>
          <Button 
            variant={currentView === "request" ? "solid" : "outline"} 
            colorScheme="blue" 
            size="sm"
            onClick={() => setCurrentView("request")}
            leftIcon={<EditIcon />}
          >
            KRS Requests
          </Button>
        </HStack>
      </Flex>
      
      {/* Student Info Summary Card */}
      <Box mb={6} bg="white" p={4} borderRadius="lg" boxShadow="sm">
        <Flex direction={{ base: "column", md: "row" }} justify="space-between" wrap="wrap">
          <Box mb={{ base: 4, md: 0 }} flex="1">
            <Text fontSize="sm" color="gray.600">Student Information</Text>
            <HStack mt={1} spacing={6}>
              <Box>
                <Text fontSize="sm" color="gray.500">NIM</Text>
                <Text fontWeight="medium">{studentInfo.nim}</Text>
              </Box>
              <Box>
                <Text fontSize="sm" color="gray.500">Name</Text>
                <Text fontWeight="medium">{studentInfo.name}</Text>
              </Box>
              <Box>
                <Text fontSize="sm" color="gray.500">Program</Text>
                <Text fontWeight="medium">{studentInfo.program}</Text>
              </Box>
            </HStack>
          </Box>
          
          <Box mb={{ base: 4, md: 0 }} flex="1">
            <Text fontSize="sm" color="gray.600">Academic Information</Text>
            <HStack mt={1} spacing={6}>
              <Box>
                <Text fontSize="sm" color="gray.500">Current Semester</Text>
                <Text fontWeight="medium">{studentInfo.semester}</Text>
              </Box>
              <Box>
                <Text fontSize="sm" color="gray.500">Academic Year</Text>
                <Text fontWeight="medium">{studentInfo.academicYear}</Text>
              </Box>
              <Box>
                <Text fontSize="sm" color="gray.500">Current IPK</Text>
                <Text fontWeight="medium">{studentInfo.currentIpk.toFixed(2)}</Text>
              </Box>
            </HStack>
          </Box>
          
          <Box>
            <Text fontSize="sm" color="gray.600">Progress</Text>
            <HStack mt={1} align="center" spacing={3}>
              <Box w="150px">
                <Text fontSize="xs" color="gray.500" mb={1}>
                  {totalCompletedCredits} of 144 credits completed
                </Text>
                <Progress 
                  value={creditProgress} 
                  size="sm" 
                  colorScheme="green" 
                  borderRadius="full" 
                />
              </Box>
              <Text fontWeight="bold" fontSize="lg" color="green.500">
                {Math.round(creditProgress)}%
              </Text>
            </HStack>
          </Box>
        </Flex>
      </Box>

      {currentView === "list" ? (
        <>
          <Tabs 
            colorScheme="blue" 
            variant="enclosed" 
            bg="white" 
            borderRadius="lg" 
            boxShadow="sm" 
            onChange={(index) => setActiveTab(index)}
          >
            <TabList px={4} pt={4}>
              <Tab _selected={{ color: 'blue.600', borderColor: 'currentColor', borderBottomColor: 'white' }}>
                Course Registration
              </Tab>
              <Tab _selected={{ color: 'blue.600', borderColor: 'currentColor', borderBottomColor: 'white' }}>
                Current Courses
              </Tab>
              <Tab _selected={{ color: 'blue.600', borderColor: 'currentColor', borderBottomColor: 'white' }}>
                Completed Courses
              </Tab>
            </TabList>

            <TabPanels>
              {/* Course Registration Tab */}
              <TabPanel p={4}>
                <Flex justify="space-between" mb={6} wrap={{ base: "wrap", md: "nowrap" }} gap={4}>
                  <HStack spacing={4}>
                    <Text>Semester:</Text>
                    <Select 
                      value={selectedSemester}
                      onChange={(e) => setSelectedSemester(e.target.value)}
                      w="120px"
                      bg="white"
                      borderColor="gray.300"
                    >
                      <option value="1">Semester 1</option>
                      <option value="2">Semester 2</option>
                      <option value="3">Semester 3</option>
                      <option value="4">Semester 4</option>
                      <option value="5">Semester 5</option>
                      <option value="6">Semester 6</option>
                      <option value="7">Semester 7</option>
                      <option value="8">Semester 8</option>
                    </Select>
                  </HStack>

                  <HStack spacing={2} flex={{ base: "1", md: "initial" }} mt={{ base: 2, md: 0 }}>
                    <InputGroup w={{ base: "full", md: "300px" }}>
                      <InputLeftElement pointerEvents="none">
                        <SearchIcon color="gray.400" />
                      </InputLeftElement>
                      <Input 
                        placeholder="Search by course name or code"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        bg="white"
                      />
                    </InputGroup>
                    <Button 
                      leftIcon={<AddIcon />} 
                      colorScheme="blue"
                      onClick={() => setIsKRSModalOpen(true)}
                    >
                      Register KRS
                    </Button>
                  </HStack>
                </Flex>

                {parseInt(selectedSemester) < studentInfo.semester && (
                  <Alert status="info" mb={4} borderRadius="md">
                    <AlertIcon />
                    You are viewing courses from a previous semester. These courses are shown for reference only.
                  </Alert>
                )}

                {parseInt(selectedSemester) > studentInfo.semester && (
                  <Alert status="warning" mb={4} borderRadius="md">
                    <AlertIcon />
                    You are viewing courses from a future semester. Registration may not be available yet.
                  </Alert>
                )}

                <Box bg="white" borderRadius="md" overflow="hidden" boxShadow="sm">
                  <Table variant="simple">
                    <Thead bg="gray.50">
                      <Tr>
                        <Th>Code</Th>
                        <Th>Course Name</Th>
                        <Th>Credits</Th>
                        <Th>Status</Th>
                        <Th>Actions</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {filteredCourses.length > 0 ? (
                        filteredCourses.map((course) => (
                          <Tr key={course.id}>
                            <Td fontWeight="medium">{course.code}</Td>
                            <Td>{course.name}</Td>
                            <Td>{course.credits}</Td>
                            <Td>{renderStatusBadge(course.status)}</Td>
                            <Td>
                              <HStack spacing={2}>
                                <Tooltip label="View course details">
                                  <IconButton
                                    aria-label="View details"
                                    icon={<InfoIcon />}
                                    size="sm"
                                    colorScheme="blue"
                                    variant="ghost"
                                    onClick={() => handleViewCourseDetails(course)}
                                  />
                                </Tooltip>
                                {course.status === "available" && (
                                  <Button
                                    size="sm"
                                    colorScheme="blue"
                                    variant="outline"
                                    onClick={() => handleCourseSelection(course.id)}
                                  >
                                    {selectedCourses.includes(course.id) ? "Selected" : "Select"}
                                  </Button>
                                )}
                              </HStack>
                            </Td>
                          </Tr>
                        ))
                      ) : (
                        <Tr>
                          <Td colSpan={5} textAlign="center" py={4}>
                            <Text color="gray.500">No courses found for this semester.</Text>
                          </Td>
                        </Tr>
                      )}
                    </Tbody>
                  </Table>
                </Box>
              </TabPanel>

              {/* Current Courses Tab */}
              <TabPanel p={4}>
                <Grid templateColumns="repeat(12, 1fr)" gap={6}>
                  {enrolledCourses.length > 0 ? (
                    enrolledCourses.map((course) => (
                      <GridItem key={course.id} colSpan={{ base: 12, md: 6, lg: 4 }}>
                        <Card>
                          <CardHeader 
                            bg="blue.50" 
                            borderBottom="1px" 
                            borderColor="gray.200"
                            py={3}
                            px={4}
                          >
                            <Flex justify="space-between" align="center">
                              <Heading size="sm" color="blue.700">{course.code}</Heading>
                              {renderStatusBadge(course.status)}
                            </Flex>
                          </CardHeader>
                          <CardBody p={4}>
                            <Stack spacing={3}>
                              <Heading size="md">{course.name}</Heading>
                              
                              <Box>
                                <Text fontWeight="bold" fontSize="sm" color="gray.600">Professor</Text>
                                <Text>{course.professor}</Text>
                              </Box>
                              
                              <Box>
                                <Text fontWeight="bold" fontSize="sm" color="gray.600">Schedule</Text>
                                <Text>{course.schedule}</Text>
                              </Box>
                              
                              <Box>
                                <Text fontWeight="bold" fontSize="sm" color="gray.600">Room</Text>
                                <Text>{course.room}</Text>
                              </Box>
                              
                              <Box>
                                <Text fontWeight="bold" fontSize="sm" color="gray.600">Credits</Text>
                                <Text>{course.credits} credits</Text>
                              </Box>

                              <Button 
                                colorScheme="blue" 
                                variant="outline" 
                                size="sm"
                                onClick={() => handleViewCourseDetails(course)}
                              >
                                View Details
                              </Button>
                            </Stack>
                          </CardBody>
                        </Card>
                      </GridItem>
                    ))
                  ) : (
                    <GridItem colSpan={12}>
                      <Box textAlign="center" py={8} bg="white" borderRadius="md">
                        <Text color="gray.500">You are not currently enrolled in any courses.</Text>
                      </Box>
                    </GridItem>
                  )}
                </Grid>
              </TabPanel>

              {/* Completed Courses Tab */}
              <TabPanel p={4}>
                <Box bg="white" borderRadius="md" overflow="hidden" boxShadow="sm">
                  <Table variant="simple">
                    <Thead bg="gray.50">
                      <Tr>
                        <Th>Code</Th>
                        <Th>Course Name</Th>
                        <Th>Credits</Th>
                        <Th>Grade</Th>
                        <Th>Status</Th>
                        <Th>Actions</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {completedCourses.length > 0 ? (
                        completedCourses.map((course) => (
                          <Tr key={course.id}>
                            <Td fontWeight="medium">{course.code}</Td>
                            <Td>{course.name}</Td>
                            <Td>{course.credits}</Td>
                            <Td>
                              <Badge 
                                colorScheme={
                                  course.grade?.startsWith('A') ? 'green' : 
                                  course.grade?.startsWith('B') ? 'blue' : 
                                  course.grade?.startsWith('C') ? 'yellow' : 
                                  course.grade?.startsWith('D') ? 'orange' : 'red'
                                }
                                px={2} py={1}
                              >
                                {course.grade}
                              </Badge>
                            </Td>
                            <Td>{renderStatusBadge(course.status)}</Td>
                            <Td>
                              <Button
                                size="sm"
                                colorScheme="blue"
                                variant="ghost"
                                leftIcon={<InfoIcon />}
                                onClick={() => handleViewCourseDetails(course)}
                              >
                                Details
                              </Button>
                            </Td>
                          </Tr>
                        ))
                      ) : (
                        <Tr>
                          <Td colSpan={6} textAlign="center" py={4}>
                            <Text color="gray.500">You have not completed any courses yet.</Text>
                          </Td>
                        </Tr>
                      )}
                    </Tbody>
                  </Table>
                </Box>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </>
      ) : currentView === "history" ? (
        // KRS History View
        <Box bg="white" borderRadius="lg" p={4} boxShadow="sm">
          <Heading size="md" mb={4}>KRS Registration History</Heading>
          
          <Table variant="simple">
            <Thead bg="gray.50">
              <Tr>
                <Th>Academic Year</Th>
                <Th>Semester</Th>
                <Th>Date Submitted</Th>
                <Th>Course Count</Th>
                <Th>Total Credits</Th>
                <Th>Status</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {krsHistory.map((history) => (
                <Tr key={history.id}>
                  <Td>{history.academicYear}</Td>
                  <Td>{history.semester}</Td>
                  <Td>{history.date}</Td>
                  <Td>{history.courseCount} courses</Td>
                  <Td>{history.totalCredits} credits</Td>
                  <Td>{renderKRSStatusBadge(history.status)}</Td>
                  <Td>
                    <HStack spacing={2}>
                      <Button size="sm" colorScheme="blue" variant="ghost" leftIcon={<InfoIcon />}>
                        View Details
                      </Button>
                      <Button size="sm" colorScheme="blue" variant="ghost" leftIcon={<DownloadIcon />}>
                        Export
                      </Button>
                    </HStack>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      ) : (
        // KRS Request View
        <Box>
          <Flex justify="space-between" mb={4}>
            <Heading size="md">KRS Change Requests</Heading>
            <Button colorScheme="blue" leftIcon={<AddIcon />} onClick={onRequestOpen}>
              New Request
            </Button>
          </Flex>

          <Box bg="white" borderRadius="lg" p={4} boxShadow="sm" mb={6}>
            <Text fontWeight="medium" mb={3}>Active Requests</Text>
            
            {krsRequests.length > 0 ? (
              <Table variant="simple">
                <Thead bg="gray.50">
                  <Tr>
                    <Th>Request ID</Th>
                    <Th>Submission Date</Th>
                    <Th>Courses</Th>
                    <Th>Status</Th>
                    <Th>Actions</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {krsRequests.map((request) => (
                    <Tr key={request.id}>
                      <Td fontWeight="medium">{request.id}</Td>
                      <Td>{request.submissionDate}</Td>
                      <Td>{request.courses.length} course(s)</Td>
                      <Td>{renderKRSStatusBadge(request.status)}</Td>
                      <Td>
                        <Button size="sm" colorScheme="blue" variant="ghost" leftIcon={<InfoIcon />}>
                          View Details
                        </Button>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            ) : (
              <Box p={4} textAlign="center" bg="gray.50" borderRadius="md">
                <Text color="gray.500">You have no active KRS change requests.</Text>
              </Box>
            )}
          </Box>

          <Box bg="white" borderRadius="lg" p={4} boxShadow="sm">
            <Accordion allowToggle>
              <AccordionItem border="none">
                <AccordionButton>
                  <Box flex="1" textAlign="left" fontWeight="medium">
                    KRS Change Request Guidelines
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
                <AccordionPanel pb={4}>
                  <VStack align="start" spacing={2}>
                    <Text>1. KRS change requests must be submitted within 2 weeks of the start of the semester.</Text>
                    <Text>2. Students may request to add or drop courses based on availability.</Text>
                    <Text>3. A detailed reason must be provided for all change requests.</Text>
                    <Text>4. Requests are subject to approval by your academic advisor.</Text>
                    <Text>5. You must maintain the minimum credit requirement for your semester.</Text>
                  </VStack>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          </Box>
        </Box>
      )}

      {/* KRS Registration Modal */}
      <Modal isOpen={isKRSModalOpen} onClose={() => setIsKRSModalOpen(false)} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Course Registration (KRS)</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Text mb={4}>
              You are registering for courses for Semester {selectedSemester}, Academic Year {studentInfo.academicYear}.
            </Text>

            <Box mb={4} p={3} borderRadius="md" bg="blue.50">
              <Flex justify="space-between" align="center">
                <Text fontWeight="medium">Selected Credits:</Text>
                <Text fontWeight="bold">
                  {totalSelectedCredits} / {studentInfo.maxCredits} credits
                </Text>
              </Flex>
              <Progress 
                value={(totalSelectedCredits / studentInfo.maxCredits) * 100} 
                size="sm" 
                colorScheme="blue" 
                mt={2} 
                borderRadius="full" 
              />
            </Box>

            <Heading size="sm" mb={3}>Selected Courses</Heading>
            {selectedCourses.length > 0 ? (
              <Table variant="simple" size="sm" mb={4}>
                <Thead bg="gray.50">
                  <Tr>
                    <Th>Code</Th>
                    <Th>Course Name</Th>
                    <Th>Credits</Th>
                    <Th></Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {courses
                    .filter(course => selectedCourses.includes(course.id))
                    .map(course => (
                      <Tr key={course.id}>
                        <Td>{course.code}</Td>
                        <Td>{course.name}</Td>
                        <Td>{course.credits}</Td>
                        <Td>
                          <IconButton
                            aria-label="Remove course"
                            icon={<CloseIcon />}
                            size="xs"
                            colorScheme="red"
                            variant="ghost"
                            onClick={() => handleCourseSelection(course.id)}
                          />
                        </Td>
                      </Tr>
                    ))}
                </Tbody>
              </Table>
            ) : (
              <Box p={4} bg="gray.50" borderRadius="md" mb={4} textAlign="center">
                <Text color="gray.500">No courses selected yet.</Text>
              </Box>
            )}

            <FormControl>
              <FormLabel>Additional Notes (Optional)</FormLabel>
              <Input placeholder="Any special requests or notes" />
            </FormControl>
          </ModalBody>

          <ModalFooter bg="gray.50">
            <Button 
              colorScheme="blue" 
              mr={3} 
              onClick={handleKRSSubmit}
              isDisabled={selectedCourses.length === 0}
            >
              Submit Registration
            </Button>
            <Button onClick={() => setIsKRSModalOpen(false)}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* KRS Request Modal */}
      <Modal isOpen={isRequestOpen} onClose={onRequestClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create KRS Change Request</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Alert status="info" mb={4} borderRadius="md">
              <AlertIcon />
              KRS change requests allow you to add or drop courses after the regular registration period.
            </Alert>

            <FormControl isRequired mb={4}>
              <FormLabel>Request Reason</FormLabel>
              <Input 
                placeholder="Explain why you need to change your KRS"
                value={requestReason}
                onChange={(e) => setRequestReason(e.target.value)}
              />
            </FormControl>

            <FormControl mb={4}>
              <FormLabel>Select Courses to Add/Drop</FormLabel>
              <Box p={4} bg="gray.50" borderRadius="md" mb={2}>
                <Text fontSize="sm" mb={3}>Available Courses:</Text>
                <Table variant="simple" size="sm">
                  <Thead>
                    <Tr>
                      <Th>Code</Th>
                      <Th>Name</Th>
                      <Th>Credits</Th>
                      <Th>Action</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {courses
                      .filter(course => course.status === "available" && course.semester === studentInfo.semester)
                      .slice(0, 5) // Just showing a few for the example
                      .map(course => (
                        <Tr key={course.id}>
                          <Td>{course.code}</Td>
                          <Td>{course.name}</Td>
                          <Td>{course.credits}</Td>
                          <Td>
                            <Button
                              size="xs"
                              colorScheme={selectedCourses.includes(course.id) ? "green" : "blue"}
                              variant={selectedCourses.includes(course.id) ? "solid" : "outline"}
                              onClick={() => handleCourseSelection(course.id)}
                            >
                              {selectedCourses.includes(course.id) ? "Selected" : "Select"}
                            </Button>
                          </Td>
                        </Tr>
                      ))}
                  </Tbody>
                </Table>
              </Box>
            </FormControl>

            <FormControl>
              <FormLabel>Supporting Documents (Optional)</FormLabel>
              <Input type="file" p={1} height="auto" />
              <Text fontSize="xs" color="gray.500" mt={1}>
                You may attach relevant documents to support your request (e.g., medical certificate, advisor approval)
              </Text>
            </FormControl>
          </ModalBody>

          <ModalFooter bg="gray.50">
            <Button 
              colorScheme="blue" 
              mr={3} 
              onClick={handleKRSRequestSubmit}
              isDisabled={requestReason.trim() === "" || selectedCourses.length === 0}
            >
              Submit Request
            </Button>
            <Button onClick={onRequestClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Course Details Drawer */}
      <Drawer
        isOpen={isDrawerOpen}
        placement="right"
        onClose={onDrawerClose}
        size="md"
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">
            {selectedCourseDetails?.code}: {selectedCourseDetails?.name}
          </DrawerHeader>

          <DrawerBody>
            {selectedCourseDetails && (
              <VStack spacing={6} align="stretch">
                <Box>
                  <Flex justify="space-between" align="center">
                    <Badge colorScheme="blue" p={2} borderRadius="md">
                      {selectedCourseDetails.credits} Credits
                    </Badge>
                    {renderStatusBadge(selectedCourseDetails.status)}
                  </Flex>
                </Box>

                <Box>
                  <Text fontWeight="bold" mb={2}>Course Description</Text>
                  <Text>{selectedCourseDetails.description || "No description available."}</Text>
                </Box>

                {selectedCourseDetails.prerequisites && selectedCourseDetails.prerequisites.length > 0 && (
                  <Box>
                    <Text fontWeight="bold" mb={2}>Prerequisites</Text>
                    <HStack spacing={2} wrap="wrap">
                      {selectedCourseDetails.prerequisites.map((prereq) => (
                        <Badge key={prereq} colorScheme="gray" p={2} borderRadius="md">
                          {prereq}
                        </Badge>
                      ))}
                    </HStack>
                  </Box>
                )}

                <Divider />

                <Box>
                  <Text fontWeight="bold" mb={2}>Course Details</Text>
                  <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                    <GridItem>
                      <Text color="gray.600" fontSize="sm">Professor</Text>
                      <Text>{selectedCourseDetails.professor || "TBD"}</Text>
                    </GridItem>
                    <GridItem>
                      <Text color="gray.600" fontSize="sm">Schedule</Text>
                      <Text>{selectedCourseDetails.schedule || "TBD"}</Text>
                    </GridItem>
                    <GridItem>
                      <Text color="gray.600" fontSize="sm">Room</Text>
                      <Text>{selectedCourseDetails.room || "TBD"}</Text>
                    </GridItem>
                    <GridItem>
                      <Text color="gray.600" fontSize="sm">Semester</Text>
                      <Text>{selectedCourseDetails.semester}</Text>
                    </GridItem>
                  </Grid>
                </Box>

                {selectedCourseDetails.status === "completed" && selectedCourseDetails.grade && (
                  <>
                    <Divider />
                    <Box>
                      <Text fontWeight="bold" mb={2}>Course Completion</Text>
                      <Flex align="center">
                        <Text mr={3}>Final Grade:</Text>
                        <Badge 
                          colorScheme={
                            selectedCourseDetails.grade.startsWith('A') ? 'green' : 
                            selectedCourseDetails.grade.startsWith('B') ? 'blue' : 
                            selectedCourseDetails.grade.startsWith('C') ? 'yellow' : 
                            selectedCourseDetails.grade.startsWith('D') ? 'orange' : 'red'
                          }
                          p={2}
                          borderRadius="md"
                          fontSize="md"
                        >
                          {selectedCourseDetails.grade}
                        </Badge>
                      </Flex>
                    </Box>
                  </>
                )}
              </VStack>
            )}
          </DrawerBody>

          <DrawerFooter borderTopWidth="1px">
            <Button variant="outline" mr={3} onClick={onDrawerClose}>
              Close
            </Button>
            {selectedCourseDetails?.status === "available" && (
              <Button 
                colorScheme="blue"
                onClick={() => {
                  handleCourseSelection(selectedCourseDetails.id);
                  onDrawerClose();
                  setIsKRSModalOpen(true);
                }}
              >
                Add to KRS
              </Button>
            )}
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default MU_Course;