import React from "react";
import {
  Box,
  Container,
  Heading,
  Text,
  Flex,
  VStack,
  HStack,
  Button,
  Badge,
  SimpleGrid,
  Progress,
  Divider,
  Link,
  Grid,
  GridItem
} from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";

const MU_dashboard: React.FC = () => {
  // Sample student data
  const studentData = {
    name: "Admin LMS",
    nim: "12345678",
    program: "Information Technology",
    semester: "3",
    academicYear: "2024/2025",
    status: "Active",
    advisor: "Dr. Robert Johnson",
    currentIPK: 3.72,
    skbtnPoints: 50,
    creditsCompleted: 72,
    totalCredits: 144,
  };

  // Sample course completion data
  const courseCompletionData = {
    passed: 15,
    inProgress: 3,
    failed: 0,
    remaining: 30,
  };

  // Sample announcements
  const announcements = [
    {
      id: 1,
      title: "Midterm Exam Schedule",
      date: "April 15, 2025",
    },
    {
      id: 2,
      title: "New Laboratory Guidelines",
      date: "April 10, 2025",
    },
    {
      id: 3,
      title: "Registration for Exchange Program",
      date: "April 8, 2025",
    },{
      id: 4,
      title: "Tasha Ketabrak lalat",
      date: "April 8, 2025",
    },
    {
      id: 5,
      title: "Micel Ketabrak Semut",
      date: "April 8, 2025",
    },
    {
      id: 6,
      title: "Micel Ketabrak Kucing",
      date: "April 8, 2025",
    },
    {
      id: 7,
      title: "Tasha Ketabrak Nyamuk",
      date: "April 8, 2025",
    },
  ];

  // Sample recent courses
  const recentCourses = [
    {
      id: "CS101",
      code: "CS101",
      title: "Introduction to Programming",
      progress: 75,
      lastAccessed: "Today, 09:45",
    },
    {
      id: "CS102",
      code: "CS102",
      title: "Digital Banking",
      progress: 60,
      lastAccessed: "Yesterday, 14:30",
    },
    {
      id: "CS103",
      code: "CS103",
      title: "IT Service & Risk Management",
      progress: 45,
      lastAccessed: "2 days ago, 10:15",
    },
    {
      id: "CS104",
      code: "CS104",
      title: "UX Research Methods",
      progress: 80,
      lastAccessed: "3 days ago, 11:20",
    },
    {
      id: "CS105",
      code: "CS105",
      title: "Web Development",
      progress: 65,
      lastAccessed: "4 days ago, 15:10",
    },
  ];

  // Sample upcoming events
  const upcomingEvents = [
    {
      id: 1,
      title: "Digital Banking Seminar",
      date: "April 15, 2025",
      time: "09:00 - 12:00",
      location: "Auditorium Hall",
      type: "SEMINAR",
    },
    {
      id: 2,
      title: "Career Fair 2025",
      date: "May 5, 2025",
      time: "09:00 - 17:00",
      location: "University Arena",
      type: "CAREER",
    },
    {
      id: 3,
      title: "Research Symposium",
      date: "May 18, 2025",
      time: "13:00 - 17:00",
      location: "Science Building",
      type: "ACADEMIC",
    },
    {
      id: 4,
      title: "Hackathon 2025",
      date: "June 1-2, 2025",
      time: "48-hour event",
      location: "Tech Hub",
      type: "COMPETITION",
    },
  ];

  return (
    <Container maxW="container.xl" py={8}>
      <Box mb={6}>
        <Heading size="lg" mb={2}>
          My University
        </Heading>
        <Text color="gray.600">
          Manage your academic information and university services
        </Text>
      </Box>

      {/* Main Grid Layout */}
      <Grid 
        templateColumns={{ base: "1fr", lg: "repeat(2, 1fr)" }}
        templateRows={{ base: "auto auto auto auto", lg: "auto auto auto" }}
        gap={6}
      >
        {/* Student Profile */}
        <GridItem>
          <Box
            bg="white"
            p={6}
            borderRadius="lg"
            boxShadow="sm"
            borderWidth="1px"
            borderColor="gray.200"
            height="100%"
          >
            <Flex mb={4}>
              <Box
                width="60px"
                height="60px"
                borderRadius="md"
                bg="blue.100"
                color="blue.700"
                fontSize="24px"
                fontWeight="bold"
                display="flex"
                alignItems="center"
                justifyContent="center"
                mr={4}
              >
                AL
              </Box>
              <Box flex={1}>
                <Heading size="md" mb={1}>
                  Admin LMS
                </Heading>
                <Text color="gray.600" fontSize="sm">
                  NIM: 12345678
                </Text>
                <Text color="gray.600" fontSize="sm">
                  Information Technology
                </Text>
              </Box>
            </Flex>

            <SimpleGrid columns={2} spacing={4} mb={4}>
              <Box>
                <Text fontSize="sm" color="gray.500">Semester</Text>
                <Text fontWeight="medium">3 (2024/2025)</Text>
              </Box>
              <Box>
                <Text fontSize="sm" color="gray.500">Status</Text>
                <Badge colorScheme="green">ACTIVE</Badge>
              </Box>
              <Box>
                <Text fontSize="sm" color="gray.500">Current IPK</Text>
                <Text fontWeight="medium">3.72</Text>
              </Box>
              <Box>
                <Text fontSize="sm" color="gray.500">SKBTN Points</Text>
                <Text fontWeight="medium">50</Text>
              </Box>
            </SimpleGrid>

            <Box mb={4}>
              <Text fontSize="sm" color="gray.500">Academic Advisor</Text>
              <Text fontWeight="medium">Dr. Robert Johnson</Text>
            </Box>

            <Link color="blue.500" fontSize="sm" href="#" display="flex" alignItems="center">
              View complete profile <ArrowForwardIcon ml={1} />
            </Link>
          </Box>
        </GridItem>

        {/* Academic Progress */}
        <GridItem>
          <Box
            bg="white"
            p={6}
            borderRadius="lg"
            boxShadow="sm"
            borderWidth="1px"
            borderColor="gray.200"
            height="100%"
          >
            <Heading size="md" mb={4}>
              Academic Progress
            </Heading>

            <Flex mb={4} justify="space-between">
              <Box>
                <Text fontSize="sm" color="gray.500">Current IPK</Text>
                <HStack spacing={1} align="baseline">
                  <Text fontSize="2xl" fontWeight="bold" color="blue.600">3.72</Text>
                  <Text fontSize="sm" color="gray.500">/4.00</Text>
                </HStack>
              </Box>
              <Box>
                <Text fontSize="sm" color="gray.500">Credits Completed</Text>
                <HStack spacing={1} align="baseline">
                  <Text fontSize="2xl" fontWeight="bold" color="green.600">72</Text>
                  <Text fontSize="sm" color="gray.500">/144</Text>
                </HStack>
              </Box>
            </Flex>

            <Box mb={4}>
              <Text fontSize="sm" mb={1}>Semester 3 of 8</Text>
              <Progress value={50} size="sm" colorScheme="blue" borderRadius="full" />
            </Box>

            <Heading size="xs" mb={3}>Course Completion</Heading>
            <SimpleGrid columns={4} spacing={2} mb={4}>
              <Box p={2} bg="green.50" borderRadius="md" textAlign="center">
                <Text fontSize="lg" fontWeight="bold" color="green.500">15</Text>
                <Text fontSize="xs" color="green.500">Passed</Text>
              </Box>
              <Box p={2} bg="yellow.50" borderRadius="md" textAlign="center">
                <Text fontSize="lg" fontWeight="bold" color="yellow.500">3</Text>
                <Text fontSize="xs" color="yellow.500">In Progress</Text>
              </Box>
              <Box p={2} bg="red.50" borderRadius="md" textAlign="center">
                <Text fontSize="lg" fontWeight="bold" color="red.500">0</Text>
                <Text fontSize="xs" color="red.500">Failed</Text>
              </Box>
              <Box p={2} bg="blue.50" borderRadius="md" textAlign="center">
                <Text fontSize="lg" fontWeight="bold" color="blue.500">30</Text>
                <Text fontSize="xs" color="blue.500">Remaining</Text>
              </Box>
            </SimpleGrid>

            <Link color="blue.500" fontSize="sm" href="#" display="flex" alignItems="center">
              View detailed progress <ArrowForwardIcon ml={1} />
            </Link>
          </Box>
        </GridItem>

        {/* Recent Courses */}
        <GridItem>
          <Box
            bg="white"
            p={6}
            borderRadius="lg"
            boxShadow="sm"
            borderWidth="1px"
            borderColor="gray.200"
            height="100%"
            overflowY="auto"
            maxHeight="400px"
          >
            <Heading size="md" mb={4}>
              Recent Courses
            </Heading>

            <VStack spacing={3} align="stretch" mb={3}>
              {recentCourses.map((course, index) => (
                <Box key={course.id}>
                  <Flex justify="space-between" mb={1}>
                    <Text fontWeight="medium" fontSize="sm">{course.title}</Text>
                    <Badge size="sm" colorScheme="blue">{course.code}</Badge>
                  </Flex>
                  <Text fontSize="xs" color="gray.500" mb={1}>
                    Last accessed: {course.lastAccessed}
                  </Text>
                  <Flex justify="space-between" align="center" mb={1}>
                    <Progress 
                      value={course.progress} 
                      size="xs" 
                      colorScheme="green" 
                      borderRadius="full"
                      flex="1"
                      mr={2}
                    />
                    <Text fontSize="xs" color="gray.500">
                      {course.progress}%
                    </Text>
                  </Flex>
                  {index < recentCourses.length - 1 && <Divider mt={2} />}
                </Box>
              ))}
            </VStack>

            <Link color="blue.500" fontSize="sm" href="#" display="flex" alignItems="center">
              View all courses <ArrowForwardIcon ml={1} />
            </Link>
          </Box>
        </GridItem>

        {/* Latest Announcements */}
<GridItem>
  <Box
    bg="white"
    p={6}
    borderRadius="lg"
    boxShadow="sm"
    borderWidth="1px"
    borderColor="gray.200"
    height="100%"
  >
    <Heading size="md" mb={4}>
      Latest Announcements
    </Heading>
    <Box 
      overflowY="auto" 
      maxHeight="300px" 
      css={{
        '&::-webkit-scrollbar': {
          width: '4px',
        },
        '&::-webkit-scrollbar-track': {
          background: '#f1f1f1',
          borderRadius: '4px',
        },
        '&::-webkit-scrollbar-thumb': {
          background: '#CBD5E0',
          borderRadius: '4px',
        },
        '&::-webkit-scrollbar-thumb:hover': {
          background: '#A0AEC0',
        },
      }}
    >
      <VStack spacing={4} align="stretch">
        {announcements.map((announcement, index) => (
          <Box key={announcement.id}>
            <Flex>
              <Box
                width="24px"
                height="24px"
                borderRadius="full"
                bg="blue.50"
                color="blue.500"
                fontSize="xs"
                fontWeight="bold"
                display="flex"
                alignItems="center"
                justifyContent="center"
                mr={3}
              >
                {index + 1}
              </Box>
              <Box>
                <Text fontWeight="medium" fontSize="sm">{announcement.title}</Text>
                <Text fontSize="xs" color="gray.500">
                  {announcement.date}
                </Text>
              </Box>
            </Flex>
            {index < announcements.length - 1 && <Divider mt={3} />}
          </Box>
        ))}
      </VStack>
    </Box>
  </Box>
</GridItem>

        {/* Upcoming Events - Horizontal Layout with Scroll */}
        <GridItem colSpan={{ base: 1, lg: 2 }}>
          <Box
            bg="white"
            p={6}
            borderRadius="lg"
            boxShadow="sm"
            borderWidth="1px"
            borderColor="gray.200"
          >
            <Flex justify="space-between" align="center" mb={4}>
              <Heading size="md">
                Upcoming Events
              </Heading>
              <Link color="blue.500" fontSize="sm" href="#" display="flex" alignItems="center">
                View all events <ArrowForwardIcon ml={1} />
              </Link>
            </Flex>
            
            <Box 
              overflowX="auto" 
              css={{
                "&::-webkit-scrollbar": {
                  height: "8px",
                },
                "&::-webkit-scrollbar-track": {
                  background: "#f1f1f1",
                  borderRadius: "4px",
                },
                "&::-webkit-scrollbar-thumb": {
                  background: "#cbd5e0",
                  borderRadius: "4px",
                },
                "&::-webkit-scrollbar-thumb:hover": {
                  background: "#a0aec0",
                },
                scrollbarWidth: "thin",
                scrollbarColor: "#cbd5e0 #f1f1f1",
              }}
            >
              <Flex minWidth="min-content" pb={2}>
                {upcomingEvents.map((event) => (
                  <Box
                    key={event.id}
                    borderWidth="1px"
                    borderRadius="md"
                    p={4}
                    minWidth="300px"
                    mr={4}
                    _hover={{ bg: "gray.50" }}
                    cursor="pointer"
                  >
                    <Flex justify="space-between" align="flex-start" mb={3}>
                      <Heading size="sm" noOfLines={1}>{event.title}</Heading>
                      <Badge
                        colorScheme={
                          event.type === "SEMINAR"
                            ? "blue"
                            : event.type === "CAREER"
                            ? "orange"
                            : event.type === "COMPETITION"
                            ? "purple"
                            : "teal"
                        }
                        fontSize="xs"
                      >
                        {event.type}
                      </Badge>
                    </Flex>
                    
                    <VStack align="start" spacing={1} mb={3}>
                      <Flex align="center">
                        <Text fontSize="xs" color="gray.600" mr={1}>📅</Text>
                        <Text fontSize="sm">{event.date}</Text>
                      </Flex>
                      <Flex align="center">
                        <Text fontSize="xs" color="gray.600" mr={1}>🕒</Text>
                        <Text fontSize="sm">{event.time}</Text>
                      </Flex>
                      <Flex align="center">
                        <Text fontSize="xs" color="gray.600" mr={1}>📍</Text>
                        <Text fontSize="sm" noOfLines={1}>{event.location}</Text>
                      </Flex>
                    </VStack>
                    
                    <Flex justify="space-between">
                      <Button size="xs" colorScheme="blue" variant="outline">
                        Details
                      </Button>
                      <Button size="xs" colorScheme="green">
                        Join
                      </Button>
                    </Flex>
                  </Box>
                ))}
              </Flex>
            </Box>
          </Box>
        </GridItem>
      </Grid>
    </Container>
  );
};

export default MU_dashboard;