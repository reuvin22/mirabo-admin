import React, { useState } from "react";
import { Box, Paper, Typography, TextField, Button, IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useForgotPasswordMutation } from "../services/loginService";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter your email.");
      return;
    }

    try {
      await forgotPassword(email).unwrap();
      toast.success("Password reset link sent!");
      setEmail("");
    } catch (err) {
      toast.error(err?.data?.message || "Something went wrong.");
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor="#f5f5f5"
    >
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          width: 400,
          display: "flex",
          flexDirection: "column",
          gap: 2,
          position: "relative",
        }}
      >
        {/* Back Icon */}
        <IconButton
          onClick={() => navigate("/")}
          sx={{ position: "absolute", top: 8, left: 8 }}
        >
          <ArrowBackIcon />
        </IconButton>

        <Typography variant="h5" textAlign="center" sx={{ mt: 3 }}>
          Forgot Password
        </Typography>

        <Typography variant="body2" textAlign="center">
          Enter your email to receive a password reset link.
        </Typography>

        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "16px" }}
        >
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            required
          />

          <Button
            type="submit"
            variant="contained"
            disabled={isLoading}
            sx={{
              bgcolor: "grey.500",
              "&:hover": { bgcolor: "grey.700" },
            }}
          >
            {isLoading ? "Sending..." : "Send Reset Link"}
          </Button>
        </form>
      </Paper>

      <ToastContainer position="top-center" />
    </Box>
  );
}

export default ForgotPassword;
