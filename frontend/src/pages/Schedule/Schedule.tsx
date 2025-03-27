import { useState } from "react";
import {
  Box,
  Flex,
  Text,
  Heading,
  Grid,
  GridItem,
  HStack,
  VStack,
  Button,
  IconButton,
  Badge,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  CalendarIcon,
  TimeIcon,
} from "@chakra-ui/icons";
import { BsBook, BsBuilding } from "react-icons/bs";
import { MdArrowDropDownCircle } from "react-icons/md";

// Calendar cell component for rendering days
interface CalendarCellProps {
  day: Date;
  events: ScheduleEvent[];
  currentMonth: number;
  currentDate: Date;
}

const CalendarCell: React.FC<CalendarCellProps> = ({ day, events, currentMonth, currentDate }) => {
  const isToday = day.getDate() === currentDate.getDate() &&
                day.getMonth() === currentDate.getMonth() &&
                day.getFullYear() === currentDate.getFullYear();
  
  const isCurrentMonth = day.getMonth() === currentMonth;
  
  // Filter events for this day
  const dayEvents = events.filter(event => {
    const eventDate = new Date(event.date);
    return eventDate.getDate() === day.getDate() &&
           eventDate.getMonth() === day.getMonth() &&
           eventDate.getFullYear() === day.getFullYear();
  });

  return (
    <Box
      borderWidth="1px"
      borderColor="gray.200"
      bg={isToday ? "blue.50" : isCurrentMonth ? "white" : "gray.50"}
      p={2}
      position="relative"
      minHeight="100px"
    >
      <Flex justify="space-between" mb={1}>
        <Text
          fontWeight={isToday ? "bold" : "normal"}
          color={isCurrentMonth ? (isToday ? "blue.500" : "black") : "gray.400"}
        >
          {day.getDate()}
        </Text>
        {isToday && (
          <Badge colorScheme="blue" variant="solid" borderRadius="full" size="sm">
            Today
          </Badge>
        )}
      </Flex>
      
      {/* Events for this day */}
      <VStack spacing={1} align="stretch">
        {dayEvents.map((event, idx) => (
          <Box
            key={idx}
            bg={event.type === "lecture" ? "blue.100" : "green.100"}
            p={1}
            borderRadius="md"
            fontSize="xs"
            overflow="hidden"
            textOverflow="ellipsis"
            whiteSpace="nowrap"
          >
            {event.title}
          </Box>
        ))}
      </VStack>
    </Box>
  );
};

interface ScheduleEvent {
  id: string;
  title: string;
  type: string;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  instructor: string;
  session: number;
  isOnsite: boolean;
}

