import React from "react";
import { Box, Paper, Typography, Dialog, DialogContent, DialogTitle, DialogActions, Button } from "@mui/material";
import SampleFileImage from "../assets/Sample-Format.png";

const NeedHelp = ({ open, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>ヘルプが必要ですか？</DialogTitle>
      <DialogContent dividers>
        <Typography variant="body1" color="text.secondary" mb={2}>
          ここにアップロードする必要があるドキュメントのサンプル形式があります。ExcelまたはCSVファイルが同じ列見出しと構造に従っていることを確認してください。
        </Typography>

        <Box
          component="img"
          src={SampleFileImage}
          alt="サンプルファイル形式"
          sx={{
            maxWidth: "100%",
            height: "auto",
            border: "1px solid #ddd",
            borderRadius: 2,
            boxShadow: 1,
          }}
        />

        <Typography variant="body2" color="text.secondary" mt={2}>
          列には次が含まれている必要があります: <strong>question_number, questions, writing_advice, prompt</strong>
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="contained">閉じる</Button>
      </DialogActions>
    </Dialog>
  );
};

export default NeedHelp;
