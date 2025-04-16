import React, { useState } from "react";
import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  Flex,
  Grid,
  GridItem,
  VStack,
  HStack,
  Badge,
  Card,
  CardHeader,
  CardBody,
  SimpleGrid,
  Icon,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  Select,
  Textarea,
  useDisclosure,
  useToast,
  Divider,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  IconButton,
  List,
  ListItem,
  ListIcon,
} from "@chakra-ui/react";
import {
  AddIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CalendarIcon,
  TimeIcon,
  InfoIcon,
  WarningIcon,
  CheckCircleIcon,
  DownloadIcon,
  RepeatIcon,
  SearchIcon,
  CloseIcon,
} from "@chakra-ui/icons";
import { FaGraduationCap, FaUsers, FaBook, FaFilePdf } from "react-icons/fa";

// Event interface
interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  time?: string;
  type: "deadline" | "meeting" | "milestone" | "submission" | "reminder";
  description?: string;
  location?: string;
  participants?: string[];
  completed?: boolean;
  important?: boolean;
  documents?: string[];
}

// Date interface for calendar
interface CalendarDate {
  date: number;
  month: number;
  year: number;
  isCurrentMonth: boolean;
  events: CalendarEvent[];
}

// Generate calendar days for a month
const generateCalendarDays = (year: number, month: number, events: CalendarEvent[]): CalendarDate[] => {
  // Month in JS is 0-indexed (0 = January, 11 = December)
  const firstDayOfMonth = new Date(year, month, 1).getDay(); // 0 = Sunday, 6 = Saturday
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();
  
  const calendarDays: CalendarDate[] = [];
  
  // Add days from previous month
  for (let i = firstDayOfMonth - 1; i >= 0; i--) {
    const day = daysInPrevMonth - i;
    const prevMonth = month - 1 < 0 ? 11 : month - 1;
    const prevYear = month - 1 < 0 ? year - 1 : year;
    const dateStr = `${prevYear}-${String(prevMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    
    calendarDays.push({
      date: day,
      month: prevMonth,
      year: prevYear,
      isCurrentMonth: false,
      events: events.filter(event => event.date === dateStr)
    });
  }
  
  // Add days from current month
  for (let day = 1; day <= daysInMonth; day++) {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    
    calendarDays.push({
      date: day,
      month: month,
      year: year,
      isCurrentMonth: true,
      events: events.filter(event => event.date === dateStr)
    });
  }
  
  // Add days from next month to complete the grid (6 rows x 7 days = 42 cells)
  const remainingDays = 42 - calendarDays.length;
  const nextMonth = month + 1 > 11 ? 0 : month + 1;
  const nextYear = month + 1 > 11 ? year + 1 : year;
  
  for (let day = 1; day <= remainingDays; day++) {
    const dateStr = `${nextYear}-${String(nextMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    
    calendarDays.push({
      date: day,
      month: nextMonth,
      year: nextYear,
      isCurrentMonth: false,
      events: events.filter(event => event.date === dateStr)
    });
  }
  
  return calendarDays;
};

// Format date to YYYY-MM-DD
const formatDateToString = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

// Format date for display
const formatDateDisplay = (dateStr: string): string => {
  const [year, month, day] = dateStr.split('-').map(Number);
  return new Date(year, month - 1, day).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });
};

