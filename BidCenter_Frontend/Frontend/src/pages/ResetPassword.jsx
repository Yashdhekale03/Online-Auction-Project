import React, { useState, useContext } from "react";
import { TextField, Button, Typography, Box } from "@mui/material";
// import axios from "axios";
import api from "../services/api"; // Adjust the import path as necessary
import { AuthContext } from "../context/AuthContext"; // Uncomment if using AuthContext
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

export default function ResetPassword() {
  const { user } = useContext(AuthContext); // Access user and updater from AuthContext
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      let response;
      if (user.role === "user") {
        response = await api.post("/user/reset-password", {
          id: user.id,
          currentPassword,
          newPassword,
        });
      } else if (user.role === "admin") {
        response = await api.post("/admin/reset-password", {
          id: user.id,
          currentPassword,
          newPassword,
        });
      }
      if (response.status === 200) {
        setSuccess(true);
        toast.success("Password reset successfully", {
          position: "top-center",
          autoClose: 2000, // Automatically close after 2 seconds
        });
        if (user?.role === "user") {
          navigate("/profileuser"); // Redirect
        } else {
          navigate("/profile"); // Redirect
        }
      }
    } catch (err) {
      console.error("Error resetting password:", err);
      setError("Failed to reset password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 600, margin: "auto", padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Reset Password
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
      {success && (
        <Typography color="success">Password reset successfully!</Typography>
      )}
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          margin="normal"
          label="Current Password"
          type="password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
        />
        <TextField
          fullWidth
          margin="normal"
          label="New Password"
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Confirm New Password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          disabled={loading}
          sx={{ mt: 2 }}
        >
          {loading ? "Resetting..." : "Reset Password"}
        </Button>
        {user.role === "admin" ? (
          <Button
            variant="outlined"
            sx={{ mt: 2, ml: 2 }}
            component={Link}
            to="/profile"
            className="btn btn-outline-primary"
          >
            Cancel
          </Button>
        ) : (
          <Button
            variant="outlined"
            sx={{ mt: 2, ml: 2 }}
            component={Link}
            to="/profileuser"
            className="btn btn-outline-primary"
          >
            Cancel
          </Button>
        )}
      </form>
    </Box>
  );
}
