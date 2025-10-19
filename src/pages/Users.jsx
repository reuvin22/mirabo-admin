import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Paper,
  Divider,
  Grid,
  Button,
  TextField,
  CircularProgress,
} from "@mui/material";
import { useProfileQuery, useUpdateAuthUserMutation } from "../services/profileService";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Users() {
  const [isEditing, setIsEditing] = useState(false);
  const { data: profile, isLoading } = useProfileQuery();
  const [updateAuthUser, { isLoading: isUpdating }] = useUpdateAuthUserMutation();

  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    middle_name: "",
    email: "",
    role: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (profile?.user) {
      setUserData({
        firstName: profile.user.first_name,
        lastName: profile.user.last_name,
        middle_name: profile.user.middle_name,
        email: profile.user.email,
        role: profile.user.role,
        password: "",
        confirmPassword: "",
      });
    }
  }, [profile]);

  const handleChange = (key, value) => {
    setUserData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    if (userData.password || userData.confirmPassword) {
      if (userData.password !== userData.confirmPassword) {
        toast.error("Passwords do not match!");
        return;
      }
    }

    try {
      const body = {
        first_name: userData.firstName,
        middle_name: userData.middle_name,
        last_name: userData.lastName,
        email: userData.email,
      };

      if (userData.password) {
        body.password = userData.password;
      }

      await updateAuthUser({
        id: profile.user.id,
        body,
      }).unwrap();

      toast.success("Profile updated successfully!");
      setIsEditing(false);
      setUserData((prev) => ({ ...prev, password: "", confirmPassword: "" }));
    } catch (error) {
      console.error(error);
      toast.error("Failed to update profile.");
    }
  };

  if (isLoading)
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "60vh",
        }}
      >
        <CircularProgress />
      </Box>
    );

  return (
    <Box sx={{ p: 4 }}>
      <Paper sx={{ p: 3, mb: 4, display: "flex", alignItems: "center" }}>
        <Box>
          <Typography variant="h5" fontWeight="bold">
            {userData.firstName} {userData.middle_name || ''} {userData.lastName}
          </Typography>
          <Typography>{userData.email}</Typography>
          <Typography>{userData.role}</Typography>

          {/* <Typography>📍 Tokyo, Japan</Typography>  <-- COMMENTED ADDRESS */}
          {/* <Typography>+44 123 456 789</Typography> <-- COMMENTED PHONE */}
        </Box>
      </Paper>

      <Paper sx={{ p: 3 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6" fontWeight="bold">
            個人情報
          </Typography>
          {!isEditing ? (
            <Button variant="contained" size="small" onClick={() => setIsEditing(true)}>
              編集
            </Button>
          ) : (
            <Button
              variant="contained"
              color="success"
              size="small"
              onClick={handleSave}
              disabled={isUpdating}
            >
              保存
            </Button>
          )}
        </Box>

        <Divider sx={{ mb: 2, mt: 2 }} />

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Typography>名</Typography>
            {isEditing ? (
              <TextField
                size="small"
                fullWidth
                value={userData.firstName}
                onChange={(e) => handleChange("firstName", e.target.value)}
              />
            ) : (
              <Typography fontWeight={500}>{userData.firstName}</Typography>
            )}
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography>姓</Typography>
            {isEditing ? (
              <TextField
                size="small"
                fullWidth
                value={userData.middle_name}
                onChange={(e) => handleChange("middle_name", e.target.value)}
              />
            ) : (
              <Typography fontWeight={500}>{userData.middle_name}</Typography>
            )}
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography>姓</Typography>
            {isEditing ? (
              <TextField
                size="small"
                fullWidth
                value={userData.lastName}
                onChange={(e) => handleChange("lastName", e.target.value)}
              />
            ) : (
              <Typography fontWeight={500}>{userData.lastName}</Typography>
            )}
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography>メールアドレス</Typography>
            {isEditing ? (
              <TextField
                size="small"
                fullWidth
                value={userData.email}
                onChange={(e) => handleChange("email", e.target.value)}
              />
            ) : (
              <Typography fontWeight={500}>{userData.email}</Typography>
            )}
          </Grid>

          {isEditing && (
            <>
              <Grid item xs={12} sm={6}>
                <Typography>パスワード</Typography>
                <TextField
                  size="small"
                  fullWidth
                  type="password"
                  value={userData.password}
                  onChange={(e) => handleChange("password", e.target.value)}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Typography>パスワード確認</Typography>
                <TextField
                  size="small"
                  fullWidth
                  type="password"
                  value={userData.confirmPassword}
                  onChange={(e) => handleChange("confirmPassword", e.target.value)}
                />
              </Grid>
            </>
          )}

          {/* <Grid item xs={12} sm={6}>
              <Typography>Phone</Typography>
              <Typography fontWeight={500}>+44...</Typography>
          </Grid> */}
        </Grid>

        {/* <Divider sx={{ my: 3 }} />

        <Typography variant="h6" fontWeight="bold" mb={2}>
          Address
        </Typography> */}

        {/* <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Typography>Country</Typography>
              <Typography fontWeight={500}>Japan</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography>City</Typography>
              <Typography fontWeight={500}>Tokyo</Typography>
            </Grid>
        </Grid> */}
      </Paper>

      <ToastContainer position="top-right" autoClose={3000} />
    </Box>
  );
}

export default Users;
