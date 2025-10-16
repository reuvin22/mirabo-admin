import React, { useState, useContext } from "react";
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
import { userContext } from "../utils/context";
import LoginPhoto from "../assets/login.png";

const Login = () => {
  const navigate = useNavigate();
  const context = useContext(userContext);

  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleLogin = async (e) => {
    e.preventDefault();

    // =======================
    // Commented out validation
    // =======================
    /*
    setError("");

    if (!userEmail || !userPassword) {
      toast.warning("全てのフィールドを入力してください");
      setError("メールアドレスまたはパスワードを入力してください");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(userEmail)) {
      toast.warning("有効なメールアドレスを入力してください");
      setError("有効なメールアドレスを入力してください");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(`${apiUrl}/login`, {
        email: userEmail,
        password: userPassword,
      });

      if (response.data) {
        toast.success("ログインに成功しました", { autoClose: 3000 });
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        context.setData(response.data.user);
        navigate("/dashboard");
      } else {
        toast.error("メールアドレスまたはパスワードが無効です。", { autoClose: 3000 });
        setError("メールアドレスまたはパスワードが無効です。");
      }
    } catch (err) {
      console.error("Login error:", err);
      toast.error("メールアドレスまたはパスワードが無効です。", { autoClose: 3000 });
      setError("メールアドレスまたはパスワードが無効です。");
    } finally {
      setLoading(false);
    }
    */

    // Directly navigate to dashboard
    navigate("/dashboard");
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
        {/* Left Panel */}
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
            Mirabo質問部屋AI管理ダッシュボードへ！ここにAIに関する記録が保存されます。
          </Typography>
          <img
            src={LoginPhoto}
            alt="AI Illustration"
            style={{ width: "80%", maxWidth: 250 }}
          />
        </Box>

        {/* Right Panel - Login Form */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            p: 4,
          }}
        >
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
              onFocus={() => setError("")}
              error={!!error}
              helperText={error && ""}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <FaEnvelope />
                  </InputAdornment>
                ),
              }}
              fullWidth
            />

            <TextField
              label="パスワード"
              type={showPassword ? "text" : "password"}
              value={userPassword}
              onChange={(e) => setUserPassword(e.target.value)}
              onFocus={() => setError("")}
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
            />

            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Link
                component="button"
                variant="body2"
                onClick={() => navigate("/forgetpassword")}
              >
                パスワードをお忘れの場合はこちらから
              </Link>
            </Box>

            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ py: 1.5, mt: 1, borderRadius: 2, bgcolor: "grey.700" }}
              fullWidth
            >
              サインイン
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default Login;
