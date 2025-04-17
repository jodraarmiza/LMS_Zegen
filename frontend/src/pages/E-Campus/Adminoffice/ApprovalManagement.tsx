import React, { useState } from "react";
import {
  Box,
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
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
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
  VStack,
  SimpleGrid,
  Textarea,
  IconButton,
  Tooltip,
  useToast
} from "@chakra-ui/react";
import {
  ViewIcon,
  CheckIcon,
  CloseIcon,
  DownloadIcon
} from "@chakra-ui/icons";

// Sample data for approvals
const approvalData = [
  { id: 1, requester: 'Dr. Ahmad Fauzi', type: 'Surat Penggunaan Lab', status: 'Submitted', date: '2025-04-10' },
  { id: 2, requester: 'Budi Santoso', type: 'Surat Keterangan Aktif', status: 'In Process', date: '2025-04-12' },
  { id: 3, requester: 'Dr. Sarah Wijaya', type: 'Surat Peminjaman Ruangan', status: 'Submitted', date: '2025-04-13' },
  { id: 4, requester: 'Dewi Anggraini', type: 'Surat Keterangan Cuti', status: 'In Process', date: '2025-04-14' },
  { id: 5, requester: 'Prof. Hendro', type: 'Surat Rekomendasi Penelitian', status: 'Submitted', date: '2025-04-15' },
];

const approvedRequestsData = [
  { id: 6, requester: 'Dr. Linda Kusuma', type: 'Surat Rekomendasi Seminar', status: 'Approved', date: '2025-04-05', approvalDate: '2025-04-06' },
  { id: 7, requester: 'Rudi Hartono', type: 'Surat Keterangan Aktif', status: 'Approved', date: '2025-04-02', approvalDate: '2025-04-03' },
];

const rejectedRequestsData = [
  { id: 8, requester: 'Andi Wijaya', type: 'Surat Izin Penelitian', status: 'Rejected', date: '2025-04-01', rejectionDate: '2025-04-02', reason: 'Dokumen pendukung tidak lengkap' },
  { id: 9, requester: 'Siti Nurhaliza', type: 'Surat Rekomendasi Magang', status: 'Rejected', date: '2025-03-30', rejectionDate: '2025-03-31', reason: 'Format surat tidak sesuai' },
];

