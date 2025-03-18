import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Box,
  Flex,
  Text,
  Heading,
  Button,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Tabs,
  TabList,
  Tab,
  Avatar,
  Progress,
  HStack,
  VStack,
  Badge,
  ButtonGroup,
  Input,
  InputGroup,
  InputRightAddon,
  IconButton
} from '@chakra-ui/react';
import {
  ChevronRightIcon,
  ArrowBackIcon,
  ChatIcon,
  PlusSquareIcon,
  ChevronUpIcon,
  ChevronDownIcon,
  ArrowForwardIcon,
  AddIcon
} from '@chakra-ui/icons';

// Define interfaces for type safety
interface Instructor {
  id: string;
  name: string;
  avatarUrl: string;
  role: string;
}

interface Student {
  id: string;
  name: string;
  avatarUrl: string;
  studentId: string;
}

interface SessionStatus {
  id: string;
  number: number;
  title: string;
  status: 'Passed' | 'Overdue' | 'Failed' | 'In Progress' | 'Not Started';
}

interface ForumThread {
  id: string;
  title: string;
  author: Instructor;
  date: string;
  replies: number;
  views: number;
  sessionNumber: number;
  status: 'Passed' | 'Not Passed';
}

interface ForumReply {
  id: string;
  author: Instructor | Student;
  content: string;
  date: string;
  time: string;
  isPassed?: boolean;
  isPresent?: boolean;
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
    overdue: number;
    failed: number;
    notStarted: number;
  };
}

