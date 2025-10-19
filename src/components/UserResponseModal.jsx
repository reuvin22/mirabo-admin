import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Typography,
} from "@mui/material";
import { useExportUserAnswersMutation } from "../services/userResponseService";

const UserResponseModal = ({ open, onClose, user }) => {
  const [exportUserAnswers, { isLoading }] = useExportUserAnswersMutation();

  if (!user) return null;

  const questions = Object.entries(user).filter(([key]) =>
    key.toLowerCase().startsWith("question_")
  );

  const handleExport = async () => {
    try {
      const blob = await exportUserAnswers(user.userId).unwrap();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `user_${user.userId}_answers.xlsx`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
      alert("回答のエクスポートに失敗しました");
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>ユーザーID: {user.userId}</DialogTitle>

      <DialogContent dividers>
        {questions.length > 0 ? (
          <Box display="flex" flexDirection="column" gap={2}>
            {questions.map(([key, value], index) => (
              <TextField
                key={index}
                label={key.replace("Question_", "質問 ")}
                value={value || ""}
                InputProps={{ readOnly: true }}
                fullWidth
              />
            ))}
          </Box>
        ) : (
          <Typography align="center">回答は見つかりませんでした。</Typography>
        )}
      </DialogContent>

      <DialogActions>
        <Button
          onClick={handleExport}
          variant="outlined"
          color="primary"
          disabled={isLoading}
        >
          {isLoading ? "エクスポート中..." : "エクスポート"}
        </Button>
        <Button onClick={onClose} variant="contained">
          閉じる
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UserResponseModal;
