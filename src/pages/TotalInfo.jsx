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
  IconButton,
  Tooltip,
  Box,
  CircularProgress,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteFormModal from "../components/DeleteFormModal";
import { useDeleteUserResponseMutation, useUserResponseQuery } from "../services/userResponseService";
import UserResponseModal from "../components/UserResponseModal";
import { toast } from "react-toastify";

function TotalInfo() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openView, setOpenView] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null);
  const [openDelete, setOpenDelete] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const { data: userResponse, isLoading } = useUserResponseQuery({
    search,
    page: page + 1,
    limit: rowsPerPage,
  });

  const [deleteUserResponse] = useDeleteUserResponseMutation();

  const handleView = (user) => {
    setSelectedUser(user);
    setOpenView(true);
  };

  const handleCloseView = () => {
    setSelectedUser(null);
    setOpenView(false);
  };

  const handleOpenDelete = (user) => {
    setSelectedUser(user);
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setSelectedUser(null);
    setOpenDelete(false);
  };

  const handleConfirmDelete = async () => {
    if (!selectedUser) return;
    setDeleting(true);
    try {
      await deleteUserResponse(selectedUser.id).unwrap();
      toast.success("ユーザーの回答が正常に削除されました！");
      handleCloseDelete();
    } catch (err) {
      toast.error("削除に失敗しました。再度お試しください。");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 p-4 md:p-8">
      <h1 className="text-2xl font-semibold mb-10">ユーザー回答</h1>

      <Paper sx={{ minHeight: "calc(100vh - 200px)", display: "flex", flexDirection: "column" }}>
        <TableContainer sx={{ flex: 1, maxHeight: "70vh" }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell align="center"><b>ユーザーID</b></TableCell>
                <TableCell align="center"><b>操作</b></TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {isLoading && (
                <TableRow>
                  <TableCell colSpan={2} align="center">
                    <CircularProgress />
                  </TableCell>
                </TableRow>
              )}

              {!isLoading && Array.isArray(userResponse?.data) &&
                userResponse.data.map((user) => (
                  <TableRow key={user.id} hover>
                    <TableCell align="center">{user.userId}</TableCell>
                    <TableCell align="center">
                      <Box sx={{ display: "flex", justifyContent: "center", gap: 1 }}>
                        <Tooltip title="表示">
                          <IconButton size="small" color="primary" onClick={() => handleView(user)}>
                            <VisibilityIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="削除">
                          <IconButton size="small" color="error" onClick={() => handleOpenDelete(user)}>
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}

              {!isLoading && Array.isArray(userResponse?.data) && userResponse.data.length === 0 && (
                <TableRow>
                  <TableCell colSpan={2} align="center">結果が見つかりません</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          component="div"
          count={Array.isArray(userResponse?.data) ? userResponse?.data.length : 0}
          page={page}
          onPageChange={(e, newPage) => setPage(newPage)}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={(e) => { setRowsPerPage(+e.target.value); setPage(0); }}
          rowsPerPageOptions={[5, 10, 20]}
        />
      </Paper>

      <DeleteFormModal
        open={openDelete}
        onClose={handleCloseDelete}
        onConfirm={handleConfirmDelete}
        loading={deleting}
        itemName={selectedUser?.userId || "このユーザー"}
      />

      <UserResponseModal
        open={openView}
        onClose={handleCloseView}
        user={selectedUser}
      />
    </div>
  );
}

export default TotalInfo;
