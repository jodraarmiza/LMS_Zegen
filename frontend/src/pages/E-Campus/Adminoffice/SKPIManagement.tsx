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
  SimpleGrid,
  Input,
  FormControl,
  FormLabel,
  FormHelperText,
  Select,
  Textarea,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  UnorderedList,
  ListItem,
  useToast,
  IconButton,
  InputGroup,
  InputLeftElement,
  HStack,
  VStack
} from "@chakra-ui/react";
import {
  SearchIcon,
  AddIcon,
  DownloadIcon,
  ViewIcon,
  EditIcon,
  DeleteIcon,
} from "@chakra-ui/icons";

// Sample data for SKPI
const skpiData = [
  {
    id: 1,
    nim: "20210001",
    name: "Ahmad Rizal",
    program: "Teknik Informatika",
    activity: "Seminar Teknologi Blockchain",
    type: "Seminar/Workshop",
    date: "2024-10-15",
    points: 2,
    status: "Approved"
  },
  {
    id: 2,
    nim: "20210015",
    name: "Siti Nurhaliza",
    program: "Ekonomi",
    activity: "Lomba Debat Ekonomi Nasional",
    type: "Kompetisi",
    date: "2024-11-20",
    points: 5,
    status: "Pending"
  },
  {
    id: 3,
    nim: "20200045",
    name: "Budi Santoso",
    program: "Manajemen",
    activity: "Pelatihan Kepemimpinan",
    type: "Pelatihan",
    date: "2024-09-05",
    points: 3,
    status: "Approved"
  },
  {
    id: 4,
    nim: "20210033",
    name: "Dewi Anggraini",
    program: "Sistem Informasi",
    activity: "Magang di Perusahaan IT",
    type: "Magang/Internship",
    date: "2024-07-01",
    points: 10,
    status: "Approved"
  },
  {
    id: 5,
    nim: "20190078",
    name: "Rizki Ramadhan",
    program: "Teknik Informatika",
    activity: "Sertifikasi Oracle Database",
    type: "Sertifikasi",
    date: "2024-08-15",
    points: 15,
    status: "Pending"
  }
];

