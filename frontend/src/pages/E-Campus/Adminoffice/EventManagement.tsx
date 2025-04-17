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
  Stack,
  IconButton,
  Tooltip,
  VStack
} from "@chakra-ui/react";
import {
  SearchIcon,
  AddIcon,
  EditIcon,
  DeleteIcon,
  InfoIcon,
} from "@chakra-ui/icons";

// Sample data for events
const eventData = [
  { id: 1, name: 'Seminar Kecerdasan Buatan', date: '2025-04-20', location: 'Auditorium Utama', category: 'Internal', status: 'Upcoming' },
  { id: 2, name: 'Workshop Desain UI/UX', date: '2025-04-15', location: 'Lab Komputer', category: 'Mahasiswa Informatika', status: 'Existing' },
  { id: 3, name: 'Kuliah Umum Blockchain', date: '2025-04-10', location: 'Ruang 301', category: 'Internal', status: 'Existing' },
  { id: 4, name: 'Job Fair 2025', date: '2025-05-05', location: 'Gedung Serbaguna', category: 'Eksternal', status: 'Upcoming' },
  { id: 5, name: 'Konferensi Nasional Teknologi', date: '2025-04-05', location: 'Hotel Grand', category: 'Eksternal', status: 'Past' },
];

// Sample data for event history
const eventHistoryData = [
  { id: 1, name: 'Workshop UI/UX Design', date: '2025-03-15', category: 'Mahasiswa Informatika', participants: 45 },
  { id: 2, name: 'Seminar Ekonomi Digital', date: '2025-02-20', category: 'Internal', participants: 120 },
  { id: 3, name: 'Career Fair 2024', date: '2024-11-10', category: 'Eksternal', participants: 350 },
];