const ThesisCalendar: React.FC = () => {
  const toast = useToast();
  const { isOpen: isEventOpen, onOpen: onEventOpen, onClose: onEventClose } = useDisclosure();
  const { isOpen: isViewOpen, onOpen: onViewOpen, onClose: onViewClose } = useDisclosure();
  
  // Calendar state
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selectedDate, setSelectedDate] = useState<string>(formatDateToString(today));
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  
  // Form state
  const [eventTitle, setEventTitle] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventTime, setEventTime] = useState("");
  const [eventType, setEventType] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const [eventParticipants, setEventParticipants] = useState("");
  const [isImportant, setIsImportant] = useState(false);
  
  // Sample events
  const [events, setEvents] = useState<CalendarEvent[]>([
    {
      id: "evt1",
      title: "Proposal Submission Deadline",
      date: "2025-04-25",
      type: "deadline",
      description: "Submit your thesis proposal by 11:59 PM",
      important: true
    },
    {
      id: "evt2",
      title: "Advisor Meeting",
      date: "2025-05-05",
      time: "14:00 - 15:00",
      type: "meeting",
      description: "Discuss research methodology and timeline",
      location: "Computer Science Building, Room 405",
      participants: ["Dr. Robert Johnson"]
    },
    {
      id: "evt3",
      title: "Proposal Defense",
      date: "2025-05-15",
      time: "10:00 - 11:30",
      type: "milestone",
      description: "Defend your thesis proposal before the committee",
      location: "Computer Science Building, Room 302",
      participants: ["Dr. Robert Johnson", "Dr. Emily Chen", "Dr. Michael Smith"],
      important: true
    },
    {
      id: "evt4",
      title: "Research Methods Workshop",
      date: "2025-06-10",
      time: "13:00 - 16:00",
      type: "reminder",
      description: "Mandatory workshop for all thesis students",
      location: "University Center, Room 201"
    },
    {
      id: "evt5",
      title: "Literature Review Draft Due",
      date: "2025-06-25",
      type: "submission",
      description: "Submit first draft of literature review to advisor",
      documents: ["literature_review_template.docx"]
    }
  ]);
  
  // Get calendar days
  const calendarDays = generateCalendarDays(currentYear, currentMonth, events);
  
  // Get month name
  const monthName = new Date(currentYear, currentMonth).toLocaleDateString('en-US', { month: 'long' });
  
  // Go to next month
  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };
  
  // Go to previous month
  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };
  
  // Go to today
  const goToToday = () => {
    setCurrentMonth(today.getMonth());
    setCurrentYear(today.getFullYear());
    setSelectedDate(formatDateToString(today));
  };
  
  // Open add event modal
  const handleAddEvent = (date: string) => {
    setEventDate(date);
    setEventTitle("");
    setEventTime("");
    setEventType("");
    setEventDescription("");
    setEventLocation("");
    setEventParticipants("");
    setIsImportant(false);
    onEventOpen();
  };
  
  // Open view event modal
  const handleViewEvent = (event: CalendarEvent) => {
    setSelectedEvent(event);
    onViewOpen();
  };
  
  // Submit new event
  const handleSubmitEvent = () => {
    if (!eventTitle || !eventDate || !eventType) {
      toast({
        title: "Missing information",
        description: "Please fill all required fields",
        status: "error",
        duration: 3000,
        isClosable: true
      });
      return;
    }
    
    // Create new event
    const newEvent: CalendarEvent = {
      id: `evt${events.length + 1}`,
      title: eventTitle,
      date: eventDate,
      time: eventTime || undefined,
      type: eventType as "deadline" | "meeting" | "milestone" | "submission" | "reminder",
      description: eventDescription || undefined,
      location: eventLocation || undefined,
      participants: eventParticipants ? eventParticipants.split(",").map(p => p.trim()) : undefined,
      important: isImportant
    };
    
    setEvents([...events, newEvent]);
    
    toast({
      title: "Event Added",
      description: "Your event has been added to the calendar",
      status: "success",
      duration: 3000,
      isClosable: true
    });
    
    onEventClose();
  };
  
  // Toggle event completion
  const toggleEventCompletion = (id: string) => {
    setEvents(
      events.map(event =>
        event.id === id ? { ...event, completed: !event.completed } : event
      )
    );
  };
  
  // Delete event
  const deleteEvent = (id: string) => {
    setEvents(events.filter(event => event.id !== id));
    
    toast({
      title: "Event Deleted",
      description: "The event has been removed from your calendar",
      status: "info",
      duration: 3000,
      isClosable: true
    });
    
    onViewClose();
  };
  
  // Render event badge
  const renderEventBadge = (type: string) => {
    switch (type) {
      case "deadline":
        return <Badge colorScheme="red">Deadline</Badge>;
      case "meeting":
        return <Badge colorScheme="blue">Meeting</Badge>;
      case "milestone":
        return <Badge colorScheme="purple">Milestone</Badge>;
      case "submission":
        return <Badge colorScheme="green">Submission</Badge>;
      case "reminder":
        return <Badge colorScheme="orange">Reminder</Badge>;
      default:
        return null;
    }
  };
  
  // Get event icon
  const getEventIcon = (type: string) => {
    switch (type) {
      case "deadline":
        return <WarningIcon color="red.500" />;
      case "meeting":
        return <Icon as={FaUsers} color="blue.500" />;
      case "milestone":
        return <Icon as={FaGraduationCap} color="purple.500" />;
      case "submission":
        return <Icon as={FaBook} color="green.500" />;
      case "reminder":
        return <InfoIcon color="orange.500" />;
      default:
        return <CalendarIcon color="gray.500" />;
    }
  };
  
  // Filter events by month
  const getEventsInMonth = () => {
    return events.filter(event => {
      const [year, month] = event.date.split('-').map(Number);
      return year === currentYear && month === currentMonth + 1;
    });
  };
  
  // Get events for today
  const getTodayEvents = () => {
    const todayStr = formatDateToString(today);
    return events.filter(event => event.date === todayStr);
  };
  
  // Get upcoming events
  const getUpcomingEvents = () => {
    const todayStr = formatDateToString(today);
    return events
      .filter(event => event.date >= todayStr && !event.completed)
      .sort((a, b) => a.date.localeCompare(b.date));
  };
  
  // Get events by date
  const getEventsByDate = (date: string) => {
    return events.filter(event => event.date === date);
  };

  return (
    <Container maxW="container.xl" py={8}>
      <Box mb={6}>
        <Heading size="lg" mb={2}>
          Thesis Calendar
        </Heading>
        <Text color="gray.600">
          Manage and track important thesis dates and events
        </Text>
      </Box>

      <Tabs colorScheme="blue" variant="enclosed" bg="white" borderRadius="lg" borderWidth="1px" borderColor="gray.200">
        <TabList px={4} pt={4}>
          <Tab _selected={{ color: 'blue.600', borderColor: 'currentColor', borderBottomColor: 'white' }}>Calendar View</Tab>
          <Tab _selected={{ color: 'blue.600', borderColor: 'currentColor', borderBottomColor: 'white' }}>List View</Tab>
        </TabList>

        <TabPanels>
          {/* Calendar View Tab */}
          <TabPanel p={5}>
            <Box mb={6}>
              <Flex justify="space-between" align="center" mb={4}>
                <Heading size="md">
                  {monthName} {currentYear}
                </Heading>
                <HStack>
                  <Button size="sm" leftIcon={<CalendarIcon />} colorScheme="blue" variant="outline" onClick={goToToday}>
                    Today
                  </Button>
                  <Button size="sm" leftIcon={<AddIcon />} colorScheme="green" onClick={() => handleAddEvent(selectedDate)}>
                    Add Event
                  </Button>
                  <IconButton
                    aria-label="Previous month"
                    icon={<ChevronLeftIcon />}
                    size="sm"
                    onClick={prevMonth}
                  />
                  <IconButton
                    aria-label="Next month"
                    icon={<ChevronRightIcon />}
                    size="sm"
                    onClick={nextMonth}
                  />
                </HStack>
              </Flex>

              {/* Calendar grid header */}
              <Grid templateColumns="repeat(7, 1fr)" gap={1} mb={1}>
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
                  <GridItem key={index} textAlign="center" fontWeight="medium" fontSize="sm" py={2}>
                    {day}
                  </GridItem>
                ))}
              </Grid>

              {/* Calendar grid */}
              <Grid templateColumns="repeat(7, 1fr)" gap={1}>
                {calendarDays.map((day, index) => {
                  const dateStr = `${day.year}-${String(day.month + 1).padStart(2, '0')}-${String(day.date).padStart(2, '0')}`;
                  const isToday = formatDateToString(today) === dateStr;
                  const isSelected = selectedDate === dateStr;
                  
                  return (
                    <GridItem
                      key={index}
                      p={2}
                      bg={isSelected ? "blue.50" : day.isCurrentMonth ? "white" : "gray.50"}
                      borderWidth="1px"
                      borderColor={isToday ? "blue.400" : isSelected ? "blue.200" : "gray.200"}
                      borderRadius="md"
                      onClick={() => setSelectedDate(dateStr)}
                      cursor="pointer"
                      _hover={{ bg: "blue.50" }}
                      minH="100px"
                    >
                      <Flex justify="space-between" align="center" mb={1}>
                        <Text
                          fontWeight={isToday ? "bold" : "normal"}
                          color={day.isCurrentMonth ? (isToday ? "blue.500" : "black") : "gray.400"}
                        >
                          {day.date}
                        </Text>
                        {day.events.length > 0 && (
                          <IconButton
                            aria-label="Add event"
                            icon={<AddIcon />}
                            size="xs"
                            variant="ghost"
                            colorScheme="green"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleAddEvent(dateStr);
                            }}
                          />
                        )}
                      </Flex>
                      
                      {day.events.length > 0 && (
                        <VStack align="stretch" spacing={1} mt={1}>
                          {day.events.slice(0, 3).map((event, i) => (
                            <Box
                              key={i}
                              p={1}
                              borderRadius="sm"
                              bg={
                                event.type === "deadline" ? "red.100" :
                                event.type === "meeting" ? "blue.100" :
                                event.type === "milestone" ? "purple.100" :
                                event.type === "submission" ? "green.100" :
                                "orange.100"
                              }
                              onClick={(e) => {
                                e.stopPropagation();
                                handleViewEvent(event);
                              }}
                              cursor="pointer"
                              fontSize="xs"
                              fontWeight={event.important ? "bold" : "normal"}
                              textDecoration={event.completed ? "line-through" : "none"}
                              opacity={event.completed ? 0.7 : 1}
                            >
                              <Text noOfLines={1}>
                                {event.title}
                              </Text>
                            </Box>
                          ))}
                          {day.events.length > 3 && (
                            <Text fontSize="xs" textAlign="right" color="blue.500">
                              +{day.events.length - 3} more
                            </Text>
                          )}
                        </VStack>
                      )}
                    </GridItem>
                  );
                })}
              </Grid>
            </Box>

            {/* Selected Date Events */}
            <Box mt={8}>
              <Flex justify="space-between" align="center" mb={4}>
                <Heading size="md">
                  Events for {formatDateDisplay(selectedDate)}
                </Heading>
                <Button
                  size="sm"
                  leftIcon={<AddIcon />}
                  colorScheme="green"
                  onClick={() => handleAddEvent(selectedDate)}
                >
                  Add Event
                </Button>
              </Flex>

              {getEventsByDate(selectedDate).length > 0 ? (
                <VStack align="stretch" spacing={3}>
                  {getEventsByDate(selectedDate).map((event, index) => (
                    <Card key={index} variant="outline" borderColor={
                      event.type === "deadline" ? "red.200" :
                      event.type === "meeting" ? "blue.200" :
                      event.type === "milestone" ? "purple.200" :
                      event.type === "submission" ? "green.200" :
                      "orange.200"
                    }>
                      <CardBody>
                        <Flex justify="space-between" align="flex-start">
                          <HStack align="flex-start" spacing={3}>
                            <Box mt={1}>
                              {getEventIcon(event.type)}
                            </Box>
                            <Box>
                              <Flex align="center" mb={1}>
                                <Heading size="sm" mr={2} textDecoration={event.completed ? "line-through" : "none"}>
                                  {event.title}
                                </Heading>
                                {renderEventBadge(event.type)}
                                {event.important && (
                                  <Badge colorScheme="yellow" ml={2}>Important</Badge>
                                )}
                              </Flex>
                              
                              {event.time && (
                                <HStack fontSize="sm" color="gray.600" mb={1}>
                                  <TimeIcon />
                                  <Text>{event.time}</Text>
                                </HStack>
                              )}
                              
                              {event.location && (
                                <Text fontSize="sm" color="gray.600">
                                  Location: {event.location}
                                </Text>
                              )}
                              
                              {event.description && (
                                <Text fontSize="sm" mt={2}>
                                  {event.description}
                                </Text>
                              )}
                            </Box>
                          </HStack>
                          
                          <HStack>
                            <IconButton
                              aria-label="Toggle completion"
                              icon={event.completed ? <RepeatIcon /> : <CheckCircleIcon />}
                              size="sm"
                              colorScheme={event.completed ? "gray" : "green"}
                              variant="ghost"
                              onClick={() => toggleEventCompletion(event.id)}
                            />
                            <IconButton
                              aria-label="View details"
                              icon={<SearchIcon />}
                              size="sm"
                              colorScheme="blue"
                              variant="ghost"
                              onClick={() => handleViewEvent(event)}
                            />
                          </HStack>
                        </Flex>
                      </CardBody>
                    </Card>
                  ))}
                </VStack>
              ) : (
                <Box textAlign="center" py={8} borderWidth="1px" borderRadius="md" borderStyle="dashed">
                  <Text color="gray.500" mb={4}>No events scheduled for this date</Text>
                  <Button
                    size="sm"
                    leftIcon={<AddIcon />}
                    colorScheme="green"
                    onClick={() => handleAddEvent(selectedDate)}
                  >
                    Add Event
                  </Button>
                </Box>
              )}
            </Box>
          </TabPanel>

          {/* List View Tab */}
          <TabPanel p={5}>
            <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={6}>
              {/* Upcoming Events */}
              <Box>
                <Card mb={6}>
                  <CardHeader bg="blue.50" py={4}>
                    <Heading size="md" color="blue.700">
                      Upcoming Events
                    </Heading>
                  </CardHeader>
                  <CardBody>
                    {getUpcomingEvents().length > 0 ? (
                      <VStack align="stretch" spacing={4}>
                        {getUpcomingEvents().slice(0, 10).map((event, index) => (
                          <Box
                            key={index}
                            p={3}
                            borderWidth="1px"
                            borderRadius="md"
                            borderLeftWidth="4px"
                            borderLeftColor={
                              event.type === "deadline" ? "red.400" :
                              event.type === "meeting" ? "blue.400" :
                              event.type === "milestone" ? "purple.400" :
                              event.type === "submission" ? "green.400" :
                              "orange.400"
                            }
                          >
                            <Flex justify="space-between" align="center" mb={1}>
                              <Heading size="sm">{event.title}</Heading>
                              {renderEventBadge(event.type)}
                            </Flex>
                            
                            <HStack fontSize="sm" color="gray.600" mb={1}>
                              <CalendarIcon />
                              <Text>{formatDateDisplay(event.date)}</Text>
                              {event.time && (
                                <>
                                  <TimeIcon />
                                  <Text>{event.time}</Text>
                                </>
                              )}
                            </HStack>
                            
                            {event.description && (
                              <Text fontSize="sm" mt={1} noOfLines={2}>
                                {event.description}
                              </Text>
                            )}
                            
                            <HStack mt={2} spacing={2} justify="flex-end">
                              <Button
                                size="xs"
                                colorScheme="blue"
                                variant="ghost"
                                onClick={() => handleViewEvent(event)}
                              >
                                View Details
                              </Button>
                              {!event.completed && (
                                <Button
                                  size="xs"
                                  colorScheme="green"
                                  variant="ghost"
                                  leftIcon={<CheckCircleIcon />}
                                  onClick={() => toggleEventCompletion(event.id)}
                                >
                                  Mark Complete
                                </Button>
                              )}
                            </HStack>
                          </Box>
                        ))}
                        
                        {getUpcomingEvents().length > 10 && (
                          <Button
                            size="sm"
                            colorScheme="blue"
                            variant="outline"
                            rightIcon={<ChevronRightIcon />}
                            width="full"
                          >
                            View All ({getUpcomingEvents().length}) Events
                          </Button>
                        )}
                      </VStack>
                    ) : (
                      <Box textAlign="center" py={6}>
                        <Text color="gray.500" mb={3}>No upcoming events</Text>
                        <Button
                          size="sm"
                          leftIcon={<AddIcon />}
                          colorScheme="green"
                          onClick={() => handleAddEvent(selectedDate)}
                        >
                          Add New Event
                        </Button>
                      </Box>
                    )}
                  </CardBody>
                </Card>
                
                <Card>
                  <CardHeader bg="red.50" py={4}>
                    <Heading size="md" color="red.700">
                      Important Deadlines
                    </Heading>
                  </CardHeader>
                  <CardBody>
                    {events.filter(e => e.type === "deadline" || e.important).length > 0 ? (
                      <VStack align="stretch" spacing={3}>
                        {events
                          .filter(e => e.type === "deadline" || e.important)
                          .sort((a, b) => a.date.localeCompare(b.date))
                          .map((event, index) => (
                            <Flex
                              key={index}
                              p={3}
                              borderWidth="1px"
                              borderRadius="md"
                              borderColor={event.completed ? "gray.200" : "red.200"}
                              bg={event.completed ? "gray.50" : "red.50"}
                              justify="space-between"
                              align="center"
                              opacity={event.completed ? 0.7 : 1}
                            >
                              <Box>
                                <Flex align="center" mb={1}>
                                  <Text
                                    fontWeight="medium"
                                    textDecoration={event.completed ? "line-through" : "none"}
                                  >
                                    {event.title}
                                  </Text>
                                  <Badge ml={2} colorScheme={event.completed ? "gray" : "red"}>
                                    {event.completed ? "Completed" : "Deadline"}
                                  </Badge>
                                </Flex>
                                <HStack fontSize="sm" color={event.completed ? "gray.500" : "red.700"}>
                                  <CalendarIcon />
                                  <Text>{formatDateDisplay(event.date)}</Text>
                                </HStack>
                              </Box>
                              <IconButton
                                aria-label="Toggle completion"
                                icon={event.completed ? <RepeatIcon /> : <CheckCircleIcon />}
                                size="sm"
                                colorScheme={event.completed ? "gray" : "green"}
                                variant="ghost"
                                onClick={() => toggleEventCompletion(event.id)}
                              />
                            </Flex>
                          ))}
                      </VStack>
                    ) : (
                      <Box textAlign="center" py={6}>
                        <Text color="gray.500">No important deadlines</Text>
                      </Box>
                    )}
                  </CardBody>
                </Card>
              </Box>
              
              {/* Today's Events and Filters */}
              <Box>
                <Card mb={6}>
                  <CardHeader bg="green.50" py={4}>
                    <Heading size="md" color="green.700">
                      Today's Events
                    </Heading>
                  </CardHeader>
                  <CardBody>
                    {getTodayEvents().length > 0 ? (
                      <VStack align="stretch" spacing={3}>
                        {getTodayEvents().map((event, index) => (
                          <Box
                            key={index}
                            p={3}
                            borderWidth="1px"
                            borderRadius="md"
                            borderColor={
                              event.type === "deadline" ? "red.200" :
                              event.type === "meeting" ? "blue.200" :
                              event.type === "milestone" ? "purple.200" :
                              event.type === "submission" ? "green.200" :
                              "orange.200"
                            }
                            bg={
                              event.type === "deadline" ? "red.50" :
                              event.type === "meeting" ? "blue.50" :
                              event.type === "milestone" ? "purple.50" :
                              event.type === "submission" ? "green.50" :
                              "orange.50"
                            }
                          >
                            <Flex justify="space-between" align="flex-start">
                              <HStack align="flex-start" spacing={3}>
                                <Box mt={1}>
                                  {getEventIcon(event.type)}
                                </Box>
                                <Box>
                                  <HStack mb={1}>
                                    <Text fontWeight="medium">{event.title}</Text>
                                    {renderEventBadge(event.type)}
                                  </HStack>
                                  
                                  {event.time && (
                                    <Text fontSize="sm" color="gray.600">
                                      Time: {event.time}
                                    </Text>
                                  )}
                                  
                                  {event.location && (
                                    <Text fontSize="sm" color="gray.600">
                                      Location: {event.location}
                                    </Text>
                                  )}
                                </Box>
                              </HStack>
                              
                              <Button
                                size="xs"
                                leftIcon={<CheckCircleIcon />}
                                colorScheme="green"
                                variant={event.completed ? "solid" : "outline"}
                                onClick={() => toggleEventCompletion(event.id)}
                              >
                                {event.completed ? "Done" : "Complete"}
                              </Button>
                            </Flex>
                          </Box>
                        ))}
                      </VStack>
                    ) : (
                      <Box textAlign="center" py={6}>
                        <Text color="gray.500" mb={3}>No events scheduled for today</Text>
                        <Button
                          size="sm"
                          leftIcon={<AddIcon />}
                          colorScheme="green"
                          onClick={() => handleAddEvent(formatDateToString(today))}
                        >
                          Add Event for Today
                        </Button>
                      </Box>
                    )}
                  </CardBody>
                </Card>
                
                <Card>
                  <CardHeader bg="purple.50" py={4}>
                    <Heading size="md" color="purple.700">
                      Events by Category
                    </Heading>
                  </CardHeader>
                  <CardBody>
                    <SimpleGrid columns={2} spacing={4} mb={4}>
                      <Box p={3} borderWidth="1px" borderRadius="md" borderColor="red.200" bg="red.50">
                        <Flex justify="space-between" align="center">
                          <HStack>
                            <WarningIcon color="red.500" />
                            <Text fontWeight="medium">Deadlines</Text>
                          </HStack>
                          <Badge colorScheme="red" borderRadius="full" px={2}>
                            {events.filter(e => e.type === "deadline").length}
                          </Badge>
                        </Flex>
                      </Box>
                      
                      <Box p={3} borderWidth="1px" borderRadius="md" borderColor="blue.200" bg="blue.50">
                        <Flex justify="space-between" align="center">
                          <HStack>
                            <Icon as={FaUsers} color="blue.500" />
                            <Text fontWeight="medium">Meetings</Text>
                          </HStack>
                          <Badge colorScheme="blue" borderRadius="full" px={2}>
                            {events.filter(e => e.type === "meeting").length}
                          </Badge>
                        </Flex>
                      </Box>
                      
                      <Box p={3} borderWidth="1px" borderRadius="md" borderColor="purple.200" bg="purple.50">
                        <Flex justify="space-between" align="center">
                          <HStack>
                            <Icon as={FaGraduationCap} color="purple.500" />
                            <Text fontWeight="medium">Milestones</Text>
                          </HStack>
                          <Badge colorScheme="purple" borderRadius="full" px={2}>
                            {events.filter(e => e.type === "milestone").length}
                          </Badge>
                        </Flex>
                      </Box>
                      
                      <Box p={3} borderWidth="1px" borderRadius="md" borderColor="green.200" bg="green.50">
                        <Flex justify="space-between" align="center">
                          <HStack>
                            <Icon as={FaBook} color="green.500" />
                            <Text fontWeight="medium">Submissions</Text>
                          </HStack>
                          <Badge colorScheme="green" borderRadius="full" px={2}>
                            {events.filter(e => e.type === "submission").length}
                          </Badge>
                        </Flex>
                      </Box>
                    </SimpleGrid>
                    
                    <Divider mb={4} />
                    
                    <Button
                      leftIcon={<AddIcon />}
                      colorScheme="purple"
                      variant="outline"
                      width="full"
                      onClick={() => handleAddEvent(selectedDate)}
                    >
                      Add New Event
                    </Button>
                  </CardBody>
                </Card>
              </Box>
            </SimpleGrid>
          </TabPanel>
        </TabPanels>
      </Tabs>

      {/* Add Event Modal */}
      <Modal isOpen={isEventOpen} onClose={onEventClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New Event</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4} align="stretch">
              <FormControl isRequired>
                <FormLabel>Event Title</FormLabel>
                <Input 
                  placeholder="Enter event title"
                  value={eventTitle}
                  onChange={(e) => setEventTitle(e.target.value)}
                />
              </FormControl>
              
              <FormControl isRequired>
                <FormLabel>Date</FormLabel>
                <Input 
                  type="date"
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                />
              </FormControl>
              
              <FormControl>
                <FormLabel>Time (Optional)</FormLabel>
                <Input 
                  placeholder="e.g., 10:00 AM - 12:00 PM"
                  value={eventTime}
                  onChange={(e) => setEventTime(e.target.value)}
                />
              </FormControl>
              
              <FormControl isRequired>
                <FormLabel>Event Type</FormLabel>
                <Select 
                  placeholder="Select event type"
                  value={eventType}
                  onChange={(e) => setEventType(e.target.value)}
                >
                  <option value="deadline">Deadline</option>
                  <option value="meeting">Meeting</option>
                  <option value="milestone">Milestone</option>
                  <option value="submission">Submission</option>
                  <option value="reminder">Reminder</option>
                </Select>
              </FormControl>
              
              <FormControl>
                <FormLabel>Description (Optional)</FormLabel>
                <Textarea 
                  placeholder="Enter event description"
                  value={eventDescription}
                  onChange={(e) => setEventDescription(e.target.value)}
                />
              </FormControl>
              
              <FormControl>
                <FormLabel>Location (Optional)</FormLabel>
                <Input 
                  placeholder="Enter location"
                  value={eventLocation}
                  onChange={(e) => setEventLocation(e.target.value)}
                />
              </FormControl>
              
              <FormControl>
                <FormLabel>Participants (Optional)</FormLabel>
                <Input 
                  placeholder="Enter participants, separated by commas"
                  value={eventParticipants}
                  onChange={(e) => setEventParticipants(e.target.value)}
                />
                <FormHelperText>
                  e.g., Dr. Robert Johnson, Dr. Emily Chen
                </FormHelperText>
              </FormControl>
              
              <FormControl>
                <FormLabel>Mark as Important</FormLabel>
                <Select 
                  value={isImportant ? "yes" : "no"}
                  onChange={(e) => setIsImportant(e.target.value === "yes")}
                >
                  <option value="no">No</option>
                  <option value="yes">Yes</option>
                </Select>
              </FormControl>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onEventClose}>
              Cancel
            </Button>
            <Button colorScheme="blue" onClick={handleSubmitEvent}>
              Add Event
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* View Event Modal */}
      <Modal isOpen={isViewOpen} onClose={onViewClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Event Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedEvent && (
              <VStack spacing={4} align="stretch">
                <Box>
                  <Flex justify="space-between" align="center">
                    <Heading size="md">{selectedEvent.title}</Heading>
                    {renderEventBadge(selectedEvent.type)}
                  </Flex>
                </Box>
                
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                  <Box>
                    <Text fontSize="sm" color="gray.500">Date</Text>
                    <Text fontWeight="medium">{formatDateDisplay(selectedEvent.date)}</Text>
                  </Box>
                  {selectedEvent.time && (
                    <Box>
                      <Text fontSize="sm" color="gray.500">Time</Text>
                      <Text fontWeight="medium">{selectedEvent.time}</Text>
                    </Box>
                  )}
                </SimpleGrid>
                
                {selectedEvent.location && (
                  <Box>
                    <Text fontSize="sm" color="gray.500">Location</Text>
                    <Text fontWeight="medium">{selectedEvent.location}</Text>
                  </Box>
                )}
                
                {selectedEvent.description && (
                  <Box>
                    <Text fontSize="sm" color="gray.500">Description</Text>
                    <Text>{selectedEvent.description}</Text>
                  </Box>
                )}
                
                {selectedEvent.participants && selectedEvent.participants.length > 0 && (
                  <Box>
                    <Text fontSize="sm" color="gray.500">Participants</Text>
                    <List spacing={1}>
                      {selectedEvent.participants.map((participant, idx) => (
                        <ListItem key={idx}>
                          <HStack>
                            <ListIcon as={InfoIcon} color="blue.500" />
                            <Text>{participant}</Text>
                          </HStack>
                        </ListItem>
                      ))}
                    </List>
                  </Box>
                )}
                
                {selectedEvent.documents && selectedEvent.documents.length > 0 && (
                  <Box>
                    <Text fontSize="sm" color="gray.500">Documents</Text>
                    <VStack align="stretch" spacing={2} mt={2}>
                      {selectedEvent.documents.map((doc, idx) => (
                        <Flex
                          key={idx}
                          p={2}
                          borderWidth="1px"
                          borderRadius="md"
                          justify="space-between"
                          align="center"
                        >
                          <HStack>
                            <Icon as={FaFilePdf} color="red.500" />
                            <Text fontSize="sm">{doc}</Text>
                          </HStack>
                          <Button
                            size="xs"
                            leftIcon={<DownloadIcon />}
                            colorScheme="blue"
                            variant="ghost"
                          >
                            Download
                          </Button>
                        </Flex>
                      ))}
                    </VStack>
                  </Box>
                )}
                
                <Box>
                  <Text fontSize="sm" color="gray.500">Status</Text>
                  <Badge
                    colorScheme={selectedEvent.completed ? "green" : "yellow"}
                    p={2}
                    borderRadius="full"
                  >
                    {selectedEvent.completed ? "Completed" : "Pending"}
                  </Badge>
                </Box>
              </VStack>
            )}
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="red"
              variant="ghost"
              mr="auto"
              leftIcon={<CloseIcon />}
              onClick={() => selectedEvent && deleteEvent(selectedEvent.id)}
            >
              Delete
            </Button>
            <Button
              colorScheme={selectedEvent?.completed ? "gray" : "green"}
              mr={3}
              leftIcon={selectedEvent?.completed ? <RepeatIcon /> : <CheckCircleIcon />}
              onClick={() => {
                if (selectedEvent) {
                  toggleEventCompletion(selectedEvent.id);
                  onViewClose();
                }
              }}
            >
              {selectedEvent?.completed ? "Mark as Pending" : "Mark as Completed"}
            </Button>
            <Button variant="ghost" onClick={onViewClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default ThesisCalendar;