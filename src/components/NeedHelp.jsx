import React from "react";
import { Box, Paper, Typography, Dialog, DialogContent, DialogTitle, DialogActions, Button } from "@mui/material";
import SampleFileImage from "../assets/Sample-Format.png";

const NeedHelp = ({ open, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Need Help?</DialogTitle>
      <DialogContent dividers>
        <Typography variant="body1" color="text.secondary" mb={2}>
          Here is a sample format of the document you need to upload. Make sure your Excel/CSV file follows the same column headings and structure.
        </Typography>

        <Box
          component="img"
          src={SampleFileImage}
          alt="Sample file format"
          sx={{
            maxWidth: "100%",
            height: "auto",
            border: "1px solid #ddd",
            borderRadius: 2,
            boxShadow: 1,
          }}
        />

        <Typography variant="body2" color="text.secondary" mt={2}>
          Columns must include: <strong>question_number, questions, writing_advice, prompt</strong>
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="contained">Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default NeedHelp;
