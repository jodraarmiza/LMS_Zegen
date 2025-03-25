import React, { useState } from "react";
import {
  Box,
  Flex,
  Text,
  Heading,
  Grid,
  GridItem,
  Button,
  Avatar,
  Input,
  useToast,
  Link,
  Image,
} from "@chakra-ui/react";
import { DownloadIcon } from "@chakra-ui/icons";
// import logo from '../assets/zsm-logo.png';


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
}

const ProfilePage: React.FC = () => {
  const toast = useToast();
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);
  const [fileSelected, setFileSelected] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  
  // Initial profile data
  const [profileData, _] = useState<ProfileData>({
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
      degree: "Bachelor",
      major: "Information Systems",
      stream: "Information Systems",
      gpa: "3.47",
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

  const handleUpdateProfile = () => {
    // In a real app, you would submit the profile data to your backend here
    toast({
      title: "Profile updated",
      description: "Your profile has been successfully updated.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
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

  // Get user initials
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  return (
    <Box minH="100vh" bg="gray.50">
      <Box p={4} borderBottomWidth="1px" borderBottomColor="gray.200" bg="white">
        <Text color="gray.500" fontSize="sm">
          Profile
        </Text>
        <Heading as="h1" size="lg" mt={1}>
          My Profile
        </Heading>
      </Box>

      <Box p={4}>
        <Grid templateColumns={{base: "1fr", md: "1fr 1fr"}} gap={6}>
          {/* Left Column */}
          <GridItem>
            {/* Active Student Section */}
            <Box 
              bg="white" 
              p={6} 
              mb={6} 
              borderRadius="md" 
              borderWidth="1px" 
              borderColor="gray.200"
            >
              <Text color="blue.500" fontWeight="medium" mb={6}>
                Active Student
              </Text>
              
              <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
                <Avatar 
                  size="xl" 
                  src={profilePhoto || undefined}
                  name={profileData.personalInfo.name}
                  bg="green.100" 
                  mb={4}
                >
                  {getInitials(profileData.personalInfo.name)}
                </Avatar>
                
                <Text fontSize="sm" mb={3}>
                  Upload
                </Text>
                
                <Flex>
                  <Button
                    as="label"
                    htmlFor="photo-upload"
                    colorScheme="blue"
                    size="sm"
                    mr={2}
                  >
                    Choose File
                    <Input
                      id="photo-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      display="none"
                    />
                  </Button>
                  <Text fontSize="sm" color="gray.500" alignSelf="center">
                    {selectedFile?.name || "No file chosen"}
                  </Text>
                </Flex>
              </Box>
            </Box>
            
            {/* Personal Information */}
            <Box 
              bg="white" 
              p={6} 
              mb={6} 
              borderRadius="md" 
              borderWidth="1px" 
              borderColor="gray.200"
            >
              <Heading size="md" mb={6}>
                Personal Information
              </Heading>
              
              <Grid templateColumns="1fr" gap={6}>
                <Box>
                  <Flex>
                    <Box flex="1">
                      <Text fontWeight="medium" color="gray.600" mb={1}>
                        Name
                      </Text>
                      <Text>{profileData.personalInfo.name}</Text>
                    </Box>
                    <Box flex="1">
                      <Text fontWeight="medium" color="gray.600" mb={1}>
                        Gender
                      </Text>
                      <Text>{profileData.personalInfo.gender}</Text>
                    </Box>
                  </Flex>
                </Box>
                
                <Box>
                  <Flex>
                    <Box flex="1">
                      <Text fontWeight="medium" color="gray.600" mb={1}>
                        Religion
                      </Text>
                      <Text>{profileData.personalInfo.religion}</Text>
                    </Box>
                    <Box flex="1">
                      <Text fontWeight="medium" color="gray.600" mb={1}>
                        Date of Birth
                      </Text>
                      <Text>{profileData.personalInfo.dateOfBirth}</Text>
                    </Box>
                  </Flex>
                </Box>
                
                <Box>
                  <Text fontWeight="medium" color="gray.600" mb={1}>
                    Place of Birth
                  </Text>
                  <Text>{profileData.personalInfo.placeOfBirth}</Text>
                </Box>
              </Grid>
            </Box>
            
            {/* Academic Information */}
            <Box 
              bg="white" 
              p={6} 
              mb={6} 
              borderRadius="md" 
              borderWidth="1px" 
              borderColor="gray.200"
            >
              <Heading size="md" mb={6}>
                Academic Information
              </Heading>
              
              <Grid templateColumns="1fr" gap={6}>
                <Box>
                  <Flex>
                    <Box flex="1">
                      <Text fontWeight="medium" color="gray.600" mb={1}>
                        Current Semester
                      </Text>
                      <Text>{profileData.academicInfo.currentSemester}</Text>
                    </Box>
                    <Box flex="1">
                      <Text fontWeight="medium" color="gray.600" mb={1}>
                        Student ID
                      </Text>
                      <Text>{profileData.academicInfo.studentId}</Text>
                    </Box>
                  </Flex>
                </Box>
                
                <Box>
                  <Flex>
                    <Box flex="1">
                      <Text fontWeight="medium" color="gray.600" mb={1}>
                        Degree
                      </Text>
                      <Text>{profileData.academicInfo.degree}</Text>
                    </Box>
                    <Box flex="1">
                      <Text fontWeight="medium" color="gray.600" mb={1}>
                        Major
                      </Text>
                      <Text>{profileData.academicInfo.major}</Text>
                    </Box>
                  </Flex>
                </Box>
                
                <Box>
                  <Flex>
                    <Box flex="1">
                      <Text fontWeight="medium" color="gray.600" mb={1}>
                        Stream
                      </Text>
                      <Text>{profileData.academicInfo.stream}</Text>
                    </Box>
                    <Box flex="1">
                      <Text fontWeight="medium" color="gray.600" mb={1}>
                        GPA
                      </Text>
                      <Text>{profileData.academicInfo.gpa}</Text>
                    </Box>
                  </Flex>
                </Box>
              </Grid>
            </Box>
            
            {/* Update Button */}
            <Flex justifyContent="flex-end">
              <Button colorScheme="blue" onClick={handleUpdateProfile}>
                Update
              </Button>
            </Flex>
          </GridItem>
          
          {/* Right Column - Student ID Card */}
          <GridItem>
            <Box 
              bg="white" 
              p={6} 
              borderRadius="md" 
              borderWidth="1px" 
              borderColor="gray.200"
            >
              <Heading size="md" mb={4}>
                Student Identification Card
              </Heading>
              
              <Flex mb={6} alignItems="center">
                <DownloadIcon color="blue.500" mr={2} />
                <Link color="blue.500" onClick={handleDownloadCard}>
                  Click to Download
                </Link>
              </Flex>
              
              {/* ID Card */}
              <Box 
                borderRadius="md" 
                overflow="hidden" 
                borderWidth="1px" 
                borderColor="gray.200"
                maxW="450px"
              >
                {/* University Header Bar */}
                <Box bg="blue.500" color="white" py={2} px={4} textAlign="center">
                  <Text fontWeight="bold">Universitas Zegen Solusi Mandiri</Text>
                </Box>
                
                {/* Student Info Section */}
                <Box bg="blue.50" p={4}>
                  <Flex>
                    {/* Avatar Circle */}
                    <Flex 
                      align="center" 
                      justify="center"
                      bg="orange.200" 
                      borderRadius="full" 
                      w="70px" 
                      h="70px"
                      mr={4}
                    >
                      <Text 
                        fontSize="2xl" 
                        fontWeight="bold"
                      >
                        {getInitials(profileData.personalInfo.name)}
                      </Text>
                    </Flex>
                    
                    {/* Student Info */}
                    <Box flex="1">
                      <Text fontWeight="bold">
                        {profileData.personalInfo.name}
                      </Text>
                      <Text fontSize="xs" color="gray.500">
                        Student {profileData.academicInfo.major}
                      </Text>
                      <Text fontWeight="bold" mt={2}>
                        {profileData.academicInfo.studentId}
                      </Text>
                    </Box>
                    
                    {/* QR Code */}
                    <Box>
                      <Image 
                        src="./assets/QRCode.png" 
                        alt="QR Code"
                        boxSize="70px"
                        borderRadius="md"
                      />
                    </Box>
                  </Flex>
                </Box>
              </Box>
            </Box>
          </GridItem>
        </Grid>
      </Box>
    </Box>
  );
};

export default ProfilePage;