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
  Box,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteFormModal from "../components/DeleteFormModal";

function TotalInfo() {
  const dummyUsers = [
    { id: 1, name: "John Doe" },
    { id: 2, name: "Jane Smith" },
    { id: 3, name: "Mike Johnson" },
    { id: 4, name: "Sarah Lee" },
    { id: 5, name: "Robert Brown" },
    { id: 6, name: "Emma Wilson" },
    { id: 7, name: "Chris Taylor" },
    { id: 8, name: "Olivia Davis" },
    { id: 9, name: "Ethan Clark" },
    { id: 10, name: "Sophia Miller" },
  ];

  const [users, setUsers] = useState(dummyUsers);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [openDelete, setOpenDelete] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleView = (user) => {
    alert(`Viewing user:\n${JSON.stringify(user, null, 2)}`);
  };

  const handleOpenDelete = (user) => {
    setSelectedUser(user);
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setSelectedUser(null);
    setOpenDelete(false);
  };

  const handleConfirmDelete = () => {
    if (selectedUser) {
      setUsers(users.filter((u) => u.id !== selectedUser.id));
    }
    handleCloseDelete();
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 p-4 md:p-8">
      <h1 className="text-2xl font-semibold mb-4">User Response</h1>

      <div className="mb-4 flex items-center justify-between">
        <TextField
          size="small"
          label="Search Users"
          variant="outlined"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ flex: 1, marginRight: 2 }}
        />
      </div>

      {/* Table Section */}
      <Paper
        className="flex-1 overflow-hidden"
        sx={{
          minHeight: "calc(100vh - 200px)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <TableContainer sx={{ flex: 1, maxHeight: "70vh" }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell align="center"><b>User ID</b></TableCell>
                <TableCell align="center"><b>Display Name</b></TableCell>
                <TableCell align="center"><b>Action</b></TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {filteredUsers
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((user) => (
                  <TableRow key={user.id} hover>
                    <TableCell align="center">{user.id}</TableCell>
                    <TableCell align="center">{user.name}</TableCell>
                    <TableCell align="center">
                      <Box sx={{ display: "flex", justifyContent: "center", gap: 1 }}>
                        <Tooltip title="View">
                          <IconButton
                            size="small"
                            color="primary"
                            onClick={() => handleView(user)}
                          >
                            <VisibilityIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete">
                          <IconButton
                            size="small"
                            color="error"
                            onClick={() => handleOpenDelete(user)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}

              {filteredUsers.length === 0 && (
                <TableRow>
                  <TableCell colSpan={3} align="center">
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

      <DeleteFormModal
        open={openDelete}
        onClose={handleCloseDelete}
        onConfirm={handleConfirmDelete}
        itemName={selectedUser?.name || "this user"}
      />
    </div>
  );
}

export default TotalInfo;
