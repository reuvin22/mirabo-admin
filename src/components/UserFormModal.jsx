import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import { toast } from "react-toastify";

function UserFormModal({ open, onClose, onSubmit, initialData }) {
  const isEditing = !!initialData;

  const [formData, setFormData] = useState({
    first_name: "",
    middle_name: "",
    last_name: "",
    email: "",
    role: "User",
    password: "",
    confirm_password: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open) {
      if (isEditing) {
        setFormData({
          ...initialData,
          password: "",
          confirm_password: "",
        });
      } else {
        setFormData({
          first_name: "",
          middle_name: "",
          last_name: "",
          email: "",
          role: "User",
          password: "",
          confirm_password: "",
        });
      }
      setLoading(false);
    }
  }, [open, initialData, isEditing]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!formData.first_name || !formData.last_name || !formData.email) {
      toast.error("必須項目をすべて入力してください。");
      return;
    }

    if (!isEditing && !formData.password) {
      toast.error("パスワードは必須です。");
      return;
    }

    if (formData.password !== formData.confirm_password) {
      toast.error("パスワードが一致しません。");
      return;
    }

    const payload = { ...formData };
    delete payload.confirm_password;

    if (isEditing && payload.password === "") {
      delete payload.password;
    }

    setLoading(true);
    await onSubmit(payload);
    setLoading(false);
  };

  return (
    <Dialog open={open} onClose={loading ? null : onClose} fullWidth maxWidth="sm">
      <DialogTitle>{isEditing ? "ユーザー編集" : "新規ユーザー作成"}</DialogTitle>

      <DialogContent dividers>
        <TextField
          margin="normal"
          fullWidth
          label="名"
          name="first_name"
          value={formData.first_name}
          onChange={handleChange}
        />
        <TextField
          margin="normal"
          fullWidth
          label="ミドルネーム"
          name="middle_name"
          value={formData.middle_name}
          onChange={handleChange}
        />
        <TextField
          margin="normal"
          fullWidth
          label="姓"
          name="last_name"
          value={formData.last_name}
          onChange={handleChange}
        />
        <TextField
          margin="normal"
          fullWidth
          label="メールアドレス"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
        />

        <TextField
          margin="normal"
          fullWidth
          label="パスワード"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
        />
        <TextField
          margin="normal"
          fullWidth
          label="パスワード確認"
          name="confirm_password"
          type="password"
          value={formData.confirm_password}
          onChange={handleChange}
        />

        <TextField
          select
          margin="normal"
          fullWidth
          label="役割"
          name="role"
          value={formData.role}
          onChange={handleChange}
        >
          <MenuItem value="Admin">管理者</MenuItem>
          <MenuItem value="User">ユーザー</MenuItem>
        </TextField>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} disabled={loading}>キャンセル</Button>
        <Button
          variant="contained"
          disabled={loading}
          onClick={handleSubmit}
          sx={{ backgroundColor: "#00796b", "&:hover": { backgroundColor: "#00695c" } }}
        >
          {loading ? <CircularProgress size={22} /> : isEditing ? "ユーザー更新" : "ユーザー保存"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default UserFormModal;
