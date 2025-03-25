import { useState, useEffect } from "react";
import {
  Box,
  Flex,
  Text,
  Grid,
  GridItem,
  IconButton,
  Circle,
  HStack,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
} from "@chakra-ui/react";
import {
  ChevronRightIcon,
  ChevronLeftIcon,
  CalendarIcon,
} from "@chakra-ui/icons";

// Calendar day interface
interface CalendarDay {
  day: string;
  date: number;
  isActive?: boolean;
  month: number;
  year: number;
}
interface CalendarComponentProps {
  selectedDate: Date;
  setSelectedDate: React.Dispatch<React.SetStateAction<Date>>;
  cardBg?: string;
}
const CalendarComponent = ({
  selectedDate,
  setSelectedDate,
  cardBg = "white",
}: CalendarComponentProps) => {
  const [calendarDays, setCalendarDays] = useState<CalendarDay[]>([]);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [weekDates, setWeekDates] = useState<number[]>([]);

  // Initialize calendar days
  useEffect(() => {
    generateCalendarDays(selectedDate);
    generateWeekDates(selectedDate);
  }, [selectedDate]);

  // Generate calendar days based on selected date
  const generateCalendarDays = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const currentDate = date.getDate();

    // Get the first day of the week of the current date
    const tempDate = new Date(year, month, currentDate);
    const day = tempDate.getDay(); // 0 = Sunday, 1 = Monday, etc.

    // Create an array of 7 days (1 week) centered around the current date as much as possible
    const days: CalendarDay[] = [];

    // If the current day is not Sunday, add days before
    for (let i = day; i > 0; i--) {
      const prevDate = new Date(year, month, currentDate - i);
      days.push({
        day: getDayAbbreviation(prevDate.getDay()),
        date: prevDate.getDate(),
        month: prevDate.getMonth(),
        year: prevDate.getFullYear(),
        isActive: false,
      });
    }

    // Add current day
    days.push({
      day: getDayAbbreviation(tempDate.getDay()),
      date: tempDate.getDate(),
      month: tempDate.getMonth(),
      year: tempDate.getFullYear(),
      isActive: true,
    });

    // Add days after current day to complete the week
    for (let i = 1; i < 7 - day; i++) {
      const nextDate = new Date(year, month, currentDate + i);
      days.push({
        day: getDayAbbreviation(nextDate.getDay()),
        date: nextDate.getDate(),
        month: nextDate.getMonth(),
        year: nextDate.getFullYear(),
        isActive: false,
      });
    }

    setCalendarDays(days);
  };

  // Generate week dates for the current week view
  const generateWeekDates = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const currentDate = date.getDate();
    const currentDay = date.getDay(); // 0 = Sunday, 1 = Monday, etc.

    const weekDays = [];
    // Start from Sunday (current date - current day)
    for (let i = 0; i < 7; i++) {
      const dayDate = new Date(year, month, currentDate - currentDay + i);
      weekDays.push(dayDate.getDate());
    }

    setWeekDates(weekDays);
  };

  // Get day abbreviation from day number
  const getDayAbbreviation = (day: number): string => {
    const days = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
    return days[day];
  };

  // Change date
  const changeDate = (delta: number) => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + delta);
    setSelectedDate(newDate);
  };

  // Select a specific date from the month view
  const selectDate = (day: CalendarDay) => {
    const newDate = new Date(day.year, day.month, day.date);
    setSelectedDate(newDate);
  };

  // Select a date from the week view
  const selectWeekDate = (dayIndex: number) => {
    // Calculate the date based on the selected day index
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth();
    const currentDate = selectedDate.getDate();
    const currentDay = selectedDate.getDay();

    // Calculate the new date (current date - current day + clicked day index)
    const newDate = new Date(year, month, currentDate - currentDay + dayIndex);
    setSelectedDate(newDate);
  };

  // Get month name
  const getMonthName = (month: number): string => {
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
    return monthNames[month];
  };

  // Change month in calendar
  const changeMonth = (delta: number) => {
    const newDate = new Date(selectedDate);
    newDate.setMonth(newDate.getMonth() + delta);
    setSelectedDate(newDate);
  };

  // Generate full monthly calendar for date picker
  const generateMonthCalendar = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();

    // First day of month
    const firstDay = new Date(year, month, 1).getDay();

    // Last day of month
    const lastDate = new Date(year, month + 1, 0).getDate();

    // Previous month's last date
    const prevMonthLastDate = new Date(year, month, 0).getDate();

    const calendarRows: CalendarDay[][] = [];
    let calendarDaysInRow: CalendarDay[] = [];

    // Previous month days
    for (let i = 0; i < firstDay; i++) {
      const day = prevMonthLastDate - firstDay + i + 1;
      calendarDaysInRow.push({
        day: "",
        date: day,
        month: month - 1,
        year: month === 0 ? year - 1 : year,
        isActive: false,
      });
    }

    // Current month days
    for (let i = 1; i <= lastDate; i++) {
      const isCurrentDate =
        i === selectedDate.getDate() &&
        month === selectedDate.getMonth() &&
        year === selectedDate.getFullYear();

      calendarDaysInRow.push({
        day: "",
        date: i,
        month: month,
        year: year,
        isActive: isCurrentDate,
      });

      if (calendarDaysInRow.length === 7) {
        calendarRows.push([...calendarDaysInRow]);
        calendarDaysInRow = [];
      }
    }

    // Next month days
    if (calendarDaysInRow.length > 0) {
      const remainingDays = 7 - calendarDaysInRow.length;
      for (let i = 1; i <= remainingDays; i++) {
        calendarDaysInRow.push({
          day: "",
          date: i,
          month: month + 1,
          year: month === 11 ? year + 1 : year,
          isActive: false,
        });
      }
      calendarRows.push([...calendarDaysInRow]);
    }

    return calendarRows;
  };

  return (
    <Box bg={cardBg} borderRadius="lg" boxShadow="md" p={4}>
      <Flex justifyContent="space-between" alignItems="center" mb={4}>
        <Flex alignItems="center">
          <Text color="gray.600">
            {selectedDate.toLocaleDateString("en-US", {
              month: "long",
              year: "numeric",
            })}
          </Text>

          {/* Calendar icon for full month view */}
          <Popover
            isOpen={isCalendarOpen}
            onClose={() => setIsCalendarOpen(false)}
            placement="bottom-start"
          >
            <PopoverTrigger>
              <IconButton
                aria-label="Open calendar"
                icon={<CalendarIcon />}
                size="sm"
                variant="ghost"
                ml={2}
                onClick={() => setIsCalendarOpen(true)}
              />
            </PopoverTrigger>
            <PopoverContent width="280px">
              <PopoverHeader fontWeight="semibold">
                <Flex justifyContent="space-between" alignItems="center">
                  <IconButton
                    aria-label="Previous month"
                    icon={<ChevronLeftIcon />}
                    size="sm"
                    variant="ghost"
                    onClick={() => changeMonth(-1)}
                  />
                  <Text>
                    {getMonthName(selectedDate.getMonth())}{" "}
                    {selectedDate.getFullYear()}
                  </Text>
                  <IconButton
                    aria-label="Next month"
                    icon={<ChevronRightIcon />}
                    size="sm"
                    variant="ghost"
                    onClick={() => changeMonth(1)}
                  />
                </Flex>
              </PopoverHeader>
              <PopoverBody p={2}>
                <Grid templateColumns="repeat(7, 1fr)" mb={2}>
                  {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
                    <GridItem key={day} textAlign="center" py={1}>
                      <Text fontSize="xs" fontWeight="bold" color="gray.500">
                        {day}
                      </Text>
                    </GridItem>
                  ))}
                </Grid>

                {generateMonthCalendar(selectedDate).map((week, weekIndex) => (
                  <Grid key={weekIndex} templateColumns="repeat(7, 1fr)">
                    {week.map((day, dayIndex) => (
                      <GridItem
                        key={`${weekIndex}-${dayIndex}`}
                        textAlign="center"
                        py={1}
                      >
                        <Circle
                          size="30px"
                          bg={day.isActive ? "blue.500" : "transparent"}
                          color={
                            day.isActive
                              ? "white"
                              : day.month !== selectedDate.getMonth()
                              ? "gray.400"
                              : "gray.700"
                          }
                          cursor="pointer"
                          _hover={{
                            bg: day.isActive ? "blue.500" : "blue.100",
                          }}
                          onClick={() => {
                            selectDate(day);
                            setIsCalendarOpen(false);
                          }}
                        >
                          {day.date}
                        </Circle>
                      </GridItem>
                    ))}
                  </Grid>
                ))}
              </PopoverBody>
            </PopoverContent>
          </Popover>
        </Flex>

        <HStack>
          <IconButton
            aria-label="Previous day"
            icon={<ChevronLeftIcon />}
            size="xs"
            variant="ghost"
            onClick={() => changeDate(-1)}
          />
          <IconButton
            aria-label="Next day"
            icon={<ChevronRightIcon />}
            size="xs"
            variant="ghost"
            onClick={() => changeDate(1)}
          />
        </HStack>
      </Flex>

      {/* Days of week - Now clickable */}
      <Grid
        templateColumns="repeat(7, 1fr)"
        mb={3}
        borderBottomWidth="1px"
        borderBottomColor="gray.100"
        pb={2}
      >
        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day, idx) => {
          // Check if this day is the selected day
          const isSelectedDay = idx === selectedDate.getDay();

          return (
            <GridItem key={idx} textAlign="center">
              <Text
                fontSize="xs"
                color="gray.500"
                fontWeight={isSelectedDay ? "bold" : "normal"}
              >
                {day}
              </Text>
              <Circle
                size="28px"
                bg={isSelectedDay ? "blue.500" : "transparent"}
                color={isSelectedDay ? "white" : "gray.700"}
                mx="auto"
                mt={1}
                fontSize="sm"
                cursor="pointer"
                _hover={{
                  bg: isSelectedDay ? "blue.500" : "blue.100",
                  transform: "scale(1.05)",
                  transition: "all 0.2s ease-in-out",
                }}
                onClick={() => selectWeekDate(idx)}
              >
                {weekDates[idx]}
              </Circle>
            </GridItem>
          );
        })}
      </Grid>
    </Box>
  );
};

export default CalendarComponent;
