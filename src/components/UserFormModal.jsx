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
      toast.error("Please fill in all required fields.");
      return;
    }

    // Password required only if creating
    if (!isEditing && !formData.password) {
      toast.error("Password is required.");
      return;
    }

    if (formData.password !== formData.confirm_password) {
      toast.error("Passwords do not match.");
      return;
    }

    const payload = { ...formData };
    delete payload.confirm_password;

    // If editing and password is empty — remove it
    if (isEditing && payload.password === "") {
      delete payload.password;
    }

    setLoading(true);
    await onSubmit(payload);
    setLoading(false);
  };

  return (
    <Dialog open={open} onClose={loading ? null : onClose} fullWidth maxWidth="sm">
      <DialogTitle>{isEditing ? "Edit User" : "Create New User"}</DialogTitle>

      <DialogContent dividers>
        <TextField margin="normal" fullWidth label="First Name" name="first_name" value={formData.first_name} onChange={handleChange} />
        <TextField margin="normal" fullWidth label="Middle Name" name="middle_name" value={formData.middle_name} onChange={handleChange} />
        <TextField margin="normal" fullWidth label="Last Name" name="last_name" value={formData.last_name} onChange={handleChange} />
        <TextField margin="normal" fullWidth label="Email Address" name="email" type="email" value={formData.email} onChange={handleChange} />

        <TextField margin="normal" fullWidth label="Password" name="password" type="password" value={formData.password} onChange={handleChange} />
        <TextField margin="normal" fullWidth label="Confirm Password" name="confirm_password" type="password" value={formData.confirm_password} onChange={handleChange} />

        <TextField select margin="normal" fullWidth label="Role" name="role" value={formData.role} onChange={handleChange}>
          <MenuItem value="Admin">Admin</MenuItem>
          <MenuItem value="User">User</MenuItem>
        </TextField>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} disabled={loading}>Cancel</Button>
        <Button
          variant="contained"
          disabled={loading}
          onClick={handleSubmit}
          sx={{ backgroundColor: "#00796b", "&:hover": { backgroundColor: "#00695c" } }}
        >
          {loading ? <CircularProgress size={22} /> : isEditing ? "Update User" : "Save User"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default UserFormModal;
