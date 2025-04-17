import React, { useState } from "react";
import {
  Box,
  Flex,
  Text,
  Heading,
  Grid,
  Button,
  Avatar,
  Input,
  useToast,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Select,
  Badge,
  VStack,
  HStack,
} from "@chakra-ui/react";
import { DownloadIcon, EditIcon, EmailIcon, PhoneIcon } from "@chakra-ui/icons";
import { Image } from "@chakra-ui/react";

interface ProfileData {
  personalInfo: {
    name: string;
    gender: string;
    religion: string;
    dateOfBirth: string;
    placeOfBirth: string;
    email: string;
    phone: string;
  };
  employmentInfo: {
    employeeId: string;
    department: string;
    position: string;
    joinDate: string;
    status: string;
    supervisor: string;
  };
  skills: {
    description: string;
  };
}

const ProfileAdminOffice: React.FC = () => {
  const toast = useToast();
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);
  const [fileSelected, setFileSelected] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // Modal states
  const [isPersonalInfoModalOpen, setPersonalInfoModalOpen] = useState(false);
  const [isEmploymentInfoModalOpen, setEmploymentInfoModalOpen] = useState(false);

  // Initial profile data
  const [profileData, setProfileData] = useState<ProfileData>({
    personalInfo: {
      name: "Sarah Johnson",
      gender: "Female",
      religion: "Christian",
      dateOfBirth: "15-06-1990",
      placeOfBirth: "Jakarta",
      email: "sarah.j@zsm.edu",
      phone: "+62 812-3456-7890"
    },
    employmentInfo: {
      employeeId: "AO22145",
      department: "Administrative Services",
      position: "Senior Admin Officer",
      joinDate: "12-04-2020",
      status: "Permanent",
      supervisor: "John Hendricks",
    },
    skills: {
      description: "MS Office, Data Entry, Student Management Systems, Administrative Support",
    },
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setFileSelected(true);

      // Create a URL for the file preview
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setProfilePhoto(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDownloadCard = () => {
    // In a real app, this would trigger a download of the employee ID card
    toast({
      title: "Downloading ID Card",
      description: "Your employee ID card is being downloaded.",
      status: "info",
      duration: 3000,
      isClosable: true,
    });
  };

  // Form data for modals
  const [personalFormData, setPersonalFormData] = useState({
    ...profileData.personalInfo,
  });
  const [employmentFormData, setEmploymentFormData] = useState({
    ...profileData.employmentInfo,
  });

  // Update personal information
  const handlePersonalInfoUpdate = () => {
    setProfileData({
      ...profileData,
      personalInfo: personalFormData,
    });

    toast({
      title: "Personal information updated",
      status: "success",
      duration: 3000,
      isClosable: true,
    });

    setPersonalInfoModalOpen(false);
  };

  // Update employment information
  const handleEmploymentInfoUpdate = () => {
    setProfileData({
      ...profileData,
      employmentInfo: employmentFormData,
    });

    toast({
      title: "Employment information updated",
      status: "success",
      duration: 3000,
      isClosable: true,
    });

    setEmploymentInfoModalOpen(false);
  };

  return (
    <Box flex="1" p={6} bg="gray.50" minH="calc(100vh - 70px)">
      {/* Profile Header */}
      <Box mb={6}>
        <Text color="gray.500" fontSize="sm">
          Profile
        </Text>
        <Heading size="md">Admin Office Profile</Heading>
      </Box>

      {/* Profile Content */}
      <Flex direction={{ base: "column", lg: "row" }} gap={6}>
        {/* Left Column */}
        <Box flex="1">
          {/* Profile Photo Section - All in one card */}
          <Box bg="white" p={4} borderRadius="md" mb={6} boxShadow="sm">
            {/* Top row with profile and upload side by side */}
            <Flex direction={{ base: "column", md: "row" }} gap={4}>
              {/* Left side - Profile photo and name */}
              <Flex flex="1" alignItems="center">
                <Avatar
                  size="lg"
                  name={profileData.personalInfo.name}
                  src={profilePhoto || undefined}
                  bg="teal.400"
                  mr={4}
                >
                </Avatar>
                <Box>
                  <Text fontWeight="medium">
                    {profileData.personalInfo.name}
                  </Text>
                  <Text fontSize="sm" color="teal.500">
                    ● {profileData.employmentInfo.position}
                  </Text>
                  <HStack mt={1} spacing={2}>
                    <Badge colorScheme="green">Admin Office</Badge>
                    <Badge colorScheme="blue">{profileData.employmentInfo.status}</Badge>
                  </HStack>
                </Box>
              </Flex>

              {/* Right side - Upload section */}
              <Box flex="1">
                <Text fontSize="sm" mb={3}>
                  Upload
                </Text>
                <Flex mb={2} alignItems="center">
                  <Button
                    as="label"
                    htmlFor="profile-upload"
                    size="sm"
                    colorScheme="teal"
                    cursor="pointer"
                    mr={3}
                  >
                    Choose File
                    <Input
                      id="profile-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      display="none"
                    />
                  </Button>
                  <Text fontSize="sm" color="gray.500">
                    {selectedFile?.name || "No file chosen"}
                  </Text>
                </Flex>
                <Text fontSize="xs" color="gray.500">
                  *If you change new photo, it will affect only on dashboard.
                </Text>
              </Box>
            </Flex>

            {/* Contact information */}
            <Box mt={5} pt={4} borderTopWidth="1px" borderColor="gray.100">
              <Text fontSize="sm" fontWeight="medium" mb={2}>
                Contact Information
              </Text>
              <VStack align="flex-start" spacing={2}>
                <Flex align="center">
                  <EmailIcon mr={2} color="gray.500" />
                  <Text fontSize="sm">{profileData.personalInfo.email}</Text>
                </Flex>
                <Flex align="center">
                  <PhoneIcon mr={2} color="gray.500" />
                  <Text fontSize="sm">{profileData.personalInfo.phone}</Text>
                </Flex>
              </VStack>
            </Box>
          </Box>

          {/* Personal Information */}
          <Box
            bg="white"
            p={4}
            borderRadius="md"
            mb={6}
            boxShadow="sm"
            position="relative"
          >
            <Flex justifyContent="space-between" alignItems="center" mb={4}>
              <Heading size="sm">Personal Information</Heading>
              <Flex alignItems="center">
                <Text fontSize="sm" mr={1}>
                  Edit
                </Text>
                <IconButton
                  aria-label="Edit"
                  icon={<EditIcon />}
                  size="sm"
                  variant="ghost"
                  onClick={() => setPersonalInfoModalOpen(true)}
                />
              </Flex>
            </Flex>

            <Grid templateColumns="repeat(2, 1fr)" gap={4}>
              <Box>
                <Text fontSize="sm" color="gray.500">
                  Name
                </Text>
                <Text>{profileData.personalInfo.name}</Text>
              </Box>
              <Box>
                <Text fontSize="sm" color="gray.500">
                  Gender
                </Text>
                <Text>{profileData.personalInfo.gender}</Text>
              </Box>
              <Box>
                <Text fontSize="sm" color="gray.500">
                  Religion
                </Text>
                <Text>{profileData.personalInfo.religion}</Text>
              </Box>
              <Box>
                <Text fontSize="sm" color="gray.500">
                  Date of Birth
                </Text>
                <Text>{profileData.personalInfo.dateOfBirth}</Text>
              </Box>
              <Box>
                <Text fontSize="sm" color="gray.500">
                  Place of Birth
                </Text>
                <Text>{profileData.personalInfo.placeOfBirth}</Text>
              </Box>
              <Box>
                <Text fontSize="sm" color="gray.500">
                  Skills
                </Text>
                <Text>{profileData.skills.description}</Text>
              </Box>
            </Grid>
          </Box>

          {/* Employment Information */}
          <Box
            bg="white"
            p={4}
            borderRadius="md"
            boxShadow="sm"
            position="relative"
          >
            <Flex justifyContent="space-between" alignItems="center" mb={4}>
              <Heading size="sm">Employment Information</Heading>
              <Flex alignItems="center">
                <Text fontSize="sm" mr={1}>
                  Edit
                </Text>
                <IconButton
                  aria-label="Edit"
                  icon={<EditIcon />}
                  size="sm"
                  variant="ghost"
                  onClick={() => setEmploymentInfoModalOpen(true)}
                />
              </Flex>
            </Flex>

            <Grid templateColumns="repeat(2, 1fr)" gap={4}>
              <Box>
                <Text fontSize="sm" color="gray.500">
                  Employee ID
                </Text>
                <Text>{profileData.employmentInfo.employeeId}</Text>
              </Box>
              <Box>
                <Text fontSize="sm" color="gray.500">
                  Department
                </Text>
                <Text>{profileData.employmentInfo.department}</Text>
              </Box>
              <Box>
                <Text fontSize="sm" color="gray.500">
                  Position
                </Text>
                <Text>{profileData.employmentInfo.position}</Text>
              </Box>
              <Box>
                <Text fontSize="sm" color="gray.500">
                  Join Date
                </Text>
                <Text>{profileData.employmentInfo.joinDate}</Text>
              </Box>
              <Box>
                <Text fontSize="sm" color="gray.500">
                  Status
                </Text>
                <Text>{profileData.employmentInfo.status}</Text>
              </Box>
              <Box>
                <Text fontSize="sm" color="gray.500">
                  Supervisor
                </Text>
                <Text>{profileData.employmentInfo.supervisor}</Text>
              </Box>
            </Grid>
          </Box>
        </Box>

        {/* Right Column - Employee ID Card */}
        <Box w={{ base: "100%", lg: "40%" }}>
          <Box bg="white" p={4} borderRadius="md" boxShadow="sm">
            <Heading size="sm" mb={4}>
              Employee ID Card
            </Heading>

            {/* ID Card */}
            <Box
              borderWidth="1px"
              borderColor="gray.200"
              borderRadius="md"
              overflow="hidden"
              mb={4}
            >
              <Box bg="teal.500" color="white" py={2} px={4} textAlign="center">
                <Text fontWeight="bold">ADMIN OFFICE</Text>
              </Box>

              <Box py={4} px={6} bg="white">
                <Flex>
                  <Box
                    w="80px"
                    h="80px"
                    bg="gray.200"
                    borderRadius="md"
                    mr={4}
                    overflow="hidden"
                  >
                    {profilePhoto ? (
                      <Image src={profilePhoto} alt="Profile" w="100%" h="100%" objectFit="cover" />
                    ) : (
                      <Box
                        h="full"
                        w="full"
                        bg="gray.300"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                      >
                        <Text fontSize="xs" color="gray.500">
                          Photo
                        </Text>
                      </Box>
                    )}
                  </Box>

                  <Box flex="1">
                    <Box
                      h="20px"
                      bg="gray.200"
                      w="80%"
                      mb={2}
                      borderRadius="sm"
                    />
                    <Box
                      h="12px"
                      bg="gray.200"
                      w="60%"
                      mb={3}
                      borderRadius="sm"
                    />
                    <Box
                      h="10px"
                      bg="gray.200"
                      w="70%"
                      mb={2}
                      borderRadius="sm"
                    />
                    <Box
                      h="10px"
                      bg="gray.200"
                      w="50%"
                      mb={2}
                      borderRadius="sm"
                    />
                  </Box>
                </Flex>

                <Box mt={4} bg="gray.300" h="30px" borderRadius="sm" />
              </Box>
            </Box>

            <Flex justifyContent="center" mt={4}>
              <Button
                leftIcon={<DownloadIcon />}
                colorScheme="teal"
                variant="link"
                size="sm"
                onClick={handleDownloadCard}
              >
                Download
              </Button>
            </Flex>
          </Box>

          {/* Statistics/Work Summary */}
          <Box bg="white" p={4} borderRadius="md" boxShadow="sm" mt={6}>
            <Heading size="sm" mb={4}>
              Work Summary
            </Heading>
            
            <Grid templateColumns="repeat(2, 1fr)" gap={4}>
              <Box bg="teal.50" p={3} borderRadius="md" textAlign="center">
                <Text fontSize="sm" color="gray.600">Managed Students</Text>
                <Text fontSize="xl" fontWeight="bold" color="teal.600">
                  247
                </Text>
              </Box>
              
              <Box bg="blue.50" p={3} borderRadius="md" textAlign="center">
                <Text fontSize="sm" color="gray.600">Resolved Issues</Text>
                <Text fontSize="xl" fontWeight="bold" color="blue.600">
                  128
                </Text>
              </Box>
              
              <Box bg="purple.50" p={3} borderRadius="md" textAlign="center">
                <Text fontSize="sm" color="gray.600">Years of Service</Text>
                <Text fontSize="xl" fontWeight="bold" color="purple.600">
                  3
                </Text>
              </Box>
              
              <Box bg="green.50" p={3} borderRadius="md" textAlign="center">
                <Text fontSize="sm" color="gray.600">Task Completion</Text>
                <Text fontSize="xl" fontWeight="bold" color="green.600">
                  98%
                </Text>
              </Box>
            </Grid>
          </Box>

          {/* Teal wave decoration */}
          <Box position="relative" mt={8} h="200px" overflow="hidden">
            <Box
              position="absolute"
              bottom="-100px"
              right="-50px"
              w="500px"
              h="300px"
              borderRadius="50%"
              bg="teal.100"
              opacity="0.6"
              transform="rotate(-15deg)"
            />
          </Box>
        </Box>
      </Flex>

      {/* Personal Information Edit Modal */}
      <Modal
        isOpen={isPersonalInfoModalOpen}
        onClose={() => setPersonalInfoModalOpen(false)}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Personal Information</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl mb={3}>
              <FormLabel>Name</FormLabel>
              <Input
                value={personalFormData.name}
                onChange={(e) =>
                  setPersonalFormData({
                    ...personalFormData,
                    name: e.target.value,
                  })
                }
              />
            </FormControl>
            <FormControl mb={3}>
              <FormLabel>Gender</FormLabel>
              <Select
                value={personalFormData.gender}
                onChange={(e) =>
                  setPersonalFormData({
                    ...personalFormData,
                    gender: e.target.value,
                  })
                }
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </Select>
            </FormControl>
            <FormControl mb={3}>
              <FormLabel>Religion</FormLabel>
              <Input
                value={personalFormData.religion}
                onChange={(e) =>
                  setPersonalFormData({
                    ...personalFormData,
                    religion: e.target.value,
                  })
                }
              />
            </FormControl>
            <FormControl mb={3}>
              <FormLabel>Date of Birth</FormLabel>
              <Input
                value={personalFormData.dateOfBirth}
                onChange={(e) =>
                  setPersonalFormData({
                    ...personalFormData,
                    dateOfBirth: e.target.value,
                  })
                }
              />
            </FormControl>
            <FormControl mb={3}>
              <FormLabel>Place of Birth</FormLabel>
              <Input
                value={personalFormData.placeOfBirth}
                onChange={(e) =>
                  setPersonalFormData({
                    ...personalFormData,
                    placeOfBirth: e.target.value,
                  })
                }
              />
            </FormControl>
            <FormControl mb={3}>
              <FormLabel>Email</FormLabel>
              <Input
                value={personalFormData.email}
                onChange={(e) =>
                  setPersonalFormData({
                    ...personalFormData,
                    email: e.target.value,
                  })
                }
              />
            </FormControl>
            <FormControl mb={3}>
              <FormLabel>Phone</FormLabel>
              <Input
                value={personalFormData.phone}
                onChange={(e) =>
                  setPersonalFormData({
                    ...personalFormData,
                    phone: e.target.value,
                  })
                }
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button
              variant="ghost"
              mr={3}
              onClick={() => setPersonalInfoModalOpen(false)}
            >
              Cancel
            </Button>
            <Button colorScheme="teal" onClick={handlePersonalInfoUpdate}>
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Employment Information Edit Modal */}
      <Modal
        isOpen={isEmploymentInfoModalOpen}
        onClose={() => setEmploymentInfoModalOpen(false)}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Employment Information</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl mb={3}>
              <FormLabel>Employee ID</FormLabel>
              <Input
                value={employmentFormData.employeeId}
                onChange={(e) =>
                  setEmploymentFormData({
                    ...employmentFormData,
                    employeeId: e.target.value,
                  })
                }
                isReadOnly
              />
            </FormControl>
            <FormControl mb={3}>
              <FormLabel>Department</FormLabel>
              <Input
                value={employmentFormData.department}
                onChange={(e) =>
                  setEmploymentFormData({
                    ...employmentFormData,
                    department: e.target.value,
                  })
                }
              />
            </FormControl>
            <FormControl mb={3}>
              <FormLabel>Position</FormLabel>
              <Input
                value={employmentFormData.position}
                onChange={(e) =>
                  setEmploymentFormData({
                    ...employmentFormData,
                    position: e.target.value,
                  })
                }
              />
            </FormControl>
            <FormControl mb={3}>
              <FormLabel>Join Date</FormLabel>
              <Input
                value={employmentFormData.joinDate}
                onChange={(e) =>
                  setEmploymentFormData({
                    ...employmentFormData,
                    joinDate: e.target.value,
                  })
                }
              />
            </FormControl>
            <FormControl mb={3}>
              <FormLabel>Status</FormLabel>
              <Select
                value={employmentFormData.status}
                onChange={(e) =>
                  setEmploymentFormData({
                    ...employmentFormData,
                    status: e.target.value,
                  })
                }
              >
                <option value="Permanent">Permanent</option>
                <option value="Contract">Contract</option>
                <option value="Probation">Probation</option>
              </Select>
            </FormControl>
            <FormControl mb={3}>
              <FormLabel>Supervisor</FormLabel>
              <Input
                value={employmentFormData.supervisor}
                onChange={(e) =>
                  setEmploymentFormData({
                    ...employmentFormData,
                    supervisor: e.target.value,
                  })
                }
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button
              variant="ghost"
              mr={3}
              onClick={() => setEmploymentInfoModalOpen(false)}
            >
              Cancel
            </Button>
            <Button colorScheme="teal" onClick={handleEmploymentInfoUpdate}>
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ProfileAdminOffice;