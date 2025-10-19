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
      toast.error("メールアドレスを入力してください。");
      return;
    }

    try {
      await forgotPassword(email).unwrap();
      toast.success("パスワードリセットリンクを送信しました！");
      setEmail("");
    } catch (err) {
      toast.error(err?.data?.message || "エラーが発生しました。");
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
        <IconButton
          onClick={() => navigate("/")}
          sx={{ position: "absolute", top: 8, left: 8 }}
        >
          <ArrowBackIcon />
        </IconButton>

        <Typography variant="h5" textAlign="center" sx={{ mt: 3 }}>
          パスワードを忘れた場合
        </Typography>

        <Typography variant="body2" textAlign="center">
          パスワードリセットリンクを受け取るためにメールアドレスを入力してください。
        </Typography>

        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "16px" }}
        >
          <TextField
            label="メールアドレス"
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
            {isLoading ? "送信中..." : "リセットリンクを送信"}
          </Button>
        </form>
      </Paper>

      <ToastContainer position="top-right" />
    </Box>
  );
}

export default ForgotPassword;
