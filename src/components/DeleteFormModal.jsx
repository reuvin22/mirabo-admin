import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  CircularProgress,
} from "@mui/material";

function DeleteFormModal({ open, onClose, onConfirm, itemName = "this item", loading = false }) {
  return (
    <Dialog
      open={open}
      onClose={loading ? () => {} : onClose}
      disableEscapeKeyDown={loading}
      fullWidth
      maxWidth="xs"
      PaperProps={{ sx: { textAlign: "center" } }}
    >
      <DialogTitle>Confirm Delete</DialogTitle>
      <DialogContent>
        <Typography>
          Are you sure you want to delete {itemName}?
        </Typography>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "center", pb: 2 }}>
        <Button variant="outlined" onClick={onClose} disabled={loading}>
          Cancel
        </Button>

        <Button
          variant="contained"
          color="error"
          onClick={onConfirm}
          disabled={loading}
          sx={{ ml: 1, minWidth: 90 }}
        >
          {loading ? <CircularProgress size={20} /> : "Delete"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DeleteFormModal;