const ApprovalManagement: React.FC = () => {
  const [selectedRequest, setSelectedRequest] = useState<any>(null);
  const [rejectionReason, setRejectionReason] = useState("");
  const toast = useToast();
  
  const {
    isOpen: isDetailModalOpen,
    onOpen: onDetailModalOpen,
    onClose: onDetailModalClose
  } = useDisclosure();
  
  const {
    isOpen: isRejectModalOpen,
    onOpen: onRejectModalOpen,
    onClose: onRejectModalClose
  } = useDisclosure();

  const handleViewDetail = (request: any) => {
    setSelectedRequest(request);
    onDetailModalOpen();
  };
  
  const handleApprove = (request: any) => {
    toast({
      title: "Permintaan disetujui",
      description: `Permintaan ${request.type} dari ${request.requester} telah disetujui.`,
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };
  
  const openRejectModal = (request: any) => {
    setSelectedRequest(request);
    setRejectionReason("");
    onRejectModalOpen();
  };
  
  const handleReject = () => {
    if (!rejectionReason.trim()) {
      toast({
        title: "Error",
        description: "Alasan penolakan harus diisi.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    
    toast({
      title: "Permintaan ditolak",
      description: `Permintaan ${selectedRequest?.type} dari ${selectedRequest?.requester} telah ditolak.`,
      status: "info",
      duration: 3000,
      isClosable: true,
    });
    
    onRejectModalClose();
  };

  return (
    <Box p={5}>
      <Heading size="lg" mb={6}>Approval Management</Heading>

      <Tabs variant="soft-rounded" colorScheme="green" isLazy>
        <TabList mb={4}>
          <Tab>Submitted</Tab>
          <Tab>In Process</Tab>
          <Tab>Approved</Tab>
          <Tab>Rejected</Tab>
        </TabList>
        <TabPanels>
          <TabPanel p={0}>
            <Card>
              <CardHeader>
                <Heading size="md">Permintaan Surat Penugasan</Heading>
              </CardHeader>
              <CardBody>
                <Table variant="simple">
                  <Thead>
                    <Tr>
                      <Th>Pemohon</Th>
                      <Th>Jenis Surat</Th>
                      <Th>Tanggal Pengajuan</Th>
                      <Th>Aksi</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {approvalData
                      .filter(item => item.status === "Submitted")
                      .map((item) => (
                        <Tr key={item.id}>
                          <Td>{item.requester}</Td>
                          <Td>{item.type}</Td>
                          <Td>{item.date}</Td>
                          <Td>
                            <Tooltip label="Review Detail">
                              <Button 
                                size="sm" 
                                colorScheme="blue" 
                                variant="ghost" 
                                mr={2}
                                onClick={() => handleViewDetail(item)}
                              >
                                <ViewIcon mr={1} /> Review
                              </Button>
                            </Tooltip>
                            <Tooltip label="Setujui">
                              <Button 
                                size="sm" 
                                colorScheme="green" 
                                variant="solid" 
                                mr={2}
                                onClick={() => handleApprove(item)}
                              >
                                <CheckIcon mr={1} /> Approve
                              </Button>
                            </Tooltip>
                            <Tooltip label="Tolak">
                              <Button 
                                size="sm" 
                                colorScheme="red" 
                                variant="solid"
                                onClick={() => openRejectModal(item)}
                              >
                                <CloseIcon mr={1} /> Reject
                              </Button>
                            </Tooltip>
                          </Td>
                        </Tr>
                      ))}
                  </Tbody>
                </Table>
                {approvalData.filter(item => item.status === "Submitted").length === 0 && (
                  <Box textAlign="center" py={4}>
                    <Text>Tidak ada permintaan yang menunggu persetujuan.</Text>
                  </Box>
                )}
              </CardBody>
            </Card>
          </TabPanel>
          
          <TabPanel p={0}>
            <Card>
              <CardHeader>
                <Heading size="md">Permintaan Dalam Proses</Heading>
              </CardHeader>
              <CardBody>
                <Table variant="simple">
                  <Thead>
                    <Tr>
                      <Th>Pemohon</Th>
                      <Th>Jenis Surat</Th>
                      <Th>Tanggal Pengajuan</Th>
                      <Th>Status</Th>
                      <Th>Aksi</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {approvalData
                      .filter(item => item.status === "In Process")
                      .map((item) => (
                        <Tr key={item.id}>
                          <Td>{item.requester}</Td>
                          <Td>{item.type}</Td>
                          <Td>{item.date}</Td>
                          <Td><Badge colorScheme="yellow">In Process</Badge></Td>
                          <Td>
                            <Tooltip label="Lihat Detail">
                              <Button 
                                size="sm" 
                                colorScheme="blue" 
                                variant="ghost"
                                onClick={() => handleViewDetail(item)}
                              >
                                <ViewIcon mr={1} /> Detail
                              </Button>
                            </Tooltip>
                          </Td>
                        </Tr>
                      ))}
                  </Tbody>
                </Table>
                {approvalData.filter(item => item.status === "In Process").length === 0 && (
                  <Box textAlign="center" py={4}>
                    <Text>Tidak ada permintaan yang sedang diproses.</Text>
                  </Box>
                )}
              </CardBody>
            </Card>
          </TabPanel>
          
          <TabPanel p={0}>
            <Card>
              <CardHeader>
                <Heading size="md">Permintaan Disetujui</Heading>
              </CardHeader>
              <CardBody>
                <Table variant="simple">
                  <Thead>
                    <Tr>
                      <Th>Pemohon</Th>
                      <Th>Jenis Surat</Th>
                      <Th>Tanggal Pengajuan</Th>
                      <Th>Tanggal Persetujuan</Th>
                      <Th>Aksi</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {approvedRequestsData.map((item) => (
                      <Tr key={item.id}>
                        <Td>{item.requester}</Td>
                        <Td>{item.type}</Td>
                        <Td>{item.date}</Td>
                        <Td>{item.approvalDate}</Td>
                        <Td>
                          <HStack spacing={2}>
                            <Tooltip label="Lihat Detail">
                              <IconButton
                                aria-label="Lihat detail"
                                icon={<ViewIcon />}
                                size="sm"
                                colorScheme="blue"
                                variant="ghost"
                                onClick={() => handleViewDetail(item)}
                              />
                            </Tooltip>
                            <Tooltip label="Download">
                              <IconButton
                                aria-label="Download"
                                icon={<DownloadIcon />}
                                size="sm"
                                colorScheme="green"
                                variant="ghost"
                              />
                            </Tooltip>
                          </HStack>
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
                {approvedRequestsData.length === 0 && (
                  <Box textAlign="center" py={4}>
                    <Text>Tidak ada permintaan yang telah disetujui.</Text>
                  </Box>
                )}
              </CardBody>
            </Card>
          </TabPanel>
          
          <TabPanel p={0}>
            <Card>
              <CardHeader>
                <Heading size="md">Permintaan Ditolak</Heading>
              </CardHeader>
              <CardBody>
                <Table variant="simple">
                  <Thead>
                    <Tr>
                      <Th>Pemohon</Th>
                      <Th>Jenis Surat</Th>
                      <Th>Tanggal Pengajuan</Th>
                      <Th>Tanggal Penolakan</Th>
                      <Th>Alasan</Th>
                      <Th>Aksi</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {rejectedRequestsData.map((item) => (
                      <Tr key={item.id}>
                        <Td>{item.requester}</Td>
                        <Td>{item.type}</Td>
                        <Td>{item.date}</Td>
                        <Td>{item.rejectionDate}</Td>
                        <Td>{item.reason}</Td>
                        <Td>
                          <Tooltip label="Lihat Detail">
                            <Button 
                              size="sm" 
                              colorScheme="blue" 
                              variant="ghost"
                              onClick={() => handleViewDetail(item)}
                            >
                              <ViewIcon mr={1} /> Detail
                            </Button>
                          </Tooltip>
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
                {rejectedRequestsData.length === 0 && (
                  <Box textAlign="center" py={4}>
                    <Text>Tidak ada permintaan yang telah ditolak.</Text>
                  </Box>
                )}
              </CardBody>
            </Card>
          </TabPanel>
        </TabPanels>
      </Tabs>

      {/* Detail Modal */}
      {selectedRequest && (
        <Modal isOpen={isDetailModalOpen} onClose={onDetailModalClose} size="xl">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Detail Permintaan Surat</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <VStack align="stretch" spacing={4}>
                <FormControl>
                  <FormLabel fontWeight="bold">Pemohon</FormLabel>
                  <Text>{selectedRequest.requester}</Text>
                </FormControl>
                <FormControl>
                  <FormLabel fontWeight="bold">Jenis Surat</FormLabel>
                  <Text>{selectedRequest.type}</Text>
                </FormControl>
                <SimpleGrid columns={2} spacing={4}>
                  <FormControl>
                    <FormLabel fontWeight="bold">Tanggal Pengajuan</FormLabel>
                    <Text>{selectedRequest.date}</Text>
                  </FormControl>
                  <FormControl>
                    <FormLabel fontWeight="bold">Status</FormLabel>
                    <Badge
                      colorScheme={
                        selectedRequest.status === 'Submitted' ? 'yellow' : 
                        selectedRequest.status === 'In Process' ? 'blue' : 
                        selectedRequest.status === 'Approved' ? 'green' : 
                        'red'
                      }
                    >
                      {selectedRequest.status}
                    </Badge>
                  </FormControl>
                </SimpleGrid>
                {selectedRequest.reason && (
                  <FormControl>
                    <FormLabel fontWeight="bold">Alasan Penolakan</FormLabel>
                    <Text>{selectedRequest.reason}</Text>
                  </FormControl>
                )}
                <FormControl>
                  <FormLabel fontWeight="bold">Isi Surat</FormLabel>
                  <Box p={3} borderWidth="1px" borderRadius="md" bg="gray.50">
                    <Text>
                      Dengan hormat,<br /><br />
                      Saya yang bertanda tangan di bawah ini:<br />
                      Nama: {selectedRequest.requester}<br />
                      mengajukan permohonan {selectedRequest.type} dengan tujuan untuk keperluan administratif.
                      <br /><br />
                      Demikian permohonan ini saya sampaikan. Atas perhatian dan kerjasamanya saya ucapkan terima kasih.
                    </Text>
                  </Box>
                </FormControl>
              </VStack>
            </ModalBody>
            <ModalFooter>
              <Button variant="ghost" mr={3} onClick={onDetailModalClose}>
                Tutup
              </Button>
              {selectedRequest.status === 'Submitted' && (
                <>
                  <Button 
                    colorScheme="red" 
                    variant="outline" 
                    mr={3}
                    onClick={() => {
                      onDetailModalClose();
                      openRejectModal(selectedRequest);
                    }}
                  >
                    <CloseIcon mr={2} /> Tolak
                  </Button>
                  <Button 
                    colorScheme="green"
                    onClick={() => {
                      handleApprove(selectedRequest);
                      onDetailModalClose();
                    }}
                  >
                    <CheckIcon mr={2} /> Setujui
                  </Button>
                </>
              )}
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}

      {/* Reject Modal */}
      <Modal isOpen={isRejectModalOpen} onClose={onRejectModalClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Tolak Permintaan</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack align="stretch" spacing={4}>
              <Text>Anda akan menolak permintaan {selectedRequest?.type} dari {selectedRequest?.requester}.</Text>
              <FormControl isRequired>
                <FormLabel>Alasan Penolakan</FormLabel>
                <Textarea 
                  placeholder="Masukkan alasan penolakan" 
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                />
              </FormControl>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onRejectModalClose}>
              Batal
            </Button>
            <Button colorScheme="red" onClick={handleReject}>
              Tolak Permintaan
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ApprovalManagement;