import React, { useState } from "react";
import {
  Box,
  Container,
  Heading,
  Text,
  Flex,
  VStack,
  HStack,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  Select,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  useDisclosure,
  FormControl,
  FormLabel,
  Textarea,
  Input,
  Divider,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
} from "@chakra-ui/react";
import { ChevronDownIcon, DownloadIcon } from "@chakra-ui/icons";

interface CourseGradeData {
  id: string;
  code: string;
  name: string;
  class: string;
  credits: number;
  grade: string;
  numericGrade: number;
  status: "active" | "completed";
  assessments?: {
    assignment: number;
    midExam: number;
    finalExam: number;
  };
  semester: string;
  academicYear: string;
}

interface SemesterGPA {
  semester: string;
  academicYear: string;
  gpa: number;
  totalCredits: number;
}

const MU_gradebook: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isProtestOpen,
    onOpen: onProtestOpen,
    onClose: onProtestClose,
  } = useDisclosure();
  const [selectedCourse, setSelectedCourse] = useState<CourseGradeData | null>(null);
  const [protestType, setProtestType] = useState<"midExam" | "finalExam">("midExam");
  const [protestReason, setProtestReason] = useState("");
  const [selectedSemester, setSelectedSemester] = useState("All");
  const [selectedAcademicYear, setSelectedAcademicYear] = useState("All");

  // Sample course grades data
  const coursesData: CourseGradeData[] = [
    {
      id: "CS101",
      code: "CS101",
      name: "Introduction to Programming",
      class: "A",
      credits: 3,
      grade: "A",
      numericGrade: 4.0,
      status: "completed",
      semester: "1",
      academicYear: "2023/2024",
    },
    {
      id: "CS102",
      code: "CS102",
      name: "Data Structures and Algorithms",
      class: "B",
      credits: 4,
      grade: "A-",
      numericGrade: 3.7,
      status: "completed",
      semester: "1",
      academicYear: "2023/2024",
    },
    {
      id: "MA101",
      code: "MA101",
      name: "Calculus I",
      class: "A",
      credits: 3,
      grade: "B+",
      numericGrade: 3.3,
      status: "completed",
      semester: "1",
      academicYear: "2023/2024",
    },
    {
      id: "CS201",
      code: "CS201",
      name: "Object-Oriented Programming",
      class: "A",
      credits: 3,
      grade: "A-",
      numericGrade: 3.7,
      status: "completed",
      semester: "2",
      academicYear: "2023/2024",
    },
    {
      id: "CS202",
      code: "CS202",
      name: "Database Systems",
      class: "B",
      credits: 4,
      grade: "B+",
      numericGrade: 3.3,
      status: "completed",
      semester: "2",
      academicYear: "2023/2024",
    },
    {
      id: "CS301",
      code: "CS301",
      name: "Web Development",
      class: "A",
      credits: 3,
      grade: "",
      numericGrade: 0,
      status: "active",
      assessments: {
        assignment: 85,
        midExam: 78,
        finalExam: 0,
      },
      semester: "3",
      academicYear: "2024/2025",
    },
    {
      id: "CS302",
      code: "CS302",
      name: "Mobile App Development",
      class: "B",
      credits: 4,
      grade: "",
      numericGrade: 0,
      status: "active",
      assessments: {
        assignment: 92,
        midExam: 88,
        finalExam: 0,
      },
      semester: "3",
      academicYear: "2024/2025",
    },
    {
      id: "CS303",
      code: "CS303",
      name: "IT Service & Risk Management",
      class: "A",
      credits: 3,
      grade: "",
      numericGrade: 0,
      status: "active",
      assessments: {
        assignment: 90,
        midExam: 0,
        finalExam: 0,
      },
      semester: "3",
      academicYear: "2024/2025",
    },
  ];

  // Calculate semester GPAs
  const semesterGPAs: SemesterGPA[] = [
    {
      semester: "1",
      academicYear: "2023/2024",
      gpa: 3.70,
      totalCredits: 10,
    },
    {
      semester: "2",
      academicYear: "2023/2024",
      gpa: 3.48,
      totalCredits: 7,
    },
    {
      semester: "3",
      academicYear: "2024/2025",
      gpa: 0,
      totalCredits: 10,
    },
  ];

  // Calculate cumulative GPA
  const calculateCumulativeGPA = () => {
    const completed = coursesData.filter(course => course.status === "completed");
    const totalQualityPoints = completed.reduce(
      (sum, course) => sum + course.numericGrade * course.credits, 
      0
    );
    const totalCredits = completed.reduce((sum, course) => sum + course.credits, 0);
    
    return totalCredits > 0 ? (totalQualityPoints / totalCredits).toFixed(2) : "0.00";
  };

  // Filter courses based on selections
  const filteredCourses = coursesData.filter(course => {
    if (selectedSemester !== "All" && course.semester !== selectedSemester) return false;
    if (selectedAcademicYear !== "All" && course.academicYear !== selectedAcademicYear) return false;
    return true;
  });

  // Active courses (current semester)
  const activeCourses = filteredCourses.filter(course => course.status === "active");
  
  // Completed courses
  const completedCourses = filteredCourses.filter(course => course.status === "completed");

  // Filtered semester GPAs
  const filteredSemesterGPAs = semesterGPAs.filter(sem => {
    if (selectedSemester !== "All" && sem.semester !== selectedSemester) return false;
    if (selectedAcademicYear !== "All" && sem.academicYear !== selectedAcademicYear) return false;
    return true;
  });

  const openCourseDetails = (course: CourseGradeData) => {
    setSelectedCourse(course);
    onOpen();
  };

  const handleProtestRequest = () => {
    if (!selectedCourse) return;
    setProtestReason("");
    onProtestOpen();
  };

  const submitProtestRequest = () => {
    if (!protestReason) {
      alert("Please provide a reason for your score protest");
      return;
    }

    alert(`Score protest for ${protestType === "midExam" ? "Mid Exam" : "Final Exam"} of ${selectedCourse?.name} has been submitted successfully!`);
    onProtestClose();
    onClose();
  };

  const downloadTranscript = () => {
    alert("Transcript is being downloaded.");
  };

  // Check if a score can be protested (assuming protest window is 3 days)
  const canProtest = (examType: "midExam" | "finalExam") => {
    if (!selectedCourse) return false;
    if (selectedCourse.status !== "active") return false;
    
    const assessment = selectedCourse.assessments;
    if (!assessment) return false;
    
    // For demonstration, we'll assume mid exam scores can be protested and final exam scores cannot yet
    if (examType === "midExam") {
      return assessment.midExam > 0;
    } else {
      return assessment.finalExam > 0;
    }
  };

  // Helper function for grade styling
  const getGradeColor = (grade: string) => {
    switch (grade) {
      case "A":
      case "A-":
        return "green.500";
      case "B+":
      case "B":
      case "B-":
        return "blue.500";
      case "C+":
      case "C":
        return "yellow.500";
      case "D":
        return "orange.500";
      case "E":
        return "red.500";
      default:
        return "gray.500";
    }
  };

  return (
    <Container maxW="container.xl" py={8}>
      <Box mb={6}>
        <Heading size="lg" mb={2}>
          Academic Records
        </Heading>
        <Text color="gray.600">
          View your academic performance, grades, and transcripts
        </Text>
      </Box>

      {/* GPA Summary */}
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6} mb={8}>
        <Box
          bg="white"
          p={5}
          borderRadius="lg"
          boxShadow="sm"
          borderWidth="1px"
          borderColor="gray.200"
        >
          <Stat>
            <StatLabel fontSize="sm" color="gray.500">Cumulative GPA</StatLabel>
            <StatNumber fontSize="2xl" fontWeight="bold" color="blue.600">
              {calculateCumulativeGPA()}
            </StatNumber>
            <StatHelpText>
              <StatArrow type="increase" />
              Overall Performance
            </StatHelpText>
          </Stat>
        </Box>
        
        <Box
          bg="white"
          p={5}
          borderRadius="lg"
          boxShadow="sm"
          borderWidth="1px"
          borderColor="gray.200"
        >
          <Stat>
            <StatLabel fontSize="sm" color="gray.500">Total Credits Completed</StatLabel>
            <StatNumber fontSize="2xl" fontWeight="bold" color="green.600">
              {coursesData.filter(c => c.status === "completed").reduce((sum, c) => sum + c.credits, 0)}
            </StatNumber>
            <StatHelpText>
              Credits Earned
            </StatHelpText>
          </Stat>
        </Box>
        
        <Box
          bg="white"
          p={5}
          borderRadius="lg"
          boxShadow="sm"
          borderWidth="1px"
          borderColor="gray.200"
        >
          <Stat>
            <StatLabel fontSize="sm" color="gray.500">Current Semester</StatLabel>
            <StatNumber fontSize="2xl" fontWeight="bold" color="purple.600">
              Semester 3
            </StatNumber>
            <HStack mt={3}>
              <Button 
                size="sm" 
                colorScheme="blue" 
                leftIcon={<DownloadIcon />}
                onClick={downloadTranscript}
              >
                Download Transcript
              </Button>
            </HStack>
          </Stat>
        </Box>
      </SimpleGrid>

      {/* Filters */}
      <Box 
        mb={6} 
        p={4} 
        bg="white" 
        borderRadius="lg" 
        boxShadow="sm"
        borderWidth="1px"
        borderColor="gray.200"
      >
        <Text fontWeight="medium" mb={3}>Filter Records</Text>
        <Flex 
          direction={{ base: "column", md: "row" }} 
          gap={{ base: 3, md: 6 }}
        >
          <FormControl>
            <FormLabel fontSize="sm">Academic Year</FormLabel>
            <Select 
              value={selectedAcademicYear} 
              onChange={(e) => setSelectedAcademicYear(e.target.value)}
              size="sm"
            >
              <option value="All">All Years</option>
              <option value="2024/2025">2024/2025</option>
              <option value="2023/2024">2023/2024</option>
              <option value="2022/2023">2022/2023</option>
            </Select>
          </FormControl>
          
          <FormControl>
            <FormLabel fontSize="sm">Semester</FormLabel>
            <Select 
              value={selectedSemester} 
              onChange={(e) => setSelectedSemester(e.target.value)}
              size="sm"
            >
              <option value="All">All Semesters</option>
              <option value="1">Semester 1</option>
              <option value="2">Semester 2</option>
              <option value="3">Semester 3</option>
              <option value="4">Semester 4</option>
              <option value="5">Semester 5</option>
              <option value="6">Semester 6</option>
              <option value="7">Semester 7</option>
              <option value="8">Semester 8</option>
            </Select>
          </FormControl>
        </Flex>
      </Box>

      <Tabs colorScheme="blue" bg="white" borderRadius="lg" boxShadow="sm" mb={8}>
        <TabList>
          <Tab>Current Semester</Tab>
          <Tab>Academic History</Tab>
          <Tab>Semester GPA</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <Box overflowX="auto">
              <Table variant="simple" size="sm">
                <Thead>
                  <Tr>
                    <Th>Course Code</Th>
                    <Th>Course Name</Th>
                    <Th>Class</Th>
                    <Th>Credits</Th>
                    <Th>Assignment</Th>
                    <Th>Mid Exam</Th>
                    <Th>Final Exam</Th>
                    <Th>Action</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {activeCourses.length > 0 ? (
                    activeCourses.map((course) => (
                      <Tr key={course.id} onClick={() => openCourseDetails(course)} cursor="pointer" _hover={{ bg: "gray.50" }}>
                        <Td fontWeight="medium">{course.code}</Td>
                        <Td>{course.name}</Td>
                        <Td>{course.class}</Td>
                        <Td>{course.credits}</Td>
                        <Td>{course.assessments?.assignment || '-'}</Td>
                        <Td>
                          {course.assessments?.midExam ? (
                            <HStack>
                              <Text>{course.assessments.midExam}</Text>
                              {canProtest("midExam") && (
                                <Badge colorScheme="red" fontSize="xs">Protest</Badge>
                              )}
                            </HStack>
                          ) : '-'}
                        </Td>
                        <Td>
                          {course.assessments?.finalExam ? (
                            <HStack>
                              <Text>{course.assessments.finalExam}</Text>
                              {canProtest("finalExam") && (
                                <Badge colorScheme="red" fontSize="xs">Protest</Badge>
                              )}
                            </HStack>
                          ) : '-'}
                        </Td>
                        <Td>
                          <Button
                            size="xs"
                            colorScheme="blue"
                            onClick={(e) => {
                              e.stopPropagation();
                              openCourseDetails(course);
                            }}
                          >
                            Details
                          </Button>
                        </Td>
                      </Tr>
                    ))
                  ) : (
                    <Tr>
                      <Td colSpan={8} textAlign="center" py={4}>
                        No active courses for the selected filters
                      </Td>
                    </Tr>
                  )}
                </Tbody>
              </Table>
            </Box>
          </TabPanel>

          <TabPanel>
            <Box overflowX="auto">
              <Table variant="simple" size="sm">
                <Thead>
                  <Tr>
                    <Th>Course Code</Th>
                    <Th>Course Name</Th>
                    <Th>Semester</Th>
                    <Th>Academic Year</Th>
                    <Th>Credits</Th>
                    <Th>Grade</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {completedCourses.length > 0 ? (
                    completedCourses.map((course) => (
                      <Tr key={course.id}>
                        <Td fontWeight="medium">{course.code}</Td>
                        <Td>{course.name}</Td>
                        <Td>{course.semester}</Td>
                        <Td>{course.academicYear}</Td>
                        <Td>{course.credits}</Td>
                        <Td color={getGradeColor(course.grade)} fontWeight="bold">{course.grade}</Td>
                      </Tr>
                    ))
                  ) : (
                    <Tr>
                      <Td colSpan={6} textAlign="center" py={4}>
                        No completed courses for the selected filters
                      </Td>
                    </Tr>
                  )}
                </Tbody>
              </Table>
            </Box>
          </TabPanel>

          <TabPanel>
            <Box overflowX="auto">
              <Table variant="simple" size="sm">
                <Thead>
                  <Tr>
                    <Th>Semester</Th>
                    <Th>Academic Year</Th>
                    <Th>Total Credits</Th>
                    <Th>GPA</Th>
                    <Th>Action</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {filteredSemesterGPAs.length > 0 ? (
                    filteredSemesterGPAs.map((sem, index) => (
                      <Tr key={index}>
                        <Td fontWeight="medium">{sem.semester}</Td>
                        <Td>{sem.academicYear}</Td>
                        <Td>{sem.totalCredits}</Td>
                        <Td fontWeight="bold" color={sem.gpa >= 3.5 ? "green.500" : sem.gpa >= 3.0 ? "blue.500" : "gray.600"}>
                          {sem.gpa.toFixed(2)}
                        </Td>
                        <Td>
                          <Button
                            size="xs"
                            leftIcon={<DownloadIcon />}
                            colorScheme="green"
                            variant="outline"
                            onClick={downloadTranscript}
                          >
                            KHS
                          </Button>
                        </Td>
                      </Tr>
                    ))
                  ) : (
                    <Tr>
                      <Td colSpan={5} textAlign="center" py={4}>
                        No GPA data for the selected filters
                      </Td>
                    </Tr>
                  )}
                </Tbody>
              </Table>
            </Box>
          </TabPanel>
        </TabPanels>
      </Tabs>

      {/* Course Details Modal */}
      {selectedCourse && (
        <Modal isOpen={isOpen} onClose={onClose} size="lg">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>{selectedCourse.code} - {selectedCourse.name}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Box mb={4}>
                <SimpleGrid columns={2} spacing={4}>
                  <Box>
                    <Text fontSize="sm" color="gray.500">Course Code</Text>
                    <Text fontWeight="medium">{selectedCourse.code}</Text>
                  </Box>
                  <Box>
                    <Text fontSize="sm" color="gray.500">Class</Text>
                    <Text fontWeight="medium">{selectedCourse.class}</Text>
                  </Box>
                  <Box>
                    <Text fontSize="sm" color="gray.500">Credits</Text>
                    <Text fontWeight="medium">{selectedCourse.credits}</Text>
                  </Box>
                  <Box>
                    <Text fontSize="sm" color="gray.500">Semester</Text>
                    <Text fontWeight="medium">Semester {selectedCourse.semester}, {selectedCourse.academicYear}</Text>
                  </Box>
                </SimpleGrid>
              </Box>
              
              <Divider my={4} />
              
              {selectedCourse.status === "active" ? (
                <Box>
                  <Heading size="sm" mb={2}>Assessment Scores</Heading>
                  <SimpleGrid columns={3} spacing={4} mb={4}>
                    <Box borderWidth="1px" p={3} borderRadius="md" bg="gray.50">
                      <Text fontSize="sm" color="gray.500">Assignments</Text>
                      <Text fontWeight="bold" fontSize="xl">
                        {selectedCourse.assessments?.assignment || "-"}
                        <Text as="span" fontSize="sm" fontWeight="normal"> / 100</Text>
                      </Text>
                    </Box>
                    <Box borderWidth="1px" p={3} borderRadius="md" bg="gray.50">
                      <Text fontSize="sm" color="gray.500">Mid Exam</Text>
                      <HStack>
                        <Text fontWeight="bold" fontSize="xl">
                          {selectedCourse.assessments?.midExam || "-"}
                          <Text as="span" fontSize="sm" fontWeight="normal"> / 100</Text>
                        </Text>
                        {canProtest("midExam") && (
                          <Badge colorScheme="red" cursor="pointer" onClick={() => {
                            setProtestType("midExam");
                            handleProtestRequest();
                          }}>
                            Protest
                          </Badge>
                        )}
                      </HStack>
                    </Box>
                    <Box borderWidth="1px" p={3} borderRadius="md" bg="gray.50">
                      <Text fontSize="sm" color="gray.500">Final Exam</Text>
                      <HStack>
                        <Text fontWeight="bold" fontSize="xl">
                          {selectedCourse.assessments?.finalExam || "-"}
                          <Text as="span" fontSize="sm" fontWeight="normal"> / 100</Text>
                        </Text>
                        {canProtest("finalExam") && (
                          <Badge colorScheme="red" cursor="pointer" onClick={() => {
                            setProtestType("finalExam");
                            handleProtestRequest();
                          }}>
                            Protest
                          </Badge>
                        )}
                      </HStack>
                    </Box>
                  </SimpleGrid>
                  
                  <Box borderWidth="1px" p={4} borderRadius="md" mt={4}>
                    <Heading size="sm" mb={2}>Grade Breakdown</Heading>
                    <Text fontSize="sm" mb={3}>
                      Your final grade will be calculated using the following weights:
                    </Text>
                    <SimpleGrid columns={3} spacing={4}>
                      <Box>
                        <Text fontSize="sm" color="gray.500">Assignments</Text>
                        <Text fontWeight="medium">30%</Text>
                      </Box>
                      <Box>
                        <Text fontSize="sm" color="gray.500">Mid Exam</Text>
                        <Text fontWeight="medium">30%</Text>
                      </Box>
                      <Box>
                        <Text fontSize="sm" color="gray.500">Final Exam</Text>
                        <Text fontWeight="medium">40%</Text>
                      </Box>
                    </SimpleGrid>
                  </Box>
                </Box>
              ) : (
                <Box>
                  <Heading size="sm" mb={2}>Final Grade</Heading>
                  <HStack spacing={6}>
                    <Box borderWidth="1px" p={4} borderRadius="md" flex={1} bg="gray.50">
                      <Text fontSize="sm" color="gray.500">Letter Grade</Text>
                      <Text fontWeight="bold" fontSize="2xl" color={getGradeColor(selectedCourse.grade)}>
                        {selectedCourse.grade}
                      </Text>
                    </Box>
                    <Box borderWidth="1px" p={4} borderRadius="md" flex={1} bg="gray.50">
                      <Text fontSize="sm" color="gray.500">Numeric Grade</Text>
                      <Text fontWeight="bold" fontSize="2xl">
                        {selectedCourse.numericGrade.toFixed(1)}
                      </Text>
                    </Box>
                    <Box borderWidth="1px" p={4} borderRadius="md" flex={1} bg="gray.50">
                      <Text fontSize="sm" color="gray.500">Quality Points</Text>
                      <Text fontWeight="bold" fontSize="2xl">
                        {(selectedCourse.numericGrade * selectedCourse.credits).toFixed(1)}
                      </Text>
                    </Box>
                  </HStack>
                </Box>
              )}
            </ModalBody>

            <ModalFooter>
              <Button variant="ghost" mr={3} onClick={onClose}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}

      {/* Score Protest Modal */}
      <Modal isOpen={isProtestOpen} onClose={onProtestClose} size="md">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Score Protest Request</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4} align="stretch">
              <Box>
                <Text fontWeight="medium">{selectedCourse?.code} - {selectedCourse?.name}</Text>
                <Text fontSize="sm" color="gray.500">
                  Protesting {protestType === "midExam" ? "Mid Exam" : "Final Exam"} score
                </Text>
              </Box>
              
              <FormControl isRequired>
                <FormLabel>Reason for Score Protest</FormLabel>
                <Textarea 
                  placeholder="Please explain why you believe your score should be reconsidered..." 
                  value={protestReason}
                  onChange={(e) => setProtestReason(e.target.value)}
                  rows={5}
                />
              </FormControl>
              
              <Box borderWidth="1px" borderRadius="md" p={3} bg="yellow.50">
                <Text fontSize="sm" color="yellow.700">
                  Note: Score protests must be submitted within 3 days of grade publication. 
                  Please provide specific reasons why you believe your score should be reconsidered.
                </Text>
              </Box>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onProtestClose}>
              Cancel
            </Button>
            <Button 
              colorScheme="blue" 
              onClick={submitProtestRequest}
              isDisabled={!protestReason}
            >
              Submit Protest
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default MU_gradebook;