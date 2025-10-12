import React, { useState } from "react";
import { Button, Typography } from "@mui/material";
import { CloudUpload } from "@mui/icons-material";

function CsvUpload() {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    const uploadedFile = event.target.files[0];
    setFile(uploadedFile);
  };

  const handleUpload = () => {
    if (!file) return alert("Please select a CSV file first!");
    alert(`File uploaded: ${file.name}`);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md text-center">
        <Typography variant="h5" className="mb-4 font-semibold text-gray-800">
          Upload CSV File
        </Typography>

        <label htmlFor="csv-upload">
          <input
            id="csv-upload"
            type="file"
            accept=".csv"
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
          <Button
            variant="contained"
            color="primary"
            component="span"
            startIcon={<CloudUpload />}
            fullWidth
          >
            Choose File
          </Button>
        </label>

        {file && (
          <Typography variant="body1" className="mt-3 text-gray-700">
            Selected: {file.name}
          </Typography>
        )}

        <Button
          variant="outlined"
          color="success"
          className="mt-5"
          onClick={handleUpload}
          fullWidth
          disabled={!file}
        >
          Upload
        </Button>
      </div>
    </div>
  );
}

export default CsvUpload;
