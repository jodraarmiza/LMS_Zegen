import React from "react";
import { Box, Flex, Text, Image, VStack, Link, Center } from "@chakra-ui/react";
import { DownloadIcon } from "@chakra-ui/icons";

interface StudentIDCardProps {
  name: string;
  studentId: string;
  profilePhoto: string | null;
  onDownload: () => void;
}

const StudentIDCard: React.FC<StudentIDCardProps> = ({
  name,
  studentId,
  profilePhoto,
  onDownload,
}) => {
  return (
    <Box w="100%">
      <Flex direction="column" alignItems="center" mb={2}>
        <Text fontWeight="medium" mb={1}>
          Student Identification Card
        </Text>
        <Link
          onClick={onDownload}
          color="blue.500"
          fontWeight="medium"
          fontSize="sm"
          display="flex"
          alignItems="center"
        >
          <DownloadIcon mr={1} />
          Click to Download
        </Link>
      </Flex>

      {/* ID Card Preview - Exactly as in the UI */}
      <Box
        maxW="320px"
        mx="auto"
        borderRadius="md"
        overflow="hidden"
        boxShadow="md"
      >
        {/* Blue Header with Logo */}
        <Box bg="blue.500" p={2} color="white" textAlign="center">
          <Text fontSize="xl" fontWeight="bold" lineHeight="1.2">
            ZSM
          </Text>
          <Text fontSize="xs" lineHeight="1.2">
            Universitas Zegen Satusi Mandiri
          </Text>
        </Box>

        {/* Card Content */}
        <Box bg="blue.50" p={4}>
          <VStack spacing={2} align="center">
            {/* Profile Image */}
            <Center
              bg="gray.100"
              borderRadius="full"
              boxSize="70px"
              overflow="hidden"
              borderWidth={1}
              borderColor="gray.300"
            >
              {profilePhoto ? (
                <Image
                  src={profilePhoto}
                  alt={name}
                  boxSize="100%"
                  objectFit="cover"
                />
              ) : (
                <Text fontSize="2xl" color="gray.400">
                  AS
                </Text>
              )}
            </Center>

            {/* Name */}
            <Text fontWeight="bold" color="blue.800">
              {name}
            </Text>

            {/* ID Number */}
            <Box
              bg="white"
              py={1}
              px={3}
              borderRadius="md"
              fontWeight="medium"
              fontSize="md"
              borderWidth={1}
              borderColor="gray.200"
            >
              {studentId}
            </Box>

            {/* QR Code */}
            <Box p={1}>
              <Image
                src="/api/placeholder/80/80?text=QR+Code"
                alt="QR Code"
                w="80px"
                h="80px"
              />
            </Box>
          </VStack>
        </Box>
      </Box>
    </Box>
  );
};

export default StudentIDCard;
