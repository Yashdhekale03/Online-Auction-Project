import React, { useState } from "react";
import {
  Container,
  Card,
  CardContent,
  CardActions,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import api from "../services/api";
import "./style.css";

function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setError("");

    try {
      const response = await api.post("/signupUser", {
        username,
        email,
        password,
      });

      toast.success("Signed up successfully! Redirecting to login...", {
        position: "top-center",
        autoClose: 2000,
      });

      // Clear form
      setUsername("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");

      // Redirect after delay
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      if (err.response && typeof err.response.data === "string") {
        setError(err.response.data); // String message from backend
      } else if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Unable to connect to server. Please try again.");
      }
    }
  };

  return (
    <>
      <Header />
      <ToastContainer />
      <Container
        component="main"
        maxWidth="xs"
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "70vh", marginBottom: "50px" }}
      >
        <Card variant="outlined" className="w-100">
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Sign Up
            </Typography>
            <Typography variant="body2" color="textSecondary" paragraph>
              Create a new account
            </Typography>

            <form onSubmit={handleSubmit}>
              <TextField
                label="Username"
                variant="outlined"
                fullWidth
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                margin="normal"
              />
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                margin="normal"
              />
              <TextField
                label="Password"
                variant="outlined"
                fullWidth
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                margin="normal"
              />
              <TextField
                label="Confirm Password"
                variant="outlined"
                fullWidth
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                margin="normal"
              />

              {error && (
                <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                  {error}
                </Typography>
              )}

              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 2 }}
              >
                Sign Up
              </Button>
            </form>
          </CardContent>
          <CardActions>
            <Typography variant="body2">
              Already have an account?{" "}
              <Link to="/login">
                <Button size="small">Login</Button>
              </Link>
            </Typography>
          </CardActions>
        </Card>
      </Container>
      <Footer />
    </>
  );
}

export default SignUp;
