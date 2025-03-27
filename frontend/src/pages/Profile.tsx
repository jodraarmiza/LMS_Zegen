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
} from "@chakra-ui/react";
import { DownloadIcon, EditIcon } from "@chakra-ui/icons";

interface ProfileData {
  personalInfo: {
    name: string;
    gender: string;
    religion: string;
    dateOfBirth: string;
    placeOfBirth: string;
  };
  academicInfo: {
    currentSemester: string;
    studentId: string;
    degree: string;
    major: string;
    stream: string;
    gpa: string;
  };
  skills: {
    description: string;
  };
}

const ProfilePage: React.FC = () => {
  const toast = useToast();
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);
  const [fileSelected, setFileSelected] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  
  // Modal states
  const [isPersonalInfoModalOpen, setPersonalInfoModalOpen] = useState(false);
  const [isAcademicInfoModalOpen, setAcademicInfoModalOpen] = useState(false);
  
  // Initial profile data
  const [profileData, setProfileData] = useState<ProfileData>({
    personalInfo: {
      name: "Anggara Swaradarma",
      gender: "Male",
      religion: "Buddha",
      dateOfBirth: "03-03-2004",
      placeOfBirth: "Sumatera Utara, Medan",
    },
    academicInfo: {
      currentSemester: "2024, Even Semester",
      studentId: "ZGN22418",
      degree: "Buddha",
      major: "Information Systems",
      stream: "Information Systems",
      gpa: "3.47",
    },
    skills: {
      description: "Mengoperasikan Java, C++ & Python",
    }
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
    // In a real app, this would trigger a download of the student ID card
    toast({
      title: "Downloading ID Card",
      description: "Your student ID card is being downloaded.",
      status: "info",
      duration: 3000,
      isClosable: true,
    });
  };
  
  // Form data for modals
  const [personalFormData, setPersonalFormData] = useState({...profileData.personalInfo});
  const [academicFormData, setAcademicFormData] = useState({...profileData.academicInfo});
  
  // Update personal information
  const handlePersonalInfoUpdate = () => {
    setProfileData({
      ...profileData,
      personalInfo: personalFormData
    });
    
    toast({
      title: "Personal information updated",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
    
    setPersonalInfoModalOpen(false);
  };
  
  // Update academic information
  const handleAcademicInfoUpdate = () => {
    setProfileData({
      ...profileData,
      academicInfo: academicFormData
    });
    
    toast({
      title: "Academic information updated",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
    
    setAcademicInfoModalOpen(false);
  };

  return (
    <Box flex="1" p={6} bg="gray.50" minH="calc(100vh - 70px)">
      {/* Profile Header */}
      <Box mb={6}>
        <Text color="gray.500" fontSize="sm">Profile</Text>
        <Heading size="md">My Profile</Heading>
      </Box>

      {/* Profile Content */}
      <Flex direction={{ base: "column", lg: "row" }} gap={6}>
        {/* Left Column */}
        <Box flex="1">
{/* Profile Photo Section - All in one card */}
<Box bg="white" p={4} borderRadius="md" mb={6} boxShadow="sm">
  {/* Top row with profile and upload side by side */}
  <Flex>
    {/* Left side - Profile photo and name */}
    <Flex flex="1" alignItems="center">
      <Avatar 
        size="lg" 
        name={profileData.personalInfo.name} 
        src={profilePhoto || undefined}
        bg="cyan.400"
        mr={4}
      >
        AS
      </Avatar>
      <Box>
        <Text fontWeight="medium">{profileData.personalInfo.name}</Text>
        <Text fontSize="sm" color="green.500">● Active Student</Text>
      </Box>
    </Flex>
    
    {/* Right side - Upload section */}
    <Box flex="1">
      <Text fontSize="sm" mb={3}>Upload</Text>
      <Flex mb={2} alignItems="center">
        <Button 
          as="label"
          htmlFor="profile-upload"
          size="sm"
          colorScheme="blue"
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
                <Text fontSize="sm" mr={1}>Edit</Text>
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
                <Text fontSize="sm" color="gray.500">Name</Text>
                <Text>{profileData.personalInfo.name}</Text>
              </Box>
              <Box>
                <Text fontSize="sm" color="gray.500">Gender</Text>
                <Text>{profileData.personalInfo.gender}</Text>
              </Box>
              <Box>
                <Text fontSize="sm" color="gray.500">Religion</Text>
                <Text>{profileData.personalInfo.religion}</Text>
              </Box>
              <Box>
                <Text fontSize="sm" color="gray.500">Date of Birth</Text>
                <Text>{profileData.personalInfo.dateOfBirth}</Text>
              </Box>
              <Box>
                <Text fontSize="sm" color="gray.500">Place of Birth</Text>
                <Text>{profileData.personalInfo.placeOfBirth}</Text>
              </Box>
              <Box>
                <Text fontSize="sm" color="gray.500">Skill</Text>
                <Text>{profileData.skills.description}</Text>
              </Box>
            </Grid>
          </Box>

          {/* Academic Information */}
          <Box 
            bg="white" 
            p={4} 
            borderRadius="md"
            boxShadow="sm"
            position="relative"
          >
            <Flex justifyContent="space-between" alignItems="center" mb={4}>
              <Heading size="sm">Academic Information</Heading>
              <Flex alignItems="center">
                <Text fontSize="sm" mr={1}>Edit</Text>
                <IconButton
                  aria-label="Edit"
                  icon={<EditIcon />}
                  size="sm"
                  variant="ghost"
                  onClick={() => setAcademicInfoModalOpen(true)}
                />
              </Flex>
            </Flex>

            <Grid templateColumns="repeat(2, 1fr)" gap={4}>
              <Box>
                <Text fontSize="sm" color="gray.500">Current Semester</Text>
                <Text>{profileData.academicInfo.currentSemester}</Text>
              </Box>
              <Box>
                <Text fontSize="sm" color="gray.500">Student ID</Text>
                <Text>{profileData.academicInfo.studentId}</Text>
              </Box>
              <Box>
                <Text fontSize="sm" color="gray.500">Degree</Text>
                <Text>{profileData.academicInfo.degree}</Text>
              </Box>
              <Box>
                <Text fontSize="sm" color="gray.500">Major</Text>
                <Text>{profileData.academicInfo.major}</Text>
              </Box>
              <Box>
                <Text fontSize="sm" color="gray.500">Stream</Text>
                <Text>{profileData.academicInfo.stream}</Text>
              </Box>
              <Box>
                <Text fontSize="sm" color="gray.500">GPA</Text>
                <Text>{profileData.academicInfo.gpa}</Text>
              </Box>
            </Grid>
          </Box>
        </Box>

        {/* Right Column - Student ID Card */}
        <Box w={{ base: "100%", lg: "40%" }}>
          <Box 
            bg="white" 
            p={4} 
            borderRadius="md"
            boxShadow="sm"
          >
            <Heading size="sm" mb={4}>ID Card Student</Heading>
            
            {/* ID Card */}
            <Box 
              borderWidth="1px" 
              borderColor="gray.200" 
              borderRadius="md" 
              overflow="hidden"
              mb={4}
            >
              <Box bg="blue.500" color="white" py={2} px={4} textAlign="center">
                <Text fontWeight="bold">STUDENT</Text>
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
                    <Box 
                      h="full" 
                      w="full" 
                      bg="gray.300" 
                      display="flex" 
                      alignItems="center" 
                      justifyContent="center"
                    >
                      <Text fontSize="xs" color="gray.500">Photo</Text>
                    </Box>
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
                colorScheme="blue" 
                variant="link" 
                size="sm"
                onClick={handleDownloadCard}
              >
                Download
              </Button>
            </Flex>
          </Box>
          
          {/* Blue wave decoration */}
          <Box position="relative" mt={8} h="200px" overflow="hidden">
            <Box 
              position="absolute" 
              bottom="-100px" 
              right="-50px" 
              w="500px" 
              h="300px" 
              borderRadius="50%" 
              bg="blue.100" 
              opacity="0.6" 
              transform="rotate(-15deg)"
            />
          </Box>
        </Box>
      </Flex>
      
      {/* Personal Information Edit Modal */}
      <Modal isOpen={isPersonalInfoModalOpen} onClose={() => setPersonalInfoModalOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Personal Information</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl mb={3}>
              <FormLabel>Name</FormLabel>
              <Input 
                value={personalFormData.name} 
                onChange={(e) => setPersonalFormData({...personalFormData, name: e.target.value})}
              />
            </FormControl>
            <FormControl mb={3}>
              <FormLabel>Gender</FormLabel>
              <Select 
                value={personalFormData.gender}
                onChange={(e) => setPersonalFormData({...personalFormData, gender: e.target.value})}
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
                onChange={(e) => setPersonalFormData({...personalFormData, religion: e.target.value})}
              />
            </FormControl>
            <FormControl mb={3}>
              <FormLabel>Date of Birth</FormLabel>
              <Input 
                value={personalFormData.dateOfBirth} 
                onChange={(e) => setPersonalFormData({...personalFormData, dateOfBirth: e.target.value})}
              />
            </FormControl>
            <FormControl mb={3}>
              <FormLabel>Place of Birth</FormLabel>
              <Input 
                value={personalFormData.placeOfBirth} 
                onChange={(e) => setPersonalFormData({...personalFormData, placeOfBirth: e.target.value})}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={() => setPersonalInfoModalOpen(false)}>
              Cancel
            </Button>
            <Button colorScheme="blue" onClick={handlePersonalInfoUpdate}>
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      
{/* Academic Information Edit Modal */}
<Modal isOpen={isAcademicInfoModalOpen} onClose={() => setAcademicInfoModalOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Academic Information</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl mb={3}>
              <FormLabel>Current Semester</FormLabel>
              <Input 
                value={academicFormData.currentSemester} 
                onChange={(e) => setAcademicFormData({...academicFormData, currentSemester: e.target.value})}
              />
            </FormControl>
            <FormControl mb={3}>
              <FormLabel>Student ID</FormLabel>
              <Input 
                value={academicFormData.studentId}
                onChange={(e) => setAcademicFormData({...academicFormData, studentId: e.target.value})}
                isReadOnly
              />
            </FormControl>
            <FormControl mb={3}>
              <FormLabel>Degree</FormLabel>
              <Input 
                value={academicFormData.degree} 
                onChange={(e) => setAcademicFormData({...academicFormData, degree: e.target.value})}
              />
            </FormControl>
            <FormControl mb={3}>
              <FormLabel>Major</FormLabel>
              <Input 
                value={academicFormData.major} 
                onChange={(e) => setAcademicFormData({...academicFormData, major: e.target.value})}
              />
            </FormControl>
            <FormControl mb={3}>
              <FormLabel>Stream</FormLabel>
              <Input 
                value={academicFormData.stream} 
                onChange={(e) => setAcademicFormData({...academicFormData, stream: e.target.value})}
              />
            </FormControl>
            <FormControl mb={3}>
              <FormLabel>GPA</FormLabel>
              <Input 
                value={academicFormData.gpa} 
                onChange={(e) => setAcademicFormData({...academicFormData, gpa: e.target.value})}
                isReadOnly
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={() => setAcademicInfoModalOpen(false)}>
              Cancel
            </Button>
            <Button colorScheme="blue" onClick={handleAcademicInfoUpdate}>
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ProfilePage;