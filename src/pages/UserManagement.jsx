import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
  TextField,
} from "@mui/material";

function UserManagement() {
  const dummyUsers = [
    { id: 1, name: "John Doe", email: "john@example.com", role: "Admin" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User" },
    { id: 3, name: "Mike Johnson", email: "mike@example.com", role: "User" },
    { id: 4, name: "Sarah Lee", email: "sarah@example.com", role: "Manager" },
    { id: 5, name: "Robert Brown", email: "robert@example.com", role: "User" },
    { id: 6, name: "Emma Wilson", email: "emma@example.com", role: "Admin" },
    { id: 7, name: "Chris Taylor", email: "chris@example.com", role: "User" },
    { id: 8, name: "Olivia Davis", email: "olivia@example.com", role: "Manager" },
    { id: 9, name: "Ethan Clark", email: "ethan@example.com", role: "User" },
    { id: 10, name: "Sophia Miller", email: "sophia@example.com", role: "Admin" },
  ];

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const filteredUsers = dummyUsers.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase()) ||
      user.role.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 p-4 md:p-8">
      <h1 className="text-2xl font-semibold mb-4">User Management</h1>

      <div className="mb-4">
        <TextField
          fullWidth
          size="small"
          label="Search Users"
          variant="outlined"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <Paper
        className="flex-1 overflow-hidden"
        sx={{
          minHeight: "calc(100vh - 200px)", // ensures table fills screen
          display: "flex",
          flexDirection: "column",
        }}
      >
        <TableContainer
          sx={{
            flex: 1,
            overflowX: "auto",
            overflowY: "auto",
            maxHeight: "70vh",
          }}
        >
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell><b>ID</b></TableCell>
                <TableCell><b>Name</b></TableCell>
                <TableCell><b>Email</b></TableCell>
                <TableCell><b>Role</b></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredUsers
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((user) => (
                  <TableRow key={user.id} hover>
                    <TableCell>{user.id}</TableCell>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.role}</TableCell>
                  </TableRow>
                ))}
              {filteredUsers.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    No results found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          component="div"
          count={filteredUsers.length}
          page={page}
          onPageChange={(e, newPage) => setPage(newPage)}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={(e) => {
            setRowsPerPage(parseInt(e.target.value, 10));
            setPage(0);
          }}
          rowsPerPageOptions={[5, 10, 20]}
        />
      </Paper>
    </div>
  );
}

export default UserManagement;
