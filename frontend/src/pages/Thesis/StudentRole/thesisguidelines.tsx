import React from "react";
import {
  Box,
  Container,
  Heading,
  Text,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Button,
  SimpleGrid,
  Flex,
  Icon,
  List,
  ListItem,
  ListIcon,
  Card,
  CardHeader,
  CardBody,
  Divider,
  VStack,
  HStack,
  Badge,
  useColorModeValue,
} from "@chakra-ui/react";
import {
  DownloadIcon,
  CheckCircleIcon,
  InfoIcon,
  WarningIcon,
  ChevronRightIcon,
} from "@chakra-ui/icons";
import { FaFilePdf, FaFileWord, FaFilePowerpoint, FaFileAlt } from "react-icons/fa";

interface ResourceDocument {
  id: string;
  title: string;
  description: string;
  fileType: "pdf" | "doc" | "ppt" | "txt";
  fileSize: string;
  dateUpdated: string;
  category: "template" | "guide" | "example" | "policy";
}

const ThesisGuidelines: React.FC = () => {
  // Resource documents
  const resources: ResourceDocument[] = [
    {
      id: "doc1",
      title: "Thesis Proposal Template",
      description: "Standard template for preparing your thesis proposal",
      fileType: "doc",
      fileSize: "245 KB",
      dateUpdated: "Feb 2, 2025",
      category: "template"
    },
    {
      id: "doc2",
      title: "Comprehensive Thesis Guidelines",
      description: "Complete guidelines for thesis preparation and defense",
      fileType: "pdf",
      fileSize: "1.2 MB",
      dateUpdated: "Jan 15, 2025",
      category: "guide"
    },
    {
      id: "doc3",
      title: "Research Methods Handbook",
      description: "Detailed guide to various research methodologies",
      fileType: "pdf",
      fileSize: "3.5 MB",
      dateUpdated: "Dec 10, 2024",
      category: "guide"
    },
    {
      id: "doc4",
      title: "Citation Style Guide",
      description: "Guidelines for proper academic citations",
      fileType: "pdf",
      fileSize: "850 KB",
      dateUpdated: "Mar 5, 2025",
      category: "guide"
    },
    {
      id: "doc5",
      title: "Thesis Defense Presentation Template",
      description: "PowerPoint template for thesis defense presentation",
      fileType: "ppt",
      fileSize: "1.8 MB",
      dateUpdated: "Jan 30, 2025",
      category: "template"
    },
    {
      id: "doc6",
      title: "Example Thesis: Computer Science",
      description: "Sample thesis with excellent evaluation",
      fileType: "pdf",
      fileSize: "4.2 MB",
      dateUpdated: "Nov 15, 2024",
      category: "example"
    },
    {
      id: "doc7",
      title: "Thesis Evaluation Criteria",
      description: "Evaluation rubric used by the thesis committee",
      fileType: "pdf",
      fileSize: "420 KB",
      dateUpdated: "Feb 20, 2025",
      category: "policy"
    },
    {
      id: "doc8",
      title: "Thesis Timeline and Milestones",
      description: "Recommended schedule for thesis completion",
      fileType: "doc",
      fileSize: "380 KB",
      dateUpdated: "Jan 10, 2025",
      category: "guide"
    }
  ];

  // Get file icon based on file type
  const getFileIcon = (fileType: string) => {
    switch (fileType) {
      case "pdf":
        return <Icon as={FaFilePdf} color="red.500" boxSize={5} />;
      case "doc":
        return <Icon as={FaFileWord} color="blue.500" boxSize={5} />;
      case "ppt":
        return <Icon as={FaFilePowerpoint} color="orange.500" boxSize={5} />;
      case "txt":
        return <Icon as={FaFileAlt} color="gray.500" boxSize={5} />;
      default:
        return <Icon as={FaFileAlt} color="gray.500" boxSize={5} />;
    }
  };

  // Get category badge color
  const getCategoryBadge = (category: string) => {
    switch (category) {
      case "template":
        return <Badge colorScheme="blue">Template</Badge>;
      case "guide":
        return <Badge colorScheme="green">Guide</Badge>;
      case "example":
        return <Badge colorScheme="purple">Example</Badge>;
      case "policy":
        return <Badge colorScheme="orange">Policy</Badge>;
      default:
        return <Badge colorScheme="gray">Resource</Badge>;
    }
  };

  // Background color for sections
  const bg = useColorModeValue("white", "gray.800");

  return (
    <Container maxW="container.xl" py={8}>
      <Box mb={6}>
        <Heading size="lg" mb={2}>
          Thesis Guidelines & Resources
        </Heading>
        <Text color="gray.600">
          Comprehensive guidelines and resources to help you succeed in your thesis journey
        </Text>
      </Box>

      {/* Main Content */}
      <SimpleGrid columns={{ base: 1, lg: 3 }} spacing={8}>
        {/* Left Column: Thesis Process Overview */}
        <Box gridColumn={{ lg: "span 2" }}>
          <Card mb={8}>
            <CardHeader bg="green.50" py={4}>
              <Heading size="md" color="green.700">
                Thesis Process Overview
              </Heading>
            </CardHeader>
            <CardBody>
              <Accordion allowMultiple defaultIndex={[0]}>
                <AccordionItem border="none" mb={4}>
                  <h2>
                    <AccordionButton
                      _expanded={{ bg: "green.50", color: "green.700" }}
                      borderRadius="md"
                    >
                      <Box flex="1" textAlign="left" fontWeight="medium">
                        1. Topic Selection and Advisor Assignment
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4} pt={4}>
                    <Text mb={3}>
                      The first step in your thesis journey is to select a topic and be assigned an advisor. 
                      This typically occurs 8-10 months before your expected graduation date.
                    </Text>
                    <List spacing={2}>
                      <ListItem>
                        <ListIcon as={CheckCircleIcon} color="green.500" />
                        Identify a research area that aligns with your interests and career goals
                      </ListItem>
                      <ListItem>
                        <ListIcon as={CheckCircleIcon} color="green.500" />
                        Submit a topic proposal form to the department
                      </ListItem>
                      <ListItem>
                        <ListIcon as={CheckCircleIcon} color="green.500" />
                        Department assigns an appropriate advisor based on topic and faculty expertise
                      </ListItem>
                      <ListItem>
                        <ListIcon as={CheckCircleIcon} color="green.500" />
                        Initial meeting with advisor to refine the topic and discuss expectations
                      </ListItem>
                    </List>
                    <Box bg="blue.50" p={3} borderRadius="md" mt={4}>
                      <Flex>
                        <Icon as={InfoIcon} color="blue.500" mt={1} mr={2} />
                        <Text fontSize="sm" color="blue.700">
                          <strong>Pro Tip:</strong> Research potential topics and faculty specializations before submitting your proposal. A well-thought-out initial proposal can save valuable time.
                        </Text>
                      </Flex>
                    </Box>
                  </AccordionPanel>
                </AccordionItem>

                <AccordionItem border="none" mb={4}>
                  <h2>
                    <AccordionButton
                      _expanded={{ bg: "green.50", color: "green.700" }}
                      borderRadius="md"
                    >
                      <Box flex="1" textAlign="left" fontWeight="medium">
                        2. Proposal Development
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4} pt={4}>
                    <Text mb={3}>
                      The proposal development phase involves creating a comprehensive document that outlines your research plan. This typically takes 2-3 months.
                    </Text>
                    <List spacing={2}>
                      <ListItem>
                        <ListIcon as={CheckCircleIcon} color="green.500" />
                        Conduct preliminary literature review
                      </ListItem>
                      <ListItem>
                        <ListIcon as={CheckCircleIcon} color="green.500" />
                        Define research questions and objectives
                      </ListItem>
                      <ListItem>
                        <ListIcon as={CheckCircleIcon} color="green.500" />
                        Outline proposed methodology
                      </ListItem>
                      <ListItem>
                        <ListIcon as={CheckCircleIcon} color="green.500" />
                        Develop a timeline for thesis completion
                      </ListItem>
                      <ListItem>
                        <ListIcon as={CheckCircleIcon} color="green.500" />
                        Submit proposal draft for advisor review and feedback
                      </ListItem>
                    </List>
                    <Box bg="orange.50" p={3} borderRadius="md" mt={4}>
                      <Flex>
                        <Icon as={WarningIcon} color="orange.500" mt={1} mr={2} />
                        <Text fontSize="sm" color="orange.700">
                          <strong>Important:</strong> Plan for multiple revisions of your proposal. Most proposals require 2-3 rounds of feedback and revision before final approval.
                        </Text>
                      </Flex>
                    </Box>
                  </AccordionPanel>
                </AccordionItem>

                <AccordionItem border="none" mb={4}>
                  <h2>
                    <AccordionButton
                      _expanded={{ bg: "green.50", color: "green.700" }}
                      borderRadius="md"
                    >
                      <Box flex="1" textAlign="left" fontWeight="medium">
                        3. Proposal Defense
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4} pt={4}>
                    <Text mb={3}>
                      Once your proposal is finalized, you'll present and defend it before a committee. This is a critical milestone before beginning your research.
                    </Text>
                    <List spacing={2}>
                      <ListItem>
                        <ListIcon as={CheckCircleIcon} color="green.500" />
                        Submit final proposal document to committee (at least 2 weeks before defense)
                      </ListItem>
                      <ListItem>
                        <ListIcon as={CheckCircleIcon} color="green.500" />
                        Prepare a presentation (typically 15-20 minutes)
                      </ListItem>
                      <ListItem>
                        <ListIcon as={CheckCircleIcon} color="green.500" />
                        Present and defend proposal before the committee
                      </ListItem>
                      <ListItem>
                        <ListIcon as={CheckCircleIcon} color="green.500" />
                        Incorporate committee feedback and recommendations
                      </ListItem>
                    </List>
                    <Box bg="green.50" p={3} borderRadius="md" mt={4}>
                      <Flex>
                        <Icon as={InfoIcon} color="green.500" mt={1} mr={2} />
                        <Text fontSize="sm" color="green.700">
                          <strong>Pro Tip:</strong> Practice your presentation multiple times. Consider arranging a mock defense with peers or your advisor to receive feedback.
                        </Text>
                      </Flex>
                    </Box>
                  </AccordionPanel>
                </AccordionItem>

                <AccordionItem border="none" mb={4}>
                  <h2>
                    <AccordionButton
                      _expanded={{ bg: "green.50", color: "green.700" }}
                      borderRadius="md"
                    >
                      <Box flex="1" textAlign="left" fontWeight="medium">
                        4. Research and Writing
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4} pt={4}>
                    <Text mb={3}>
                      This is the main phase of your thesis journey where you conduct your research and begin writing your thesis. This typically takes 4-6 months.
                    </Text>
                    <List spacing={2}>
                      <ListItem>
                        <ListIcon as={CheckCircleIcon} color="green.500" />
                        Conduct comprehensive literature review
                      </ListItem>
                      <ListItem>
                        <ListIcon as={CheckCircleIcon} color="green.500" />
                        Implement research methodology
                      </ListItem>
                      <ListItem>
                        <ListIcon as={CheckCircleIcon} color="green.500" />
                        Collect and analyze data
                      </ListItem>
                      <ListItem>
                        <ListIcon as={CheckCircleIcon} color="green.500" />
                        Regular meetings with advisor to discuss progress
                      </ListItem>
                      <ListItem>
                        <ListIcon as={CheckCircleIcon} color="green.500" />
                        Begin drafting thesis chapters
                      </ListItem>
                    </List>
                    <Box bg="blue.50" p={3} borderRadius="md" mt={4}>
                      <Flex>
                        <Icon as={InfoIcon} color="blue.500" mt={1} mr={2} />
                        <Text fontSize="sm" color="blue.700">
                          <strong>Pro Tip:</strong> Start writing early and regularly. It's often easier to revise existing content than to write everything at once near the deadline.
                        </Text>
                      </Flex>
                    </Box>
                  </AccordionPanel>
                </AccordionItem>

                <AccordionItem border="none">
                  <h2>
                    <AccordionButton
                      _expanded={{ bg: "green.50", color: "green.700" }}
                      borderRadius="md"
                    >
                      <Box flex="1" textAlign="left" fontWeight="medium">
                        5. Thesis Defense and Submission
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4} pt={4}>
                    <Text mb={3}>
                      The final phase involves thesis defense before a committee and then submitting the approved final document. This typically takes 1-2 months.
                    </Text>
                    <List spacing={2}>
                      <ListItem>
                        <ListIcon as={CheckCircleIcon} color="green.500" />
                        Submit completed thesis draft to advisor for review
                      </ListItem>
                      <ListItem>
                        <ListIcon as={CheckCircleIcon} color="green.500" />
                        Revise based on advisor feedback
                      </ListItem>
                      <ListItem>
                        <ListIcon as={CheckCircleIcon} color="green.500" />
                        Submit final thesis to committee (at least 3 weeks before defense)
                      </ListItem>
                      <ListItem>
                        <ListIcon as={CheckCircleIcon} color="green.500" />
                        Prepare and deliver thesis defense presentation
                      </ListItem>
                      <ListItem>
                        <ListIcon as={CheckCircleIcon} color="green.500" />
                        Make any required final revisions
                      </ListItem>
                      <ListItem>
                        <ListIcon as={CheckCircleIcon} color="green.500" />
                        Submit final approved thesis to the university repository
                      </ListItem>
                    </List>
                    <Box bg="orange.50" p={3} borderRadius="md" mt={4}>
                      <Flex>
                        <Icon as={WarningIcon} color="orange.500" mt={1} mr={2} />
                        <Text fontSize="sm" color="orange.700">
                          <strong>Important:</strong> Pay close attention to submission deadlines for graduation. Missing these deadlines could delay your graduation by a semester.
                        </Text>
                      </Flex>
                    </Box>
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
            </CardBody>
          </Card>

          <Card>
            <CardHeader bg="purple.50" py={4}>
              <Heading size="md" color="purple.700">
                Thesis Evaluation Criteria
              </Heading>
            </CardHeader>
            <CardBody>
              <Text mb={4}>
                Your thesis will be evaluated based on the following criteria. Understanding these aspects will help you focus your efforts appropriately.
              </Text>
              
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                <Box>
                  <Heading size="sm" mb={3} color="purple.700">
                    Content and Research Quality (40%)
                  </Heading>
                  <List spacing={2}>
                    <ListItem fontSize="sm">
                      <ListIcon as={CheckCircleIcon} color="green.500" />
                      <strong>Research Significance:</strong> Original contribution to the field
                    </ListItem>
                    <ListItem fontSize="sm">
                      <ListIcon as={CheckCircleIcon} color="green.500" />
                      <strong>Literature Review:</strong> Comprehensive and critical analysis
                    </ListItem>
                    <ListItem fontSize="sm">
                      <ListIcon as={CheckCircleIcon} color="green.500" />
                      <strong>Methodology:</strong> Appropriate, rigorous, and well-executed
                    </ListItem>
                    <ListItem fontSize="sm">
                      <ListIcon as={CheckCircleIcon} color="green.500" />
                      <strong>Data Analysis:</strong> Thorough and appropriate
                    </ListItem>
                    <ListItem fontSize="sm">
                      <ListIcon as={CheckCircleIcon} color="green.500" />
                      <strong>Results:</strong> Clearly presented and interpreted
                    </ListItem>
                  </List>
                </Box>
                
                <Box>
                  <Heading size="sm" mb={3} color="purple.700">
                    Structure and Writing (30%)
                  </Heading>
                  <List spacing={2}>
                    <ListItem fontSize="sm">
                      <ListIcon as={CheckCircleIcon} color="green.500" />
                      <strong>Organization:</strong> Logical flow and structure
                    </ListItem>
                    <ListItem fontSize="sm">
                      <ListIcon as={CheckCircleIcon} color="green.500" />
                      <strong>Clarity:</strong> Clear expression of ideas
                    </ListItem>
                    <ListItem fontSize="sm">
                      <ListIcon as={CheckCircleIcon} color="green.500" />
                      <strong>Citations:</strong> Proper academic citation
                    </ListItem>
                    <ListItem fontSize="sm">
                      <ListIcon as={CheckCircleIcon} color="green.500" />
                      <strong>Grammar and Style:</strong> Correct grammar and academic style
                    </ListItem>
                    <ListItem fontSize="sm">
                      <ListIcon as={CheckCircleIcon} color="green.500" />
                      <strong>Formatting:</strong> Adherence to university formatting guidelines
                    </ListItem>
                  </List>
                </Box>
                
                <Box>
                  <Heading size="sm" mb={3} color="purple.700">
                    Critical Thinking (20%)
                  </Heading>
                  <List spacing={2}>
                    <ListItem fontSize="sm">
                      <ListIcon as={CheckCircleIcon} color="green.500" />
                      <strong>Analysis:</strong> Depth of analysis and interpretation
                    </ListItem>
                    <ListItem fontSize="sm">
                      <ListIcon as={CheckCircleIcon} color="green.500" />
                      <strong>Synthesis:</strong> Integration of complex ideas
                    </ListItem>
                    <ListItem fontSize="sm">
                      <ListIcon as={CheckCircleIcon} color="green.500" />
                      <strong>Critical Perspective:</strong> Recognition of limitations
                    </ListItem>
                    <ListItem fontSize="sm">
                      <ListIcon as={CheckCircleIcon} color="green.500" />
                      <strong>Implications:</strong> Understanding of broader implications
                    </ListItem>
                  </List>
                </Box>
                
                <Box>
                  <Heading size="sm" mb={3} color="purple.700">
                    Defense Presentation (10%)
                  </Heading>
                  <List spacing={2}>
                    <ListItem fontSize="sm">
                      <ListIcon as={CheckCircleIcon} color="green.500" />
                      <strong>Clarity:</strong> Clear and organized presentation
                    </ListItem>
                    <ListItem fontSize="sm">
                      <ListIcon as={CheckCircleIcon} color="green.500" />
                      <strong>Knowledge:</strong> Mastery of the subject matter
                    </ListItem>
                    <ListItem fontSize="sm">
                      <ListIcon as={CheckCircleIcon} color="green.500" />
                      <strong>Response to Questions:</strong> Thoughtful and informed answers
                    </ListItem>
                    <ListItem fontSize="sm">
                      <ListIcon as={CheckCircleIcon} color="green.500" />
                      <strong>Visual Aids:</strong> Effective use of presentation materials
                    </ListItem>
                  </List>
                </Box>
              </SimpleGrid>
              
              <Divider my={6} />
              
              <Text fontWeight="medium">Grading Scale:</Text>
              <HStack mt={2} spacing={4} flexWrap="wrap">
                <Badge colorScheme="green" p={2}>Excellent (90-100%)</Badge>
                <Badge colorScheme="blue" p={2}>Very Good (80-89%)</Badge>
                <Badge colorScheme="yellow" p={2}>Good (70-79%)</Badge>
                <Badge colorScheme="orange" p={2}>Satisfactory (60-69%)</Badge>
                <Badge colorScheme="red" p={2}>Unsatisfactory ({"<60%"})</Badge>

              </HStack>
              
              <Box mt={6} textAlign="center">
                <Button
                  colorScheme="purple"
                  leftIcon={<DownloadIcon />}
                  size="md"
                >
                  Download Complete Evaluation Rubric
                </Button>
              </Box>
            </CardBody>
          </Card>
        </Box>

        {/* Right Column: Resources */}
        <Box>
          <Card mb={6}>
            <CardHeader bg="blue.50" py={4}>
              <Heading size="md" color="blue.700">
                Resources & Templates
              </Heading>
            </CardHeader>
            <CardBody p={4}>
              <Text mb={4}>
                Download official templates, guides, and examples to help you with your thesis.
              </Text>
              
              <VStack spacing={4} align="stretch">
                {resources.map((resource) => (
                  <Flex
                    key={resource.id}
                    p={3}
                    borderWidth="1px"
                    borderRadius="md"
                    borderColor="gray.200"
                    _hover={{ bg: "gray.50" }}
                    justify="space-between"
                    align="center"
                  >
                    <Flex align="center">
                      <Box mr={3}>
                        {getFileIcon(resource.fileType)}
                      </Box>
                      <Box>
                        <HStack mb={1}>
                          <Text fontWeight="medium" fontSize="sm">
                            {resource.title}
                          </Text>
                          {getCategoryBadge(resource.category)}
                        </HStack>
                        <Text fontSize="xs" color="gray.500">
                          {resource.fileSize} • Updated: {resource.dateUpdated}
                        </Text>
                      </Box>
                    </Flex>
                    <Button
                      size="sm"
                      colorScheme="blue"
                      variant="ghost"
                      leftIcon={<DownloadIcon />}
                    >
                      Download
                    </Button>
                  </Flex>
                ))}
              </VStack>
              
              <Divider my={4} />
              
              <Button
                width="full"
                colorScheme="blue"
                rightIcon={<ChevronRightIcon />}
                size="sm"
              >
                View All Resources
              </Button>
            </CardBody>
          </Card>

          <Card>
            <CardHeader bg="orange.50" py={4}>
              <Heading size="md" color="orange.700">
                Important Dates & Deadlines
              </Heading>
            </CardHeader>
            <CardBody>
              <VStack spacing={3} align="stretch">
                <Box p={3} bg="red.50" borderRadius="md" borderWidth="1px" borderColor="red.200">
                  <Text fontWeight="medium" color="red.700">
                    Spring 2025 Graduation
                  </Text>
                  <List spacing={2} mt={2}>
                    <ListItem fontSize="sm">
                      <HStack align="center">
                        <Badge colorScheme="red">Apr 25, 2025</Badge>
                        <Text>Thesis Proposal Submission Deadline</Text>
                      </HStack>
                    </ListItem>
                    <ListItem fontSize="sm">
                      <HStack align="center">
                        <Badge colorScheme="red">Jun 10, 2025</Badge>
                        <Text>First Draft Submission to Advisor</Text>
                      </HStack>
                    </ListItem>
                    <ListItem fontSize="sm">
                      <HStack align="center">
                        <Badge colorScheme="red">Jul 25, 2025</Badge>
                        <Text>Thesis Defense Registration Deadline</Text>
                      </HStack>
                    </ListItem>
                    <ListItem fontSize="sm">
                      <HStack align="center">
                        <Badge colorScheme="red">Aug 15, 2025</Badge>
                        <Text>Final Thesis Submission Deadline</Text>
                      </HStack>
                    </ListItem>
                  </List>
                </Box>
                
                <Box p={3} bg="yellow.50" borderRadius="md" borderWidth="1px" borderColor="yellow.200">
                  <Text fontWeight="medium" color="yellow.700">
                    Fall 2025 Graduation
                  </Text>
                  <List spacing={2} mt={2}>
                    <ListItem fontSize="sm">
                      <HStack align="center">
                        <Badge colorScheme="yellow">Oct 15, 2025</Badge>
                        <Text>Thesis Proposal Submission Deadline</Text>
                      </HStack>
                    </ListItem>
                    <ListItem fontSize="sm">
                      <HStack align="center">
                        <Badge colorScheme="yellow">Dec 5, 2025</Badge>
                        <Text>First Draft Submission to Advisor</Text>
                      </HStack>
                    </ListItem>
                    <ListItem fontSize="sm">
                      <HStack align="center">
                        <Badge colorScheme="yellow">Jan 20, 2026</Badge>
                        <Text>Thesis Defense Registration Deadline</Text>
                      </HStack>
                    </ListItem>
                    <ListItem fontSize="sm">
                      <HStack align="center">
                        <Badge colorScheme="yellow">Feb 15, 2026</Badge>
                        <Text>Final Thesis Submission Deadline</Text>
                      </HStack>
                    </ListItem>
                  </List>
                </Box>
              </VStack>
              
              <Button
                width="full"
                colorScheme="orange"
                mt={4}
                size="sm"
                rightIcon={<ChevronRightIcon />}
              >
                View Academic Calendar
              </Button>
            </CardBody>
          </Card>
        </Box>
      </SimpleGrid>
    </Container>
  );
};

export default ThesisGuidelines;