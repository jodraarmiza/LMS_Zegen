import React, { useState } from 'react';
import {
  Box,
  Flex,
  Text,
  Heading,
  Button,
  Badge,
  Grid,
  GridItem,
  HStack,
  VStack,
  SimpleGrid,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Stack,
  Progress,
  List,
  ListItem,
  InputGroup,
  InputLeftElement,
  Input,
  Icon,
  Collapse,
  useColorModeValue,
  useDisclosure,
  Divider,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Tooltip,
  IconButton,
} from '@chakra-ui/react';
import {
  ChevronDownIcon,
  SearchIcon,
  DownloadIcon,
  InfoIcon,
  CheckIcon,
  TimeIcon,
  ChevronRightIcon,
  ChevronUpIcon,
  CalendarIcon,
  StarIcon,
} from '@chakra-ui/icons';

// Define types
type ActivityCategory = 
  | 'Seminar & Workshop' 
  | 'Community Service' 
  | 'Competition' 
  | 'Student Organization' 
  | 'Research & Publication' 
  | 'Certification' 
  | 'Internship & Work Experience';

interface Activity {
  id: number;
  title: string;
  description: string;
  category: ActivityCategory;
  date: string;
  points: number;
  status: 'Approved' | 'Pending';
  certificate: string | null;
  location: string;
}

// Mock data
const studentInfo = {
  name: "Admin LMS",
  nim: "12345678",
  program: "Information Technology",
  faculty: "Faculty of Computer Science",
  totalPoints: 85,
  requiredPoints: 100,
  progress: 85
};

const activityCategories: Record<string, ActivityCategory> = {
  SEMINAR: "Seminar & Workshop",
  COMMUNITY: "Community Service",
  COMPETITION: "Competition",
  ORGANIZATION: "Student Organization",
  RESEARCH: "Research & Publication",
  CERTIFICATION: "Certification",
  INTERNSHIP: "Internship & Work Experience"
};

const skpiActivities: Activity[] = [
  {
    id: 1,
    title: "Technology Leadership Seminar",
    description: "Attended a seminar on leadership in technology companies",
    category: activityCategories.SEMINAR,
    date: "March 15, 2025",
    points: 5,
    status: "Approved",
    certificate: "leadership_seminar_cert.pdf",
    location: "University Auditorium"
  },
  {
    id: 2,
    title: "Campus Web Development Competition",
    description: "Won 2nd place in the annual web development competition",
    category: activityCategories.COMPETITION,
    date: "February 10, 2025",
    points: 15,
    status: "Approved",
    certificate: "webdev_competition_cert.pdf",
    location: "Computer Science Building"
  },
  {
    id: 3,
    title: "Teaching Assistant - Database Systems",
    description: "Served as a teaching assistant for Database Systems course",
    category: activityCategories.RESEARCH,
    date: "January - April 2025",
    points: 20,
    status: "Approved",
    certificate: null,
    location: "Computer Science Department"
  },
  {
    id: 4,
    title: "Digital Marketing Workshop",
    description: "Participated in a 2-day workshop on digital marketing strategies",
    category: activityCategories.SEMINAR,
    date: "March 22-23, 2025",
    points: 8,
    status: "Approved",
    certificate: "marketing_workshop_cert.pdf",
    location: "Business School"
  },
  {
    id: 5,
    title: "Community Computer Training Program",
    description: "Volunteered to teach basic computer skills to local community members",
    category: activityCategories.COMMUNITY,
    date: "March 5-26, 2025",
    points: 12,
    status: "Approved",
    certificate: "volunteer_certificate.pdf",
    location: "Community Center"
  },
  {
    id: 6,
    title: "Student Association Board Member",
    description: "Served as the Secretary of the Computer Science Student Association",
    category: activityCategories.ORGANIZATION,
    date: "2024-2025 Academic Year",
    points: 25,
    status: "Approved",
    certificate: null,
    location: "Campus"
  },
  {
    id: 7,
    title: "AWS Certified Cloud Practitioner",
    description: "Obtained AWS Cloud Practitioner certification",
    category: activityCategories.CERTIFICATION,
    date: "April 5, 2025",
    points: 15,
    status: "Pending",
    certificate: "aws_certification.pdf",
    location: "Online"
  }
];

