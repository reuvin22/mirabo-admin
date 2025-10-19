import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Paper,
  Divider,
  Link,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { CloudUpload, Delete } from "@mui/icons-material";
import { useUploadCsvMutation } from "../services/uploadService";
import SampleFileImage from "../assets/Sample-Format.png";
import { toast } from "react-toastify";

// Modal Component
const NeedHelpModal = ({ open, onClose }) => (
  <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
    <DialogTitle>ヘルプが必要ですか？</DialogTitle>
    <DialogContent dividers>
      <Typography variant="body1" color="text.secondary" mb={2}>
        ここにアップロードする必要があるドキュメントのサンプル形式があります。Excel/CSVファイルが同じ列見出しと構造になっていることを確認してください。
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
        列には以下を含める必要があります: <strong>question_number, questions, writing_advice, prompt</strong>
      </Typography>
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose} variant="contained">閉じる</Button>
    </DialogActions>
  </Dialog>
);

function CsvUpload() {
  const [files, setFiles] = useState([]);
  const [dragActive, setDragActive] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);
  const [uploadCsv, { isLoading }] = useUploadCsvMutation();

  const validateFile = (file) => /\.(csv|xls|xlsx)$/i.test(file.name);

  const handleFileChange = (event) => {
    const uploadedFiles = Array.from(event.target.files);
    const validFiles = uploadedFiles.filter(validateFile);

    if (validFiles.length !== uploadedFiles.length) {
      alert("CSVまたはExcelファイルのみ許可されています！");
    }

    setFiles((prev) => [...prev, ...validFiles]);
    event.target.value = "";
  };

  const handleDragOver = (e) => { e.preventDefault(); setDragActive(true); };
  const handleDragLeave = () => setDragActive(false);
  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    const uploadedFiles = Array.from(e.dataTransfer.files);
    const validFiles = uploadedFiles.filter(validateFile);

    if (validFiles.length !== uploadedFiles.length) {
      toast.error("CSVまたはExcelファイルのみ許可されています！");
    }

    setFiles((prev) => [...prev, ...validFiles]);
  };

  const handleRemoveFile = (index) => setFiles((prev) => prev.filter((_, i) => i !== index));

  const handleUpload = async () => {
    if (!files.length) return toast.error("まず少なくとも1つのファイルを選択してください！");
    try {
      for (let file of files) {
        await uploadCsv(file).unwrap();
      }
      toast.success(`ファイルを正常にアップロードしました`);
      setFiles([]);
    } catch (error) {
      console.error(error);
      toast.error("ファイルのアップロードに失敗しました");
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#f7fafc", p: { xs: 2, md: 6 } }}>
      <Paper elevation={3} sx={{ borderRadius: 2, p: 4, maxWidth: 900, mx: "auto", backgroundColor: "white" }}>
        <Box display="flex" alignItems="center" justifyContent="space-between" mb={3}>
          <Typography variant="h6" fontWeight="bold">CSV / Excelアップロード</Typography>
        </Box>

        <Divider sx={{ mb: 3 }} />

        <Box
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          sx={{
            border: "2px dashed #bdbdbd",
            borderRadius: 2,
            p: 6,
            textAlign: "center",
            cursor: "pointer",
            backgroundColor: dragActive ? "#e0f7fa" : "#fafafa",
            transition: "0.3s",
            position: "relative",
          }}
        >
          <input
            type="file"
            multiple
            accept=".csv, .xls, .xlsx"
            style={{ position: "absolute", width: "100%", height: "100%", opacity: 0, cursor: "pointer", top: 0, left: 0 }}
            onChange={handleFileChange}
          />
          <CloudUpload sx={{ fontSize: 50, color: "#00796b" }} />
          <Typography variant="body1" mt={2} color="text.secondary">
            CSVまたはExcelファイルをここにドロップ <br /> またはデバイスから選択してください
          </Typography>
        </Box>

        {files.length > 0 && (
          <List sx={{ mt: 3, border: "1px solid #ddd", borderRadius: 2 }}>
            {files.map((file, index) => (
              <ListItem
                key={index}
                secondaryAction={
                  <IconButton edge="end" onClick={() => handleRemoveFile(index)}>
                    <Delete color="error" />
                  </IconButton>
                }
              >
                <ListItemText primary={file.name} />
              </ListItem>
            ))}
          </List>
        )}

        <Button
          variant="contained"
          fullWidth
          onClick={handleUpload}
          disabled={!files.length || isLoading}
          sx={{
            mt: 4,
            py: 1.2,
            backgroundColor: "#00796b",
            borderRadius: 2,
            textTransform: "none",
            "&:hover": { backgroundColor: "#00695c" },
          }}
        >
          {isLoading ? "アップロード中..." : `アップロード ${files.length > 1 ? "ファイル" : "ファイル"}`}
        </Button>

        <Box textAlign="center" mt={2}>
          <Link
            component="button"
            underline="hover"
            color="primary"
            onClick={() => setHelpOpen(true)}
          >
            ヘルプが必要ですか？
          </Link>
        </Box>

        <NeedHelpModal open={helpOpen} onClose={() => setHelpOpen(false)} />
      </Paper>
    </Box>
  );
}

export default CsvUpload;
