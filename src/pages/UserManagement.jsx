import React, { useEffect, useState } from "react";
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
  CircularProgress,
} from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import { EditIcon } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import UserFormModal from "../components/UserFormModal";
import UserManagementModal from "../components/UserManagementModal";
import DeleteFormModal from "../components/DeleteFormModal";

import {
  useCreateUserManagementMutation,
  useDeleteUserManagementMutation,
  useUpdateUserManagementMutation,
  useUserManagementQuery,
} from "../services/userManagementService";

function UserManagement() {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [openForm, setOpenForm] = useState(false);
  const [openViewModal, setOpenViewModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const [selectedUser, setSelectedUser] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const { data, isLoading } = useUserManagementQuery({
    search: debouncedSearch,
    page: page + 1,
    limit: rowsPerPage,
  });

  const [deleteUser] = useDeleteUserManagementMutation();
  const [createUser] = useCreateUserManagementMutation();
  const [updateUser] = useUpdateUserManagementMutation();

  // Debounce search
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearch(search), 500);
    return () => clearTimeout(handler);
  }, [search]);

  useEffect(() => setPage(0), [debouncedSearch]);

  // Open modals
  const handleEdit = (user) => {
    setSelectedUser(user);
    setIsEditing(true);
    setOpenForm(true);
  };

  const handleView = (user) => {
    setSelectedUser(user);
    setOpenViewModal(true);
  };

  const handleCloseView = () => {
    setSelectedUser(null);
    setOpenViewModal(false);
  };

  const handleDelete = (user) => {
    setSelectedUser(user);
    setOpenDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedUser) return;
    setDeleteLoading(true);

    try {
      await deleteUser(selectedUser.id).unwrap();
      toast.success("ユーザーが正常に削除されました");
    } catch {
      toast.error("ユーザーの削除に失敗しました");
    } finally {
      setDeleteLoading(false);
      setOpenDeleteModal(false);
      setSelectedUser(null);
    }
  };

  const handleCreateUser = () => setOpenForm(true);
  const handleCloseForm = () => {
    setOpenForm(false);
    setIsEditing(false);
    setSelectedUser(null);
  };

  const handleSubmit = async (formData) => {
    try {
      if (isEditing) {
        await updateUser({ id: selectedUser.id, body: formData }).unwrap();
        toast.success("ユーザーが正常に更新されました");
      } else {
        await createUser(formData).unwrap();
        toast.success("ユーザーが正常に作成されました");
      }
      handleCloseForm();
    } catch {
      toast.error(isEditing ? "ユーザーの更新に失敗しました" : "ユーザーの作成に失敗しました");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 p-4 md:p-8">
      <ToastContainer position="top-right" autoClose={2000} />
      <h1 className="text-2xl font-semibold mb-4">ユーザー管理</h1>

      <div className="mb-4 flex items-center justify-between">
        <TextField
          size="small"
          label="ユーザー検索"
          variant="outlined"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ flex: 1, marginRight: 2 }}
        />

        <Tooltip title="ユーザー作成">
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

      <Paper sx={{ flex: 1, display: "flex", flexDirection: "column", minHeight: "calc(100vh - 200px)" }}>
        <TableContainer sx={{ flex: 1, maxHeight: "70vh" }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell align="center"><b>氏名</b></TableCell>
                <TableCell align="center"><b>メールアドレス</b></TableCell>
                <TableCell align="center"><b>役割</b></TableCell>
                <TableCell align="center"><b>操作</b></TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {isLoading && (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    <CircularProgress />
                  </TableCell>
                </TableRow>
              )}

              {!isLoading && data?.data?.length > 0
                ? data.data.map((user) => (
                    <TableRow key={user.id} hover>
                      <TableCell align="center">{user.first_name || ""} {user.last_name || ""}</TableCell>
                      <TableCell align="center">{user.email || ""}</TableCell>
                      <TableCell align="center">{user.role || ""}</TableCell>
                      <TableCell align="center">
                        <Tooltip title="表示">
                          <IconButton size="small" color="primary" onClick={() => handleView(user)}>
                            <VisibilityIcon />
                          </IconButton>
                        </Tooltip>

                        <Tooltip title="編集">
                          <IconButton size="small" color="secondary" onClick={() => handleEdit(user)}>
                            <EditIcon />
                          </IconButton>
                        </Tooltip>

                        <Tooltip title="削除">
                          <IconButton size="small" color="error" onClick={() => handleDelete(user)}>
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ))
                : !isLoading && (
                    <TableRow>
                      <TableCell colSpan={4} align="center">結果が見つかりません</TableCell>
                    </TableRow>
                  )}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          component="div"
          count={data?.total ?? 0}
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
        onSubmit={handleSubmit}
        initialData={isEditing ? selectedUser : null}
      />

      <UserManagementModal
        open={openViewModal}
        onClose={handleCloseView}
        user={selectedUser}
      />

      <DeleteFormModal
        open={openDeleteModal}
        onClose={() => setOpenDeleteModal(false)}
        onConfirm={handleConfirmDelete}
        itemName={`${selectedUser?.first_name || ""} ${selectedUser?.last_name || ""}`}
        loading={deleteLoading}
      />
    </div>
  );
}

export default UserManagement;
