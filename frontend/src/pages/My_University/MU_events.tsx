import React, { useState } from "react";
import {
  Box,
  Container,
  Heading,
  Text,
  Flex,
  Grid,
  VStack,
  HStack,
  Button,
  Image,
  Badge,
  Tag,
  Input,
  InputGroup,
  InputLeftElement,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

interface EventData {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  image: string;
  category: string;
  isRegistered: boolean;
  description: string;
  organizer: string;
  isFeatured?: boolean;
}

const MU_events: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedEvent, setSelectedEvent] = useState<EventData | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [registeredEvents, setRegisteredEvents] = useState<string[]>([]);

  // Sample events data
  const eventsData: EventData[] = [
    {
      id: "event1",
      title: "Digital Banking Seminar",
      date: "April 15, 2025",
      time: "09:00 - 12:00",
      location: "Auditorium Hall",
      image: "https://placehold.co/300x180?text=Digital+Banking",
      category: "Seminar",
      isRegistered: false,
      description: "Join this seminar to learn about the latest trends in digital banking and financial technology. Industry experts will share insights on blockchain, cryptocurrency, and the future of banking.",
      organizer: "Faculty of Economics",
      isFeatured: true
    },
    {
      id: "event2",
      title: "AI Research Conference",
      date: "April 20, 2025",
      time: "10:00 - 16:00",
      location: "Innovation Center",
      image: "https://placehold.co/300x180?text=AI+Research",
      category: "Conference",
      isRegistered: false,
      description: "An international conference featuring the latest research in Artificial Intelligence and Machine Learning. Researchers from leading institutions will present their findings and innovations.",
      organizer: "Faculty of Computer Science"
    },
    {
      id: "event3",
      title: "Career Fair 2025",
      date: "May 5, 2025",
      time: "09:00 - 17:00",
      location: "University Arena",
      image: "https://placehold.co/300x180?text=Career+Fair",
      category: "Career",
      isRegistered: false,
      description: "Meet representatives from over 50 companies looking to hire graduates. Bring your resume and be prepared for on-the-spot interviews. Industries include tech, finance, healthcare, and more.",
      organizer: "Career Development Center",
      isFeatured: true
    },
    {
      id: "event4",
      title: "International Culture Festival",
      date: "May 12, 2025",
      time: "11:00 - 20:00",
      location: "University Park",
      image: "https://placehold.co/300x180?text=Culture+Festival",
      category: "Cultural",
      isRegistered: false,
      description: "Celebrate diversity with food, performances, and exhibitions from over 30 countries. Join workshops to learn traditional crafts, dances, and cooking techniques from around the world.",
      organizer: "International Student Association"
    },
    {
      id: "event5",
      title: "Research Symposium",
      date: "May 18, 2025",
      time: "13:00 - 17:00",
      location: "Science Building",
      image: "https://placehold.co/300x180?text=Research+Symposium",
      category: "Academic",
      isRegistered: false,
      description: "Undergraduate and graduate students present their research projects. Areas include natural sciences, engineering, social sciences, and humanities. Awards will be given for the best presentations.",
      organizer: "Office of Research and Innovation"
    },
    {
      id: "event6",
      title: "Hackathon 2025",
      date: "June 1-2, 2025",
      time: "48-hour event",
      location: "Tech Hub",
      image: "https://placehold.co/300x180?text=Hackathon",
      category: "Competition",
      isRegistered: false,
      description: "A 48-hour coding competition to develop innovative solutions for real-world problems. Teams of up to 4 students can participate. Prizes include internships and tech gadgets.",
      organizer: "CS Student Association",
      isFeatured: true
    },
  ];

  // Updated events with registration status
  const events = eventsData.map(event => ({
    ...event,
    isRegistered: registeredEvents.includes(event.id)
  }));

  const filteredEvents = events.filter(event => 
    event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.organizer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const upcomingEvents = filteredEvents;
  const myEvents = filteredEvents.filter(event => event.isRegistered);
  const featuredEvents = filteredEvents.filter(event => event.isFeatured);

  const openEventDetails = (event: EventData) => {
    setSelectedEvent(event);
    onOpen();
  };

  const handleJoinEvent = (eventId: string) => {
    if (registeredEvents.includes(eventId)) {
      // Cancel registration
      setRegisteredEvents(registeredEvents.filter(id => id !== eventId));
      alert("Registration canceled successfully");
    } else {
      // Register
      setRegisteredEvents([...registeredEvents, eventId]);
      alert("Registration successful");
    }
    onClose();
  };

  const EventCard = ({ event }: { event: EventData }) => (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      bg="white"
      boxShadow="sm"
      transition="transform 0.2s, box-shadow 0.2s"
      _hover={{ transform: "translateY(-5px)", boxShadow: "md" }}
      cursor="pointer"
    >
      <Image src={event.image} alt={event.title} width="100%" height="150px" objectFit="cover" />
      
      <Box p={4}>
        <Box display="flex" alignItems="baseline" mb={2}>
          <Badge borderRadius="full" px={2} colorScheme={getCategoryColor(event.category)}>
            {event.category}
          </Badge>
          {event.isRegistered && (
            <Badge borderRadius="full" px={2} colorScheme="green" ml={2}>
              Registered
            </Badge>
          )}
          {event.isFeatured && (
            <Badge borderRadius="full" px={2} colorScheme="purple" ml={2}>
              Featured
            </Badge>
          )}
        </Box>
        
        <Heading size="md" mb={1} noOfLines={1}>
          {event.title}
        </Heading>
        
        <HStack spacing={4} mt={2} fontSize="sm">
          <Box display="flex" alignItems="center">
            <Box as="span" mr={1}>📅</Box>
            <Text>{event.date}</Text>
          </Box>
          
          <Box display="flex" alignItems="center">
            <Box as="span" mr={1}>🕒</Box>
            <Text>{event.time}</Text>
          </Box>
        </HStack>
        
        <Box display="flex" alignItems="center" mt={1} fontSize="sm">
          <Box as="span" mr={1}>📍</Box>
          <Text noOfLines={1}>{event.location}</Text>
        </Box>
        
        <HStack mt={4} spacing={2}>
          <Button 
            size="sm" 
            colorScheme="blue" 
            variant="outline"
            width="50%"
            onClick={(e) => {
              e.stopPropagation();
              openEventDetails(event);
            }}
          >
            Detail
          </Button>
          <Button 
            size="sm" 
            colorScheme={event.isRegistered ? "red" : "green"}
            width="50%"
            onClick={(e) => {
              e.stopPropagation();
              handleJoinEvent(event.id);
            }}
          >
            {event.isRegistered ? "Cancel" : "Join"}
          </Button>
        </HStack>
      </Box>
    </Box>
  );

  function getCategoryColor(category: string): string {
    switch (category.toLowerCase()) {
      case 'seminar':
        return 'blue';
      case 'conference': 
        return 'purple';
      case 'career':
        return 'orange';
      case 'cultural':
        return 'pink';
      case 'academic':
        return 'teal';
      case 'competition':
        return 'red';
      default:
        return 'gray';
    }
  }

  return (
    <Container maxW="container.xl" py={8}>
      <Box mb={6}>
        <Heading size="lg" mb={2}>
          University Events
        </Heading>
        <Text color="gray.600">
          Discover and register for campus events and activities
        </Text>
      </Box>

      <Box mb={6}>
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <SearchIcon color="gray.400" />
          </InputLeftElement>
          <Input
            placeholder="Search events by title, category, or organizer"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            bg="white"
            borderRadius="md"
          />
        </InputGroup>
      </Box>

      <Tabs colorScheme="blue" bg="white" borderRadius="lg" boxShadow="sm">
        <TabList>
          <Tab>All Events</Tab>
          <Tab>Featured Events</Tab>
          <Tab>My Registered Events {myEvents.length > 0 && `(${myEvents.length})`}</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <Grid 
              templateColumns={{ 
                base: "repeat(1, 1fr)", 
                md: "repeat(2, 1fr)", 
                lg: "repeat(3, 1fr)" 
              }} 
              gap={6}
            >
              {upcomingEvents.length > 0 ? (
                upcomingEvents.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))
              ) : (
                <Box gridColumn="span 3" textAlign="center" py={10} color="gray.500">
                  No events found matching your search
                </Box>
              )}
            </Grid>
          </TabPanel>
          
          <TabPanel>
            {featuredEvents.length > 0 ? (
              <Grid 
                templateColumns={{ 
                  base: "repeat(1, 1fr)", 
                  md: "repeat(2, 1fr)", 
                  lg: "repeat(3, 1fr)" 
                }} 
                gap={6}
              >
                {featuredEvents.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </Grid>
            ) : (
              <Box textAlign="center" py={10} color="gray.500">
                No featured events at the moment
              </Box>
            )}
          </TabPanel>
          
          <TabPanel>
            {myEvents.length > 0 ? (
              <Grid 
                templateColumns={{ 
                  base: "repeat(1, 1fr)", 
                  md: "repeat(2, 1fr)", 
                  lg: "repeat(3, 1fr)" 
                }} 
                gap={6}
              >
                {myEvents.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </Grid>
            ) : (
              <Box textAlign="center" py={10} color="gray.500">
                You haven't registered for any events yet
              </Box>
            )}
          </TabPanel>
        </TabPanels>
      </Tabs>

      {/* Event Details Modal */}
      {selectedEvent && (
        <Modal isOpen={isOpen} onClose={onClose} size="lg">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>{selectedEvent.title}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Image 
                src={selectedEvent.image} 
                alt={selectedEvent.title} 
                width="100%" 
                height="200px" 
                objectFit="cover" 
                borderRadius="md" 
                mb={4}
              />
              
              <HStack flexWrap="wrap" spacing={2} mb={4}>
                <Tag colorScheme={getCategoryColor(selectedEvent.category)}>
                  {selectedEvent.category}
                </Tag>
                <Tag colorScheme="blue">
                  <Box as="span" mr={1}>👥</Box> {selectedEvent.organizer}
                </Tag>
              </HStack>
              
              <VStack align="stretch" spacing={3} mb={4}>
                <Flex>
                  <Box as="span" fontSize="lg" mr={2}>📅</Box>
                  <Box>
                    <Text fontWeight="medium">Date & Time</Text>
                    <Text>{selectedEvent.date}, {selectedEvent.time}</Text>
                  </Box>
                </Flex>
                
                <Flex>
                  <Box as="span" fontSize="lg" mr={2}>📍</Box>
                  <Box>
                    <Text fontWeight="medium">Location</Text>
                    <Text>{selectedEvent.location}</Text>
                  </Box>
                </Flex>
              </VStack>
              
              <Box mb={4}>
                <Text fontWeight="medium" mb={1}>Description</Text>
                <Text>{selectedEvent.description}</Text>
              </Box>
            </ModalBody>

            <ModalFooter>
              <Button variant="ghost" mr={3} onClick={onClose}>
                Close
              </Button>
              <Button 
                colorScheme={selectedEvent.isRegistered ? "red" : "green"}
                onClick={() => handleJoinEvent(selectedEvent.id)}
              >
                {selectedEvent.isRegistered ? "Cancel Registration" : "Join Event"}
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </Container>
  );
};

export default MU_events;