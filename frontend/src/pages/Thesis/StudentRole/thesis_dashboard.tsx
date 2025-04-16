import React from "react";
import {
  Box,
  Container,
  Heading,
  Text,
  Grid,
  GridItem,
  Flex,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Badge,
  Card,
  CardBody,
  CardHeader,
  Button,
  Icon,
  Progress,
  SimpleGrid,
  HStack,
  VStack,
} from "@chakra-ui/react";
import {
  TimeIcon,
  WarningIcon,
  InfoIcon,
  CalendarIcon,
  ChevronRightIcon,
  DownloadIcon,
} from "@chakra-ui/icons";

interface ImportantDate {
  date: string;
  title: string;
  type: "deadline" | "meeting" | "info";
  daysDiff: number;
}

interface ThesisUpdate {
  date: string;
  title: string;
  description: string;
  type: "info" | "success" | "warning";
}

const ThesisDashboard: React.FC = () => {
  // Sample current thesis status
  const thesisStatus = {
    title: "Analysis of Machine Learning Algorithms for Predictive Analytics in Healthcare",
    advisor: "Dr. Robert Johnson",
    phase: "Proposal",
    progress: 30,
    startDate: "January 15, 2025",
    estimatedEndDate: "December 10, 2025",
    status: "on-track", // can be 'on-track', 'delayed', 'at-risk'
  };

  // Upcoming important dates
  const importantDates: ImportantDate[] = [
    {
      date: "April 25, 2025",
      title: "Proposal Submission Deadline",
      type: "deadline",
      daysDiff: 10,
    },
    {
      date: "May 5, 2025",
      title: "Advisor Meeting",
      type: "meeting",
      daysDiff: 20,
    },
    {
      date: "May 15, 2025",
      title: "Proposal Defense",
      type: "meeting",
      daysDiff: 30,
    },
    {
      date: "June 10, 2025",
      title: "Research Methods Workshop",
      type: "info",
      daysDiff: 56,
    },
  ];

  // Recent thesis updates
  const recentUpdates: ThesisUpdate[] = [
    {
      date: "April 12, 2025",
      title: "Advisor Feedback Received",
      description:
        "Your advisor has provided feedback on your preliminary research outline.",
      type: "info",
    },
    {
      date: "April 8, 2025",
      title: "Proposal Draft Submitted",
      description:
        "Your initial proposal draft has been received by the department.",
      type: "success",
    },
    {
      date: "April 3, 2025",
      title: "Thesis Topic Approved",
      description:
        "Your thesis topic has been approved by the department committee.",
      type: "success",
    },
    {
      date: "March 28, 2025",
      title: "Advisor Assignment",
      description: "Dr. Robert Johnson has been assigned as your thesis advisor.",
      type: "info",
    },
  ];

  // Guidance documents
  const guidanceDocuments = [
    {
      title: "Thesis Proposal Guidelines",
      description: "Detailed guidelines for preparing your thesis proposal",
      fileSize: "1.2 MB",
    },
    {
      title: "Research Methods Handbook",
      description: "Comprehensive guide to research methodologies",
      fileSize: "3.5 MB",
    },
    {
      title: "Citation Style Guide",
      description: "Guide to proper academic citation formats",
      fileSize: "850 KB",
    },
  ];

  // Render icon based on type
  const renderDateIcon = (type: string) => {
    switch (type) {
      case "deadline":
        return <WarningIcon color="red.500" />;
      case "meeting":
        return <TimeIcon color="blue.500" />;
      case "info":
        return <InfoIcon color="green.500" />;
      default:
        return <InfoIcon />;
    }
  };

  // Render badge based on type
  const renderUpdateBadge = (type: string) => {
    switch (type) {
      case "success":
        return <Badge colorScheme="green">Completed</Badge>;
      case "warning":
        return <Badge colorScheme="orange">Action Required</Badge>;
      case "info":
        return <Badge colorScheme="blue">Information</Badge>;
      default:
        return <Badge colorScheme="gray">Update</Badge>;
    }
  };

  // Render status badge
  const renderStatusBadge = (status: string) => {
    switch (status) {
      case "on-track":
        return (
          <Badge colorScheme="green" fontSize="sm" px={2} py={1} borderRadius="full">
            On Track
          </Badge>
        );
      case "delayed":
        return (
          <Badge colorScheme="orange" fontSize="sm" px={2} py={1} borderRadius="full">
            Delayed
          </Badge>
        );
      case "at-risk":
        return (
          <Badge colorScheme="red" fontSize="sm" px={2} py={1} borderRadius="full">
            At Risk
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <Container maxW="container.xl" py={8}>
      <Box mb={6}>
        <Heading size="lg" mb={2}>
          Thesis Dashboard
        </Heading>
        <Text color="gray.600">
          Track your thesis progress, important dates, and resources
        </Text>
      </Box>

      <Grid templateColumns={{ base: "1fr", lg: "2fr 1fr" }} gap={6}>
        {/* Left Column */}
        <GridItem>
          {/* Thesis Status Card */}
          <Card mb={6} variant="outline" borderColor="green.200">
            <CardHeader bg="green.50" py={4}>
              <Flex justifyContent="space-between" alignItems="center">
                <Heading size="md" color="green.700">
                  Current Thesis Status
                </Heading>
                {renderStatusBadge(thesisStatus.status)}
              </Flex>
            </CardHeader>
            <CardBody>
              <VStack align="stretch" spacing={4}>
                <Box>
                  <Text fontSize="sm" color="gray.500">
                    Thesis Title
                  </Text>
                  <Text fontWeight="medium">{thesisStatus.title}</Text>
                </Box>

                <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={4}>
                  <Box>
                    <Text fontSize="sm" color="gray.500">
                      Advisor
                    </Text>
                    <Text>{thesisStatus.advisor}</Text>
                  </Box>
                  <Box>
                    <Text fontSize="sm" color="gray.500">
                      Current Phase
                    </Text>
                    <HStack>
                      <Badge colorScheme="blue" px={2} py={1}>
                        {thesisStatus.phase}
                      </Badge>
                    </HStack>
                  </Box>
                </Grid>

                <Box>
                  <Text fontSize="sm" color="gray.500" mb={2}>
                    Overall Progress
                  </Text>
                  <Progress
                    value={thesisStatus.progress}
                    size="md"
                    colorScheme="green"
                    borderRadius="full"
                  />
                  <Flex justifyContent="space-between" mt={1}>
                    <Text fontSize="xs" color="gray.500">
                      Started: {thesisStatus.startDate}
                    </Text>
                    <Text fontSize="xs" color="gray.500">
                      {thesisStatus.progress}%
                    </Text>
                    <Text fontSize="xs" color="gray.500">
                      Est. Completion: {thesisStatus.estimatedEndDate}
                    </Text>
                  </Flex>
                </Box>

                <HStack spacing={4} mt={2}>
                  <Button
                    size="sm"
                    colorScheme="green"
                    variant="outline"
                    rightIcon={<ChevronRightIcon />}
                  >
                    View Details
                  </Button>
                  <Button
                    size="sm"
                    colorScheme="blue"
                    variant="outline"
                    rightIcon={<ChevronRightIcon />}
                  >
                    Schedule Meeting
                  </Button>
                </HStack>
              </VStack>
            </CardBody>
          </Card>

          {/* Recent Updates Card */}
          <Card mb={6}>
            <CardHeader bg="gray.50" py={4}>
              <Heading size="md">Guidance Documents</Heading>
            </CardHeader>
            <CardBody>
              <VStack align="stretch" spacing={4}>
                {guidanceDocuments.map((doc, index) => (
                  <Flex
                    key={index}
                    justifyContent="space-between"
                    alignItems="center"
                    p={3}
                    borderWidth="1px"
                    borderRadius="md"
                    borderColor="gray.200"
                    _hover={{ bg: "gray.50" }}
                  >
                    <Box>
                      <Text fontWeight="medium">{doc.title}</Text>
                      <Text fontSize="sm" color="gray.600">
                        {doc.description}
                      </Text>
                      <Text fontSize="xs" color="gray.500">
                        {doc.fileSize}
                      </Text>
                    </Box>
                    <Button
                      size="sm"
                      leftIcon={<DownloadIcon />}
                      colorScheme="green"
                      variant="ghost"
                    >
                      Download
                    </Button>
                  </Flex>
                ))}
                <Button
                  mt={2}
                  size="sm"
                  colorScheme="green"
                  variant="outline"
                  width="full"
                >
                  Browse All Resources
                </Button>
              </VStack>
            </CardBody>
          </Card>
        </GridItem>

        {/* Right Column */}
        <GridItem>
          {/* Important Dates Card */}
          <Card mb={6}>
            <CardHeader bg="orange.50" py={4}>
              <Heading size="md" color="orange.700">
                Important Dates
              </Heading>
            </CardHeader>
            <CardBody>
              <VStack align="stretch" spacing={3}>
                {importantDates.map((date, index) => (
                  <Flex
                    key={index}
                    p={3}
                    borderRadius="md"
                    bg={
                      date.daysDiff < 14
                        ? "red.50"
                        : date.daysDiff < 30
                        ? "yellow.50"
                        : "gray.50"
                    }
                    borderWidth="1px"
                    borderColor={
                      date.daysDiff < 14
                        ? "red.200"
                        : date.daysDiff < 30
                        ? "yellow.200"
                        : "gray.200"
                    }
                  >
                    <Box mr={3} fontSize="xl" mt={1}>
                      {renderDateIcon(date.type)}
                    </Box>
                    <Box>
                      <Text fontWeight="medium">{date.title}</Text>
                      <HStack spacing={2}>
                        <Icon as={CalendarIcon} color="gray.500" fontSize="xs" />
                        <Text fontSize="sm">{date.date}</Text>
                      </HStack>
                      <Badge
                        mt={1}
                        colorScheme={
                          date.daysDiff < 14
                            ? "red"
                            : date.daysDiff < 30
                            ? "yellow"
                            : "green"
                        }
                        variant="subtle"
                        fontSize="xs"
                      >
                        {date.daysDiff === 0
                          ? "Today"
                          : date.daysDiff === 1
                          ? "Tomorrow"
                          : `${date.daysDiff} days remaining`}
                      </Badge>
                    </Box>
                  </Flex>
                ))}
                <Button
                  mt={2}
                  size="sm"
                  colorScheme="orange"
                  variant="outline"
                  width="full"
                >
                  View Full Calendar
                </Button>
              </VStack>
            </CardBody>
          </Card>

          {/* Quick Stats Card */}
          <Card mb={6}>
            <CardHeader bg="blue.50" py={4}>
              <Heading size="md" color="blue.700">
                Thesis Progress Stats
              </Heading>
            </CardHeader>
            <CardBody>
              <SimpleGrid columns={2} spacing={4}>
                <Stat>
                  <StatLabel color="gray.500">Proposal</StatLabel>
                  <StatNumber fontSize="2xl">70%</StatNumber>
                  <StatHelpText>
                    <Progress
                      value={70}
                      size="sm"
                      colorScheme="blue"
                      borderRadius="full"
                    />
                  </StatHelpText>
                </Stat>
                <Stat>
                  <StatLabel color="gray.500">Literature Review</StatLabel>
                  <StatNumber fontSize="2xl">45%</StatNumber>
                  <StatHelpText>
                    <Progress
                      value={45}
                      size="sm"
                      colorScheme="blue"
                      borderRadius="full"
                    />
                  </StatHelpText>
                </Stat>
                <Stat>
                  <StatLabel color="gray.500">Research</StatLabel>
                  <StatNumber fontSize="2xl">20%</StatNumber>
                  <StatHelpText>
                    <Progress
                      value={20}
                      size="sm"
                      colorScheme="blue"
                      borderRadius="full"
                    />
                  </StatHelpText>
                </Stat>
                <Stat>
                  <StatLabel color="gray.500">Writing</StatLabel>
                  <StatNumber fontSize="2xl">10%</StatNumber>
                  <StatHelpText>
                    <Progress
                      value={10}
                      size="sm"
                      colorScheme="blue"
                      borderRadius="full"
                    />
                  </StatHelpText>
                </Stat>
              </SimpleGrid>
              <Button
                mt={4}
                size="sm"
                colorScheme="blue"
                variant="outline"
                width="full"
              >
                Update Progress
              </Button>
            </CardBody>
          </Card>

          {/* Advisor Info Card */}
          <Card>
            <CardHeader bg="purple.50" py={4}>
              <Heading size="md" color="purple.700">
                Advisor Information
              </Heading>
            </CardHeader>
            <CardBody>
              <VStack align="stretch" spacing={3}>
                <Box>
                  <Text fontSize="sm" color="gray.500">
                    Name
                  </Text>
                  <Text fontWeight="medium">Dr. Robert Johnson</Text>
                </Box>
                <Box>
                  <Text fontSize="sm" color="gray.500">
                    Department
                  </Text>
                  <Text>Computer Science & Engineering</Text>
                </Box>
                <Box>
                  <Text fontSize="sm" color="gray.500">
                    Contact
                  </Text>
                  <Text>r.johnson@university.edu</Text>
                </Box>
                <Box>
                  <Text fontSize="sm" color="gray.500">
                    Office Hours
                  </Text>
                  <Text>Monday & Wednesday, 2:00 - 4:00 PM</Text>
                </Box>
                <Box>
                  <Text fontSize="sm" color="gray.500">
                    Next Meeting
                  </Text>
                  <HStack mt={1}>
                    <Icon as={CalendarIcon} color="gray.500" />
                    <Text>April 28, 2025 (10:00 AM)</Text>
                  </HStack>
                </Box>
                <HStack spacing={3} mt={2}>
                  <Button
                    size="sm"
                    colorScheme="purple"
                    variant="outline"
                    flex={1}
                  >
                    Schedule Meeting
                  </Button>
                  <Button
                    size="sm"
                    colorScheme="purple"
                    variant="outline"
                    flex={1}
                  >
                    Send Message
                  </Button>
                </HStack>
              </VStack>
            </CardBody>
          </Card>
        </GridItem>
      </Grid>
    </Container>
  );
};

export default ThesisDashboard