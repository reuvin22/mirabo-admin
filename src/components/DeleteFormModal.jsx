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

function DeleteFormModal({ open, onClose, onConfirm, itemName = "このアイテム", loading = false }) {
  return (
    <Dialog
      open={open}
      onClose={loading ? () => {} : onClose}
      disableEscapeKeyDown={loading}
      fullWidth
      maxWidth="xs"
      PaperProps={{ sx: { textAlign: "center" } }}
    >
      <DialogTitle>削除の確認</DialogTitle>
      <DialogContent>
        <Typography>
          本当に {itemName} を削除してもよろしいですか？
        </Typography>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "center", pb: 2 }}>
        <Button variant="outlined" onClick={onClose} disabled={loading}>
          キャンセル
        </Button>

        <Button
          variant="contained"
          color="error"
          onClick={onConfirm}
          disabled={loading}
          sx={{ ml: 1, minWidth: 90 }}
        >
          {loading ? <CircularProgress size={20} /> : "削除"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DeleteFormModal;
