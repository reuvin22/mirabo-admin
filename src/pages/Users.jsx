import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Avatar,
  Divider,
  Grid,
  Button,
  TextField,
} from "@mui/material";

function Users() {
  const [isEditing, setIsEditing] = useState(false);

  const [userData, setUserData] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+44 123 456 789",
    country: "Japan",
    city: "Tokyo",
    region: "",
    postalCode: "",
  });

  const handleChange = (field, value) => {
    setUserData({ ...userData, [field]: value });
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    setIsEditing(false);
    alert("✅ User information updated successfully!");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#f5f6fa",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        p: { xs: 2, md: 6 },
      }}
    >
      <Box sx={{ width: "100%", maxWidth: 1000 }}>
        <Paper
          elevation={2}
          sx={{
            p: 3,
            display: "flex",
            alignItems: "center",
            borderRadius: 3,
            mb: 4,
          }}
        >
          <Avatar
            src="https://randomuser.me/api/portraits/men/75.jpg"
            alt="User Avatar"
            sx={{ width: 80, height: 80, mr: 3 }}
          />
          <Box>
            <Typography variant="h5" fontWeight="bold">
              {userData.firstName} {userData.lastName}
            </Typography>
            <Typography color="text.secondary">{userData.email}</Typography>
            <Typography color="text.secondary">Admin</Typography>
            <Typography color="text.secondary">
              📍 {[userData.city, userData.country, userData.region, userData.postalCode]
                .filter(Boolean)
                .join(", ")}
            </Typography>
          </Box>
        </Paper>

        <Paper elevation={2} sx={{ p: 4, borderRadius: 3, backgroundColor: "#fff" }}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={2}
          >
            <Typography variant="h6" fontWeight="bold">
              Personal Information
            </Typography>
            {!isEditing ? (
              <Button
                variant="contained"
                size="small"
                sx={{
                  textTransform: "none",
                  borderRadius: 2,
                  backgroundColor: "#00796b",
                  "&:hover": { backgroundColor: "#00695c" },
                }}
                onClick={handleEditToggle}
              >
                Edit
              </Button>
            ) : (
              <Button
                variant="contained"
                color="success"
                size="small"
                sx={{
                  textTransform: "none",
                  borderRadius: 2,
                }}
                onClick={handleSave}
              >
                Save
              </Button>
            )}
          </Box>

          <Divider sx={{ mb: 3 }} />

          <Grid container spacing={3}>
            {[
              { label: "First Name", key: "firstName" },
              { label: "Last Name", key: "lastName" },
              { label: "Email", key: "email" },
              { label: "Phone", key: "phone" },
            ].map((field) => (
              <Grid item xs={12} sm={6} md={3} key={field.key}>
                <Typography color="text.secondary">{field.label}</Typography>
                {isEditing ? (
                  <TextField
                    variant="outlined"
                    size="small"
                    fullWidth
                    value={userData[field.key]}
                    onChange={(e) => handleChange(field.key, e.target.value)}
                  />
                ) : (
                  <Typography variant="subtitle1" fontWeight={500}>
                    {userData[field.key]}
                  </Typography>
                )}
              </Grid>
            ))}
          </Grid>

          <Divider sx={{ my: 3 }} />

          <Typography variant="h6" fontWeight="bold" mb={2}>
            Address
          </Typography>

          <Grid container spacing={3}>
            {[
              { label: "Country", key: "country" },
              { label: "City", key: "city" },
              { label: "Region", key: "region" },
              { label: "Postal Code", key: "postalCode" },
            ].map((field) => (
              <Grid item xs={12} sm={6} md={3} key={field.key}>
                <Typography color="text.secondary">{field.label}</Typography>
                {isEditing ? (
                  <TextField
                    variant="outlined"
                    size="small"
                    fullWidth
                    value={userData[field.key]}
                    onChange={(e) => handleChange(field.key, e.target.value)}
                  />
                ) : (
                  <Typography variant="subtitle1" fontWeight={500}>
                    {userData[field.key]}
                  </Typography>
                )}
              </Grid>
            ))}
          </Grid>
        </Paper>
      </Box>
    </Box>
  );
}

export default Users;
