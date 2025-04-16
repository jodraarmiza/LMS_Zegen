import React, { useState } from "react";
import {
  Box,
  Container,
  Heading,
  Text,
  Flex,
  VStack,
  HStack,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  Select,
  Divider,
  Input,
  InputGroup,
  InputLeftElement,
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
  Progress,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  SimpleGrid,
  FormControl,
  FormLabel,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
import { DownloadIcon } from "@chakra-ui/icons";

interface BillData {
  id: string;
  description: string;
  amount: number;
  dueDate: string;
  status: "unpaid" | "partial" | "paid";
  paymentType: string;
  semester: string;
  year: string;
  paidAmount?: number;
}

interface PaymentHistoryData {
  id: string;
  billId: string;
  description: string;
  amount: number;
  date: string;
  method: string;
  reference: string;
  semester: string;
  year: string;
}

const MU_finance: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isDepositOpen,
    onOpen: onDepositOpen,
    onClose: onDepositClose,
  } = useDisclosure();
  const [selectedBill, setSelectedBill] = useState<BillData | null>(null);
  const [paymentAmount, setPaymentAmount] = useState<number>(0);
  const [depositAmount, setDepositAmount] = useState<number>(0);
  const [selectedYear, setSelectedYear] = useState<string>("All");
  const [selectedSemester, setSelectedSemester] = useState<string>("All");
  const [selectedPaymentType, setSelectedPaymentType] = useState<string>("All");
  const [walletBalance, setWalletBalance] = useState<number>(2500000);

  // Sample bills data
  const billsData: BillData[] = [
    {
      id: "BILL-2025-001",
      description: "Tuition Fee - Semester 3",
      amount: 12500000,
      dueDate: "Apr 15, 2025",
      status: "unpaid",
      paymentType: "Tuition",
      semester: "3",
      year: "2024/2025",
    },
    {
      id: "BILL-2025-002",
      description: "Library Fee",
      amount: 500000,
      dueDate: "Apr 20, 2025",
      status: "paid",
      paymentType: "Facility",
      semester: "3",
      year: "2024/2025",
    },
    {
      id: "BILL-2025-003",
      description: "Laboratory Fee",
      amount: 1000000,
      dueDate: "Apr 25, 2025",
      status: "partial",
      paidAmount: 500000,
      paymentType: "Facility",
      semester: "3",
      year: "2024/2025",
    },
    {
      id: "BILL-2024-001",
      description: "Tuition Fee - Semester 2",
      amount: 12500000,
      dueDate: "Oct 15, 2024",
      status: "paid",
      paymentType: "Tuition",
      semester: "2",
      year: "2023/2024",
    },
    {
      id: "BILL-2024-002",
      description: "Development Fee",
      amount: 2000000,
      dueDate: "Oct 20, 2024",
      status: "paid",
      paymentType: "Facility",
      semester: "2",
      year: "2023/2024",
    },
    {
      id: "BILL-2024-003",
      description: "Exam Fee",
      amount: 750000,
      dueDate: "Nov 10, 2024",
      status: "paid",
      paymentType: "Academic",
      semester: "2",
      year: "2023/2024",
    },
  ];

  // Sample payment history
  const paymentHistoryData: PaymentHistoryData[] = [
    {
      id: "PAY-2025-001",
      billId: "BILL-2025-002",
      description: "Library Fee Payment",
      amount: 500000,
      date: "Apr 10, 2025",
      method: "Bank Transfer",
      reference: "TRF12345678",
      semester: "3",
      year: "2024/2025",
    },
    {
      id: "PAY-2025-002",
      billId: "BILL-2025-003",
      description: "Laboratory Fee Partial Payment",
      amount: 500000,
      date: "Apr 12, 2025",
      method: "Wallet",
      reference: "WAL87654321",
      semester: "3",
      year: "2024/2025",
    },
    {
      id: "PAY-2024-001",
      billId: "BILL-2024-001",
      description: "Tuition Fee Payment",
      amount: 12500000,
      date: "Oct 10, 2024",
      method: "Bank Transfer",
      reference: "TRF98765432",
      semester: "2",
      year: "2023/2024",
    },
    {
      id: "PAY-2024-002",
      billId: "BILL-2024-002",
      description: "Development Fee Payment",
      amount: 2000000,
      date: "Oct 15, 2024",
      method: "Wallet",
      reference: "WAL23456789",
      semester: "2",
      year: "2023/2024",
    },
    {
      id: "PAY-2024-003",
      billId: "BILL-2024-003",
      description: "Exam Fee Payment",
      amount: 750000,
      date: "Nov 5, 2024",
      method: "Wallet",
      reference: "WAL34567890",
      semester: "2",
      year: "2023/2024",
    },
  ];

  // Filter bills based on selections
  const filteredBills = billsData.filter((bill) => {
    if (selectedYear !== "All" && bill.year !== selectedYear) return false;
    if (selectedSemester !== "All" && bill.semester !== selectedSemester) return false;
    if (selectedPaymentType !== "All" && bill.paymentType !== selectedPaymentType) return false;
    return true;
  });

  // Filter payment history based on selections
  const filteredPaymentHistory = paymentHistoryData.filter((payment) => {
    if (selectedYear !== "All" && payment.year !== selectedYear) return false;
    if (selectedSemester !== "All" && payment.semester !== selectedSemester) return false;
    return true;
  });

  // Upcoming bills (unpaid or partial)
  const upcomingBills = filteredBills.filter(
    (bill) => bill.status === "unpaid" || bill.status === "partial"
  );

  // Payment history
  const paymentHistory = filteredPaymentHistory;

  const openPaymentModal = (bill: BillData) => {
    setSelectedBill(bill);
    setPaymentAmount(
      bill.status === "partial" 
        ? bill.amount - (bill.paidAmount || 0) 
        : bill.amount
    );
    onOpen();
  };

  const handlePayment = () => {
    if (!selectedBill) return;

    if (paymentAmount <= 0) {
      alert("Payment amount must be greater than 0");
      return;
    }

    const remainingAmount = 
      selectedBill.status === "partial" 
        ? selectedBill.amount - (selectedBill.paidAmount || 0) 
        : selectedBill.amount;

    if (paymentAmount > remainingAmount) {
      alert("Payment amount cannot exceed the remaining balance");
      return;
    }

    if (paymentAmount > walletBalance) {
      alert("Your wallet balance is insufficient for this payment");
      return;
    }

    // Update wallet balance
    setWalletBalance(walletBalance - paymentAmount);

    alert(`Payment successful! You have paid Rp ${paymentAmount.toLocaleString()} for ${selectedBill.description}`);

    // Close the modal
    onClose();
  };

  const handleDeposit = () => {
    if (depositAmount <= 0) {
      alert("Deposit amount must be greater than 0");
      return;
    }

    // Update wallet balance
    setWalletBalance(walletBalance + depositAmount);

    alert(`Deposit successful! You have added Rp ${depositAmount.toLocaleString()} to your wallet`);

    // Reset deposit amount
    setDepositAmount(0);
    onDepositClose();
  };

  const handleExportInvoice = (billId: string) => {
    alert("Invoice has been downloaded to your device");
  };

  const formatCurrency = (amount: number) => {
    return `Rp ${amount.toLocaleString()}`;
  };

  const getStatusBadge = (status: string) => {
    let color;
    switch (status) {
      case "paid":
        color = "green";
        break;
      case "partial":
        color = "yellow";
        break;
      case "unpaid":
        color = "red";
        break;
      default:
        color = "gray";
    }
    
    return (
      <Badge colorScheme={color} borderRadius="full" px={2}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  // Calculate total paid and unpaid
  const totalPaid = paymentHistoryData.reduce((sum, payment) => sum + payment.amount, 0);
  const totalUnpaid = billsData
    .filter(bill => bill.status === "unpaid" || bill.status === "partial")
    .reduce((sum, bill) => {
      if (bill.status === "unpaid") {
        return sum + bill.amount;
      } else {
        return sum + (bill.amount - (bill.paidAmount || 0));
      }
    }, 0);

  return (
    <Container maxW="container.xl" py={8}>
      <Box mb={6}>
        <Heading size="lg" mb={2}>
          Financial Management
        </Heading>
        <Text color="gray.600">
          View and manage your financial transactions, bills, and payments
        </Text>
      </Box>

      {/* Financial Summary */}
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6} mb={8}>
        <Box
          bg="white"
          p={5}
          borderRadius="lg"
          boxShadow="sm"
          borderWidth="1px"
          borderColor="gray.200"
        >
          <Stat>
            <StatLabel fontSize="sm" color="gray.500">Wallet Balance</StatLabel>
            <StatNumber fontSize="2xl" fontWeight="bold" color="blue.600">
              {formatCurrency(walletBalance)}
            </StatNumber>
            <HStack mt={4} spacing={2}>
              <Button 
                size="sm" 
                colorScheme="blue" 
                onClick={onDepositOpen} 
                flex={1}
              >
                Deposit
              </Button>
            </HStack>
          </Stat>
        </Box>
        
        <Box
          bg="white"
          p={5}
          borderRadius="lg"
          boxShadow="sm"
          borderWidth="1px"
          borderColor="gray.200"
        >
          <Stat>
            <StatLabel fontSize="sm" color="gray.500">Total Paid (This Year)</StatLabel>
            <StatNumber fontSize="2xl" fontWeight="bold" color="green.600">
              {formatCurrency(totalPaid)}
            </StatNumber>
            <StatHelpText>
              <StatArrow type="increase" />
              Complete
            </StatHelpText>
          </Stat>
        </Box>
        
        <Box
          bg="white"
          p={5}
          borderRadius="lg"
          boxShadow="sm"
          borderWidth="1px"
          borderColor="gray.200"
        >
          <Stat>
            <StatLabel fontSize="sm" color="gray.500">Remaining Payments</StatLabel>
            <StatNumber fontSize="2xl" fontWeight="bold" color="red.600">
              {formatCurrency(totalUnpaid)}
            </StatNumber>
            <StatHelpText>
              <StatArrow type="decrease" />
              Pending
            </StatHelpText>
          </Stat>
        </Box>
      </SimpleGrid>

      {/* Filters */}
      <Box 
        mb={6} 
        p={4} 
        bg="white" 
        borderRadius="lg" 
        boxShadow="sm"
        borderWidth="1px"
        borderColor="gray.200"
      >
        <Text fontWeight="medium" mb={3}>Filter Options</Text>
        <Flex 
          direction={{ base: "column", md: "row" }} 
          gap={{ base: 3, md: 6 }}
        >
          <FormControl>
            <FormLabel fontSize="sm">Academic Year</FormLabel>
            <Select 
              value={selectedYear} 
              onChange={(e) => setSelectedYear(e.target.value)}
              size="sm"
            >
              <option value="All">All Years</option>
              <option value="2024/2025">2024/2025</option>
              <option value="2023/2024">2023/2024</option>
              <option value="2022/2023">2022/2023</option>
            </Select>
          </FormControl>
          
          <FormControl>
            <FormLabel fontSize="sm">Semester</FormLabel>
            <Select 
              value={selectedSemester} 
              onChange={(e) => setSelectedSemester(e.target.value)}
              size="sm"
            >
              <option value="All">All Semesters</option>
              <option value="1">Semester 1</option>
              <option value="2">Semester 2</option>
              <option value="3">Semester 3</option>
              <option value="4">Semester 4</option>
              <option value="5">Semester 5</option>
              <option value="6">Semester 6</option>
              <option value="7">Semester 7</option>
              <option value="8">Semester 8</option>
            </Select>
          </FormControl>
          
          <FormControl>
            <FormLabel fontSize="sm">Payment Type</FormLabel>
            <Select 
              value={selectedPaymentType} 
              onChange={(e) => setSelectedPaymentType(e.target.value)}
              size="sm"
            >
              <option value="All">All Types</option>
              <option value="Tuition">Tuition</option>
              <option value="Facility">Facility</option>
              <option value="Academic">Academic</option>
              <option value="Other">Other</option>
            </Select>
          </FormControl>
        </Flex>
      </Box>

      <Tabs colorScheme="blue" bg="white" borderRadius="lg" boxShadow="sm">
        <TabList>
          <Tab>Upcoming Bills</Tab>
          <Tab>Payment History</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <Box overflowX="auto">
              <Table variant="simple" size="sm">
                <Thead>
                  <Tr>
                    <Th>Bill ID</Th>
                    <Th>Description</Th>
                    <Th>Amount</Th>
                    <Th>Due Date</Th>
                    <Th>Status</Th>
                    <Th>Action</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {upcomingBills.length > 0 ? (
                    upcomingBills.map((bill) => (
                      <Tr key={bill.id}>
                        <Td fontWeight="medium">{bill.id}</Td>
                        <Td>{bill.description}</Td>
                        <Td>
                          {bill.status === "partial" ? (
                            <>
                              <Text>{formatCurrency(bill.amount)}</Text>
                              <Text fontSize="xs" color="green.500">
                                Paid: {formatCurrency(bill.paidAmount || 0)}
                              </Text>
                              <Text fontSize="xs" color="red.500">
                                Remaining: {formatCurrency(bill.amount - (bill.paidAmount || 0))}
                              </Text>
                            </>
                          ) : (
                            formatCurrency(bill.amount)
                          )}
                        </Td>
                        <Td>{bill.dueDate}</Td>
                        <Td>{getStatusBadge(bill.status)}</Td>
                        <Td>
                          <HStack spacing={2}>
                            <Button
                              size="xs"
                              colorScheme="blue"
                              onClick={() => openPaymentModal(bill)}
                            >
                              Pay
                            </Button>
                          </HStack>
                        </Td>
                      </Tr>
                    ))
                  ) : (
                    <Tr>
                      <Td colSpan={6} textAlign="center" py={4}>
                        No upcoming bills matching your filters
                      </Td>
                    </Tr>
                  )}
                </Tbody>
              </Table>
            </Box>
          </TabPanel>

          <TabPanel>
            <Box overflowX="auto">
              <Table variant="simple" size="sm">
                <Thead>
                  <Tr>
                    <Th>Payment ID</Th>
                    <Th>Description</Th>
                    <Th>Amount</Th>
                    <Th>Date</Th>
                    <Th>Method</Th>
                    <Th>Action</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {paymentHistory.length > 0 ? (
                    paymentHistory.map((payment) => (
                      <Tr key={payment.id}>
                        <Td fontWeight="medium">{payment.id}</Td>
                        <Td>{payment.description}</Td>
                        <Td>{formatCurrency(payment.amount)}</Td>
                        <Td>{payment.date}</Td>
                        <Td>{payment.method}</Td>
                        <Td>
                          <Button
                            size="xs"
                            leftIcon={<DownloadIcon />}
                            colorScheme="green"
                            variant="outline"
                            onClick={() => handleExportInvoice(payment.billId)}
                          >
                            Invoice
                          </Button>
                        </Td>
                      </Tr>
                    ))
                  ) : (
                    <Tr>
                      <Td colSpan={6} textAlign="center" py={4}>
                        No payment history matching your filters
                      </Td>
                    </Tr>
                  )}
                </Tbody>
              </Table>
            </Box>
          </TabPanel>
        </TabPanels>
      </Tabs>

      {/* Payment Modal */}
      {selectedBill && (
        <Modal isOpen={isOpen} onClose={onClose} size="md">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Make a Payment</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <VStack spacing={4} align="stretch">
                <Box borderWidth="1px" borderRadius="md" p={3} bg="gray.50">
                  <Text fontSize="sm" color="gray.500">Bill Description</Text>
                  <Text fontWeight="medium">{selectedBill.description}</Text>
                </Box>
                
                <Box borderWidth="1px" borderRadius="md" p={3} bg="gray.50">
                  <Text fontSize="sm" color="gray.500">Total Amount</Text>
                  <Text fontWeight="medium">{formatCurrency(selectedBill.amount)}</Text>
                  
                  {selectedBill.status === "partial" && (
                    <>
                      <Text fontSize="sm" color="gray.500" mt={2}>Already Paid</Text>
                      <Text fontWeight="medium" color="green.500">
                        {formatCurrency(selectedBill.paidAmount || 0)}
                      </Text>
                      
                      <Text fontSize="sm" color="gray.500" mt={2}>Remaining Balance</Text>
                      <Text fontWeight="medium" color="red.500">
                        {formatCurrency(selectedBill.amount - (selectedBill.paidAmount || 0))}
                      </Text>
                    </>
                  )}
                </Box>
                
                <FormControl>
                  <FormLabel>Payment Amount</FormLabel>
                  <NumberInput
                    value={paymentAmount}
                    onChange={(_, value) => setPaymentAmount(value)}
                    max={selectedBill.status === "partial" ? selectedBill.amount - (selectedBill.paidAmount || 0) : selectedBill.amount}
                    min={0}
                  >
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </FormControl>
                
                <Box borderWidth="1px" borderRadius="md" p={3} bg="blue.50">
                  <Text fontSize="sm" color="blue.700">Your Wallet Balance</Text>
                  <Text fontWeight="bold" color="blue.700">
                    {formatCurrency(walletBalance)}
                  </Text>
                </Box>
                
                {paymentAmount > walletBalance && (
                  <Box borderWidth="1px" borderRadius="md" p={3} bg="red.50">
                    <Text fontSize="sm" color="red.600" fontWeight="medium">
                      Warning: Your wallet balance is insufficient for this payment
                    </Text>
                  </Box>
                )}
              </VStack>
            </ModalBody>

            <ModalFooter>
              <Button variant="ghost" mr={3} onClick={onClose}>
                Cancel
              </Button>
              <Button 
                colorScheme="blue" 
                onClick={handlePayment}
                isDisabled={paymentAmount <= 0 || paymentAmount > walletBalance}
              >
                Pay Now
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}

      {/* Deposit Modal */}
      <Modal isOpen={isDepositOpen} onClose={onDepositClose} size="md">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Deposit to Wallet</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4} align="stretch">
              <Box borderWidth="1px" borderRadius="md" p={3} bg="blue.50">
                <Text fontSize="sm" color="blue.700">Current Wallet Balance</Text>
                <Text fontWeight="bold" color="blue.700">
                  {formatCurrency(walletBalance)}
                </Text>
              </Box>
              
              <FormControl>
                <FormLabel>Deposit Amount</FormLabel>
                <NumberInput
                  value={depositAmount}
                  onChange={(_, value) => setDepositAmount(value)}
                  min={0}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>
              
              <Box borderWidth="1px" borderRadius="md" p={3}>
                <Text fontSize="sm" fontWeight="medium" mb={2}>Payment Method</Text>
                <Select defaultValue="bank">
                  <option value="bank">Bank Transfer (BCA)</option>
                  <option value="va">Virtual Account (Mandiri)</option>
                  <option value="card">Credit/Debit Card</option>
                  <option value="ewallet">E-Wallet (OVO, GoPay, Dana)</option>
                </Select>
              </Box>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onDepositClose}>
              Cancel
            </Button>
            <Button 
              colorScheme="blue" 
              onClick={handleDeposit}
              isDisabled={depositAmount <= 0}
            >
              Deposit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default MU_finance;