import { Snackbar, Alert } from "@mui/material";
import { useState } from "react";

const CustomSnackbar = ({ message, severity, open, onClose }) => {
  return (
    <Snackbar 
      open={open} 
      autoHideDuration={3000} 
      onClose={onClose}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <Alert severity={severity} onClose={onClose}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default CustomSnackbar;
