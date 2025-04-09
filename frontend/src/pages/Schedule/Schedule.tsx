import { useState, useEffect } from "react";
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
  useDisclosure,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
} from "@chakra-ui/react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  CalendarIcon,
  TimeIcon,
} from "@chakra-ui/icons";
import { BsBook, BsBuilding } from "react-icons/bs";
import { MdArrowDropDownCircle } from "react-icons/md";

// Define interfaces
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

interface CalendarCellProps {
  day: Date;
  events: ScheduleEvent[];
  currentMonth: number;
  currentDate: Date;
  onSelectDay: (day: Date) => void;
  isSelected: boolean;
}

// Calendar cell component for rendering days
const CalendarCell: React.FC<CalendarCellProps> = ({
  day,
  events,
  currentMonth,
  currentDate,
  onSelectDay,
  isSelected,
}) => {
  const isToday =
    day.getDate() === currentDate.getDate() &&
    day.getMonth() === currentDate.getMonth() &&
    day.getFullYear() === currentDate.getFullYear();

  const isCurrentMonth = day.getMonth() === currentMonth;
  
  // Format date to match event date format
  const formattedDate = `${day.getFullYear()}-${String(
    day.getMonth() + 1
  ).padStart(2, "0")}-${String(day.getDate()).padStart(2, "0")}`;

  // Filter events for this day using the formatted date
  const dayEvents = events.filter((event) => event.date === formattedDate);
  const hasEvents = dayEvents.length > 0;

  return (
    <Box
      borderWidth="1px"
      borderColor={isSelected ? "blue.500" : "gray.200"}
      bg={isSelected ? "blue.100" : isToday ? "blue.50" : isCurrentMonth ? "white" : "gray.50"}
      p={2}
      position="relative"
      minHeight="100px"
      cursor="pointer"
      onClick={() => onSelectDay(day)}
      _hover={{ 
        boxShadow: "md",
        borderColor: "blue.300"
      }}
      transition="all 0.2s"
    >
      <Flex justify="space-between" mb={1}>
        <Text
          fontWeight={(isToday || isSelected) ? "bold" : "normal"}
          color={isCurrentMonth ? ((isToday || isSelected) ? "blue.500" : "black") : "gray.400"}
        >
          {day.getDate()}
        </Text>
        {isToday && (
          <Badge
            colorScheme="blue"
            variant="solid"
            borderRadius="full"
            size="sm"
          >
            Today
          </Badge>
        )}
      </Flex>

      {/* Events for this day */}
      <VStack spacing={1} align="stretch">
        {dayEvents.slice(0, 2).map((event, idx) => (
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
        {dayEvents.length > 2 && (
          <Text fontSize="xs" color="gray.600" textAlign="center">
            +{dayEvents.length - 2} more
          </Text>
        )}
      </VStack>
    </Box>
  );
};

const Schedule: React.FC = () => {
  const [currentDate] = useState(new Date());
  const [selectedMonth, setSelectedMonth] = useState(currentDate.getMonth());
  const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear());
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Convert month number to name
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Days of week header
  const daysOfWeek = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  // Mock schedule events - now includes more events in April 2025
  const [scheduleEvents] = useState<ScheduleEvent[]>([
    {
      id: "1",
      title: "IT Service & Risk Management",
      type: "lecture",
      date: "2025-04-02",
      startTime: "07:00",
      endTime: "09:00",
      location: "LE2123",
      instructor: "Joni Zimbabwe",
      session: 4,
      isOnsite: true,
    },
    {
      id: "2",
      title: "User Experience Research & Design",
      type: "lecture",
      date: "2025-04-03",
      startTime: "12:00",
      endTime: "13:45",
      location: "LE1105",
      instructor: "Jacob Jones",
      session: 2,
      isOnsite: true,
    },
    {
      id: "3",
      title: "Digital Banking",
      type: "lecture",
      date: "2025-04-05",
      startTime: "10:00",
      endTime: "11:45",
      location: "LE3210",
      instructor: "Esther Howard",
      session: 3,
      isOnsite: true,
    },
    {
      id: "4",
      title: "Introduction to Database System - Lab",
      type: "lab",
      date: "2025-04-08",
      startTime: "15:20",
      endTime: "17:00",
      location: "A1701",
      instructor: "Cody Fisher",
      session: 2,
      isOnsite: true,
    },
    {
      id: "5",
      title: "Computational Biology",
      type: "lab",
      date: "2025-04-09",
      startTime: "07:20",
      endTime: "09:00",
      location: "A1302",
      instructor: "Mark Johnson",
      session: 2,
      isOnsite: true,
    },
    {
      id: "6",
      title: "Advanced Programming",
      type: "lecture",
      date: "2025-04-10",
      startTime: "09:00",
      endTime: "11:00",
      location: "LE2223",
      instructor: "Sarah Williams",
      session: 5,
      isOnsite: true,
    },
    {
      id: "7",
      title: "Data Structures & Algorithms",
      type: "lecture",
      date: "2025-04-12",
      startTime: "13:00",
      endTime: "15:00",
      location: "LE1205",
      instructor: "Michael Brown",
      session: 3,
      isOnsite: true,
    },
    {
      id: "8",
      title: "Mobile App Development",
      type: "lab",
      date: "2025-04-15",
      startTime: "10:00",
      endTime: "12:00",
      location: "A1501",
      instructor: "Emily Davis",
      session: 4,
      isOnsite: true,
    },
    {
      id: "9",
      title: "Web Development Workshop",
      type: "lab",
      date: "2025-04-17",
      startTime: "14:00",
      endTime: "16:00",
      location: "A1602",
      instructor: "David Miller",
      session: 2,
      isOnsite: true,
    },
    {
      id: "10",
      title: "Cloud Computing Fundamentals",
      type: "lecture",
      date: "2025-04-17",
      startTime: "09:00",
      endTime: "11:00",
      location: "LE1108",
      instructor: "Jessica Taylor",
      session: 3,
      isOnsite: false,
    },
    {
      id: "11",
      title: "Machine Learning Principles",
      type: "lecture",
      date: "2025-04-19",
      startTime: "13:30",
      endTime: "15:30",
      location: "LE3101",
      instructor: "Robert Chen",
      session: 5,
      isOnsite: true,
    },
    {
      id: "12",
      title: "UI/UX Design Workshop",
      type: "lab",
      date: "2025-04-22",
      startTime: "14:30",
      endTime: "16:30",
      location: "A1405",
      instructor: "Linda Kim",
      session: 4,
      isOnsite: true,
    },
    {
      id: "13",
      title: "Cybersecurity Essentials",
      type: "lecture",
      date: "2025-04-24",
      startTime: "10:30",
      endTime: "12:30",
      location: "LE2202",
      instructor: "Thomas Wilson",
      session: 3,
      isOnsite: true,
    },
    {
      id: "14",
      title: "Data Analytics with Python",
      type: "lab",
      date: "2025-04-26",
      startTime: "08:00",
      endTime: "10:00",
      location: "A1503",
      instructor: "Sophia Martinez",
      session: 6,
      isOnsite: true,
    },
    {
      id: "15",
      title: "Software Engineering Principles",
      type: "lecture",
      date: "2025-04-29",
      startTime: "11:00",
      endTime: "13:00",
      location: "LE1210",
      instructor: "Daniel Lee",
      session: 4,
      isOnsite: true,
    },
  ]);

  // Set initial selected day to today's date
  useEffect(() => {
    setSelectedDay(new Date());
  }, []);

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
    setSelectedMonth((prevMonth) => {
      if (prevMonth === 0) {
        setSelectedYear((prevYear) => prevYear - 1);
        return 11;
      }
      return prevMonth - 1;
    });
  };

  const goToNextMonth = () => {
    setSelectedMonth((prevMonth) => {
      if (prevMonth === 11) {
        setSelectedYear((prevYear) => prevYear + 1);
        return 0;
      }
      return prevMonth + 1;
    });
  };

  const goToToday = () => {
    const today = new Date();
    setSelectedMonth(today.getMonth());
    setSelectedYear(today.getFullYear());
    setSelectedDay(today);
  };

  // Handle day selection - now just sets the selected day
  const handleSelectDay = (day: Date) => {
    setSelectedDay(day);
  };

  // Format date for comparison with event dates
  const formatDate = (date: Date) => {
    return `${date.getFullYear()}-${String(
      date.getMonth() + 1
    ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
  };

  // Get events for a specific date
  const getEventsForDay = (day: Date | null) => {
    if (!day) return [];
    
    const formattedDate = formatDate(day);
    return scheduleEvents
      .filter((event) => event.date === formattedDate)
      .sort((a, b) => a.startTime.localeCompare(b.startTime));
  };

  // Get today's schedule
  const getTodaySchedule = () => {
    const today = new Date();
    const formattedDate = formatDate(today);
    return scheduleEvents
      .filter((event) => event.date === formattedDate)
      .sort((a, b) => a.startTime.localeCompare(b.startTime));
  };

  // Get upcoming schedule
  const getUpcomingSchedule = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return scheduleEvents
      .filter((event) => {
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
  const selectedDayEvents = selectedDay ? getEventsForDay(selectedDay) : [];

  // Check if there are any events for today
  const hasTodayEvents = todaySchedule.length > 0;

  // Function to format date to display
  const formatDisplayDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric"
    });
  };

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

        {/* View Academic Calendar button */}
        <Button variant="outline" size="sm" leftIcon={<CalendarIcon />}>
          View Academic Calendar
        </Button>
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
          <Menu>
            <MenuButton 
              as={Button} 
              variant="ghost" 
              fontWeight="bold" 
              fontSize="xl"
              _hover={{ bg: "transparent" }}
              _active={{ bg: "transparent" }}
              height="auto"
              p={0}
            >
              {monthNames[selectedMonth]} {selectedYear}
            </MenuButton>
            <MenuList p={2}>
              <Box mb={4}>
                <Flex justify="space-between" align="center" mb={2}>
                  <Text fontWeight="bold">{selectedYear}</Text>
                  <HStack>
                    <IconButton
                      aria-label="Previous year"
                      icon={<ChevronLeftIcon />}
                      size="xs"
                      variant="ghost"
                      onClick={() => setSelectedYear(prev => prev - 1)}
                    />
                    <IconButton
                      aria-label="Next year"
                      icon={<ChevronRightIcon />}
                      size="xs"
                      variant="ghost"
                      onClick={() => setSelectedYear(prev => prev + 1)}
                    />
                  </HStack>
                </Flex>
                <Grid templateColumns="repeat(4, 1fr)" gap={2}>
                  {monthNames.map((month, index) => (
                    <Button
                      key={month}
                      size="sm"
                      colorScheme={selectedMonth === index ? "blue" : "gray"}
                      variant={selectedMonth === index ? "solid" : "ghost"}
                      onClick={() => {
                        setSelectedMonth(index);
                        onClose();
                      }}
                    >
                      {month.slice(0, 3)}
                    </Button>
                  ))}
                </Grid>
              </Box>
            </MenuList>
          </Menu>
        </HStack>
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
                onSelectDay={handleSelectDay}
                isSelected={selectedDay ? 
                  day.getDate() === selectedDay.getDate() && 
                  day.getMonth() === selectedDay.getMonth() && 
                  day.getFullYear() === selectedDay.getFullYear() 
                  : false}
              />
            </GridItem>
          ))}
        </Grid>
      </Box>

      {/* Selected Day Schedule and Upcoming Events */}
      <Grid templateColumns={{ base: "1fr", lg: "1fr 1fr" }} gap={6}>
        {/* Selected Day Schedule */}
        <Box bg="white" p={4} borderRadius="md" boxShadow="sm">
          <Flex justifyContent="space-between" alignItems="center" mb={4}>
            <Text fontWeight="bold" fontSize="lg">
              {selectedDay && selectedDay.getDate() === currentDate.getDate() && 
               selectedDay.getMonth() === currentDate.getMonth() && 
               selectedDay.getFullYear() === currentDate.getFullYear() 
                ? "Today's Schedule" 
                : "Schedule for Selected Day"}
            </Text>
            <Badge colorScheme="blue">
              {selectedDay ? formatDisplayDate(selectedDay) : formatDisplayDate(currentDate)}
            </Badge>
          </Flex>

          {selectedDayEvents.length === 0 ? (
            <Flex
              direction="column"
              justifyContent="center"
              alignItems="center"
              p={6}
              bg="gray.50"
              borderRadius="md"
            >
              <CalendarIcon boxSize={8} color="gray.400" mb={2} />
              <Text color="gray.500">No classes scheduled for {selectedDay && selectedDay.getDate() === currentDate.getDate() && 
               selectedDay.getMonth() === currentDate.getMonth() && 
               selectedDay.getFullYear() === currentDate.getFullYear() ? "today" : "this day"}</Text>
            </Flex>
          ) : (
            <VStack spacing={4} align="stretch">
              {selectedDayEvents.map((event) => (
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
                      <BsBuilding style={{ marginRight: "0.25rem" }} />
                      {event.location}
                    </Flex>
                  </HStack>
                  <HStack fontSize="sm" color="gray.600">
                    <Flex align="center">
                      <BsBook style={{ marginRight: "0.25rem" }} />
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
                      {new Date(event.date).toLocaleDateString("en-US", {
                        weekday: "short",
                        month: "short",
                        day: "numeric",
                      })}
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
                      <BsBuilding style={{ marginRight: "0.25rem" }} />
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