const MyUniversitySKPI = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredActivities, setFilteredActivities] = useState<Activity[]>(skpiActivities);
  const [expandedActivity, setExpandedActivity] = useState<number | null>(null);
  const { isOpen: isInfoOpen, onToggle: onInfoToggle } = useDisclosure();

  // Color mode values
  const bgCard = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const hoverBg = useColorModeValue('gray.50', 'gray.600');

  // Handle search and filtering
  React.useEffect(() => {
    const filtered = skpiActivities.filter(activity => {
      return (
        (searchQuery === "" || 
          activity.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          activity.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          activity.category.toLowerCase().includes(searchQuery.toLowerCase())) &&
        (selectedCategory === "All" || activity.category === selectedCategory)
      );
    });
    setFilteredActivities(filtered);
  }, [searchQuery, selectedCategory]);

  // Get all unique categories
  const categories = ["All", ...Array.from(new Set(Object.values(activityCategories)))];

  // Calculate points by category
  const getPointsByCategory = (category: ActivityCategory) => {
    return skpiActivities
      .filter(activity => activity.category === category && activity.status === "Approved")
      .reduce((sum, activity) => sum + activity.points, 0);
  };

  // Get category color scheme
  const getCategoryColorScheme = (category: ActivityCategory) => {
    switch (category) {
      case "Seminar & Workshop":
        return 'blue';
      case "Community Service":
        return 'green';
      case "Competition":
        return 'purple';
      case "Student Organization":
        return 'orange';
      case "Research & Publication":
        return 'cyan';
      case "Certification":
        return 'red';
      case "Internship & Work Experience":
        return 'teal';
      default:
        return 'gray';
    }
  };

  // Toggle activity expansion
  const toggleActivity = (id: number) => {
    if (expandedActivity === id) {
      setExpandedActivity(null);
    } else {
      setExpandedActivity(id);
    }
  };

  return (
    <Box>
      {/* Page Header */}
      <Flex justify="space-between" align="center" mb={6}>
        <Box>
          <Heading as="h1" size="lg" color="gray.800">SKPI Points</Heading>
          <Text color="gray.600" mt={1}>Track your extracurricular activities and points</Text>
        </Box>
        
        <Stack direction="row" spacing={3}>
          {/* Category Filter */}
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
              {selectedCategory}
            </MenuButton>
            <MenuList>
              {categories.map((category) => (
                <MenuItem 
                  key={category} 
                  onClick={() => setSelectedCategory(category)}
                  fontWeight={selectedCategory === category ? "bold" : "normal"}
                >
                  {category}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
          
          {/* Info Button */}
          <Tooltip label="Toggle SKPI information">
            <IconButton
              aria-label="Information"
              icon={<InfoIcon />}
              onClick={onInfoToggle}
              variant="outline"
            />
          </Tooltip>
        </Stack>
      </Flex>

      {/* Search Bar */}
      <InputGroup mb={6}>
        <InputLeftElement pointerEvents="none">
          <SearchIcon color="gray.300" />
        </InputLeftElement>
        <Input 
          placeholder="Search activities..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </InputGroup>

      {/* Progress Card */}
      <Box 
        bg={bgCard} 
        p={6} 
        borderRadius="lg" 
        shadow="sm"
        borderWidth="1px"
        borderColor={borderColor}
        mb={6}
      >
        <Flex direction={{ base: "column", md: "row" }} justify="space-between" align={{ base: "flex-start", md: "center" }} mb={6}>
          <Box mb={{ base: 4, md: 0 }}>
            <Heading as="h2" size="md">SKPI Points Progress</Heading>
            <Text color="gray.600" mt={1}>Track your progress towards the required SKPI points</Text>
          </Box>
          
          <Stat textAlign={{ base: "left", md: "right" }}>
            <StatLabel>Total Points</StatLabel>
            <HStack spacing={1} justify={{ base: "flex-start", md: "flex-end" }}>
              <StatNumber color="blue.500">{studentInfo.totalPoints}</StatNumber>
              <Text fontSize="md" color="gray.500">/ {studentInfo.requiredPoints}</Text>
            </HStack>
            <StatHelpText>
              {studentInfo.progress}% Completed
            </StatHelpText>
          </Stat>
        </Flex>
        
        <Box mb={6}>
          <Flex justify="space-between" mb={1}>
            <Text fontWeight="medium" fontSize="sm" color="blue.600">Progress</Text>
            <Text fontWeight="medium" fontSize="sm" color="blue.600">
              {studentInfo.totalPoints} / {studentInfo.requiredPoints} points
            </Text>
          </Flex>
          <Progress 
            value={studentInfo.progress} 
            size="md" 
            colorScheme="blue" 
            rounded="md"
          />
        </Box>
        
        <SimpleGrid columns={{ base: 1, sm: 2, md: 4, lg: 7 }} spacing={4}>
          {Object.values(activityCategories).map((category) => {
            const categoryPoints = getPointsByCategory(category);
            const totalActivitiesInCategory = skpiActivities.filter(
              activity => activity.category === category && activity.status === "Approved"
            ).length;
            
            return (
              <Box 
                key={category}
                p={4}
                bg={useColorModeValue('white', 'gray.700')}
                borderWidth="1px"
                borderColor={borderColor}
                borderRadius="md"
                cursor="pointer"
                transition="all 0.2s"
                _hover={{ 
                  transform: 'translateY(-5px)', 
                  shadow: 'md',
                  borderColor: `${getCategoryColorScheme(category)}.200`
                }}
                onClick={() => setSelectedCategory(category)}
              >
                <Flex mb={2}>
                  <Box 
                    p={2} 
                    bg={`${getCategoryColorScheme(category)}.100`} 
                    color={`${getCategoryColorScheme(category)}.700`}
                    borderRadius="md"
                    mr={2}
                  >
                    <Icon as={StarIcon} />
                  </Box>
                  <Text fontWeight="medium" fontSize="sm" noOfLines={2}>{category}</Text>
                </Flex>
                <HStack mt={3} justify="space-between">
                  <Text fontWeight="semibold" color={`${getCategoryColorScheme(category)}.600`}>
                    {categoryPoints}
                  </Text>
                  <Text fontSize="xs" color="gray.500">
                    {totalActivitiesInCategory} {totalActivitiesInCategory === 1 ? 'activity' : 'activities'}
                  </Text>
                </HStack>
              </Box>
            );
          })}
        </SimpleGrid>
        
        {/* Category Info Panel */}
        <Collapse in={isInfoOpen} animateOpacity>
          <Box 
            mt={6} 
            p={4} 
            bg={useColorModeValue('gray.50', 'gray.600')} 
            borderRadius="md"
            borderWidth="1px"
            borderColor={borderColor}
          >
            <Flex justify="space-between" align="center" mb={4}>
              <Heading as="h3" size="sm">SKPI Categories Information</Heading>
              <IconButton
                aria-label="Close information"
                icon={<ChevronUpIcon />}
                size="sm"
                variant="ghost"
                onClick={onInfoToggle}
              />
            </Flex>
            
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
              {Object.entries(activityCategories).map(([key, value]) => (
                <Flex key={key} align="flex-start">
                  <Box 
                    p={2} 
                    bg={`${getCategoryColorScheme(value)}.100`} 
                    color={`${getCategoryColorScheme(value)}.700`}
                    borderRadius="md"
                    mr={3}
                  >
                    <Icon as={StarIcon} />
                  </Box>
                  <Box>
                    <Text fontWeight="medium">{value}</Text>
                    <Text fontSize="sm" color="gray.600" mt={1}>
                      {key === "SEMINAR" && "Attend seminars, workshops, and training programs to enhance your knowledge and skills."}
                      {key === "COMMUNITY" && "Participate in community service and social responsibility activities."}
                      {key === "COMPETITION" && "Join academic or non-academic competitions representing the university."}
                      {key === "ORGANIZATION" && "Take leadership roles in student organizations and campus activities."}
                      {key === "RESEARCH" && "Engage in research projects, assist faculty, or publish academic papers."}
                      {key === "CERTIFICATION" && "Obtain professional certifications related to your field of study."}
                      {key === "INTERNSHIP" && "Gain practical experience through internships or part-time work relevant to your degree."}
                    </Text>
                  </Box>
                </Flex>
              ))}
            </SimpleGrid>
          </Box>
        </Collapse>
      </Box>

      {/* Activities List */}
      <Box>
        <Tabs colorScheme="blue" variant="enclosed">
          <TabList>
            <Tab>All Activities</Tab>
            <Tab>Approved</Tab>
            <Tab>Pending</Tab>
          </TabList>
          
          <TabPanels>
            <TabPanel px={0}>
              <ActivityList 
                activities={filteredActivities} 
                expandedActivity={expandedActivity} 
                toggleActivity={toggleActivity} 
                bgCard={bgCard}
                borderColor={borderColor}
                hoverBg={hoverBg}
                getCategoryColorScheme={getCategoryColorScheme}
              />
            </TabPanel>
            
            <TabPanel px={0}>
              <ActivityList 
                activities={filteredActivities.filter(activity => activity.status === "Approved")} 
                expandedActivity={expandedActivity} 
                toggleActivity={toggleActivity} 
                bgCard={bgCard}
                borderColor={borderColor}
                hoverBg={hoverBg}
                getCategoryColorScheme={getCategoryColorScheme}
              />
            </TabPanel>
            
            <TabPanel px={0}>
              <ActivityList 
                activities={filteredActivities.filter(activity => activity.status === "Pending")} 
                expandedActivity={expandedActivity} 
                toggleActivity={toggleActivity} 
                bgCard={bgCard}
                borderColor={borderColor}
                hoverBg={hoverBg}
                getCategoryColorScheme={getCategoryColorScheme}
              />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Box>
  );
};

// Helper component for activity list
interface ActivityListProps {
  activities: Activity[];
  expandedActivity: number | null;
  toggleActivity: (id: number) => void;
  bgCard: string;
  borderColor: string;
  hoverBg: string;
  getCategoryColorScheme: (category: ActivityCategory) => string;
}

const ActivityList: React.FC<ActivityListProps> = ({ 
  activities, 
  expandedActivity, 
  toggleActivity,
  bgCard,
  borderColor,
  hoverBg,
  getCategoryColorScheme
}) => {
  if (activities.length === 0) {
    return (
      <Box 
        p={10} 
        bg={bgCard} 
        borderRadius="lg" 
        textAlign="center"
        borderWidth="1px"
        borderColor={borderColor}
      >
        <Icon as={InfoIcon} boxSize={12} color="gray.300" mb={3} />
        <Heading as="h3" size="md" mb={2}>No activities found</Heading>
        <Text color="gray.500">
          Participate in university activities to earn SKPI points
        </Text>
      </Box>
    );
  }

  return (
    <List spacing={4}>
      {activities.map((activity) => (
        <ListItem 
          key={activity.id} 
          bg={bgCard}
          p={4}
          borderRadius="lg"
          borderWidth="1px"
          borderColor={borderColor}
          transition="all 0.2s"
          _hover={{ shadow: 'md' }}
        >
          <Box onClick={() => toggleActivity(activity.id)} cursor="pointer">
            <Flex justify="space-between" align="flex-start">
              <HStack align="flex-start" spacing={3}>
                <Box 
                  p={2} 
                  bg={`${getCategoryColorScheme(activity.category)}.100`} 
                  color={`${getCategoryColorScheme(activity.category)}.700`}
                  borderRadius="md"
                >
                  <Icon as={StarIcon} />
                </Box>
                <Box>
                  <Text fontWeight="semibold">{activity.title}</Text>
                  
                  <HStack mt={1} spacing={2}>
                    <Badge colorScheme={getCategoryColorScheme(activity.category)}>
                      {activity.category}
                    </Badge>
                    <Text fontSize="sm" color="gray.500">{activity.date}</Text>
                  </HStack>
                </Box>
              </HStack>
              
              <HStack>
                <HStack bg="blue.50" px={2} py={1} borderRadius="md">
                  <Text fontWeight="semibold" color="blue.600">{activity.points}</Text>
                  <Text fontSize="xs" color="blue.600">points</Text>
                </HStack>
                <Badge colorScheme={activity.status === "Approved" ? "green" : "orange"}>
                  {activity.status}
                </Badge>
              </HStack>
            </Flex>
            
            <Flex justify="flex-end" mt={2}>
              <Button 
                rightIcon={expandedActivity === activity.id ? <ChevronUpIcon /> : <ChevronRightIcon />} 
                variant="ghost" 
                size="sm"
                colorScheme="blue"
              >
                {expandedActivity === activity.id ? "Hide details" : "View details"}
              </Button>
            </Flex>
          </Box>
          
          <Collapse in={expandedActivity === activity.id} animateOpacity>
            <Box pt={4} pb={2} px={2} mt={2} borderTopWidth="1px" borderColor={borderColor}>
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                <Box>
                  <Text fontWeight="medium" color="gray.600">Description</Text>
                  <Text mt={1}>{activity.description}</Text>
                </Box>
                <Box>
                  <Text fontWeight="medium" color="gray.600">Location</Text>
                  <Text mt={1}>{activity.location}</Text>
                </Box>
                <Box>
                  <Text fontWeight="medium" color="gray.600">Category</Text>
                  <Text mt={1}>{activity.category}</Text>
                </Box>
                <Box>
                  <Text fontWeight="medium" color="gray.600">Date</Text>
                  <Text mt={1}>{activity.date}</Text>
                </Box>
                <Box>
                  <Text fontWeight="medium" color="gray.600">Status</Text>
                  <Badge mt={1} colorScheme={activity.status === "Approved" ? "green" : "orange"}>
                    {activity.status}
                  </Badge>
                </Box>
                <Box>
                  <Text fontWeight="medium" color="gray.600">Points Awarded</Text>
                  <Text mt={1}>{activity.points}</Text>
                </Box>
                <Box gridColumn={{ md: "span 2" }}>
                  <Text fontWeight="medium" color="gray.600">Certificate</Text>
                  <Box mt={1}>
                    {activity.certificate ? (
                      <Button 
                        leftIcon={<DownloadIcon />} 
                        colorScheme="blue" 
                        size="sm" 
                        variant="outline"
                      >
                        Download Certificate
                      </Button>
                    ) : (
                      <Text color="gray.500">No certificate available</Text>
                    )}
                  </Box>
                </Box>
              </SimpleGrid>
            </Box>
          </Collapse>
        </ListItem>
      ))}
    </List>
  );
};

export default MyUniversitySKPI;