const Forum: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const [activeTab, setActiveTab] = useState(2); // Forum tab (index 2)
  const [selectedThreadId, setSelectedThreadId] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [viewFilter, setViewFilter] = useState('class');
  
  // Mock data for the course
  const course: Course = {
    id: '1',
    code: 'LB2123',
    title: 'IT Service & Risk Management',
    category: 'IT',
    instructors: [
      {
        id: '101',
        name: 'Joni Zimbatima',
        avatarUrl: 'https://placehold.co/32x32?text=JZ',
        role: 'Lecturer'
      },
      {
        id: '102',
        name: 'Alan Russ',
        avatarUrl: 'https://placehold.co/32x32?text=AR',
        role: 'Lecturer'
      }
    ],
    distribution: {
      passed: 20,
      inProgress: 15,
      overdue: 5,
      failed: 10,
      notStarted: 30
    }
  };
  
  // Mock data for forum threads
  const forumThreads: ForumThread[] = [
    {
      id: '1',
      title: 'Session 1 Attendance Absence',
      author: {
        id: '101',
        name: 'Joni Zimbatima',
        avatarUrl: 'https://placehold.co/32x32?text=JZ',
        role: 'Lecturer'
      },
      date: '11 March 2025',
      replies: 24,
      views: 48,
      sessionNumber: 1,
      status: 'Passed'
    },
    {
      id: '2',
      title: 'Session 2 Attendance Absence',
      author: {
        id: '101',
        name: 'Joni Zimbatima',
        avatarUrl: 'https://placehold.co/32x32?text=JZ',
        role: 'Lecturer'
      },
      date: '18 March 2025',
      replies: 18,
      views: 36,
      sessionNumber: 2,
      status: 'Passed'
    },
    {
      id: '3',
      title: 'Session 3 Attendance Absence',
      author: {
        id: '101',
        name: 'Joni Zimbatima',
        avatarUrl: 'https://placehold.co/32x32?text=JZ',
        role: 'Lecturer'
      },
      date: '25 March 2025',
      replies: 15,
      views: 30,
      sessionNumber: 3,
      status: 'Passed'
    }
  ];
  
  // Mock data for forum replies (detail view)
  const forumReplies: Record<string, ForumReply[]> = {
    '1': [
      {
        id: 'r1',
        author: {
          id: '101',
          name: 'Joni Zimbatima',
          avatarUrl: 'https://placehold.co/32x32?text=JZ',
          role: 'Lecturer'
        },
        content: 'Session 1 Attendance Absence',
        date: '11 March 2025',
        time: '09:24',
        isPassed: true
      },
      {
        id: 'r2',
        author: {
          id: 's1',
          name: 'Devon Lane',
          avatarUrl: 'https://placehold.co/32x32?text=DL',
          studentId: '1354'
        },
        content: 'Present',
        date: '11 March 2025',
        time: '09:24',
        isPresent: true
      },
      {
        id: 'r3',
        author: {
          id: 's2',
          name: 'Jacob Jones',
          avatarUrl: 'https://placehold.co/32x32?text=JJ',
          studentId: '2142'
        },
        content: 'Present',
        date: '11 March 2025',
        time: '09:24',
        isPresent: true
      },
      {
        id: 'r4',
        author: {
          id: 's3',
          name: 'Jerome Bell',
          avatarUrl: 'https://placehold.co/32x32?text=JB',
          studentId: '4564'
        },
        content: 'Present',
        date: '11 March 2025',
        time: '09:24',
        isPresent: true
      },
      {
        id: 'r5',
        author: {
          id: 's4',
          name: 'Esther Howard',
          avatarUrl: 'https://placehold.co/32x32?text=EH',
          studentId: '7845'
        },
        content: 'Present',
        date: '11 March 2025',
        time: '09:24',
        isPresent: true
      },
      {
        id: 'r6',
        author: {
          id: 's5',
          name: 'Jane Cooper',
          avatarUrl: 'https://placehold.co/32x32?text=JC',
          studentId: '7656'
        },
        content: 'Present',
        date: '11 March 2025',
        time: '09:24',
        isPresent: true
      },
      {
        id: 'r7',
        author: {
          id: 's6',
          name: 'Marvin McKinney',
          avatarUrl: 'https://placehold.co/32x32?text=MM',
          studentId: '4544'
        },
        content: 'Present',
        date: '11 March 2025',
        time: '09:24',
        isPresent: true
      }
    ]
  };
  
  // Mock sessions list for sidebar
  const sessionsList: SessionStatus[] = [
    { id: '1', number: 1, title: 'Session 1', status: 'Passed' },
    { id: '2', number: 2, title: 'Session 2', status: 'Passed' },
    { id: '3', number: 3, title: 'Session 3', status: 'Passed' },
    { id: '4', number: 4, title: 'Session 4', status: 'Passed' },
    { id: '5', number: 5, title: 'Session 5', status: 'Overdue' },
    { id: '6', number: 6, title: 'Session 6', status: 'Failed' },
    { id: '7', number: 7, title: 'Session 7', status: 'Failed' },
    { id: '8', number: 8, title: 'Session 8', status: 'In Progress' },
    { id: '9', number: 9, title: 'Session 9', status: 'Not Started' },
    { id: '10', number: 10, title: 'Session 10', status: 'Not Started' },
    { id: '11', number: 11, title: 'Session 11', status: 'Not Started' },
    { id: '12', number: 12, title: 'Session 12', status: 'Not Started' },
    { id: '13', number: 13, title: 'Session 13', status: 'Not Started' }
  ];

  // Handle send message
  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // In a real app, you would send this to your backend
      console.log('Sending message:', newMessage);
      setNewMessage('');
    }
  };
  
  // Function to get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Passed': return 'green';
      case 'In Progress': return 'blue';
      case 'Overdue': return 'red';
      case 'Failed': return 'yellow';
      default: return 'gray';
    }
  };
  
  // Get thread detail
  const selectedThread = selectedThreadId 
    ? forumThreads.find(thread => thread.id === selectedThreadId) 
    : null;
  
  // Get replies for the selected thread
  const threadReplies = selectedThreadId && forumReplies[selectedThreadId] 
    ? forumReplies[selectedThreadId] 
    : [];
  
  return (
    <Box bg="gray.50" w="full" overflowX="hidden">
      {/* Main layout */}
      <Flex maxH="calc(100vh - 57px)" w="full">
        {/* Content wrapper - takes full width */}
        <Box flex="1" position="relative" overflowY="auto" overflowX="hidden">
          {/* Course breadcrumb and header */}
          <Box bg="white" borderBottomWidth="1px" borderBottomColor="gray.200">
            <Box px={6} py={2}>
              <Breadcrumb separator={<ChevronRightIcon color="gray.500" />} fontSize="sm">
                <BreadcrumbItem>
                  <BreadcrumbLink as={Link} to="/courses">Course</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbItem>
                  <BreadcrumbLink as={Link} to={`/courses`}>IT Service & Risk Management</BreadcrumbLink>
                </BreadcrumbItem>
                {selectedThreadId && selectedThread && (
                  <BreadcrumbItem>
                    <BreadcrumbLink as={Link} to={`/course/${courseId}/forum/${selectedThreadId}`}>
                      {selectedThread.title}
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                )}
              </Breadcrumb>
            </Box>
            
            {/* Back button */}
            <Box px={6} py={2}>
              <Button 
                variant="ghost" 
                size="sm" 
                leftIcon={<ArrowBackIcon />} 
                as={Link}
                to={'/courses'}
              >
                IT Service & Risk Management
              </Button>
            </Box>
            
            {/* Course title and code */}
            <Box px={6} py={2}>
              <Flex alignItems="center">
                <Box 
                  bg="blue.500" 
                  color="white" 
                  borderRadius="md" 
                  p={2} 
                  fontSize="sm" 
                  fontWeight="bold"
                  mr={2}
                >
                  C
                </Box>
                <Text fontWeight="medium" mr={2}>Course</Text>
                <Text color="gray.500">{course.code}</Text>
              </Flex>
              <Heading as="h1" size="lg" mt={2} mb={3}>
                IT Service & Risk Management
              </Heading>
              
              {/* Instructors */}
              <Flex align="center" mb={3}>
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
              
              {/* Session progress bar */}
              <Box position="relative" mb={1}>
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
                  <Box width={`${course.distribution.passed}%`} bg="green.600" borderLeftRadius="full" />
                  <Box width={`${course.distribution.inProgress}%`} bg="blue.500" />
                  <Box width={`${course.distribution.overdue}%`} bg="red.500" />
                  <Box width={`${course.distribution.failed}%`} bg="yellow.400" />
                  <Box width={`${course.distribution.notStarted}%`} bg="gray.400" borderRightRadius="full" />
                </Flex>
              </Box>
              
              {/* Legend */}
              <Flex
                justifyContent="flex-start"
                fontSize="xs"
                color="gray.600"
                mb={2}
                flexWrap="wrap"
              >
                <HStack mr={4} mb={1}>
                  <Box w="2" h="2" bg="green.600" borderRadius="full" />
                  <Text>Passed</Text>
                </HStack>
                <HStack mr={4} mb={1}>
                  <Box w="2" h="2" bg="blue.500" borderRadius="full" />
                  <Text>In Progress</Text>
                </HStack>
                <HStack mr={4} mb={1}>
                  <Box w="2" h="2" bg="red.500" borderRadius="full" />
                  <Text>Overdue</Text>
                </HStack>
                <HStack mr={4} mb={1}>
                  <Box w="2" h="2" bg="yellow.400" borderRadius="full" />
                  <Text>Failed</Text>
                </HStack>
                <HStack mb={1}>
                  <Box w="2" h="2" bg="gray.400" borderRadius="full" />
                  <Text>Not Started</Text>
                </HStack>
              </Flex>
              
              {/* Tabs for course navigation */}
              <Box borderBottomWidth="1px" borderBottomColor="gray.200">
                <Tabs index={activeTab} onChange={setActiveTab} variant="unstyled">
                  <TabList>
                    <Tab 
                      _selected={{ color: 'blue.500', borderBottomWidth: '3px', borderBottomColor: 'blue.500' }}
                      fontWeight="medium"
                      px={4}
                      py={3}
                      as={Link}
                      to={`/course/${courseId}/session/1`}
                    >
                      <Box as="span" mr={2}>
                        <Box as="span" fontSize="md">📄</Box>
                      </Box>
                      Session
                    </Tab>
                    <Tab 
                      _selected={{ color: 'blue.500', borderBottomWidth: '3px', borderBottomColor: 'blue.500' }}
                      fontWeight="medium"
                      px={4}
                      py={3}
                      as={Link}
                      to={`/course/${courseId}/syllabus`}
                    >
                      <Box as="span" mr={2}>
                        <Box as="span" fontSize="md">📘</Box>
                      </Box>
                      Syllabus
                    </Tab>
                    <Tab 
                      _selected={{ color: 'blue.500', borderBottomWidth: '3px', borderBottomColor: 'blue.500' }}
                      fontWeight="medium"
                      px={4}
                      py={3}
                      color="blue.500"
                      borderBottomWidth="3px"
                      borderBottomColor="blue.500"
                    >
                      <Box as="span" mr={2}>
                        <Box as="span" fontSize="md">💬</Box>
                      </Box>
                      Forum
                    </Tab>
                    <Tab 
                      _selected={{ color: 'blue.500', borderBottomWidth: '3px', borderBottomColor: 'blue.500' }}
                      fontWeight="medium"
                      px={4}
                      py={3}
                      as={Link}
                      to={`/course/${courseId}/assessment`}
                    >
                      <Box as="span" mr={2}>
                        <Box as="span" fontSize="md">📝</Box>
                      </Box>
                      Assessment
                    </Tab>
                    <Tab 
                      _selected={{ color: 'blue.500', borderBottomWidth: '3px', borderBottomColor: 'blue.500' }}
                      fontWeight="medium"
                      px={4}
                      py={3}
                      as={Link}
                      to={`/course/${courseId}/gradebook`}
                    >
                      <Box as="span" mr={2}>
                        <Box as="span" fontSize="md">📊</Box>
                      </Box>
                      Gradebook
                    </Tab>
                    <Tab 
                      _selected={{ color: 'blue.500', borderBottomWidth: '3px', borderBottomColor: 'blue.500' }}
                      fontWeight="medium"
                      px={4}
                      py={3}
                      as={Link}
                      to={`/course/${courseId}/rubric`}
                    >
                      <Box as="span" mr={2}>
                        <Box as="span" fontSize="md">📋</Box>
                      </Box>
                      Assessment Rubric
                    </Tab>
                    <Tab 
                      _selected={{ color: 'blue.500', borderBottomWidth: '3px', borderBottomColor: 'blue.500' }}
                      fontWeight="medium"
                      px={4}
                      py={3}
                      as={Link}
                      to={`/course/${courseId}/people`}
                    >
                      <Box as="span" mr={2}>
                        <Box as="span" fontSize="md">👥</Box>
                      </Box>
                      People
                    </Tab>
                    <Tab 
                      _selected={{ color: 'blue.500', borderBottomWidth: '3px', borderBottomColor: 'blue.500' }}
                      fontWeight="medium"
                      px={4}
                      py={3}
                      as={Link}
                      to={`/course/${courseId}/attendance`}
                    >
                      <Box as="span" mr={2}>
                        <Box as="span" fontSize="md">📅</Box>
                      </Box>
                      Attendance
                    </Tab>
                  </TabList>
                </Tabs>
              </Box>
            </Box>
          </Box>
          
          {/* Forum Content */}
          {!selectedThreadId ? (
            // Forum threads list view
            <Box p={6}>
              {/* Forum header with view filters and create thread button */}
              <Flex justify="space-between" mb={6}>
                <ButtonGroup size="sm" isAttached variant="outline">
                  <Button
                    colorScheme={viewFilter === 'class' ? 'blue' : 'gray'}
                    onClick={() => setViewFilter('class')}
                  >
                    Class
                  </Button>
                  <Button
                    colorScheme={viewFilter === 'group' ? 'blue' : 'gray'}
                    onClick={() => setViewFilter('group')}
                  >
                    Group
                  </Button>
                </ButtonGroup>
                
                <Button
                  colorScheme="blue"
                  leftIcon={<PlusSquareIcon />}
                  size="sm"
                >
                  Create Thread
                </Button>
              </Flex>
              
              {/* Forum threads list */}
              <VStack spacing={4} align="stretch">
                {forumThreads.map(thread => (
                  <Box
                    key={thread.id}
                    p={4}
                    bg="white"
                    borderRadius="md"
                    boxShadow="sm"
                    cursor="pointer"
                    _hover={{ bg: 'gray.50' }}
                    onClick={() => setSelectedThreadId(thread.id)}
                  >
                    <Flex mb={3} align="center">
                      <Avatar size="sm" name={thread.author.name} src={thread.author.avatarUrl} mr={2} />
                      <Box>
                        <Text fontWeight="medium">{thread.title}</Text>
                        <Text fontSize="xs" color="gray.500">
                          {thread.author.name} • {thread.author.role} • {thread.date}
                        </Text>
                      </Box>
                      <Badge
                        colorScheme={thread.status === 'Passed' ? 'green' : 'gray'}
                        borderRadius="full"
                        ml="auto"
                        display="flex"
                        alignItems="center"
                      >
                        <Box as="span" mr={1}>{thread.status === 'Passed' ? '•' : '○'}</Box>
                        <Text>{thread.status}</Text>
                      </Badge>
                    </Flex>
                    
                    <Flex fontSize="xs" color="gray.500">
                      <HStack>
                        <ChatIcon boxSize={3} />
                        <Text>{thread.replies} replies</Text>
                      </HStack>
                      <HStack ml={4}>
                        <ChevronUpIcon boxSize={3} />
                        <Text>{thread.views} views</Text>
                      </HStack>
                    </Flex>
                  </Box>
                ))}
              </VStack>
            </Box>
          ) : (
            // Forum thread detail view
            <Flex>
              <Box flex="1" p={6} borderRightWidth="1px" borderRightColor="gray.200">
                {/* Thread detail header and back button */}
                <Flex align="center" mb={6}>
                  <Button
                    variant="ghost"
                    leftIcon={<ArrowBackIcon />}
                    size="sm"
                    onClick={() => setSelectedThreadId(null)}
                  >
                    Back to forum
                  </Button>
                  {selectedThread && (
                    <Badge
                      colorScheme={selectedThread.status === 'Passed' ? 'green' : 'gray'}
                      borderRadius="full"
                      ml="auto"
                      display="flex"
                      alignItems="center"
                      px={2}
                      py={1}
                    >
                      <Box as="span" mr={1}>{selectedThread.status === 'Passed' ? '•' : '○'}</Box>
                      <Text>{selectedThread.status}</Text>
                    </Badge>
                  )}
                </Flex>
                
                {/* Thread replies */}
                <VStack spacing={4} align="stretch">
                  {threadReplies.map(reply => (
                    <Box
                      key={reply.id}
                      p={4}
                      bg="white"
                      borderRadius="md"
                      boxShadow="sm"
                    >
                      <Flex align="center" mb={3}>
                        <Avatar size="sm" name={reply.author.name} src={reply.author.avatarUrl} mr={2} />
                        <Box>
                          <Flex align="center">
                            <Text fontWeight="medium">{reply.author.name}</Text>
                            {'role' in reply.author && (
                              <Badge ml={2} colorScheme="orange">{reply.author.role}</Badge>
                            )}
                          </Flex>
                          <Text fontSize="xs" color="gray.500">
                            {reply.date}, {reply.time}
                          </Text>
                        </Box>
                        {reply.isPassed && (
                          <Badge colorScheme="green" ml="auto" px={2}>Passed</Badge>
                        )}
                      </Flex>
                      
                      {/* Reply content */}
                      <Text>
                        {reply.content}
                        {'studentId' in reply.author && reply.isPresent && (
                          <Text as="span" fontWeight="medium" ml={2}>
                            - {reply.author.studentId} {reply.author.name}
                          </Text>
                        )}
                      </Text>
                    </Box>
                  ))}
                </VStack>
                
                {/* Message input */}
                <Box mt={6}>
                  <InputGroup size="md">
                    <Input
                      placeholder="Click to type your message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      pr="4.5rem"
                    />
                    <InputRightAddon p={0}>
                      <Button
                        h="100%"
                        borderLeftRadius={0}
                        colorScheme="blue"
                        onClick={handleSendMessage}
                        rightIcon={<ArrowForwardIcon />}
                      >
                        Send
                      </Button>
                    </InputRightAddon>
                  </InputGroup>
                </Box>
              </Box>
              
              {/* Session list sidebar */}
              <Box w="250px" bg="white" p={4}>
                <Flex justify="space-between" align="center" mb={4}>
                  <Text fontWeight="medium">Session List</Text>
                  <Badge bg="gray.200" color="gray.800" borderRadius="full">
                    {sessionsList.length}
                  </Badge>
                </Flex>
                
                <VStack spacing={2} align="stretch">
                  {sessionsList.map(session => (
                    <Flex
                      key={session.id}
                      p={2}
                      borderRadius="md"
                      bg={selectedThread && selectedThread.sessionNumber === session.number ? 'gray.100' : 'transparent'}
                      _hover={{ bg: 'gray.50' }}
                      align="center"
                    >
                      <Text fontSize="sm">Session {session.number}</Text>
                      <Box
                        ml="auto"
                        w={2}
                        h={2}
                        borderRadius="full"
                        bg={getStatusColor(session.status) + '.500'}
                      />
                    </Flex>
                  ))}
                </VStack>
              </Box>
            </Flex>
          )}
        </Box>
      </Flex>
    </Box>
  );
};

export default Forum;