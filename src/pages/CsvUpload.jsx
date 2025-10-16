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
} from "@mui/material";
import { CloudUpload, Delete } from "@mui/icons-material";

function CsvUpload() {
  const [files, setFiles] = useState([]);
  const [dragActive, setDragActive] = useState(false);

  const validateFile = (file) => /\.(csv|xls|xlsx)$/i.test(file.name);

  const handleFileChange = (event) => {
    const uploadedFiles = Array.from(event.target.files);
    const validFiles = uploadedFiles.filter((f) => validateFile(f));

    if (validFiles.length !== uploadedFiles.length) {
      alert("❌ Only CSV or Excel files are allowed!");
    }

    setFiles((prev) => [...prev, ...validFiles]);
    event.target.value = "";
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = () => {
    setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    const uploadedFiles = Array.from(e.dataTransfer.files);
    const validFiles = uploadedFiles.filter((f) => validateFile(f));

    if (validFiles.length !== uploadedFiles.length) {
      alert("❌ Only CSV or Excel files are allowed!");
    }

    setFiles((prev) => [...prev, ...validFiles]);
  };

  const handleRemoveFile = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleUpload = () => {
    if (!files.length) return alert("Please select at least one file first!");
    const fileNames = files.map((f) => f.name).join(", ");
    alert(`✅ Uploaded files: ${fileNames}`);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#f7fafc",
        p: { xs: 2, md: 6 },
      }}
    >
      <Paper
        elevation={3}
        sx={{
          borderRadius: "0 0 8px 8px",
          p: 4,
          mt: 0,
          maxWidth: 900,
          mx: "auto",
          backgroundColor: "white",
        }}
      >
        <Box display="flex" alignItems="center" justifyContent="space-between" mb={3}>
          <Typography variant="h6" fontWeight="bold">
            Upload CSV / Excel
          </Typography>
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
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              opacity: 0,
              cursor: "pointer",
              top: 0,
              left: 0,
            }}
            id="file-upload"
            onChange={handleFileChange}
          />

          <CloudUpload sx={{ fontSize: 50, color: "#00796b" }} />
          <Typography variant="body1" mt={2} color="text.secondary">
            Drop CSV or Excel files here <br /> or click to select from your device
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
          disabled={!files.length}
          sx={{
            mt: 4,
            py: 1.2,
            backgroundColor: "#00796b",
            borderRadius: 2,
            textTransform: "none",
            "&:hover": { backgroundColor: "#00695c" },
          }}
        >
          Upload {files.length > 1 ? "Files" : "File"}
        </Button>

        <Box textAlign="center" mt={2}>
          <Link href="#" underline="hover" color="primary">
            Need help?
          </Link>
        </Box>
      </Paper>
    </Box>
  );
}

export default CsvUpload;
