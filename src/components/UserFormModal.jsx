import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
} from "@mui/material";

function UserFormModal({ open, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    first_name: "",
    middle_name: "",
    last_name: "",
    email: "",
    contact_number: "",
    address: "",
    country: "",
    city: "",
    region: "",
    postal_code: "",
    role: "User",
  });

  useEffect(() => {
    if (open) {
      setFormData({
        first_name: "",
        middle_name: "",
        last_name: "",
        email: "",
        contact_number: "",
        address: "",
        country: "",
        city: "",
        region: "",
        postal_code: "",
        role: "User",
      });
    }
  }, [open]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (!formData.first_name || !formData.last_name || !formData.email) {
      alert("Please fill in all required fields.");
      return;
    }
    onSubmit(formData);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        sx: {
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          margin: "auto",
        },
      }}
    >
      <DialogTitle>Create New User</DialogTitle>
      <DialogContent dividers>
        <TextField
          margin="normal"
          fullWidth
          label="First Name"
          name="first_name"
          value={formData.first_name}
          onChange={handleChange}
        />
        <TextField
          margin="normal"
          fullWidth
          label="Middle Name"
          name="middle_name"
          value={formData.middle_name}
          onChange={handleChange}
        />
        <TextField
          margin="normal"
          fullWidth
          label="Last Name"
          name="last_name"
          value={formData.last_name}
          onChange={handleChange}
        />
        <TextField
          margin="normal"
          fullWidth
          label="Email Address"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
        />
        <TextField
          margin="normal"
          fullWidth
          label="Contact Number"
          name="contact_number"
          value={formData.contact_number}
          onChange={handleChange}
        />
        <TextField
          margin="normal"
          fullWidth
          label="Address"
          name="address"
          value={formData.address}
          onChange={handleChange}
        />
        <TextField
          margin="normal"
          fullWidth
          label="Country"
          name="country"
          value={formData.country}
          onChange={handleChange}
        />
        <TextField
          margin="normal"
          fullWidth
          label="City"
          name="city"
          value={formData.city}
          onChange={handleChange}
        />
        <TextField
          margin="normal"
          fullWidth
          label="Region"
          name="region"
          value={formData.region}
          onChange={handleChange}
        />
        <TextField
          margin="normal"
          fullWidth
          label="Postal Code"
          name="postal_code"
          value={formData.postal_code}
          onChange={handleChange}
        />
        <TextField
          select
          margin="normal"
          fullWidth
          label="Role"
          name="role"
          value={formData.role}
          onChange={handleChange}
        >
          <MenuItem value="Admin">Admin</MenuItem>
          <MenuItem value="Manager">Manager</MenuItem>
          <MenuItem value="User">User</MenuItem>
        </TextField>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="inherit">
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleSubmit}
          sx={{
            backgroundColor: "#00796b",
            "&:hover": { backgroundColor: "#00695c" },
          }}
        >
          Save User
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default UserFormModal;
