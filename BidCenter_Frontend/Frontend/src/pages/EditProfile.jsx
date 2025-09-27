import React, { useState, useEffect, useContext } from "react";
import { TextField, Button, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
// import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import api from "../services/api";
import { Link } from "react-router-dom";

export default function EditProfile() {
  const { user, login } = useContext(AuthContext); // Access user and updater from AuthContext
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Populate the form with user data
  useEffect(() => {
    if (user) {
      setFormData({
        username: user.name || "",
        email: user.email || "",
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Choose endpoint based on role
      // const endpoint = user?.role === "admin" ? "/editProfile" : "/updateUser";
      let endpoint = "";
      let data = {};
      if (user?.role === "admin") {
        endpoint = "/editProfile";
        data = {
          ...formData,
          adminId: user.id, // Include user ID
        };
      } else {
        endpoint = "/updateUser";
        data = {
          ...formData,
          userId: user.id, // Include user ID
        };
      }
      console.log("Form data to be sent:", data);
      const response = await api.put(endpoint, data);
      console.log("Response from server:", response.data);
      if (response.status === 200) {
        toast.success("Profile updated successfully", {
          position: "top-center",
          autoClose: 2000,
        });
        // setUser(response.data); // Update context
        user?.role === "admin"
          ? login(
              response.data.adminId,
              response.data.username,
              response.data.email,
              response.data.createdAt,
              user?.role
            )
          : login(
              response.data.userId,
              response.data.username,
              response.data.email,
              response.data.createdAt,
              user?.role
            );
        if (user?.role === "user") {
          navigate("/profileuser"); // Redirect
        } else {
          navigate("/profile"); // Redirect
        }
      }
    } catch (err) {
      console.error("Error updating profile:", err);
      setError("Failed to update profile. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 600, margin: "auto", padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Edit Profile
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          margin="normal"
          label="Username"
          name="username"
          value={formData.username}
          onChange={handleInputChange}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleInputChange}
        />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          disabled={loading}
        >
          {loading ? "Updating..." : "Update Profile"}
        </Button>
        {user?.role === "user" ? (
          <Button
            variant="outlined"
            style={{ marginLeft: "1rem" }}
            component={Link}
            to="/profileuser"
            className="btn btn-outline-primary"
          >
            Cancel
          </Button>
        ) : (
          <Button
            variant="outlined"
            style={{ marginLeft: "1rem" }}
            component={Link}
            to="/profile"
            className="btn btn-outline-primary"
          >
            Cancel
          </Button>
        )}
      </form>
    </Box>
  );
}