const Schedule: React.FC = () => {
  const [currentDate] = useState(new Date());
  const [selectedMonth, setSelectedMonth] = useState(currentDate.getMonth());
  const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear());
  const [viewMode, setViewMode] = useState("month"); // month, week, day
  
  // Convert month number to name
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  // Days of week header
  const daysOfWeek = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
  
  // Mock schedule events
  const [scheduleEvents] = useState<ScheduleEvent[]>([
    {
      id: "1",
      title: "IT Service & Risk Management",
      type: "lecture",
      date: "2025-03-26",
      startTime: "07:00",
      endTime: "09:00",
      location: "LE2123",
      instructor: "Joni Zimbabwe",
      session: 4,
      isOnsite: true
    },
    {
      id: "2",
      title: "User Experience Research & Design",
      type: "lecture",
      date: "2025-03-26",
      startTime: "12:00",
      endTime: "13:45",
      location: "LE1105",
      instructor: "Jacob Jones",
      session: 2,
      isOnsite: true
    },
    {
      id: "3",
      title: "Digital Banking",
      type: "lecture",
      date: "2025-03-27",
      startTime: "10:00",
      endTime: "11:45",
      location: "LE3210",
      instructor: "Esther Howard",
      session: 3,
      isOnsite: true
    },
    {
      id: "4",
      title: "Introduction to Database System - Lab",
      type: "lab",
      date: "2025-03-28",
      startTime: "15:20",
      endTime: "17:00",
      location: "A1701",
      instructor: "Cody Fisher",
      session: 2,
      isOnsite: true
    },
    {
      id: "5",
      title: "Computational Biology",
      type: "lab",
      date: "2025-03-29",
      startTime: "07:20",
      endTime: "09:00",
      location: "A1302",
      instructor: "Mark Johnson",
      session: 2,
      isOnsite: true
    },
  ]);

  // Calendar grid generation
  const generateCalendarDays = () => {
    const days = [];
    const firstDayOfMonth = new Date(selectedYear, selectedMonth, 1);
    
    // Find the first day to display (might be from previous month)
    const startDay = new Date(firstDayOfMonth);
    startDay.setDate(startDay.getDate() - startDay.getDay());
    
    // Generate 6 weeks of days (42 days)
    for (let i = 0; i < 42; i++) {
      const currentDay = new Date(startDay);
      currentDay.setDate(startDay.getDate() + i);
      days.push(currentDay);
    }
    
    return days;
  };

  // Handle navigation between months
  const goToPreviousMonth = () => {
    setSelectedMonth(prevMonth => {
      if (prevMonth === 0) {
        setSelectedYear(prevYear => prevYear - 1);
        return 11;
      }
      return prevMonth - 1;
    });
  };

  const goToNextMonth = () => {
    setSelectedMonth(prevMonth => {
      if (prevMonth === 11) {
        setSelectedYear(prevYear => prevYear + 1);
        return 0;
      }
      return prevMonth + 1;
    });
  };

  const goToToday = () => {
    const today = new Date();
    setSelectedMonth(today.getMonth());
    setSelectedYear(today.getFullYear());
  };

  // Get today's schedule
  const getTodaySchedule = () => {
    const today = new Date();
    const formattedDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    
    return scheduleEvents.filter(event => event.date === formattedDate)
      .sort((a, b) => a.startTime.localeCompare(b.startTime));
  };

  // Get upcoming schedule
  const getUpcomingSchedule = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    return scheduleEvents
      .filter(event => {
        const eventDate = new Date(event.date);
        eventDate.setHours(0, 0, 0, 0);
        return eventDate >= today;
      })
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .slice(0, 5); // Get next 5 upcoming events
  };

  const todaySchedule = getTodaySchedule();
  const upcomingSchedule = getUpcomingSchedule();
  const calendarDays = generateCalendarDays();

  return (
    <Box bg="#f8f9fa" minH="calc(100vh - 70px)" p={6}>
      <Flex justifyContent="space-between" alignItems="center" mb={6}>
        <Box>
          <Text fontSize="sm" color="gray.500" mb={1}>
            Schedule
          </Text>
          <Heading as="h1" size="lg" fontWeight="semibold">
            My Schedule
          </Heading>
        </Box>

        {/* View toggle and Sync buttons */}
        <HStack spacing={4}>
          <Button variant="outline" size="sm" leftIcon={<CalendarIcon />}>
            View Academic Calendar
          </Button>
          <Button colorScheme="blue" size="sm">
            Sync to Outlook
          </Button>
        </HStack>
      </Flex>

      {/* Calendar Header with Month Navigation */}
      <Flex
        bg="white"
        p={4}
        borderRadius="md"
        boxShadow="sm"
        mb={4}
        justifyContent="space-between"
        alignItems="center"
      >
        <HStack spacing={4}>
          <Button
            size="sm"
            variant="outline"
            colorScheme="gray"
            onClick={goToToday}
          >
            TODAY
          </Button>
          <IconButton
            aria-label="Previous month"
            icon={<ChevronLeftIcon />}
            size="sm"
            variant="ghost"
            onClick={goToPreviousMonth}
          />
          <IconButton
            aria-label="Next month"
            icon={<ChevronRightIcon />}
            size="sm"
            variant="ghost"
            onClick={goToNextMonth}
          />
          <Text fontWeight="bold" fontSize="xl">
            {monthNames[selectedMonth]} {selectedYear}
          </Text>
        </HStack>

        <Menu>
          <MenuButton
            as={Button}
            rightIcon={<MdArrowDropDownCircle />}
            variant="outline"
            size="sm"
          >
            {viewMode === "month" ? "Month View" : viewMode === "week" ? "Week View" : "Day View"}
          </MenuButton>
          <MenuList>
            <MenuItem onClick={() => setViewMode("month")}>Month View</MenuItem>
            <MenuItem onClick={() => setViewMode("week")}>Week View</MenuItem>
            <MenuItem onClick={() => setViewMode("day")}>Day View</MenuItem>
          </MenuList>
        </Menu>
      </Flex>

      {/* Calendar Grid */}
      <Box bg="white" p={4} borderRadius="md" boxShadow="sm" mb={6}>
        {/* Days of Week header */}
        <Grid templateColumns="repeat(7, 1fr)" gap={1} mb={1}>
          {daysOfWeek.map((day, index) => (
            <GridItem key={index} textAlign="center">
              <Text fontWeight="bold" color="gray.600">
                {day}
              </Text>
            </GridItem>
          ))}
        </Grid>

        {/* Calendar cells */}
        <Grid templateColumns="repeat(7, 1fr)" gap={1}>
          {calendarDays.map((day, index) => (
            <GridItem key={index}>
              <CalendarCell
                day={day}
                events={scheduleEvents}
                currentMonth={selectedMonth}
                currentDate={currentDate}
              />
            </GridItem>
          ))}
        </Grid>
      </Box>

      {/* Today's Schedule and Upcoming Events */}
      <Grid templateColumns={{ base: "1fr", lg: "1fr 1fr" }} gap={6}>
        {/* Today's Schedule */}
        <Box bg="white" p={4} borderRadius="md" boxShadow="sm">
          <Flex justifyContent="space-between" alignItems="center" mb={4}>
            <Text fontWeight="bold" fontSize="lg">
              Today's Schedule
            </Text>
            <Badge colorScheme="blue">
              {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
            </Badge>
          </Flex>

          {todaySchedule.length === 0 ? (
            <Flex
              direction="column"
              justifyContent="center"
              alignItems="center"
              p={6}
              bg="gray.50"
              borderRadius="md"
            >
              <CalendarIcon boxSize={8} color="gray.400" mb={2} />
              <Text color="gray.500">No classes scheduled for today</Text>
            </Flex>
          ) : (
            <VStack spacing={4} align="stretch">
              {todaySchedule.map((event) => (
                <Box
                  key={event.id}
                  borderWidth="1px"
                  borderColor="gray.200"
                  borderRadius="md"
                  p={3}
                  position="relative"
                  _hover={{ boxShadow: "sm" }}
                >
                  <Flex justify="space-between" mb={2}>
                    <Badge
                      colorScheme={event.type === "lecture" ? "blue" : "green"}
                      borderRadius="full"
                    >
                      {event.type === "lecture" ? "Lecture" : "Lab"}
                    </Badge>
                    <Badge
                      colorScheme={event.isOnsite ? "orange" : "purple"}
                      borderRadius="full"
                    >
                      {event.isOnsite ? "Onsite Class" : "Online"}
                    </Badge>
                  </Flex>
                  <Text fontWeight="bold" mb={1}>
                    {event.title}
                  </Text>
                  <HStack spacing={4} fontSize="sm" color="gray.600" mb={2}>
                    <Flex align="center">
                      <TimeIcon mr={1} />
                      {event.startTime} - {event.endTime}
                    </Flex>
                    <Flex align="center">
                      <BsBuilding style={{ marginRight: '0.25rem' }} />
                      {event.location}
                    </Flex>
                  </HStack>
                  <HStack fontSize="sm" color="gray.600">
                    <Flex align="center">
                      <BsBook style={{ marginRight: '0.25rem' }} />
                      Session {event.session}
                    </Flex>
                    <Text>Instructor: {event.instructor}</Text>
                  </HStack>
                </Box>
              ))}
            </VStack>
          )}
        </Box>

        {/* Upcoming Schedule */}
        <Box bg="white" p={4} borderRadius="md" boxShadow="sm">
          <Text fontWeight="bold" fontSize="lg" mb={4}>
            Upcoming Schedule
          </Text>

          {upcomingSchedule.length === 0 ? (
            <Flex
              direction="column"
              justifyContent="center"
              alignItems="center"
              p={6}
              bg="gray.50"
              borderRadius="md"
            >
              <CalendarIcon boxSize={8} color="gray.400" mb={2} />
              <Text color="gray.500">No upcoming classes scheduled</Text>
            </Flex>
          ) : (
            <VStack spacing={4} align="stretch">
              {upcomingSchedule.map((event) => (
                <Box
                  key={event.id}
                  borderWidth="1px"
                  borderColor="gray.200"
                  borderRadius="md"
                  p={3}
                  _hover={{ boxShadow: "sm" }}
                >
                  <Flex justify="space-between" mb={2}>
                    <Badge
                      colorScheme={event.type === "lecture" ? "blue" : "green"}
                      borderRadius="full"
                    >
                      {event.type === "lecture" ? "Lecture" : "Lab"}
                    </Badge>
                    <Text fontSize="sm" color="gray.500">
                      {new Date(event.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                    </Text>
                  </Flex>
                  <Text fontWeight="bold" mb={1}>
                    {event.title}
                  </Text>
                  <HStack spacing={4} fontSize="sm" color="gray.600">
                    <Flex align="center">
                      <TimeIcon mr={1} />
                      {event.startTime} - {event.endTime}
                    </Flex>
                    <Flex align="center">
                      <BsBuilding style={{ marginRight: '0.25rem' }} />
                      {event.location}
                    </Flex>
                  </HStack>
                </Box>
              ))}
            </VStack>
          )}
        </Box>
      </Grid>
    </Box>
  );
};

export default Schedule;