import React, { useState } from "react";
import {
  Box,
  Flex,
  Text,
  Grid,
  GridItem,
  Heading,
  Button,
  Card,
  CardHeader,
  CardBody,
  Stack,
  StackDivider,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  SimpleGrid
} from "@chakra-ui/react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

// Sample data for charts
const facultyProgramData = [
  { name: 'Komputer', programCount: 4 },
  { name: 'Ekonomi', programCount: 6 },
  { name: 'Pendidikan', programCount: 5 },
  { name: 'Kedokteran', programCount: 3 },
  { name: 'Hukum', programCount: 2 },
];

const lecturerData = [
  { name: 'Komputer', lecturerCount: 28 },
  { name: 'Ekonomi', lecturerCount: 35 },
  { name: 'Pendidikan', lecturerCount: 30 },
  { name: 'Kedokteran', lecturerCount: 42 },
  { name: 'Hukum', lecturerCount: 18 },
];

const activityData = [
  { name: 'Jan', dosen: 65, mahasiswa: 120 },
  { name: 'Feb', dosen: 59, mahasiswa: 110 },
  { name: 'Mar', dosen: 80, mahasiswa: 145 },
  { name: 'Apr', dosen: 81, mahasiswa: 142 },
  { name: 'Mei', dosen: 76, mahasiswa: 135 },
  { name: 'Jun', dosen: 85, mahasiswa: 150 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

// Sample data for tables
const fakultasData = [
  { id: 1, name: 'Fakultas Ilmu Komputer', programs: 4, students: 850 },
  { id: 2, name: 'Fakultas Ekonomi dan Bisnis', programs: 6, students: 1200 },
  { id: 3, name: 'Fakultas Pendidikan', programs: 5, students: 950 },
  { id: 4, name: 'Fakultas Kedokteran', programs: 3, students: 600 },
  { id: 5, name: 'Fakultas Hukum', programs: 2, students: 450 },
];

const programData = [
  { id: 1, name: 'Teknik Informatika', faculty: 'Fakultas Ilmu Komputer', students: 300, lecturers: 15 },
  { id: 2, name: 'Sistem Informasi', faculty: 'Fakultas Ilmu Komputer', students: 250, lecturers: 12 },
  { id: 3, name: 'Manajemen', faculty: 'Fakultas Ekonomi dan Bisnis', students: 280, lecturers: 14 },
  { id: 4, name: 'Akuntansi', faculty: 'Fakultas Ekonomi dan Bisnis', students: 260, lecturers: 13 },
  { id: 5, name: 'Kedokteran Umum', faculty: 'Fakultas Kedokteran', students: 200, lecturers: 25 },
];

const AdminOfficeDashboard: React.FC = () => {
  return (
    <Box p={5}>
      <Heading size="lg" mb={6}>Admin Office Dashboard</Heading>

      {/* Stats Cards */}
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6} mb={8}>
        <Stat
          px={4}
          py={3}
          shadow="md"
          border="1px"
          borderColor="gray.200"
          rounded="lg"
          bg="white"
        >
          <StatLabel fontWeight="medium">Total Fakultas</StatLabel>
          <StatNumber>{fakultasData.length}</StatNumber>
          <StatHelpText>Jumlah Fakultas Aktif</StatHelpText>
        </Stat>
        <Stat
          px={4}
          py={3}
          shadow="md"
          border="1px"
          borderColor="gray.200"
          rounded="lg"
          bg="white"
        >
          <StatLabel fontWeight="medium">Total Program Studi</StatLabel>
          <StatNumber>{programData.length}</StatNumber>
          <StatHelpText>Jumlah Program Studi Aktif</StatHelpText>
        </Stat>
        <Stat
          px={4}
          py={3}
          shadow="md"
          border="1px"
          borderColor="gray.200"
          rounded="lg"
          bg="white"
        >
          <StatLabel fontWeight="medium">Total Dosen</StatLabel>
          <StatNumber>65</StatNumber>
          <StatHelpText>Jumlah Dosen Aktif</StatHelpText>
        </Stat>
      </SimpleGrid>

      <Grid templateColumns={{ base: "1fr", lg: "2fr 1fr" }} gap={6}>
        {/* Charts Section */}
        <GridItem>
          <Grid templateRows="repeat(3, 1fr)" gap={6}>
            {/* Perbandingan Jumlah Program Studi */}
            <Card>
              <CardHeader>
                <Heading size="md">Perbandingan Jumlah Program Studi</Heading>
              </CardHeader>
              <CardBody>
                <Box height="250px">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={facultyProgramData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <RechartsTooltip />
                      <Legend />
                      <Bar dataKey="programCount" fill="#8884d8" name="Jumlah Program Studi" />
                    </BarChart>
                  </ResponsiveContainer>
                </Box>
              </CardBody>
            </Card>

            {/* Perbandingan Jumlah Dosen */}
            <Card>
              <CardHeader>
                <Heading size="md">Perbandingan Jumlah Dosen</Heading>
              </CardHeader>
              <CardBody>
                <Box height="250px">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={lecturerData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <RechartsTooltip />
                      <Legend />
                      <Bar dataKey="lecturerCount" fill="#82ca9d" name="Jumlah Dosen" />
                    </BarChart>
                  </ResponsiveContainer>
                </Box>
              </CardBody>
            </Card>

            {/* Grafik Keaktifan Dosen dan Mahasiswa */}
            <Card>
              <CardHeader>
                <Heading size="md">Grafik Keaktifan Dosen dan Mahasiswa</Heading>
              </CardHeader>
              <CardBody>
                <Box height="250px">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={activityData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <RechartsTooltip />
                      <Legend />
                      <Bar dataKey="dosen" fill="#8884d8" name="Dosen Aktif" />
                      <Bar dataKey="mahasiswa" fill="#82ca9d" name="Mahasiswa Aktif" />
                    </BarChart>
                  </ResponsiveContainer>
                </Box>
              </CardBody>
            </Card>
          </Grid>
        </GridItem>

        {/* Fakultas & Program Lists */}
        <GridItem>
          <Card mb={6}>
            <CardHeader>
              <Heading size="md">Daftar Fakultas</Heading>
            </CardHeader>
            <CardBody>
              <Stack divider={<StackDivider />} spacing={4}>
                {fakultasData.map(faculty => (
                  <Box key={faculty.id}>
                    <Heading size="xs" textTransform="uppercase">
                      {faculty.name}
                    </Heading>
                    <Text pt={2} fontSize="sm">
                      {faculty.programs} program studi • {faculty.students} mahasiswa
                    </Text>
                  </Box>
                ))}
              </Stack>
            </CardBody>
          </Card>

          <Card>
            <CardHeader>
              <Heading size="md">Distribusi Program Studi</Heading>
            </CardHeader>
            <CardBody>
              <Box height="250px">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={facultyProgramData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="programCount"
                    >
                      {facultyProgramData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <RechartsTooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </Box>
            </CardBody>
          </Card>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default AdminOfficeDashboard;