const SKPIManagement: React.FC = () => {
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterType, setFilterType] = useState("all");
  const [newActivity, setNewActivity] = useState({
    nim: "",
    name: "",
    program: "",
    activity: "",
    type: "",
    startDate: "",
    endDate: "",
    description: "",
    points: ""
  });
  
  const toast = useToast();
  
  const {
    isOpen: isDetailModalOpen,
    onOpen: onDetailModalOpen,
    onClose: onDetailModalClose
  } = useDisclosure();
  
  const {
    isOpen: isAddModalOpen,
    onOpen: onAddModalOpen,
    onClose: onAddModalClose
  } = useDisclosure();

  // Filter data based on search and filters
  const filteredData = skpiData
    .filter(item => 
      filterStatus === "all" || item.status === filterStatus
    )
    .filter(item => 
      filterType === "all" || item.type === filterType  
    )
    .filter(item => 
      !searchQuery || 
      item.nim.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.activity.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const handleDetailView = (student: any) => {
    setSelectedStudent(student);
    onDetailModalOpen();
  };

  const handleSearchStudent = () => {
    // In a real application, this would be an API call to fetch student data
    if (newActivity.nim) {
      setNewActivity({
        ...newActivity,
        name: "John Doe", // Simulated data
        program: "Teknik Informatika" // Simulated data
      });
    }
  };

  const handleSubmitActivity = () => {
    // Validate form
    if (!newActivity.nim || !newActivity.activity || !newActivity.type || !newActivity.points) {
      toast({
        title: "Error",
        description: "Mohon lengkapi semua field yang diperlukan",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    // In a real application, this would be an API call to save the data
    toast({
      title: "Berhasil",
      description: "Data SKPI mahasiswa berhasil disimpan",
      status: "success",
      duration: 3000,
      isClosable: true,
    });

    // Reset form
    setNewActivity({
      nim: "",
      name: "",
      program: "",
      activity: "",
      type: "",
      startDate: "",
      endDate: "",
      description: "",
      points: ""
    });

    onAddModalClose();
  };

  return (
    <Box p={5}>
      <Heading size="lg" mb={6}>SKPI Management</Heading>

      <Tabs variant="enclosed" colorScheme="teal" mb={6}>
        <TabList>
          <Tab>Data SKPI</Tab>
          <Tab>Input Data SKPI</Tab>
          <Tab>Panduan SKPI</Tab>
        </TabList>

        <TabPanels>
          {/* Tab Data SKPI */}
          <TabPanel px={0}>
            <Flex mb={4} justify="space-between" flexWrap="wrap" gap={2}>
              <Flex gap={3} flexWrap="wrap">
                <Select
                  placeholder="Filter Status"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  width="auto"
                  minW="150px"
                >
                  <option value="all">Semua Status</option>
                  <option value="Approved">Approved</option>
                  <option value="Pending">Pending</option>
                  <option value="Rejected">Rejected</option>
                </Select>
                
                <Select
                  placeholder="Filter Jenis"
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  width="auto"
                  minW="200px"
                >
                  <option value="all">Semua Jenis</option>
                  <option value="Seminar/Workshop">Seminar/Workshop</option>
                  <option value="Kompetisi">Kompetisi</option>
                  <option value="Pelatihan">Pelatihan</option>
                  <option value="Magang/Internship">Magang/Internship</option>
                  <option value="Sertifikasi">Sertifikasi</option>
                </Select>
                
                <InputGroup maxW="300px">
                  <InputLeftElement pointerEvents="none">
                    <SearchIcon color="gray.300" />
                  </InputLeftElement>
                  <Input
                    placeholder="Cari NIM, nama, atau kegiatan..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </InputGroup>
              </Flex>
              
              <Button
                leftIcon={<AddIcon />}
                colorScheme="teal"
                onClick={onAddModalOpen}
              >
                Tambah Data SKPI
              </Button>
            </Flex>

            <Card>
              <CardHeader pb={2}>
                <Heading size="md">Data SKPI Mahasiswa</Heading>
              </CardHeader>
              <CardBody>
                <Box overflowX="auto">
                  <Table variant="simple">
                    <Thead>
                      <Tr>
                        <Th>NIM</Th>
                        <Th>Nama</Th>
                        <Th>Program Studi</Th>
                        <Th>Kegiatan</Th>
                        <Th>Jenis</Th>
                        <Th>Tanggal</Th>
                        <Th>Poin</Th>
                        <Th>Status</Th>
                        <Th>Aksi</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {filteredData.map((item) => (
                        <Tr key={item.id}>
                          <Td>{item.nim}</Td>
                          <Td>{item.name}</Td>
                          <Td>{item.program}</Td>
                          <Td>{item.activity}</Td>
                          <Td>{item.type}</Td>
                          <Td>{item.date}</Td>
                          <Td isNumeric>{item.points}</Td>
                          <Td>
                            <Badge
                              colorScheme={
                                item.status === 'Approved' ? 'green' :
                                item.status === 'Pending' ? 'yellow' :
                                'red'
                              }
                            >
                              {item.status}
                            </Badge>
                          </Td>
                          <Td>
                            <HStack>
                              <IconButton
                                aria-label="Lihat detail"
                                icon={<ViewIcon />}
                                size="sm"
                                colorScheme="blue"
                                variant="ghost"
                                onClick={() => handleDetailView(item)}
                              />
                              <IconButton
                                aria-label="Edit data"
                                icon={<EditIcon />}
                                size="sm"
                                colorScheme="green"
                                variant="ghost"
                              />
                              <IconButton
                                aria-label="Hapus data"
                                icon={<DeleteIcon />}
                                size="sm"
                                colorScheme="red"
                                variant="ghost"
                              />
                            </HStack>
                          </Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                  
                  {filteredData.length === 0 && (
                    <Box textAlign="center" py={4}>
                      <Text>Tidak ada data yang sesuai dengan kriteria pencarian</Text>
                    </Box>
                  )}
                </Box>
              </CardBody>
            </Card>
          </TabPanel>

          {/* Tab Input SKPI */}
          <TabPanel>
            <Card>
              <CardHeader>
                <Heading size="md">Input Poin SKPI Mahasiswa</Heading>
              </CardHeader>
              <CardBody>
                <Stack spacing={4}>
                  <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                    <FormControl isRequired>
                      <FormLabel>NIM Mahasiswa</FormLabel>
                      <InputGroup>
                        <Input 
                          placeholder="Masukkan NIM mahasiswa" 
                          value={newActivity.nim}
                          onChange={(e) => setNewActivity({ ...newActivity, nim: e.target.value })}
                        />
                        <Button 
                          ml={2} 
                          colorScheme="blue" 
                          onClick={handleSearchStudent}
                        >
                          Cari
                        </Button>
                      </InputGroup>
                      <FormHelperText>Masukkan NIM dan klik Cari untuk mengisi data mahasiswa</FormHelperText>
                    </FormControl>
                  </SimpleGrid>
                  
                  <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                    <FormControl>
                      <FormLabel>Nama Mahasiswa</FormLabel>
                      <Input 
                        placeholder="Nama mahasiswa akan muncul otomatis" 
                        value={newActivity.name}
                        isReadOnly
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel>Program Studi</FormLabel>
                      <Input 
                        placeholder="Program studi akan muncul otomatis" 
                        value={newActivity.program}
                        isReadOnly
                      />
                    </FormControl>
                  </SimpleGrid>
                  
                  <FormControl isRequired>
                    <FormLabel>Kegiatan / Pencapaian</FormLabel>
                    <Input 
                      placeholder="Masukkan nama kegiatan atau pencapaian" 
                      value={newActivity.activity}
                      onChange={(e) => setNewActivity({ ...newActivity, activity: e.target.value })}
                    />
                  </FormControl>
                  
                  <FormControl isRequired>
                    <FormLabel>Jenis Kegiatan/Pencapaian</FormLabel>
                    <Select 
                      placeholder="Pilih jenis kegiatan/pencapaian"
                      value={newActivity.type}
                      onChange={(e) => setNewActivity({ ...newActivity, type: e.target.value })}
                    >
                      <option value="Seminar/Workshop">Seminar/Workshop</option>
                      <option value="Kompetisi">Kompetisi</option>
                      <option value="Pelatihan">Pelatihan</option>
                      <option value="Magang/Internship">Magang/Internship</option>
                      <option value="Sertifikasi">Sertifikasi</option>
                      <option value="Organisasi">Kegiatan Organisasi</option>
                    </Select>
                  </FormControl>
                  
                  <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                    <FormControl>
                      <FormLabel>Tanggal Mulai</FormLabel>
                      <Input 
                        type="date" 
                        value={newActivity.startDate}
                        onChange={(e) => setNewActivity({ ...newActivity, startDate: e.target.value })}
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel>Tanggal Selesai</FormLabel>
                      <Input 
                        type="date" 
                        value={newActivity.endDate}
                        onChange={(e) => setNewActivity({ ...newActivity, endDate: e.target.value })}
                      />
                    </FormControl>
                  </SimpleGrid>
                  
                  <FormControl>
                    <FormLabel>Deskripsi</FormLabel>
                    <Textarea 
                      placeholder="Deskripsi singkat kegiatan/pencapaian" 
                      value={newActivity.description}
                      onChange={(e) => setNewActivity({ ...newActivity, description: e.target.value })}
                    />
                  </FormControl>
                  
                  <FormControl isRequired>
                    <FormLabel>Poin SKPI</FormLabel>
                    <Input 
                      type="number" 
                      placeholder="Masukkan poin SKPI" 
                      value={newActivity.points}
                      onChange={(e) => setNewActivity({ ...newActivity, points: e.target.value })}
                    />
                    <FormHelperText>
                      Poin diberikan sesuai dengan jenis kegiatan/pencapaian, lihat panduan SKPI
                    </FormHelperText>
                  </FormControl>
                  
                  <Button 
                    colorScheme="blue" 
                    mt={2} 
                    onClick={handleSubmitActivity}
                    isDisabled={!newActivity.nim || !newActivity.activity || !newActivity.type || !newActivity.points}
                  >
                    Simpan Data SKPI
                  </Button>
                </Stack>
              </CardBody>
            </Card>
          </TabPanel>

          {/* Tab Panduan SKPI */}
          <TabPanel>
            <Card>
              <CardHeader>
                <Heading size="md">Panduan SKPI Mahasiswa</Heading>
              </CardHeader>
              <CardBody>
                <VStack align="start" spacing={4}>
                  <Text>
                    Surat Keterangan Pendamping Ijazah (SKPI) adalah dokumen yang berisi informasi tentang prestasi akademik atau capaian pembelajaran dan aktivitas mahasiswa selama masa studi.
                  </Text>
                  
                  <Heading size="sm">Kategori Kegiatan SKPI:</Heading>
                  <UnorderedList pl={4} spacing={2}>
                    <ListItem>
                      <Text fontWeight="medium">Seminar / Workshop (1-3 poin)</Text>
                      <Text fontSize="sm">
                        Mengikuti seminar atau workshop sesuai dengan bidang studi. 
                        Seminar nasional (2 poin), seminar internasional (3 poin).
                      </Text>
                    </ListItem>
                    <ListItem>
                      <Text fontWeight="medium">Kompetisi Akademik/Non-Akademik (2-10 poin)</Text>
                      <Text fontSize="sm">
                        Mengikuti kompetisi tingkat universitas (2 poin), regional (3-5 poin), 
                        nasional (5-8 poin), atau internasional (8-10 poin).
                      </Text>
                    </ListItem>
                    <ListItem>
                      <Text fontWeight="medium">Kegiatan Organisasi (1-5 poin per semester)</Text>
                      <Text fontSize="sm">
                        Berpartisipasi dalam organisasi kemahasiswaan sebagai anggota (1-2 poin) 
                        atau pengurus (3-5 poin).
                      </Text>
                    </ListItem>
                    <ListItem>
                      <Text fontWeight="medium">Magang/Internship (5-15 poin)</Text>
                      <Text fontSize="sm">
                        Magang di perusahaan/instansi selama minimal 1 bulan. 
                        Poin tergantung durasi dan relevansi dengan bidang studi.
                      </Text>
                    </ListItem>
                    <ListItem>
                      <Text fontWeight="medium">Sertifikasi Profesional (5-20 poin)</Text>
                      <Text fontSize="sm">
                        Memperoleh sertifikasi profesional sesuai bidang studi. 
                        Poin tergantung tingkat kesulitan dan pengakuan sertifikasi.
                      </Text>
                    </ListItem>
                  </UnorderedList>
                  
                  <Text>
                    Untuk memperoleh SKPI, mahasiswa harus mengumpulkan minimal 20 poin selama masa studi.
                  </Text>
                  
                  <Text>
                    Untuk panduan lengkap silahkan download buku panduan SKPI di bawah ini:
                  </Text>
                  
                  <Button 
                    leftIcon={<DownloadIcon />} 
                    colorScheme="teal" 
                    variant="outline"
                  >
                    Download Buku Panduan SKPI
                  </Button>
                </VStack>
              </CardBody>
            </Card>
          </TabPanel>
        </TabPanels>
      </Tabs>

      {/* Detail Modal */}
      {selectedStudent && (
        <Modal isOpen={isDetailModalOpen} onClose={onDetailModalClose} size="xl">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Detail SKPI Mahasiswa</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Stack spacing={4}>
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                  <FormControl>
                    <FormLabel fontWeight="bold">NIM</FormLabel>
                    <Text>{selectedStudent.nim}</Text>
                  </FormControl>
                  <FormControl>
                    <FormLabel fontWeight="bold">Nama</FormLabel>
                    <Text>{selectedStudent.name}</Text>
                  </FormControl>
                </SimpleGrid>
                
                <FormControl>
                  <FormLabel fontWeight="bold">Program Studi</FormLabel>
                  <Text>{selectedStudent.program}</Text>
                </FormControl>
                
                <FormControl>
                  <FormLabel fontWeight="bold">Kegiatan/Pencapaian</FormLabel>
                  <Text>{selectedStudent.activity}</Text>
                </FormControl>
                
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                  <FormControl>
                    <FormLabel fontWeight="bold">Jenis</FormLabel>
                    <Text>{selectedStudent.type}</Text>
                  </FormControl>
                  <FormControl>
                    <FormLabel fontWeight="bold">Tanggal</FormLabel>
                    <Text>{selectedStudent.date}</Text>
                  </FormControl>
                </SimpleGrid>
                
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                  <FormControl>
                    <FormLabel fontWeight="bold">Poin SKPI</FormLabel>
                    <Text>{selectedStudent.points}</Text>
                  </FormControl>
                  <FormControl>
                    <FormLabel fontWeight="bold">Status</FormLabel>
                    <Badge
                      colorScheme={
                        selectedStudent.status === 'Approved' ? 'green' :
                        selectedStudent.status === 'Pending' ? 'yellow' :
                        'red'
                      }
                    >
                      {selectedStudent.status}
                    </Badge>
                  </FormControl>
                </SimpleGrid>
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

      {/* Add SKPI Modal */}
      <Modal isOpen={isAddModalOpen} onClose={onAddModalClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Tambah Data SKPI</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={4}>
              <FormControl isRequired>
                <FormLabel>NIM Mahasiswa</FormLabel>
                <InputGroup>
                  <Input 
                    placeholder="Masukkan NIM mahasiswa" 
                    value={newActivity.nim}
                    onChange={(e) => setNewActivity({ ...newActivity, nim: e.target.value })}
                  />
                  <Button 
                    ml={2} 
                    colorScheme="blue" 
                    onClick={handleSearchStudent}
                  >
                    Cari
                  </Button>
                </InputGroup>
              </FormControl>
              
              <SimpleGrid columns={2} spacing={4}>
                <FormControl>
                  <FormLabel>Nama Mahasiswa</FormLabel>
                  <Input 
                    placeholder="Nama mahasiswa akan muncul otomatis" 
                    value={newActivity.name}
                    isReadOnly
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Program Studi</FormLabel>
                  <Input 
                    placeholder="Program studi akan muncul otomatis" 
                    value={newActivity.program}
                    isReadOnly
                  />
                </FormControl>
              </SimpleGrid>
              
              <FormControl isRequired>
                <FormLabel>Kegiatan / Pencapaian</FormLabel>
                <Input 
                  placeholder="Masukkan nama kegiatan atau pencapaian" 
                  value={newActivity.activity}
                  onChange={(e) => setNewActivity({ ...newActivity, activity: e.target.value })}
                />
              </FormControl>
              
              <FormControl isRequired>
                <FormLabel>Jenis Kegiatan/Pencapaian</FormLabel>
                <Select 
                  placeholder="Pilih jenis kegiatan/pencapaian"
                  value={newActivity.type}
                  onChange={(e) => setNewActivity({ ...newActivity, type: e.target.value })}
                >
                  <option value="Seminar/Workshop">Seminar/Workshop</option>
                  <option value="Kompetisi">Kompetisi</option>
                  <option value="Pelatihan">Pelatihan</option>
                  <option value="Magang/Internship">Magang/Internship</option>
                  <option value="Sertifikasi">Sertifikasi</option>
                  <option value="Organisasi">Kegiatan Organisasi</option>
                </Select>
              </FormControl>
              
              <SimpleGrid columns={2} spacing={4}>
                <FormControl>
                  <FormLabel>Tanggal Mulai</FormLabel>
                  <Input 
                    type="date" 
                    value={newActivity.startDate}
                    onChange={(e) => setNewActivity({ ...newActivity, startDate: e.target.value })}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Tanggal Selesai</FormLabel>
                  <Input 
                    type="date" 
                    value={newActivity.endDate}
                    onChange={(e) => setNewActivity({ ...newActivity, endDate: e.target.value })}
                  />
                </FormControl>
              </SimpleGrid>
              
              <FormControl>
                <FormLabel>Deskripsi</FormLabel>
                <Textarea 
                  placeholder="Deskripsi singkat kegiatan/pencapaian" 
                  value={newActivity.description}
                  onChange={(e) => setNewActivity({ ...newActivity, description: e.target.value })}
                />
              </FormControl>
              
              <FormControl isRequired>
                <FormLabel>Poin SKPI</FormLabel>
                <Input 
                  type="number" 
                  placeholder="Masukkan poin SKPI" 
                  value={newActivity.points}
                  onChange={(e) => setNewActivity({ ...newActivity, points: e.target.value })}
                />
              </FormControl>
            </Stack>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onAddModalClose}>
              Batal
            </Button>
            <Button colorScheme="blue" onClick={handleSubmitActivity}>
              Simpan
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default SKPIManagement;