const EventManagement: React.FC = () => {
  const [filterEventType, setFilterEventType] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  
  const {
    isOpen: isEventModalOpen,
    onOpen: onEventModalOpen,
    onClose: onEventModalClose
  } = useDisclosure();

  const {
    isOpen: isDetailModalOpen,
    onOpen: onDetailModalOpen,
    onClose: onDetailModalClose
  } = useDisclosure();

  // Filter events based on filter and search
  const filteredEvents = eventData
    .filter(event => filterEventType === "all" || event.status === filterEventType)
    .filter(event => !searchQuery || 
      event.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const handleDetailView = (event: any) => {
    setSelectedEvent(event);
    onDetailModalOpen();
  };

  return (
    <Box p={5}>
      <Heading size="lg" mb={6}>Event Management</Heading>

      <Flex justify="space-between" mb={4}>
        <Flex>
          <Select 
            placeholder="Filter Event" 
            value={filterEventType} 
            onChange={(e) => setFilterEventType(e.target.value)}
            minW="200px"
            mr={4}
          >
            <option value="all">Semua Event</option>
            <option value="Existing">Event Existing</option>
            <option value="Upcoming">Event Upcoming</option>
            <option value="Past">Event Selesai</option>
          </Select>
          <InputGroup maxWidth="400px">
            <InputLeftElement pointerEvents="none">
              <SearchIcon color="gray.300" />
            </InputLeftElement>
            <Input 
              placeholder="Cari event..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </InputGroup>
        </Flex>
        <Button leftIcon={<AddIcon />} colorScheme="teal" onClick={onEventModalOpen}>
          Input Event Baru
        </Button>
      </Flex>

      <Card mb={6}>
        <CardHeader>
          <Heading size="md">Daftar Event</Heading>
        </CardHeader>
        <CardBody>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Nama Event</Th>
                <Th>Tanggal</Th>
                <Th>Lokasi</Th>
                <Th>Kategori</Th>
                <Th>Status</Th>
                <Th>Aksi</Th>
              </Tr>
            </Thead>
            <Tbody>
              {filteredEvents.map((event) => (
                <Tr key={event.id}>
                  <Td>{event.name}</Td>
                  <Td>{event.date}</Td>
                  <Td>{event.location}</Td>
                  <Td>{event.category}</Td>
                  <Td>
                    <Badge
                      colorScheme={
                        event.status === 'Upcoming' ? 'blue' : 
                        event.status === 'Existing' ? 'green' : 
                        'gray'
                      }
                    >
                      {event.status}
                    </Badge>
                  </Td>
                  <Td>
                    <Tooltip label="Lihat Detail">
                      <IconButton
                        aria-label="Lihat detail"
                        icon={<InfoIcon />}
                        size="sm"
                        colorScheme="blue"
                        variant="ghost"
                        mr={2}
                        onClick={() => handleDetailView(event)}
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
          {filteredEvents.length === 0 && (
            <Box textAlign="center" py={4}>
              <Text>Tidak ada event yang sesuai dengan filter atau pencarian.</Text>
            </Box>
          )}
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <Heading size="md">Histori Event Mahasiswa</Heading>
        </CardHeader>
        <CardBody>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Nama Event</Th>
                <Th>Tanggal</Th>
                <Th>Kategori</Th>
                <Th>Jumlah Peserta</Th>
                <Th>Detail</Th>
              </Tr>
            </Thead>
            <Tbody>
              {eventHistoryData.map((event) => (
                <Tr key={event.id}>
                  <Td>{event.name}</Td>
                  <Td>{event.date}</Td>
                  <Td>{event.category}</Td>
                  <Td>{event.participants}</Td>
                  <Td>
                    <IconButton
                      aria-label="Lihat detail"
                      icon={<InfoIcon />}
                      size="sm"
                      colorScheme="blue"
                      variant="ghost"
                      onClick={() => handleDetailView(event)}
                    />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </CardBody>
      </Card>

      {/* Modal for Event Input */}
      <Modal isOpen={isEventModalOpen} onClose={onEventModalClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Input Event Baru</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={4}>
              <FormControl isRequired>
                <FormLabel>Nama Event</FormLabel>
                <Input placeholder="Masukkan nama event" />
              </FormControl>
              
              <SimpleGrid columns={2} spacing={4}>
                <FormControl isRequired>
                  <FormLabel>Tanggal Event</FormLabel>
                  <Input type="date" />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Lokasi</FormLabel>
                  <Input placeholder="Masukkan lokasi event" />
                </FormControl>
              </SimpleGrid>
              
              <SimpleGrid columns={2} spacing={4}>
                <FormControl isRequired>
                  <FormLabel>Kategori</FormLabel>
                  <Select placeholder="Pilih kategori event">
                    <option value="internal">Internal</option>
                    <option value="eksternal">Eksternal</option>
                    <option value="mahasiswa">Mahasiswa Jurusan Tertentu</option>
                    <option value="ukm">UKM Tertentu</option>
                  </Select>
                </FormControl>
                <FormControl>
                  <FormLabel>Status</FormLabel>
                  <Select placeholder="Pilih status event">
                    <option value="Upcoming">Upcoming</option>
                    <option value="Existing">Existing</option>
                    <option value="Past">Past</option>
                  </Select>
                </FormControl>
              </SimpleGrid>
              
              <FormControl>
                <FormLabel>Benefit Event</FormLabel>
                <Input placeholder="Benefit yang didapat (SKPI, sertifikat, dll)" />
              </FormControl>
            </Stack>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onEventModalClose}>
              Batal
            </Button>
            <Button colorScheme="blue">Simpan</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Modal for Event Detail */}
      {selectedEvent && (
        <Modal isOpen={isDetailModalOpen} onClose={onDetailModalClose} size="xl">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Detail Event</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <VStack align="stretch" spacing={4}>
                <FormControl>
                  <FormLabel fontWeight="bold">Nama Event</FormLabel>
                  <Text>{selectedEvent.name}</Text>
                </FormControl>
                <SimpleGrid columns={2} spacing={4}>
                  <FormControl>
                    <FormLabel fontWeight="bold">Tanggal</FormLabel>
                    <Text>{selectedEvent.date}</Text>
                  </FormControl>
                  <FormControl>
                    <FormLabel fontWeight="bold">Lokasi</FormLabel>
                    <Text>{selectedEvent.location}</Text>
                  </FormControl>
                </SimpleGrid>
                <SimpleGrid columns={2} spacing={4}>
                  <FormControl>
                    <FormLabel fontWeight="bold">Kategori</FormLabel>
                    <Text>{selectedEvent.category}</Text>
                  </FormControl>
                  {selectedEvent.status && (
                    <FormControl>
                      <FormLabel fontWeight="bold">Status</FormLabel>
                      <Badge
                        colorScheme={
                          selectedEvent.status === 'Upcoming' ? 'blue' : 
                          selectedEvent.status === 'Existing' ? 'green' : 
                          'gray'
                        }
                      >
                        {selectedEvent.status}
                      </Badge>
                    </FormControl>
                  )}
                </SimpleGrid>
                {selectedEvent.participants && (
                  <FormControl>
                    <FormLabel fontWeight="bold">Jumlah Peserta</FormLabel>
                    <Text>{selectedEvent.participants} orang</Text>
                  </FormControl>
                )}
              </VStack>
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

export default EventManagement;