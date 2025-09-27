import React, { useContext, useEffect } from "react";
import { format } from "date-fns";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Typography,
} from "@mui/material";
import { AuthContext } from "../context/AuthContext";
import Header from "../components/Header";
import Footer from "../components/Footer";
// import axios from "axios";
import api from "../services/api"; // Adjust the import path as necessary
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
// import AuctionProfile from "../components/AuctionProfile";

export default function Profile() {
  const { user, loggedIn, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("User loaded in Profile:", user);
  }, [user]);

  if (!loggedIn || !user) {
    return (
      <div className="container mx-auto p-6 text-center">
        <Typography variant="h5" color="error">
          Please log in to view your profile.
        </Typography>
      </div>
    );
  }

  const formattedCreatedAt = user?.createdAt
    ? format(new Date(user.createdAt), "MMMM d, yyyy")
    : "N/A";

  const formattedLastLogin = user?.lastLogin
    ? format(new Date(user.lastLogin), "MMMM d, yyyy HH:mm")
    : "N/A";

  const handleDeleteAccount = async () => {
    console.log("Attempting to delete account for:", user);

    if (!user?.id) {
      toast.error("User ID is missing. Cannot delete account.");
      return;
    }

    try {
      const response = await api.delete(`/deleteAdmin/${user.id}`);

      if (response.status === 200) {
        toast.success("Account deleted successfully", {
          position: "top-center",
          autoClose: 2000,
        });
        logout();
        navigate("/");
      }
    } catch (error) {
      console.error("❌ Error deleting account:", error);
      if (error.response?.status === 403) {
        toast.error("You are not authorized to delete this account.", {
          position: "top-center",
          autoClose: 2000,
        });
      } else {
        toast.error("Failed to delete your account. Please try again later.", {
          position: "top-center",
          autoClose: 2000,
        });
      }
    }
  };

  return (
    <>
      <Header />
      <div className="container mx-auto p-6 max-w-2xl">
        <Card>
          <CardHeader
            title="Admin Profile"
            titleTypographyProps={{ variant: "h6", align: "center" }}
          />
          <CardContent>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle1" gutterBottom>
                  <strong>Admin name:</strong> {user.name}
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  <strong>Email:</strong> {user.email}
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  <strong>Member since:</strong> {formattedCreatedAt}
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  <strong>Last login:</strong> {formattedLastLogin}
                </Typography>
              </Grid>

              {/* <Grid item xs={12} md={6}>
                <AuctionProfile />
              </Grid> */}
            </Grid>
          </CardContent>
        </Card>

        <div className="d-flex justify-content-between mt-4">
          <Button
            variant="outlined"
            fullWidth
            style={{ marginRight: "8px" }}
            onClick={() => navigate("/editprofile")}
          >
            Edit Profile
          </Button>
          <Button
            variant="outlined"
            fullWidth
            style={{ marginRight: "8px" }}
            onClick={() => navigate("/resetpassword")}
          >
            Reset Password
          </Button>
          <Button
            variant="contained"
            color="error"
            fullWidth
            onClick={handleDeleteAccount}
          >
            Delete Account
          </Button>
        </div>
      </div>
      <Footer />
    </>
  );
}
