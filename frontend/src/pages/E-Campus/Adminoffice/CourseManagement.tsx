import React, { useState } from "react";
import {
  Box,
  Flex,
  Text,
  Heading,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  Card,
  CardHeader,
  CardBody,
  Stack,
  Input,
  InputGroup,
  InputLeftElement,
  SimpleGrid,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormControl,
  FormLabel,
  Select,
  IconButton,
  Tooltip
} from "@chakra-ui/react";
import {
  SearchIcon,
  AddIcon,
  EditIcon,
  DeleteIcon,
  InfoIcon,
} from "@chakra-ui/icons";

// Sample data for courses
const courseData = [
  { id: 'CS101', name: 'Pengantar Pemrograman', credits: 3, semester: 1, program: 'Teknik Informatika' },
  { id: 'CS201', name: 'Struktur Data', credits: 4, semester: 3, program: 'Teknik Informatika' },
  { id: 'IS101', name: 'Dasar Sistem Informasi', credits: 3, semester: 1, program: 'Sistem Informasi' },
  { id: 'MG101', name: 'Pengantar Manajemen', credits: 3, semester: 1, program: 'Manajemen' },
  { id: 'AC101', name: 'Dasar Akuntansi', credits: 3, semester: 1, program: 'Akuntansi' },
];

// Sample data for KRS history
const KRSHistoryData = [
  { id: 1, date: '2025-04-01', name: 'Paket KRS Semester Genap 2024/2025', program: 'Teknik Informatika', semester: 4, courses: 8, status: 'Aktif' },
  { id: 2, date: '2024-10-15', name: 'Paket KRS Semester Ganjil 2024/2025', program: 'Teknik Informatika', semester: 3, courses: 7, status: 'Selesai' },
  { id: 3, date: '2024-04-03', name: 'Paket KRS Semester Genap 2023/2024', program: 'Teknik Informatika', semester: 2, courses: 8, status: 'Selesai' },
];

