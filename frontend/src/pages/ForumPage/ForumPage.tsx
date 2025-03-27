import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Flex,
  Text,
  Heading,
  Button,
  Avatar,
  AvatarGroup,
  HStack,
  Icon,
  Select,
  Badge,
  Divider
} from '@chakra-ui/react';
import { ChevronRightIcon } from '@chakra-ui/icons';

interface Course {
  id: string;
  code: string;
  title: string;
  instructors: {
    id: string;
    name: string;
    avatarUrl: string;
  }[];
}

interface ForumThread {
  id: string;
  courseId: string;
  count: number;
  updatedDays: number;
}

const ForumPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedSemester, setSelectedSemester] = useState('2023 Even Semester');

  // Mock data for courses with forum threads
  const courses: Course[] = [
    {
      id: '1',
      code: 'LB2123',
      title: 'IT Service & Risk Management',
      instructors: [
        { id: '101', name: 'Joni Zimbatima', avatarUrl: 'https://placehold.co/32x32?text=JZ' },
        { id: '102', name: 'Alan Russ', avatarUrl: 'https://placehold.co/32x32?text=AR' }
      ]
    },
    {
      id: '2',
      code: 'LB2123',
      title: 'Digital Banking',
      instructors: [
        { id: '103', name: 'Sarah Smith', avatarUrl: 'https://placehold.co/32x32?text=SS' },
        { id: '104', name: 'David Wong', avatarUrl: 'https://placehold.co/32x32?text=DW' }
      ]
    },
    {
      id: '3',
      code: 'LB2123',
      title: 'User Experience Research & Design',
      instructors: [
        { id: '105', name: 'Emily Johnson', avatarUrl: 'https://placehold.co/32x32?text=EJ' },
        { id: '106', name: 'Michael Chang', avatarUrl: 'https://placehold.co/32x32?text=MC' },
        { id: '107', name: 'Lisa Taylor', avatarUrl: 'https://placehold.co/32x32?text=LT' }
      ]
    },
    {
      id: '4',
      code: 'LB2123',
      title: 'Introduction to Database System',
      instructors: [
        { id: '108', name: 'Robert Kim', avatarUrl: 'https://placehold.co/32x32?text=RK' },
        { id: '109', name: 'Sophia Lee', avatarUrl: 'https://placehold.co/32x32?text=SL' },
        { id: '110', name: 'James Wilson', avatarUrl: 'https://placehold.co/32x32?text=JW' }
      ]
    }
  ];

  // Mock data for forum threads
  const forumThreads: ForumThread[] = [
    { id: 'f1', courseId: '1', count: 3, updatedDays: 10 },
    { id: 'f2', courseId: '2', count: 1, updatedDays: 14 },
    { id: 'f3', courseId: '3', count: 5, updatedDays: 30 },
    { id: 'f4', courseId: '4', count: 2, updatedDays: 20 }
  ];

  const handleSemesterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSemester(e.target.value);
  };

  const handleCourseClick = (courseId: string) => {
    navigate(`/course/${courseId}/forum`);
  };

  // Helper function to get forum thread info for a course
  const getForumThreadInfo = (courseId: string): ForumThread | undefined => {
    return forumThreads.find(f => f.courseId === courseId);
  };

  return (
    <Box bg="gray.50" minH="calc(100vh - 70px)" p={5}>
      <Flex justifyContent="space-between" alignItems="center" mb={5}>
        <Heading as="h1" size="lg" fontWeight="bold">My Forum</Heading>
        
        <Flex alignItems="center">
          <Select 
            value={selectedSemester}
            onChange={handleSemesterChange}
            bg="white"
            width="auto"
            mr={2}
            borderRadius="md"
            size="md"
          >
            <option value="2023 Even Semester">2023 Even Semester</option>
            <option value="2023 Odd Semester">2023 Odd Semester</option>
            <option value="2022 Even Semester">2022 Even Semester</option>
          </Select>
          
          <Button
            colorScheme="blue"
            size="md"
            borderRadius="full"
            w="40px"
            h="40px"
            minW="40px"
            p={0}
          >
            <Icon as={ChevronRightIcon} boxSize={6} />
          </Button>
        </Flex>
      </Flex>

      <Box>
        {courses.map((course) => {
          const threadInfo = getForumThreadInfo(course.id);
          
          return (
            <Box 
              key={course.id} 
              bg="white" 
              borderRadius="lg" 
              mb={4}
              boxShadow="sm"
              borderWidth="1px"
              borderColor="gray.200"
              onClick={() => handleCourseClick(course.id)}
              cursor="pointer"
              _hover={{ bg: 'gray.50' }}
              transition="all 0.2s"
            >
              <Flex p={4} alignItems="center">
                <Flex alignItems="center" flex={1}>
                  <Box 
                    bg="blue.500" 
                    color="white" 
                    p={2} 
                    borderRadius="md" 
                    mr={3}
                    fontSize="sm"
                    fontWeight="bold"
                  >
                    C
                  </Box>
                  
                  <Box>
                    <Flex alignItems="center">
                      <Text fontWeight="medium" color="gray.600" fontSize="sm">Course</Text>
                      <Text fontWeight="medium" color="gray.500" fontSize="sm" ml={2}>{course.code}</Text>
                    </Flex>
                    <Text fontWeight="semibold" fontSize="md">{course.title}</Text>
                    
                    {threadInfo && (
                      <Flex alignItems="center" mt={1}>
                        <Box 
                          bg="gray.100" 
                          borderRadius="full" 
                          px={2} 
                          py={1} 
                          fontSize="xs"
                          mr={2}
                        >
                          <Text as="span" fontWeight="medium">
                            {threadInfo.count} Discussion
                          </Text>
                        </Box>
                        <Text fontSize="xs" color="gray.500">
                          updated {threadInfo.updatedDays} days ago
                        </Text>
                      </Flex>
                    )}
                  </Box>
                </Flex>
                
                <AvatarGroup size="sm" max={3} spacing="-0.5rem">
                  {course.instructors.map((instructor) => (
                    <Avatar 
                      key={instructor.id} 
                      name={instructor.name} 
                      src={instructor.avatarUrl} 
                      borderWidth="1px"
                      borderColor="white"
                    />
                  ))}
                </AvatarGroup>
              </Flex>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default ForumPage;