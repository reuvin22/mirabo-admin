import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Box } from "@mui/material";

const UserManagementModal = ({ open, onClose, user }) => {
  if (!user) return null;

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>ユーザー詳細</DialogTitle>
      <DialogContent dividers>
        <Box display="flex" flexDirection="column" gap={2}>
          <TextField label="ユーザーID" value={user.id || ""} InputProps={{ readOnly: true }} fullWidth />
          <TextField label="名前" value={`${user.first_name || ""} ${user.last_name || ""}`} InputProps={{ readOnly: true }} fullWidth />
          <TextField label="メール" value={user.email || ""} InputProps={{ readOnly: true }} fullWidth />
          <TextField label="役割" value={user.role || ""} InputProps={{ readOnly: true }} fullWidth />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="contained">閉じる</Button>
      </DialogActions>
    </Dialog>
  );
};

export default UserManagementModal;