const CourseManagement: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCourse, setSelectedCourse] = useState<any>(null);
  
  const {
    isOpen: isCourseModalOpen,
    onOpen: onCourseModalOpen,
    onClose: onCourseModalClose
  } = useDisclosure();

  const {
    isOpen: isDetailModalOpen,
    onOpen: onDetailModalOpen,
    onClose: onDetailModalClose
  } = useDisclosure();

  // Filter courses based on search query
  const filteredCourses = searchQuery
    ? courseData.filter(course => 
        course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.program.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : courseData;

  const handleDetailView = (course: any) => {
    setSelectedCourse(course);
    onDetailModalOpen();
  };

  return (
    <Box p={5}>
      <Heading size="lg" mb={6}>Course Management</Heading>

      <Flex justify="space-between" mb={4}>
        <InputGroup maxWidth="400px">
          <InputLeftElement pointerEvents="none">
            <SearchIcon color="gray.300" />
          </InputLeftElement>
          <Input 
            placeholder="Cari mata kuliah..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </InputGroup>
        <Button leftIcon={<AddIcon />} colorScheme="teal" onClick={onCourseModalOpen}>
          Input Mata Kuliah / KRS Baru
        </Button>
      </Flex>

      <Card mb={6}>
        <CardHeader>
          <Heading size="md">Daftar Mata Kuliah / Paket KRS</Heading>
        </CardHeader>
        <CardBody>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Kode</Th>
                <Th>Nama Mata Kuliah</Th>
                <Th>SKS</Th>
                <Th>Semester</Th>
                <Th>Program Studi</Th>
                <Th>Aksi</Th>
              </Tr>
            </Thead>
            <Tbody>
              {filteredCourses.map((course) => (
                <Tr key={course.id}>
                  <Td>{course.id}</Td>
                  <Td>{course.name}</Td>
                  <Td>{course.credits}</Td>
                  <Td>{course.semester}</Td>
                  <Td>{course.program}</Td>
                  <Td>
                    <Tooltip label="Lihat Detail">
                      <IconButton
                        aria-label="Lihat detail"
                        icon={<InfoIcon />}
                        size="sm"
                        colorScheme="blue"
                        variant="ghost"
                        mr={2}
                        onClick={() => handleDetailView(course)}
                      />
                    </Tooltip>
                    <Tooltip label="Edit">
                      <IconButton
                        aria-label="Edit"
                        icon={<EditIcon />}
                        size="sm"
                        colorScheme="green"
                        variant="ghost"
                        mr={2}
                      />
                    </Tooltip>
                    <Tooltip label="Hapus">
                      <IconButton
                        aria-label="Hapus"
                        icon={<DeleteIcon />}
                        size="sm"
                        colorScheme="red"
                        variant="ghost"
                      />
                    </Tooltip>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
          {filteredCourses.length === 0 && (
            <Box textAlign="center" py={4}>
              <Text>Tidak ada mata kuliah yang sesuai dengan pencarian.</Text>
            </Box>
          )}
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <Heading size="md">Riwayat Input KRS</Heading>
        </CardHeader>
        <CardBody>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Tanggal Input</Th>
                <Th>Nama Paket KRS</Th>
                <Th>Program Studi</Th>
                <Th>Semester</Th>
                <Th>Jumlah MK</Th>
                <Th>Status</Th>
              </Tr>
            </Thead>
            <Tbody>
              {KRSHistoryData.map((krs) => (
                <Tr key={krs.id}>
                  <Td>{krs.date}</Td>
                  <Td>{krs.name}</Td>
                  <Td>{krs.program}</Td>
                  <Td>{krs.semester}</Td>
                  <Td>{krs.courses}</Td>
                  <Td>
                    <Badge colorScheme={krs.status === 'Aktif' ? "green" : "gray"}>
                      {krs.status}
                    </Badge>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </CardBody>
      </Card>

      {/* Modal for Course Input */}
      <Modal isOpen={isCourseModalOpen} onClose={onCourseModalClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Input Mata Kuliah / KRS Baru</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={4}>
              <SimpleGrid columns={2} spacing={4}>
                <FormControl isRequired>
                  <FormLabel>Kode Mata Kuliah</FormLabel>
                  <Input placeholder="Contoh: CS101" />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Nama Mata Kuliah</FormLabel>
                  <Input placeholder="Masukkan nama mata kuliah" />
                </FormControl>
              </SimpleGrid>
              
              <SimpleGrid columns={2} spacing={4}>
                <FormControl isRequired>
                  <FormLabel>Program Studi</FormLabel>
                  <Select placeholder="Pilih program studi">
                    <option value="ti">Teknik Informatika</option>
                    <option value="si">Sistem Informasi</option>
                    <option value="manajemen">Manajemen</option>
                    <option value="akuntansi">Akuntansi</option>
                  </Select>
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Semester</FormLabel>
                  <Select placeholder="Pilih semester">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                  </Select>
                </FormControl>
              </SimpleGrid>
              
              <SimpleGrid columns={2} spacing={4}>
                <FormControl isRequired>
                  <FormLabel>Jumlah SKS</FormLabel>
                  <Input type="number" placeholder="Masukkan jumlah SKS" />
                </FormControl>
                <FormControl>
                  <FormLabel>Deskripsi</FormLabel>
                  <Input placeholder="Deskripsi singkat mata kuliah" />
                </FormControl>
              </SimpleGrid>
            </Stack>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onCourseModalClose}>
              Batal
            </Button>
            <Button colorScheme="blue">Simpan</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Modal for Course Detail */}
      {selectedCourse && (
        <Modal isOpen={isDetailModalOpen} onClose={onDetailModalClose} size="xl">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Detail Mata Kuliah</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Stack spacing={4}>
                <SimpleGrid columns={2} spacing={4}>
                  <FormControl>
                    <FormLabel fontWeight="bold">Kode Mata Kuliah</FormLabel>
                    <Text>{selectedCourse.id}</Text>
                  </FormControl>
                  <FormControl>
                    <FormLabel fontWeight="bold">Nama Mata Kuliah</FormLabel>
                    <Text>{selectedCourse.name}</Text>
                  </FormControl>
                </SimpleGrid>
                <SimpleGrid columns={3} spacing={4}>
                  <FormControl>
                    <FormLabel fontWeight="bold">Program Studi</FormLabel>
                    <Text>{selectedCourse.program}</Text>
                  </FormControl>
                  <FormControl>
                    <FormLabel fontWeight="bold">Semester</FormLabel>
                    <Text>{selectedCourse.semester}</Text>
                  </FormControl>
                  <FormControl>
                    <FormLabel fontWeight="bold">SKS</FormLabel>
                    <Text>{selectedCourse.credits}</Text>
                  </FormControl>
                </SimpleGrid>
                <FormControl>
                  <FormLabel fontWeight="bold">Deskripsi</FormLabel>
                  <Text>Deskripsi mata kuliah {selectedCourse.name} dari program studi {selectedCourse.program}.</Text>
                </FormControl>
              </Stack>
            </ModalBody>
            <ModalFooter>
              <Button variant="ghost" mr={3} onClick={onDetailModalClose}>
                Tutup
              </Button>
              <Button colorScheme="blue">Edit</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </Box>
  );
};

export default CourseManagement;