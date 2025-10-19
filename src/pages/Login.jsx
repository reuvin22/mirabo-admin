import React, { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  InputAdornment,
  IconButton,
  Link,
  CircularProgress,
} from "@mui/material";
import { FaEnvelope, FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import LoginPhoto from "../assets/login.png";
import { useLoginMutation } from "../services/loginService";
import Cookies from "js-cookie";

const Login = () => {
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();

  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await login({
        email: userEmail,
        password: userPassword,
      }).unwrap();

      Cookies.set("token", res.token, { path: "/" });
      navigate("/dashboard");
    } catch (err) {
      setError("メールアドレスまたはパスワードが無効です。");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "grey.100",
        p: 2,
      }}
    >
      <Paper
        elevation={5}
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          borderRadius: 3,
          overflow: "hidden",
          width: { xs: "100%", md: 800 },
        }}
      >
      <Box
        sx={{
          flex: 1,
          bgcolor: "grey.700",
          color: "white",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          p: 4,
          textAlign: "center",
        }}
      >
        <Typography variant="h5" gutterBottom>
          ようこそ
        </Typography>
        <Typography sx={{ mb: 2, opacity: 0.85 }}>
          じぶんLABO by Mirabo 管理ダッシュボードへ！
        </Typography>
        <Box
          component="img"
          src={LoginPhoto}
          alt="AI"
          sx={{
            width: "80%",
            maxWidth: 250,
            display: { xs: "none", md: "block" },
          }}
        />
      </Box>

        <Box sx={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", p: 4 }}>
          <Typography variant="h5" sx={{ mb: 4, textAlign: "center" }}>
            サインイン
          </Typography>

          <Box
            component="form"
            onSubmit={handleLogin}
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            <TextField
              label="メールアドレス"
              type="email"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              error={!!error}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <FaEnvelope />
                  </InputAdornment>
                ),
              }}
              fullWidth
              onKeyDown={(e) => e.key === "Enter" && handleLogin(e)}
            />

            <TextField
              label="パスワード"
              type={showPassword ? "text" : "password"}
              value={userPassword}
              onChange={(e) => setUserPassword(e.target.value)}
              error={!!error}
              helperText={error}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={togglePasswordVisibility}>
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              fullWidth
              onKeyDown={(e) => e.key === "Enter" && handleLogin(e)}
            />

            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Link component="button" variant="body2" onClick={() => navigate("/forgot-password")}>
                パスワードをお忘れの場合はこちらから
              </Link>
            </Box>

            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ py: 1.5, mt: 1, borderRadius: 2, bgcolor: "grey.700" }}
              fullWidth
              disabled={isLoading}
            >
              {isLoading ? <CircularProgress size={22} /> : "サインイン"}
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default Login;
