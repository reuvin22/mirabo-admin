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
  IconButton,
  Tooltip,
} from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import UserFormModal from "../components/UserFormModal";

function UserManagement() {
  const dummyUsers = [
    { id: 1, name: "John Doe", email: "john@example.com", role: "Admin" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User" },
    { id: 3, name: "Mike Johnson", email: "mike@example.com", role: "User" },
    { id: 4, name: "Sarah Lee", email: "sarah@example.com", role: "Manager" },
    { id: 5, name: "Robert Brown", email: "robert@example.com", role: "User" },
  ];

  const [users, setUsers] = useState(dummyUsers);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openForm, setOpenForm] = useState(false);

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase()) ||
      user.role.toLowerCase().includes(search.toLowerCase())
  );

  const handleCreateUser = () => setOpenForm(true);
  const handleCloseForm = () => setOpenForm(false);

  const handleAddUser = (newUser) => {
    const nextId = users.length ? Math.max(...users.map((u) => u.id)) + 1 : 1;
    setUsers([...users, { id: nextId, ...newUser }]);
    setOpenForm(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 p-4 md:p-8">
      <h1 className="text-2xl font-semibold mb-4">User Management</h1>

      <div className="mb-4 flex items-center justify-between">
        <TextField
          size="small"
          label="Search Users"
          variant="outlined"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ flex: 1, marginRight: 2 }}
        />

        <Tooltip title="Create User">
          <IconButton
            color="default"
            onClick={handleCreateUser}
            sx={{
              backgroundColor: "#fff",
              border: "1px solid #ddd",
              "&:hover": { backgroundColor: "#f5f5f5" },
              width: 48,
              height: 48,
              boxShadow: 1,
            }}
          >
            <PersonAddIcon fontSize="medium" />
          </IconButton>
        </Tooltip>
      </div>

      <Paper
        className="flex-1 overflow-hidden"
        sx={{
          minHeight: "calc(100vh - 200px)",
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

      <UserFormModal
        open={openForm}
        onClose={handleCloseForm}
        onSubmit={handleAddUser}
      />
    </div>
  );
}

export default UserManagement;
