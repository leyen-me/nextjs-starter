"use client";

import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Pagination,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";

const User = () => {
  const [filters, setFilters] = useState({
    email: "",
    nickname: "",
    gender: "",
    mobile: "",
    status: "",
  });
  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(10);

  // Mock data for demonstration
  const users = [
    {
      id: 1,
      email: "john@example.com",
      nickname: "John",
      gender: "MALE",
      mobile: "1234567890",
      status: "NORMAL",
    },
    {
      id: 2,
      email: "jane@example.com",
      nickname: "Jane",
      gender: "FEMALE",
      mobile: "0987654321",
      status: "DISABLED",
    },
    // ... more users
  ];

  const handleFilterChange = (
    event: React.ChangeEvent<
      HTMLInputElement | { name?: string; value: unknown }
    >
  ) => {
    const { name, value } = event.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name as string]: value,
    }));
  };

  const handleReset = () => {
    setFilters({
      email: "",
      nickname: "",
      gender: "",
      mobile: "",
      status: "",
    });
  };

  const handleSearch = () => {
    // Implement search logic here
    console.log("Searching with filters:", filters);
  };

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    newPage: number
  ) => {
    setPage(newPage);
  };

  return (
    <Box sx={{ width: "100%", padding: 2 }}>
      {/* Filtering Section */}
      <Box sx={{ marginBottom: 2, display: "flex", flexWrap: "wrap", gap: 2 }}>
        <TextField
          label="Email"
          variant="outlined"
          name="email"
          value={filters.email}
          onChange={handleFilterChange}
          size="small"
        />
        <TextField
          label="Nickname"
          variant="outlined"
          name="nickname"
          value={filters.nickname}
          onChange={handleFilterChange}
          size="small"
        />
        <FormControl variant="outlined" size="small" sx={{ minWidth: 120 }}>
          <InputLabel>Gender</InputLabel>
          <Select
            label="Gender"
            name="gender"
            value={filters.gender}
            onChange={handleFilterChange}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="MALE">Male</MenuItem>
            <MenuItem value="FEMALE">Female</MenuItem>
            <MenuItem value="UNKNOWN">Unknown</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="Mobile"
          variant="outlined"
          name="mobile"
          value={filters.mobile}
          onChange={handleFilterChange}
          size="small"
        />
        <FormControl variant="outlined" size="small" sx={{ minWidth: 120 }}>
          <InputLabel>Status</InputLabel>
          <Select
            label="Status"
            name="status"
            value={filters.status}
            onChange={handleFilterChange}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="NORMAL">Normal</MenuItem>
            <MenuItem value="DISABLED">Disabled</MenuItem>
          </Select>
        </FormControl>
        <Button
          variant="outlined"
          onClick={handleReset}
        >
          Reset
        </Button>
        <Button variant="contained" onClick={handleSearch}>
          Search
        </Button>
      </Box>

      {/* Results Section */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Email</TableCell>
              <TableCell>Nickname</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell>Mobile</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users
              .slice((page - 1) * rowsPerPage, page * rowsPerPage)
              .map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.nickname}</TableCell>
                  <TableCell>{user.gender}</TableCell>
                  <TableCell>{user.mobile}</TableCell>
                  <TableCell>{user.status}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination Section */}
      <Box sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}>
        <Pagination
          count={Math.ceil(users.length / rowsPerPage)}
          page={page}
          onChange={handleChangePage}
        />
      </Box>
    </Box>
  );
};

export default User;
