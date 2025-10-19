import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
} from "@mui/material";

const UserManagementModal = ({ open, onClose, user }) => {
  if (!user) return null;

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>User Details</DialogTitle>

      <DialogContent dividers>
        <Box display="flex" flexDirection="column" gap={2}>
          <TextField
            label="User ID"
            value={user.id}
            InputProps={{ readOnly: true }}
            fullWidth
          />
          <TextField
            label="Name"
            value={`${user.first_name} ${user.last_name}`}
            InputProps={{ readOnly: true }}
            fullWidth
          />
          <TextField
            label="Email"
            value={user.email}
            InputProps={{ readOnly: true }}
            fullWidth
          />
          <TextField
            label="Role"
            value={user.role}
            InputProps={{ readOnly: true }}
            fullWidth
          />
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} variant="contained">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UserManagementModal;
